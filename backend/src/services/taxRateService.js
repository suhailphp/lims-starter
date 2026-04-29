'use strict';

const { NotFoundError, ConflictError } = require('../utils/errors');

/* `db` is lazy-required inside functions to keep the circular-dep-safe
 * pattern uniform with currencyService / settingsService. */

/**
 * Tax Rate service — default tax rate lookup + atomic Set-Default flow.
 *
 * Quote/Invoice modules will read `getDefault()` at form-load time to
 * pre-select the tax rate dropdown. Once the user submits, the chosen
 * tax rate is snapshotted onto the quote (rate value frozen at the time
 * of submission, like the Currency rate snapshot pattern).
 */

async function getDefault() {
  const db = require('../models');
  return db.TaxRate.findOne({ where: { isDefault: true, isActive: true } });
}

async function getDefaultOrThrow() {
  const def = await getDefault();
  if (!def) {
    const { AppError } = require('../utils/errors');
    throw new AppError('No default tax rate configured', 500);
  }
  return def;
}

/**
 * Atomically promote a tax rate to default.
 *
 *   - Flips the previous default off (if any).
 *   - Sets the new one on.
 *   - Updates `Settings.default_tax_rate_code` row + refreshes the
 *     in-memory settings cache.
 *   - All in one transaction (matches Currency Set-Base flow).
 *
 * Rejects if the target is inactive or deleted.
 */
async function setDefaultTaxRate(targetTaxRateID, userId) {
  const db = require('../models');
  const settingsService = require('./settingsService');

  return db.sequelize.transaction(async (t) => {
    const target = await db.TaxRate.findByPk(targetTaxRateID, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!target) throw new NotFoundError('TaxRate');
    if (!target.isActive) {
      throw new ConflictError('Inactive tax rate cannot be set as default. Activate it first.');
    }
    if (target.isDefault) {
      // No-op — already default. Bump audit so the deliberate action
      // shows up in history.
      await target.auditedUpdate({}, userId, { transaction: t });
      return target;
    }

    // Flip current default off.
    const current = await db.TaxRate.findOne({
      where: { isDefault: true },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (current) {
      await current.auditedUpdate({ isDefault: false }, userId, { transaction: t });
    }

    await target.auditedUpdate({ isDefault: true }, userId, { transaction: t });

    // Sync the Settings row. default_tax_rate_code is isEditable=true but
    // we skip settingsService.updateSetting because that helper doesn't
    // run inside a caller-provided transaction — managed flow writes
    // direct to the row.
    const settingRow = await db.Setting.findOne({
      where: { settingKey: 'default_tax_rate_code' },
      transaction: t,
    });
    if (settingRow) {
      await settingRow.update(
        { value: target.code, updatedBy: userId },
        { transaction: t },
      );
    }

    // Refresh the in-memory settings cache once the txn commits.
    setImmediate(() => {
      settingsService.refreshCache().catch((err) => {
        console.error('[taxRate] settings cache refresh failed', err);
      });
    });

    return target;
  });
}

module.exports = {
  getDefault,
  getDefaultOrThrow,
  setDefaultTaxRate,
};
