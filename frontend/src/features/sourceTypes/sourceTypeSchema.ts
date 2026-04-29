/* DOMAIN — mirrors backend backend/src/modules/sourceType/sourceType.validation.js */
import { z } from 'zod'

export const sourceTypeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Must be 100 characters or fewer'),
  label: z
    .string()
    .trim()
    .min(1, 'Label is required')
    .max(50, 'Must be 50 characters or fewer'),
  isActive: z.boolean().optional(),
})

export type SourceTypeFormValues = z.infer<typeof sourceTypeFormSchema>
