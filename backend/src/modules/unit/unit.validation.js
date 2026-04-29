'use strict';

const { z } = require('zod');

const unitCreateSchema = z.object({
  name:     z.string().min(1).max(100),
  symbol:   z.string().min(1).max(30),
  isActive: z.boolean().optional().default(true),
}).strict();

// Flat-route create: categoryID in BODY (master-data /units page).
const unitCreateAllSchema = z.object({
  categoryID: z.string().uuid('categoryID must be a valid UUID'),
  name:       z.string().min(1).max(100),
  symbol:     z.string().min(1).max(30),
  isActive:   z.boolean().optional().default(true),
}).strict();

const unitUpdateSchema = z.object({
  name:     z.string().min(1).max(100),
  symbol:   z.string().min(1).max(30),
  isActive: z.boolean(),
}).strict();

const unitIdParamSchema = z.object({
  unitID: z.string().uuid('unitID must be a valid UUID'),
}).strict();

const categoryIdParamSchema = z.object({
  categoryID: z.string().uuid('categoryID must be a valid UUID'),
}).strict();

const unitListQuerySchema = z.object({
  page:     z.coerce.number().int().positive().optional().default(1),
  limit:    z.coerce.number().int().positive().max(100).optional().default(20),
  search:   z.string().optional(),
  isActive: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort:     z.enum(['name', 'symbol', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  order:    z.enum(['asc', 'desc']).optional().default('desc'),
}).strict();

// Same as nested list but adds categoryID filter (since not in URL).
const unitListAllQuerySchema = z.object({
  page:       z.coerce.number().int().positive().optional().default(1),
  limit:      z.coerce.number().int().positive().max(100).optional().default(20),
  search:     z.string().optional(),
  categoryID: z.string().uuid().optional(),
  isActive:   z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort:       z.enum(['name', 'symbol', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  order:      z.enum(['asc', 'desc']).optional().default('desc'),
}).strict();

module.exports = {
  unitCreateSchema,
  unitCreateAllSchema,
  unitUpdateSchema,
  unitIdParamSchema,
  categoryIdParamSchema,
  unitListQuerySchema,
  unitListAllQuerySchema,
};
