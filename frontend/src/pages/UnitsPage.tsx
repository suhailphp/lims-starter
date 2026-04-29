/* DOMAIN — Units list page (master-data, global view across categories). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import type { FKOption } from '@/components/ui/FKSelect'
import { UnitTable } from '@/features/units/UnitTable'
import { UnitViewDialog } from '@/features/units/UnitViewDialog'
import { UnitFormDialog } from '@/features/units/UnitFormDialog'
import { UnitDeleteDialog } from '@/features/units/UnitDeleteDialog'
import {
  useUnits,
  useToggleActiveUnit,
} from '@/features/units/unitsQueries'
import { useCategories } from '@/features/categories/categoriesQueries'
import { toast } from '@/lib/toast'
import type { Unit, UnitListParams } from '@/types/unit'

const DEFAULT_LIMIT = 20
const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

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
    : 'createdAt'
}
function parseOrder(v: string | null): SortOrder {
  return v === 'asc' ? 'asc' : 'desc'
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

export function UnitsPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const categoryID = params.get('categoryID') ?? ''
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

  const queryParams = useMemo<UnitListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      categoryID: categoryID || undefined,
      isActive: isActiveFilter,
    }),
    [page, limit, sort, order, search, categoryID, isActiveFilter],
  )
  const { data, isFetching, isLoading } = useUnits(queryParams)
  const toggleActive = useToggleActiveUnit()

  const categoriesQ = useCategories({ ...LOOKUP_PARAMS, sort: 'name' })
  const categoryOptions = useMemo<FKOption[]>(
    () =>
      (categoriesQ.data?.data ?? []).map((c) => ({
        value: c.categoryID,
        label: `${c.name} (${c.type})`,
      })),
    [categoriesQ.data],
  )

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      const setOrDel = (k: string, v: string | undefined) => {
        if (v === undefined || v === '') p.delete(k)
        else p.set(k, v)
      }
      setOrDel('isActive', next.isActive)
      setOrDel('categoryID', next.categoryID)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    categoryID: categoryID || undefined,
  }

  const handleToggleActive = (row: Unit) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { unit: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Unit "${row.name} (${row.symbol})" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} unit: ${msg}`,
          )
        },
      },
    )
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Unit | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Unit | null>(null)

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
  const hasFilters = !!(search || categoryID || isActiveFilter !== undefined)
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.unitID === viewingId) ?? null)
    : null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'Units' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Unit
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <UnitTable
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
          onView={(row) => setViewingId(row.unitID)}
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
                {
                  type: 'select',
                  label: 'Category',
                  key: 'categoryID',
                  options: categoryOptions,
                  isLoading: categoriesQ.isLoading,
                  placeholder: 'All categories',
                },
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <UnitViewDialog
        unit={viewing}
        onClose={() => setViewingId(null)}
        onEdit={(u) => {
          setViewingId(null)
          setEditing(u)
        }}
        onDelete={(u) => {
          setViewingId(null)
          setDeleting(u)
        }}
      />

      <UnitFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <UnitFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', unit: editing } : { kind: 'create' }}
      />

      <UnitDeleteDialog
        unit={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No units yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Unit
      </button>
    </div>
  )
}
