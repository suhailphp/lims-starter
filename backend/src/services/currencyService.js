'use strict';

const { Op } = require('sequelize');
const { AppError, NotFoundError, ConflictError } = require('../utils/errors');

/* `db` is lazy-required inside functions to avoid the same circular
 * dep pattern documented in services/settingsService.js. Currency models
 * could be imported safely today, but keeping the lazy pattern uniform
 * makes future additions safe by default. */

/**
 * Currency service — base currency, current rate, historical rate, and
 * the atomic Set-Base flow.
 *
 * Quote/Invoice modules will read `getCurrentRate(currencyID)` at quote
 * creation time and snapshot the value onto the quote — they never read
 * live rates again after that. See ADR-multi-currency-snapshot-rate.md.
 */

async function getBaseCurrency() {
  const db = require('../models');
  return db.Currency.findOne({ where: { isBase: true, isActive: true } });
}

async function getBaseCurrencyOrThrow() {
  const base = await getBaseCurrency();
  if (!base) throw new AppError('No base currency configured', 500);
  return base;
}

/**
 * Latest active rate for a currency. "Active" = effectiveDate <= today
 * AND (expiryDate IS NULL OR expiryDate > today). Returns null if no
 * rate exists yet.
 */
async function getCurrentRate(currencyID) {
  const db = require('../models');
  const today = new Date().toISOString().slice(0, 10);
  return db.ExchangeRate.findOne({
    where: {
      currencyID,
      effectiveDate: { [Op.lte]: today },
      [Op.or]: [
        { expiryDate: null },
        { expiryDate: { [Op.gt]: today } },
      ],
    },
    order: [['effectiveDate', 'DESC']],
  });
}

/**
 * Rate that was effective on a given date. Used by future Quote/Report
 * modules when re-pricing a back-dated quote. Returns null if no rate
 * spans the date.
 */
async function getRateOnDate(currencyID, date) {
  const db = require('../models');
  return db.ExchangeRate.findOne({
    where: {
      currencyID,
      effectiveDate: { [Op.lte]: date },
      [Op.or]: [
        { expiryDate: null },
        { expiryDate: { [Op.gt]: date } },
      ],
    },
    order: [['effectiveDate', 'DESC']],
  });
}

/**
 * Insert a new ExchangeRate row and close the previous open-ended row.
 *
 *   - If a rate is already open-ended (expiryDate IS NULL) AND its
 *     effectiveDate <= the new effectiveDate, set its expiryDate to the
 *     new effectiveDate.
 *   - Reject creating a rate dated earlier than the latest open-ended
 *     row's effectiveDate (would leave a gap / overlap that the lookup
 *     can't resolve cleanly). Future rate-correction UX can `softDelete`
 *     a bad row and create a new one — no time-machine backfill here.
 */
async function createExchangeRate(currencyID, payload, userId) {
  const db = require('../models');
  const currency = await db.Currency.findByPk(currencyID);
  if (!currency) throw new NotFoundError('Currency');

  if (currency.isBase) {
    throw new ConflictError('Cannot add exchange rates to the base currency. Base rate is always 1.0.');
  }

  return db.sequelize.transaction(async (t) => {
    const open = await db.ExchangeRate.findOne({
      where: { currencyID, expiryDate: null },
      order: [['effectiveDate', 'DESC']],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (open && payload.effectiveDate < open.effectiveDate) {
      throw new ConflictError(
        `New rate effectiveDate (${payload.effectiveDate}) cannot precede the current open-ended rate (${open.effectiveDate}).`,
      );
    }

    if (open) {
      await open.update({ expiryDate: payload.effectiveDate }, { transaction: t, userId });
    }

    return db.ExchangeRate.create(
      {
        currencyID,
        rate: payload.rate,
        effectiveDate: payload.effectiveDate,
        expiryDate: null,
        source: payload.source || 'manual',
        notes: payload.notes || null,
      },
      { transaction: t, userId },
    );
  });
}

/**
 * Atomically promote a currency to base. Flips the previous base off,
 * sets the new one on, and updates the localization.base_currency_code
 * Setting row + cache. Rejects if the target currency is inactive or
 * deleted.
 *
 * Note: this does NOT recalculate stored snapshot rates on existing
 * quotes/invoices. Snapshots are immutable by design (ADR). The base
 * change applies forward.
 */
async function setBaseCurrency(targetCurrencyID, userId) {
  const db = require('../models');
  const settingsService = require('./settingsService');

  return db.sequelize.transaction(async (t) => {
    const target = await db.Currency.findByPk(targetCurrencyID, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!target) throw new NotFoundError('Currency');
    if (!target.isActive) {
      throw new ConflictError('Inactive currency cannot be set as base. Activate it first.');
    }
    if (target.isBase) {
      // No-op — already base. Still bump audit so the deliberate action
      // shows up in history.
      await target.auditedUpdate({}, userId, { transaction: t });
      return target;
    }

    // Flip current base off.
    const current = await db.Currency.findOne({
      where: { isBase: true },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (current) {
      await current.auditedUpdate({ isBase: false }, userId, { transaction: t });
    }

    await target.auditedUpdate({ isBase: true }, userId, { transaction: t });

    // Sync the public Setting row. Bypasses settingsService.updateSetting
    // because that helper rejects writes to isEditable=false rows — this
    // is the dedicated managed flow.
    const settingRow = await db.Setting.findOne({
      where: { settingKey: 'base_currency_code' },
      transaction: t,
    });
    if (settingRow) {
      await settingRow.update(
        { value: target.code, updatedBy: userId },
        { transaction: t },
      );
    }

    // Refresh the in-memory settings cache outside the transaction so
    // readers see the new value once committed.
    setImmediate(() => {
      settingsService.refreshCache().catch((err) => {
        console.error('[currency] settings cache refresh failed', err);
      });
    });

    return target;
  });
}

module.exports = {
  getBaseCurrency,
  getBaseCurrencyOrThrow,
  getCurrentRate,
  getRateOnDate,
  createExchangeRate,
  setBaseCurrency,
};
