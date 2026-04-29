/* DOMAIN — UserActivity action → icon + ring color tokens.
 *
 * Maps to vendor-aligned tones (`bg-{tone}` + `outline-{tone}-50` ring).
 * Plain hex `outline-indigo-50` is in vendor's color palette and flips
 * automatically with vendor variables in dark mode.
 */
import {
  IconAlertTriangle,
  IconCamera,
  IconKey,
  IconLogin,
  IconLogout,
  IconPencil,
  IconShield,
  type Icon,
} from '@tabler/icons-react'
import type { UserActivityActionType } from '@/types/userActivity'

export interface ActivityIconStyle {
  Icon: Icon
  /** Tailwind utility for the circle bg. */
  bgClass: string
  /** Tailwind utility for the outline ring tint. */
  outlineClass: string
}

const FALLBACK: ActivityIconStyle = {
  Icon: IconPencil,
  bgClass: 'bg-gray-500',
  outlineClass: 'outline-gray-100',
}

const STYLES: Record<UserActivityActionType, ActivityIconStyle> = {
  LOGIN:            { Icon: IconLogin,          bgClass: 'bg-indigo-600', outlineClass: 'outline-indigo-50' },
  LOGIN_FAILED:     { Icon: IconAlertTriangle,  bgClass: 'bg-danger',     outlineClass: 'outline-danger-50' },
  LOGOUT:           { Icon: IconLogout,         bgClass: 'bg-gray-500',   outlineClass: 'outline-gray-100' },
  PROFILE_UPDATED:  { Icon: IconPencil,         bgClass: 'bg-success',    outlineClass: 'outline-success-50' },
  PHOTO_UPDATED:    { Icon: IconCamera,         bgClass: 'bg-success',    outlineClass: 'outline-success-50' },
  PASSWORD_CHANGED: { Icon: IconShield,         bgClass: 'bg-warning',    outlineClass: 'outline-warning-50' },
  PASSWORD_RESET:   { Icon: IconKey,            bgClass: 'bg-warning',    outlineClass: 'outline-warning-50' },
}

export function getActivityIconStyle(actionType: string): ActivityIconStyle {
  return STYLES[actionType as UserActivityActionType] ?? FALLBACK
}
