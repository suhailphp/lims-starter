'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./unit.controller');
const {
  unitCreateSchema,
  unitCreateAllSchema,
  unitUpdateSchema,
  unitIdParamSchema,
  categoryIdParamSchema,
  unitListQuerySchema,
  unitListAllQuerySchema,
} = require('./unit.validation');

// Nested router — mounted at /api/categories/:categoryID/units
// mergeParams:true exposes :categoryID from the parent router
const nestedRouter = Router({ mergeParams: true });
nestedRouter.use(requireJwtAuth);

nestedRouter.get(
  '/',
  validate({ params: categoryIdParamSchema, query: unitListQuerySchema }),
  controller.list,
);

nestedRouter.post(
  '/',
  validate({ params: categoryIdParamSchema, body: unitCreateSchema }),
  controller.create,
);

// Flat router — mounted at /api/units
const unitRouter = Router();
unitRouter.use(requireJwtAuth);

// Global list + create across all categories (master-data /units page).
unitRouter.get(
  '/',
  validate({ query: unitListAllQuerySchema }),
  controller.listAll,
);

unitRouter.post(
  '/',
  validate({ body: unitCreateAllSchema }),
  controller.createAll,
);

unitRouter.get(
  '/:unitID',
  validate({ params: unitIdParamSchema }),
  controller.getOne,
);

unitRouter.put(
  '/:unitID',
  validate({ params: unitIdParamSchema, body: unitUpdateSchema }),
  controller.update,
);

unitRouter.delete(
  '/:unitID',
  validate({ params: unitIdParamSchema }),
  controller.softDelete,
);

module.exports = { nestedRouter, unitRouter };
