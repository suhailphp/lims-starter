/* DOMAIN — Unified profile timeline (UserActivities + AuditLogs).
 *
 * Server merges both feeds for the current user, sorted createdAt DESC.
 * Each item carries a `source` discriminator so the renderer can pick the
 * right icon/label/body shape.
 */
import type { UserActivityActionType } from './userActivity'

export interface UserActivityTimelineItem {
  source: 'user_activity'
  id: string
  createdAt: string
  actionType: UserActivityActionType
  actionLabel: string
  description: string | null
  ipAddress: string | null
  userAgent: string | null
}

export type AuditLogAction = 'CREATE' | 'UPDATE' | 'DELETE'

export interface AuditLogTimelineItem {
  source: 'audit_log'
  id: string
  createdAt: string
  action: AuditLogAction
  entityType: string
  entityID: string
  changes: {
    before?: Record<string, unknown>
    after?: Record<string, unknown>
  }
  ipAddress: string | null
  userAgent: string | null
}

export type TimelineItem = UserActivityTimelineItem | AuditLogTimelineItem

export type TimelineFilter = 'all' | 'activities' | 'changes'

export interface TimelineParams {
  page?: number
  limit?: number
  filter?: TimelineFilter
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface TimelineResponse {
  data: TimelineItem[]
  meta: PageMeta
}
