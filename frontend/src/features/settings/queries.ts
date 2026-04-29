/* DOMAIN — TanStack Query hooks for Settings. */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  bulkUpdateSettingsApi,
  getAllSettingsApi,
  getPublicSettingsApi,
  getSettingsByCategoryApi,
  updateSettingApi,
  uploadLabLogoApi,
} from '@/api/settings'
import type { Setting, SettingsBulkPayload } from '@/types/settings'

export const settingsKey = {
  all: ['settings'] as const,
  list: ['settings', 'list'] as const,
  public: ['settings', 'public'] as const,
  category: (category: string) => ['settings', 'category', category] as const,
}

/**
 * Public settings — boot-time read used by SettingsContext. Long stale
 * time + manual `refresh()` after admin saves keeps the brand chrome
 * fresh without polling.
 */
export function usePublicSettings() {
  return useQuery<Setting[]>({
    queryKey: settingsKey.public,
    queryFn: getPublicSettingsApi,
    staleTime: 1000 * 60 * 30, // 30 min — admins rarely change branding
    placeholderData: (prev) => prev,
  })
}

export function useAllSettings() {
  return useQuery<Setting[]>({
    queryKey: settingsKey.list,
    queryFn: getAllSettingsApi,
    placeholderData: (prev) => prev,
  })
}

export function useSettingsByCategory(category: string) {
  return useQuery<Setting[]>({
    queryKey: settingsKey.category(category),
    queryFn: () => getSettingsByCategoryApi(category),
    placeholderData: (prev) => prev,
    enabled: Boolean(category),
  })
}

export function useUpdateSetting() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      key,
      value,
    }: {
      key: string
      value: SettingsBulkPayload[string]
    }) => updateSettingApi(key, value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: settingsKey.all })
    },
  })
}

export function useBulkUpdateSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: SettingsBulkPayload) => bulkUpdateSettingsApi(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: settingsKey.all })
    },
  })
}

export function useUploadLabLogo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => uploadLabLogoApi(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: settingsKey.all })
    },
  })
}
