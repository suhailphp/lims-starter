/* DOMAIN — Recent activity feed (full-width).
 *
 * Vendor reference: vendor/src/pages/main-module/system-dashboard/index.tsx:488-628
 * (AI Models Performance table). We keep the same card frame +
 * `text-sm w-full` table structure and adapt the rows to a mixed
 * AuditLog + UserActivity feed (same shape served by /api/dashboard
 * recentActivity[]). */
import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { RoleBadge } from '@/features/users/RoleBadge'
import { formatRelativeTime } from '@/features/notifications/notificationIcons'
import type {
  DashboardActivity,
  DashboardActor,
  DashboardAuditActivity,
  DashboardUserActivity,
} from '@/types/dashboard'
import { IconActivity } from '@tabler/icons-react'

interface Props {
  items: DashboardActivity[]
}

function actorName(actor: DashboardActor | null): string {
  if (!actor) return 'System'
  return `${actor.firstName} ${actor.lastName}`.trim() || 'Unknown user'
}

const ENTITY_LABEL: Record<string, string> = {
  customer: 'Customer',
  category: 'Category',
  source: 'Source',
  sourceType: 'Source Type',
  unit: 'Unit',
  test: 'Test',
  method: 'Method',
  specification: 'Specification',
  equipment: 'Equipment',
  ocmElement: 'OCM Element',
  user: 'User',
  attachment: 'Attachment',
}

const ACTION_BADGE: Record<string, string> = {
  CREATE: 'bg-success-50 text-success border border-success',
  UPDATE: 'bg-info-50 text-info border border-info',
  DELETE: 'bg-danger-50 text-danger border border-danger',
  LOGIN: 'bg-primary-50 text-primary border border-primary',
  LOGOUT: 'bg-light text-default border border-border-color',
  LOGIN_FAILED: 'bg-warning-50 text-warning border border-warning',
}

function describeAudit(item: DashboardAuditActivity): string {
  const entity = ENTITY_LABEL[item.entityType] ?? item.entityType
  const verb =
    item.action === 'CREATE'
      ? 'created a'
      : item.action === 'UPDATE'
        ? 'updated a'
        : 'deleted a'
  return `${verb} ${entity}`
}

function describeUserActivity(item: DashboardUserActivity): string {
  switch (item.actionType) {
    case 'LOGIN':
      return 'signed in'
    case 'LOGOUT':
      return 'signed out'
    case 'LOGIN_FAILED':
      return 'failed sign-in attempt'
  }
}

function actionBadgeKey(item: DashboardActivity): string {
  return item.source === 'audit_log' ? item.action : item.actionType
}

export function RecentActivityTable({ items }: Props) {
  return (
    <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px] text-gray-900">
          <IconActivity size={20} className="me-2" />
          Recent Activity
        </h2>
        <Link
          to="/profile"
          className="text-xs font-medium text-primary hover:underline"
        >
          View timeline
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-default text-sm">
          No recent activity yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border-color text-default">
              <tr>
                <th className="text-left font-medium py-2 px-3">User</th>
                <th className="text-left font-medium py-2 px-3">Action</th>
                <th className="text-left font-medium py-2 px-3">What</th>
                <th className="text-right font-medium py-2 px-3">When</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const actor = item.actor
                const name = actorName(actor)
                const badgeKey = actionBadgeKey(item)
                const badgeClass =
                  ACTION_BADGE[badgeKey] ?? 'bg-light text-default border border-border-color'
                const description =
                  item.source === 'audit_log'
                    ? describeAudit(item)
                    : describeUserActivity(item)
                return (
                  <tr
                    key={`${item.source}:${item.id}`}
                    className="border-b border-border-color last:border-b-0 hover:bg-light/40"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar photo={actor?.profilePhoto} name={name} size="sm" />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate mb-0.5">
                            {name}
                          </p>
                          {actor?.role && <RoleBadge role={actor.role} />}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`badge rounded-lg text-xs font-medium ${badgeClass}`}>
                        {badgeKey.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-900">{description}</td>
                    <td className="py-3 px-3 text-right text-default whitespace-nowrap">
                      {formatRelativeTime(item.createdAt)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
