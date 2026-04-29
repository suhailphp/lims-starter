'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./method.controller');
const {
  methodCreateSchema,
  methodCreateAllSchema,
  methodUpdateSchema,
  methodIdParamSchema,
  testIdParamSchema,
  methodListQuerySchema,
  methodListAllQuerySchema,
} = require('./method.validation');

// Nested router — mounted at /api/tests/:testID/methods
const nestedRouter = Router({ mergeParams: true });
nestedRouter.use(requireJwtAuth);

nestedRouter.get(
  '/',
  validate({ params: testIdParamSchema, query: methodListQuerySchema }),
  controller.list,
);

nestedRouter.post(
  '/',
  validate({ params: testIdParamSchema, body: methodCreateSchema }),
  controller.create,
);

// Flat router — mounted at /api/methods
const methodRouter = Router();
methodRouter.use(requireJwtAuth);

methodRouter.get(
  '/',
  validate({ query: methodListAllQuerySchema }),
  controller.listAll,
);

methodRouter.post(
  '/',
  validate({ body: methodCreateAllSchema }),
  controller.createAll,
);

methodRouter.get(
  '/:methodID',
  validate({ params: methodIdParamSchema }),
  controller.getOne,
);

methodRouter.put(
  '/:methodID',
  validate({ params: methodIdParamSchema, body: methodUpdateSchema }),
  controller.update,
);

methodRouter.delete(
  '/:methodID',
  validate({ params: methodIdParamSchema }),
  controller.softDelete,
);

module.exports = { nestedRouter, methodRouter };
