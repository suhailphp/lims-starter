/* DOMAIN — Method Add / Edit modal.
 * Pattern reference: features/tests/TestFormDialog.tsx (single-FK template).
 * Adds: textarea (description), isDefault checkbox, code field instead of name.
 * Single FK (Test), locked in edit mode (backend PUT doesn't accept testID).
 *
 * isDefault note: backend auto-flips sibling defaults off in a transaction
 * when set true — UI just sends the value and trusts the backend invariant.
 */
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass, textareaClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { FKSelect, type FKOption } from '@/components/ui/FKSelect'
import { createInvalidHandler } from '@/utils/formErrors'
import {
  methodFormSchema,
  type MethodFormValues,
} from './methodSchema'
import {
  useCreateMethod,
  useUpdateMethod,
} from './methodsQueries'
import { useTests } from '@/features/tests/testsQueries'
import { toast } from '@/lib/toast'
import type { Method, MethodInput, MethodUpdateInput } from '@/types/method'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; method: Method }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (method: Method) => void
}

const DEFAULTS: MethodFormValues = {
  testID: '',
  code: '',
  description: '',
  isDefault: false,
  isActive: true,
}

function valuesFromMethod(m: Method): MethodFormValues {
  return {
    testID: m.testID,
    code: m.code,
    description: m.description ?? '',
    isDefault: m.isDefault,
    isActive: m.isActive,
  }
}

const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

export function MethodFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateMethod()
  const update = useUpdateMethod()
  const isEdit = mode.kind === 'edit'

  const testsQ = useTests({ ...LOOKUP_PARAMS, sort: 'name' })

  const testOptions = useMemo<FKOption[]>(
    () =>
      (testsQ.data?.data ?? []).map((t) => ({
        value: t.testID,
        label: t.category?.name ? `${t.name} (${t.category.name})` : t.name,
      })),
    [testsQ.data],
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MethodFormValues>({
    resolver: zodResolver(methodFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromMethod(mode.method) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      const description =
        values.description == null || values.description.trim() === ''
          ? null
          : values.description.trim()

      let saved: Method
      if (isEdit) {
        const input: MethodUpdateInput = {
          code: values.code,
          description,
          isDefault: values.isDefault ?? false,
          isActive: values.isActive ?? true,
        }
        saved = await update.mutateAsync({
          methodID: mode.method.methodID,
          input,
        })
      } else {
        const input: MethodInput = {
          testID: values.testID,
          code: values.code,
          description,
          isDefault: values.isDefault,
          isActive: values.isActive,
        }
        saved = await create.mutateAsync(input)
      }
      toast.success(
        isEdit ? `Method "${saved.code}" updated` : `Method "${saved.code}" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError)
    }
  }, createInvalidHandler('MethodFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Method'
      : 'Add Method'
  const title = isEdit ? 'Edit Method' : 'Add Method'

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
            form="method-form"
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
      <form id="method-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="method-testID"
              label="Test"
              required
              error={errors.testID?.message}
              helpText={isEdit ? 'Cannot be changed after creation' : undefined}
              className="col-span-12"
            >
              <Controller
                name="testID"
                control={control}
                render={({ field }) => (
                  <FKSelect
                    inputId="method-testID"
                    options={testOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v || '')}
                    onBlur={field.onBlur}
                    isLoading={testsQ.isLoading}
                    isDisabled={isEdit}
                    placeholder="Select test..."
                    hasError={!!errors.testID}
                    ariaLabel="Test"
                  />
                )}
              />
            </FormField>

            <FormField
              id="method-code"
              label="Code"
              required
              error={errors.code?.message}
              helpText="e.g. ASTM D93-25, ISO 2719"
              className="col-span-12"
            >
              <input
                id="method-code"
                type="text"
                {...register('code')}
                className={`${inputClass(!!errors.code)} font-mono`}
              />
            </FormField>

            <FormField
              id="method-description"
              label="Description"
              error={errors.description?.message}
              className="col-span-12"
            >
              <textarea
                id="method-description"
                rows={3}
                {...register('description')}
                className={textareaClass(!!errors.description)}
                placeholder="Optional notes about scope, equipment, or conditions..."
              />
            </FormField>

            <div className="col-span-12 flex flex-wrap gap-x-6 gap-y-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-dark">
                <input
                  type="checkbox"
                  {...register('isDefault')}
                  className="size-4 rounded border-border-color text-primary focus:ring-0"
                />
                <span className="font-medium">Default for this Test</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-dark">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="size-4 rounded border-border-color text-primary focus:ring-0"
                />
                <span className="font-medium">Active</span>
              </label>
            </div>
            <p className="col-span-12 -mt-2 text-xs text-default">
              Marking a method default automatically clears the default flag on other methods of the same test.
            </p>
          </div>
        </fieldset>
      </form>
    </Dialog>
  )
}

function mapBackendErrors(
  err: unknown,
  setError: (
    field: keyof MethodFormValues | 'root',
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
    if (/test/i.test(msg)) setError('testID', { type: 'server', message: msg })
    else setError('root', { type: 'server', message: msg })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof MethodFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
