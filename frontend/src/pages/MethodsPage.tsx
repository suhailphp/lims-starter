/* DOMAIN — Methods list page (master-data, global view across tests). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import type { FKOption } from '@/components/ui/FKSelect'
import { MethodTable } from '@/features/methods/MethodTable'
import { MethodViewDialog } from '@/features/methods/MethodViewDialog'
import { MethodFormDialog } from '@/features/methods/MethodFormDialog'
import { MethodDeleteDialog } from '@/features/methods/MethodDeleteDialog'
import {
  useMethods,
  useToggleActiveMethod,
} from '@/features/methods/methodsQueries'
import { useTests } from '@/features/tests/testsQueries'
import { toast } from '@/lib/toast'
import type { Method, MethodListParams } from '@/types/method'

const DEFAULT_LIMIT = 20
const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

const DEFAULT_OPTIONS = [
  { label: 'All',          value: undefined },
  { label: 'Default only', value: 'true' },
  { label: 'Non-default',  value: 'false' },
]

type SortField = 'code' | 'isDefault' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'code' || v === 'isDefault' || v === 'createdAt' || v === 'updatedAt'
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
function parseTriBool(v: string | null): boolean | undefined {
  if (v === 'true') return true
  if (v === 'false') return false
  return undefined
}

export function MethodsPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const testID = params.get('testID') ?? ''
  const isActiveFilter = parseTriBool(params.get('isActive'))
  const isDefaultFilter = parseTriBool(params.get('isDefault'))

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

  const queryParams = useMemo<MethodListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      testID: testID || undefined,
      isActive: isActiveFilter,
      isDefault: isDefaultFilter,
    }),
    [page, limit, sort, order, search, testID, isActiveFilter, isDefaultFilter],
  )
  const { data, isFetching, isLoading } = useMethods(queryParams)
  const toggleActive = useToggleActiveMethod()

  const testsQ = useTests({ ...LOOKUP_PARAMS, sort: 'name' })
  const testOptions = useMemo<FKOption[]>(
    () =>
      (testsQ.data?.data ?? []).map((t) => ({
        value: t.testID,
        label: t.category?.name ? `${t.name} (${t.category.name})` : t.name,
      })),
    [testsQ.data],
  )

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      const setOrDel = (k: string, v: string | undefined) => {
        if (v === undefined || v === '') p.delete(k)
        else p.set(k, v)
      }
      setOrDel('isActive', next.isActive)
      setOrDel('isDefault', next.isDefault)
      setOrDel('testID', next.testID)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    isDefault: isDefaultFilter === undefined ? undefined : String(isDefaultFilter),
    testID: testID || undefined,
  }

  const handleToggleActive = (row: Method) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { method: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Method "${row.code}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} method: ${msg}`,
          )
        },
      },
    )
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Method | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Method | null>(null)

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
  const hasFilters = !!(
    search ||
    testID ||
    isActiveFilter !== undefined ||
    isDefaultFilter !== undefined
  )
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.methodID === viewingId) ?? null)
    : null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'Methods' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Method
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <MethodTable
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
          onView={(row) => setViewingId(row.methodID)}
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
                  type: 'chips',
                  label: 'Default',
                  key: 'isDefault',
                  options: DEFAULT_OPTIONS,
                },
                {
                  type: 'select',
                  label: 'Test',
                  key: 'testID',
                  options: testOptions,
                  isLoading: testsQ.isLoading,
                  placeholder: 'All tests',
                },
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <MethodViewDialog
        method={viewing}
        onClose={() => setViewingId(null)}
        onEdit={(m) => {
          setViewingId(null)
          setEditing(m)
        }}
        onDelete={(m) => {
          setViewingId(null)
          setDeleting(m)
        }}
      />

      <MethodFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <MethodFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', method: editing } : { kind: 'create' }}
      />

      <MethodDeleteDialog
        method={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No methods yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Method
      </button>
    </div>
  )
}
