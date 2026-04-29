/* DOMAIN — UserRole enum is LIMS-specific; replace per project */
import type { Attachment } from './attachment'

export type UserRole =
  | 'ADMIN'
  | 'MANAGER'
  | 'TECHNICIAN'
  | 'RECEPTIONIST'
  | 'CUSTOMER'

export interface User {
  userID: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  customerID: string | null
  isActive: boolean
  mustChangePassword: boolean
  profilePhotoAttachmentID?: string | null
  profilePhoto?: Attachment | null
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  isInitialized: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: User
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}
