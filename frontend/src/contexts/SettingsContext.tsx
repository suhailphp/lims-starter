/* DOMAIN — Public settings provider.
 *
 * Boots from /api/settings/public on app mount (this endpoint is unauth)
 * so the brand panel + page chrome can render lab name + logo before
 * the user signs in. Admin saves invalidate the TanStack cache, which
 * causes this provider to re-read on the next stale check.
 *
 * Why a provider on TOP of TanStack Query? Two reasons:
 *   1. Convenience helpers (`labName`, `labShortName`, `labLogoDataUrl`,
 *      `get(key, fallback)`) so consumers don't repeat the lookup logic.
 *   2. Dependency-graph clarity — the Header/Login/Sidebar shouldn't
 *      know the query key shape; they should ask the provider for what
 *      they need by name.
 *
 * Type-coercion note: backend always returns `value` as a string. We
 * coerce based on `valueType` so consumers get typed values via
 * `get(key, fallback)`. */
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { usePublicSettings } from '@/features/settings/queries'
import type { Setting, SettingValueType } from '@/types/settings'

interface SettingsContextValue {
  settings: Setting[]
  isLoading: boolean
  /** Generic typed accessor; returns `fallback` when the key is missing or null. */
  get: <T>(key: string, fallback: T) => T
  /** Convenience pre-resolved fields used across the app shell. */
  labName: string
  labShortName: string
  labWebsite: string
  labLogoAttachmentID: string | null
  /** Embedded dataUrl from the public payload — works pre-auth on /login. */
  labLogoDataUrl: string | null
}

const DEFAULTS = {
  labName: 'LIMS',
  labShortName: 'LIMS',
  labWebsite: '',
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function coerce<T>(setting: Setting | undefined, fallback: T): T {
  if (!setting || setting.value === null || setting.value === undefined) return fallback
  switch (setting.valueType as SettingValueType) {
    case 'NUMBER': {
      const n = Number(setting.value)
      return (Number.isFinite(n) ? n : fallback) as T
    }
    case 'BOOLEAN':
      return (setting.value === 'true') as T
    case 'JSON':
      try {
        return JSON.parse(setting.value) as T
      } catch {
        return fallback
      }
    case 'IMAGE':
    case 'STRING':
    default:
      return setting.value as unknown as T
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = usePublicSettings()
  const settings = data ?? []

  const value = useMemo<SettingsContextValue>(() => {
    const map = new Map(settings.map((s) => [s.settingKey, s]))
    const logoRow = map.get('lab_logo_attachment_id')
    return {
      settings,
      isLoading,
      get: <T,>(key: string, fallback: T) => coerce(map.get(key), fallback),
      labName: coerce(map.get('lab_name'), DEFAULTS.labName),
      labShortName: coerce(map.get('lab_short_name'), DEFAULTS.labShortName),
      labWebsite: coerce(map.get('lab_website'), DEFAULTS.labWebsite),
      labLogoAttachmentID: coerce<string | null>(logoRow, null),
      labLogoDataUrl: logoRow?.attachment?.dataUrl ?? null,
    }
  }, [settings, isLoading])

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  )
}

export function useTenantSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useTenantSettings must be used within <SettingsProvider>')
  }
  return ctx
}
