/* DOMAIN — TanStack Query hooks for Currencies + ExchangeRates. */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createCurrencyApi,
  createExchangeRateApi,
  deleteCurrencyApi,
  listCurrenciesApi,
  listExchangeRatesApi,
  setAsBaseCurrencyApi,
  updateCurrencyApi,
} from '@/api/currencies'
import type {
  Currency,
  CurrencyCreateInput,
  CurrencyListParams,
  CurrencyListResponse,
  CurrencyUpdateInput,
  ExchangeRate,
  ExchangeRateCreateInput,
  ExchangeRateListParams,
  ExchangeRateListResponse,
} from '@/types/currency'

export const currenciesKey = {
  all: ['currencies'] as const,
  list: (params: CurrencyListParams) => ['currencies', 'list', params] as const,
  one: (currencyID: string) => ['currencies', 'one', currencyID] as const,
  rates: (currencyID: string, params: ExchangeRateListParams) =>
    ['currencies', currencyID, 'rates', params] as const,
}

export function useCurrencies(params: CurrencyListParams) {
  return useQuery<CurrencyListResponse>({
    queryKey: currenciesKey.list(params),
    queryFn: () => listCurrenciesApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useExchangeRates(
  currencyID: string | null,
  params: ExchangeRateListParams,
) {
  return useQuery<ExchangeRateListResponse>({
    queryKey: currenciesKey.rates(currencyID ?? '', params),
    queryFn: () => listExchangeRatesApi(currencyID as string, params),
    enabled: !!currencyID,
    placeholderData: (prev) => prev,
  })
}

export function useCreateCurrency() {
  const qc = useQueryClient()
  return useMutation<Currency, Error, CurrencyCreateInput>({
    mutationFn: createCurrencyApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currenciesKey.all })
    },
  })
}

export function useUpdateCurrency() {
  const qc = useQueryClient()
  return useMutation<Currency, Error, { currencyID: string; input: CurrencyUpdateInput }>({
    mutationFn: ({ currencyID, input }) => updateCurrencyApi(currencyID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currenciesKey.all })
    },
  })
}

export function useDeleteCurrency() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteCurrencyApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currenciesKey.all })
    },
  })
}

/** Activate / deactivate via full-payload PUT, optimistic. Mirrors the
 *  master-data pattern from useToggleActiveSourceType. */
export function useToggleActiveCurrency() {
  const qc = useQueryClient()
  return useMutation<
    Currency,
    Error,
    { currency: Currency; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ currency, nextActive }) =>
      updateCurrencyApi(currency.currencyID, {
        name: currency.name,
        symbol: currency.symbol,
        decimalPlaces: currency.decimalPlaces,
        displayOrder: currency.displayOrder,
        isActive: nextActive,
      }),
    onMutate: async ({ currency, nextActive }) => {
      await qc.cancelQueries({ queryKey: currenciesKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['currencies', 'list'] })
      qc.setQueriesData<CurrencyListResponse>(
        { queryKey: ['currencies', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.currencyID === currency.currencyID
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
      qc.invalidateQueries({ queryKey: currenciesKey.all })
    },
  })
}

export function useCreateExchangeRate() {
  const qc = useQueryClient()
  return useMutation<
    ExchangeRate,
    Error,
    { currencyID: string; input: ExchangeRateCreateInput }
  >({
    mutationFn: ({ currencyID, input }) => createExchangeRateApi(currencyID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currenciesKey.all })
    },
  })
}

export function useSetBaseCurrency() {
  const qc = useQueryClient()
  return useMutation<Currency, Error, string>({
    mutationFn: setAsBaseCurrencyApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currenciesKey.all })
      // Settings cache flips base_currency_code — invalidate so any
      // tenant-branding consumers re-read.
      qc.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}
