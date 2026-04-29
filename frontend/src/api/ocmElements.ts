/* DOMAIN — typed OcmElement API client */
import { apiClient } from './axios'
import type {
  OcmElement,
  OcmElementInput,
  OcmElementListParams,
  OcmElementListResponse,
  PageMeta,
} from '@/types/ocmElement'

interface ListEnvelope {
  success: boolean
  data: OcmElement[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: OcmElement
}

export async function listOcmElementsApi(
  params: OcmElementListParams,
): Promise<OcmElementListResponse> {
  const res = await apiClient.get<ListEnvelope>('/ocm-elements', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getOcmElementApi(ocmElementID: string): Promise<OcmElement> {
  const res = await apiClient.get<SingleEnvelope>(`/ocm-elements/${ocmElementID}`)
  return res.data.data
}

export async function createOcmElementApi(input: OcmElementInput): Promise<OcmElement> {
  const res = await apiClient.post<SingleEnvelope>('/ocm-elements', input)
  return res.data.data
}

export async function updateOcmElementApi(
  ocmElementID: string,
  input: OcmElementInput,
): Promise<OcmElement> {
  const res = await apiClient.put<SingleEnvelope>(`/ocm-elements/${ocmElementID}`, input)
  return res.data.data
}

export async function deleteOcmElementApi(ocmElementID: string): Promise<void> {
  await apiClient.delete(`/ocm-elements/${ocmElementID}`)
}
