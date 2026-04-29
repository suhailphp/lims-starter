'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');

const taxRateCode = z
  .string()
  .trim()
  .toUpperCase()
  .min(1, 'Code is required')
  .max(20, 'Code must be 20 characters or fewer')
  .regex(/^[A-Z0-9_]+$/, 'Code must be uppercase alphanumeric or underscore');

const ratePercent = z.coerce
  .number()
  .min(0, 'Rate must be 0 or greater')
  .max(999.99, 'Rate cannot exceed 999.99')
  .refine(
    (v) => /^\d{1,3}(\.\d{1,2})?$/.test(v.toString()),
    { message: 'Rate must have at most 2 decimal places' },
  );

const taxTypeEnum = z.enum(['PERCENTAGE']);

const taxRateCreateSchema = z
  .object({
    code: taxRateCode,
    name: z.string().trim().min(1, 'Name is required').max(100),
    rate: ratePercent,
    type: taxTypeEnum.default('PERCENTAGE'),
    description: z
      .string()
      .trim()
      .max(2000)
      .nullable()
      .optional()
      .transform((v) => (v == null || v === '' ? null : v)),
    displayOrder: z.number().int().min(0).default(0),
    isActive: z.boolean().optional(),
  })
  .strict();

const taxRateUpdateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    rate: ratePercent,
    type: taxTypeEnum.optional(),
    description: z
      .string()
      .trim()
      .max(2000)
      .nullable()
      .optional()
      .transform((v) => (v == null || v === '' ? null : v)),
    displayOrder: z.number().int().min(0),
    isActive: z.boolean(),
  })
  .strict();

const taxRateIdParamSchema = z
  .object({
    taxRateID: uuid,
  })
  .strict();

const booleanLike = z
  .preprocess((v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  }, z.boolean())
  .optional();

const taxRateListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    isActive: booleanLike,
    isDefault: booleanLike,
    sort: z
      .enum(['code', 'name', 'rate', 'displayOrder', 'isDefault', 'createdAt', 'updatedAt'])
      .default('displayOrder'),
    order: z.enum(['asc', 'desc']).default('asc'),
  })
  .strict();

module.exports = {
  taxRateCreateSchema,
  taxRateUpdateSchema,
  taxRateIdParamSchema,
  taxRateListQuerySchema,
};
