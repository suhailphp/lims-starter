/* DOMAIN — single notification row.
 *
 * Vendor reference: header.tsx:467-491 (.notification-item).
 *
 * Shape:
 *   [type-color circle w/ corner glyph]  [title (bold) + message + relative time] [unread dot]
 *
 * Behavior contract (parent decides):
 *   onClick → mark read + (optionally) navigate. We don't navigate from
 *   here so the parent can close the dropdown / page after marking.
 */
import { Link } from 'react-router-dom'
import type { NotificationRecipient } from '@/types/notification'
import {
  accentBarClassForPriority,
  formatRelativeTime,
  visualForType,
} from './notificationIcons'
import { IconTrash } from '@tabler/icons-react'

export interface NotificationItemProps {
  recipient: NotificationRecipient
  /** When true, render compact rows for the dropdown. Page mode shows more. */
  compact?: boolean
  onClick?: (recipient: NotificationRecipient) => void
  onDelete?: (notificationID: string) => void
}

export function NotificationItem({
  recipient,
  compact = false,
  onClick,
  onDelete,
}: NotificationItemProps) {
  const n = recipient.notification
  const visual = visualForType(n.type)
  const accentBar = accentBarClassForPriority(n.priority)
  const link = n.link
  const Icon = visual.Icon

  const inner = (
    <div
      className={`notification-item relative flex py-3 ps-3 pe-7 cursor-pointer ${recipient.isRead ? 'opacity-75' : ''}`}
    >
      {/* Priority accent bar — HIGH/CRITICAL only. Bolder for CRITICAL. */}
      {accentBar && (
        <span
          aria-hidden
          className={`absolute start-0 top-2 bottom-2 w-1 rounded-full ${accentBar}`}
        />
      )}

      {/* Type icon — vendor-style size-10 round w/ tinted background */}
      <div className="relative size-10 shrink-0 me-3 flex items-center justify-center">
        <div
          className={`size-10 rounded-full flex items-center justify-center ${visual.bgClass} ${visual.textClass}`}
          aria-label={visual.label}
        >
          <Icon size={20} stroke={2} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="mb-0.5 truncate">
          <span className="text-gray-900 font-medium">{n.title}</span>
        </p>
        <p
          className={`text-default text-[13px] mb-0 ${compact ? 'truncate' : ''}`}
          title={n.message}
        >
          {n.message}
        </p>
        <p className="text-[12px] text-default mt-1 mb-0">
          {formatRelativeTime(recipient.createdAt)}
          {n.priority === 'CRITICAL' && (
            <span className="ml-2 inline-block rounded-full bg-danger-50 px-1.5 py-0.5 text-[10px] font-semibold text-danger uppercase">
              Critical
            </span>
          )}
          {n.priority === 'HIGH' && (
            <span className="ml-2 inline-block rounded-full bg-warning-50 px-1.5 py-0.5 text-[10px] font-semibold text-warning uppercase">
              High
            </span>
          )}
        </p>
      </div>

      {/* Unread dot — vendor: size-1.5 rounded-full bg-danger absolute end-3 top-5 */}
      {!recipient.isRead && (
        <span
          className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
          aria-label="Unread"
        />
      )}

      {/* Delete button — only on the page view, not the dropdown */}
      {!compact && onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete(n.notificationID)
          }}
          className="absolute end-2 bottom-2 text-default hover:text-danger p-1 rounded"
          aria-label="Delete notification"
          title="Delete"
        >
          <IconTrash size={14} />
        </button>
      )}
    </div>
  )

  // Wrap in Link only if there's a destination — otherwise plain div with
  // onClick. Click handler runs in both branches (parent marks read).
  if (link) {
    return (
      <Link
        to={link}
        onClick={() => onClick?.(recipient)}
        className="block hover:bg-light/50 transition-colors"
      >
        {inner}
      </Link>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(recipient)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(recipient)
        }
      }}
      className="hover:bg-light/50 transition-colors"
    >
      {inner}
    </div>
  )
}
