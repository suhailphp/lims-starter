'use strict';

const db = require('../models');
const { getContext } = require('../utils/requestContext');

/**
 * UserActivity logger — manual writes from controllers (auth + user).
 *
 * Distinct from the AuditLog Sequelize hooks: UserActivity events aren't
 * row mutations (LOGIN, LOGOUT, LOGIN_FAILED happen against in-memory
 * state). Each event is logged here with an explicit call.
 *
 * IP and user-agent come from the request context (AsyncLocalStorage)
 * if available; can also be passed explicitly via `req`.
 *
 * Best-effort: errors are caught and console.error'd. A logging failure
 * must never break the parent request (login, profile save, etc.).
 */
async function logActivity({
  userID,
  actionType,
  label,
  description,
  metadata,
  req, // optional — explicit override; otherwise pulled from ALS context
}) {
  try {
    const ctx = getContext();
    const ipAddress = req?.ip ?? ctx.ipAddress ?? null;
    const userAgent = req?.get?.('User-Agent') ?? ctx.userAgent ?? null;

    await db.UserActivity.create({
      userID,
      actionType,
      actionLabel: label,
      description: description ?? null,
      ipAddress,
      userAgent,
      metadata: metadata ?? {},
    });
  } catch (err) {
    console.error('[user-activity] logActivity failed', {
      actionType,
      message: err.message,
    });
  }
}

module.exports = { logActivity };
