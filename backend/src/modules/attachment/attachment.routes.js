'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const { validate } = require('../../middleware/validate');
const upload = require('../../middleware/uploadImage');
const controller = require('./attachment.controller');
const { attachmentIdParamSchema } = require('./attachment.validation');

const router = Router();

router.use(requireJwtAuth);

// Upload + delete are admin-managed for now (User photos are an admin task).
// When customers self-upload logos, this gating will widen.
router.post(
  '/',
  requireRole(['ADMIN', 'MANAGER']),
  upload.single('file'),
  controller.create,
);

router.get(
  '/:attachmentID',
  validate({ params: attachmentIdParamSchema }),
  controller.getOne,
);

router.delete(
  '/:attachmentID',
  requireRole(['ADMIN', 'MANAGER']),
  validate({ params: attachmentIdParamSchema }),
  controller.destroy,
);

module.exports = router;
