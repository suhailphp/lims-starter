/* DOMAIN — Localization form (timezone / formats).
 *
 * Currency is no longer edited here — it's master data. Base currency is
 * displayed read-only with a "Manage in Currencies →" link.
 * See /CLAUDE.md "Currency Rule" + Tenant Branding Rule.
 */
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCurrencyDollar, IconWorld } from '@tabler/icons-react'
import { toast } from '@/lib/toast'
import { EnumSelect } from '@/components/ui/EnumSelect'
import { FKSelect } from '@/components/ui/FKSelect'
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
import { getTimezoneOptions } from './timezoneOptions'
import {
  DATE_FORMAT_OPTIONS,
  TIME_FORMAT_OPTIONS,
} from './dateFormatOptions'
import type { Setting } from '@/types/settings'

const KEYS = [
  'timezone',
  'date_format',
  'time_format',
  'decimal_separator',
  'thousand_separator',
] as const

type FormState = Record<(typeof KEYS)[number], string>

function rowsToState(rows: Setting[]): FormState {
  const map = new Map(rows.map((r) => [r.settingKey, r.value ?? '']))
  const state = {} as FormState
  KEYS.forEach((k) => { state[k] = map.get(k) ?? '' })
  return state
}

export function LocalizationForm() {
  const { data: rows = [], isLoading } = useSettingsByCategory('localization')
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

  const tzOptions = useMemo(() => getTimezoneOptions(), [])

  // base_currency_code is a read-only setting managed by the Currency module.
  const baseCurrencyCode =
    rows.find((r) => r.settingKey === 'base_currency_code')?.value ?? '—'

  if (isLoading || !form || !original) {
    return <div className="bg-white shadow rounded-md p-5 border border-border-color">
      <div className="h-6 w-40 bg-light/70 rounded animate-pulse mb-5" />
      {Array.from({ length: 5 }).map((_, i) => (
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
    const changed: Record<string, string> = {}
    KEYS.forEach((k) => { if (form[k] !== original[k]) changed[k] = form[k] })
    if (!Object.keys(changed).length) return
    try {
      await bulkMutation.mutateAsync(changed)
      setOriginal(form)
      toast.success('Localization saved')
    } catch (err) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message ?? 'Failed to save localization'
      toast.error(msg)
    }
  }

  return (
    <SectionFormFrame
      title="Localization"
      description="Timezone, number, and date formats applied across the app. Currency is managed in the Currencies master data."
      isSaving={bulkMutation.isPending}
      isDirty={isDirty}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Subsection title="Currency" Icon={IconCurrencyDollar}>
        <div className="grid md:grid-cols-2 gap-4 items-end">
          <FieldShell
            label="Base Currency"
            hint="Set in Currencies → Set as Base. Cannot be edited here."
          >
            <input
              type="text"
              className={`${inputClass} font-mono opacity-60`}
              value={baseCurrencyCode}
              disabled
              readOnly
            />
          </FieldShell>
          <div className="pb-1">
            <Link
              to="/currencies"
              className="text-sm font-medium text-primary hover:underline"
            >
              Manage Currencies →
            </Link>
          </div>
        </div>
      </Subsection>

      <Subsection title="Region" Icon={IconWorld}>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldShell label="Timezone" hint="Searchable; defaults from IANA.">
            <FKSelect
              options={tzOptions}
              value={form.timezone}
              onChange={(v) => v && setField('timezone', v)}
            />
          </FieldShell>
          <FieldShell label="Date Format">
            <EnumSelect
              options={DATE_FORMAT_OPTIONS}
              value={form.date_format}
              onChange={(v) => v && setField('date_format', v)}
            />
          </FieldShell>
          <FieldShell label="Time Format">
            <EnumSelect
              options={TIME_FORMAT_OPTIONS}
              value={form.time_format}
              onChange={(v) => v && setField('time_format', v)}
            />
          </FieldShell>
        </div>
      </Subsection>

      <Subsection title="Number formatting" last>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldShell label="Decimal Separator">
            <input
              type="text"
              className={inputClass}
              maxLength={1}
              value={form.decimal_separator}
              onChange={(e) => setField('decimal_separator', e.target.value)}
            />
          </FieldShell>
          <FieldShell label="Thousand Separator">
            <input
              type="text"
              className={inputClass}
              maxLength={1}
              value={form.thousand_separator}
              onChange={(e) => setField('thousand_separator', e.target.value)}
            />
          </FieldShell>
        </div>
      </Subsection>
    </SectionFormFrame>
  )
}
