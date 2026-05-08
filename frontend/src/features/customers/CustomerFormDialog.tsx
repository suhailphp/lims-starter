/* DOMAIN — Customer Add / Edit modal.
 *   Vendor reference: vendor/src/pages/systems-security/users-roles/userModal.tsx
 *     - Body grid: grid md:grid-cols-12 gap-4 mb-5 (line 30)
 *     - Field block: label + relative wrapper + form-input (lines 61–75)
 *     - Footer: Cancel + submit (lines 140–153)
 *   Inputs catalog: vendor/src/pages/ui-elements/form-ui/formElements.tsx
 */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { z } from 'zod'
import { Dialog } from '@/components/ui/Dialog'
import {
  FormField,
  inputClass,
  textareaClass,
} from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { createInvalidHandler } from '@/utils/formErrors'
import {
  customerFormSchema,
  type CustomerFormValues,
} from './customerSchema'

/* Zod v4 produces asymmetric input/output types on `.transform()` chains
 * (e.g. address: input `string | null | undefined` → output `string | null`).
 * RHF's resolver types against the INPUT side, so we pass both generics
 * explicitly: TFieldValues = input, TTransformedValues = output (= CustomerFormValues). */
type CustomerFormInput = z.input<typeof customerFormSchema>
import {
  useCreateCustomer,
  useUpdateCustomer,
} from './customersQueries'
import { toast } from '@/lib/toast'
import type { Customer, CustomerInput } from '@/types/customer'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; customer: Customer }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (customer: Customer) => void
}

const DEFAULTS: CustomerFormInput = {
  name: '',
  address: null,
  contactName: null,
  contactEmail: null,
  contactPhone: null,
  trn: null,
  paymentTermsDays: 30,
  isActive: true,
}

function valuesFromCustomer(c: Customer): CustomerFormInput {
  return {
    name: c.name,
    address: c.address,
    contactName: c.contactName,
    contactEmail: c.contactEmail,
    contactPhone: c.contactPhone,
    trn: c.trn,
    paymentTermsDays: c.paymentTermsDays,
    isActive: c.isActive,
  }
}

export function CustomerFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateCustomer()
  const update = useUpdateCustomer()
  const isEdit = mode.kind === 'edit'

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormInput, unknown, CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  // Reset form whenever the dialog opens with a (different) record.
  useEffect(() => {
    if (!open) return
    reset(isEdit ? valuesFromCustomer(mode.customer) : DEFAULTS)
  }, [open, mode, isEdit, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input: CustomerInput = {
      name: values.name,
      address: values.address ?? null,
      contactName: values.contactName ?? null,
      contactEmail: values.contactEmail ?? null,
      contactPhone: values.contactPhone ?? null,
      trn: values.trn ?? null,
      paymentTermsDays: values.paymentTermsDays,
      isActive: values.isActive,
    }

    try {
      const saved = isEdit
        ? await update.mutateAsync({ customerID: mode.customer.customerID, input })
        : await create.mutateAsync(input)
      toast.success(
        isEdit
          ? `Customer "${saved.name}" updated`
          : `Customer "${saved.name}" created`,
      )
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      mapBackendErrors(err, setError)
    }
  }, createInvalidHandler('CustomerFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update Customer'
      : 'Add Customer'
  const title = isEdit ? 'Edit Customer' : 'Add Customer'

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
            form="customer-form"
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
      <form id="customer-form" onSubmit={onSubmit} noValidate>
        {/* fieldset disables ALL form controls during submit so the user can't
          * tweak fields while the request is in-flight. */}
        <fieldset disabled={isSubmitting} className="contents">
        {/* Vendor grid — userModal.tsx:30 */}
        <div className="grid md:grid-cols-12 gap-4">
          <FormErrorBanner error={errors.root} />
          <FormField
            id="customer-name"
            label="Customer Name"
            required
            error={errors.name?.message}
            className="col-span-12"
          >
            <input
              id="customer-name"
              type="text"
              {...register('name')}
              className={inputClass(!!errors.name)}
            />
          </FormField>

          <FormField
            id="customer-contactName"
            label="Contact Person"
            error={errors.contactName?.message}
            className="sm:col-span-6 col-span-12"
          >
            <input
              id="customer-contactName"
              type="text"
              {...register('contactName')}
              className={inputClass(!!errors.contactName)}
            />
          </FormField>

          <FormField
            id="customer-contactEmail"
            label="Email"
            error={errors.contactEmail?.message}
            className="sm:col-span-6 col-span-12"
          >
            <input
              id="customer-contactEmail"
              type="email"
              autoComplete="off"
              {...register('contactEmail')}
              className={inputClass(!!errors.contactEmail)}
            />
          </FormField>

          <FormField
            id="customer-contactPhone"
            label="Phone"
            error={errors.contactPhone?.message}
            className="sm:col-span-6 col-span-12"
          >
            <input
              id="customer-contactPhone"
              type="tel"
              {...register('contactPhone')}
              className={inputClass(!!errors.contactPhone)}
            />
          </FormField>

          <FormField
            id="customer-trn"
            label="TRN (Tax Registration Number)"
            error={errors.trn?.message}
            helpText="Optional. Alphanumeric, max 20 chars."
            className="sm:col-span-6 col-span-12"
          >
            <input
              id="customer-trn"
              type="text"
              maxLength={20}
              placeholder="e.g., 100366457800003"
              {...register('trn')}
              className={inputClass(!!errors.trn)}
            />
          </FormField>

          <FormField
            id="customer-paymentTermsDays"
            label="Payment Terms (days)"
            error={errors.paymentTermsDays?.message}
            helpText="Between 0 and 365"
            className="sm:col-span-6 col-span-12"
          >
            <input
              id="customer-paymentTermsDays"
              type="number"
              min={0}
              max={365}
              {...register('paymentTermsDays')}
              className={inputClass(!!errors.paymentTermsDays)}
            />
          </FormField>

          <FormField
            id="customer-address"
            label="Address"
            error={errors.address?.message}
            className="col-span-12"
          >
            <textarea
              id="customer-address"
              rows={3}
              {...register('address')}
              className={textareaClass(!!errors.address)}
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

/** Map backend error envelope to react-hook-form field errors. */
function mapBackendErrors(
  err: unknown,
  setError: (
    field: keyof CustomerFormValues | 'root',
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
      message: data?.message ?? 'A customer with this name already exists',
    })
    return
  }
  if (status === 422 && Array.isArray(data?.errors)) {
    for (const detail of data.errors) {
      const field = (detail.path?.[0] ?? 'root') as keyof CustomerFormValues | 'root'
      setError(field, { type: 'server', message: detail.message ?? 'Invalid value' })
    }
    return
  }
  setError('root', {
    type: 'server',
    message: data?.message ?? 'Save failed. Please try again.',
  })
}
