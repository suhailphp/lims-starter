'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./test.controller');
const {
  testCreateSchema,
  testCreateAllSchema,
  testUpdateSchema,
  testIdParamSchema,
  categoryIdParamSchema,
  testListQuerySchema,
  testListAllQuerySchema,
} = require('./test.validation');
const { nestedRouter: methodNestedRouter } = require('../method/method.routes');

// Nested router — mounted at /api/categories/:categoryID/tests
const nestedRouter = Router({ mergeParams: true });
nestedRouter.use(requireJwtAuth);

nestedRouter.get(
  '/',
  validate({ params: categoryIdParamSchema, query: testListQuerySchema }),
  controller.list,
);

nestedRouter.post(
  '/',
  validate({ params: categoryIdParamSchema, body: testCreateSchema }),
  controller.create,
);

// Flat router — mounted at /api/tests
const testRouter = Router();
testRouter.use(requireJwtAuth);

testRouter.get(
  '/',
  validate({ query: testListAllQuerySchema }),
  controller.listAll,
);

testRouter.post(
  '/',
  validate({ body: testCreateAllSchema }),
  controller.createAll,
);

testRouter.get(
  '/:testID',
  validate({ params: testIdParamSchema }),
  controller.getOne,
);

testRouter.put(
  '/:testID',
  validate({ params: testIdParamSchema, body: testUpdateSchema }),
  controller.update,
);

testRouter.delete(
  '/:testID',
  validate({ params: testIdParamSchema }),
  controller.softDelete,
);

// Nested child resources
testRouter.use('/:testID/methods', methodNestedRouter);

module.exports = { nestedRouter, testRouter };
