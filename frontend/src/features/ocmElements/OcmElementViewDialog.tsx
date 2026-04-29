/* DOMAIN — OcmElement View modal (read-only). */
import { Dialog } from '@/components/ui/Dialog'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { OcmElement } from '@/types/ocmElement'

interface Props {
  ocmElement: OcmElement | null
  onClose: () => void
  onEdit: (ocmElement: OcmElement) => void
  onDelete: (ocmElement: OcmElement) => void
}

export function OcmElementViewDialog({ ocmElement, onClose, onEdit, onDelete }: Props) {
  const role = useAppSelector((s) => s.auth.user?.role)
  const canDelete = role !== 'CUSTOMER'

  if (!ocmElement) return null

  const title = `${ocmElement.name} (${ocmElement.symbol})`

  return (
    <Dialog
      open={!!ocmElement}
      onOpenChange={(o) => !o && onClose()}
      title={title}
      maxWidth="640px"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
          >
            Close
          </button>
          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(ocmElement)}
              className="btn bg-danger border border-danger text-white hover:bg-danger-700"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(ocmElement)}
            className="btn bg-primary border border-primary text-white hover:bg-primary-800"
          >
            Edit
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Section title="Basic">
          <ViewField label="Name" value={ocmElement.name} />
          <ViewField label="Symbol" value={ocmElement.symbol} mono />
          <ViewField label="Unit" value={ocmElement.unit} />
        </Section>

        <Section title="Range bands">
          <RangeRow
            label="Normal"
            min={ocmElement.normalRangeMin}
            max={ocmElement.normalRangeMax}
            unit={ocmElement.unit}
          />
          <RangeRow
            label="Caution"
            min={ocmElement.cautionRangeMin}
            max={ocmElement.cautionRangeMax}
            unit={ocmElement.unit}
          />
          <RangeRow
            label="Critical"
            min={ocmElement.criticalRangeMin}
            max={ocmElement.criticalRangeMax}
            unit={ocmElement.unit}
          />
        </Section>

        <Section title="Status">
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Status</span>
            <span className="col-span-2">
              {ocmElement.isActive ? (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-default border border-border-color">
                  <span className="bg-gray-400 w-[5px] h-[5px] block rounded-full me-1" />
                  Inactive
                </span>
              )}
            </span>
          </div>
        </Section>

        <Section title="Audit">
          <ViewField label="Created" value={formatDateTime(ocmElement.createdAt)} />
          <ViewField label="Last Updated" value={formatDateTime(ocmElement.updatedAt)} />
        </Section>
      </div>
    </Dialog>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h6 className="text-sm font-semibold text-gray-900 mb-2">{title}</h6>
      <div>{children}</div>
    </div>
  )
}

function ViewField({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string | null | undefined
  mono?: boolean
}) {
  const empty = value == null || value === ''
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5">
      <span className="col-span-1 text-sm text-default">{label}</span>
      <span
        className={`col-span-2 text-sm ${empty ? 'text-gray-400' : 'text-dark'} ${
          mono ? 'font-mono' : ''
        }`}
      >
        {empty ? '—' : value}
      </span>
    </div>
  )
}

function RangeRow({
  label,
  min,
  max,
  unit,
}: {
  label: string
  min: number | string | null | undefined
  max: number | string | null | undefined
  unit: string
}) {
  const a = formatNum(min)
  const b = formatNum(max)
  const display =
    a === '' && b === ''
      ? ''
      : a === ''
        ? `≤ ${b} ${unit}`
        : b === ''
          ? `≥ ${a} ${unit}`
          : `${a} – ${b} ${unit}`
  return <ViewField label={label} value={display} />
}

function formatNum(v: number | string | null | undefined): string {
  if (v == null || v === '') return ''
  const n = typeof v === 'string' ? Number(v) : v
  if (!Number.isFinite(n)) return ''
  return Number(n.toFixed(4)).toString()
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}
