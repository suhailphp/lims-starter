/* DOMAIN — typed Currency API client. */
import { apiClient } from './axios'
import type {
  Currency,
  CurrencyCreateInput,
  CurrencyUpdateInput,
  CurrencyListParams,
  CurrencyListResponse,
  CurrentRate,
  ExchangeRate,
  ExchangeRateCreateInput,
  ExchangeRateListParams,
  ExchangeRateListResponse,
  PageMeta,
} from '@/types/currency'

interface CurrencyListEnvelope { success: boolean; data: Currency[]; meta: PageMeta }
interface CurrencySingleEnvelope { success: boolean; data: Currency }
interface ExchangeRateListEnvelope { success: boolean; data: ExchangeRate[]; meta: PageMeta }
interface ExchangeRateSingleEnvelope { success: boolean; data: ExchangeRate }
interface RateOnDateEnvelope { success: boolean; data: CurrentRate }

export async function listCurrenciesApi(
  params: CurrencyListParams,
): Promise<CurrencyListResponse> {
  const res = await apiClient.get<CurrencyListEnvelope>('/currencies', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getCurrencyApi(currencyID: string): Promise<Currency> {
  const res = await apiClient.get<CurrencySingleEnvelope>(`/currencies/${currencyID}`)
  return res.data.data
}

export async function createCurrencyApi(input: CurrencyCreateInput): Promise<Currency> {
  const res = await apiClient.post<CurrencySingleEnvelope>('/currencies', input)
  return res.data.data
}

export async function updateCurrencyApi(
  currencyID: string,
  input: CurrencyUpdateInput,
): Promise<Currency> {
  const res = await apiClient.put<CurrencySingleEnvelope>(`/currencies/${currencyID}`, input)
  return res.data.data
}

export async function deleteCurrencyApi(currencyID: string): Promise<void> {
  await apiClient.delete(`/currencies/${currencyID}`)
}

export async function listExchangeRatesApi(
  currencyID: string,
  params: ExchangeRateListParams,
): Promise<ExchangeRateListResponse> {
  const res = await apiClient.get<ExchangeRateListEnvelope>(
    `/currencies/${currencyID}/exchange-rates`,
    { params },
  )
  return { data: res.data.data, meta: res.data.meta }
}

export async function createExchangeRateApi(
  currencyID: string,
  input: ExchangeRateCreateInput,
): Promise<ExchangeRate> {
  const res = await apiClient.post<ExchangeRateSingleEnvelope>(
    `/currencies/${currencyID}/exchange-rates`,
    input,
  )
  return res.data.data
}

export async function getRateOnDateApi(
  currencyID: string,
  date: string,
): Promise<CurrentRate> {
  const res = await apiClient.get<RateOnDateEnvelope>(
    `/currencies/${currencyID}/rate-on-date/${date}`,
  )
  return res.data.data
}

export async function setAsBaseCurrencyApi(currencyID: string): Promise<Currency> {
  const res = await apiClient.put<CurrencySingleEnvelope>(
    `/currencies/${currencyID}/set-as-base`,
  )
  return res.data.data
}
