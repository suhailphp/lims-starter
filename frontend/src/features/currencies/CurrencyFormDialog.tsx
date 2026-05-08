/* DOMAIN — Currency Add / Edit modal.
 *
 * Conditional Initial Rate field: shown only on Add when there's already
 * a base currency (i.e. the new row will NOT auto-become base). On Edit
 * the rate fields are absent — rate edits go through Update Rate dialog.
 */
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { EnumSelect } from '@/components/ui/EnumSelect'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import { createInvalidHandler } from '@/utils/formErrors'
import {
  currencyCreateFormSchema,
  currencyUpdateFormSchema,
  DECIMAL_PLACES_OPTIONS,
  type CurrencyCreateFormValues,
  type CurrencyUpdateFormValues,
} from './currencySchema'
import {
  useCreateCurrency,
  useUpdateCurrency,
} from './currenciesQueries'
import { toast } from '@/lib/toast'
import type {
  Currency,
  CurrencyCreateInput,
  CurrencyUpdateInput,
} from '@/types/currency'

type Mode =
  | { kind: 'create'; hasBaseCurrency: boolean }
  | { kind: 'edit'; currency: Currency }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (currency: Currency) => void
}

const CREATE_DEFAULTS: CurrencyCreateFormValues = {
  code: '',
  name: '',
  symbol: '',
  decimalPlaces: 2,
  displayOrder: 0,
  isActive: true,
  requiresInitialRate: true,
  initialRate: undefined,
  initialRateEffectiveDate: todayIsoDate(),
}

function valuesFromCurrency(c: Currency): CurrencyUpdateFormValues {
  return {
    name: c.name,
    symbol: c.symbol,
    decimalPlaces: c.decimalPlaces,
    displayOrder: c.displayOrder,
    isActive: c.isActive,
  }
}

export function CurrencyFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  if (mode.kind === 'edit') {
    return (
      <EditDialog
        open={open}
        onOpenChange={onOpenChange}
        currency={mode.currency}
        onSuccess={onSuccess}
      />
    )
  }
  return (
    <CreateDialog
      open={open}
      onOpenChange={onOpenChange}
      hasBaseCurrency={mode.hasBaseCurrency}
      onSuccess={onSuccess}
    />
  )
}

/* ---------- create ---------- */

