'use strict';

const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

function requireRole(roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return function roleGuard(req, _res, next) {
    if (!req.user) return next(new UnauthorizedError('Authentication required'));
    if (!allowed.includes(req.user.role)) {
      return next(new ForbiddenError(`Requires role: ${allowed.join(' | ')}`));
    }
    return next();
  };
}

module.exports = requireRole;
