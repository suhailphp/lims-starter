/* DOMAIN — User list table.
 * Pattern reference: features/customers/CustomerTable.tsx (locked template).
 *
 * Differences vs Customer:
 *   - Role badge column
 *   - Customer column (only filled when role=CUSTOMER)
 *   - Last-login column with relative time
 *   - Lockout icon + tooltip on Status column
 *   - Action menu adds "Reset Password" between Activate/Deactivate and Delete
 *   - Self-row gating: hide Edit / Activate-Deactivate / Reset / Delete on
 *     the current user's own row (admin must ask another admin)
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { DataTable, type DataTableSortEvent } from 'primereact/datatable'
import { Column } from 'primereact/column'
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
  IconKey,
  IconLock,
  IconPencil,
  IconPlayerPause,
  IconSortAscending,
  IconTrash,
} from '@tabler/icons-react'
import { RoleBadge } from './RoleBadge'
import { Avatar } from '@/components/ui/Avatar'
import type { User } from '@/types/user'

type SortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'role'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLoginAt'
type SortDir = 'asc' | 'desc'

interface Props {
  rows: User[]
  total: number
  isLoading: boolean
  isFetching: boolean
  page: number
  limit: number
  sort: SortField
  order: SortDir
  search: string
  /** userID of the currently-signed-in user; used to gate self-row actions. */
  currentUserID: string | null
  onSearchChange: (q: string) => void
  onView: (row: User) => void
  onEdit: (row: User) => void
  onDelete: (row: User) => void
  onToggleActive: (row: User) => void
  onResetPassword: (row: User) => void
  onPageChange: (page: number, limit: number) => void
  onSortChange: (sort: SortField, order: SortDir) => void
  filterMenu?: ReactNode
}

