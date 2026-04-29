'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

async function list(req, res) {
  const { page, limit, search, isActive, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { label: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.SourceType.findAndCountAll({
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
  const { sourceTypeID } = req.validated.params;
  const sourceType = await db.SourceType.findByPk(sourceTypeID);
  if (!sourceType) throw new NotFoundError('SourceType');
  res.json({ success: true, data: sourceType });
}

async function create(req, res) {
  const sourceType = await db.SourceType.create(req.validated.body, {
    userId: req.user.userID,
  });
  res.status(201).json({
    success: true,
    message: 'SourceType created successfully',
    data: sourceType,
  });
}

async function update(req, res) {
  const { sourceTypeID } = req.validated.params;
  const sourceType = await db.SourceType.findByPk(sourceTypeID);
  if (!sourceType) throw new NotFoundError('SourceType');
  await sourceType.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'SourceType updated successfully',
    data: sourceType,
  });
}

async function softDelete(req, res) {
  const { sourceTypeID } = req.validated.params;
  const sourceType = await db.SourceType.findByPk(sourceTypeID);
  if (!sourceType) throw new NotFoundError('SourceType');

  // TODO: block delete when Sources reference this sourceType (Source API — next)

  await sourceType.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, getOne, create, update, softDelete };
