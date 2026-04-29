'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./category.controller');
const {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdParamSchema,
  categoryListQuerySchema,
} = require('./category.validation');
const { nestedRouter: unitNestedRouter } = require('../unit/unit.routes');
const { nestedRouter: testNestedRouter } = require('../test/test.routes');

const router = Router();

router.use(requireJwtAuth);

router.get(
  '/',
  validate({ query: categoryListQuerySchema }),
  controller.list,
);

router.get(
  '/:categoryID',
  validate({ params: categoryIdParamSchema }),
  controller.getOne,
);

router.post(
  '/',
  validate({ body: categoryCreateSchema }),
  controller.create,
);

router.put(
  '/:categoryID',
  validate({ params: categoryIdParamSchema, body: categoryUpdateSchema }),
  controller.update,
);

router.delete(
  '/:categoryID',
  validate({ params: categoryIdParamSchema }),
  controller.softDelete,
);

// Nested child resources
router.use('/:categoryID/units', unitNestedRouter);
router.use('/:categoryID/tests', testNestedRouter);

module.exports = router;
