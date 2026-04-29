/* DOMAIN — typed timeline API client. */
import { apiClient } from './axios'
import type {
  TimelineItem,
  TimelineParams,
  TimelineResponse,
  PageMeta,
} from '@/types/timeline'

interface ListEnvelope {
  success: boolean
  data: TimelineItem[]
  meta: PageMeta
}

/** GET /api/users/me/timeline — merged self-feed (activities + own audit logs). */
export async function listMyTimelineApi(
  params: TimelineParams,
): Promise<TimelineResponse> {
  const res = await apiClient.get<ListEnvelope>('/users/me/timeline', { params })
  return { data: res.data.data, meta: res.data.meta }
}
