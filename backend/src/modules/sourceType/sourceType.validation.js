'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');

const sourceTypeCreateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    label: z.string().trim().min(1, 'Label is required').max(50),
    isActive: z.boolean().optional(),
  })
  .strict();

const sourceTypeUpdateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    label: z.string().trim().min(1, 'Label is required').max(50),
    isActive: z.boolean(),
  })
  .strict();

const sourceTypeIdParamSchema = z
  .object({
    sourceTypeID: uuid,
  })
  .strict();

const booleanLike = z
  .preprocess((v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  }, z.boolean())
  .optional();

const sourceTypeListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    isActive: booleanLike,
    sort: z.enum(['name', 'label', 'createdAt', 'updatedAt']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

module.exports = {
  sourceTypeCreateSchema,
  sourceTypeUpdateSchema,
  sourceTypeIdParamSchema,
  sourceTypeListQuerySchema,
};
