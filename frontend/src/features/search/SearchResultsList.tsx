/* DOMAIN — Grouped (all) or flat (single category) results list.
 *
 * "All" mode emits one section per non-empty bucket, capped at 5 per
 * bucket server-side, with a "View all <category> results" link that
 * flips the active category for the fuller list. */
import type { MouseEvent } from 'react'
import {
  isAllResponse,
  type SearchBucket,
  type SearchCategory,
  type SearchEntityType,
  type SearchResponse,
} from '@/types/search'
import { SearchResultCard } from './SearchResultCard'
import { SEARCH_TYPE_META } from './searchIcons'

interface SearchResultsListProps {
  data: SearchResponse
  highlight: string
  onSwitchCategory: (cat: SearchCategory) => void
}

export function SearchResultsList({
  data,
  highlight,
  onSwitchCategory,
}: SearchResultsListProps) {
  if (isAllResponse(data)) {
    const buckets = Object.entries(data.resultsByCategory) as Array<
      [SearchEntityType, SearchBucket]
    >
    return (
      <div className="bg-white p-5 rounded-lg border border-border-color">
        {buckets.map(([cat, bucket], idx) => {
          const meta = SEARCH_TYPE_META[cat]
          const isLast = idx === buckets.length - 1
          const seeAll = bucket.count > bucket.results.length
          const handleSeeAll = (e: MouseEvent) => {
            e.preventDefault()
            onSwitchCategory(cat)
          }
          return (
            <div
              key={cat}
              className={isLast ? '' : 'border-b border-border-color pb-5 mb-5'}
            >
              <div className="flex items-center justify-between mb-4">
                <h6 className="text-dark mb-0">
                  {meta.label}
                  <span className="text-default font-normal ms-2">
                    ({bucket.count})
                  </span>
                </h6>
                {seeAll && (
                  <button
                    type="button"
                    onClick={handleSeeAll}
                    className="text-primary text-sm hover:underline"
                  >
                    View all {meta.label.toLowerCase()} →
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-12 grid-cols-12 gap-4">
                {bucket.results.map((r) => (
                  <SearchResultCard
                    key={r.id}
                    result={r}
                    highlight={highlight}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const meta = SEARCH_TYPE_META[data.category]
  return (
    <div className="bg-white p-5 rounded-lg border border-border-color">
      <h6 className="text-dark mb-4">
        {meta.label}
        <span className="text-default font-normal ms-2">
          ({data.totalResults})
        </span>
      </h6>
      <div className="grid md:grid-cols-12 grid-cols-12 gap-4">
        {data.results.map((r) => (
          <SearchResultCard key={r.id} result={r} highlight={highlight} />
        ))}
      </div>
    </div>
  )
}
