/* DOMAIN — OcmElement Add / Edit modal.
 * Pattern reference: features/equipments/EquipmentFormDialog.tsx (locked template).
 *
 * NEW: cross-field validation via Zod superRefine — see ocmElementSchema.ts.
 * Errors attach to the specific field that's wrong, so the user sees inline
 * messages beneath the offending input rather than a banner.
 */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import {
  createInvalidHandler,
  handleApiError,
  useFormSeed,
} from '@/utils/formErrors'

const KNOWN_FIELDS = [
  'name',
  'symbol',
  'unit',
  'normalRangeMin',
  'normalRangeMax',
  'cautionRangeMin',
  'cautionRangeMax',
  'criticalRangeMin',
  'criticalRangeMax',
  'isActive',
] as const
import {
  ocmElementFormSchema,
  type OcmElementFormValues,
} from './ocmElementSchema'
import {
  useCreateOcmElement,
  useUpdateOcmElement,
} from './ocmElementsQueries'
import { toast } from '@/lib/toast'
import type { OcmElement, OcmElementInput } from '@/types/ocmElement'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; ocmElement: OcmElement }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (ocmElement: OcmElement) => void
}

const DEFAULTS: OcmElementFormValues = {
  name: '',
  symbol: '',
  unit: 'ppm',
  normalRangeMin: null,
  normalRangeMax: null,
  cautionRangeMin: null,
  cautionRangeMax: null,
  criticalRangeMin: null,
  criticalRangeMax: null,
  isActive: true,
}

function valuesFromOcmElement(e: OcmElement): OcmElementFormValues {
  return {
    name: e.name,
    symbol: e.symbol,
    unit: e.unit,
    normalRangeMin: numOrNull(e.normalRangeMin),
    normalRangeMax: numOrNull(e.normalRangeMax),
    cautionRangeMin: numOrNull(e.cautionRangeMin),
    cautionRangeMax: numOrNull(e.cautionRangeMax),
    criticalRangeMin: numOrNull(e.criticalRangeMin),
    criticalRangeMax: numOrNull(e.criticalRangeMax),
    isActive: e.isActive,
  }
}

function numOrNull(v: number | string | null | undefined): number | null {
  if (v == null || v === '') return null
  const n = typeof v === 'string' ? Number(v) : v
  return Number.isFinite(n) ? n : null
}

