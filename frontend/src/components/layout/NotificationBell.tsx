/* DOMAIN — header bell button + count badge + dropdown coordinator.
 *
 * Vendor reference: header.tsx:422-435. Vendor shows a static red dot;
 * we layer a numeric pill (1-99, then "99+") on top — Q3 confirmed.
 */
import { useEffect, useRef, useState } from 'react'
import { IconBell } from '@tabler/icons-react'
import { useUnreadCount } from '@/features/notifications/queries'
import { NotificationDropdown } from './NotificationDropdown'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Click-away to close — same pattern as the profile dropdown in Header.tsx.
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const { data } = useUnreadCount()
  const rawCount = data?.count ?? 0
  const count = Math.max(0, rawCount)
  const display = count > 99 ? '99+' : String(count)
  const hasUnread = count > 0

  return (
    <div className="relative header-item header-notifi" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="topbar-link relative items-center justify-center"
        aria-label={
          hasUnread ? `Notifications (${count} unread)` : 'Notifications'
        }
        aria-expanded={open}
        aria-haspopup="true"
        title="Notifications"
      >
        <IconBell size={18} />
        {hasUnread && (
          <span
            className="absolute -top-1 -end-1 min-w-4 h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center leading-none"
            aria-hidden
          >
            {display}
          </span>
        )}
      </button>

      {open && <NotificationDropdown onClose={() => setOpen(false)} />}
    </div>
  )
}
