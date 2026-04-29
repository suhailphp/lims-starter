/* DOMAIN — typed Admin Dashboard API client. */
import { apiClient } from './axios'
import type { AdminDashboardData } from '@/types/dashboard'

interface AdminStatsEnvelope {
  success: boolean
  data: AdminDashboardData
}

export async function getAdminDashboardApi(): Promise<AdminDashboardData> {
  const res = await apiClient.get<AdminStatsEnvelope>('/dashboard/admin-stats')
  return res.data.data
}
