'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./search.controller');
const { searchQuerySchema } = require('./search.validation');

const router = Router();

router.use(requireJwtAuth);

/* Phase 1: ADMIN/MANAGER full results, others get an empty payload (gated
 * inside searchService.canSearch). When per-entity role rules land, the
 * gate moves into each entity's fetcher. */
router.get(
  '/',
  validate({ query: searchQuerySchema }),
  controller.globalSearch,
);

module.exports = router;
