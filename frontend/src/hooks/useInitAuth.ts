/* REUSABLE */
import { useEffect } from 'react'
import axios from 'axios'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { setCredentials, setInitialized } from '@/features/auth/authSlice'
import { STORAGE_KEYS } from '@/lib/storageKeys'

const BASE_URL = import.meta.env.VITE_API_URL as string

export function useInitAuth(): boolean {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector((s) => s.auth.isInitialized)

  useEffect(() => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)

    if (!refreshToken || !userStr) {
      dispatch(setInitialized())
      return
    }

    let user
    try {
      user = JSON.parse(userStr)
    } catch {
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      dispatch(setInitialized())
      return
    }

    axios
      .post(`${BASE_URL}/auth/refresh`, { refreshToken })
      .then(({ data }) => {
        const { accessToken, refreshToken: newRefreshToken } = data.data as {
          accessToken: string
          refreshToken: string
        }
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken)
        dispatch(setCredentials({ accessToken, user }))
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        dispatch(setInitialized())
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isInitialized
}
