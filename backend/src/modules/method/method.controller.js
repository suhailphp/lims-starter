'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

async function list(req, res) {
  const { testID } = req.validated.params;
  const { page, limit, search, isDefault, isActive, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = { testID };
  if (typeof isDefault === 'boolean') where.isDefault = isDefault;
  if (typeof isActive  === 'boolean') where.isActive  = isActive;
  if (search) {
    where[Op.or] = [{ code: { [Op.iLike]: `%${search}%` } }];
  }

  const { rows, count } = await db.Method.findAndCountAll({
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

// Global flat list — used by the master-data /methods page. Returns methods
// across all tests, with the Test association (and Test → Category nested)
// included so the table can render parent context without extra round-trips.
async function listAll(req, res) {
  const {
    page,
    limit,
    search,
    testID,
    isDefault,
    isActive,
    sort,
    order,
  } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (testID) where.testID = testID;
  if (typeof isDefault === 'boolean') where.isDefault = isDefault;
  if (typeof isActive  === 'boolean') where.isActive  = isActive;
  if (search) {
    where[Op.or] = [{ code: { [Op.iLike]: `%${search}%` } }];
  }

  const { rows, count } = await db.Method.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
    include: [
      {
        model: db.Test,
        as: 'test',
        attributes: ['testID', 'name', 'categoryID'],
        include: [
          { model: db.Category, as: 'category', attributes: ['categoryID', 'name', 'type'] },
        ],
      },
    ],
    distinct: true,
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

// Flat-route create — testID comes from body. Used by master-data /methods page.
// Preserves the "one default per test" invariant — when isDefault=true,
// flips siblings off in the same transaction.
async function createAll(req, res) {
  const { testID } = req.validated.body;

  const test = await db.Test.findByPk(testID);
  if (!test) throw new NotFoundError('Test');

  let method;
  if (req.validated.body.isDefault) {
    await db.sequelize.transaction(async (t) => {
      await db.Method.update(
        { isDefault: false },
        { where: { testID, isDefault: true }, transaction: t },
      );
      method = await db.Method.create(req.validated.body, {
        transaction: t,
        userId: req.user.userID,
      });
    });
  } else {
    method = await db.Method.create(req.validated.body, {
      userId: req.user.userID,
    });
  }

  res.status(201).json({
    success: true,
    message: 'Method created successfully',
    data: method,
  });
}

async function getOne(req, res) {
  const { methodID } = req.validated.params;
  const method = await db.Method.findByPk(methodID);
  if (!method) throw new NotFoundError('Method');
  res.json({ success: true, data: method });
}

async function create(req, res) {
  const { testID } = req.validated.params;

  const test = await db.Test.findByPk(testID);
  if (!test) throw new NotFoundError('Test');

  let method;
  if (req.validated.body.isDefault) {
    await db.sequelize.transaction(async (t) => {
      await db.Method.update(
        { isDefault: false },
        { where: { testID, isDefault: true }, transaction: t },
      );
      method = await db.Method.create(
        { ...req.validated.body, testID },
        { transaction: t, userId: req.user.userID },
      );
    });
  } else {
    method = await db.Method.create(
      { ...req.validated.body, testID },
      { userId: req.user.userID },
    );
  }

  res.status(201).json({
    success: true,
    message: 'Method created successfully',
    data: method,
  });
}

async function update(req, res) {
  const { methodID } = req.validated.params;
  const method = await db.Method.findByPk(methodID);
  if (!method) throw new NotFoundError('Method');

  if (req.validated.body.isDefault) {
    await db.sequelize.transaction(async (t) => {
      await db.Method.update(
        { isDefault: false },
        {
          where: { testID: method.testID, isDefault: true, methodID: { [Op.ne]: methodID } },
          transaction: t,
        },
      );
      await method.auditedUpdate(req.validated.body, req.user.userID, { transaction: t });
    });
  } else {
    await method.auditedUpdate(req.validated.body, req.user.userID);
  }

  res.json({
    success: true,
    message: 'Method updated successfully',
    data: method,
  });
}

async function softDelete(req, res) {
  const { methodID } = req.validated.params;
  const method = await db.Method.findByPk(methodID);
  if (!method) throw new NotFoundError('Method');

  // TODO: when downstream tables (WorksheetTest etc.) ship, add child-count checks here
  // per Parent Deletion Policy (api-conventions.md) and throw ConflictError if any > 0

  await method.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, listAll, getOne, create, createAll, update, softDelete };
