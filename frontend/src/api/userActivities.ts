/* DOMAIN — typed UserActivity API client. */
import { apiClient } from './axios'
import type {
  UserActivity,
  UserActivityListParams,
  UserActivityListResponse,
  PageMeta,
} from '@/types/userActivity'

interface ListEnvelope {
  success: boolean
  data: UserActivity[]
  meta: PageMeta
}

/** GET /api/users/me/activities — caller's own feed. */
export async function listMyActivitiesApi(
  params: UserActivityListParams,
): Promise<UserActivityListResponse> {
  const res = await apiClient.get<ListEnvelope>('/users/me/activities', { params })
  return { data: res.data.data, meta: res.data.meta }
}

/** GET /api/users/:userID/activities — admin/manager (or self). */
export async function listUserActivitiesApi(
  userID: string,
  params: UserActivityListParams,
): Promise<UserActivityListResponse> {
  const res = await apiClient.get<ListEnvelope>(`/users/${userID}/activities`, {
    params,
  })
  return { data: res.data.data, meta: res.data.meta }
}
