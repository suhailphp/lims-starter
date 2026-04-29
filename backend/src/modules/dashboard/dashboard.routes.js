'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const controller = require('./dashboard.controller');

const router = Router();

router.use(requireJwtAuth);

/* ADMIN-only for now. When MANAGER/TECHNICIAN dashboards land they'll
 * be separate endpoints with their own role guards — keeps the payload
 * tightly scoped per audience. */
router.get('/admin-stats', requireRole(['ADMIN']), controller.adminStats);

module.exports = router;
