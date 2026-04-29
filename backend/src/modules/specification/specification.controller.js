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
  if (search) where.name = { [Op.iLike]: `%${search}%` };

  const { rows, count } = await db.Specification.findAndCountAll({
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
  const { specificationID } = req.validated.params;
  const specification = await db.Specification.findByPk(specificationID);
  if (!specification) throw new NotFoundError('Specification');
  res.json({ success: true, data: specification });
}

async function create(req, res) {
  const specification = await db.Specification.create(req.validated.body, {
    userId: req.user.userID,
  });
  res.status(201).json({
    success: true,
    message: 'Specification created successfully',
    data: specification,
  });
}

async function update(req, res) {
  const { specificationID } = req.validated.params;
  const specification = await db.Specification.findByPk(specificationID);
  if (!specification) throw new NotFoundError('Specification');
  await specification.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'Specification updated successfully',
    data: specification,
  });
}

async function softDelete(req, res) {
  const { specificationID } = req.validated.params;
  const specification = await db.Specification.findByPk(specificationID);
  if (!specification) throw new NotFoundError('Specification');

  // TODO: block delete when Worksheet references this specification (Module 4)

  await specification.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, getOne, create, update, softDelete };
