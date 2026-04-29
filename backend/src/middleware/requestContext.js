'use strict';

const { runWithContext } = require('../utils/requestContext');

/**
 * Establishes a per-request AsyncLocalStorage context that carries:
 *   - userId        (req.user.userID, set by requireJwtAuth)
 *   - ipAddress     (req.ip)
 *   - userAgent     (User-Agent header)
 *   - requestId     (req.id)
 *
 * MUST be mounted AFTER `requireJwtAuth` on protected routers so `req.user`
 * is populated. For unauthenticated endpoints (login, public health) the
 * context still runs but `userId` is null, and audit hooks bail on it.
 *
 * Hooks downstream (Sequelize afterCreate/afterUpdate/afterDestroy on
 * audited models, activityLogger calls, etc.) read this via
 * `utils/requestContext.getContext()`.
 */
module.exports = (req, _res, next) => {
  const ctx = {
    userId: req.user ? req.user.userID : null,
    ipAddress: req.ip || null,
    userAgent: req.get('User-Agent') || null,
    requestId: req.id || null,
  };
  runWithContext(ctx, () => next());
};
