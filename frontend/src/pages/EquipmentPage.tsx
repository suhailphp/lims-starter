/* DOMAIN — Equipment list page (master data). */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { EquipmentTable } from '@/features/equipments/EquipmentTable'
import { EquipmentViewDialog } from '@/features/equipments/EquipmentViewDialog'
import { EquipmentFormDialog } from '@/features/equipments/EquipmentFormDialog'
import { EquipmentDeleteDialog } from '@/features/equipments/EquipmentDeleteDialog'
import {
  useEquipments,
  useToggleActiveEquipment,
} from '@/features/equipments/equipmentsQueries'
import { toast } from '@/lib/toast'
import {
  type CalibrationStatus,
  type Equipment,
  type EquipmentListParams,
} from '@/types/equipment'

const DEFAULT_LIMIT = 20

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

const CALIBRATION_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Valid',    value: 'VALID' },
  { label: 'Due soon', value: 'DUE_SOON' },
  { label: 'Overdue',  value: 'OVERDUE' },
  { label: 'Unknown',  value: 'UNKNOWN' },
]

type SortField = 'name' | 'serialNumber' | 'calibrationDueDate' | 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

function parseSort(v: string | null): SortField {
  return v === 'name' ||
    v === 'serialNumber' ||
    v === 'calibrationDueDate' ||
    v === 'createdAt' ||
    v === 'updatedAt'
    ? v
    : 'createdAt'
}
function parseOrder(v: string | null): SortOrder {
  return v === 'asc' ? 'asc' : 'desc'
}
function parseStatus(v: string | null): CalibrationStatus | undefined {
  return v === 'VALID' || v === 'DUE_SOON' || v === 'OVERDUE' || v === 'UNKNOWN'
    ? v
    : undefined
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

export function EquipmentPage() {
  const [params, setParams] = useSearchParams()

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const calibrationStatus = parseStatus(params.get('calibrationStatus'))
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

  const queryParams = useMemo<EquipmentListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      calibrationStatus,
      isActive: isActiveFilter,
    }),
    [page, limit, sort, order, search, calibrationStatus, isActiveFilter],
  )
  const { data, isFetching, isLoading } = useEquipments(queryParams)
  const toggleActive = useToggleActiveEquipment()

  const handleToggleActive = (row: Equipment) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { equipment: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `Equipment "${row.name}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} equipment: ${msg}`,
          )
        },
      },
    )
  }

  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Equipment | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Equipment | null>(null)

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next.isActive === undefined) p.delete('isActive')
      else p.set('isActive', next.isActive)
      if (next.calibrationStatus === undefined) p.delete('calibrationStatus')
      else p.set('calibrationStatus', next.calibrationStatus)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive:
      isActiveFilter === undefined ? undefined : String(isActiveFilter),
    calibrationStatus: calibrationStatus ?? undefined,
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
  const hasFilters = !!(search || calibrationStatus || isActiveFilter !== undefined)
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewing = viewingId
    ? (rows.find((r) => r.equipmentID === viewingId) ?? null)
    : null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Master Data' },
          { label: 'Equipment' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New Equipment
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <EquipmentTable
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
          onView={(row) => setViewingId(row.equipmentID)}
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
                  label: 'Calibration',
                  key: 'calibrationStatus',
                  options: CALIBRATION_OPTIONS,
                },
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <EquipmentViewDialog
        equipment={viewing}
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

      <EquipmentFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <EquipmentFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', equipment: editing } : { kind: 'create' }}
      />

      <EquipmentDeleteDialog
        equipment={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No equipment yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add Equipment
      </button>
    </div>
  )
}
