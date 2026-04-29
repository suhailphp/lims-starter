/* DOMAIN — Sources list page (master-data, global view across customers). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import type { FKOption } from '@/components/ui/FKSelect'
import { SourceTable } from '@/features/sources/SourceTable'
import { SourceViewDialog } from '@/features/sources/SourceViewDialog'
import { SourceFormDialog } from '@/features/sources/SourceFormDialog'
import { SourceDeleteDialog } from '@/features/sources/SourceDeleteDialog'
import {
  useSources,
  useToggleActiveSource,
} from '@/features/sources/sourcesQueries'
import { useCustomers } from '@/features/customers/customersQueries'
import { useSourceTypes } from '@/features/sourceTypes/sourceTypesQueries'
import { useCategories } from '@/features/categories/categoriesQueries'
import { toast } from '@/lib/toast'
import type { Source, SourceListParams } from '@/types/source'

const DEFAULT_LIMIT = 20
const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

type SortField = 'sourceName' | 'equipmentName' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'sourceName' || v === 'equipmentName' || v === 'createdAt' || v === 'updatedAt'
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

export function SourcesPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const customerID = params.get('customerID') ?? ''
  const sourceTypeID = params.get('sourceTypeID') ?? ''
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

  const queryParams = useMemo<SourceListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      customerID: customerID || undefined,
      sourceTypeID: sourceTypeID || undefined,
      categoryID: categoryID || undefined,
      isActive: isActiveFilter,
    }),
    [page, limit, sort, order, search, customerID, sourceTypeID, categoryID, isActiveFilter],
  )
  const { data, isFetching, isLoading } = useSources(queryParams)
  const toggleActive = useToggleActiveSource()

  const customersQ = useCustomers({ ...LOOKUP_PARAMS, sort: 'name' })
  const sourceTypesQ = useSourceTypes({ ...LOOKUP_PARAMS, sort: 'name' })
  const categoriesQ = useCategories({ ...LOOKUP_PARAMS, sort: 'name' })

  const customerOptions = useMemo<FKOption[]>(
    () => (customersQ.data?.data ?? []).map((c) => ({ value: c.customerID, label: c.name })),
    [customersQ.data],
  )
  const sourceTypeOptions = useMemo<FKOption[]>(
    () => (sourceTypesQ.data?.data ?? []).map((s) => ({ value: s.sourceTypeID, label: s.name })),
    [sourceTypesQ.data],
  )
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
      setOrDel('customerID', next.customerID)
      setOrDel('sourceTypeID', next.sourceTypeID)
      setOrDel('categoryID', next.categoryID)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    customerID: customerID || undefined,
    sourceTypeID: sourceTypeID || undefined,
    categoryID: categoryID || undefined,
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Source | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Source | null>(null)

  const handleToggleActive = (row: Source) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { source: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Source "${row.sourceName}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} source: ${msg}`,
          )
        },
      },
    )
  }

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
    customerID ||
    sourceTypeID ||
    categoryID ||
    isActiveFilter !== undefined
  )
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.sourceID === viewingId) ?? null)
    : null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Customers' },
          { label: 'Sources' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Source
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <SourceTable
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
          onView={(row) => setViewingId(row.sourceID)}
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
                  label: 'Customer',
                  key: 'customerID',
                  options: customerOptions,
                  isLoading: customersQ.isLoading,
                  placeholder: 'All customers',
                },
                {
                  type: 'select',
                  label: 'Source Type',
                  key: 'sourceTypeID',
                  options: sourceTypeOptions,
                  isLoading: sourceTypesQ.isLoading,
                  placeholder: 'All types',
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

      <SourceViewDialog
        source={viewing}
        onClose={() => setViewingId(null)}
        onEdit={(s) => {
          setViewingId(null)
          setEditing(s)
        }}
        onDelete={(s) => {
          setViewingId(null)
          setDeleting(s)
        }}
      />

      <SourceFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <SourceFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', source: editing } : { kind: 'create' }}
      />

      <SourceDeleteDialog
        source={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No sources yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Source
      </button>
    </div>
  )
}
