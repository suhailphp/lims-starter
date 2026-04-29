/* DOMAIN — typed Settings API client. */
import axios from 'axios'
import { apiClient } from './axios'
import type { Setting, SettingsBulkPayload } from '@/types/settings'
import type { Attachment } from '@/types/attachment'

interface ListEnvelope {
  success: boolean
  data: Setting[]
}

interface SingleEnvelope {
  success: boolean
  data: Setting
}

interface AttachmentEnvelope {
  success: boolean
  data: Attachment
}

const API_BASE = import.meta.env.VITE_API_URL as string

/**
 * Fetch the public settings catalog. This endpoint is unauth — used by
 * the SettingsContext on app boot, BEFORE login, so the brand panel +
 * page chrome can render lab name/logo. We use a bare axios call (not
 * apiClient) so no Authorization header is attached if absent.
 */
export async function getPublicSettingsApi(): Promise<Setting[]> {
  const res = await axios.get<ListEnvelope>(`${API_BASE}/settings/public`)
  return res.data.data
}

export async function getAllSettingsApi(): Promise<Setting[]> {
  const res = await apiClient.get<ListEnvelope>('/settings')
  return res.data.data
}

export async function getSettingsByCategoryApi(
  category: string,
): Promise<Setting[]> {
  const res = await apiClient.get<ListEnvelope>(`/settings/category/${category}`)
  return res.data.data
}

export async function updateSettingApi(
  key: string,
  value: SettingsBulkPayload[string],
): Promise<Setting> {
  const res = await apiClient.put<SingleEnvelope>(`/settings/${key}`, { value })
  return res.data.data
}

export async function bulkUpdateSettingsApi(
  payload: SettingsBulkPayload,
): Promise<Setting[]> {
  const res = await apiClient.put<ListEnvelope>('/settings/bulk', payload)
  return res.data.data
}

export async function uploadLabLogoApi(file: File): Promise<Attachment> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await apiClient.post<AttachmentEnvelope>(
    '/settings/lab-logo',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )
  return res.data.data
}
