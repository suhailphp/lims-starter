/* DOMAIN — User entity (mirrors backend backend/src/models/User.js) */
import type { UserRole } from './auth'
import type { Attachment } from './attachment'

export type { UserRole }

export const USER_ROLES: UserRole[] = [
  'ADMIN',
  'MANAGER',
  'TECHNICIAN',
  'RECEPTIONIST',
  'CUSTOMER',
]

/** Embedded customer summary returned by GET /api/users (list + getOne). */
export interface UserCustomerSummary {
  customerID: string
  name: string
}

export interface User {
  userID: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  customerID: string | null
  customer?: UserCustomerSummary | null
  profilePhotoAttachmentID: string | null
  profilePhoto?: Attachment | null
  lastLoginAt: string | null
  failedLoginAttempts: number
  lockedUntil: string | null
  passwordChangedAt: string | null
  mustChangePassword: boolean
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

/** POST /api/users body. */
export interface UserCreateInput {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  customerID?: string | null
  isActive?: boolean
}

/** PUT /api/users/:userID body. Password NOT included — use reset-password. */
export interface UserUpdateInput {
  firstName?: string
  lastName?: string
  email?: string
  role?: UserRole
  customerID?: string | null
  isActive?: boolean
  /** Server hard-deletes the prior attachment when this changes. */
  profilePhotoAttachmentID?: string | null
}

/** GET /api/users query params. */
export interface UserListParams {
  page?: number
  limit?: number
  search?: string
  role?: UserRole
  isActive?: boolean
  customerID?: string
  sort?:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'role'
    | 'createdAt'
    | 'updatedAt'
    | 'lastLoginAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface UserListResponse {
  data: User[]
  meta: PageMeta
}

/** POST /api/users/:userID/reset-password body. */
export interface ResetPasswordInput {
  newPassword?: string
}

export interface ResetPasswordResponse {
  userID: string
  tempPassword: string
  mustChangePassword: boolean
}
