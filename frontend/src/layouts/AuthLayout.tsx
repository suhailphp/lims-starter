/* REUSABLE */
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Outlet />
    </div>
  )
}
