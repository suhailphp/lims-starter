/* DOMAIN — Update Exchange Rate modal. New rate effective from a date;
 * the previous open-ended rate is auto-closed (server-side). */
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass, textareaClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import {
  createInvalidHandler,
  handleApiError,
  useFormSeed,
} from '@/utils/formErrors'

const KNOWN_FIELDS = ['rate', 'effectiveDate', 'notes'] as const
import { exchangeRateFormSchema, type ExchangeRateFormValues } from './currencySchema'
import { useCreateExchangeRate } from './currenciesQueries'
import { toast } from '@/lib/toast'
import type { Currency } from '@/types/currency'

interface Props {
  currency: Currency | null
  onClose: () => void
}

export function UpdateRateDialog({ currency, onClose }: Props) {
  const create = useCreateExchangeRate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeRateFormValues>({
    resolver: zodResolver(exchangeRateFormSchema),
    mode: 'onTouched',
    defaultValues: {
      rate: undefined as unknown as number,
      effectiveDate: todayIsoDate(),
      notes: '',
    },
  })

  useFormSeed({
    active: !!currency,
    id: currency?.currencyID ?? null,
    seed: () =>
      reset({
        rate: undefined as unknown as number,
        effectiveDate: todayIsoDate(),
        notes: '',
      }),
  })

  if (!currency) return null

  const currentRate = currency.currentRate?.rate ?? '—'

  const onSubmit = handleSubmit(async (values) => {
    try {
      await create.mutateAsync({
        currencyID: currency.currencyID,
        input: {
          rate: values.rate,
          effectiveDate: values.effectiveDate,
          notes: values.notes || undefined,
        },
      })
      toast.success(`Rate updated for ${currency.code}`)
      onClose()
    } catch (err) {
      handleApiError(err, setError, 'UpdateRateDialog', {
        knownFields: KNOWN_FIELDS,
      })
    }
  }, createInvalidHandler('UpdateRateDialog', setError))

  return (
    <Dialog
      open={!!currency}
      onOpenChange={(o) => !o && onClose()}
      title={`Update Rate — ${currency.code}`}
      maxWidth="560px"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="currency-rate-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? 'Saving...' : 'Add Rate'}
          </button>
        </>
      }
    >
      <form id="currency-rate-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <FormErrorBanner error={errors.root} />
            <FormField
              id="current-rate"
              label="Current Rate"
              className="col-span-12"
            >
              <input
                id="current-rate"
                type="text"
                value={currentRate}
                disabled
                className={`${inputClass(false)} font-mono opacity-60`}
              />
            </FormField>

            <FormField
              id="new-rate"
              label="New Rate"
              required
              helpText={`Units of ${currency.code} per 1 unit of base currency.`}
              error={errors.rate?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="new-rate"
                type="number"
                step="0.000001"
                min={0}
                {...register('rate', { valueAsNumber: true })}
                className={`${inputClass(!!errors.rate)} font-mono`}
              />
            </FormField>

            <FormField
              id="effective-date"
              label="Effective Date"
              required
              helpText="Backdating allowed; cannot precede current open-ended rate."
              error={errors.effectiveDate?.message}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="effectiveDate"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    inputId="effective-date"
                    mode="date"
                    value={field.value ?? null}
                    onChange={(v) => field.onChange(typeof v === 'string' ? v : null)}
                    onBlur={field.onBlur}
                    hasError={!!errors.effectiveDate}
                  />
                )}
              />
            </FormField>

            <FormField
              id="rate-notes"
              label="Notes"
              error={errors.notes?.message}
              className="col-span-12"
            >
              <textarea
                id="rate-notes"
                rows={3}
                {...register('notes')}
                className={textareaClass(!!errors.notes)}
                placeholder="Why this rate change? Source URL? (optional)"
              />
            </FormField>

            <div className="col-span-12 rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-xs text-primary-700 dark:text-primary">
              Adding this rate will close the previous open-ended rate at the new
              effective date. Historical documents (quotes, invoices) keep their
              stored rate snapshots — they do not re-price.
            </div>
          </div>
        </fieldset>
      </form>
    </Dialog>
  )
}

function todayIsoDate(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

