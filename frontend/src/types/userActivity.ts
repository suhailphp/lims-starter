/* DOMAIN — UserActivity (mirrors backend backend/src/models/UserActivity.js) */

export type UserActivityActionType =
  | 'LOGIN'
  | 'LOGIN_FAILED'
  | 'LOGOUT'
  | 'PROFILE_UPDATED'
  | 'PHOTO_UPDATED'
  | 'PASSWORD_CHANGED'
  | 'PASSWORD_RESET'

export interface UserActivity {
  activityID: string
  userID: string
  actionType: UserActivityActionType
  actionLabel: string
  description: string | null
  ipAddress: string | null
  userAgent: string | null
  metadata: Record<string, unknown>
  createdAt: string
}

export interface UserActivityListParams {
  page?: number
  limit?: number
  actionType?: UserActivityActionType
  from?: string
  to?: string
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface UserActivityListResponse {
  data: UserActivity[]
  meta: PageMeta
}
