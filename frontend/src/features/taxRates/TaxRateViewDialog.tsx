/* DOMAIN — Tax Rate View modal (read-only). */
import { Dialog } from '@/components/ui/Dialog'
import { IconStar } from '@tabler/icons-react'
import type { TaxRate } from '@/types/taxRate'

interface Props {
  taxRate: TaxRate | null
  onClose: () => void
  onEdit: (row: TaxRate) => void
  onDelete: (row: TaxRate) => void
  onSetDefault: (row: TaxRate) => void
}

export function TaxRateViewDialog({
  taxRate,
  onClose,
  onEdit,
  onDelete,
  onSetDefault,
}: Props) {
  if (!taxRate) return null

  return (
    <Dialog
      open={!!taxRate}
      onOpenChange={(o) => !o && onClose()}
      title={`${taxRate.code} — ${taxRate.name}`}
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
          {!taxRate.isDefault && (
            <button
              type="button"
              onClick={() => onDelete(taxRate)}
              className="btn bg-danger border border-danger text-white hover:bg-danger-700"
            >
              Delete
            </button>
          )}
          {!taxRate.isDefault && taxRate.isActive && (
            <button
              type="button"
              onClick={() => onSetDefault(taxRate)}
              className="btn bg-white border border-border-color text-dark hover:bg-light"
            >
              <IconStar size={14} className="me-1" />
              Set as Default
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(taxRate)}
            className="btn bg-primary border border-primary text-white hover:bg-primary-800"
          >
            Edit
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Section title="Details">
          <ViewField label="Code" value={taxRate.code} mono />
          <ViewField label="Name" value={taxRate.name} />
          <ViewField label="Rate" value={`${trimTrailingZeros(taxRate.rate)}%`} mono />
          <ViewField label="Type" value={taxRate.type} />
          <ViewField label="Display Order" value={String(taxRate.displayOrder)} />
          <ViewField label="Description" value={taxRate.description ?? '—'} />
        </Section>

        <Section title="Status">
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Status</span>
            <span className="col-span-2 flex items-center gap-2">
              {taxRate.isActive ? (
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
              {taxRate.isDefault && (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                  <IconStar size={10} className="me-1" />
                  Default
                </span>
              )}
            </span>
          </div>
        </Section>

        <Section title="Audit">
          <ViewField label="Created" value={formatDateTime(taxRate.createdAt)} />
          <ViewField label="Last Updated" value={formatDateTime(taxRate.updatedAt)} />
        </Section>
      </div>
    </Dialog>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
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
  mono,
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
        className={`col-span-2 text-sm ${empty ? 'text-gray-400' : 'text-dark'} ${mono ? 'font-mono' : ''}`}
      >
        {empty ? '—' : value}
      </span>
    </div>
  )
}

function trimTrailingZeros(s: string): string {
  if (!s.includes('.')) return s
  return s.replace(/\.?0+$/, '')
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
