/* REUSABLE — Image-or-initials circle.
 *
 * Renders the user's profile photo when present, falls back to a colored
 * circle showing first-letter initials. Sized via the `size` prop so the
 * same component works in tables (sm), modals (md), view dialogs (lg).
 */
import type { Attachment } from '@/types/attachment'

const SIZE_CLASS = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-[120px] h-[120px] text-2xl',
} as const

interface AvatarProps {
  /** The attachment row (with `dataUrl`) — pass null if no photo. */
  photo?: Attachment | null
  /**
   * Source for initials fallback. We extract the first letter of each non-empty
   * word and uppercase. e.g. "Alice Smith" → "AS"; "alice" → "A".
   */
  name: string
  size?: keyof typeof SIZE_CLASS
  /** Optional extra classes (margins, etc.). */
  className?: string
}

export function Avatar({ photo, name, size = 'sm', className = '' }: AvatarProps) {
  const dimensions = SIZE_CLASS[size]
  const initials = computeInitials(name)
  const src = photo?.dataUrl ?? null

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full overflow-hidden border border-border-color shrink-0 ${dimensions} ${className}`}
      aria-label={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <span className="w-full h-full inline-flex items-center justify-center bg-primary-50 text-primary font-semibold uppercase">
          {initials || '?'}
        </span>
      )}
    </span>
  )
}

function computeInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return ''
  const words = trimmed.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0]!.charAt(0).toUpperCase()
  return (words[0]!.charAt(0) + words[words.length - 1]!.charAt(0)).toUpperCase()
}
