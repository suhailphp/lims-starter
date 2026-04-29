/* REUSABLE */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setCredentials } from '@/features/auth/authSlice'
import { loginApi } from '@/api/auth'
import { STORAGE_KEYS } from '@/lib/storageKeys'
import { userActivitiesKey, timelineKey } from '@/features/userActivities/queries'
import { notificationsKey } from '@/features/notifications/queries'
import type { LoginRequest } from '@/types/auth'

export function useLogin() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: ({ accessToken, refreshToken, user }) => {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
      dispatch(setCredentials({ accessToken, user }))
      // Invalidate caches that key off "current user" so a fresh login
      // never sees the previous user's data. Notification keys aren't
      // user-scoped (singleton), so without this the bell badge would
      // briefly show the prior user's count via placeholderData.
      queryClient.invalidateQueries({ queryKey: userActivitiesKey.all })
      queryClient.invalidateQueries({ queryKey: timelineKey.all })
      queryClient.invalidateQueries({ queryKey: notificationsKey.all })
    },
  })
}
