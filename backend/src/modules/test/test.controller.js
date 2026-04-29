'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError, ConflictError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

async function list(req, res) {
  const { categoryID } = req.validated.params;
  const { page, limit, search, resultType, isActive, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = { categoryID };
  if (resultType)                   where.resultType = resultType;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }];
  }

  const { rows, count } = await db.Test.findAndCountAll({
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

// Global flat list — used by the master-data /tests page. Returns tests across
// all categories with the Category association included so the table can
// render the category name without extra round-trips.
async function listAll(req, res) {
  const {
    page,
    limit,
    search,
    categoryID,
    resultType,
    isActive,
    sort,
    order,
  } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (categoryID) where.categoryID = categoryID;
  if (resultType) where.resultType = resultType;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }];
  }

  const { rows, count } = await db.Test.findAndCountAll({
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

// Flat-route create — categoryID comes from body. Used by master-data /tests page.
async function createAll(req, res) {
  const { categoryID } = req.validated.body;

  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');

  const test = await db.Test.create(req.validated.body, {
    userId: req.user.userID,
  });
  res.status(201).json({
    success: true,
    message: 'Test created successfully',
    data: test,
  });
}

async function getOne(req, res) {
  const { testID } = req.validated.params;
  const test = await db.Test.findByPk(testID);
  if (!test) throw new NotFoundError('Test');
  res.json({ success: true, data: test });
}

async function create(req, res) {
  const { categoryID } = req.validated.params;

  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');

  const test = await db.Test.create(
    { ...req.validated.body, categoryID },
    { userId: req.user.userID },
  );
  res.status(201).json({
    success: true,
    message: 'Test created successfully',
    data: test,
  });
}

async function update(req, res) {
  const { testID } = req.validated.params;
  const test = await db.Test.findByPk(testID);
  if (!test) throw new NotFoundError('Test');
  await test.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'Test updated successfully',
    data: test,
  });
}

async function softDelete(req, res) {
  const { testID } = req.validated.params;
  const test = await db.Test.findByPk(testID);
  if (!test) throw new NotFoundError('Test');

  const methodsCount = await db.Method.count({ where: { testID } });

  if (methodsCount > 0) {
    throw new ConflictError('Cannot delete test with active references', [
      { field: 'methods', message: `${methodsCount} active method(s) reference this test` },
    ]);
  }

  await test.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, listAll, getOne, create, createAll, update, softDelete };
