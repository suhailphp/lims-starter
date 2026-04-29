/* DOMAIN — TanStack Query hooks for Notifications. */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteNotificationApi,
  getUnreadCountApi,
  listMyNotificationsApi,
  markAllNotificationsReadApi,
  markNotificationReadApi,
} from '@/api/notifications'
import type {
  NotificationListParams,
  NotificationListResponse,
  UnreadCountResponse,
} from '@/types/notification'

export const notificationsKey = {
  all: ['notifications'] as const,
  list: (params: NotificationListParams) =>
    ['notifications', 'list', params] as const,
  unreadCount: ['notifications', 'unread-count'] as const,
}

export function useMyNotifications(params: NotificationListParams) {
  return useQuery<NotificationListResponse>({
    queryKey: notificationsKey.list(params),
    queryFn: () => listMyNotificationsApi(params),
    placeholderData: (prev) => prev,
  })
}

/**
 * Polls every 30 s. TanStack pauses polling automatically when the tab is
 * hidden, so this doesn't burn requests in background tabs.
 */
export function useUnreadCount() {
  return useQuery<UnreadCountResponse>({
    queryKey: notificationsKey.unreadCount,
    queryFn: getUnreadCountApi,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    placeholderData: (prev) => prev,
  })
}

export function useMarkNotificationRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (notificationID: string) => markNotificationReadApi(notificationID),
    onSuccess: () => {
      // Invalidate every list variant + unread count.
      qc.invalidateQueries({ queryKey: notificationsKey.all })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: markAllNotificationsReadApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationsKey.all })
    },
  })
}

export function useDeleteNotification() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (notificationID: string) => deleteNotificationApi(notificationID),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationsKey.all })
    },
  })
}
