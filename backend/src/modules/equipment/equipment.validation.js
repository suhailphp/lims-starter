'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');

const booleanLike = z
  .preprocess((v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  }, z.boolean())
  .optional();

const equipmentCreateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(150),
    model: z.string().trim().max(100).nullable().optional(),
    serialNumber: z.string().trim().max(100).nullable().optional(),
    calibrationDueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be a date in YYYY-MM-DD format')
      .nullable()
      .optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

const equipmentUpdateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(150),
    model: z.string().trim().max(100).nullable().optional(),
    serialNumber: z.string().trim().max(100).nullable().optional(),
    calibrationDueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be a date in YYYY-MM-DD format')
      .nullable()
      .optional(),
    isActive: z.boolean(),
  })
  .strict();

const equipmentIdParamSchema = z
  .object({
    equipmentID: uuid,
  })
  .strict();

const equipmentListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    isActive: booleanLike,
    calibrationStatus: z
      .enum(['VALID', 'DUE_SOON', 'OVERDUE', 'UNKNOWN'])
      .optional(),
    sort: z
      .enum(['name', 'serialNumber', 'calibrationDueDate', 'createdAt', 'updatedAt'])
      .default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

module.exports = {
  equipmentCreateSchema,
  equipmentUpdateSchema,
  equipmentIdParamSchema,
  equipmentListQuerySchema,
};
