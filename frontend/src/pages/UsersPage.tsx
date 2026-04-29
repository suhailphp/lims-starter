/* DOMAIN — Users list page (Module 02 frontend).
 * Pattern reference: pages/CustomersPage.tsx (locked master-data template).
 *
 * Differences:
 *   - 3 filter sections (Status, Role, Customer FK)
 *   - Reset Password modal slot
 *   - Self-row gating via current-user lookup from auth slice
 */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'
import axios from 'axios'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'
import { useAppSelector } from '@/hooks/useAppSelector'
import { UserTable } from '@/features/users/UserTable'
import { UserViewDialog } from '@/features/users/UserViewDialog'
import { UserFormDialog } from '@/features/users/UserFormDialog'
import { UserDeleteDialog } from '@/features/users/UserDeleteDialog'
import { UserResetPasswordDialog } from '@/features/users/UserResetPasswordDialog'
import {
  useUser,
  useUsers,
  useToggleActiveUser,
} from '@/features/users/usersQueries'
import { ROLES } from '@/features/users/userSchema'
import { ROLE_LABEL } from '@/features/users/RoleBadge'
import { useCustomers } from '@/features/customers/customersQueries'
import { toast } from '@/lib/toast'
import type {
  User,
  UserListParams,
  UserRole,
} from '@/types/user'

const DEFAULT_LIMIT = 20

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

const ROLE_OPTIONS = [
  { label: 'All', value: undefined as string | undefined },
  ...ROLES.map((r) => ({ label: ROLE_LABEL[r as UserRole], value: r as string })),
]

type SortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'role'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLoginAt'
type SortOrder = 'asc' | 'desc'

const SORT_FIELDS: SortField[] = [
  'firstName',
  'lastName',
  'email',
  'role',
  'createdAt',
  'updatedAt',
  'lastLoginAt',
]

function parseSort(v: string | null): SortField {
  return SORT_FIELDS.includes(v as SortField) ? (v as SortField) : 'createdAt'
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
function parseRole(v: string | null): UserRole | undefined {
  return v && (ROLES as readonly string[]).includes(v) ? (v as UserRole) : undefined
}

const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

export function UsersPage() {
  const [params, setParams] = useSearchParams()
  const currentUser = useAppSelector((s) => s.auth.user)

  const page = parseInt1(params.get('page'), 1)
  const limit = parseInt1(params.get('limit'), DEFAULT_LIMIT)
  const sort = parseSort(params.get('sort'))
  const order = parseOrder(params.get('order'))
  const search = params.get('search') ?? ''
  const isActiveFilter = parseIsActive(params.get('isActive'))
  const roleFilter = parseRole(params.get('role'))
  const customerIDFilter = params.get('customerID') ?? undefined

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

  const queryParams = useMemo<UserListParams>(
    () => ({
      page,
      limit,
      sort,
      order,
      search: search || undefined,
      isActive: isActiveFilter,
      role: roleFilter,
      customerID: customerIDFilter,
    }),
    [page, limit, sort, order, search, isActiveFilter, roleFilter, customerIDFilter],
  )
  const { data, isFetching, isLoading } = useUsers(queryParams)
  const toggleActive = useToggleActiveUser()

  // Customer FK lookup for filter dropdown.
  const customersQ = useCustomers({ ...LOOKUP_PARAMS, sort: 'name' })
  const customerOptions = useMemo(
    () =>
      (customersQ.data?.data ?? []).map((c) => ({
        value: c.customerID,
        label: c.name,
      })),
    [customersQ.data],
  )

  // `?view=<id>` deep-links from Global Search auto-open the View modal.
  const viewParam = params.get('view')
  const [viewingId, setViewingId] = useState<string | null>(viewParam)
  const [editing, setEditing] = useState<User | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<User | null>(null)
  const [resetting, setResetting] = useState<User | null>(null)

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

  const applyFilters = (next: FilterValues) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev)
      if (next.isActive === undefined) p.delete('isActive')
      else p.set('isActive', next.isActive)
      if (next.role === undefined) p.delete('role')
      else p.set('role', next.role)
      if (next.customerID === undefined) p.delete('customerID')
      else p.set('customerID', next.customerID)
      p.set('page', '1')
      return p
    })
  }

  const filterValues: FilterValues = {
    isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
    role: roleFilter,
    customerID: customerIDFilter,
  }

  const handleToggleActive = (row: User) => {
    const nextActive = !row.isActive
    toggleActive.mutate(
      { user: row, nextActive },
      {
        onSuccess: () => {
          toast.success(
            `User "${row.firstName} ${row.lastName}" ${nextActive ? 'activated' : 'deactivated'}`,
          )
        },
        onError: (err) => {
          const msg = axios.isAxiosError(err)
            ? ((err.response?.data as { message?: string } | undefined)?.message ??
              err.message)
            : 'Unexpected error'
          toast.error(
            `Failed to ${nextActive ? 'activate' : 'deactivate'} user: ${msg}`,
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
    isActiveFilter !== undefined ||
    roleFilter ||
    customerIDFilter
  )
  const isEmpty = !isLoading && rows.length === 0 && !hasFilters
  const viewingFromList = viewingId
    ? (rows.find((r) => r.userID === viewingId) ?? null)
    : null
  // Fallback for `?view=<id>` deep-links to a row not on the current page.
  const { data: viewingFetched } = useUser(
    viewingId && !viewingFromList ? viewingId : null,
  )
  const viewing = viewingFromList ?? viewingFetched ?? null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Users' },
        ]}
        actions={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800"
          >
            <IconPlus size={16} /> New User
          </button>
        }
      />

      {isEmpty ? (
        <EmptyState onAdd={() => setCreating(true)} />
      ) : (
        <UserTable
          rows={rows}
          total={total}
          isLoading={isLoading}
          isFetching={isFetching}
          page={page}
          limit={limit}
          sort={sort}
          order={order}
          search={searchInput}
          currentUserID={currentUser?.userID ?? null}
          onSearchChange={setSearchInput}
          onView={(row) => setViewingId(row.userID)}
          onEdit={setEditing}
          onDelete={setDeleting}
          onToggleActive={handleToggleActive}
          onResetPassword={setResetting}
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
                  label: 'Role',
                  key: 'role',
                  options: ROLE_OPTIONS,
                },
                {
                  type: 'select',
                  label: 'Customer',
                  key: 'customerID',
                  options: customerOptions,
                  isLoading: customersQ.isLoading,
                  placeholder: 'All customers',
                },
              ]}
              values={filterValues}
              onApply={applyFilters}
            />
          }
        />
      )}

      <UserViewDialog
        user={viewing}
        onClose={closeView}
        onEdit={(u) => {
          closeView()
          setEditing(u)
        }}
        onDelete={(u) => {
          closeView()
          setDeleting(u)
        }}
      />

      <UserFormDialog
        open={creating}
        onOpenChange={setCreating}
        mode={{ kind: 'create' }}
      />

      <UserFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode={editing ? { kind: 'edit', user: editing } : { kind: 'create' }}
      />

      <UserDeleteDialog
        user={deleting}
        onClose={() => setDeleting(null)}
      />

      <UserResetPasswordDialog
        user={resetting}
        onClose={() => setResetting(null)}
      />
    </>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-md border border-border-color p-12 text-center">
      <h5 className="mb-2 text-gray-900">No users yet</h5>
      <p className="mb-5 text-sm text-default">Create your first one.</p>
      <button
        type="button"
        onClick={onAdd}
        className="btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800"
      >
        <IconPlus size={16} /> Add User
      </button>
    </div>
  )
}
