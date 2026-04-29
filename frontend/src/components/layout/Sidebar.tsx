/* DOMAIN */
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { ComponentType } from 'react'
import {
  IconLayoutDashboard,
  IconUsers,
  IconDatabase,
  IconSettings,
  IconTag,
  IconRuler,
  IconFlask,
  IconBook,
  IconClipboardList,
  IconStack2,
  IconDroplet,
  IconTool,
  IconAtom,
  IconCurrencyDollar,
  IconReceiptTax,
  IconUserCog,
  IconChevronLeft,
  IconChevronRight,
  IconHelp,
  IconLogout,
} from '@tabler/icons-react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { clearCredentials } from '@/features/auth/authSlice'
import { logoutApi } from '@/api/auth'
import { STORAGE_KEYS } from '@/lib/storageKeys'
import { useTenantSettings } from '@/contexts/SettingsContext'

type Icon = ComponentType<{ size?: number; className?: string }>

interface NavItem {
  label: string
  path: string
  icon: Icon
}

interface Section {
  id: string
  label: string
  icon: Icon
  menuTitle?: string
  items: NavItem[]
}

const SECTIONS: Section[] = [
  {
    id: 'home',
    label: 'Home',
    icon: IconLayoutDashboard,
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: IconLayoutDashboard },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: IconUsers,
    menuTitle: 'Customers',
    items: [
      { label: 'Customers',    path: '/customers',    icon: IconUsers },
      { label: 'Sources',      path: '/sources',      icon: IconDroplet },
      { label: 'Source Types', path: '/source-types', icon: IconStack2 },
    ],
  },
  {
    id: 'master-data',
    label: 'Master Data',
    icon: IconDatabase,
    menuTitle: 'Master Data',
    items: [
      { label: 'Categories',     path: '/categories',     icon: IconTag },
      { label: 'Units',          path: '/units',          icon: IconRuler },
      { label: 'Tests',          path: '/tests',          icon: IconFlask },
      { label: 'Methods',        path: '/methods',        icon: IconBook },
      { label: 'Specifications', path: '/specifications', icon: IconClipboardList },
      { label: 'Equipment',      path: '/equipment',      icon: IconTool },
      { label: 'OCM Elements',   path: '/ocm-elements',   icon: IconAtom },
      { label: 'Currencies',     path: '/currencies',     icon: IconCurrencyDollar },
      { label: 'Tax Rates',      path: '/tax-rates',      icon: IconReceiptTax },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    icon: IconSettings,
    menuTitle: 'Administration',
    items: [
      { label: 'Users',    path: '/users',    icon: IconUserCog },
      { label: 'Settings', path: '/settings', icon: IconSettings },
    ],
  },
]

// Left-column icon groups — vendor uses ul.nav.space-y-5 with li.space-y-1 inside.
// Each li is a visual group; space-y-5 separates groups, space-y-1 within a group.
const ICON_GROUPS: Section[][] = [
  [SECTIONS[0], SECTIONS[1]],
  [SECTIONS[2]],
  [SECTIONS[3]],
]

function getSectionFromPath(pathname: string): string {
  for (const section of SECTIONS) {
    if (section.items.some((item) => pathname.startsWith(item.path))) {
      return section.id
    }
  }
  return 'home'
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  onExpand: () => void
}

