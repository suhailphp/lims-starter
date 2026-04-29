'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');

const sourceCreateSchema = z
  .object({
    sourceTypeID: uuid,
    categoryID: uuid,
    sourceName: z.string().trim().min(1, 'Source name is required').max(200),
    equipmentName: z.string().trim().max(200).optional().nullable(),
    componentType: z.string().trim().max(100).optional().nullable(),
    model: z.string().trim().max(100).optional().nullable(),
    make: z.string().trim().max(100).optional().nullable(),
    isActive: z.boolean().optional(),
  })
  .strict();

// Flat-route create: customerID comes from the body (master-data /sources page).
const sourceCreateAllSchema = z
  .object({
    customerID: uuid,
    sourceTypeID: uuid,
    categoryID: uuid,
    sourceName: z.string().trim().min(1, 'Source name is required').max(200),
    equipmentName: z.string().trim().max(200).optional().nullable(),
    componentType: z.string().trim().max(100).optional().nullable(),
    model: z.string().trim().max(100).optional().nullable(),
    make: z.string().trim().max(100).optional().nullable(),
    isActive: z.boolean().optional(),
  })
  .strict();

const sourceUpdateSchema = z
  .object({
    sourceTypeID: uuid,
    categoryID: uuid,
    sourceName: z.string().trim().min(1, 'Source name is required').max(200),
    equipmentName: z.string().trim().max(200).optional().nullable(),
    componentType: z.string().trim().max(100).optional().nullable(),
    model: z.string().trim().max(100).optional().nullable(),
    make: z.string().trim().max(100).optional().nullable(),
    isActive: z.boolean(),
  })
  .strict();

const sourceIdParamSchema = z
  .object({
    sourceID: uuid,
  })
  .strict();

const customerIdParamSchema = z
  .object({
    customerID: uuid,
  })
  .strict();

const booleanLike = z
  .preprocess((v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  }, z.boolean())
  .optional();

const sourceListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    sourceTypeID: z.string().uuid().optional(),
    categoryID: z.string().uuid().optional(),
    isActive: booleanLike,
    sort: z.enum(['sourceName', 'equipmentName', 'createdAt', 'updatedAt']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

// Same as nested list but adds customerID filter (since not in URL).
const sourceListAllQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    customerID: z.string().uuid().optional(),
    sourceTypeID: z.string().uuid().optional(),
    categoryID: z.string().uuid().optional(),
    isActive: booleanLike,
    sort: z.enum(['sourceName', 'equipmentName', 'createdAt', 'updatedAt']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

module.exports = {
  sourceCreateSchema,
  sourceCreateAllSchema,
  sourceUpdateSchema,
  sourceIdParamSchema,
  customerIdParamSchema,
  sourceListQuerySchema,
  sourceListAllQuerySchema,
};
