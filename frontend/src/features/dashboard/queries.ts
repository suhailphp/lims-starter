/* DOMAIN — TanStack Query hooks for the Admin Dashboard. */
import { useQuery } from '@tanstack/react-query'
import { getAdminDashboardApi } from '@/api/dashboard'
import type { AdminDashboardData } from '@/types/dashboard'

export const dashboardKey = {
  all: ['dashboard'] as const,
  adminStats: ['dashboard', 'admin-stats'] as const,
}

/**
 * Polls every 60 s. TanStack pauses polling when the tab is hidden, so this
 * doesn't burn requests in background tabs. `placeholderData: prev` keeps
 * the previous payload visible during refetch — no flash of skeletons.
 */
export function useAdminDashboard(options: { enabled?: boolean } = {}) {
  return useQuery<AdminDashboardData>({
    queryKey: dashboardKey.adminStats,
    queryFn: getAdminDashboardApi,
    enabled: options.enabled ?? true,
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    placeholderData: (prev) => prev,
  })
}
