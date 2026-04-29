'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./equipment.controller');
const {
  equipmentCreateSchema,
  equipmentUpdateSchema,
  equipmentIdParamSchema,
  equipmentListQuerySchema,
} = require('./equipment.validation');

const router = Router();

router.use(requireJwtAuth);

router.get(
  '/',
  validate({ query: equipmentListQuerySchema }),
  controller.list,
);

router.get(
  '/:equipmentID',
  validate({ params: equipmentIdParamSchema }),
  controller.getOne,
);

router.post(
  '/',
  validate({ body: equipmentCreateSchema }),
  controller.create,
);

router.put(
  '/:equipmentID',
  validate({ params: equipmentIdParamSchema, body: equipmentUpdateSchema }),
  controller.update,
);

router.delete(
  '/:equipmentID',
  validate({ params: equipmentIdParamSchema }),
  controller.softDelete,
);

module.exports = router;
