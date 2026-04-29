'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError, ConflictError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

async function list(req, res) {
  const { page, limit, search, type, isActive, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (type) where.type = type;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  const { rows, count } = await db.Category.findAndCountAll({
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
  const { categoryID } = req.validated.params;
  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');
  res.json({ success: true, data: category });
}

async function create(req, res) {
  const payload = req.validated.body;
  const category = await db.Category.create(payload, { userId: req.user.userID });
  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
}

async function update(req, res) {
  const { categoryID } = req.validated.params;
  const payload = req.validated.body;
  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');
  await category.auditedUpdate(payload, req.user.userID);
  res.json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
}

async function softDelete(req, res) {
  const { categoryID } = req.validated.params;
  const category = await db.Category.findByPk(categoryID);
  if (!category) throw new NotFoundError('Category');

  const [unitsCount, testsCount, sourcesCount] = await Promise.all([
    db.Unit.count({ where: { categoryID } }),
    db.Test.count({ where: { categoryID } }),
    db.Source.count({ where: { categoryID } }),
  ]);

  const blockers = [];
  if (unitsCount > 0)   blockers.push({ field: 'units',   message: `${unitsCount} active unit(s) reference this category` });
  if (testsCount > 0)   blockers.push({ field: 'tests',   message: `${testsCount} active test(s) reference this category` });
  if (sourcesCount > 0) blockers.push({ field: 'sources', message: `${sourcesCount} active source(s) reference this category` });

  if (blockers.length > 0) {
    throw new ConflictError('Cannot delete category with active references', blockers);
  }

  await category.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, getOne, create, update, softDelete };
