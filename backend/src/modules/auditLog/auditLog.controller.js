'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

/**
 * GET /api/audit-logs
 *
 * Filters: entityType, entityID, userID, action, fromDate, toDate.
 * Sorted createdAt DESC, paginated.
 *
 * Auth: ADMIN | MANAGER (gated in routes).
 */
async function list(req, res) {
  const { page, limit, entityType, entityID, userID, action, from, to } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (entityType) where.entityType = entityType;
  if (entityID) where.entityID = entityID;
  if (userID) where.userID = userID;
  if (action) where.action = action;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt[Op.gte] = from;
    if (to) where.createdAt[Op.lte] = to;
  }

  const { rows, count } = await db.AuditLog.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

/**
 * GET /api/audit-logs/:entityType/:entityID/history
 * Timeline of every change for one record.
 */
async function history(req, res) {
  const { entityType, entityID } = req.validated.params;

  const rows = await db.AuditLog.findAll({
    where: { entityType, entityID },
    order: [['createdAt', 'DESC']],
  });

  res.json({ success: true, data: rows });
}

/**
 * GET /api/audit-logs/:auditLogID
 * Single audit row with full changes diff.
 */
async function getOne(req, res) {
  const { auditLogID } = req.validated.params;
  const row = await db.AuditLog.findByPk(auditLogID);
  if (!row) throw new NotFoundError('Audit log');
  res.json({ success: true, data: row });
}

module.exports = { list, history, getOne };
