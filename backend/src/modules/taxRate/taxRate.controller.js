'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError, ConflictError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');
const taxRateService = require('../../services/taxRateService');

/* ---------- list / detail ---------- */

async function list(req, res) {
  const { page, limit, search, isActive, isDefault, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (typeof isActive  === 'boolean') where.isActive  = isActive;
  if (typeof isDefault === 'boolean') where.isDefault = isDefault;
  if (search) {
    where[Op.or] = [
      { code: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.TaxRate.findAndCountAll({
    where,
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

async function getOne(req, res) {
  const { taxRateID } = req.validated.params;
  const taxRate = await db.TaxRate.findByPk(taxRateID);
  if (!taxRate) throw new NotFoundError('TaxRate');
  res.json({ success: true, data: taxRate });
}

/* ---------- create / update / delete ---------- */

async function create(req, res) {
  const payload = req.validated.body;

  // Reject duplicate code (case-insensitive among non-deleted rows). The
  // partial unique index will also reject this at the DB level — the
  // pre-check just gives a clean error message.
  const existing = await db.TaxRate.findOne({
    where: db.sequelize.where(
      db.sequelize.fn('LOWER', db.sequelize.col('code')),
      payload.code.toLowerCase(),
    ),
  });
  if (existing) {
    throw new ConflictError(`Tax rate code "${payload.code}" already exists.`);
  }

  // Auto-promote to default if no default exists yet (e.g. all defaults
  // soft-deleted). The seed inserts VAT_5 as default, so this branch
  // normally only fires after an admin nukes everything.
  const defaultCount = await db.TaxRate.count({ where: { isDefault: true } });
  const isFirstDefault = defaultCount === 0;

  const taxRate = await db.TaxRate.create(
    {
      code: payload.code,
      name: payload.name,
      rate: payload.rate,
      type: payload.type || 'PERCENTAGE',
      description: payload.description,
      displayOrder: payload.displayOrder,
      isDefault: isFirstDefault,
      isActive: payload.isActive ?? true,
    },
    { userId: req.user.userID },
  );

  res.status(201).json({
    success: true,
    message: 'Tax rate created successfully',
    data: taxRate,
  });
}

async function update(req, res) {
  const { taxRateID } = req.validated.params;
  const taxRate = await db.TaxRate.findByPk(taxRateID);
  if (!taxRate) throw new NotFoundError('TaxRate');

  // Default tax rate cannot be deactivated. The `set-default` endpoint
  // owns the isDefault flip — strict() schema already rejects isDefault
  // in the update body.
  if (taxRate.isDefault && req.validated.body.isActive === false) {
    throw new ConflictError('Default tax rate cannot be deactivated.');
  }

  await taxRate.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'Tax rate updated successfully',
    data: taxRate,
  });
}

async function softDelete(req, res) {
  const { taxRateID } = req.validated.params;
  const taxRate = await db.TaxRate.findByPk(taxRateID);
  if (!taxRate) throw new NotFoundError('TaxRate');

  if (taxRate.isDefault) {
    throw new ConflictError('Default tax rate cannot be deleted. Set another tax rate as default first.');
  }

  // TODO: when Quotes/Invoices ship, block delete if any quote references
  // this tax rate (Parent Deletion Policy). Tax snapshots will live on
  // the quote so historical reads still work, but the FK guard avoids
  // surprise deletes.

  await taxRate.softDelete(req.user.userID);
  res.status(204).send();
}

/* ---------- set default ---------- */

async function setAsDefault(req, res) {
  const { taxRateID } = req.validated.params;
  const target = await taxRateService.setDefaultTaxRate(taxRateID, req.user.userID);
  res.json({
    success: true,
    message: `${target.code} is now the default tax rate.`,
    data: target,
  });
}

module.exports = {
  list,
  getOne,
  create,
  update,
  softDelete,
  setAsDefault,
};
