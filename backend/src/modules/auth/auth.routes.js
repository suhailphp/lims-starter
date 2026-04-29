'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./auth.controller');
const {
  loginSchema,
  refreshSchema,
  logoutSchema,
  changePasswordSchema,
} = require('./auth.validation');

const router = Router();

router.post(
  '/login',
  validate({ body: loginSchema }),
  controller.login,
);

router.post(
  '/refresh',
  validate({ body: refreshSchema }),
  controller.refresh,
);

router.post(
  '/logout',
  requireJwtAuth,
  validate({ body: logoutSchema }),
  controller.logout,
);

router.get(
  '/me',
  requireJwtAuth,
  controller.me,
);

router.post(
  '/change-password',
  requireJwtAuth,
  validate({ body: changePasswordSchema }),
  controller.changePassword,
);

module.exports = router;
