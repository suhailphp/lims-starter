/* DOMAIN — Workflow defaults form.
 *
 * Stores the format strings + numeric defaults that future modules
 * (Sample Intake, Reports, Quotes) will read. Some keys are
 * isEditable=false on the backend (sample_serial_format,
 * report_number_format) — those render with a "System" badge and a
 * disabled input, mirroring the spec. */
import { useEffect, useState } from 'react'
import { IconBadge, IconReceipt } from '@tabler/icons-react'
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
  'sample_serial_prefix',
  'sample_serial_format',
  'report_number_format',
  'default_quote_validity_days',
] as const

type FormState = Record<(typeof KEYS)[number], string>

function rowsToState(rows: Setting[]): FormState {
  const map = new Map(rows.map((r) => [r.settingKey, r.value ?? '']))
  const state = {} as FormState
  KEYS.forEach((k) => { state[k] = map.get(k) ?? '' })
  return state
}

function findRow(rows: Setting[], key: string): Setting | undefined {
  return rows.find((r) => r.settingKey === key)
}

export function WorkflowDefaultsForm() {
  const { data: rows = [], isLoading } = useSettingsByCategory('workflow')
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
    const changed: Record<string, string | number> = {}
    KEYS.forEach((k) => {
      if (form[k] !== original[k]) {
        const row = findRow(rows, k)
        if (!row?.isEditable) return // belt-and-braces; backend rejects too
        if (row.valueType === 'NUMBER') {
          const n = Number(form[k])
          if (Number.isFinite(n)) changed[k] = n
        } else {
          changed[k] = form[k]
        }
      }
    })
    if (!Object.keys(changed).length) return
    try {
      await bulkMutation.mutateAsync(changed)
      setOriginal(form)
      toast.success('Workflow defaults saved')
    } catch (err) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message ?? 'Failed to save workflow defaults'
      toast.error(msg)
    }
  }

  const renderField = (key: keyof FormState) => {
    const row = findRow(rows, key)
    if (!row) return null
    const isLocked = !row.isEditable
    return (
      <FieldShell
        label={row.displayLabel}
        hint={row.description}
        systemLocked={isLocked}
      >
        <input
          type={row.valueType === 'NUMBER' ? 'number' : 'text'}
          className={inputClass}
          value={form[key]}
          onChange={(e) => setField(key, e.target.value)}
          disabled={isLocked}
        />
      </FieldShell>
    )
  }

  return (
    <SectionFormFrame
      title="Workflow Defaults"
      description="Numbering templates and defaults consumed by Sample Intake, Reports, and Quotes."
      isSaving={bulkMutation.isPending}
      isDirty={isDirty}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Subsection title="Sample numbering" Icon={IconBadge}>
        <div className="grid md:grid-cols-2 gap-4">
          {renderField('sample_serial_prefix')}
          {renderField('sample_serial_format')}
        </div>
      </Subsection>

      <Subsection title="Reports & Quotes" Icon={IconReceipt} last>
        <div className="grid md:grid-cols-2 gap-4">
          {renderField('report_number_format')}
          {renderField('default_quote_validity_days')}
        </div>
      </Subsection>
    </SectionFormFrame>
  )
}
