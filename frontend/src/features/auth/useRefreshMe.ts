/* REUSABLE — refreshes the auth slice from /api/auth/me.
 *
 * Use after a user edits their own record (photo upload, name change) so the
 * header avatar / dropdown reflect server state without forcing a re-login.
 *
 * Persists to localStorage so the next page reload also sees the fresh user.
 */
import { useCallback } from 'react'
import { getMeApi } from '@/api/auth'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setCredentials } from '@/features/auth/authSlice'
import { STORAGE_KEYS } from '@/lib/storageKeys'

export function useRefreshMe(): () => Promise<void> {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((s) => s.auth.accessToken)

  return useCallback(async () => {
    if (!accessToken) return
    try {
      const fresh = await getMeApi()
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fresh))
      dispatch(setCredentials({ accessToken, user: fresh }))
    } catch {
      // Silent — header staleness is cosmetic; auth still works on next request.
    }
  }, [accessToken, dispatch])
}
