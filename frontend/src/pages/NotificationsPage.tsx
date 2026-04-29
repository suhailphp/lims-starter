/* DOMAIN — full notifications list page.
 *
 * URL-driven state mirrors the master-data pattern (CustomersPage etc.):
 * page, limit, readState, type, priority. FilterMenu commits in batch.
 *
 * Reuses NotificationItem in non-compact mode so each row exposes the
 * delete button.
 */
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { IconBell, IconBellOff, IconCheck } from '@tabler/icons-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { NotificationItem } from '@/features/notifications/NotificationItem'
import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useMyNotifications,
} from '@/features/notifications/queries'
import type {
  NotificationListParams,
  NotificationPriority,
  NotificationRecipient,
  NotificationType,
} from '@/types/notification'
import { toast } from '@/lib/toast'

const DEFAULT_LIMIT = 20

const READ_STATE_OPTIONS = [
  { label: 'All',    value: undefined },
  { label: 'Unread', value: 'unread' },
  { label: 'Read',   value: 'read' },
]

const TYPE_OPTIONS = [
  { label: 'All',     value: undefined },
  { label: 'Info',    value: 'INFO' },
  { label: 'Success', value: 'SUCCESS' },
  { label: 'Warning', value: 'WARNING' },
  { label: 'Error',   value: 'ERROR' },
]

const PRIORITY_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Low',      value: 'LOW' },
  { label: 'Medium',   value: 'MEDIUM' },
  { label: 'High',     value: 'HIGH' },
  { label: 'Critical', value: 'CRITICAL' },
]

function parseInt1(v: string | null, fallback: number): number {
  const n = v == null ? NaN : Number(v)
  return Number.isInteger(n) && n >= 1 ? n : fallback
}
function parseReadState(v: string | null): 'unread' | 'read' | undefined {
  if (v === 'unread' || v === 'read') return v
  return undefined
}
function parseType(v: string | null): NotificationType | undefined {
  if (v === 'INFO' || v === 'SUCCESS' || v === 'WARNING' || v === 'ERROR') return v
  return undefined
}
function parsePriority(v: string | null): NotificationPriority | undefined {
  if (v === 'LOW' || v === 'MEDIUM' || v === 'HIGH' || v === 'CRITICAL') return v
  return undefined
}

export function NotificationsPage() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const readState = parseReadState(params.get('readState'))
  const typeFilter = parseType(params.get('type'))
  const priorityFilter = parsePriority(params.get('priority'))

  // The backend supports unreadOnly only — for read-only filtering we
  // post-filter on the client. Read filter is uncommon enough that this
  // stays simple.
  const queryParams = useMemo<NotificationListParams>(
    () => ({
      page,
      limit,
      unreadOnly: readState === 'unread' ? true : undefined,
      type: typeFilter,
      priority: priorityFilter,
    }),
    [page, limit, readState, typeFilter, priorityFilter],
  )

  const { data, isLoading, isFetching } = useMyNotifications(queryParams)
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const deleteNotification = useDeleteNotification()

  const rawRows = data?.data ?? []
  const rows = readState === 'read' ? rawRows.filter((r) => r.isRead) : rawRows
  const total = data?.meta.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  const filterValues: FilterValues = {
    readState,
    type: typeFilter,
    priority: priorityFilter,
  }

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      const set = (k: string, v: string | undefined) => {
        if (v === undefined || v === '') p.delete(k)
        else p.set(k, v)
      }
      set('readState', next.readState)
      set('type', next.type)
      set('priority', next.priority)
      p.set('page', '1')
      return p
    })
  }

  const handleItemClick = (recipient: NotificationRecipient) => {
    if (!recipient.isRead) {
      markRead.mutate(recipient.notificationID)
    }
    if (recipient.notification.link) {
      navigate(recipient.notification.link)
    }
  }

  const handleDelete = (notificationID: string) => {
    deleteNotification.mutate(notificationID, {
      onSuccess: () => toast.success('Notification removed'),
      onError: () => toast.error('Failed to remove notification'),
    })
  }

  const handleMarkAll = () => {
    markAllRead.mutate(undefined, {
      onSuccess: (res) => {
        if (res.updated > 0) {
          toast.success(`Marked ${res.updated} notification${res.updated === 1 ? '' : 's'} as read`)
        }
      },
    })
  }

  const handlePage = (next: number) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      p.set('page', String(next))
      return p
    })
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Notifications' },
        ]}
        actions={
          <button
            type="button"
            onClick={handleMarkAll}
            disabled={markAllRead.isPending}
            className="btn bg-white border border-border-color text-gray-900 hover:bg-primary hover:border-primary hover:text-white inline-flex items-center gap-x-2 disabled:opacity-50"
          >
            <IconCheck size={16} /> Mark all as read
          </button>
        }
      />

      <div className="bg-white rounded-md border border-border-color">
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border-color">
          <div className="flex items-center gap-2 text-gray-900">
            <IconBell size={18} className="text-primary" />
            <h6 className="m-0">All notifications</h6>
            {isFetching && (
              <span
                className="ml-2 inline-block size-1.5 rounded-full bg-primary animate-pulse"
                aria-label="Refreshing"
              />
            )}
          </div>
          <FilterMenu
            filters={[
              { type: 'chips', label: 'Status', key: 'readState', options: READ_STATE_OPTIONS },
              { type: 'chips', label: 'Type', key: 'type', options: TYPE_OPTIONS },
              { type: 'chips', label: 'Priority', key: 'priority', options: PRIORITY_OPTIONS },
            ]}
            values={filterValues}
            onApply={applyFilters}
          />
        </div>

        <div className="divide-y divide-border-color">
          {isLoading ? (
            <div className="py-12 text-center text-default text-sm">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center text-default">
              <IconBellOff size={36} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm m-0">No notifications match these filters.</p>
            </div>
          ) : (
            rows.map((recipient) => (
              <div key={recipient.recipientID} className="px-5">
                <NotificationItem
                  recipient={recipient}
                  onClick={handleItemClick}
                  onDelete={handleDelete}
                />
              </div>
            ))
          )}
        </div>

        {total > limit && (
          <div className="flex items-center justify-between gap-2 px-5 py-3 border-t border-border-color text-sm text-default">
            <span>
              Page {page} of {totalPages} • {total} total
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePage(page - 1)}
                disabled={page <= 1 || isFetching}
                className="btn h-8 px-3 bg-white border border-border-color rounded-md text-gray-900 disabled:opacity-50 hover:bg-light"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => handlePage(page + 1)}
                disabled={page >= totalPages || isFetching}
                className="btn h-8 px-3 bg-white border border-border-color rounded-md text-gray-900 disabled:opacity-50 hover:bg-light"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
