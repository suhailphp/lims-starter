/* DOMAIN — mirrors backend backend/src/modules/customer/customer.validation.js */
import { z } from 'zod'

const trimmedNullable = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .nullable()
    .optional()
    .transform((v) => (v == null || v === '' ? null : v))

export const customerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(200, 'Must be 200 characters or fewer'),
  address: trimmedNullable(2000),
  contactName: trimmedNullable(100),
  contactEmail: z
    .string()
    .trim()
    .toLowerCase()
    .max(150, 'Must be 150 characters or fewer')
    .email('Invalid email format')
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform((v) => (v == null || v === '' ? null : v)),
  contactPhone: trimmedNullable(30),
  trn: z
    .string()
    .trim()
    .max(20, 'Must be 20 characters or fewer')
    .regex(/^[A-Za-z0-9]*$/, 'TRN must be alphanumeric (no spaces)')
    .nullable()
    .optional()
    .transform((v) => (v == null || v === '' ? null : v)),
  paymentTermsDays: z.coerce
    .number({ message: 'Must be a whole number' })
    .int('Must be a whole number')
    .min(0, 'Must be 0 or greater')
    .max(365, 'Must be 365 or fewer')
    .optional(),
  isActive: z.boolean().optional(),
})

export type CustomerFormValues = z.infer<typeof customerFormSchema>
