'use strict';

const { z } = require('zod');
const { ACTION_TYPES } = require('../../models/UserActivity');

const userActivityListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  actionType: z.enum(ACTION_TYPES).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

const userActivityUserParamSchema = z.object({
  userID: z.string().uuid(),
});

const timelineQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  filter: z.enum(['all', 'activities', 'changes']).default('all'),
});

module.exports = {
  userActivityListQuerySchema,
  userActivityUserParamSchema,
  timelineQuerySchema,
};
