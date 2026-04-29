'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');
const categoryType = z.enum(['FUEL', 'LUBRICANT', 'WATER']);

const categoryBodySchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    type: categoryType,
    isActive: z.boolean().optional(),
  })
  .strict();

const categoryCreateSchema = categoryBodySchema;
const categoryUpdateSchema = categoryBodySchema;

const categoryIdParamSchema = z
  .object({
    categoryID: uuid,
  })
  .strict();

const booleanLike = z
  .preprocess((v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  }, z.boolean())
  .optional();

const categoryListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    type: categoryType.optional(),
    isActive: booleanLike,
    sort: z.enum(['name', 'type', 'createdAt', 'updatedAt']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

module.exports = {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdParamSchema,
  categoryListQuerySchema,
};
