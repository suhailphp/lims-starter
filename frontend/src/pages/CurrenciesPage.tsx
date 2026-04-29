/* DOMAIN — Currencies list page (master data + multi-currency foundation). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { CurrencyTable } from '@/features/currencies/CurrencyTable'
import { CurrencyViewDialog } from '@/features/currencies/CurrencyViewDialog'
import { CurrencyFormDialog } from '@/features/currencies/CurrencyFormDialog'
import { CurrencyDeleteDialog } from '@/features/currencies/CurrencyDeleteDialog'
import { UpdateRateDialog } from '@/features/currencies/UpdateRateDialog'
import { SetBaseCurrencyDialog } from '@/features/currencies/SetBaseCurrencyDialog'
import {
  useCurrencies,
  useToggleActiveCurrency,
} from '@/features/currencies/currenciesQueries'
import { toast } from '@/lib/toast'
import type { Currency, CurrencyListParams } from '@/types/currency'

const DEFAULT_LIMIT = 20

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

const BASE_OPTIONS = [
  { label: 'All',     value: undefined },
  { label: 'Base',    value: 'true' },
  { label: 'Non-Base', value: 'false' },
]

type SortField = 'code' | 'name' | 'displayOrder' | 'isBase' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'code' || v === 'name' || v === 'displayOrder' || v === 'isBase' || v === 'createdAt' || v === 'updatedAt'
    ? v
    : 'displayOrder'
}
function parseOrder(v: string | null): SortOrder {
  return v === 'desc' ? 'desc' : 'asc'
}
function parseInt1(v: string | null, fallback: number): number {
  const n = v == null ? NaN : Number(v)
  return Number.isInteger(n) && n >= 1 ? n : fallback
}
function parseBoolish(v: string | null): boolean | undefined {
  if (v === 'true') return true
  if (v === 'false') return false
  return undefined
}

export function CurrenciesPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const isActiveFilter = parseBoolish(params.get('isActive'))
  const isBaseFilter = parseBoolish(params.get('isBase'))

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

  const queryParams = useMemo<CurrencyListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      isActive: isActiveFilter,
      isBase: isBaseFilter,
    }),
    [page, limit, sort, order, search, isActiveFilter, isBaseFilter],
  )
  const { data, isFetching, isLoading } = useCurrencies(queryParams)
  const toggleActive = useToggleActiveCurrency()

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next.isActive === undefined) p.delete('isActive')
      else p.set('isActive', next.isActive)
      if (next.isBase === undefined) p.delete('isBase')
      else p.set('isBase', next.isBase)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    isBase: isBaseFilter === undefined ? undefined : String(isBaseFilter),
  }

  const handleToggleActive = (row: Currency) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { currency: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Currency "${row.code}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} currency: ${msg}`,
          )
        },
      },
    )
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Currency | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Currency | null>(null)
  const [updatingRate, setUpdatingRate] = useState<Currency | null>(null)
  const [settingBase, setSettingBase] = useState<Currency | null>(null)

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
  const hasFilters = !!(search || isActiveFilter !== undefined || isBaseFilter !== undefined)
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.currencyID === viewingId) ?? null)
    : null
  const currentBase = rows.find((r) => r.isBase) ?? null
  const hasBaseCurrency = !!currentBase

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'Currencies' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Currency
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <CurrencyTable
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
          onView={(row) => setViewingId(row.currencyID)}
          onEdit={setEditing}
          onDelete={setDeleting}
          onToggleActive={handleToggleActive}
          onSetBase={setSettingBase}
          onUpdateRate={setUpdatingRate}
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
                  label: 'Base',
                  key: 'isBase',
                  options: BASE_OPTIONS,
                },
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <CurrencyViewDialog
        currency={viewing}
        onClose={() => setViewingId(null)}
        onEdit={(c) => {
          setViewingId(null)
          setEditing(c)
        }}
        onDelete={(c) => {
          setViewingId(null)
          setDeleting(c)
        }}
        onUpdateRate={(c) => {
          setViewingId(null)
          setUpdatingRate(c)
        }}
        onSetBase={(c) => {
          setViewingId(null)
          setSettingBase(c)
        }}
      />

      <CurrencyFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create', hasBaseCurrency }}
      />

      <CurrencyFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', currency: editing } : { kind: 'create', hasBaseCurrency }}
      />

      <CurrencyDeleteDialog
        currency={deleting}
        onClose={() => setDeleting(null)}
      />

      <UpdateRateDialog
        currency={updatingRate}
        onClose={() => setUpdatingRate(null)}
      />

      <SetBaseCurrencyDialog
        currency={settingBase}
        currentBase={currentBase}
        onClose={() => setSettingBase(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No currencies yet</h5>
      <p className="mb-5 text-sm text-default">
        The first currency you create automatically becomes the base currency.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Base Currency
      </button>
    </div>
  )
}
