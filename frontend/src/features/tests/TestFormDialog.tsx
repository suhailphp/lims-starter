/* DOMAIN — Test Add / Edit modal.
 * Pattern reference: features/units/UnitFormDialog.tsx (single-FK template).
 * Adds: decimalPlaces (number input) + resultType (EnumSelect, 3 values).
 * Single FK (Category), locked in edit mode (backend PUT doesn't accept categoryID).
 */
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { FKSelect, type FKOption } from '@/components/ui/FKSelect'
import { EnumSelect } from '@/components/ui/EnumSelect'
import { createInvalidHandler } from '@/utils/formErrors'
import {
  testFormSchema,
  RESULT_TYPES,
  type TestFormValues,
} from './testSchema'
import {
  useCreateTest,
  useUpdateTest,
} from './testsQueries'
import { useCategories } from '@/features/categories/categoriesQueries'
import { toast } from '@/lib/toast'
import type { Test, TestInput, TestUpdateInput } from '@/types/test'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; test: Test }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (test: Test) => void
}

const DEFAULTS: TestFormValues = {
  categoryID: '',
  name: '',
  decimalPlaces: 2,
  resultType: 'NUMERIC',
  isActive: true,
}

const RESULT_TYPE_OPTIONS: FKOption[] = RESULT_TYPES.map((v) => ({
  value: v,
  label: v,
}))

function valuesFromTest(t: Test): TestFormValues {
  return {
    categoryID: t.categoryID,
    name: t.name,
    decimalPlaces: t.decimalPlaces,
    resultType: t.resultType,
    isActive: t.isActive,
  }
}

const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

export function TestFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateTest()
  const update = useUpdateTest()
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
  } = useForm<TestFormValues>({
    resolver: zodResolver(testFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromTest(mode.test) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      let saved: Test
      if (isEdit) {
        const input: TestUpdateInput = {
          name: values.name,
          decimalPlaces: values.decimalPlaces,
          resultType: values.resultType,
          isActive: values.isActive ?? true,
        }
        saved = await update.mutateAsync({
          testID: mode.test.testID,
          input,
        })
      } else {
        const input: TestInput = {
          categoryID: values.categoryID,
          name: values.name,
          decimalPlaces: values.decimalPlaces,
          resultType: values.resultType,
          isActive: values.isActive,
        }
        saved = await create.mutateAsync(input)
      }
      toast.success(
        isEdit
          ? `Test "${saved.name}" updated`
          : `Test "${saved.name}" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError)
    }
  }, createInvalidHandler('TestFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Test'
      : 'Add Test'
  const title = isEdit ? 'Edit Test' : 'Add Test'

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
            form="test-form"
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
      <form id="test-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="test-categoryID"
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
                    inputId="test-categoryID"
                    options={categoryOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v || '')}
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
              id="test-name"
              label="Name"
              required
              error={errors.name?.message}
              className="col-span-12"
            >
              <input
                id="test-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="test-resultType"
              label="Result Type"
              required
              error={errors.resultType?.message}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="resultType"
                control={control}
                render={({ field }) => (
                  <EnumSelect
                    inputId="test-resultType"
                    options={RESULT_TYPE_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v || 'NUMERIC')}
                    onBlur={field.onBlur}
                    placeholder="Select type..."
                    hasError={!!errors.resultType}
                    ariaLabel="Result Type"
                  />
                )}
              />
            </FormField>

            <FormField
              id="test-decimalPlaces"
              label="Decimal Places"
              required
              error={errors.decimalPlaces?.message}
              helpText="0–6"
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="test-decimalPlaces"
                type="number"
                min={0}
                max={6}
                step={1}
                {...register('decimalPlaces', { valueAsNumber: true })}
                className={`${inputClass(!!errors.decimalPlaces)} font-mono`}
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
    field: keyof TestFormValues | 'root',
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
      const field = (detail.path?.[0] ?? 'root') as keyof TestFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
