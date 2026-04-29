/* DOMAIN — Global Search results page (`/search`).
 *
 * URL contract:
 *   ?q=<term>            — search query (also drives the input value)
 *   ?category=<cat|all>  — active filter; defaults to 'all' when omitted
 *
 * The typed input debounces (300 ms) into the URL so back/forward and
 * page refresh preserve state. */
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { SearchInput, type SearchInputHandle } from '@/features/search/SearchInput'
import { SearchFilters } from '@/features/search/SearchFilters'
import { SearchResultsList } from '@/features/search/SearchResultsList'
import { EmptyState } from '@/features/search/EmptyState'
import { useGlobalSearch } from '@/features/search/queries'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import type { SearchCategory } from '@/types/search'

const SUPPORTED: SearchCategory[] = [
  'all',
  'customers',
  'users',
  'tests',
  'methods',
  'equipment',
  'categories',
  'sources',
  'currencies',
]

function parseCategory(v: string | null): SearchCategory {
  return SUPPORTED.includes(v as SearchCategory) ? (v as SearchCategory) : 'all'
}

export function SearchResultsPage() {
  const [params, setParams] = useSearchParams()
  const inputRef = useRef<SearchInputHandle>(null)

  const urlQuery = params.get('q') ?? ''
  const category = parseCategory(params.get('category'))

  // Local input — debounced into the URL.
  const [input, setInput] = useState(urlQuery)

  // Re-sync from URL when it changes externally (header Enter, back/forward,
  // direct paste). Skip while the page input is focused so we don't stomp on
  // typing — last-writer-wins per spec. This also pre-empts the debounce
  // effect below: by the next render `input === urlQuery`, so its timer is
  // cleaned up before it can clobber the URL.
  useEffect(() => {
    if (urlQuery === input) return
    if (inputRef.current?.isFocused()) return
    setInput(urlQuery)
  }, [urlQuery, input])

  useEffect(() => {
    if (input === urlQuery) return
    const t = setTimeout(() => {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (input) next.set('q', input)
        else next.delete('q')
        return next
      }, { replace: true })
    }, 300)
    return () => clearTimeout(t)
  }, [input, urlQuery, setParams])

  // ⌘K while already on /search → refocus + select existing query.
  useKeyboardShortcut('k', () => inputRef.current?.focus(), { meta: true })

  const handleCategory = (cat: SearchCategory) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (cat === 'all') next.delete('category')
      else next.set('category', cat)
      return next
    })
  }

  const trimmed = urlQuery.trim()
  const tooShort = trimmed.length > 0 && trimmed.length < 2
  const idle = trimmed.length === 0

  const { data, isLoading, isFetching, error } = useGlobalSearch({
    q: urlQuery,
    category,
  })

  const noResults = !!data && data.totalResults === 0

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Search' },
        ]}
      />

      {/* Loading bar — thin, vendor-style refetch indicator */}
      <div className="h-1 mb-3">
        {isFetching && !isLoading && (
          <div className="h-1 bg-primary/30 overflow-hidden rounded">
            <div className="h-1 w-1/3 bg-primary animate-pulse" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Search bar card */}
        <div className="col-span-12 bg-white p-5 rounded-lg border border-border-color space-y-5">
          <SearchInput
            ref={inputRef}
            value={input}
            onChange={setInput}
            onSubmit={(v) => {
              // Click / Enter on the page button → immediate URL update
              // (skips the 300 ms debounce). Mirrors header's behavior.
              setParams((prev) => {
                const next = new URLSearchParams(prev)
                next.set('q', v)
                return next
              }, { replace: true })
            }}
          />
          <SearchFilters active={category} onChange={handleCategory} />
        </div>

        {/* Results / states */}
        <div className="col-span-12">
          {idle && <EmptyState variant="idle" />}
          {tooShort && <EmptyState variant="too-short" />}
          {!idle && !tooShort && error && (
            <div className="bg-white border border-border-color rounded-lg p-6 text-danger">
              Failed to load search results. Try again.
            </div>
          )}
          {!idle && !tooShort && !error && isLoading && !data && (
            <div className="bg-white border border-border-color rounded-lg p-12 text-center text-default">
              Searching…
            </div>
          )}
          {!idle && !tooShort && data && noResults && (
            <EmptyState variant="no-results" query={urlQuery.trim()} />
          )}
          {!idle && !tooShort && data && !noResults && (
            <SearchResultsList
              data={data}
              highlight={urlQuery.trim()}
              onSwitchCategory={handleCategory}
            />
          )}
        </div>
      </div>
    </>
  )
}
