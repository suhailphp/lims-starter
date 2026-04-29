/* DOMAIN — Notification (mirrors backend backend/src/models/Notification.js) */

export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type NotificationScope = 'PERSONAL' | 'CUSTOMER' | 'LAB'

export interface Notification {
  notificationID: string
  type: NotificationType
  priority: NotificationPriority
  scope: NotificationScope
  title: string
  message: string
  link: string | null
  metadata: Record<string, unknown>
  entityType: string | null
  entityID: string | null
  triggeredBy: string | null
  createdBy: string | null
  createdAt: string
}

/**
 * Server response shape: NotificationRecipient row with the joined
 * Notification. The dropdown / list page render this as a single
 * "notification item".
 */
export interface NotificationRecipient {
  recipientID: string
  notificationID: string
  userID: string
  isRead: boolean
  readAt: string | null
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  notification: Notification
}

export interface NotificationListParams {
  page?: number
  limit?: number
  unreadOnly?: boolean
  type?: NotificationType
  priority?: NotificationPriority
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface NotificationListResponse {
  data: NotificationRecipient[]
  meta: PageMeta
}

export interface UnreadCountResponse {
  count: number
}
