'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./ocmElement.controller');
const {
  ocmElementCreateSchema,
  ocmElementUpdateSchema,
  ocmElementIdParamSchema,
  ocmElementListQuerySchema,
} = require('./ocmElement.validation');

const router = Router();

router.use(requireJwtAuth);

router.get(
  '/',
  validate({ query: ocmElementListQuerySchema }),
  controller.list,
);

router.get(
  '/:ocmElementID',
  validate({ params: ocmElementIdParamSchema }),
  controller.getOne,
);

router.post(
  '/',
  validate({ body: ocmElementCreateSchema }),
  controller.create,
);

router.put(
  '/:ocmElementID',
  validate({ params: ocmElementIdParamSchema, body: ocmElementUpdateSchema }),
  controller.update,
);

router.delete(
  '/:ocmElementID',
  validate({ params: ocmElementIdParamSchema }),
  controller.softDelete,
);

module.exports = router;
