'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const { validate } = require('../../middleware/validate');
const uploadImage = require('../../middleware/uploadImage');
const controller = require('./settings.controller');
const {
  settingKeyParam,
  categoryParam,
  updateBody,
  bulkBody,
} = require('./settings.validation');

const router = Router();

/* The /public route is the only auth-free entry — used by the login page
 * and by the SettingsContext on app boot to render lab name / logo before
 * the user signs in. Everything else requires ADMIN. */
router.get('/public', controller.listPublic);

router.use(requireJwtAuth);

router.get('/', requireRole(['ADMIN']), controller.listAll);

router.get(
  '/category/:category',
  requireRole(['ADMIN']),
  validate({ params: categoryParam }),
  controller.listByCategory,
);

router.put(
  '/bulk',
  requireRole(['ADMIN']),
  validate({ body: bulkBody }),
  controller.bulkUpdate,
);

router.post(
  '/lab-logo',
  requireRole(['ADMIN']),
  uploadImage.single('file'),
  controller.uploadLogo,
);

router.get(
  '/:settingKey',
  requireRole(['ADMIN']),
  validate({ params: settingKeyParam }),
  controller.getOne,
);

router.put(
  '/:settingKey',
  requireRole(['ADMIN']),
  validate({ params: settingKeyParam, body: updateBody }),
  controller.update,
);

module.exports = router;
