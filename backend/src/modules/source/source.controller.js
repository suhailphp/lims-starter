'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError, ForbiddenError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

// No unique constraint on Source: a customer can legitimately have multiple
// sources with identical names (e.g. two vessels with the same engine model).

function ensureScopeMatches(req, customerID) {
  if (req.scope && req.scope.customerID && req.scope.customerID !== customerID) {
    throw new ForbiddenError('Access denied: customer scope mismatch');
  }
}

async function list(req, res) {
  const { customerID } = req.validated.params;
  ensureScopeMatches(req, customerID);
  const { page, limit, search, sourceTypeID, categoryID, isActive, sort, order } =
    req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = { ...(req.scope || {}), customerID };
  if (sourceTypeID) where.sourceTypeID = sourceTypeID;
  if (categoryID) where.categoryID = categoryID;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { sourceName: { [Op.iLike]: `%${search}%` } },
      { equipmentName: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.Source.findAndCountAll({
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

// Global flat list — used by the master-data /sources page. Returns sources
// across all customers (filtered by req.scope for CUSTOMER role) with FK
// associations included so the table can render names without extra round-trips.
async function listAll(req, res) {
  const {
    page,
    limit,
    search,
    customerID,
    sourceTypeID,
    categoryID,
    isActive,
    sort,
    order,
  } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = { ...(req.scope || {}) };
  if (customerID) where.customerID = customerID;
  if (sourceTypeID) where.sourceTypeID = sourceTypeID;
  if (categoryID) where.categoryID = categoryID;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { sourceName: { [Op.iLike]: `%${search}%` } },
      { equipmentName: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.Source.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
    include: [
      { model: db.Customer,   as: 'customer',   attributes: ['customerID', 'name'] },
      { model: db.SourceType, as: 'sourceType', attributes: ['sourceTypeID', 'name', 'label'] },
      { model: db.Category,   as: 'category',   attributes: ['categoryID', 'name'] },
    ],
    distinct: true,
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

async function getOne(req, res) {
  const { sourceID } = req.validated.params;
  const source = await db.Source.findByPk(sourceID);
  if (!source) throw new NotFoundError('Source');
  ensureScopeMatches(req, source.customerID);
  res.json({ success: true, data: source });
}

async function create(req, res) {
  const { customerID } = req.validated.params;
  ensureScopeMatches(req, customerID);
  const { sourceTypeID, categoryID } = req.validated.body;

  const [customer, sourceType, category] = await Promise.all([
    db.Customer.findByPk(customerID),
    db.SourceType.findByPk(sourceTypeID),
    db.Category.findByPk(categoryID),
  ]);
  if (!customer) throw new NotFoundError('Customer');
  if (!sourceType) throw new NotFoundError('SourceType');
  if (!category) throw new NotFoundError('Category');

  const source = await db.Source.create(
    { ...req.validated.body, customerID },
    { userId: req.user.userID },
  );
  res.status(201).json({
    success: true,
    message: 'Source created successfully',
    data: source,
  });
}

// Flat-route create — customerID comes from body. Used by master-data /sources page.
async function createAll(req, res) {
  const { customerID, sourceTypeID, categoryID } = req.validated.body;
  ensureScopeMatches(req, customerID);

  const [customer, sourceType, category] = await Promise.all([
    db.Customer.findByPk(customerID),
    db.SourceType.findByPk(sourceTypeID),
    db.Category.findByPk(categoryID),
  ]);
  if (!customer) throw new NotFoundError('Customer');
  if (!sourceType) throw new NotFoundError('SourceType');
  if (!category) throw new NotFoundError('Category');

  const source = await db.Source.create(req.validated.body, {
    userId: req.user.userID,
  });
  res.status(201).json({
    success: true,
    message: 'Source created successfully',
    data: source,
  });
}

async function update(req, res) {
  const { sourceID } = req.validated.params;
  const { sourceTypeID, categoryID } = req.validated.body;

  const source = await db.Source.findByPk(sourceID);
  if (!source) throw new NotFoundError('Source');
  ensureScopeMatches(req, source.customerID);

  const [sourceType, category] = await Promise.all([
    db.SourceType.findByPk(sourceTypeID),
    db.Category.findByPk(categoryID),
  ]);
  if (!sourceType) throw new NotFoundError('SourceType');
  if (!category) throw new NotFoundError('Category');

  await source.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'Source updated successfully',
    data: source,
  });
}

async function softDelete(req, res) {
  const { sourceID } = req.validated.params;
  const source = await db.Source.findByPk(sourceID);
  if (!source) throw new NotFoundError('Source');
  ensureScopeMatches(req, source.customerID);

  // TODO: block delete when Worksheet/SampleIntake references this source (Module 3)

  await source.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, listAll, getOne, create, createAll, update, softDelete };
