/* DOMAIN — Vendor tab-pill filter bar for /search.
 *
 * DOM mirrors vendor's searchResult.tsx tab list (rounded-lg p-1 outer
 * box, btn pills with `bg-primary text-white` active state). */
import type { SearchCategory } from '@/types/search'
import {
  ALL_META,
  SEARCH_CATEGORY_ORDER,
  SEARCH_TYPE_META,
  type SearchTypeMeta,
} from './searchIcons'

interface SearchFiltersProps {
  active: SearchCategory
  onChange: (cat: SearchCategory) => void
}

function metaFor(cat: SearchCategory): SearchTypeMeta {
  return cat === 'all' ? ALL_META : SEARCH_TYPE_META[cat]
}

export function SearchFilters({ active, onChange }: SearchFiltersProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white inline-flex border border-border-color rounded-lg p-1 items-center gap-1 sm:w-auto w-full overflow-x-auto">
        <nav
          className="sm:flex gap-1 flex-wrap sm:w-auto w-full"
          aria-label="Search categories"
          role="tablist"
        >
          {SEARCH_CATEGORY_ORDER.map((cat) => {
            const { label, Icon } = metaFor(cat)
            const isActive = active === cat
            const base =
              'btn py-1.5 px-3 flex justify-center items-center sm:w-auto w-full gap-1.5 rounded-lg font-medium border-t-2 border-transparent whitespace-nowrap focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none'
            const state = isActive
              ? 'bg-primary text-white dark:text-dark'
              : 'text-dark hover:bg-primary hover:text-white'
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(cat)}
                className={`${base} ${state}`}
              >
                <Icon size={16} />
                {label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
