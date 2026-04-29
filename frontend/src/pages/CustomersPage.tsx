/* DOMAIN — Customers list page (Phase 4). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { CustomerTable } from '@/features/customers/CustomerTable'
import { CustomerViewDialog } from '@/features/customers/CustomerViewDialog'
import { CustomerFormDialog } from '@/features/customers/CustomerFormDialog'
import { CustomerDeleteDialog } from '@/features/customers/CustomerDeleteDialog'
import {
  useCustomer,
  useCustomers,
  useToggleActiveCustomer,
} from '@/features/customers/customersQueries'
import { toast } from '@/lib/toast'
import type { Customer, CustomerListParams } from '@/types/customer'

const DEFAULT_LIMIT = 20

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

type SortField = 'name' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'name' || v === 'createdAt' || v === 'updatedAt' ? v : 'createdAt'
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

export function CustomersPage() {
  const [params, setParams] = useSearchParams()

  // URL-driven query state
  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const isActiveFilter = parseIsActive(params.get('isActive'))

  // Local search input — debounced into URL
  const [searchInput, setSearchInput] = useState(search)
  useEffect(() => {
    if (searchInput === search) return
    const t = setTimeout(() => {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (searchInput) next.set('search', searchInput)
        else next.delete('search')
        next.set('page', '1') // reset to first page on new search
        return next
      })
    }, 300)
    return () => clearTimeout(t)
    // intentionally only depends on the input — URL change is the side effect
  }, [searchInput, search, setParams])

  const queryParams = useMemo<CustomerListParams>(
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
  const { data, isFetching, isLoading } = useCustomers(queryParams)
  const toggleActive = useToggleActiveCustomer()

  // Dialog state.
  // `viewing` is DERIVED from rows so the View modal always shows fresh server data
  // after an edit (mutation invalidates the list → list refetches → viewing reflects
  // updated fields including updatedAt). Stale-snapshot bug fix.
  // `?view=<id>` from Global Search deep-links also feeds viewingId; if the row
  // isn't on the current page, useCustomer fetches it directly.
  const viewParam = params.get('view')
  const [viewingId, setViewingId] = useState<string | null>(viewParam)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Customer | null>(null)

  // Sync viewingId with ?view= URL param (covers back/forward + external nav).
  useEffect(() => {
    setViewingId(viewParam)
  }, [viewParam])

  // When closing the modal, also drop the ?view= param so the URL stays clean.
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

  // Maps FilterMenu's batched output to URL search params.
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

  const handleToggleActive = (row: Customer) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { customer: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Customer "${row.name}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} customer: ${msg}`,
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
  const hasFilters = !!(search || isActiveFilter !== undefined)
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  // Derived: looked up from rows by id every render → reflects latest fetch.
  const viewingFromList = viewingId
    ? (rows.find((r) => r.customerID === viewingId) ?? null)
    : null
  // Fallback for `?view=<id>` deep-links to a row not on the current page.
  const { data: viewingFetched } = useCustomer(
    viewingId && !viewingFromList ? viewingId : null,
  )
  const viewing = viewingFromList ?? viewingFetched ?? null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Customers' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Customer
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <CustomerTable
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
          onView={(row) => setViewingId(row.customerID)}
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

      <CustomerViewDialog
        customer={viewing}
        onClose={closeView}
        onEdit={(c) => {
          closeView()
          setEditing(c)
        }}
        onDelete={(c) => {
          closeView()
          setDeleting(c)
        }}
      />

      <CustomerFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <CustomerFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', customer: editing } : { kind: 'create' }}
      />

      <CustomerDeleteDialog
        customer={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No customers yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Customer
      </button>
    </div>
  )
}
