/* REUSABLE */
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

const STORAGE_KEY = 'sidebar-collapsed'

export function MainLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  )

  // Vendor's collapse mechanism: toggle .mini-sidebar on <body>.
  // Vendor CSS in styles/vendor/style.css repositions .navbar-header
  // and .page-wrapper automatically — no JS-driven margins needed.
  useEffect(() => {
    document.body.classList.toggle('mini-sidebar', collapsed)
    return () => document.body.classList.remove('mini-sidebar')
  }, [collapsed])

  const handleToggle = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  // Section switch always reveals content; chevron is the only collapse path.
  const handleExpand = () => {
    if (!collapsed) return
    setCollapsed(false)
    localStorage.setItem(STORAGE_KEY, 'false')
  }

  return (
    <div className="main-wrapper">
      <Sidebar collapsed={collapsed} onToggle={handleToggle} onExpand={handleExpand} />
      <Header />
      <div className="page-wrapper">
        <div className="content p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
