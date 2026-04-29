/* DOMAIN — Single search result card.
 *
 * Vendor reference: searchResult.tsx Card 1 — `lg:col-span-6 col-span-12
 * bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg
 * transition`. We swap the kebab dropdown for a chevron + click-to-navigate
 * — per-row CRUD belongs on the entity page, not in search. */
import { Link } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react'
import type { SearchResult } from '@/types/search'
import { SEARCH_TYPE_META } from './searchIcons'

interface SearchResultCardProps {
  result: SearchResult
  /** Term to highlight inside `name`. */
  highlight: string
}

/* Inline highlighter — escapes regex specials, wraps matches in <mark>.
 * No external dep. */
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function HighlightedText({ text, term }: { text: string; term: string }) {
  if (!term.trim()) return <>{text}</>
  const re = new RegExp(`(${escapeRegex(term.trim())})`, 'gi')
  const parts = text.split(re)
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? (
          <mark
            key={i}
            className="text-primary bg-transparent font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

/* Append `?search=<q>` to the result link so the destination list page
 * pre-filters its table to the same query the user typed in Global
 * Search. Verified field-overlap-safe for the wired entities (the list
 * search is at least as broad as the global search per entity). */
function buildLink(rawLink: string, q: string): string {
  const term = q.trim()
  if (!term) return rawLink
  const [path, query = ''] = rawLink.split('?')
  const params = new URLSearchParams(query)
  params.set('search', term)
  return `${path}?${params.toString()}`
}

export function SearchResultCard({ result, highlight }: SearchResultCardProps) {
  const meta = SEARCH_TYPE_META[result.type]
  const Icon = meta.Icon
  const to = buildLink(result.link, highlight)

  return (
    <Link
      to={to}
      className="lg:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition flex items-center gap-4 group"
    >
      <span className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full bg-light text-primary border border-border-color">
        <Icon size={20} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-dark font-semibold truncate">
            <HighlightedText text={result.name} term={highlight} />
          </p>
          {!result.isActive && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-border-color shrink-0">
              Inactive
            </span>
          )}
        </div>
        {result.subtitle && (
          <p className="text-default text-sm truncate">{result.subtitle}</p>
        )}
      </div>
      <span className="text-default group-hover:text-primary shrink-0">
        <IconChevronRight size={18} />
      </span>
    </Link>
  )
}
