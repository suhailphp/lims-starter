/* DOMAIN — typed Unit API client (flat routes for the master-data /units page). */
import { apiClient } from './axios'
import type {
  Unit,
  UnitInput,
  UnitUpdateInput,
  UnitListParams,
  UnitListResponse,
  PageMeta,
} from '@/types/unit'

interface ListEnvelope {
  success: boolean
  data: Unit[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Unit
}

export async function listUnitsApi(
  params: UnitListParams,
): Promise<UnitListResponse> {
  const res = await apiClient.get<ListEnvelope>('/units', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getUnitApi(unitID: string): Promise<Unit> {
  const res = await apiClient.get<SingleEnvelope>(`/units/${unitID}`)
  return res.data.data
}

export async function createUnitApi(input: UnitInput): Promise<Unit> {
  const res = await apiClient.post<SingleEnvelope>('/units', input)
  return res.data.data
}

export async function updateUnitApi(
  unitID: string,
  input: UnitUpdateInput,
): Promise<Unit> {
  const res = await apiClient.put<SingleEnvelope>(`/units/${unitID}`, input)
  return res.data.data
}

export async function deleteUnitApi(unitID: string): Promise<void> {
  await apiClient.delete(`/units/${unitID}`)
}
