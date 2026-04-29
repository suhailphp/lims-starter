/* DOMAIN — mirrors backend backend/src/modules/taxRate/taxRate.validation.js */
import { z } from 'zod'

const taxRateCode = z
  .string()
  .trim()
  .toUpperCase()
  .min(1, 'Code is required')
  .max(20, 'Code must be 20 characters or fewer')
  .regex(/^[A-Z0-9_]+$/, 'Use uppercase letters, digits, or underscore')

const ratePercent = z
  .number({ message: 'Rate is required' })
  .min(0, 'Rate must be 0 or greater')
  .max(999.99, 'Rate cannot exceed 999.99')
  .refine(
    (v) => /^\d{1,3}(\.\d{1,2})?$/.test(v.toString()),
    { message: 'At most 2 decimal places' },
  )

export const taxRateCreateFormSchema = z.object({
  code: taxRateCode,
  name: z.string().trim().min(1, 'Name is required').max(100),
  rate: ratePercent,
  description: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal('')),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
})

export type TaxRateCreateFormValues = z.infer<typeof taxRateCreateFormSchema>

export const taxRateUpdateFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  rate: ratePercent,
  description: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal('')),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
})

export type TaxRateUpdateFormValues = z.infer<typeof taxRateUpdateFormSchema>
