/* DOMAIN — Tax Rate Add / Edit modal.
 *
 * isDefault is NOT in this form — the dedicated Set-Default dialog
 * flips it via the `set-default` endpoint.
 */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass, textareaClass } from '@/components/ui/FormField'
import {
  taxRateCreateFormSchema,
  taxRateUpdateFormSchema,
  type TaxRateCreateFormValues,
  type TaxRateUpdateFormValues,
} from './taxRateSchema'
import {
  useCreateTaxRate,
  useUpdateTaxRate,
} from './taxRatesQueries'
import { toast } from '@/lib/toast'
import type {
  TaxRate,
  TaxRateCreateInput,
  TaxRateUpdateInput,
} from '@/types/taxRate'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; taxRate: TaxRate }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (row: TaxRate) => void
}

const CREATE_DEFAULTS: TaxRateCreateFormValues = {
  code: '',
  name: '',
  rate: 0,
  description: '',
  displayOrder: 0,
  isActive: true,
}

function valuesFromTaxRate(t: TaxRate): TaxRateUpdateFormValues {
  return {
    name: t.name,
    rate: Number(t.rate),
    description: t.description ?? '',
    displayOrder: t.displayOrder,
    isActive: t.isActive,
  }
}

export function TaxRateFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  if (mode.kind === 'edit') {
    return (
      <EditDialog
        open={open}
        onOpenChange={onOpenChange}
        taxRate={mode.taxRate}
        onSuccess={onSuccess}
      />
    )
  }
  return <CreateDialog open={open} onOpenChange={onOpenChange} onSuccess={onSuccess} />
}

/* ---------- create ---------- */

function CreateDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (row: TaxRate) => void
}) {
  const create = useCreateTaxRate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TaxRateCreateFormValues>({
    resolver: zodResolver(taxRateCreateFormSchema),
    mode: 'onTouched',
    defaultValues: CREATE_DEFAULTS,
  })

  useEffect(() => {
    if (!open) return
    reset(CREATE_DEFAULTS)
  }, [open, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: TaxRateCreateInput = {
      code: values.code.toUpperCase(),
      name: values.name,
      rate: values.rate,
      description: values.description ? values.description : null,
      displayOrder: values.displayOrder,
      isActive: values.isActive,
    }

    try {
      const saved = await create.mutateAsync(input)
      toast.success(`Tax rate "${saved.code}" created`)
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError as unknown as MapErrorSetter)
    }
  })

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Tax Rate"
      maxWidth="640px"
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
            form="tax-rate-create-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? 'Saving...' : 'Add Tax Rate'}
          </button>
        </>
      }
    >
      <form id="tax-rate-create-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormField
              id="tax-rate-code"
              label="Code"
              required
              helpText="Uppercase letters, digits, or underscore. e.g. VAT_5, EXEMPT."
              error={errors.code?.message}
              className="sm:col-span-4 col-span-12"
            >
              <input
                id="tax-rate-code"
                type="text"
                maxLength={20}
                {...register('code', {
                  setValueAs: (v: unknown) => (typeof v === 'string' ? v.toUpperCase() : v),
                })}
                className={`${inputClass(!!errors.code)} font-mono uppercase`}
              />
            </FormField>

            <FormField
              id="tax-rate-name"
              label="Name"
              required
              error={errors.name?.message}
              className="sm:col-span-8 col-span-12"
            >
              <input
                id="tax-rate-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="tax-rate-rate"
              label="Rate (%)"
              required
              helpText="Percentage value. Up to 2 decimal places."
              error={errors.rate?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="tax-rate-rate"
                type="number"
                step="0.01"
                min={0}
                max={999.99}
                {...register('rate', { valueAsNumber: true })}
                className={`${inputClass(!!errors.rate)} font-mono`}
              />
            </FormField>

            <FormField
              id="tax-rate-display-order"
              label="Display Order"
              error={errors.displayOrder?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="tax-rate-display-order"
                type="number"
                min={0}
                {...register('displayOrder', { valueAsNumber: true })}
                className={inputClass(!!errors.displayOrder)}
              />
            </FormField>

            <FormField
              id="tax-rate-description"
              label="Description"
              error={errors.description?.message}
              className="col-span-12"
            >
              <textarea
                id="tax-rate-description"
                rows={2}
                {...register('description')}
                className={textareaClass(!!errors.description)}
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

/* ---------- edit ---------- */

function EditDialog({
  open,
  onOpenChange,
  taxRate,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  taxRate: TaxRate
  onSuccess?: (row: TaxRate) => void
}) {
  const update = useUpdateTaxRate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TaxRateUpdateFormValues>({
    resolver: zodResolver(taxRateUpdateFormSchema),
    mode: 'onTouched',
    defaultValues: valuesFromTaxRate(taxRate),
  })

  useEffect(() => {
    if (!open) return
    reset(valuesFromTaxRate(taxRate))
  }, [open, taxRate, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: TaxRateUpdateInput = {
      name: values.name,
      rate: values.rate,
      description: values.description ? values.description : null,
      displayOrder: values.displayOrder,
      isActive: values.isActive,
    }
    try {
      const saved = await update.mutateAsync({ taxRateID: taxRate.taxRateID, input })
      toast.success(`Tax rate "${saved.code}" updated`)
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError as unknown as MapErrorSetter)
    }
  })

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit ${taxRate.code}`}
      maxWidth="640px"
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
            form="tax-rate-edit-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? 'Saving...' : 'Update Tax Rate'}
          </button>
        </>
      }
    >
      <form id="tax-rate-edit-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormField
              id="tax-rate-edit-code"
              label="Code"
              className="sm:col-span-4 col-span-12"
              helpText="Code is immutable after create."
            >
              <input
                id="tax-rate-edit-code"
                type="text"
                value={taxRate.code}
                disabled
                className={`${inputClass(false)} font-mono uppercase opacity-60`}
              />
            </FormField>

            <FormField
              id="tax-rate-edit-name"
              label="Name"
              required
              error={errors.name?.message}
              className="sm:col-span-8 col-span-12"
            >
              <input
                id="tax-rate-edit-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="tax-rate-edit-rate"
              label="Rate (%)"
              required
              helpText="Percentage value. Up to 2 decimal places."
              error={errors.rate?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="tax-rate-edit-rate"
                type="number"
                step="0.01"
                min={0}
                max={999.99}
                {...register('rate', { valueAsNumber: true })}
                className={`${inputClass(!!errors.rate)} font-mono`}
              />
            </FormField>

            <FormField
              id="tax-rate-edit-display-order"
              label="Display Order"
              error={errors.displayOrder?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="tax-rate-edit-display-order"
                type="number"
                min={0}
                {...register('displayOrder', { valueAsNumber: true })}
                className={inputClass(!!errors.displayOrder)}
              />
            </FormField>

            <FormField
              id="tax-rate-edit-description"
              label="Description"
              error={errors.description?.message}
              className="col-span-12"
            >
              <textarea
                id="tax-rate-edit-description"
                rows={2}
                {...register('description')}
                className={textareaClass(!!errors.description)}
              />
            </FormField>

            <div className="col-span-12">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-dark">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  disabled={taxRate.isDefault}
                  className="size-4 rounded border-border-color text-primary focus:ring-0 disabled:opacity-50"
                />
                <span className="font-medium">
                  Active {taxRate.isDefault && <span className="text-default font-normal">(default tax rate cannot be deactivated)</span>}
                </span>
              </label>
            </div>
          </div>
        </fieldset>
      </form>
    </Dialog>
  )
}

/* ---------- helpers ---------- */

type MapErrorSetter = (
  field: string,
  error: { type: string; message: string },
) => void

function mapBackendErrors(err: unknown, setError: MapErrorSetter) {
  if (!axios.isAxiosError(err)) {
    setError('root', { type: 'server', message: 'Unexpected error. Please try again.' })
    return
  }
  const status = err.response?.status
  const data = err.response?.data as
    | { message?: string; errors?: Array<{ path?: (string | number)[]; message?: string }> }
    | undefined

  if (status === 409) {
    setError('code', {
      type: 'server',
      message: data?.message ?? 'A tax rate with this code already exists',
    })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as string
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
