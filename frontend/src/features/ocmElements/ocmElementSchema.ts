/* DOMAIN — mirrors backend backend/src/modules/ocmElement/ocmElement.validation.js
 *
 * Cross-field rule (superRefine):
 *   Per-pair:    min ≤ max     (normal / caution / critical)
 *   Progression: normalMax ≤ cautionMin ≤ cautionMax ≤ criticalMin
 *
 * Each violation attaches its message to the SPECIFIC field that's wrong, so
 * the user sees the error inline beneath the offending input rather than a
 * generic banner. superRefine collects all violations in one pass.
 */
import { z } from 'zod'

const numberFieldOptional = z
  .preprocess(
    (v) => (v === '' || v == null ? null : v),
    z.coerce.number({ message: 'Must be a number' }).min(0, 'Must be 0 or greater').nullable(),
  )
  .optional()

export const ocmElementFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(100, 'Must be 100 characters or fewer'),
    symbol: z
      .string()
      .trim()
      .min(1, 'Symbol is required')
      .max(10, 'Must be 10 characters or fewer'),
    unit: z
      .string()
      .trim()
      .max(20, 'Must be 20 characters or fewer')
      .optional(),
    normalRangeMin: numberFieldOptional,
    normalRangeMax: numberFieldOptional,
    cautionRangeMin: numberFieldOptional,
    cautionRangeMax: numberFieldOptional,
    criticalRangeMin: numberFieldOptional,
    criticalRangeMax: numberFieldOptional,
    isActive: z.boolean().optional(),
  })
  .superRefine((d, ctx) => {
    const minMax: Array<[keyof typeof d, keyof typeof d]> = [
      ['normalRangeMin', 'normalRangeMax'],
      ['cautionRangeMin', 'cautionRangeMax'],
      ['criticalRangeMin', 'criticalRangeMax'],
    ]
    for (const [minKey, maxKey] of minMax) {
      const min = d[minKey] as number | null | undefined
      const max = d[maxKey] as number | null | undefined
      if (min != null && max != null && min > max) {
        ctx.addIssue({
          code: 'custom',
          path: [maxKey as string],
          message: `${String(maxKey)} must be ≥ ${String(minKey)}`,
        })
      }
    }
    if (
      d.normalRangeMax != null &&
      d.cautionRangeMin != null &&
      d.normalRangeMax > d.cautionRangeMin
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['cautionRangeMin'],
        message: 'cautionRangeMin must be ≥ normalRangeMax',
      })
    }
    if (
      d.cautionRangeMax != null &&
      d.criticalRangeMin != null &&
      d.cautionRangeMax > d.criticalRangeMin
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['criticalRangeMin'],
        message: 'criticalRangeMin must be ≥ cautionRangeMax',
      })
    }
  })

export type OcmElementFormValues = z.infer<typeof ocmElementFormSchema>
