'use strict';

const { z } = require('zod');

const uuid = z.string().uuid('Must be a valid UUID');

const isoCode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{3}$/, 'Code must be 3 uppercase letters (ISO 4217)');

const decimalPlacesEnum = z
  .number()
  .int()
  .refine((v) => [0, 2, 3, 4].includes(v), { message: 'decimalPlaces must be 0, 2, 3, or 4' });

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD');

const rateNumber = z.coerce
  .number()
  .positive('Rate must be greater than 0')
  // 15,6 — guard against absurd values silently truncating.
  .max(999_999_999, 'Rate is unreasonably large');

const currencyCreateSchema = z
  .object({
    code: isoCode,
    name: z.string().trim().min(1, 'Name is required').max(100),
    symbol: z.string().trim().min(1, 'Symbol is required').max(10),
    decimalPlaces: decimalPlacesEnum.default(2),
    displayOrder: z.number().int().min(0).default(0),
    isActive: z.boolean().optional(),
    // Initial rate is required when creating a non-base currency. The
    // controller decides whether base/non-base based on whether any
    // currency exists yet — the schema enforces shape only and lets the
    // controller surface the friendly message.
    initialRate: rateNumber.optional(),
    initialRateEffectiveDate: isoDate.optional(),
  })
  .strict();

const currencyUpdateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    symbol: z.string().trim().min(1, 'Symbol is required').max(10),
    decimalPlaces: decimalPlacesEnum,
    displayOrder: z.number().int().min(0),
    isActive: z.boolean(),
  })
  .strict();

const currencyIdParamSchema = z
  .object({
    currencyID: uuid,
  })
  .strict();

const currencyIdAndDateParamSchema = z
  .object({
    currencyID: uuid,
    date: isoDate,
  })
  .strict();

const booleanLike = z
  .preprocess((v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  }, z.boolean())
  .optional();

const currencyListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().max(200).optional(),
    isActive: booleanLike,
    isBase: booleanLike,
    sort: z
      .enum(['code', 'name', 'displayOrder', 'isBase', 'createdAt', 'updatedAt'])
      .default('displayOrder'),
    order: z.enum(['asc', 'desc']).default('asc'),
  })
  .strict();

const exchangeRateCreateSchema = z
  .object({
    rate: rateNumber,
    effectiveDate: isoDate,
    source: z.string().trim().max(50).optional(),
    notes: z.string().trim().max(2000).optional(),
  })
  .strict();

const exchangeRateListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(50),
    sort: z.enum(['effectiveDate', 'createdAt']).default('effectiveDate'),
    order: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

module.exports = {
  currencyCreateSchema,
  currencyUpdateSchema,
  currencyIdParamSchema,
  currencyIdAndDateParamSchema,
  currencyListQuerySchema,
  exchangeRateCreateSchema,
  exchangeRateListQuerySchema,
};
