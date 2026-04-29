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
      { symbol: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.OcmElement.findAndCountAll({
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
  const { ocmElementID } = req.validated.params;
  const ocmElement = await db.OcmElement.findByPk(ocmElementID);
  if (!ocmElement) throw new NotFoundError('OcmElement');
  res.json({ success: true, data: ocmElement });
}

async function create(req, res) {
  const ocmElement = await db.OcmElement.create(req.validated.body, {
    userId: req.user.userID,
  });
  res.status(201).json({
    success: true,
    message: 'OcmElement created successfully',
    data: ocmElement,
  });
}

async function update(req, res) {
  const { ocmElementID } = req.validated.params;
  const ocmElement = await db.OcmElement.findByPk(ocmElementID);
  if (!ocmElement) throw new NotFoundError('OcmElement');
  await ocmElement.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'OcmElement updated successfully',
    data: ocmElement,
  });
}

async function softDelete(req, res) {
  const { ocmElementID } = req.validated.params;
  const ocmElement = await db.OcmElement.findByPk(ocmElementID);
  if (!ocmElement) throw new NotFoundError('OcmElement');

  // TODO: block delete when OcmElementResult references this element (Module 7)

  await ocmElement.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, getOne, create, update, softDelete };
