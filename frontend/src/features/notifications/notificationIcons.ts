/* DOMAIN — type → icon component + color token mapping for notifications.
 *
 * Tokens use vendor's CSS variables (info / success / warning / danger)
 * so dark mode flips automatically. Tabler icons keep us off the
 * Phosphor font dependency (vendor's CSS, not in our bundle). */
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  type Icon as TablerIcon,
} from '@tabler/icons-react'
import type { NotificationPriority, NotificationType } from '@/types/notification'

export interface NotificationVisual {
  Icon: TablerIcon
  /** Tailwind utility for the icon color. Vendor tokens flip on dark mode. */
  textClass: string
  /** Tinted background for the icon circle. */
  bgClass: string
  /** Text label for screen readers. */
  label: string
}

export function visualForType(type: NotificationType): NotificationVisual {
  switch (type) {
    case 'SUCCESS':
      return {
        Icon: IconCircleCheck,
        textClass: 'text-success',
        bgClass: 'bg-success-50',
        label: 'Success',
      }
    case 'WARNING':
      return {
        Icon: IconAlertTriangle,
        textClass: 'text-warning',
        bgClass: 'bg-warning-50',
        label: 'Warning',
      }
    case 'ERROR':
      return {
        Icon: IconAlertOctagon,
        textClass: 'text-danger',
        bgClass: 'bg-danger-50',
        label: 'Error',
      }
    case 'INFO':
    default:
      return {
        Icon: IconInfoCircle,
        textClass: 'text-info',
        bgClass: 'bg-info-50',
        label: 'Info',
      }
  }
}

/** HIGH/CRITICAL get a left accent bar; LOW/MEDIUM get none. */
export function accentBarClassForPriority(
  priority: NotificationPriority,
): string | null {
  if (priority === 'CRITICAL') return 'bg-danger'
  if (priority === 'HIGH') return 'bg-warning'
  return null
}

/** "Just now" / "5m ago" / "Apr 12, 2026" — same shape as UserTable. */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
