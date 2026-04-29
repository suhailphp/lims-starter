'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const applyCustomerScope = require('../../middleware/applyCustomerScope');
const { validate } = require('../../middleware/validate');
const controller = require('./customer.controller');
const {
  customerCreateSchema,
  customerUpdateSchema,
  customerIdParamSchema,
  customerListQuerySchema,
} = require('./customer.validation');
const { nestedRouter: sourceNestedRouter } = require('../source/source.routes');

const router = Router();

router.use(requireJwtAuth);
router.use(applyCustomerScope);

router.get(
  '/',
  validate({ query: customerListQuerySchema }),
  controller.list,
);

router.get(
  '/:customerID',
  validate({ params: customerIdParamSchema }),
  controller.getOne,
);

router.post(
  '/',
  validate({ body: customerCreateSchema }),
  controller.create,
);

router.put(
  '/:customerID',
  validate({ params: customerIdParamSchema, body: customerUpdateSchema }),
  controller.update,
);

router.delete(
  '/:customerID',
  validate({ params: customerIdParamSchema }),
  controller.softDelete,
);

// Nested child resources
router.use('/:customerID/sources', sourceNestedRouter);

module.exports = router;
