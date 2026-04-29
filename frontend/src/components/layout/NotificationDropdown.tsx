/* DOMAIN — notification panel rendered under the header bell.
 *
 * Vendor reference: header.tsx:436-700 (.notification-dropdown). Uses
 * vendor's class names verbatim (notification-dropdown, notifi-scroll,
 * divide-y border-border-color etc.) so vendor CSS at style.css:583
 * applies (max-height calc).
 *
 * Shows recent 10 (page=1, limit=10). The /notifications page is the
 * full pagination UI.
 */
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useMyNotifications,
} from '@/features/notifications/queries'
import { NotificationItem } from '@/features/notifications/NotificationItem'
import type { NotificationRecipient } from '@/types/notification'
import { IconBellOff } from '@tabler/icons-react'

export interface NotificationDropdownProps {
  /** Called after the user clicks an item — parent closes the dropdown. */
  onClose: () => void
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const [tab, setTab] = useState<'all' | 'unread'>('all')
  const params = useMemo(
    () => ({
      page: 1,
      limit: 10,
      unreadOnly: tab === 'unread' ? true : undefined,
    }),
    [tab],
  )
  const { data, isLoading } = useMyNotifications(params)
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()

  const items = data?.data ?? []

  const handleItemClick = (recipient: NotificationRecipient) => {
    if (!recipient.isRead) {
      markRead.mutate(recipient.notificationID)
    }
    onClose()
  }

  return (
    /* Vendor classes verbatim — keeps shadow / border / rounded / scroll
     * height (style.css:583) consistent. */
    <div className="absolute right-0 top-full min-w-[26rem] p-5 bg-white border border-border-color shadow rounded-lg mt-2 z-1 notification-dropdown">
      <div className="flex items-center justify-between border-b border-border-color pb-3">
        <h6 className="font-semibold text-gray-900 m-0">Notifications</h6>
        <div
          className="border border-border-color rounded-lg flex items-center gap-1 p-1"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'all'}
            onClick={() => setTab('all')}
            className={`block py-1 px-2 rounded-lg font-medium text-sm transition-colors ${
              tab === 'all'
                ? 'bg-light text-primary'
                : 'text-gray-900 hover:bg-light hover:text-primary'
            }`}
          >
            All
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'unread'}
            onClick={() => setTab('unread')}
            className={`block py-1 px-2 rounded-lg font-medium text-sm transition-colors ${
              tab === 'unread'
                ? 'bg-light text-primary'
                : 'text-gray-900 hover:bg-light hover:text-primary'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Mark-all-read row */}
      <div className="flex items-center justify-end pt-2">
        <button
          type="button"
          onClick={() => markAllRead.mutate()}
          disabled={markAllRead.isPending || items.length === 0}
          className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
        >
          Mark all as read
        </button>
      </div>

      {/* Vendor uses data-simplebar; we don't have simplebar wired. CSS
       * cap from style.css:583 still applies via .notification-dropdown
       * descendant selector — fall back to overflow-auto. */}
      <div className="overflow-auto max-h-[calc(100vh-260px)]">
        <div className="divide-y divide-border-color notifi-scroll pt-1">
          {isLoading && items.length === 0 ? (
            <div className="py-8 text-center text-default text-sm">Loading…</div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center text-default">
              <IconBellOff size={28} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm m-0">
                {tab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            items.map((recipient) => (
              <NotificationItem
                key={recipient.recipientID}
                recipient={recipient}
                compact
                onClick={handleItemClick}
              />
            ))
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-border-color text-center">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-center font-medium hover:text-primary text-gray-900"
        >
          View all notifications
        </Link>
      </div>
    </div>
  )
}
