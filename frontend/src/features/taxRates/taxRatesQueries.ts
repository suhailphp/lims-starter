/* DOMAIN — TanStack Query hooks for Tax Rates. */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTaxRateApi,
  deleteTaxRateApi,
  listTaxRatesApi,
  setAsDefaultTaxRateApi,
  updateTaxRateApi,
} from '@/api/taxRates'
import type {
  TaxRate,
  TaxRateCreateInput,
  TaxRateListParams,
  TaxRateListResponse,
  TaxRateUpdateInput,
} from '@/types/taxRate'

export const taxRatesKey = {
  all: ['taxRates'] as const,
  list: (params: TaxRateListParams) => ['taxRates', 'list', params] as const,
  one: (taxRateID: string) => ['taxRates', 'one', taxRateID] as const,
}

export function useTaxRates(params: TaxRateListParams) {
  return useQuery<TaxRateListResponse>({
    queryKey: taxRatesKey.list(params),
    queryFn: () => listTaxRatesApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateTaxRate() {
  const qc = useQueryClient()
  return useMutation<TaxRate, Error, TaxRateCreateInput>({
    mutationFn: createTaxRateApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taxRatesKey.all })
    },
  })
}

export function useUpdateTaxRate() {
  const qc = useQueryClient()
  return useMutation<TaxRate, Error, { taxRateID: string; input: TaxRateUpdateInput }>({
    mutationFn: ({ taxRateID, input }) => updateTaxRateApi(taxRateID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taxRatesKey.all })
    },
  })
}

export function useDeleteTaxRate() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteTaxRateApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taxRatesKey.all })
    },
  })
}

/** Activate / deactivate via full-payload PUT, optimistic. Mirrors
 *  useToggleActiveCurrency. */
export function useToggleActiveTaxRate() {
  const qc = useQueryClient()
  return useMutation<
    TaxRate,
    Error,
    { taxRate: TaxRate; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ taxRate, nextActive }) =>
      updateTaxRateApi(taxRate.taxRateID, {
        name: taxRate.name,
        rate: Number(taxRate.rate),
        type: taxRate.type,
        description: taxRate.description,
        displayOrder: taxRate.displayOrder,
        isActive: nextActive,
      }),
    onMutate: async ({ taxRate, nextActive }) => {
      await qc.cancelQueries({ queryKey: taxRatesKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['taxRates', 'list'] })
      qc.setQueriesData<TaxRateListResponse>(
        { queryKey: ['taxRates', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.taxRateID === taxRate.taxRateID
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
      for (const [key, data] of ctx.snapshots) qc.setQueryData(key, data)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: taxRatesKey.all })
    },
  })
}

export function useSetDefaultTaxRate() {
  const qc = useQueryClient()
  return useMutation<TaxRate, Error, string>({
    mutationFn: setAsDefaultTaxRateApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taxRatesKey.all })
      // Settings cache flips default_tax_rate_code — invalidate so any
      // workflow-defaults consumers re-read.
      qc.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}
