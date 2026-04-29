/* DOMAIN — Category Add / Edit modal.
 * Pattern reference: features/sourceTypes/SourceTypeFormDialog.tsx (locked template).
 * Native <select> for the `type` enum (3 fixed values; FKSelect would be overkill).
 */
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { EnumSelect, type EnumOption } from '@/components/ui/EnumSelect'
import {
  categoryFormSchema,
  type CategoryFormValues,
} from './categorySchema'
import {
  useCreateCategory,
  useUpdateCategory,
} from './categoriesQueries'
import { toast } from '@/lib/toast'
import {
  CATEGORY_TYPES,
  type Category,
  type CategoryInput,
} from '@/types/category'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; category: Category }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (category: Category) => void
}

const DEFAULTS: CategoryFormValues = {
  name: '',
  type: 'LUBRICANT',
  isActive: true,
}

function valuesFromCategory(c: Category): CategoryFormValues {
  return {
    name: c.name,
    type: c.type,
    isActive: c.isActive,
  }
}

export function CategoryFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateCategory()
  const update = useUpdateCategory()
  const isEdit = mode.kind === 'edit'

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  const typeOptions = useMemo<EnumOption[]>(
    () => CATEGORY_TYPES.map((t) => ({ value: t, label: t })),
    [],
  )

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromCategory(mode.category) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: CategoryInput = {
      name: values.name,
      type: values.type,
      isActive: values.isActive,
    }

    try {
      const saved = isEdit
        ? await update.mutateAsync({ categoryID: mode.category.categoryID, input })
        : await create.mutateAsync(input)
      toast.success(
        isEdit
          ? `Category "${saved.name}" updated`
          : `Category "${saved.name}" created`,
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
      ? 'Update Category'
      : 'Add Category'
  const title = isEdit ? 'Edit Category' : 'Add Category'

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
            form="category-form"
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
      <form id="category-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormField
              id="category-name"
              label="Name"
              required
              error={errors.name?.message}
              className="col-span-12"
            >
              <input
                id="category-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="category-type"
              label="Type"
              required
              error={errors.type?.message}
              className="col-span-12"
            >
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <EnumSelect
                    inputId="category-type"
                    options={typeOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v ?? '')}
                    onBlur={field.onBlur}
                    placeholder="Select type..."
                    hasError={!!errors.type}
                    ariaLabel="Type"
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

function mapBackendErrors(
  err: unknown,
  setError: (
    field: keyof CategoryFormValues | 'root',
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
      message: data?.message ?? 'A category with this name already exists',
    })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof CategoryFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
