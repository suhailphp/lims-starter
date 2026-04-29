'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { ForbiddenError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

/**
 * GET /api/users/:userID/activities
 *   - ADMIN/MANAGER: any user
 *   - Non-staff: self only
 *
 * GET /api/users/me/activities is the same handler with userID resolved
 * from req.user.userID — see the route file.
 */
async function list(req, res) {
  const { page, limit, actionType, from, to } = req.validated.query;
  const { offset } = parsePagination({ page, limit });
  const { userID } = req.params;

  const isStaff = req.user.role === 'ADMIN' || req.user.role === 'MANAGER';
  const isSelf = req.user.userID === userID;
  if (!isStaff && !isSelf) {
    throw new ForbiddenError('Cannot view other users\' activities');
  }

  const where = { userID };
  if (actionType) where.actionType = actionType;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt[Op.gte] = from;
    if (to) where.createdAt[Op.lte] = to;
  }

  const { rows, count } = await db.UserActivity.findAndCountAll({
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
 * GET /api/users/me/timeline?page&limit&filter
 *
 * Unified self-feed: UserActivities (auth events, profile/photo/password
 * events) merged with this user's own AuditLogs (data mutations they
 * performed). Each item is tagged with `source` so the frontend renders
 * appropriately.
 *
 * Strategy: two parallel queries → merge in JS → sort → slice. At lab
 * scale (≤100 rows/page) this is faster + far simpler than a SQL UNION.
 * Both tables have `(userID, createdAt DESC)` indexes so each side is a
 * cheap range scan. We over-fetch `page * limit` rows from each side so
 * the merged window definitely contains the requested page.
 */
async function timeline(req, res) {
  const { page, limit, filter } = req.validated.query;
  const offset = (page - 1) * limit;
  const userID = req.user.userID;
  const overFetch = page * limit;

  const wantActivities = filter === 'all' || filter === 'activities';
  const wantChanges = filter === 'all' || filter === 'changes';

  const [activities, changes, activitiesTotal, changesTotal] = await Promise.all([
    wantActivities
      ? db.UserActivity.findAll({
          where: { userID },
          order: [['createdAt', 'DESC']],
          limit: overFetch,
        })
      : Promise.resolve([]),
    wantChanges
      ? db.AuditLog.findAll({
          where: { userID },
          order: [['createdAt', 'DESC']],
          limit: overFetch,
        })
      : Promise.resolve([]),
    wantActivities ? db.UserActivity.count({ where: { userID } }) : Promise.resolve(0),
    wantChanges ? db.AuditLog.count({ where: { userID } }) : Promise.resolve(0),
  ]);

  const merged = [
    ...activities.map((a) => ({
      source: 'user_activity',
      id: a.activityID,
      createdAt: a.createdAt,
      actionType: a.actionType,
      actionLabel: a.actionLabel,
      description: a.description,
      ipAddress: a.ipAddress,
      userAgent: a.userAgent,
    })),
    ...changes.map((c) => ({
      source: 'audit_log',
      id: c.auditLogID,
      createdAt: c.createdAt,
      action: c.action,
      entityType: c.entityType,
      entityID: c.entityID,
      changes: c.changes,
      ipAddress: c.ipAddress,
      userAgent: c.userAgent,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = activitiesTotal + changesTotal;
  const data = merged.slice(offset, offset + limit);

  res.json({
    success: true,
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
}

module.exports = { list, timeline };
