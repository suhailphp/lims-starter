/* DOMAIN — User View modal (read-only).
 *   Header = full name + role badge.
 *   Body = labeled rows incl. lockout/mustChangePassword/audit fields.
 *   Footer = Close / Delete (admin) / Edit. Self-row hides Delete.
 */
import { Dialog } from '@/components/ui/Dialog'
import { Avatar } from '@/components/ui/Avatar'
import { useAppSelector } from '@/hooks/useAppSelector'
import { RoleBadge } from './RoleBadge'
import type { User } from '@/types/user'

interface Props {
  user: User | null
  onClose: () => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UserViewDialog({ user, onClose, onEdit, onDelete }: Props) {
  const currentUser = useAppSelector((s) => s.auth.user)
  const role = currentUser?.role
  const isAdmin = role === 'ADMIN'
  const isSelf = currentUser?.userID === user?.userID

  if (!user) return null

  const isLocked =
    user.lockedUntil != null && new Date(user.lockedUntil) > new Date()

  return (
    <Dialog
      open={!!user}
      onOpenChange={(o) => !o && onClose()}
      title={
        <span className="inline-flex items-center gap-3">
          <Avatar
            photo={user.profilePhoto ?? null}
            name={`${user.firstName} ${user.lastName}`}
            size="lg"
          />
          <span className="inline-flex items-center gap-3">
            {user.firstName} {user.lastName}
            <RoleBadge role={user.role} />
          </span>
        </span>
      }
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
          {isAdmin && !isSelf && (
            <button
              type="button"
              onClick={() => onDelete(user)}
              className="btn bg-danger border border-danger text-white hover:bg-danger-700"
            >
              Delete
            </button>
          )}
          {isAdmin && !isSelf && (
            <button
              type="button"
              onClick={() => onEdit(user)}
              className="btn bg-primary border border-primary text-white hover:bg-primary-800"
            >
              Edit
            </button>
          )}
        </>
      }
    >
      <div className="flex flex-col gap-5">
        {isLocked && (
          <div className="rounded-lg border border-danger bg-danger-50 px-3 py-2 text-sm text-danger-700">
            <strong>Account locked.</strong> Locked until{' '}
            {formatDateTime(user.lockedUntil!)} after{' '}
            {user.failedLoginAttempts} failed sign-in attempts.
          </div>
        )}
        {user.mustChangePassword && (
          <div className="rounded-lg border border-warning bg-warning-50 px-3 py-2 text-sm text-warning-700">
            User must change their password on next sign-in.
          </div>
        )}

        <Section title="Identity">
          <ViewField label="Email" value={user.email} />
          <ViewField label="Role" value={user.role} />
          <ViewField
            label="Customer"
            value={user.customer?.name ?? null}
          />
        </Section>

        <Section title="Status">
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Status</span>
            <span className="col-span-2">
              {user.isActive ? (
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

        <Section title="Sign-in">
          <ViewField
            label="Last login"
            value={user.lastLoginAt ? formatDateTime(user.lastLoginAt) : 'Never'}
          />
          <ViewField
            label="Password changed"
            value={
              user.passwordChangedAt
                ? formatDateTime(user.passwordChangedAt)
                : null
            }
          />
          <ViewField
            label="Failed attempts"
            value={
              user.failedLoginAttempts > 0
                ? String(user.failedLoginAttempts)
                : '0'
            }
          />
        </Section>

        <Section title="Audit">
          <ViewField label="Created" value={formatDateTime(user.createdAt)} />
          <ViewField
            label="Last Updated"
            value={formatDateTime(user.updatedAt)}
          />
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
}: {
  label: string
  value: string | null | undefined
}) {
  const empty = value == null || value === ''
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5">
      <span className="col-span-1 text-sm text-default">{label}</span>
      <span
        className={`col-span-2 text-sm ${
          empty ? 'text-gray-400' : 'text-dark'
        }`}
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
