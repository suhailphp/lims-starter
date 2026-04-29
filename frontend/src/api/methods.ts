/* DOMAIN — typed Method API client (flat routes for the master-data /methods page). */
import { apiClient } from './axios'
import type {
  Method,
  MethodInput,
  MethodUpdateInput,
  MethodListParams,
  MethodListResponse,
  PageMeta,
} from '@/types/method'

interface ListEnvelope {
  success: boolean
  data: Method[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Method
}

export async function listMethodsApi(
  params: MethodListParams,
): Promise<MethodListResponse> {
  const res = await apiClient.get<ListEnvelope>('/methods', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getMethodApi(methodID: string): Promise<Method> {
  const res = await apiClient.get<SingleEnvelope>(`/methods/${methodID}`)
  return res.data.data
}

export async function createMethodApi(input: MethodInput): Promise<Method> {
  const res = await apiClient.post<SingleEnvelope>('/methods', input)
  return res.data.data
}

export async function updateMethodApi(
  methodID: string,
  input: MethodUpdateInput,
): Promise<Method> {
  const res = await apiClient.put<SingleEnvelope>(`/methods/${methodID}`, input)
  return res.data.data
}

export async function deleteMethodApi(methodID: string): Promise<void> {
  await apiClient.delete(`/methods/${methodID}`)
}
