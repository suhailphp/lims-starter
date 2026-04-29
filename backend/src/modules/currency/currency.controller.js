'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError, ConflictError, AppError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');
const currencyService = require('../../services/currencyService');

/* ---------- helpers ---------- */

async function attachCurrentRate(currency) {
  if (!currency) return currency;
  const json = currency.toJSON();
  if (currency.isBase) {
    // Base currency rate is implicit 1.0 — no ExchangeRate row required
    // for the base. (The seed inserts one for documentation; not relied on.)
    json.currentRate = {
      rate: '1.000000',
      effectiveDate: null,
      source: 'base',
    };
    return json;
  }
  const rate = await currencyService.getCurrentRate(currency.currencyID);
  json.currentRate = rate ? rate.toJSON() : null;
  return json;
}

/* ---------- list / detail ---------- */

async function list(req, res) {
  const { page, limit, search, isActive, isBase, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (typeof isBase   === 'boolean') where.isBase   = isBase;
  if (search) {
    where[Op.or] = [
      { code: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.Currency.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
  });

  const enriched = await Promise.all(rows.map(attachCurrentRate));

  res.json({
    success: true,
    data: enriched,
    meta: buildMeta({ total: count, page, limit }),
  });
}

async function getOne(req, res) {
  const { currencyID } = req.validated.params;
  const currency = await db.Currency.findByPk(currencyID);
  if (!currency) throw new NotFoundError('Currency');
  const enriched = await attachCurrentRate(currency);
  res.json({ success: true, data: enriched });
}

/* ---------- create / update / delete ---------- */

async function create(req, res) {
  const payload = req.validated.body;

  // Reject duplicate code (case-insensitive among non-deleted rows). The
  // partial unique index will also reject this at the DB level — the
  // pre-check just gives a clean error message.
  const existing = await db.Currency.findOne({
    where: db.sequelize.where(
      db.sequelize.fn('LOWER', db.sequelize.col('code')),
      payload.code.toLowerCase(),
    ),
  });
  if (existing) {
    throw new ConflictError(`Currency code "${payload.code}" already exists.`);
  }

  // First currency in the system auto-becomes base. After that, new
  // currencies are non-base and require an initialRate.
  const baseCount = await db.Currency.count({ where: { isBase: true } });
  const isFirstCurrency = baseCount === 0;

  if (!isFirstCurrency && payload.initialRate === undefined) {
    throw new AppError(
      'initialRate is required when adding a non-base currency.',
      422,
      [{ path: 'initialRate', message: 'Initial exchange rate is required' }],
    );
  }

  const currency = await db.sequelize.transaction(async (t) => {
    const created = await db.Currency.create(
      {
        code: payload.code,
        name: payload.name,
        symbol: payload.symbol,
        decimalPlaces: payload.decimalPlaces,
        displayOrder: payload.displayOrder,
        isBase: isFirstCurrency,
        isActive: payload.isActive ?? true,
      },
      { transaction: t, userId: req.user.userID },
    );

    if (isFirstCurrency) {
      // Seed the base currency's identity rate row + sync the setting.
      const today = new Date().toISOString().slice(0, 10);
      await db.ExchangeRate.create(
        {
          currencyID: created.currencyID,
          rate: 1.0,
          effectiveDate: today,
          expiryDate: null,
          source: 'system',
          notes: 'Initial base currency identity rate.',
        },
        { transaction: t, userId: req.user.userID },
      );
      const settingRow = await db.Setting.findOne({
        where: { settingKey: 'base_currency_code' },
        transaction: t,
      });
      if (settingRow) {
        await settingRow.update(
          { value: created.code, updatedBy: req.user.userID },
          { transaction: t },
        );
      }
    } else {
      await db.ExchangeRate.create(
        {
          currencyID: created.currencyID,
          rate: payload.initialRate,
          effectiveDate: payload.initialRateEffectiveDate || new Date().toISOString().slice(0, 10),
          expiryDate: null,
          source: 'manual',
          notes: 'Initial rate at currency creation.',
        },
        { transaction: t, userId: req.user.userID },
      );
    }

    return created;
  });

  if (isFirstCurrency) {
    // Refresh settings cache outside the txn so subsequent /settings/public
    // reads see the new base_currency_code.
    setImmediate(() => {
      require('../../services/settingsService')
        .refreshCache()
        .catch((err) => console.error('[currency] settings cache refresh failed', err));
    });
  }

  const enriched = await attachCurrentRate(currency);
  res.status(201).json({
    success: true,
    message: 'Currency created successfully',
    data: enriched,
  });
}

async function update(req, res) {
  const { currencyID } = req.validated.params;
  const currency = await db.Currency.findByPk(currencyID);
  if (!currency) throw new NotFoundError('Currency');

  // Base currency cannot be deactivated. Code is immutable post-create
  // (handled by schema — not in update body).
  if (currency.isBase && req.validated.body.isActive === false) {
    throw new ConflictError('Base currency cannot be deactivated.');
  }

  await currency.auditedUpdate(req.validated.body, req.user.userID);
  const enriched = await attachCurrentRate(currency);
  res.json({
    success: true,
    message: 'Currency updated successfully',
    data: enriched,
  });
}

async function softDelete(req, res) {
  const { currencyID } = req.validated.params;
  const currency = await db.Currency.findByPk(currencyID);
  if (!currency) throw new NotFoundError('Currency');

  if (currency.isBase) {
    throw new ConflictError('Base currency cannot be deleted.');
  }

  // TODO: when Quotes/Invoices ship, block delete if any quote references
  // this currency (Parent Deletion Policy). Snapshot rates on the quote
  // side mean historical reads still work, but a hard guard avoids the
  // FK relationship surprise.

  await currency.softDelete(req.user.userID);
  res.status(204).send();
}

/* ---------- exchange rates ---------- */

async function listExchangeRates(req, res) {
  const { currencyID } = req.validated.params;
  const { page, limit, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const currency = await db.Currency.findByPk(currencyID);
  if (!currency) throw new NotFoundError('Currency');

  const { rows, count } = await db.ExchangeRate.findAndCountAll({
    where: { currencyID },
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

async function createExchangeRate(req, res) {
  const { currencyID } = req.validated.params;
  const rate = await currencyService.createExchangeRate(
    currencyID,
    req.validated.body,
    req.user.userID,
  );
  res.status(201).json({
    success: true,
    message: 'Exchange rate added; previous open-ended rate closed.',
    data: rate,
  });
}

async function getRateOnDate(req, res) {
  const { currencyID, date } = req.validated.params;
  const currency = await db.Currency.findByPk(currencyID);
  if (!currency) throw new NotFoundError('Currency');

  if (currency.isBase) {
    return res.json({
      success: true,
      data: { rate: '1.000000', effectiveDate: null, source: 'base' },
    });
  }

  const rate = await currencyService.getRateOnDate(currencyID, date);
  if (!rate) {
    throw new NotFoundError(`Exchange rate for ${currency.code} on ${date}`);
  }
  res.json({ success: true, data: rate });
}

/* ---------- set base ---------- */

async function setAsBase(req, res) {
  const { currencyID } = req.validated.params;
  const target = await currencyService.setBaseCurrency(currencyID, req.user.userID);
  const enriched = await attachCurrentRate(target);
  res.json({
    success: true,
    message: `${target.code} is now the base currency.`,
    data: enriched,
  });
}

module.exports = {
  list,
  getOne,
  create,
  update,
  softDelete,
  listExchangeRates,
  createExchangeRate,
  getRateOnDate,
  setAsBase,
};
