'use strict';

const { z } = require('zod');

const methodCreateSchema = z.object({
  code:        z.string().min(1).max(50),
  description: z.string().optional().nullable(),
  isDefault:   z.boolean().optional().default(false),
  isActive:    z.boolean().optional().default(true),
}).strict();

// Flat-route create: testID in BODY (master-data /methods page).
const methodCreateAllSchema = z.object({
  testID:      z.string().uuid('testID must be a valid UUID'),
  code:        z.string().min(1).max(50),
  description: z.string().optional().nullable(),
  isDefault:   z.boolean().optional().default(false),
  isActive:    z.boolean().optional().default(true),
}).strict();

const methodUpdateSchema = z.object({
  code:        z.string().min(1).max(50),
  description: z.string().optional().nullable(),
  isDefault:   z.boolean(),
  isActive:    z.boolean(),
}).strict();

const methodIdParamSchema = z.object({
  methodID: z.string().uuid('methodID must be a valid UUID'),
}).strict();

const testIdParamSchema = z.object({
  testID: z.string().uuid('testID must be a valid UUID'),
}).strict();

const methodListQuerySchema = z.object({
  page:      z.coerce.number().int().positive().optional().default(1),
  limit:     z.coerce.number().int().positive().max(100).optional().default(20),
  search:    z.string().optional(),
  isDefault: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  isActive:  z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort:      z.enum(['code', 'isDefault', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  order:     z.enum(['asc', 'desc']).optional().default('desc'),
}).strict();

// Same as nested list but adds testID filter (since not in URL).
const methodListAllQuerySchema = z.object({
  page:      z.coerce.number().int().positive().optional().default(1),
  limit:     z.coerce.number().int().positive().max(100).optional().default(20),
  search:    z.string().optional(),
  testID:    z.string().uuid().optional(),
  isDefault: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  isActive:  z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort:      z.enum(['code', 'isDefault', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  order:     z.enum(['asc', 'desc']).optional().default('desc'),
}).strict();

module.exports = {
  methodCreateSchema,
  methodCreateAllSchema,
  methodUpdateSchema,
  methodIdParamSchema,
  testIdParamSchema,
  methodListQuerySchema,
  methodListAllQuerySchema,
};
