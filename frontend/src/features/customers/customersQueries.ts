/* DOMAIN — TanStack Query hooks for Customers */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createCustomerApi,
  deleteCustomerApi,
  getCustomerApi,
  listCustomersApi,
  updateCustomerApi,
} from '@/api/customers'
import type {
  Customer,
  CustomerInput,
  CustomerListParams,
  CustomerListResponse,
} from '@/types/customer'

export const customersKey = {
  all: ['customers'] as const,
  list: (params: CustomerListParams) =>
    ['customers', 'list', params] as const,
  one: (customerID: string) =>
    ['customers', 'one', customerID] as const,
}

export function useCustomers(params: CustomerListParams) {
  return useQuery<CustomerListResponse>({
    queryKey: customersKey.list(params),
    queryFn: () => listCustomersApi(params),
    placeholderData: (prev) => prev, // keeps current page visible during refetch
  })
}

/**
 * Fetch a single customer by ID. Used by `?view=<id>` deep-links from
 * Global Search when the row isn't on the current paginated page.
 */
export function useCustomer(customerID: string | null) {
  return useQuery<Customer>({
    queryKey: customerID ? customersKey.one(customerID) : ['customers', 'one', 'noop'],
    queryFn: () => getCustomerApi(customerID as string),
    enabled: !!customerID,
  })
}

export function useCreateCustomer() {
  const qc = useQueryClient()
  return useMutation<Customer, Error, CustomerInput>({
    mutationFn: createCustomerApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: customersKey.all })
    },
  })
}

export function useUpdateCustomer() {
  const qc = useQueryClient()
  return useMutation<Customer, Error, { customerID: string; input: CustomerInput }>({
    mutationFn: ({ customerID, input }) => updateCustomerApi(customerID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: customersKey.all })
    },
  })
}

export function useDeleteCustomer() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: customersKey.all })
    },
  })
}

/**
 * Toggle a customer's `isActive` flag with optimistic UI.
 *
 * Implementation choice: send the FULL row payload (existing required fields
 * + flipped isActive) to the existing PUT endpoint. This avoids adding a
 * PATCH route; auditedUpdate still fires correctly. Pattern shared across
 * all master-data toggle hooks.
 */
export function useToggleActiveCustomer() {
  const qc = useQueryClient()
  return useMutation<
    Customer,
    Error,
    { customer: Customer; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ customer, nextActive }) =>
      updateCustomerApi(customer.customerID, {
        name: customer.name,
        address: customer.address,
        contactName: customer.contactName,
        contactEmail: customer.contactEmail,
        contactPhone: customer.contactPhone,
        paymentTermsDays: customer.paymentTermsDays,
        isActive: nextActive,
      }),
    onMutate: async ({ customer, nextActive }) => {
      // Cancel in-flight list fetches so they can't overwrite our optimistic write.
      await qc.cancelQueries({ queryKey: customersKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['customers', 'list'] })
      qc.setQueriesData<CustomerListResponse>(
        { queryKey: ['customers', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.customerID === customer.customerID
                ? { ...row, isActive: nextActive }
                : row,
            ),
          }
        },
      )
      return { snapshots }
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx?.snapshots) return
      for (const [key, data] of ctx.snapshots) {
        qc.setQueryData(key, data)
      }
    },
    onSettled: () => {
      // Refetch to reconcile with server (in case filter excludes the row now).
      qc.invalidateQueries({ queryKey: customersKey.all })
    },
  })
}
