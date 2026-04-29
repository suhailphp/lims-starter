/* DOMAIN — Method View modal (read-only). */
import { IconStar } from '@tabler/icons-react'
import { Dialog } from '@/components/ui/Dialog'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { Method } from '@/types/method'

interface Props {
  method: Method | null
  onClose: () => void
  onEdit: (method: Method) => void
  onDelete: (method: Method) => void
}

export function MethodViewDialog({ method, onClose, onEdit, onDelete }: Props) {
  const role = useAppSelector((s) => s.auth.user?.role)
  const canDelete = role !== 'CUSTOMER'

  if (!method) return null

  return (
    <Dialog
      open={!!method}
      onOpenChange={(o) => !o && onClose()}
      title={method.code}
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
              onClick={() => onDelete(method)}
              className="btn bg-danger border border-danger text-white hover:bg-danger-700"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(method)}
            className="btn bg-primary border border-primary text-white hover:bg-primary-800"
          >
            Edit
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Section title="Details">
          <ViewField label="Code" value={method.code} mono />
          <ViewField label="Description" value={method.description ?? null} multiline />
        </Section>

        <Section title="Relationships">
          <ViewField label="Test" value={method.test?.name ?? null} />
          <ViewField label="Category" value={method.test?.category?.name ?? null} />
        </Section>

        <Section title="Status">
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Default</span>
            <span className="col-span-2">
              {method.isDefault ? (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                  <IconStar size={11} className="me-1" />
                  Default for this Test
                </span>
              ) : (
                <span className="text-gray-400 text-sm">—</span>
              )}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Status</span>
            <span className="col-span-2">
              {method.isActive ? (
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
          <ViewField label="Created" value={formatDateTime(method.createdAt)} />
          <ViewField label="Last Updated" value={formatDateTime(method.updatedAt)} />
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
  multiline = false,
}: {
  label: string
  value: string | null | undefined
  mono?: boolean
  multiline?: boolean
}) {
  const empty = value == null || value === ''
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5">
      <span className="col-span-1 text-sm text-default">{label}</span>
      <span
        className={`col-span-2 text-sm ${empty ? 'text-gray-400' : 'text-dark'} ${
          mono ? 'font-mono' : ''
        } ${multiline ? 'whitespace-pre-line' : ''}`}
      >
        {empty ? '—' : value}
      </span>
    </div>
  )
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
