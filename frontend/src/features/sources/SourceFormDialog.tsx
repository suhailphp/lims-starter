/* DOMAIN — Source Add / Edit modal.
 * Pattern reference: features/customers/CustomerFormDialog.tsx (locked template).
 * NEW: 3 FK dropdowns via FKSelect (Customer, Source Type, Category).
 *
 * FK pattern (reused for all future entities):
 *   1. Cached lookup query per FK (limit 100, sort by name) → mapped to FKOption[]
 *   2. Controller from RHF wraps FKSelect (since react-select isn't a native input)
 *   3. Customer is disabled in edit mode — backend PUT does not accept customerID
 *      (a source can't be moved between customers).
 */
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import {
  FormField,
  inputClass,
} from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { FKSelect, type FKOption } from '@/components/ui/FKSelect'
import { createInvalidHandler } from '@/utils/formErrors'
import {
  sourceFormSchema,
  type SourceFormValues,
} from './sourceSchema'
import {
  useCreateSource,
  useUpdateSource,
} from './sourcesQueries'
import { useCustomers } from '@/features/customers/customersQueries'
import { useSourceTypes } from '@/features/sourceTypes/sourceTypesQueries'
import { useCategories } from '@/features/categories/categoriesQueries'
import { toast } from '@/lib/toast'
import type {
  Source,
  SourceInput,
  SourceUpdateInput,
} from '@/types/source'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; source: Source }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (source: Source) => void
}

const DEFAULTS: SourceFormValues = {
  customerID: '',
  sourceTypeID: '',
  categoryID: '',
  sourceName: '',
  equipmentName: null,
  componentType: null,
  model: null,
  make: null,
  isActive: true,
}

function valuesFromSource(s: Source): SourceFormValues {
  return {
    customerID: s.customerID,
    sourceTypeID: s.sourceTypeID,
    categoryID: s.categoryID,
    sourceName: s.sourceName,
    equipmentName: s.equipmentName,
    componentType: s.componentType,
    model: s.model,
    make: s.make,
    isActive: s.isActive,
  }
}

const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

export function SourceFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateSource()
  const update = useUpdateSource()
  const isEdit = mode.kind === 'edit'

  // FK lookup queries — cached across the app via TanStack keys.
  const customersQ = useCustomers({ ...LOOKUP_PARAMS, sort: 'name' })
  const sourceTypesQ = useSourceTypes({ ...LOOKUP_PARAMS, sort: 'name' })
  const categoriesQ = useCategories({ ...LOOKUP_PARAMS, sort: 'name' })

  const customerOptions = useMemo<FKOption[]>(
    () =>
      (customersQ.data?.data ?? []).map((c) => ({
        value: c.customerID,
        label: c.name,
      })),
    [customersQ.data],
  )
  const sourceTypeOptions = useMemo<FKOption[]>(
    () =>
      (sourceTypesQ.data?.data ?? []).map((s) => ({
        value: s.sourceTypeID,
        label: s.name,
      })),
    [sourceTypesQ.data],
  )
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
  } = useForm<SourceFormValues>({
    resolver: zodResolver(sourceFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromSource(mode.source) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      let saved: Source
      if (isEdit) {
        const input: SourceUpdateInput = {
          sourceTypeID: values.sourceTypeID,
          categoryID: values.categoryID,
          sourceName: values.sourceName,
          equipmentName: values.equipmentName ?? null,
          componentType: values.componentType ?? null,
          model: values.model ?? null,
          make: values.make ?? null,
          isActive: values.isActive ?? true,
        }
        saved = await update.mutateAsync({
          sourceID: mode.source.sourceID,
          input,
        })
      } else {
        const input: SourceInput = {
          customerID: values.customerID,
          sourceTypeID: values.sourceTypeID,
          categoryID: values.categoryID,
          sourceName: values.sourceName,
          equipmentName: values.equipmentName ?? null,
          componentType: values.componentType ?? null,
          model: values.model ?? null,
          make: values.make ?? null,
          isActive: values.isActive,
        }
        saved = await create.mutateAsync(input)
      }
      toast.success(
        isEdit
          ? `Source "${saved.sourceName}" updated`
          : `Source "${saved.sourceName}" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError)
    }
  }, createInvalidHandler('SourceFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Source'
      : 'Add Source'
  const title = isEdit ? 'Edit Source' : 'Add Source'

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
            form="source-form"
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
      <form id="source-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="source-customerID"
              label="Customer"
              required
              error={errors.customerID?.message}
              helpText={isEdit ? 'Cannot be changed after creation' : undefined}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="customerID"
                control={control}
                render={({ field }) => (
                  <FKSelect
                    inputId="source-customerID"
                    options={customerOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v || '')}
                    onBlur={field.onBlur}
                    isLoading={customersQ.isLoading}
                    isDisabled={isEdit}
                    placeholder="Select customer..."
                    hasError={!!errors.customerID}
                    ariaLabel="Customer"
                  />
                )}
              />
            </FormField>

            <FormField
              id="source-sourceTypeID"
              label="Source Type"
              required
              error={errors.sourceTypeID?.message}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="sourceTypeID"
                control={control}
                render={({ field }) => (
                  <FKSelect
                    inputId="source-sourceTypeID"
                    options={sourceTypeOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v || '')}
                    onBlur={field.onBlur}
                    isLoading={sourceTypesQ.isLoading}
                    placeholder="Select source type..."
                    hasError={!!errors.sourceTypeID}
                    ariaLabel="Source type"
                  />
                )}
              />
            </FormField>

            <FormField
              id="source-categoryID"
              label="Category"
              required
              error={errors.categoryID?.message}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="categoryID"
                control={control}
                render={({ field }) => (
                  <FKSelect
                    inputId="source-categoryID"
                    options={categoryOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v || '')}
                    onBlur={field.onBlur}
                    isLoading={categoriesQ.isLoading}
                    placeholder="Select category..."
                    hasError={!!errors.categoryID}
                    ariaLabel="Category"
                  />
                )}
              />
            </FormField>

            <FormField
              id="source-sourceName"
              label="Source Name"
              required
              error={errors.sourceName?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-sourceName"
                type="text"
                {...register('sourceName')}
                className={inputClass(!!errors.sourceName)}
              />
            </FormField>

            <FormField
              id="source-equipmentName"
              label="Equipment Name"
              error={errors.equipmentName?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-equipmentName"
                type="text"
                {...register('equipmentName')}
                className={inputClass(!!errors.equipmentName)}
              />
            </FormField>

            <FormField
              id="source-componentType"
              label="Component Type"
              error={errors.componentType?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-componentType"
                type="text"
                {...register('componentType')}
                className={inputClass(!!errors.componentType)}
              />
            </FormField>

            <FormField
              id="source-make"
              label="Make"
              error={errors.make?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-make"
                type="text"
                {...register('make')}
                className={inputClass(!!errors.make)}
              />
            </FormField>

            <FormField
              id="source-model"
              label="Model"
              error={errors.model?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="source-model"
                type="text"
                {...register('model')}
                className={inputClass(!!errors.model)}
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
    field: keyof SourceFormValues | 'root',
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

  // 404 = FK target missing — report on whichever FK matches the message.
  if (status === 404) {
    const msg = data?.message ?? 'Related record not found'
    if (/customer/i.test(msg)) setError('customerID', { type: 'server', message: msg })
    else if (/sourcetype/i.test(msg)) setError('sourceTypeID', { type: 'server', message: msg })
    else if (/category/i.test(msg)) setError('categoryID', { type: 'server', message: msg })
    else setError('root', { type: 'server', message: msg })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof SourceFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
