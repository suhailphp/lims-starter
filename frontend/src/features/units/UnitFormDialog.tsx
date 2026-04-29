/* DOMAIN — Unit Add / Edit modal.
 * Pattern reference: features/sources/SourceFormDialog.tsx (FK template).
 * Single FK (Category), locked in edit mode (backend PUT doesn't accept categoryID).
 */
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { FKSelect, type FKOption } from '@/components/ui/FKSelect'
import {
  unitFormSchema,
  type UnitFormValues,
} from './unitSchema'
import {
  useCreateUnit,
  useUpdateUnit,
} from './unitsQueries'
import { useCategories } from '@/features/categories/categoriesQueries'
import { toast } from '@/lib/toast'
import type { Unit, UnitInput, UnitUpdateInput } from '@/types/unit'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; unit: Unit }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (unit: Unit) => void
}

const DEFAULTS: UnitFormValues = {
  categoryID: '',
  name: '',
  symbol: '',
  isActive: true,
}

function valuesFromUnit(u: Unit): UnitFormValues {
  return {
    categoryID: u.categoryID,
    name: u.name,
    symbol: u.symbol,
    isActive: u.isActive,
  }
}

const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

export function UnitFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateUnit()
  const update = useUpdateUnit()
  const isEdit = mode.kind === 'edit'

  const categoriesQ = useCategories({ ...LOOKUP_PARAMS, sort: 'name' })

  const categoryOptions = useMemo<FKOption[]>(
    () =>
      (categoriesQ.data?.data ?? []).map((c) => ({
        value: c.categoryID,
        label: `${c.name} (${c.type})`,
      })),
    [categoriesQ.data],
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromUnit(mode.unit) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      let saved: Unit
      if (isEdit) {
        const input: UnitUpdateInput = {
          name: values.name,
          symbol: values.symbol,
          isActive: values.isActive ?? true,
        }
        saved = await update.mutateAsync({
          unitID: mode.unit.unitID,
          input,
        })
      } else {
        const input: UnitInput = {
          categoryID: values.categoryID,
          name: values.name,
          symbol: values.symbol,
          isActive: values.isActive,
        }
        saved = await create.mutateAsync(input)
      }
      toast.success(
        isEdit
          ? `Unit "${saved.name} (${saved.symbol})" updated`
          : `Unit "${saved.name} (${saved.symbol})" created`,
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
      ? 'Update Unit'
      : 'Add Unit'
  const title = isEdit ? 'Edit Unit' : 'Add Unit'

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
            form="unit-form"
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
      <form id="unit-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormField
              id="unit-categoryID"
              label="Category"
              required
              error={errors.categoryID?.message}
              helpText={isEdit ? 'Cannot be changed after creation' : undefined}
              className="col-span-12"
            >
              <Controller
                name="categoryID"
                control={control}
                render={({ field }) => (
                  <FKSelect
                    inputId="unit-categoryID"
                    options={categoryOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v ?? '')}
                    onBlur={field.onBlur}
                    isLoading={categoriesQ.isLoading}
                    isDisabled={isEdit}
                    placeholder="Select category..."
                    hasError={!!errors.categoryID}
                    ariaLabel="Category"
                  />
                )}
              />
            </FormField>

            <FormField
              id="unit-name"
              label="Name"
              required
              error={errors.name?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="unit-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="unit-symbol"
              label="Symbol"
              required
              error={errors.symbol?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="unit-symbol"
                type="text"
                {...register('symbol')}
                className={`${inputClass(!!errors.symbol)} font-mono`}
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
    field: keyof UnitFormValues | 'root',
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

  if (status === 404) {
    const msg = data?.message ?? 'Related record not found'
    if (/category/i.test(msg)) setError('categoryID', { type: 'server', message: msg })
    else setError('root', { type: 'server', message: msg })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof UnitFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
