'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError, ConflictError, ForbiddenError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

// Scope helper: a CUSTOMER user (req.scope.customerID set) may only access
// their own customer record. Non-CUSTOMER roles have empty scope (full access).
function ensureScopeMatches(req, customerID) {
  if (req.scope && req.scope.customerID && req.scope.customerID !== customerID) {
    throw new ForbiddenError('Access denied: customer scope mismatch');
  }
}

async function list(req, res) {
  const { page, limit, search, isActive, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  // Customer PK is customerID, so spreading req.scope (e.g. { customerID })
  // limits a CUSTOMER user's list to their own record.
  const where = { ...(req.scope || {}) };
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { name:         { [Op.iLike]: `%${search}%` } },
      { contactName:  { [Op.iLike]: `%${search}%` } },
      { contactEmail: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.Customer.findAndCountAll({
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
  const { customerID } = req.validated.params;
  ensureScopeMatches(req, customerID);
  const customer = await db.Customer.findByPk(customerID);
  if (!customer) throw new NotFoundError('Customer');
  res.json({ success: true, data: customer });
}

async function create(req, res) {
  if (req.user && req.user.role === 'CUSTOMER') {
    throw new ForbiddenError('CUSTOMER role cannot create customers');
  }
  const payload = req.validated.body;
  const customer = await db.Customer.create(payload, { userId: req.user.userID });
  res.status(201).json({
    success: true,
    message: 'Customer created successfully',
    data: customer,
  });
}

async function update(req, res) {
  const { customerID } = req.validated.params;
  ensureScopeMatches(req, customerID);
  const payload = req.validated.body;
  const customer = await db.Customer.findByPk(customerID);
  if (!customer) throw new NotFoundError('Customer');
  await customer.auditedUpdate(payload, req.user.userID);
  res.json({
    success: true,
    message: 'Customer updated successfully',
    data: customer,
  });
}

async function softDelete(req, res) {
  const { customerID } = req.validated.params;
  ensureScopeMatches(req, customerID);
  const customer = await db.Customer.findByPk(customerID);
  if (!customer) throw new NotFoundError('Customer');

  const [usersCount, sourcesCount] = await Promise.all([
    db.User.count({ where: { customerID } }),
    db.Source.count({ where: { customerID } }),
  ]);

  const blockers = [];
  if (usersCount > 0)   blockers.push({ field: 'users',   message: `${usersCount} active user(s) reference this customer` });
  if (sourcesCount > 0) blockers.push({ field: 'sources', message: `${sourcesCount} active source(s) reference this customer` });

  if (blockers.length > 0) {
    throw new ConflictError('Cannot delete customer with active references', blockers);
  }

  await customer.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, getOne, create, update, softDelete };
