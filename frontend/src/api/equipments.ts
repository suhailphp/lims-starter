/* DOMAIN — typed Equipment API client */
import { apiClient } from './axios'
import type {
  Equipment,
  EquipmentInput,
  EquipmentListParams,
  EquipmentListResponse,
  PageMeta,
} from '@/types/equipment'

interface ListEnvelope {
  success: boolean
  data: Equipment[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Equipment
}

export async function listEquipmentsApi(
  params: EquipmentListParams,
): Promise<EquipmentListResponse> {
  const res = await apiClient.get<ListEnvelope>('/equipments', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getEquipmentApi(equipmentID: string): Promise<Equipment> {
  const res = await apiClient.get<SingleEnvelope>(`/equipments/${equipmentID}`)
  return res.data.data
}

export async function createEquipmentApi(input: EquipmentInput): Promise<Equipment> {
  const res = await apiClient.post<SingleEnvelope>('/equipments', input)
  return res.data.data
}

export async function updateEquipmentApi(
  equipmentID: string,
  input: EquipmentInput,
): Promise<Equipment> {
  const res = await apiClient.put<SingleEnvelope>(`/equipments/${equipmentID}`, input)
  return res.data.data
}

export async function deleteEquipmentApi(equipmentID: string): Promise<void> {
  await apiClient.delete(`/equipments/${equipmentID}`)
}