export function Sidebar({ collapsed, onToggle, onExpand }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { labName, labShortName } = useTenantSettings()

  const [activeSection, setActiveSection] = useState(() =>
    getSectionFromPath(location.pathname),
  )

  useEffect(() => {
    setActiveSection(getSectionFromPath(location.pathname))
  }, [location.pathname])

  const handleLogout = () => {
    const rt = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    if (rt) logoutApi(rt).catch(() => {})
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    dispatch(clearCredentials())
    navigate('/login', { replace: true })
  }

  return (
    /* Vendor: aside.two-col-sidebar */
    <aside className="two-col-sidebar" id="two-col-sidebar" aria-label="Main navigation">
      {/* Vendor: div.sidebar.sidebar-twocol — collapse handled by body.mini-sidebar (vendor pattern) */}
      <div className="sidebar sidebar-twocol flex border border-(--sidebar-border) rounded-lg bg-(--sidebar-bg)">
        {/* LEFT — twocol-mini.w-16 */}
        <div className="twocol-mini w-16">
          <div className="sidebar-left w-full flex items-center justify-between flex-col h-full p-3">
            <div>
              {/* Product brand — small gradient L (always visible). */}
              <Link to="/dashboard" className="logo-small mb-6 block">
                <div
                  className="flex size-8 items-center justify-center rounded-lg text-sm font-black text-white"
                  style={{
                    background:
                      'linear-gradient(21.05deg, #5711F6 -38.05%, #9614EB 37.02%, #FF1ADE 112.09%)',
                  }}
                >
                  L
                </div>
              </Link>

              <ul
                className="nav space-y-5 flex flex-col items-center"
                id="sidebar-tabs"
                role="tablist"
                aria-orientation="vertical"
              >
                {ICON_GROUPS.map((group, gi) => (
                  <li key={gi} className="space-y-1">
                    {group.map((section) => {
                      const isActive = section.id === activeSection
                      const SectionIcon = section.icon
                      return (
                        <a
                          key={section.id}
                          href="#"
                          role="tab"
                          aria-selected={isActive}
                          title={section.label}
                          className={isActive ? 'active' : ''}
                          onClick={(e) => {
                            e.preventDefault()
                            setActiveSection(section.id)
                            // Switching sections always reveals content;
                            // explicit chevron is the only way to collapse.
                            if (collapsed) onExpand()
                          }}
                        >
                          <span className="sidebar-icon">
                            <SectionIcon size={18} />
                          </span>
                        </a>
                      )
                    })}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vendor: sidebar-profile flex flex-col items-center gap-2 */}
            <div className="sidebar-profile flex flex-col items-center gap-2">
              <a href="#" title="Help" onClick={(e) => e.preventDefault()}>
                <span className="sidebar-icon">
                  <IconHelp size={18} />
                </span>
              </a>
              <a
                href="#"
                title="Sign Out"
                onClick={(e) => {
                  e.preventDefault()
                  handleLogout()
                }}
              >
                <span className="sidebar-icon">
                  <IconLogout size={18} />
                </span>
              </a>
              <a
                href="#"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={(e) => {
                  e.preventDefault()
                  onToggle()
                }}
              >
                <span className="sidebar-icon">
                  {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar-right relative p-3 w-56 */}
        <div className="sidebar-right relative p-3 w-56">
          <div>
            {/* Tenant brand — lab name (customer) + LIMS subtitle (product).
                See docs/decisions/ADR-frontend-tenant-branding.md */}
            <div className="sidebar-logo mb-6">
              <Link to="/dashboard" className="block leading-tight">
                <div className="text-xl font-bold text-(--color-gray-900)">
                  {labName}
                </div>
                <div className="text-xs text-(--color-default)">{labShortName}</div>
              </Link>
            </div>

            {/* Vendor: sidebar-scroll (height calc, hidden scrollbar) */}
            <div className="sidebar-scroll" style={{ scrollbarWidth: 'none' }}>
              <div className="tab-content" id="sidebar-tab" role="tabpanel">
                {SECTIONS.map((section) => {
                  const isShown = section.id === activeSection
                  return (
                    <div
                      key={section.id}
                      id={section.id}
                      role="tabpanel"
                      className={`${isShown ? 'show' : 'hidden'} tab-item`}
                    >
                      <ul>
                        {section.menuTitle && (
                          <li className="menu-title text-[13px] text-(--sidebar-title) font-semibold mb-3">
                            {section.menuTitle}
                          </li>
                        )}

                        {section.items.map((item) => {
                          const active = location.pathname.startsWith(item.path)
                          const ItemIcon = item.icon
                          return (
                            <li key={item.path}>
                              {/* Vendor inline classes (twoColSidebar.tsx:230-232) — vendor CSS
                                  provides padding/radius but NOT display:flex. Without these
                                  the <a> stays inline and SVG breaks to its own line, splitting
                                  the active gradient across two line-boxes. */}
                              <Link
                                to={item.path}
                                className={`${active ? 'active' : ''} flex items-center text-(--sidebar-menu-item) hover:bg-sidebar-menu-active-bg hover:text-(--sidebar-menu-active-item)`}
                              >
                                <ItemIcon size={16} className="me-2 shrink-0" />
                                <span>{item.label}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
