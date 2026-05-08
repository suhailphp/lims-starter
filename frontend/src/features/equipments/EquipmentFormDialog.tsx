/* DOMAIN — Equipment Add / Edit modal.
 * Pattern reference: features/categories/CategoryFormDialog.tsx (locked template).
 * NEW: <DateTimePicker mode="date" /> for calibrationDueDate (first date field
 * in any master-data form).
 */
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import {
  createInvalidHandler,
  handleApiError,
  useFormSeed,
} from '@/utils/formErrors'

const KNOWN_FIELDS = [
  'name',
  'model',
  'serialNumber',
  'calibrationDueDate',
  'isActive',
] as const
import {
  equipmentFormSchema,
  type EquipmentFormValues,
} from './equipmentSchema'
import {
  useCreateEquipment,
  useUpdateEquipment,
} from './equipmentsQueries'
import { toast } from '@/lib/toast'
import type { Equipment, EquipmentInput } from '@/types/equipment'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; equipment: Equipment }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (equipment: Equipment) => void
}

const DEFAULTS: EquipmentFormValues = {
  name: '',
  model: null,
  serialNumber: null,
  calibrationDueDate: null,
  isActive: true,
}

function valuesFromEquipment(e: Equipment): EquipmentFormValues {
  return {
    name: e.name,
    model: e.model,
    serialNumber: e.serialNumber,
    calibrationDueDate: e.calibrationDueDate,
    isActive: e.isActive,
  }
}

export function EquipmentFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateEquipment()
  const update = useUpdateEquipment()
  const isEdit = mode.kind === 'edit'

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useFormSeed({
    active: open,
    id: isEdit ? mode.equipment.equipmentID : null,
    seed: () => reset(isEdit ? valuesFromEquipment(mode.equipment) : DEFAULTS),
  })

  const onSubmit = handleSubmit(async (values) => {
    const input: EquipmentInput = {
      name: values.name,
      model: values.model ?? null,
      serialNumber: values.serialNumber ?? null,
      calibrationDueDate: values.calibrationDueDate ?? null,
      isActive: values.isActive,
    }

    try {
      const saved = isEdit
        ? await update.mutateAsync({ equipmentID: mode.equipment.equipmentID, input })
        : await create.mutateAsync(input)
      toast.success(
        isEdit
          ? `Equipment "${saved.name}" updated`
          : `Equipment "${saved.name}" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      handleApiError(err, setError, 'EquipmentFormDialog', {
        knownFields: KNOWN_FIELDS,
        conflictField: 'serialNumber',
      })
    }
  }, createInvalidHandler('EquipmentFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Equipment'
      : 'Add Equipment'
  const title = isEdit ? 'Edit Equipment' : 'Add Equipment'

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
            form="equipment-form"
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
      <form id="equipment-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="equipment-name"
              label="Name"
              required
              error={errors.name?.message}
              className="col-span-12"
            >
              <input
                id="equipment-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="equipment-model"
              label="Model"
              error={errors.model?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="equipment-model"
                type="text"
                {...register('model')}
                className={inputClass(!!errors.model)}
              />
            </FormField>

            <FormField
              id="equipment-serialNumber"
              label="Serial Number"
              error={errors.serialNumber?.message}
              helpText="Must be unique across active equipment"
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="equipment-serialNumber"
                type="text"
                {...register('serialNumber')}
                className={inputClass(!!errors.serialNumber)}
              />
            </FormField>

            <FormField
              id="equipment-calibrationDueDate"
              label="Calibration Due Date"
              error={errors.calibrationDueDate?.message}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="calibrationDueDate"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    inputId="equipment-calibrationDueDate"
                    mode="date"
                    value={field.value as string | null}
                    onChange={(v) => field.onChange(v as string | null)}
                    onBlur={field.onBlur}
                    hasError={!!errors.calibrationDueDate}
                    isClearable
                    ariaLabel="Calibration due date"
                  />
                )}
              />
            </FormField>

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
          </div>
        </fieldset>
      </form>
    </Dialog>
  )
}

