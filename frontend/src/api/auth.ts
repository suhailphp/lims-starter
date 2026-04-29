/* REUSABLE */
import axios from 'axios'
import { apiClient } from './axios'
import type { LoginRequest, LoginResponse, RefreshResponse, ChangePasswordRequest, User } from '@/types/auth'

const BASE_URL = import.meta.env.VITE_API_URL as string

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await apiClient.post<{ success: boolean; data: LoginResponse }>('/auth/login', data)
  return res.data.data
}

/* Uses plain axios — bypasses the apiClient 401 interceptor to avoid circular refresh */
export async function refreshApi(refreshToken: string): Promise<RefreshResponse> {
  const res = await axios.post<{ success: boolean; data: RefreshResponse }>(
    `${BASE_URL}/auth/refresh`,
    { refreshToken },
  )
  return res.data.data
}

export async function logoutApi(refreshToken: string): Promise<void> {
  await apiClient.post('/auth/logout', { refreshToken })
}

export async function changePasswordApi(data: ChangePasswordRequest): Promise<void> {
  await apiClient.post('/auth/change-password', data)
}

/** GET /api/auth/me — refresh current-user payload (e.g. after a self-edit). */
export async function getMeApi(): Promise<User> {
  const res = await apiClient.get<{ success: boolean; data: User }>('/auth/me')
  return res.data.data
}
