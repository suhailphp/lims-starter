/* REUSABLE */
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'

export function PublicRoute() {
  const { accessToken } = useAppSelector((s) => s.auth)
  return accessToken ? <Navigate to="/dashboard" replace /> : <Outlet />
}
