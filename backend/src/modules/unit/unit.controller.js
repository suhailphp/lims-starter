'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

async function list(req, res) {
  const { categoryID } = req.validated.params;
  const { page, limit, search, isActive, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = { categoryID };
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { name:   { [Op.iLike]: `%${search}%` } },
      { symbol: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.Unit.findAndCountAll({
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

// Global flat list — used by the master-data /units page. Returns units across
// all categories with the Category association included so the table can
// render the category name without extra round-trips.
async function listAll(req, res) {
  const {
    page,
    limit,
    search,
    categoryID,
    isActive,
    sort,
    order,
  } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (categoryID) where.categoryID = categoryID;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { name:   { [Op.iLike]: `%${search}%` } },
      { symbol: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.Unit.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
    include: [
      { model: db.Category, as: 'category', attributes: ['categoryID', 'name', 'type'] },
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
  const { unitID } = req.validated.params;
  const unit = await db.Unit.findByPk(unitID);
  if (!unit) throw new NotFoundError('Unit');
  res.json({ success: true, data: unit });
}

async function create(req, res) {
  const { categoryID } = req.validated.params;

  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');

  const unit = await db.Unit.create(
    { ...req.validated.body, categoryID },
    { userId: req.user.userID },
  );
  res.status(201).json({
    success: true,
    message: 'Unit created successfully',
    data: unit,
  });
}

// Flat-route create — categoryID comes from body. Used by master-data /units page.
async function createAll(req, res) {
  const { categoryID } = req.validated.body;

  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');

  const unit = await db.Unit.create(req.validated.body, {
    userId: req.user.userID,
  });
  res.status(201).json({
    success: true,
    message: 'Unit created successfully',
    data: unit,
  });
}

async function update(req, res) {
  const { unitID } = req.validated.params;
  const unit = await db.Unit.findByPk(unitID);
  if (!unit) throw new NotFoundError('Unit');
  await unit.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'Unit updated successfully',
    data: unit,
  });
}

async function softDelete(req, res) {
  const { unitID } = req.validated.params;
  const unit = await db.Unit.findByPk(unitID);
  if (!unit) throw new NotFoundError('Unit');

  // TODO: when WorksheetTest / TestResult tables ship, add child-count checks here
  // per Parent Deletion Policy (api-conventions.md) and throw ConflictError if any > 0

  await unit.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, listAll, getOne, create, createAll, update, softDelete };
