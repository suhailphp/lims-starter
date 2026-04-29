/* DOMAIN — typed Test API client (flat routes for the master-data /tests page). */
import { apiClient } from './axios'
import type {
  Test,
  TestInput,
  TestUpdateInput,
  TestListParams,
  TestListResponse,
  PageMeta,
} from '@/types/test'

interface ListEnvelope {
  success: boolean
  data: Test[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Test
}

export async function listTestsApi(
  params: TestListParams,
): Promise<TestListResponse> {
  const res = await apiClient.get<ListEnvelope>('/tests', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getTestApi(testID: string): Promise<Test> {
  const res = await apiClient.get<SingleEnvelope>(`/tests/${testID}`)
  return res.data.data
}

export async function createTestApi(input: TestInput): Promise<Test> {
  const res = await apiClient.post<SingleEnvelope>('/tests', input)
  return res.data.data
}

export async function updateTestApi(
  testID: string,
  input: TestUpdateInput,
): Promise<Test> {
  const res = await apiClient.put<SingleEnvelope>(`/tests/${testID}`, input)
  return res.data.data
}

export async function deleteTestApi(testID: string): Promise<void> {
  await apiClient.delete(`/tests/${testID}`)
}
