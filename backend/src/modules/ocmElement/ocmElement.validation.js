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

const rangeField = z.number().min(0).nullable().optional();

const rangeRefinement = (d, ctx) => {
  const check = (min, max, minPath, maxPath, label) => {
    if (min != null && max != null && min > max) {
      ctx.addIssue({
        code: 'custom',
        path: [maxPath],
        message: `${maxPath} must be >= ${minPath}`,
      });
    }
  };

  check(d.normalRangeMin, d.normalRangeMax, 'normalRangeMin', 'normalRangeMax');
  check(d.cautionRangeMin, d.cautionRangeMax, 'cautionRangeMin', 'cautionRangeMax');
  check(d.criticalRangeMin, d.criticalRangeMax, 'criticalRangeMin', 'criticalRangeMax');

  // Progression: normalMax → cautionMin → cautionMax → criticalMin
  if (d.normalRangeMax != null && d.cautionRangeMin != null && d.normalRangeMax > d.cautionRangeMin) {
    ctx.addIssue({
      code: 'custom',
      path: ['cautionRangeMin'],
      message: 'cautionRangeMin must be >= normalRangeMax',
    });
  }
  if (d.cautionRangeMax != null && d.criticalRangeMin != null && d.cautionRangeMax > d.criticalRangeMin) {
    ctx.addIssue({
      code: 'custom',
      path: ['criticalRangeMin'],
      message: 'criticalRangeMin must be >= cautionRangeMax',
    });
  }
};

const ocmElementCreateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    symbol: z.string().trim().min(1, 'Symbol is required').max(10),
    unit: z.string().trim().max(20).optional(),
    normalRangeMin: rangeField,
    normalRangeMax: rangeField,
    cautionRangeMin: rangeField,
    cautionRangeMax: rangeField,
    criticalRangeMin: rangeField,
    criticalRangeMax: rangeField,
    isActive: z.boolean().optional(),
  })
  .strict()
  .superRefine(rangeRefinement);

const ocmElementUpdateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    symbol: z.string().trim().min(1, 'Symbol is required').max(10),
    unit: z.string().trim().max(20).optional(),
    normalRangeMin: rangeField,
    normalRangeMax: rangeField,
    cautionRangeMin: rangeField,
    cautionRangeMax: rangeField,
    criticalRangeMin: rangeField,
    criticalRangeMax: rangeField,
    isActive: z.boolean(),
  })
  .strict()
  .superRefine(rangeRefinement);

const ocmElementIdParamSchema = z
  .object({
    ocmElementID: uuid,
  })
  .strict();

const ocmElementListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    isActive: booleanLike,
    sort: z.enum(['name', 'symbol', 'createdAt', 'updatedAt']).default('name'),
    order: z.enum(['asc', 'desc']).default('asc'),
  })
  .strict();

module.exports = {
  ocmElementCreateSchema,
  ocmElementUpdateSchema,
  ocmElementIdParamSchema,
  ocmElementListQuerySchema,
};
