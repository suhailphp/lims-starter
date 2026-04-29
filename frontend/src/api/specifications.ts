/* DOMAIN — typed Specification API client */
import { apiClient } from './axios'
import type {
  Specification,
  SpecificationInput,
  SpecificationListParams,
  SpecificationListResponse,
  PageMeta,
} from '@/types/specification'

interface ListEnvelope {
  success: boolean
  data: Specification[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Specification
}

export async function listSpecificationsApi(
  params: SpecificationListParams,
): Promise<SpecificationListResponse> {
  const res = await apiClient.get<ListEnvelope>('/specifications', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getSpecificationApi(specificationID: string): Promise<Specification> {
  const res = await apiClient.get<SingleEnvelope>(`/specifications/${specificationID}`)
  return res.data.data
}

export async function createSpecificationApi(input: SpecificationInput): Promise<Specification> {
  const res = await apiClient.post<SingleEnvelope>('/specifications', input)
  return res.data.data
}

export async function updateSpecificationApi(
  specificationID: string,
  input: SpecificationInput,
): Promise<Specification> {
  const res = await apiClient.put<SingleEnvelope>(`/specifications/${specificationID}`, input)
  return res.data.data
}

export async function deleteSpecificationApi(specificationID: string): Promise<void> {
  await apiClient.delete(`/specifications/${specificationID}`)
}
