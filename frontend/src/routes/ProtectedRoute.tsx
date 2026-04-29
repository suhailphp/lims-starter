/* REUSABLE */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'

export function ProtectedRoute() {
  const { accessToken, user, isInitialized } = useAppSelector((s) => s.auth)
  const location = useLocation()

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-light">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  /* Force password change before accessing any other protected route */
  if (user?.mustChangePassword && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />
  }

  return <Outlet />
}
