'use strict';

const { ForbiddenError } = require('../utils/errors');

// Sets req.scope for downstream controllers to merge into their where clauses.
// Non-CUSTOMER roles get an empty scope (full access). CUSTOMER role is locked
// to their own customerID. Mount AFTER requireJwtAuth.
function applyCustomerScope(req, _res, next) {
  if (!req.user) {
    req.scope = {};
    return next();
  }
  if (req.user.role === 'CUSTOMER') {
    if (!req.user.customerID) {
      return next(new ForbiddenError('Customer user has no associated customer'));
    }
    req.scope = { customerID: req.user.customerID };
  } else {
    req.scope = {};
  }
  return next();
}

module.exports = applyCustomerScope;
