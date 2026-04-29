/* DOMAIN — mirrors backend backend/src/modules/currency/currency.validation.js */
import { z } from 'zod'

const isoCode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{3}$/, 'Code must be 3 uppercase letters (ISO 4217)')

const decimalPlaces = z
  .number()
  .int()
  .refine((v) => [0, 2, 3, 4].includes(v), { message: 'Pick 0, 2, 3, or 4' })

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')

const positiveRate = z
  .number()
  .positive('Rate must be greater than 0')
  .max(999_999_999, 'Rate is unreasonably large')

/** Add form. `initialRate` is conditionally required — the form layer
 *  enforces this via superRefine using a `requiresInitialRate` flag we
 *  pass through `.refine` context. */
export const currencyCreateFormSchema = z
  .object({
    code: isoCode,
    name: z.string().trim().min(1, 'Name is required').max(100),
    symbol: z.string().trim().min(1, 'Symbol is required').max(10),
    decimalPlaces,
    displayOrder: z.number().int().min(0),
    isActive: z.boolean(),
    requiresInitialRate: z.boolean(),
    initialRate: z.number().optional(),
    initialRateEffectiveDate: isoDate.optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.requiresInitialRate) return
    const r = positiveRate.safeParse(val.initialRate)
    if (!r.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['initialRate'],
        message: r.error.issues[0]?.message ?? 'Initial rate is required',
      })
    }
    if (!val.initialRateEffectiveDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['initialRateEffectiveDate'],
        message: 'Effective date is required',
      })
    }
  })

export type CurrencyCreateFormValues = z.infer<typeof currencyCreateFormSchema>

/** Edit form — code immutable, no initialRate (rate edits go through
 *  Update Rate dialog). */
export const currencyUpdateFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  symbol: z.string().trim().min(1, 'Symbol is required').max(10),
  decimalPlaces,
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
})

export type CurrencyUpdateFormValues = z.infer<typeof currencyUpdateFormSchema>

/** Update Rate dialog. */
export const exchangeRateFormSchema = z.object({
  rate: positiveRate,
  effectiveDate: isoDate,
  notes: z.string().trim().max(2000).optional(),
})

export type ExchangeRateFormValues = z.infer<typeof exchangeRateFormSchema>

export const DECIMAL_PLACES_OPTIONS = [
  { value: '0', label: '0 (e.g. JPY, KRW)' },
  { value: '2', label: '2 (most currencies)' },
  { value: '3', label: '3 (e.g. KWD, BHD, OMR)' },
  { value: '4', label: '4 (high-precision)' },
]
