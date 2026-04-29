/* DOMAIN — Tax Rates list page (master data + default-flag pattern). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { TaxRateTable } from '@/features/taxRates/TaxRateTable'
import { TaxRateViewDialog } from '@/features/taxRates/TaxRateViewDialog'
import { TaxRateFormDialog } from '@/features/taxRates/TaxRateFormDialog'
import { TaxRateDeleteDialog } from '@/features/taxRates/TaxRateDeleteDialog'
import { SetDefaultTaxRateDialog } from '@/features/taxRates/SetDefaultTaxRateDialog'
import {
  useTaxRates,
  useToggleActiveTaxRate,
} from '@/features/taxRates/taxRatesQueries'
import { toast } from '@/lib/toast'
import type { TaxRate, TaxRateListParams } from '@/types/taxRate'

const DEFAULT_LIMIT = 20

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

const DEFAULT_OPTIONS = [
  { label: 'All',         value: undefined },
  { label: 'Default',     value: 'true' },
  { label: 'Non-Default', value: 'false' },
]

type SortField = 'code' | 'name' | 'rate' | 'displayOrder' | 'isDefault' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'code' || v === 'name' || v === 'rate' || v === 'displayOrder' || v === 'isDefault' || v === 'createdAt' || v === 'updatedAt'
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

export function TaxRatesPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const isActiveFilter = parseBoolish(params.get('isActive'))
  const isDefaultFilter = parseBoolish(params.get('isDefault'))

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

  const queryParams = useMemo<TaxRateListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      isActive: isActiveFilter,
      isDefault: isDefaultFilter,
    }),
    [page, limit, sort, order, search, isActiveFilter, isDefaultFilter],
  )
  const { data, isFetching, isLoading } = useTaxRates(queryParams)
  const toggleActive = useToggleActiveTaxRate()

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next.isActive === undefined) p.delete('isActive')
      else p.set('isActive', next.isActive)
      if (next.isDefault === undefined) p.delete('isDefault')
      else p.set('isDefault', next.isDefault)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    isDefault: isDefaultFilter === undefined ? undefined : String(isDefaultFilter),
  }

  const handleToggleActive = (row: TaxRate) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { taxRate: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Tax rate "${row.code}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} tax rate: ${msg}`,
          )
        },
      },
    )
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<TaxRate | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<TaxRate | null>(null)
  const [settingDefault, setSettingDefault] = useState<TaxRate | null>(null)

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
  const hasFilters = !!(search || isActiveFilter !== undefined || isDefaultFilter !== undefined)
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.taxRateID === viewingId) ?? null)
    : null
  const currentDefault = rows.find((r) => r.isDefault) ?? null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'Tax Rates' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Tax Rate
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <TaxRateTable
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
          onView={(row) => setViewingId(row.taxRateID)}
          onEdit={setEditing}
          onDelete={setDeleting}
          onToggleActive={handleToggleActive}
          onSetDefault={setSettingDefault}
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
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <TaxRateViewDialog
        taxRate={viewing}
        onClose={() => setViewingId(null)}
        onEdit={(t) => {
          setViewingId(null)
          setEditing(t)
        }}
        onDelete={(t) => {
          setViewingId(null)
          setDeleting(t)
        }}
        onSetDefault={(t) => {
          setViewingId(null)
          setSettingDefault(t)
        }}
      />

      <TaxRateFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <TaxRateFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', taxRate: editing } : { kind: 'create' }}
      />

      <TaxRateDeleteDialog
        taxRate={deleting}
        onClose={() => setDeleting(null)}
      />

      <SetDefaultTaxRateDialog
        taxRate={settingDefault}
        currentDefault={currentDefault}
        onClose={() => setSettingDefault(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No tax rates yet</h5>
      <p className="mb-5 text-sm text-default">
        Create at least one tax rate. The first one will become the default.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Tax Rate
      </button>
    </div>
  )
}
