/* DOMAIN — typed User API client */
import { apiClient } from './axios'
import type {
  User,
  UserCreateInput,
  UserUpdateInput,
  UserListParams,
  UserListResponse,
  PageMeta,
  ResetPasswordInput,
  ResetPasswordResponse,
} from '@/types/user'

interface ListEnvelope {
  success: boolean
  data: User[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: User
}

interface ResetEnvelope {
  success: boolean
  message: string
  data: ResetPasswordResponse
}

export async function listUsersApi(
  params: UserListParams,
): Promise<UserListResponse> {
  const res = await apiClient.get<ListEnvelope>('/users', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getUserApi(userID: string): Promise<User> {
  const res = await apiClient.get<SingleEnvelope>(`/users/${userID}`)
  return res.data.data
}

export async function createUserApi(input: UserCreateInput): Promise<User> {
  const res = await apiClient.post<SingleEnvelope>('/users', input)
  return res.data.data
}

export async function updateUserApi(
  userID: string,
  input: UserUpdateInput,
): Promise<User> {
  const res = await apiClient.put<SingleEnvelope>(`/users/${userID}`, input)
  return res.data.data
}

export async function deleteUserApi(userID: string): Promise<void> {
  await apiClient.delete(`/users/${userID}`)
}

export async function resetUserPasswordApi(
  userID: string,
  input: ResetPasswordInput,
): Promise<ResetPasswordResponse> {
  const res = await apiClient.post<ResetEnvelope>(
    `/users/${userID}/reset-password`,
    input,
  )
  return res.data.data
}
