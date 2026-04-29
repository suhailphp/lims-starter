'use strict';

const { z } = require('zod');
const { TYPES, PRIORITIES } = require('../../models/Notification');

const notificationListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  unreadOnly: z.coerce.boolean().optional(),
  type: z.enum(TYPES).optional(),
  priority: z.enum(PRIORITIES).optional(),
});

const notificationIdParamSchema = z.object({
  notificationID: z.string().uuid(),
});

module.exports = {
  notificationListQuerySchema,
  notificationIdParamSchema,
};
