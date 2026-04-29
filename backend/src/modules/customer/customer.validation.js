'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');

const nullableTrimmed = (max) =>
  z.string().trim().max(max).nullable().optional()
    .transform((v) => (v === '' ? null : v));

const customerBodySchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(200),
    address: nullableTrimmed(2000),
    contactName: nullableTrimmed(100),
    contactEmail: z
      .string()
      .trim()
      .toLowerCase()
      .email('Invalid email format')
      .max(150)
      .nullable()
      .optional()
      .transform((v) => (v === '' ? null : v)),
    contactPhone: nullableTrimmed(30),
    trn: z
      .string()
      .trim()
      .max(20, 'TRN must be 20 characters or fewer')
      .regex(/^[A-Za-z0-9]*$/, 'TRN must be alphanumeric')
      .nullable()
      .optional()
      .transform((v) => (v == null || v === '' ? null : v)),
    paymentTermsDays: z
      .number()
      .int('Must be an integer')
      .min(0, 'Must be zero or greater')
      .max(365, 'Must be 365 or less')
      .optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

const customerCreateSchema = customerBodySchema;
const customerUpdateSchema = customerBodySchema;

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

const customerListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    isActive: booleanLike,
    sort: z.enum(['name', 'createdAt', 'updatedAt']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

module.exports = {
  customerCreateSchema,
  customerUpdateSchema,
  customerIdParamSchema,
  customerListQuerySchema,
};
