/* DOMAIN — typed Source API client (flat routes for the master-data /sources page). */
import { apiClient } from './axios'
import type {
  Source,
  SourceInput,
  SourceUpdateInput,
  SourceListParams,
  SourceListResponse,
  PageMeta,
} from '@/types/source'

interface ListEnvelope {
  success: boolean
  data: Source[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Source
}

export async function listSourcesApi(
  params: SourceListParams,
): Promise<SourceListResponse> {
  const res = await apiClient.get<ListEnvelope>('/sources', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getSourceApi(sourceID: string): Promise<Source> {
  const res = await apiClient.get<SingleEnvelope>(`/sources/${sourceID}`)
  return res.data.data
}

export async function createSourceApi(input: SourceInput): Promise<Source> {
  const res = await apiClient.post<SingleEnvelope>('/sources', input)
  return res.data.data
}

export async function updateSourceApi(
  sourceID: string,
  input: SourceUpdateInput,
): Promise<Source> {
  const res = await apiClient.put<SingleEnvelope>(`/sources/${sourceID}`, input)
  return res.data.data
}

export async function deleteSourceApi(sourceID: string): Promise<void> {
  await apiClient.delete(`/sources/${sourceID}`)
}
