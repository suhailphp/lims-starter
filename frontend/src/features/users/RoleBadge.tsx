/* DOMAIN — color-coded badge per role.
 *   Vendor pill convention: bg-{tone}-50 text-{tone} border border-{tone}.
 */
import type { UserRole } from '@/types/user'

const ROLE_CLASSES: Record<UserRole, string> = {
  ADMIN:        'bg-danger-50 text-danger border border-danger',
  MANAGER:      'bg-primary-50 text-primary border border-primary',
  TECHNICIAN:   'bg-warning-50 text-warning border border-warning',
  RECEPTIONIST: 'bg-light text-default border border-border-color',
  CUSTOMER:     'bg-info-50 text-info border border-info',
}

const ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  TECHNICIAN: 'Technician',
  RECEPTIONIST: 'Receptionist',
  CUSTOMER: 'Customer',
}

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={`inline-flex items-center badge rounded-lg text-xs font-medium ${ROLE_CLASSES[role]}`}
    >
      {ROLE_LABEL[role]}
    </span>
  )
}

export { ROLE_LABEL }