function CreateDialog({
  open,
  onOpenChange,
  hasBaseCurrency,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasBaseCurrency: boolean
  onSuccess?: (currency: Currency) => void
}) {
  const create = useCreateCurrency()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CurrencyCreateFormValues>({
    resolver: zodResolver(currencyCreateFormSchema),
    mode: 'onTouched',
    defaultValues: { ...CREATE_DEFAULTS, requiresInitialRate: hasBaseCurrency },
  })

  useEffect(() => {
    if (!open) return
    reset({ ...CREATE_DEFAULTS, requiresInitialRate: hasBaseCurrency })
  }, [open, hasBaseCurrency, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: CurrencyCreateInput = {
      code: values.code.toUpperCase(),
      name: values.name,
      symbol: values.symbol,
      // Zod refine already restricts to 0|2|3|4; cast is a TS narrowing.
      decimalPlaces: values.decimalPlaces as 0 | 2 | 3 | 4,
      displayOrder: values.displayOrder,
      isActive: values.isActive,
    }
    if (values.requiresInitialRate) {
      input.initialRate = values.initialRate
      input.initialRateEffectiveDate = values.initialRateEffectiveDate
    }

    try {
      const saved = await create.mutateAsync(input)
      toast.success(`Currency "${saved.code}" created`)
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      // RHF setError takes a typed field union; cast at the call site so the
      // generic helper stays usable from both create + edit forms.
      mapBackendErrors(err, setError as unknown as MapErrorSetter)
    }
  }, createInvalidHandler('CurrencyFormDialog.Create', setError))

  const submitLabel = isSubmitting ? 'Saving...' : 'Add Currency'

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={hasBaseCurrency ? 'Add Currency' : 'Add Base Currency'}
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
            form="currency-create-form"
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
      <form id="currency-create-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="currency-code"
              label="Code"
              required
              helpText="ISO 4217 (3 letters). Auto-uppercased."
              error={errors.code?.message}
              className="sm:col-span-4 col-span-12"
            >
              <input
                id="currency-code"
                type="text"
                maxLength={3}
                {...register('code', {
                  setValueAs: (v: unknown) => (typeof v === 'string' ? v.toUpperCase() : v),
                })}
                className={`${inputClass(!!errors.code)} font-mono uppercase`}
              />
            </FormField>

            <FormField
              id="currency-name"
              label="Name"
              required
              error={errors.name?.message}
              className="sm:col-span-8 col-span-12"
            >
              <input
                id="currency-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="currency-symbol"
              label="Symbol"
              required
              error={errors.symbol?.message}
              className="sm:col-span-4 col-span-12"
            >
              <input
                id="currency-symbol"
                type="text"
                maxLength={10}
                {...register('symbol')}
                className={`${inputClass(!!errors.symbol)} font-mono`}
              />
            </FormField>

            <FormField
              id="currency-decimals"
              label="Decimal Places"
              required
              error={errors.decimalPlaces?.message}
              className="sm:col-span-4 col-span-12"
            >
              <Controller
                name="decimalPlaces"
                control={control}
                render={({ field }) => (
                  <EnumSelect
                    inputId="currency-decimals"
                    options={DECIMAL_PLACES_OPTIONS}
                    value={String(field.value)}
                    onChange={(v) => field.onChange(v ? Number(v) : 2)}
                    onBlur={field.onBlur}
                    hasError={!!errors.decimalPlaces}
                  />
                )}
              />
            </FormField>

            <FormField
              id="currency-display-order"
              label="Display Order"
              error={errors.displayOrder?.message}
              className="sm:col-span-4 col-span-12"
            >
              <input
                id="currency-display-order"
                type="number"
                min={0}
                {...register('displayOrder', { valueAsNumber: true })}
                className={inputClass(!!errors.displayOrder)}
              />
            </FormField>

            {hasBaseCurrency ? (
              <>
                <FormField
                  id="currency-initial-rate"
                  label="Initial Exchange Rate"
                  required
                  helpText="Units of THIS currency per 1 unit of base currency."
                  error={errors.initialRate?.message}
                  className="sm:col-span-6 col-span-12"
                >
                  <input
                    id="currency-initial-rate"
                    type="number"
                    step="0.000001"
                    min={0}
                    {...register('initialRate', { valueAsNumber: true })}
                    className={`${inputClass(!!errors.initialRate)} font-mono`}
                  />
                </FormField>

                <FormField
                  id="currency-initial-effective"
                  label="Effective Date"
                  required
                  error={errors.initialRateEffectiveDate?.message}
                  className="sm:col-span-6 col-span-12"
                >
                  <Controller
                    name="initialRateEffectiveDate"
                    control={control}
                    render={({ field }) => (
                      <DateTimePicker
                        inputId="currency-initial-effective"
                        mode="date"
                        value={field.value ?? null}
                        onChange={(v) => field.onChange(typeof v === 'string' ? v : null)}
                        onBlur={field.onBlur}
                        hasError={!!errors.initialRateEffectiveDate}
                      />
                    )}
                  />
                </FormField>
              </>
            ) : (
              <div className="col-span-12 rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-primary-700 dark:text-primary">
                This is the first currency — it will become the base currency
                automatically. The exchange rate will be 1.000000 by definition.
              </div>
            )}

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
  currency,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  currency: Currency
  onSuccess?: (currency: Currency) => void
}) {
  const update = useUpdateCurrency()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CurrencyUpdateFormValues>({
    resolver: zodResolver(currencyUpdateFormSchema),
    mode: 'onTouched',
    defaultValues: valuesFromCurrency(currency),
  })

  useEffect(() => {
    if (!open) return
    reset(valuesFromCurrency(currency))
  }, [open, currency, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: CurrencyUpdateInput = {
      name: values.name,
      symbol: values.symbol,
      decimalPlaces: values.decimalPlaces as 0 | 2 | 3 | 4,
      displayOrder: values.displayOrder,
      isActive: values.isActive,
    }
    try {
      const saved = await update.mutateAsync({ currencyID: currency.currencyID, input })
      toast.success(`Currency "${saved.code}" updated`)
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError as unknown as MapErrorSetter)
    }
  }, createInvalidHandler('CurrencyFormDialog.Edit', setError))

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit ${currency.code}`}
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
            form="currency-edit-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? 'Saving...' : 'Update Currency'}
          </button>
        </>
      }
    >
      <form id="currency-edit-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="currency-edit-code"
              label="Code"
              className="sm:col-span-4 col-span-12"
              helpText="Code is immutable after create."
            >
              <input
                id="currency-edit-code"
                type="text"
                value={currency.code}
                disabled
                className={`${inputClass(false)} font-mono uppercase opacity-60`}
              />
            </FormField>

            <FormField
              id="currency-edit-name"
              label="Name"
              required
              error={errors.name?.message}
              className="sm:col-span-8 col-span-12"
            >
              <input
                id="currency-edit-name"
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
              />
            </FormField>

            <FormField
              id="currency-edit-symbol"
              label="Symbol"
              required
              error={errors.symbol?.message}
              className="sm:col-span-4 col-span-12"
            >
              <input
                id="currency-edit-symbol"
                type="text"
                maxLength={10}
                {...register('symbol')}
                className={`${inputClass(!!errors.symbol)} font-mono`}
              />
            </FormField>

            <FormField
              id="currency-edit-decimals"
              label="Decimal Places"
              required
              error={errors.decimalPlaces?.message}
              className="sm:col-span-4 col-span-12"
            >
              <Controller
                name="decimalPlaces"
                control={control}
                render={({ field }) => (
                  <EnumSelect
                    inputId="currency-edit-decimals"
                    options={DECIMAL_PLACES_OPTIONS}
                    value={String(field.value)}
                    onChange={(v) => field.onChange(v ? Number(v) : 2)}
                    onBlur={field.onBlur}
                    hasError={!!errors.decimalPlaces}
                  />
                )}
              />
            </FormField>

            <FormField
              id="currency-edit-display-order"
              label="Display Order"
              error={errors.displayOrder?.message}
              className="sm:col-span-4 col-span-12"
            >
              <input
                id="currency-edit-display-order"
                type="number"
                min={0}
                {...register('displayOrder', { valueAsNumber: true })}
                className={inputClass(!!errors.displayOrder)}
              />
            </FormField>

            <div className="col-span-12">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-dark">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  disabled={currency.isBase}
                  className="size-4 rounded border-border-color text-primary focus:ring-0 disabled:opacity-50"
                />
                <span className="font-medium">
                  Active {currency.isBase && <span className="text-default font-normal">(base currency cannot be deactivated)</span>}
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

function todayIsoDate(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

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
      message: data?.message ?? 'A currency with this code already exists',
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
