'use strict';

const { z } = require('zod');
const { ACTIONS } = require('../../models/AuditLog');

const auditLogListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  entityType: z.string().min(1).max(50).optional(),
  entityID: z.string().uuid().optional(),
  userID: z.string().uuid().optional(),
  action: z.enum(ACTIONS).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

const auditLogIdParamSchema = z.object({
  auditLogID: z.string().uuid(),
});

const auditLogHistoryParamSchema = z.object({
  entityType: z.string().min(1).max(50),
  entityID: z.string().uuid(),
});

module.exports = {
  auditLogListQuerySchema,
  auditLogIdParamSchema,
  auditLogHistoryParamSchema,
};
