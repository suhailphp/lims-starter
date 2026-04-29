'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./specification.controller');
const {
  specificationCreateSchema,
  specificationUpdateSchema,
  specificationIdParamSchema,
  specificationListQuerySchema,
} = require('./specification.validation');

const router = Router();

router.use(requireJwtAuth);

router.get(
  '/',
  validate({ query: specificationListQuerySchema }),
  controller.list,
);

router.get(
  '/:specificationID',
  validate({ params: specificationIdParamSchema }),
  controller.getOne,
);

router.post(
  '/',
  validate({ body: specificationCreateSchema }),
  controller.create,
);

router.put(
  '/:specificationID',
  validate({ params: specificationIdParamSchema, body: specificationUpdateSchema }),
  controller.update,
);

router.delete(
  '/:specificationID',
  validate({ params: specificationIdParamSchema }),
  controller.softDelete,
);

module.exports = router;
