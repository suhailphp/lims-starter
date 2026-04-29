'use strict';

const jwt = require('jsonwebtoken');
const db = require('../models');
const { UnauthorizedError } = require('../utils/errors');
const { getContext } = require('../utils/requestContext');

const BEARER_RE = /^Bearer (.+)$/;

async function requireJwtAuth(req, _res, next) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next(new Error('JWT_SECRET is not configured'));
    }

    const header = req.header('Authorization');
    if (!header) {
      return next(new UnauthorizedError('Missing Authorization header'));
    }
    const match = BEARER_RE.exec(header);
    if (!match) {
      return next(new UnauthorizedError('Authorization header must be Bearer <token>'));
    }
    const token = match[1];

    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(new UnauthorizedError('Access token expired'));
      }
      return next(new UnauthorizedError('Invalid access token'));
    }

    if (!payload.sub) {
      return next(new UnauthorizedError('Token missing subject'));
    }

    const user = await db.User.findByPk(payload.sub, {
      attributes: ['userID', 'email', 'role', 'customerID', 'isActive', 'passwordChangedAt'],
    });

    if (!user) return next(new UnauthorizedError('User not found'));
    if (!user.isActive) return next(new UnauthorizedError('User is inactive'));

    if (user.passwordChangedAt) {
      // JWT iat has whole-second precision; passwordChangedAt has ms precision.
      // Round passwordChangedAt down to seconds so a token issued in the same
      // second the password was set is not falsely rejected.
      const passwordChangedAtSec = Math.floor(user.passwordChangedAt.getTime() / 1000);
      if ((payload.iat || 0) < passwordChangedAtSec) {
        return next(new UnauthorizedError('Token revoked by password change'));
      }
    }

    req.user = {
      userID: user.userID,
      email: user.email,
      role: user.role,
      customerID: user.customerID,
    };

    // Update the AsyncLocalStorage context (set earlier by the
    // top-level requestContext middleware) with the now-known userId.
    // Audit hooks downstream (utils/auditableModel.js) read userId from
    // here. Mutate the store object directly — we're inside the same
    // ALS run scope.
    const ctx = getContext();
    ctx.userId = user.userID;

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = requireJwtAuth;
