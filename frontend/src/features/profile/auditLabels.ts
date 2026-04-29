/* DOMAIN — Display helpers for AuditLog timeline items.
 *
 * Translates polymorphic `entityType` strings into human labels and
 * extracts a "name" field from the row's changes diff so the user can
 * tell WHICH customer/test/method the change applied to.
 */
import type { AuditLogTimelineItem } from '@/types/timeline'

const ENTITY_LABELS: Record<string, string> = {
  customer: 'Customer',
  category: 'Category',
  sourceType: 'Source Type',
  source: 'Source',
  equipment: 'Equipment',
  specification: 'Specification',
  unit: 'Unit',
  test: 'Test',
  method: 'Method',
  ocmElement: 'OCM Element',
  user: 'User',
  attachment: 'Attachment',
}

export function getEntityLabel(entityType: string): string {
  return ENTITY_LABELS[entityType] ?? entityType
}

/**
 * Extract a display name from the audit row's changes diff.
 *
 *   CREATE → use changes.after (full row).
 *   DELETE → use changes.before (full row at delete time).
 *   UPDATE → return null (we show changed-field list instead).
 *
 * Tries common name fields in order:
 *   .name | .code | "{firstName} {lastName}" | .fileName | entityID prefix
 */
export function getEntityName(audit: AuditLogTimelineItem): string | null {
  if (audit.action === 'UPDATE') return null

  const source = audit.action === 'CREATE' ? audit.changes.after : audit.changes.before
  if (!source) return audit.entityID.slice(0, 8)

  const name = (source.name as string | undefined)
    ?? (source.code as string | undefined)
    ?? (source.fileName as string | undefined)
    ?? combineName(source.firstName as string | undefined, source.lastName as string | undefined)
    ?? audit.entityID.slice(0, 8)
  return name || audit.entityID.slice(0, 8)
}

function combineName(first?: string, last?: string): string | null {
  if (!first && !last) return null
  return `${first ?? ''} ${last ?? ''}`.trim()
}

/**
 * For UPDATE rows: the list of changed field names. Skips audit-internal
 * fields the user shouldn't see ("updatedBy" is metadata, not a meaningful
 * change from their perspective).
 */
const NOISE_FIELDS = new Set(['updatedBy', 'updatedAt'])

export function getChangedFields(audit: AuditLogTimelineItem): string[] {
  if (audit.action !== 'UPDATE') return []
  const after = audit.changes.after ?? {}
  return Object.keys(after).filter((k) => !NOISE_FIELDS.has(k))
}