export function OcmElementFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateOcmElement()
  const update = useUpdateOcmElement()
  const isEdit = mode.kind === 'edit'

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OcmElementFormValues>({
    resolver: zodResolver(ocmElementFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useFormSeed({
    active: open,
    id: isEdit ? mode.ocmElement.ocmElementID : null,
    seed: () => reset(isEdit ? valuesFromOcmElement(mode.ocmElement) : DEFAULTS),
  })

  const onSubmit = handleSubmit(async (values) => {
    const input: OcmElementInput = {
      name: values.name,
      symbol: values.symbol,
      unit: values.unit || 'ppm',
      normalRangeMin: values.normalRangeMin ?? null,
      normalRangeMax: values.normalRangeMax ?? null,
      cautionRangeMin: values.cautionRangeMin ?? null,
      cautionRangeMax: values.cautionRangeMax ?? null,
      criticalRangeMin: values.criticalRangeMin ?? null,
      criticalRangeMax: values.criticalRangeMax ?? null,
      isActive: values.isActive,
    }

    try {
      const saved = isEdit
        ? await update.mutateAsync({
            ocmElementID: mode.ocmElement.ocmElementID,
            input,
          })
        : await create.mutateAsync(input)
      toast.success(
        isEdit
          ? `Element "${saved.name} (${saved.symbol})" updated`
          : `Element "${saved.name} (${saved.symbol})" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      handleApiError(err, setError, 'OcmElementFormDialog', {
        knownFields: KNOWN_FIELDS,
        conflictField: 'symbol',
      })
    }
  }, createInvalidHandler('OcmElementFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Element'
      : 'Add Element'
  const title = isEdit ? 'Edit OCM Element' : 'Add OCM Element'

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="ocm-element-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {submitLabel}
          </button>
        </>
      }
    >
      <form id="ocm-element-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          {errors.root?.message && (
            <div className="mb-4">
              <FormErrorBanner error={errors.root} className="" />
            </div>
          )}
          {/* Basic info */}
          <SectionHeading>Basic info</SectionHeading>
          <div className="grid md:grid-cols-12 gap-4 mb-5">
            <FormField
              id="ocm-name"
              label="Name"
              required
              error={errors.name?.message}
              className="col-span-12"
            >
              <input
                id="ocm-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="ocm-symbol"
              label="Symbol"
              required
              error={errors.symbol?.message}
              helpText="Must be unique (e.g. Fe, Cu, Pb)"
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="ocm-symbol"
                type="text"
                {...register('symbol')}
                className={`${inputClass(!!errors.symbol)} font-mono`}
              />
            </FormField>

            <FormField
              id="ocm-unit"
              label="Unit"
              error={errors.unit?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="ocm-unit"
                type="text"
                {...register('unit')}
                className={inputClass(!!errors.unit)}
              />
            </FormField>
          </div>

          {/* Range bands */}
          <SectionHeading>Range bands</SectionHeading>
          <p className="text-xs text-default mb-3">
            All ranges are optional. Per band: <strong>min ≤ max</strong>.
            Across bands: <strong>normal max ≤ caution min</strong>,{' '}
            <strong>caution max ≤ critical min</strong>.
          </p>
          <div className="grid md:grid-cols-12 gap-4 mb-5">
            <RangePair
              label="Normal"
              minId="ocm-normalMin"
              maxId="ocm-normalMax"
              minError={errors.normalRangeMin?.message}
              maxError={errors.normalRangeMax?.message}
              minRegister={register('normalRangeMin')}
              maxRegister={register('normalRangeMax')}
              hasMinError={!!errors.normalRangeMin}
              hasMaxError={!!errors.normalRangeMax}
            />
            <RangePair
              label="Caution"
              minId="ocm-cautionMin"
              maxId="ocm-cautionMax"
              minError={errors.cautionRangeMin?.message}
              maxError={errors.cautionRangeMax?.message}
              minRegister={register('cautionRangeMin')}
              maxRegister={register('cautionRangeMax')}
              hasMinError={!!errors.cautionRangeMin}
              hasMaxError={!!errors.cautionRangeMax}
            />
            <RangePair
              label="Critical"
              minId="ocm-criticalMin"
              maxId="ocm-criticalMax"
              minError={errors.criticalRangeMin?.message}
              maxError={errors.criticalRangeMax?.message}
              minRegister={register('criticalRangeMin')}
              maxRegister={register('criticalRangeMax')}
              hasMinError={!!errors.criticalRangeMin}
              hasMaxError={!!errors.criticalRangeMax}
            />
          </div>

          <div className="col-span-12">
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-dark">
              <input
                type="checkbox"
                {...register('isActive')}
                className="size-4 rounded border-border-color text-primary focus:ring-0"
              />
              <span className="font-medium">Active</span>
            </label>
          </div>
        </fieldset>
      </form>
    </Dialog>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h6 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-border-color">
      {children}
    </h6>
  )
}

function RangePair(props: {
  label: string
  minId: string
  maxId: string
  minError?: string
  maxError?: string
  minRegister: ReturnType<ReturnType<typeof useForm<OcmElementFormValues>>['register']>
  maxRegister: ReturnType<ReturnType<typeof useForm<OcmElementFormValues>>['register']>
  hasMinError: boolean
  hasMaxError: boolean
}) {
  return (
    <>
      <FormField
        id={props.minId}
        label={`${props.label} min`}
        error={props.minError}
        className="sm:col-span-6 col-span-12"
      >
        <input
          id={props.minId}
          type="number"
          step="0.0001"
          min={0}
          {...props.minRegister}
          className={inputClass(props.hasMinError)}
        />
      </FormField>
      <FormField
        id={props.maxId}
        label={`${props.label} max`}
        error={props.maxError}
        className="sm:col-span-6 col-span-12"
      >
        <input
          id={props.maxId}
          type="number"
          step="0.0001"
          min={0}
          {...props.maxRegister}
          className={inputClass(props.hasMaxError)}
        />
      </FormField>
    </>
  )
}

