'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./sourceType.controller');
const {
  sourceTypeCreateSchema,
  sourceTypeUpdateSchema,
  sourceTypeIdParamSchema,
  sourceTypeListQuerySchema,
} = require('./sourceType.validation');

const router = Router();

router.use(requireJwtAuth);

router.get(
  '/',
  validate({ query: sourceTypeListQuerySchema }),
  controller.list,
);

router.get(
  '/:sourceTypeID',
  validate({ params: sourceTypeIdParamSchema }),
  controller.getOne,
);

router.post(
  '/',
  validate({ body: sourceTypeCreateSchema }),
  controller.create,
);

router.put(
  '/:sourceTypeID',
  validate({ params: sourceTypeIdParamSchema, body: sourceTypeUpdateSchema }),
  controller.update,
);

router.delete(
  '/:sourceTypeID',
  validate({ params: sourceTypeIdParamSchema }),
  controller.softDelete,
);

module.exports = router;
