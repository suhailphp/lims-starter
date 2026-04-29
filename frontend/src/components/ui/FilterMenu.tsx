/* REUSABLE — Unified filter dropdown for master-data + module list pages.
 *
 * Single button (with active count badge) that opens a panel containing one
 * section per declared filter. Filters compose: chips for small/static
 * options (status, enum), `select` (FKSelect) for FK lookups. URL state
 * commits in BATCH on Apply — selecting individual chips inside the panel
 * does NOT trigger a refetch until the user clicks Apply.
 *
 * URL convention: each filter's `key` doubles as its URL search param; the
 * filter `value` is a string-or-undefined that the page maps to/from URL.
 *
 * Usage:
 *   <FilterMenu
 *     filters={[
 *       { type: 'chips',  label: 'Status', key: 'isActive', options: STATUS_OPTS },
 *       { type: 'chips',  label: 'Type',   key: 'type',     options: TYPE_OPTS  },
 *       { type: 'select', label: 'Customer', key: 'customerID', options: customerOptions, isLoading: customersQ.isLoading },
 *     ]}
 *     values={{ isActive, type, customerID }}
 *     onApply={(next) => commitFiltersToUrl(next)}
 *   />
 *
 * No multi-filter precedent exists in vendor (vendor's "Filter Dropdown" is
 * actually a one-section sort menu). This component reuses the SortMenu /
 * RowMenu shell pattern from `CustomerTable.tsx` (vendor card, click-outside,
 * fixed-coord positioning) so the visual matches the rest of the app.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconFilter } from '@tabler/icons-react'
import { FKSelect, type FKOption } from './FKSelect'

export type FilterValue = string | undefined
export type FilterValues = Record<string, FilterValue>

interface BaseFilterConfig {
  label: string
  /** URL search param name AND draft state key. Must be unique per filter. */
  key: string
}

export interface FilterChipsConfig extends BaseFilterConfig {
  type: 'chips'
  /** First option's `value: undefined` is conventionally the "All" reset. */
  options: Array<{ label: string; value: FilterValue }>
}

export interface FilterSelectConfig extends BaseFilterConfig {
  type: 'select'
  options: FKOption[]
  isLoading?: boolean
  isClearable?: boolean
  placeholder?: string
}

export type FilterConfig = FilterChipsConfig | FilterSelectConfig

interface FilterMenuProps {
  filters: FilterConfig[]
  values: FilterValues
  /** Called once on Apply with the new value map. Page commits to URL. */
  onApply: (next: FilterValues) => void
}

export function FilterMenu({ filters, values, onApply }: FilterMenuProps) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(null)
  const [draft, setDraft] = useState<FilterValues>(values)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Sync draft from URL whenever the panel opens — so closed-state changes
  // (made elsewhere, or discarded by outside-click) don't leak in.
  useEffect(() => {
    if (open) setDraft(values)
  }, [open, values])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [open])

  const toggle = () => {
    if (open) {
      setOpen(false)
      return
    }
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    setCoords({
      top: rect.bottom + 6,
      right: window.innerWidth - rect.right,
    })
    setOpen(true)
  }

  // Active filter labels for the button text + badge.
  const activeLabels = useMemo(() => {
    const out: string[] = []
    for (const f of filters) {
      const v = values[f.key]
      if (v === undefined || v === '') continue
      const opt = f.options.find((o) => o.value === v)
      out.push(opt?.label ?? String(v))
    }
    return out
  }, [filters, values])

  const buttonText =
    activeLabels.length === 0
      ? 'Filter'
      : activeLabels.length === 1
        ? `Filter • ${activeLabels[0]}`
        : `Filter • ${activeLabels.length}`

  const dirty = useMemo(() => {
    if (filters.length === 0) return false
    for (const f of filters) {
      if ((draft[f.key] ?? '') !== (values[f.key] ?? '')) return true
    }
    return false
  }, [draft, values, filters])

  const handleClearAll = () => {
    const cleared: FilterValues = {}
    for (const f of filters) cleared[f.key] = undefined
    setDraft(cleared)
  }

  const handleApply = () => {
    onApply(draft)
    setOpen(false)
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`btn h-[35px] cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border bg-white hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden ${
          activeLabels.length > 0
            ? 'border-primary text-primary'
            : 'border-border-color text-gray-900'
        }`}
      >
        <IconFilter size={16} />
        {buttonText}
      </button>
      {open && coords &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            style={{
              position: 'fixed',
              top: coords.top,
              right: coords.right,
              width: '320px',
              zIndex: 9999,
            }}
            className="bg-white border border-border-color shadow-lg rounded-lg"
          >
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
              {filters.length === 0 ? (
                <p className="text-sm text-default">No filters available.</p>
              ) : (
                filters.map((f) => (
                  <FilterSection
                    key={f.key}
                    config={f}
                    value={draft[f.key]}
                    onChange={(v) => setDraft({ ...draft, [f.key]: v })}
                  />
                ))
              )}
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-border-color">
              <button
                type="button"
                onClick={handleClearAll}
                className="text-sm text-default hover:text-primary cursor-pointer"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!dirty}
                className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
              >
                Apply
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

function FilterSection({
  config,
  value,
  onChange,
}: {
  config: FilterConfig
  value: FilterValue
  onChange: (next: FilterValue) => void
}) {
  return (
    <div>
      <div className="text-xs font-semibold text-default uppercase tracking-wide mb-2">
        {config.label}
      </div>
      {config.type === 'chips' ? (
        <div className="flex flex-wrap gap-1.5">
          {config.options.map((opt) => {
            const active = (value ?? '') === (opt.value ?? '')
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                  active
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-border-color text-default hover:bg-primary-50 hover:text-primary hover:border-primary'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      ) : (
        <FKSelect
          options={config.options}
          value={value ?? null}
          onChange={(v) => onChange(v ?? undefined)}
          isLoading={config.isLoading}
          isClearable={config.isClearable ?? true}
          placeholder={config.placeholder ?? 'Select...'}
        />
      )}
    </div>
  )
}
