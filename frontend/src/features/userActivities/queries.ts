/* DOMAIN — TanStack Query hooks for UserActivities + unified timeline. */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { listMyActivitiesApi, listUserActivitiesApi } from '@/api/userActivities'
import { listMyTimelineApi } from '@/api/timeline'
import type {
  UserActivityListParams,
  UserActivityListResponse,
} from '@/types/userActivity'
import type {
  TimelineFilter,
  TimelineParams,
  TimelineResponse,
} from '@/types/timeline'

export const userActivitiesKey = {
  all: ['user-activities'] as const,
  me: (params: UserActivityListParams) =>
    ['user-activities', 'me', params] as const,
  user: (userID: string, params: UserActivityListParams) =>
    ['user-activities', 'user', userID, params] as const,
}

export function useMyActivities(params: UserActivityListParams) {
  return useQuery<UserActivityListResponse>({
    queryKey: userActivitiesKey.me(params),
    queryFn: () => listMyActivitiesApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useUserActivities(userID: string, params: UserActivityListParams) {
  return useQuery<UserActivityListResponse>({
    queryKey: userActivitiesKey.user(userID, params),
    queryFn: () => listUserActivitiesApi(userID, params),
    placeholderData: (prev) => prev,
    enabled: !!userID,
  })
}

export const timelineKey = {
  /** Catches both single-page and infinite variants — prefix match. */
  all: ['timeline'] as const,
  me: (params: TimelineParams) => ['timeline', 'me', params] as const,
  meInfinite: (filter: TimelineFilter, limit: number) =>
    ['timeline', 'me', 'infinite', { filter, limit }] as const,
}

export function useMyTimeline(params: TimelineParams) {
  return useQuery<TimelineResponse>({
    queryKey: timelineKey.me(params),
    queryFn: () => listMyTimelineApi(params),
    placeholderData: (prev) => prev,
  })
}

/**
 * Infinite-scroll variant for the Profile feed. Each "page" is one
 * server response; `useInfiniteQuery` concatenates them. `getNextPageParam`
 * computes the next page number from `meta.total / meta.limit`, returns
 * undefined when no more pages remain.
 *
 * Filter changes produce a new queryKey, which resets pagination to page 1
 * automatically — no manual reset needed.
 */
export function useMyTimelineInfinite(filter: TimelineFilter, limit = 20) {
  return useInfiniteQuery<TimelineResponse>({
    queryKey: timelineKey.meInfinite(filter, limit),
    queryFn: ({ pageParam }) =>
      listMyTimelineApi({ page: pageParam as number, limit, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const fetched = lastPage.meta.page * lastPage.meta.limit
      return fetched < lastPage.meta.total ? lastPage.meta.page + 1 : undefined
    },
  })
}
