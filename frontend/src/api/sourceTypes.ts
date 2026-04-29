/* DOMAIN — typed SourceType API client */
import { apiClient } from './axios'
import type {
  SourceType,
  SourceTypeInput,
  SourceTypeListParams,
  SourceTypeListResponse,
  PageMeta,
} from '@/types/sourceType'

interface ListEnvelope {
  success: boolean
  data: SourceType[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: SourceType
}

export async function listSourceTypesApi(
  params: SourceTypeListParams,
): Promise<SourceTypeListResponse> {
  const res = await apiClient.get<ListEnvelope>('/source-types', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getSourceTypeApi(sourceTypeID: string): Promise<SourceType> {
  const res = await apiClient.get<SingleEnvelope>(`/source-types/${sourceTypeID}`)
  return res.data.data
}

export async function createSourceTypeApi(input: SourceTypeInput): Promise<SourceType> {
  const res = await apiClient.post<SingleEnvelope>('/source-types', input)
  return res.data.data
}

export async function updateSourceTypeApi(
  sourceTypeID: string,
  input: SourceTypeInput,
): Promise<SourceType> {
  const res = await apiClient.put<SingleEnvelope>(`/source-types/${sourceTypeID}`, input)
  return res.data.data
}

export async function deleteSourceTypeApi(sourceTypeID: string): Promise<void> {
  await apiClient.delete(`/source-types/${sourceTypeID}`)
}
