/* DOMAIN — Unified timeline for the Profile page.
 *
 * Server merges UserActivities (auth + profile events) with the user's
 * own AuditLogs (data mutations they performed) into a single feed.
 *
 * Filter chips in the card header:
 *   [All] [Account events] [Data changes]
 *
 * URL-driven via `?filter=all|activities|changes`. Default 'all' renders
 * with no URL param.
 *
 * Vendor reference: vendor/src/pages/pages/profile/profile.tsx:272-417.
 */
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMyTimelineInfinite } from '@/features/userActivities/queries'
import { ActivityItem } from './ActivityItem'
import type { TimelineFilter, TimelineItem } from '@/types/timeline'

// Smaller initial page = Load More is discoverable sooner and the feed
// stays visually balanced against the info card on the left.
const PAGE_SIZE = 10

const FILTER_CHIPS: { label: string; value: TimelineFilter }[] = [
  { label: 'All',            value: 'all' },
  { label: 'Account events', value: 'activities' },
  { label: 'Data changes',   value: 'changes' },
]

function parseFilter(v: string | null): TimelineFilter {
  return v === 'activities' || v === 'changes' ? v : 'all'
}

export function ProfileActivityFeed() {
  const [params, setParams] = useSearchParams()
  const filter = parseFilter(params.get('filter'))

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyTimelineInfinite(filter, PAGE_SIZE)

  // Flatten all loaded pages into one array, then group by date.
  const flatItems = useMemo<TimelineItem[]>(
    () => (data?.pages ?? []).flatMap((p) => p.data),
    [data],
  )
  const groups = useMemo(() => groupByDate(flatItems), [flatItems])
  const total = data?.pages?.[0]?.meta.total ?? 0

  const setFilter = (next: TimelineFilter) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next === 'all') p.delete('filter')
      else p.set('filter', next)
      return p
    })
  }

  return (
    <div className="bg-white w-full border border-border-color rounded-lg p-5 mb-6 shadow flex-1">
      {/* Card header — filter chips replace the previous "X total" text. */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
        <h4 className="text-base font-bold text-dark">Activities</h4>
        <div className="flex flex-wrap gap-1.5">
          {FILTER_CHIPS.map((chip) => {
            const active = filter === chip.value
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => setFilter(chip.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                  active
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-border-color text-default hover:bg-primary-50 hover:text-primary hover:border-primary'
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      </div>

      {isLoading && <p className="text-sm text-default">Loading activities…</p>}

      {isError && (
        <div className="rounded-lg border border-danger bg-danger-50 px-3 py-2 text-sm text-danger-700">
          Failed to load activities.{' '}
          <button
            type="button"
            onClick={() => refetch()}
            className="underline hover:no-underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && groups.length === 0 && (
        <p className="text-sm text-default">No activity yet.</p>
      )}

      <div className="space-y-6">
        {groups.map((group) => (
          <div
            key={group.label}
            className="mb-5 pb-5 border-b border-border-color last:border-b-0 last:pb-0 last:mb-0"
          >
            <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color px-2 py-1">
              {group.label}
            </span>
            <div className="space-y-5 mt-5">
              {group.items.map((item, idx) => (
                <ActivityItem
                  key={`${item.source}-${item.id}`}
                  activity={item}
                  isLast={idx === group.items.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border-color bg-white text-dark hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            {isFetchingNextPage && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {!hasNextPage && flatItems.length > 0 && total > PAGE_SIZE && (
        <p className="text-center text-xs text-default mt-6">
          You've reached the end. {total} {total === 1 ? 'activity' : 'activities'} total.
        </p>
      )}
    </div>
  )
}

interface DateGroup {
  label: string
  items: TimelineItem[]
}

function groupByDate(items: TimelineItem[]): DateGroup[] {
  if (items.length === 0) return []

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const buckets = new Map<string, TimelineItem[]>()
  for (const item of items) {
    const d = new Date(item.createdAt)
    const dDay = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    let label: string
    if (dDay.getTime() === today.getTime()) label = 'Today'
    else if (dDay.getTime() === yesterday.getTime()) label = 'Yesterday'
    else
      label = dDay.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    if (!buckets.has(label)) buckets.set(label, [])
    buckets.get(label)!.push(item)
  }
  return Array.from(buckets.entries()).map(([label, items]) => ({ label, items }))
}
