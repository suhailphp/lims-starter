/* DOMAIN — Lab Information form (tenant category). */
import { useEffect, useState } from 'react'
import {
  IconBuildingStore,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react'
import { toast } from '@/lib/toast'
import { AttachmentUpload } from '@/components/ui/AttachmentUpload'
import {
  useBulkUpdateSettings,
  useSettingsByCategory,
  useUploadLabLogo,
} from '@/features/settings/queries'
import {
  FieldShell,
  SectionFormFrame,
  Subsection,
  inputClass,
} from './SectionFormFrame'
import type { Setting } from '@/types/settings'
import type { Attachment } from '@/types/attachment'

const KEYS = [
  'lab_name',
  'lab_short_name',
  'lab_license_number',
  'lab_tax_number',
  'lab_address',
  'lab_city',
  'lab_country',
  'lab_phone',
  'lab_email',
  'lab_website',
] as const

type FormState = Record<(typeof KEYS)[number], string>

function rowsToState(rows: Setting[]): FormState {
  const map = new Map(rows.map((r) => [r.settingKey, r.value ?? '']))
  const state = {} as FormState
  KEYS.forEach((k) => {
    state[k] = map.get(k) ?? ''
  })
  return state
}

function findRow(rows: Setting[], key: string): Setting | undefined {
  return rows.find((r) => r.settingKey === key)
}

interface Props {
  /** Optional: existing logo attachment (already fetched by parent). */
  logoAttachment?: Attachment | null
  /** Re-fetch logo after upload so the live preview updates. */
  onLogoUploaded?: () => void
}

export function LabInformationForm({ logoAttachment, onLogoUploaded }: Props) {
  const { data: rows = [], isLoading } = useSettingsByCategory('tenant')
  const bulkMutation = useBulkUpdateSettings()
  const uploadMutation = useUploadLabLogo()

  const [form, setForm] = useState<FormState | null>(null)
  const [original, setOriginal] = useState<FormState | null>(null)
  const [pendingLogo, setPendingLogo] = useState<File | null>(null)

  useEffect(() => {
    if (rows.length && !form) {
      const init = rowsToState(rows)
      setForm(init)
      setOriginal(init)
    }
  }, [rows, form])

  if (isLoading || !form || !original) {
    return <FormSkeleton />
  }

  const isDirty =
    pendingLogo !== null ||
    KEYS.some((k) => form[k] !== original[k])

  const setField = (key: keyof FormState, value: string) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))

  const onCancel = () => {
    setForm(original)
    setPendingLogo(null)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (pendingLogo) {
        await uploadMutation.mutateAsync(pendingLogo)
        setPendingLogo(null)
        onLogoUploaded?.()
      }
      const changed: Record<string, string> = {}
      KEYS.forEach((k) => {
        if (form[k] !== original[k]) changed[k] = form[k]
      })
      if (Object.keys(changed).length) {
        await bulkMutation.mutateAsync(changed)
      }
      setOriginal(form)
      toast.success('Lab information saved')
    } catch (err) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message ?? 'Failed to save lab information'
      toast.error(msg)
    }
  }

  const isSaving = bulkMutation.isPending || uploadMutation.isPending

  const labName = findRow(rows, 'lab_name')

  return (
    <SectionFormFrame
      title="Lab Information"
      description="Identity used in the header, login page, reports, and invoices."
      isSaving={isSaving}
      isDirty={isDirty}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Subsection title="Identity" Icon={IconBuildingStore}>
        <div className="mb-4">
          <FieldShell
            label="Lab Logo"
            hint="Replaces the placeholder logo on the header and login page. JPG / PNG / WebP."
          >
            <AttachmentUpload
              existing={logoAttachment ?? null}
              pendingFile={pendingLogo}
              onSelect={setPendingLogo}
              onRemove={() => setPendingLogo(null)}
              name={labName?.value ?? 'Lab'}
              disabled={isSaving}
            />
          </FieldShell>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FieldShell
            label="Lab Name"
            hint={findRow(rows, 'lab_name')?.description}
          >
            <input
              type="text"
              className={inputClass}
              value={form.lab_name}
              onChange={(e) => setField('lab_name', e.target.value)}
              required
            />
          </FieldShell>
          <FieldShell
            label="Short Name"
            hint={findRow(rows, 'lab_short_name')?.description}
          >
            <input
              type="text"
              className={inputClass}
              value={form.lab_short_name}
              onChange={(e) => setField('lab_short_name', e.target.value)}
            />
          </FieldShell>
          <FieldShell
            label="License Number"
            hint={findRow(rows, 'lab_license_number')?.description}
          >
            <input
              type="text"
              className={inputClass}
              value={form.lab_license_number}
              onChange={(e) => setField('lab_license_number', e.target.value)}
            />
          </FieldShell>
          <FieldShell
            label="Tax Number"
            hint={findRow(rows, 'lab_tax_number')?.description}
          >
            <input
              type="text"
              className={inputClass}
              value={form.lab_tax_number}
              onChange={(e) => setField('lab_tax_number', e.target.value)}
            />
          </FieldShell>
        </div>
      </Subsection>

      <Subsection title="Address" Icon={IconMapPin}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FieldShell label="Address Line">
              <input
                type="text"
                className={inputClass}
                value={form.lab_address}
                onChange={(e) => setField('lab_address', e.target.value)}
              />
            </FieldShell>
          </div>
          <FieldShell label="City">
            <input
              type="text"
              className={inputClass}
              value={form.lab_city}
              onChange={(e) => setField('lab_city', e.target.value)}
            />
          </FieldShell>
          <FieldShell label="Country">
            <input
              type="text"
              className={inputClass}
              value={form.lab_country}
              onChange={(e) => setField('lab_country', e.target.value)}
            />
          </FieldShell>
        </div>
      </Subsection>

      <Subsection title="Contact" Icon={IconPhone} last>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldShell label="Phone">
            <input
              type="tel"
              className={inputClass}
              value={form.lab_phone}
              onChange={(e) => setField('lab_phone', e.target.value)}
            />
          </FieldShell>
          <FieldShell label="Email">
            <input
              type="email"
              className={inputClass}
              value={form.lab_email}
              onChange={(e) => setField('lab_email', e.target.value)}
            />
          </FieldShell>
          <div className="md:col-span-2">
            <FieldShell
              label="Website"
              hint={findRow(rows, 'lab_website')?.description}
            >
              <input
                type="url"
                className={inputClass}
                value={form.lab_website}
                onChange={(e) => setField('lab_website', e.target.value)}
                placeholder="https://"
              />
            </FieldShell>
          </div>
        </div>
      </Subsection>
    </SectionFormFrame>
  )
}

function FormSkeleton() {
  return (
    <div className="bg-white shadow rounded-md p-5 border border-border-color">
      <div className="h-6 w-40 bg-light/70 rounded animate-pulse mb-5" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 bg-light/70 rounded animate-pulse mb-3" />
      ))}
    </div>
  )
}
