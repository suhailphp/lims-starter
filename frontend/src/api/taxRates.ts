/* DOMAIN — typed Tax Rate API client. */
import { apiClient } from './axios'
import type {
  TaxRate,
  TaxRateCreateInput,
  TaxRateUpdateInput,
  TaxRateListParams,
  TaxRateListResponse,
  PageMeta,
} from '@/types/taxRate'

interface ListEnvelope { success: boolean; data: TaxRate[]; meta: PageMeta }
interface SingleEnvelope { success: boolean; data: TaxRate }

export async function listTaxRatesApi(
  params: TaxRateListParams,
): Promise<TaxRateListResponse> {
  const res = await apiClient.get<ListEnvelope>('/tax-rates', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getTaxRateApi(taxRateID: string): Promise<TaxRate> {
  const res = await apiClient.get<SingleEnvelope>(`/tax-rates/${taxRateID}`)
  return res.data.data
}

export async function createTaxRateApi(input: TaxRateCreateInput): Promise<TaxRate> {
  const res = await apiClient.post<SingleEnvelope>('/tax-rates', input)
  return res.data.data
}

export async function updateTaxRateApi(
  taxRateID: string,
  input: TaxRateUpdateInput,
): Promise<TaxRate> {
  const res = await apiClient.put<SingleEnvelope>(`/tax-rates/${taxRateID}`, input)
  return res.data.data
}

export async function deleteTaxRateApi(taxRateID: string): Promise<void> {
  await apiClient.delete(`/tax-rates/${taxRateID}`)
}

export async function setAsDefaultTaxRateApi(taxRateID: string): Promise<TaxRate> {
  const res = await apiClient.put<SingleEnvelope>(`/tax-rates/${taxRateID}/set-default`)
  return res.data.data
}