export function UserTable({
  rows,
  total,
  isLoading,
  isFetching,
  page,
  limit,
  sort,
  order,
  search,
  currentUserID,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
  onResetPassword,
  onPageChange,
  onSortChange,
  filterMenu,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.min(page, totalPages)
  const startEntry = total === 0 ? 0 : (currentPage - 1) * limit + 1
  const endEntry = Math.min(currentPage * limit, total)

  const showSkeletons = isLoading && rows.length === 0
  const showProgressBar = isFetching && !showSkeletons

  const skeletonRows: User[] = showSkeletons
    ? Array.from({ length: 5 }, (_, i) => ({ userID: `sk-${i}` }) as unknown as User)
    : []
  const tableValue = showSkeletons ? skeletonRows : rows

  return (
    <div className="bg-white rounded-md border border-border-color custom-datatable relative">
      {showProgressBar && (
        <div className="absolute top-0 start-0 w-full h-1 bg-border-color rounded-t-md overflow-hidden z-10">
          <div className="h-full w-1/3 bg-primary animate-[progress_1.2s_ease-in-out_infinite]" />
        </div>
      )}
      <div className="px-4 py-3 flex items-center justify-between flex-wrap gap-2 custom-table-header">
        <h5 className="text-[17.5px]">Users</h5>
        <div className="flex flex-wrap items-center gap-2">
          <div className="dt-search">
            <input
              type="search"
              className="dt-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search users"
            />
          </div>
          {filterMenu}
          <SortMenu sort={sort} order={order} onSortChange={onSortChange} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          value={tableValue}
          lazy
          totalRecords={total}
          sortField={sort}
          sortOrder={order === 'asc' ? 1 : -1}
          onSort={(e: DataTableSortEvent) => {
            const field = (e.sortField ?? sort) as SortField
            const dir: SortDir = (e.sortOrder ?? 1) === 1 ? 'asc' : 'desc'
            onSortChange(field, dir)
          }}
          className="min-w-full divide-y divide-border-color"
          responsiveLayout="scroll"
          dataKey="userID"
          emptyMessage={
            <div className="py-10 text-center text-sm text-default">
              No users match your filters.
            </div>
          }
        >
          <Column
            field="firstName"
            header="Name"
            sortable
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? (
                <span className="inline-flex items-center gap-3">
                  <Skel w="32px" rounded />
                  <Skel w="120px" />
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onView(row)}
                  className="inline-flex items-center gap-3 text-left cursor-pointer hover:text-primary text-dark font-medium"
                >
                  <Avatar
                    photo={row.profilePhoto ?? null}
                    name={`${row.firstName} ${row.lastName}`}
                    size="sm"
                  />
                  <span className="hover:underline">
                    {row.firstName} {row.lastName}
                  </span>
                </button>
              )
            }
          />
          <Column
            field="email"
            header="Email"
            sortable
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? <Skel w="70%" /> : row.email
            }
          />
          <Column
            field="role"
            header="Role"
            sortable
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? <Skel w="60%" rounded /> : <RoleBadge role={row.role} />
            }
          />
          <Column
            field="customer"
            header="Customer"
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? (
                <Skel w="60%" />
              ) : row.customer ? (
                row.customer.name
              ) : (
                <span className="text-gray-400">—</span>
              )
            }
          />
          <Column
            field="lastLoginAt"
            header="Last Login"
            sortable
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? (
                <Skel w="55%" />
              ) : row.lastLoginAt ? (
                formatRelative(row.lastLoginAt)
              ) : (
                <span className="text-gray-400">Never</span>
              )
            }
          />
          <Column
            field="isActive"
            header="Status"
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? (
                <Skel w="50%" rounded />
              ) : (
                <StatusCell user={row} />
              )
            }
          />
          <Column
            header="Action"
            className="px-4 py-3 text-start text-dark"
            body={(row: User) =>
              showSkeletons ? (
                <Skel w="32px" rounded />
              ) : row.userID === currentUserID ? (
                <span className="text-xs text-gray-400 italic">You</span>
              ) : (
                <RowMenu
                  row={row}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleActive={onToggleActive}
                  onResetPassword={onResetPassword}
                />
              )
            }
          />
        </DataTable>
      </div>

      <div className="grid grid-cols-12 px-4 gap-2 py-3">
        <div className="sm:col-span-4 col-span-12">
          <div className="flex justify-center sm:block">
            <div className="dt-length">
              <label htmlFor="users-page-size" className="text-sm">
                Show{' '}
                <select
                  id="users-page-size"
                  className="dt-input"
                  value={limit}
                  onChange={(e) => onPageChange(1, Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>{' '}
                Entries
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 col-span-12 flex items-center justify-center">
          <div className="flex justify-center sm:block">
            <div className="dt-paging">
              <nav aria-label="pagination">
                <button
                  type="button"
                  className={`dt-paging-button first ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => onPageChange(1, limit)}
                  disabled={currentPage === 1}
                  aria-label="First page"
                >
                  «
                </button>
                <button
                  type="button"
                  className={`dt-paging-button previous ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => onPageChange(currentPage - 1, limit)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <IconChevronLeft size={14} />
                </button>
                {pageWindow(currentPage, totalPages).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`dt-paging-button ${currentPage === num ? 'current' : ''}`}
                    onClick={() => onPageChange(num, limit)}
                    aria-current={currentPage === num ? 'page' : undefined}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  className={`dt-paging-button next ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => onPageChange(currentPage + 1, limit)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <IconChevronRight size={14} />
                </button>
                <button
                  type="button"
                  className={`dt-paging-button last ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => onPageChange(totalPages, limit)}
                  disabled={currentPage === totalPages}
                  aria-label="Last page"
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 col-span-12 flex items-center sm:justify-end justify-center">
          <div className="flex justify-center sm:block">
            <div className="dt-info text-sm" aria-live="polite" role="status">
              {startEntry} - {endEntry} of {total} Entries
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusCell({ user }: { user: User }) {
  const isLocked =
    user.lockedUntil != null && new Date(user.lockedUntil) > new Date()

  if (isLocked) {
    return (
      <span
        className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger"
        title={`Locked until ${new Date(user.lockedUntil!).toLocaleString()}`}
      >
        <IconLock size={12} className="me-1" />
        Locked
      </span>
    )
  }
  return user.isActive ? (
    <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
      <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-default border border-border-color">
      <span className="bg-gray-400 w-[5px] h-[5px] block rounded-full me-1" />
      Inactive
    </span>
  )
}

function Skel({ w, rounded = false }: { w: string; rounded?: boolean }) {
  return (
    <span
      className={`inline-block h-3.5 bg-border-color animate-pulse ${rounded ? 'rounded-full' : 'rounded'}`}
      style={{ width: w }}
    />
  )
}

const SORT_OPTIONS: { label: string; sort: SortField; order: SortDir }[] = [
  { label: 'Newest',          sort: 'createdAt',   order: 'desc' },
  { label: 'Oldest',          sort: 'createdAt',   order: 'asc'  },
  { label: 'Recently Updated', sort: 'updatedAt',  order: 'desc' },
  { label: 'Last Login',      sort: 'lastLoginAt', order: 'desc' },
  { label: 'First Name (A-Z)', sort: 'firstName',  order: 'asc'  },
  { label: 'Last Name (A-Z)', sort: 'lastName',    order: 'asc'  },
  { label: 'Email (A-Z)',     sort: 'email',       order: 'asc'  },
  { label: 'Role (A-Z)',      sort: 'role',        order: 'asc'  },
]

function SortMenu({
  sort,
  order,
  onSortChange,
}: {
  sort: SortField
  order: SortDir
  onSortChange: (sort: SortField, order: SortDir) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn h-[35px] cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
      >
        <IconSortAscending size={16} />
        Sort
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-10"
        >
          <div className="p-2 space-y-1">
            {SORT_OPTIONS.map((opt) => {
              const active = sort === opt.sort && order === opt.order
              return (
                <button
                  key={opt.label}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onSortChange(opt.sort, opt.order)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center px-4 py-2 rounded-lg text-sm hover:bg-primary-50 hover:text-primary focus:outline-none ${active ? 'text-primary bg-primary-50' : 'text-gray-900'}`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function RowMenu({
  row,
  onEdit,
  onDelete,
  onToggleActive,
  onResetPassword,
}: {
  row: User
  onEdit: (row: User) => void
  onDelete: (row: User) => void
  onToggleActive: (row: User) => void
  onResetPassword: (row: User) => void
}) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; right: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (btnRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return
      }
      setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('mousedown', handler)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      document.removeEventListener('mousedown', handler)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [open])

  const toggle = () => {
    if (open) {
      setOpen(false)
      return
    }
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    setCoords({
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
    })
    setOpen(true)
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-light"
      >
        <IconDotsVertical size={16} />
      </button>
      {open && coords &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: 'fixed',
              top: coords.top,
              right: coords.right,
              zIndex: 9999,
            }}
            className="min-w-50 bg-white border border-border-color shadow rounded-lg"
          >
            <div className="p-2 space-y-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  onEdit(row)
                }}
                className="flex items-center cursor-pointer w-full px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary"
              >
                <IconPencil size={14} className="me-2" />
                Edit
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  onToggleActive(row)
                }}
                className="flex items-center cursor-pointer w-full px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary"
              >
                {row.isActive ? (
                  <IconPlayerPause size={14} className="me-2" />
                ) : (
                  <IconCheck size={14} className="me-2" />
                )}
                {row.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  onResetPassword(row)
                }}
                className="flex items-center cursor-pointer w-full px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary"
              >
                <IconKey size={14} className="me-2" />
                Reset Password
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  onDelete(row)
                }}
                className="flex items-center cursor-pointer w-full px-4 py-1.75 rounded-lg text-sm text-default hover:bg-danger-50 hover:text-danger"
              >
                <IconTrash size={14} className="me-2" />
                Delete
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

function formatRelative(iso: string): string {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function pageWindow(current: number, total: number): number[] {
  const max = 5
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  let start = Math.max(1, current - 2)
  const end = Math.min(total, start + max - 1)
  start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
