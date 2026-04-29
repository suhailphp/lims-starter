'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const applyCustomerScope = require('../../middleware/applyCustomerScope');
const { validate } = require('../../middleware/validate');
const controller = require('./source.controller');
const {
  sourceCreateSchema,
  sourceCreateAllSchema,
  sourceUpdateSchema,
  sourceIdParamSchema,
  customerIdParamSchema,
  sourceListQuerySchema,
  sourceListAllQuerySchema,
} = require('./source.validation');

// Nested router — mounted at /api/customers/:customerID/sources
const nestedRouter = Router({ mergeParams: true });
nestedRouter.use(requireJwtAuth);
nestedRouter.use(applyCustomerScope);

nestedRouter.get(
  '/',
  validate({ params: customerIdParamSchema, query: sourceListQuerySchema }),
  controller.list,
);

nestedRouter.post(
  '/',
  validate({ params: customerIdParamSchema, body: sourceCreateSchema }),
  controller.create,
);

// Flat router — mounted at /api/sources
const sourceRouter = Router();
sourceRouter.use(requireJwtAuth);
sourceRouter.use(applyCustomerScope);

// Global list + create across all customers (master-data /sources page).
// CUSTOMER role is auto-scoped via req.scope.
sourceRouter.get(
  '/',
  validate({ query: sourceListAllQuerySchema }),
  controller.listAll,
);

sourceRouter.post(
  '/',
  validate({ body: sourceCreateAllSchema }),
  controller.createAll,
);

sourceRouter.get(
  '/:sourceID',
  validate({ params: sourceIdParamSchema }),
  controller.getOne,
);

sourceRouter.put(
  '/:sourceID',
  validate({ params: sourceIdParamSchema, body: sourceUpdateSchema }),
  controller.update,
);

sourceRouter.delete(
  '/:sourceID',
  validate({ params: sourceIdParamSchema }),
  controller.softDelete,
);

module.exports = { nestedRouter, sourceRouter };
