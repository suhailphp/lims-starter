/* DOMAIN — single timeline row.
 *
 * Discriminated render based on `source`:
 *   - 'user_activity' → existing actionType→icon mapping (LOGIN, PROFILE_UPDATED, etc.)
 *   - 'audit_log'     → action→icon mapping (CREATE/UPDATE/DELETE) + entity-aware label
 *
 * Vendor styling: vendor/src/pages/pages/profile/profile.tsx:280 — relative
 * + before:absolute pseudo-element for the dashed connector. Last item in
 * each date group sets `isLast=true` to suppress the trailing line.
 */
import {
  IconPencil,
  IconPlus,
  IconTrash,
  type Icon,
} from '@tabler/icons-react'
import { getActivityIconStyle } from './activityIcons'
import {
  getChangedFields,
  getEntityLabel,
  getEntityName,
} from './auditLabels'
import type { AuditLogTimelineItem, TimelineItem } from '@/types/timeline'

interface ActivityItemProps {
  activity: TimelineItem
  /** Last item in its date group → omit the connector line. */
  isLast?: boolean
}

interface AuditIconStyle {
  Icon: Icon
  bgClass: string
  outlineClass: string
}

const AUDIT_STYLES: Record<AuditLogTimelineItem['action'], AuditIconStyle> = {
  CREATE: { Icon: IconPlus,    bgClass: 'bg-success', outlineClass: 'outline-success-50' },
  UPDATE: { Icon: IconPencil,  bgClass: 'bg-info',    outlineClass: 'outline-info-50' },
  DELETE: { Icon: IconTrash,   bgClass: 'bg-danger',  outlineClass: 'outline-danger-50' },
}

export function ActivityItem({ activity, isLast = false }: ActivityItemProps) {
  const connectorClass = isLast
    ? ''
    : 'before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color'

  const { Icon, bgClass, outlineClass, label, body } =
    activity.source === 'user_activity'
      ? renderUserActivity(activity)
      : renderAuditLog(activity)

  return (
    <div className={`relative flex items-start gap-4 ${connectorClass}`}>
      <span
        className={`z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-white outline outline-4 ${bgClass} ${outlineClass}`}
        aria-hidden
      >
        <Icon size={16} />
      </span>
      <div className="flex-1 min-w-0 pt-1">
        <p className="mb-1 font-medium text-dark">
          {label}
          <span className="text-default font-normal"> – {formatStamp(activity.createdAt)}</span>
        </p>
        {body && <p className="text-sm text-default break-words">{body}</p>}
      </div>
    </div>
  )
}

interface RenderResult {
  Icon: Icon
  bgClass: string
  outlineClass: string
  label: string
  body: string | null
}

function renderUserActivity(item: Extract<TimelineItem, { source: 'user_activity' }>): RenderResult {
  const { Icon, bgClass, outlineClass } = getActivityIconStyle(item.actionType)
  return {
    Icon,
    bgClass,
    outlineClass,
    label: item.actionLabel,
    body: item.description,
  }
}

function renderAuditLog(item: AuditLogTimelineItem): RenderResult {
  const { Icon, bgClass, outlineClass } = AUDIT_STYLES[item.action]
  const entityLabel = getEntityLabel(item.entityType)
  const entityName = getEntityName(item)

  let label: string
  let body: string | null = null

  if (item.action === 'CREATE') {
    label = entityName
      ? `Created ${entityLabel} "${entityName}"`
      : `Created ${entityLabel}`
  } else if (item.action === 'DELETE') {
    label = entityName
      ? `Deleted ${entityLabel} "${entityName}"`
      : `Deleted ${entityLabel}`
  } else {
    // UPDATE
    label = `Updated ${entityLabel}`
    const fields = getChangedFields(item)
    if (fields.length > 0) body = `Changed: ${fields.join(', ')}`
  }

  return { Icon, bgClass, outlineClass, label, body }
}

function formatStamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}
