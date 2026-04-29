/* DOMAIN — Source Type Add / Edit modal.
 * Pattern reference: features/customers/CustomerFormDialog.tsx (locked template).
 */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import {
  sourceTypeFormSchema,
  type SourceTypeFormValues,
} from './sourceTypeSchema'
import {
  useCreateSourceType,
  useUpdateSourceType,
} from './sourceTypesQueries'
import { toast } from '@/lib/toast'
import type { SourceType, SourceTypeInput } from '@/types/sourceType'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; sourceType: SourceType }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (sourceType: SourceType) => void
}

const DEFAULTS: SourceTypeFormValues = {
  name: '',
  label: '',
  isActive: true,
}

function valuesFromSourceType(s: SourceType): SourceTypeFormValues {
  return {
    name: s.name,
    label: s.label,
    isActive: s.isActive,
  }
}

export function SourceTypeFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateSourceType()
  const update = useUpdateSourceType()
  const isEdit = mode.kind === 'edit'

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SourceTypeFormValues>({
    resolver: zodResolver(sourceTypeFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromSourceType(mode.sourceType) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: SourceTypeInput = {
      name: values.name,
      label: values.label,
      isActive: values.isActive,
    }

    try {
      const saved = isEdit
        ? await update.mutateAsync({ sourceTypeID: mode.sourceType.sourceTypeID, input })
        : await create.mutateAsync(input)
      toast.success(
        isEdit
          ? `Source type "${saved.name}" updated`
          : `Source type "${saved.name}" created`,
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
      ? 'Update Source Type'
      : 'Add Source Type'
  const title = isEdit ? 'Edit Source Type' : 'Add Source Type'

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
            form="source-type-form"
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
      <form id="source-type-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormField
              id="source-type-name"
              label="Name"
              required
              error={errors.name?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-type-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="source-type-label"
              label="Label"
              required
              error={errors.label?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-type-label"
                type="text"
                {...register('label')}
                className={inputClass(!!errors.label)}
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
    field: keyof SourceTypeFormValues | 'root',
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
      message: data?.message ?? 'A source type with this name already exists',
    })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof SourceTypeFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
