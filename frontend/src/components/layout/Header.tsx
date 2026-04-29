/* DOMAIN */
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  IconSun,
  IconMoon,
  IconLock,
  IconLogout,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconUser,
  IconSettings,
  IconSearch,
} from '@tabler/icons-react'
import { NotificationBell } from '@/components/layout/NotificationBell'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { toggleTheme } from '@/features/theme/themeSlice'
import { clearCredentials } from '@/features/auth/authSlice'
import { logoutApi } from '@/api/auth'
import { STORAGE_KEYS } from '@/lib/storageKeys'
import { Avatar } from '@/components/ui/Avatar'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

/* Vendor header.tsx:109 — toggles browser fullscreen on documentElement. */
function useFullscreen() {
  const [isFs, setIsFs] = useState(
    typeof document !== 'undefined' && !!document.fullscreenElement,
  )
  useEffect(() => {
    const handler = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])
  const toggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }
  return { isFs, toggle }
}

export function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const theme = useAppSelector((s) => s.theme.mode)
  const user = useAppSelector((s) => s.auth.user)
  const { isFs, toggle: toggleFs } = useFullscreen()

  // Header search input. Local state seeded from `?q=` so the header bar
  // always reflects the current query when the user lands on /search.
  // Re-syncs from URL on URL/route change UNLESS the input is focused
  // (so we don't stomp on what the user is typing).
  const [params] = useSearchParams()
  const urlQ = location.pathname.startsWith('/search') ? (params.get('q') ?? '') : ''
  const headerInputRef = useRef<HTMLInputElement>(null)
  const [headerQ, setHeaderQ] = useState(urlQ)
  useEffect(() => {
    if (document.activeElement !== headerInputRef.current) {
      setHeaderQ(urlQ)
    }
  }, [urlQ, location.pathname])

  // ⌘K / Ctrl+K — focus the header input. On /search the page mounts its
  // own ⌘K hook to focus the (more prominent) page input, so we no-op
  // there to avoid double-focus tug.
  useKeyboardShortcut('k', () => {
    if (location.pathname.startsWith('/search')) return
    headerInputRef.current?.focus()
    headerInputRef.current?.select()
  }, { meta: true })

  const submitHeaderSearch = () => {
    const v = headerQ.trim()
    if (v.length < 2) return
    if (location.pathname.startsWith('/search')) {
      // Preserve `?category=` etc. — only swap `q`. Replace history so
      // back-button still returns to whatever page launched the search.
      const next = new URLSearchParams(params)
      next.set('q', v)
      navigate(`/search?${next.toString()}`, { replace: true })
    } else {
      navigate(`/search?q=${encodeURIComponent(v)}`)
    }
  }

  const handleHeaderSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    submitHeaderSearch()
  }

  const headerSubmitDisabled = headerQ.trim().length < 2

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleLogout = () => {
    setOpen(false)
    const rt = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    if (rt) logoutApi(rt).catch(() => {})
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    dispatch(clearCredentials())
    // Drop every cached query so the next user starts with a clean slate.
    // Without this, singleton keys like ['notifications', 'unread-count']
    // surface the previous user's data via placeholderData on remount.
    queryClient.clear()
    navigate('/login', { replace: true })
  }

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Account'

  return (
    /* Vendor: .navbar-header — sticky, auto-margins to align with sidebar */
    <header className="navbar-header">
      <div className="topbar-menu flex items-center justify-between gap-2">
        {/* Search — vendor header.tsx:161 styling. Search-icon button
          * sits inside the input (same slot the ⌘K kbd lived in), uses
          * vendor's neutral topbar tokens. Type + Enter OR click icon →
          * /search?q=<value>. ⌘K focuses this input from anywhere
          * (on /search the page-level input claims ⌘K instead). */}
        <div className="header-search hidden lg:block">
          <div className="relative">
            <input
              ref={headerInputRef}
              type="text"
              value={headerQ}
              onChange={(e) => setHeaderQ(e.target.value)}
              onKeyDown={handleHeaderSearchKeyDown}
              placeholder="Search..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Global search"
              className="ps-3 pe-10 py-1.5 h-9.5 bg-(--topbar-input-bg) border border-(--topbar-input-border) text-(--topbar-input-color) rounded-lg focus:border-(--topbar-input-border) placeholder:(-topbar-input-placeholder) focus:ring-0"
            />
            <button
              type="button"
              onClick={submitHeaderSearch}
              disabled={headerSubmitDisabled}
              aria-label="Search"
              title={headerSubmitDisabled ? 'Type at least 2 characters' : 'Search'}
              className="cursor-pointer w-7 h-7 bg-(--topbar-input-bg) text-(--topbar-input-icon) flex items-center justify-center absolute end-1.5 top-1/2 -translate-y-1/2 rounded-md hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-(--topbar-input-icon)"
            >
              <IconSearch size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fullscreen toggle — vendor header.tsx:404 */}
          <button
            onClick={toggleFs}
            className="topbar-link items-center justify-center"
            aria-label="Toggle fullscreen"
            title={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFs ? <IconArrowsMinimize size={18} /> : <IconArrowsMaximize size={18} />}
          </button>

          {/* Notification bell — wired to /api/notifications/me/unread-count.
            * Vendor reference: header.tsx:423. */}
          <NotificationBell />

          {/* Theme toggle — vendor: .topbar-link (size-10 rounded-full + topbar tokens) */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="topbar-link items-center justify-center"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>

          {/* User menu */}
          <div className="profile-dropdown relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              aria-label="User menu"
              aria-expanded={open}
              aria-haspopup="true"
            >
              <Avatar
                photo={user?.profilePhoto ?? null}
                name={fullName}
                size="sm"
              />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-(--sidebar-border) bg-(--color-white) shadow-lg">
                <div className="border-b border-(--sidebar-border) px-4 py-3">
                  <p className="text-sm font-semibold text-(--color-gray-900)">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-(--color-default)">{user?.email}</p>
                  <span className="mt-1.5 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {user?.role}
                  </span>
                </div>

                <div className="p-1">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-(--color-gray-700) hover:bg-primary-50 hover:text-primary"
                  >
                    <IconUser size={15} />
                    View Profile
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link
                      to="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-(--color-gray-700) hover:bg-primary-50 hover:text-primary"
                    >
                      <IconSettings size={15} />
                      Settings
                    </Link>
                  )}
                  <Link
                    to="/change-password"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-(--color-gray-700) hover:bg-primary-50 hover:text-primary"
                  >
                    <IconLock size={15} />
                    Change Password
                  </Link>
                </div>

                <div className="border-t border-(--sidebar-border) p-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger-50"
                  >
                    <IconLogout size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
