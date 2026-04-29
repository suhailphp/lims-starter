/* DOMAIN — mirrors backend backend/src/modules/test/test.validation.js */
import { z } from 'zod'

export const RESULT_TYPES = ['NUMERIC', 'TEXT', 'THRESHOLD'] as const

export const testFormSchema = z.object({
  categoryID: z
    .string({ message: 'Category is required' })
    .uuid('Category is required'),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(150, 'Must be 150 characters or fewer'),
  decimalPlaces: z
    .number({ message: 'Decimal places is required' })
    .int('Must be a whole number')
    .min(0, 'Must be 0 or greater')
    .max(6, 'Must be 6 or fewer'),
  resultType: z.enum(RESULT_TYPES, {
    message: 'Result type is required',
  }),
  isActive: z.boolean().optional(),
})

export type TestFormValues = z.infer<typeof testFormSchema>
