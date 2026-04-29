'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./userActivity.controller');
const {
  userActivityListQuerySchema,
  userActivityUserParamSchema,
  timelineQuerySchema,
} = require('./userActivity.validation');

/**
 * Mounted in app.js as:
 *   /api/users/me/activities      (resolves to req.user.userID)
 *   /api/users/:userID/activities (admin/manager/self)
 */
const meRouter = Router();
meRouter.use(requireJwtAuth);
meRouter.get(
  '/activities',
  validate({ query: userActivityListQuerySchema }),
  (req, res, next) => {
    // Resolve "me" → caller's own userID before the controller runs.
    req.params.userID = req.user.userID;
    return controller.list(req, res, next);
  },
);
meRouter.get(
  '/timeline',
  validate({ query: timelineQuerySchema }),
  controller.timeline,
);

const userScopedRouter = Router({ mergeParams: true });
userScopedRouter.use(requireJwtAuth);
userScopedRouter.get(
  '/',
  validate({ params: userActivityUserParamSchema, query: userActivityListQuerySchema }),
  controller.list,
);

module.exports = { meRouter, userScopedRouter };
