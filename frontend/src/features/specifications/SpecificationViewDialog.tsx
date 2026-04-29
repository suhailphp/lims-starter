/* DOMAIN — Specification View modal (read-only). */
import { Dialog } from '@/components/ui/Dialog'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { Specification } from '@/types/specification'

interface Props {
  specification: Specification | null
  onClose: () => void
  onEdit: (specification: Specification) => void
  onDelete: (specification: Specification) => void
}

export function SpecificationViewDialog({ specification, onClose, onEdit, onDelete }: Props) {
  const role = useAppSelector((s) => s.auth.user?.role)
  const canDelete = role !== 'CUSTOMER'

  if (!specification) return null

  return (
    <Dialog
      open={!!specification}
      onOpenChange={(o) => !o && onClose()}
      title={specification.name}
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
              onClick={() => onDelete(specification)}
              className="btn bg-danger border border-danger text-white hover:bg-danger-700"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(specification)}
            className="btn bg-primary border border-primary text-white hover:bg-primary-800"
          >
            Edit
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Section title="Details">
          <ViewField label="Name" value={specification.name} />
        </Section>

        <Section title="Status">
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Status</span>
            <span className="col-span-2">
              {specification.isActive ? (
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
          <ViewField label="Created" value={formatDateTime(specification.createdAt)} />
          <ViewField label="Last Updated" value={formatDateTime(specification.updatedAt)} />
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
}: {
  label: string
  value: string | null | undefined
}) {
  const empty = value == null || value === ''
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5">
      <span className="col-span-1 text-sm text-default">{label}</span>
      <span className={`col-span-2 text-sm ${empty ? 'text-gray-400' : 'text-dark'}`}>
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
