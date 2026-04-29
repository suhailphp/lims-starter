'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const { validate } = require('../../middleware/validate');
const controller = require('./notification.controller');
const {
  notificationListQuerySchema,
  notificationIdParamSchema,
} = require('./notification.validation');

const router = Router();

router.use(requireJwtAuth);

// More specific /me routes mount BEFORE /:notificationID so "me" doesn't
// match the UUID param schema.
router.get(
  '/me',
  validate({ query: notificationListQuerySchema }),
  controller.listMine,
);

router.get('/me/unread-count', controller.unreadCount);

router.put('/me/read-all', controller.markAllRead);

router.put(
  '/:notificationID/read',
  validate({ params: notificationIdParamSchema }),
  controller.markRead,
);

router.delete(
  '/:notificationID',
  validate({ params: notificationIdParamSchema }),
  controller.dismiss,
);

module.exports = router;
