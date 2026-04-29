'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const { validate } = require('../../middleware/validate');
const controller = require('./user.controller');
const {
  userCreateSchema,
  userUpdateSchema,
  userIdParamSchema,
  userListQuerySchema,
  userResetPasswordSchema,
} = require('./user.validation');

const { userScopedRouter: userActivityScopedRouter } = require('../userActivity/userActivity.routes');

const router = Router();

router.use(requireJwtAuth);

// Nested: /api/users/:userID/activities — admin/manager/self gating in controller.
router.use('/:userID/activities', userActivityScopedRouter);

router.get(
  '/',
  requireRole(['ADMIN', 'MANAGER']),
  validate({ query: userListQuerySchema }),
  controller.list,
);

router.post(
  '/',
  requireRole('ADMIN'),
  validate({ body: userCreateSchema }),
  controller.create,
);

router.get(
  '/:userID',
  validate({ params: userIdParamSchema }),
  controller.getOne,
);

router.put(
  '/:userID',
  validate({ params: userIdParamSchema, body: userUpdateSchema }),
  controller.update,
);

router.delete(
  '/:userID',
  requireRole('ADMIN'),
  validate({ params: userIdParamSchema }),
  controller.softDelete,
);

router.post(
  '/:userID/reset-password',
  requireRole('ADMIN'),
  validate({ params: userIdParamSchema, body: userResetPasswordSchema }),
  controller.resetPassword,
);

module.exports = router;
