/* DOMAIN — typed Notifications API client. */
import { apiClient } from './axios'
import type {
  NotificationListParams,
  NotificationListResponse,
  NotificationRecipient,
  PageMeta,
  UnreadCountResponse,
} from '@/types/notification'

interface ListEnvelope {
  success: boolean
  data: NotificationRecipient[]
  meta: PageMeta
}

interface UnreadEnvelope {
  success: boolean
  data: UnreadCountResponse
}

interface SingleEnvelope {
  success: boolean
  data: NotificationRecipient
}

interface UpdatedEnvelope {
  success: boolean
  data: { updated: number }
}

export async function listMyNotificationsApi(
  params: NotificationListParams,
): Promise<NotificationListResponse> {
  const res = await apiClient.get<ListEnvelope>('/notifications/me', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getUnreadCountApi(): Promise<UnreadCountResponse> {
  const res = await apiClient.get<UnreadEnvelope>('/notifications/me/unread-count')
  return res.data.data
}

export async function markNotificationReadApi(
  notificationID: string,
): Promise<NotificationRecipient> {
  const res = await apiClient.put<SingleEnvelope>(
    `/notifications/${notificationID}/read`,
  )
  return res.data.data
}

export async function markAllNotificationsReadApi(): Promise<{ updated: number }> {
  const res = await apiClient.put<UpdatedEnvelope>('/notifications/me/read-all')
  return res.data.data
}

export async function deleteNotificationApi(notificationID: string): Promise<void> {
  await apiClient.delete(`/notifications/${notificationID}`)
}
