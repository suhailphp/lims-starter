'use strict';

const { z } = require('zod');

const resultType = z.enum(['NUMERIC', 'TEXT', 'THRESHOLD']);

const testCreateSchema = z.object({
  name:          z.string().min(1).max(150),
  decimalPlaces: z.number().int().min(0).max(6).optional().default(2),
  resultType:    resultType.optional().default('NUMERIC'),
  isActive:      z.boolean().optional().default(true),
}).strict();

// Flat-route create: categoryID in BODY (master-data /tests page).
const testCreateAllSchema = z.object({
  categoryID:    z.string().uuid('categoryID must be a valid UUID'),
  name:          z.string().min(1).max(150),
  decimalPlaces: z.number().int().min(0).max(6).optional().default(2),
  resultType:    resultType.optional().default('NUMERIC'),
  isActive:      z.boolean().optional().default(true),
}).strict();

const testUpdateSchema = z.object({
  name:          z.string().min(1).max(150),
  decimalPlaces: z.number().int().min(0).max(6),
  resultType:    resultType,
  isActive:      z.boolean(),
}).strict();

const testIdParamSchema = z.object({
  testID: z.string().uuid('testID must be a valid UUID'),
}).strict();

const categoryIdParamSchema = z.object({
  categoryID: z.string().uuid('categoryID must be a valid UUID'),
}).strict();

const testListQuerySchema = z.object({
  page:       z.coerce.number().int().positive().optional().default(1),
  limit:      z.coerce.number().int().positive().max(100).optional().default(20),
  search:     z.string().optional(),
  resultType: resultType.optional(),
  isActive:   z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort:       z.enum(['name', 'resultType', 'decimalPlaces', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  order:      z.enum(['asc', 'desc']).optional().default('desc'),
}).strict();

// Same as nested list but adds categoryID filter (since not in URL).
const testListAllQuerySchema = z.object({
  page:       z.coerce.number().int().positive().optional().default(1),
  limit:      z.coerce.number().int().positive().max(100).optional().default(20),
  search:     z.string().optional(),
  categoryID: z.string().uuid().optional(),
  resultType: resultType.optional(),
  isActive:   z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort:       z.enum(['name', 'resultType', 'decimalPlaces', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  order:      z.enum(['asc', 'desc']).optional().default('desc'),
}).strict();

module.exports = {
  testCreateSchema,
  testCreateAllSchema,
  testUpdateSchema,
  testIdParamSchema,
  categoryIdParamSchema,
  testListQuerySchema,
  testListAllQuerySchema,
};
