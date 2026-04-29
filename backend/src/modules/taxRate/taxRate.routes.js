'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const { validate } = require('../../middleware/validate');
const controller = require('./taxRate.controller');
const {
  taxRateCreateSchema,
  taxRateUpdateSchema,
  taxRateIdParamSchema,
  taxRateListQuerySchema,
} = require('./taxRate.validation');

const router = Router();

router.use(requireJwtAuth);

const adminOnly = requireRole(['ADMIN']);

/* ---------- read (any authed user — Quote/Invoice forms need the dropdown) ---------- */

router.get(
  '/',
  validate({ query: taxRateListQuerySchema }),
  controller.list,
);

router.get(
  '/:taxRateID',
  validate({ params: taxRateIdParamSchema }),
  controller.getOne,
);

/* ---------- write (ADMIN only) ---------- */

router.post(
  '/',
  adminOnly,
  validate({ body: taxRateCreateSchema }),
  controller.create,
);

router.put(
  '/:taxRateID',
  adminOnly,
  validate({ params: taxRateIdParamSchema, body: taxRateUpdateSchema }),
  controller.update,
);

router.delete(
  '/:taxRateID',
  adminOnly,
  validate({ params: taxRateIdParamSchema }),
  controller.softDelete,
);

router.put(
  '/:taxRateID/set-default',
  adminOnly,
  validate({ params: taxRateIdParamSchema }),
  controller.setAsDefault,
);

module.exports = router;
