'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const { validate } = require('../../middleware/validate');
const controller = require('./auditLog.controller');
const {
  auditLogListQuerySchema,
  auditLogIdParamSchema,
  auditLogHistoryParamSchema,
} = require('./auditLog.validation');

const router = Router();

router.use(requireJwtAuth);
// Audit logs are forensic — restricted to ADMIN/MANAGER only. Module 8
// (Audit Logs UI) will surface this. Other roles get 403.
router.use(requireRole(['ADMIN', 'MANAGER']));

router.get(
  '/',
  validate({ query: auditLogListQuerySchema }),
  controller.list,
);

router.get(
  '/:entityType/:entityID/history',
  validate({ params: auditLogHistoryParamSchema }),
  controller.history,
);

router.get(
  '/:auditLogID',
  validate({ params: auditLogIdParamSchema }),
  controller.getOne,
);

module.exports = router;
