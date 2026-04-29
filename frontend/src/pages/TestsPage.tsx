/* DOMAIN — Tests list page (master-data, global view across categories). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import type { FKOption } from '@/components/ui/FKSelect'
import { TestTable } from '@/features/tests/TestTable'
import { TestViewDialog } from '@/features/tests/TestViewDialog'
import { TestFormDialog } from '@/features/tests/TestFormDialog'
import { TestDeleteDialog } from '@/features/tests/TestDeleteDialog'
import {
  useTest,
  useTests,
  useToggleActiveTest,
} from '@/features/tests/testsQueries'
import { useCategories } from '@/features/categories/categoriesQueries'
import { toast } from '@/lib/toast'
import type { Test, TestListParams, TestResultType } from '@/types/test'

const DEFAULT_LIMIT = 20
const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

const RESULT_TYPE_OPTIONS = [
  { label: 'All',       value: undefined },
  { label: 'Numeric',   value: 'NUMERIC' },
  { label: 'Text',      value: 'TEXT' },
  { label: 'Threshold', value: 'THRESHOLD' },
]

type SortField = 'name' | 'resultType' | 'decimalPlaces' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'name' ||
    v === 'resultType' ||
    v === 'decimalPlaces' ||
    v === 'createdAt' ||
    v === 'updatedAt'
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
function parseResultType(v: string | null): TestResultType | undefined {
  if (v === 'NUMERIC' || v === 'TEXT' || v === 'THRESHOLD') return v
  return undefined
}

export function TestsPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const categoryID = params.get('categoryID') ?? ''
  const isActiveFilter = parseIsActive(params.get('isActive'))
  const resultTypeFilter = parseResultType(params.get('resultType'))

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

  const queryParams = useMemo<TestListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      categoryID: categoryID || undefined,
      isActive: isActiveFilter,
      resultType: resultTypeFilter,
    }),
    [page, limit, sort, order, search, categoryID, isActiveFilter, resultTypeFilter],
  )
  const { data, isFetching, isLoading } = useTests(queryParams)
  const toggleActive = useToggleActiveTest()

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
      setOrDel('resultType', next.resultType)
      setOrDel('categoryID', next.categoryID)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    resultType: resultTypeFilter,
    categoryID: categoryID || undefined,
  }

  const handleToggleActive = (row: Test) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { test: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Test "${row.name}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} test: ${msg}`,
          )
        },
      },
    )
  }

  // `?view=<id>` deep-links from Global Search auto-open the View modal.
  const viewParam = params.get('view')
  const [viewingId, setViewingId] = useState<string | null>(viewParam)
  const [editing, setEditing] = useState<Test | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Test | null>(null)

  useEffect(() => {
    setViewingId(viewParam)
  }, [viewParam])

  const closeView = () => {
    setViewingId(null)
    if (viewParam) {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        next.delete('view')
        return next
      }, { replace: true })
    }
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
    categoryID ||
    isActiveFilter !== undefined ||
    resultTypeFilter !== undefined
  )
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewingFromList = viewingId
    ? (rows.find((r) => r.testID === viewingId) ?? null)
    : null
  // Fallback for `?view=<id>` deep-links to a row not on the current page.
  const { data: viewingFetched } = useTest(
    viewingId && !viewingFromList ? viewingId : null,
  )
  const viewing = viewingFromList ?? viewingFetched ?? null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'Tests' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Test
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <TestTable
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
          onView={(row) => setViewingId(row.testID)}
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
                  label: 'Result Type',
                  key: 'resultType',
                  options: RESULT_TYPE_OPTIONS,
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

      <TestViewDialog
        test={viewing}
        onClose={closeView}
        onEdit={(t) => {
          closeView()
          setEditing(t)
        }}
        onDelete={(t) => {
          closeView()
          setDeleting(t)
        }}
      />

      <TestFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <TestFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', test: editing } : { kind: 'create' }}
      />

      <TestDeleteDialog
        test={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No tests yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Test
      </button>
    </div>
  )
}
