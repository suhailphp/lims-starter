/* DOMAIN — mirrors backend backend/src/modules/equipment/equipment.validation.js */
import { z } from 'zod'

const trimmedNullable = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .nullable()
    .optional()
    .transform((v) => (v == null || v === '' ? null : v))

const dateNullable = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be a date in YYYY-MM-DD format')
  .nullable()
  .optional()
  .transform((v) => (v == null || v === '' ? null : v))

export const equipmentFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(150, 'Must be 150 characters or fewer'),
  model: trimmedNullable(100),
  serialNumber: trimmedNullable(100),
  calibrationDueDate: dateNullable,
  isActive: z.boolean().optional(),
})

export type EquipmentFormValues = z.infer<typeof equipmentFormSchema>
