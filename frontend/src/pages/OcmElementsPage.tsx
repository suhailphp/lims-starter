/* DOMAIN — OCM Elements list page (master data). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { OcmElementTable } from '@/features/ocmElements/OcmElementTable'
import { OcmElementViewDialog } from '@/features/ocmElements/OcmElementViewDialog'
import { OcmElementFormDialog } from '@/features/ocmElements/OcmElementFormDialog'
import { OcmElementDeleteDialog } from '@/features/ocmElements/OcmElementDeleteDialog'
import {
  useOcmElements,
  useToggleActiveOcmElement,
} from '@/features/ocmElements/ocmElementsQueries'
import { toast } from '@/lib/toast'
import type { OcmElement, OcmElementListParams } from '@/types/ocmElement'

const DEFAULT_LIMIT = 20

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

type SortField = 'name' | 'symbol' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'name' || v === 'symbol' || v === 'createdAt' || v === 'updatedAt'
    ? v
    : 'name'
}
function parseOrder(v: string | null): SortOrder {
  return v === 'desc' ? 'desc' : 'asc'
}
function parseInt1(v: string | null, fallback: number): number {
  const n = v == null ? NaN : Number(v)
  return Number.isInteger(n) && n >= 1 ? n : fallback
}
function parseIsActive(v: string | null): boolean | undefined {
  if (v === 'true') return true
  if (v === 'false') return false
  return undefined
}

export function OcmElementsPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const isActiveFilter = parseIsActive(params.get('isActive'))

  const [searchInput, setSearchInput] = useState(search)
  useEffect(() => {
    if (searchInput === search) return
    const t = setTimeout(() => {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (searchInput) next.set('search', searchInput)
        else next.delete('search')
        next.set('page', '1')
        return next
      })
    }, 300)
    return () => clearTimeout(t)
  }, [searchInput, search, setParams])

  const queryParams = useMemo<OcmElementListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      isActive: isActiveFilter,
    }),
    [page, limit, sort, order, search, isActiveFilter],
  )
  const { data, isFetching, isLoading } = useOcmElements(queryParams)
  const toggleActive = useToggleActiveOcmElement()

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next.isActive === undefined) p.delete('isActive')
      else p.set('isActive', next.isActive)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
  }

  const handleToggleActive = (row: OcmElement) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { ocmElement: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Element "${row.name} (${row.symbol})" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} element: ${msg}`,
          )
        },
      },
    )
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<OcmElement | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<OcmElement | null>(null)

  const handlePageChange = (newPage: number, newLimit: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(newPage))
      next.set('limit', String(newLimit))
      return next
    })
  }

  const handleSortChange = (newSort: SortField, newOrder: SortOrder) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('sort', newSort)
      next.set('order', newOrder)
      return next
    })
  }

  const rows = data?.data ?? []
  const total = data?.meta.total ?? 0
  const hasFilters = !!(search || isActiveFilter !== undefined)
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.ocmElementID === viewingId) ?? null)
    : null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'OCM Elements' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Element
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <OcmElementTable
          rows={rows}
          total={total}
          isLoading={isLoading}
          isFetching={isFetching}
          page={page}
          limit={limit}
          sort={sort}
          order={order}
          search={searchInput}
          onSearchChange={setSearchInput}
          onView={(row) => setViewingId(row.ocmElementID)}
          onEdit={setEditing}
          onDelete={setDeleting}
          onToggleActive={handleToggleActive}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          filterMenu={
            <FilterMenu
              filters={[
                {
                  type: 'chips',
                  label: 'Status',
                  key: 'isActive',
                  options: STATUS_OPTIONS,
                },
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <OcmElementViewDialog
        ocmElement={viewing}
        onClose={() => setViewingId(null)}
        onEdit={(e) => {
          setViewingId(null)
          setEditing(e)
        }}
        onDelete={(e) => {
          setViewingId(null)
          setDeleting(e)
        }}
      />

      <OcmElementFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <OcmElementFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', ocmElement: editing } : { kind: 'create' }}
      />

      <OcmElementDeleteDialog
        ocmElement={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No OCM elements yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Element
      </button>
    </div>
  )
}
