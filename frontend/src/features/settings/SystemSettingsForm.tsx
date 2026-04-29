/* DOMAIN — System settings form (auth + storage caps).
 *
 * Mixes LIVE values (max_login_attempts, account_lockout_minutes,
 * max_attachment_size_kb) with STORED ONLY values (session_timeout,
 * password_min_length). Stored-only fields render with an italic note
 * so admins know editing them is harmless but won't change behavior
 * until those modules ship. */
import { useEffect, useState } from 'react'
import { IconShieldLock, IconUpload } from '@tabler/icons-react'
import { toast } from '@/lib/toast'
import {
  useBulkUpdateSettings,
  useSettingsByCategory,
} from '@/features/settings/queries'
import {
  FieldShell,
  SectionFormFrame,
  Subsection,
  inputClass,
} from './SectionFormFrame'
import type { Setting } from '@/types/settings'

const KEYS = [
  'session_timeout_minutes',
  'max_login_attempts',
  'account_lockout_minutes',
  'password_min_length',
  'max_attachment_size_kb',
] as const

type FormState = Record<(typeof KEYS)[number], string>

const STORED_ONLY = new Set(['session_timeout_minutes', 'password_min_length'])

function rowsToState(rows: Setting[]): FormState {
  const map = new Map(rows.map((r) => [r.settingKey, r.value ?? '']))
  const state = {} as FormState
  KEYS.forEach((k) => { state[k] = map.get(k) ?? '' })
  return state
}

function findRow(rows: Setting[], key: string): Setting | undefined {
  return rows.find((r) => r.settingKey === key)
}

export function SystemSettingsForm() {
  const { data: rows = [], isLoading } = useSettingsByCategory('system')
  const bulkMutation = useBulkUpdateSettings()

  const [form, setForm] = useState<FormState | null>(null)
  const [original, setOriginal] = useState<FormState | null>(null)

  useEffect(() => {
    if (rows.length && !form) {
      const init = rowsToState(rows)
      setForm(init)
      setOriginal(init)
    }
  }, [rows, form])

  if (isLoading || !form || !original) {
    return <div className="bg-white shadow rounded-md p-5 border border-border-color">
      <div className="h-6 w-40 bg-light/70 rounded animate-pulse mb-5" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-10 bg-light/70 rounded animate-pulse mb-3" />
      ))}
    </div>
  }

  const isDirty = KEYS.some((k) => form[k] !== original[k])

  const setField = (key: keyof FormState, value: string) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))

  const onCancel = () => setForm(original)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const changed: Record<string, number> = {}
    KEYS.forEach((k) => {
      if (form[k] !== original[k]) {
        const n = Number(form[k])
        if (Number.isFinite(n)) changed[k] = n
      }
    })
    if (!Object.keys(changed).length) return
    try {
      await bulkMutation.mutateAsync(changed)
      setOriginal(form)
      toast.success('System settings saved')
    } catch (err) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message ?? 'Failed to save system settings'
      toast.error(msg)
    }
  }

  const renderNumberField = (key: keyof FormState) => {
    const row = findRow(rows, key)
    if (!row) return null
    const stored = STORED_ONLY.has(key)
    const hint = stored
      ? `Stored only — runtime wiring pending. ${row.description ?? ''}`.trim()
      : row.description
    return (
      <FieldShell label={row.displayLabel} hint={hint} systemLocked={stored}>
        <input
          type="number"
          min={1}
          className={inputClass}
          value={form[key]}
          onChange={(e) => setField(key, e.target.value)}
        />
      </FieldShell>
    )
  }

  return (
    <SectionFormFrame
      title="System"
      description="Authentication limits and storage caps. Live changes apply on the next request."
      isSaving={bulkMutation.isPending}
      isDirty={isDirty}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Subsection title="Authentication" Icon={IconShieldLock}>
        <div className="grid md:grid-cols-2 gap-4">
          {renderNumberField('max_login_attempts')}
          {renderNumberField('account_lockout_minutes')}
          {renderNumberField('session_timeout_minutes')}
          {renderNumberField('password_min_length')}
        </div>
      </Subsection>

      <Subsection title="Storage" Icon={IconUpload} last>
        <div className="grid md:grid-cols-2 gap-4">
          {renderNumberField('max_attachment_size_kb')}
        </div>
      </Subsection>
    </SectionFormFrame>
  )
}
