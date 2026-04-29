/* DOMAIN — Specification Add / Edit modal.
 * Pattern reference: features/sourceTypes/SourceTypeFormDialog.tsx (locked template).
 * Simplest entity in the master-data set: just `name` + `isActive`.
 */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
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

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromSpecification(mode.specification) : DEFAULTS)
  }, [open, mode, isEdit, reset])

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
      mapBackendErrors(err, setError)
    }
  })

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

function mapBackendErrors(
  err: unknown,
  setError: (
    field: keyof SpecificationFormValues | 'root',
    error: { type: string; message: string },
  ) => void,
) {
  if (!axios.isAxiosError(err)) {
    setError('root', { type: 'server', message: 'Unexpected error. Please try again.' })
    return
  }
  const status = err.response?.status
  const data = err.response?.data as
    | { message?: string; errors?: Array<{ path?: (string | number)[]; message?: string }> }
    | undefined

  if (status === 409) {
    setError('name', {
      type: 'server',
      message: data?.message ?? 'A specification with this name already exists',
    })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof SpecificationFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
