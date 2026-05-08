/* DOMAIN — Specification Add / Edit modal.
 * Pattern reference: features/sourceTypes/SourceTypeFormDialog.tsx (locked template).
 * Simplest entity in the master-data set: just `name` + `isActive`.
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

const KNOWN_FIELDS = ['name', 'isActive'] as const
import {
  specificationFormSchema,
  type SpecificationFormValues,
} from './specificationSchema'
import {
  useCreateSpecification,
  useUpdateSpecification,
} from './specificationsQueries'
import { toast } from '@/lib/toast'
import type { Specification, SpecificationInput } from '@/types/specification'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; specification: Specification }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (specification: Specification) => void
}

const DEFAULTS: SpecificationFormValues = {
  name: '',
  isActive: true,
}

function valuesFromSpecification(s: Specification): SpecificationFormValues {
  return {
    name: s.name,
    isActive: s.isActive,
  }
}

export function SpecificationFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateSpecification()
  const update = useUpdateSpecification()
  const isEdit = mode.kind === 'edit'

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SpecificationFormValues>({
    resolver: zodResolver(specificationFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useFormSeed({
    active: open,
    id: isEdit ? mode.specification.specificationID : null,
    seed: () =>
      reset(isEdit ? valuesFromSpecification(mode.specification) : DEFAULTS),
  })

  const onSubmit = handleSubmit(async (values) => {
    const input: SpecificationInput = {
      name: values.name,
      isActive: values.isActive,
    }

    try {
      const saved = isEdit
        ? await update.mutateAsync({
            specificationID: mode.specification.specificationID,
            input,
          })
        : await create.mutateAsync(input)
      toast.success(
        isEdit
          ? `Specification "${saved.name}" updated`
          : `Specification "${saved.name}" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      handleApiError(err, setError, 'SpecificationFormDialog', {
        knownFields: KNOWN_FIELDS,
        conflictField: 'name',
      })
    }
  }, createInvalidHandler('SpecificationFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Specification'
      : 'Add Specification'
  const title = isEdit ? 'Edit Specification' : 'Add Specification'

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
            form="specification-form"
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
      <form id="specification-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="specification-name"
              label="Name"
              required
              error={errors.name?.message}
              className="col-span-12"
            >
              <input
                id="specification-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
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

