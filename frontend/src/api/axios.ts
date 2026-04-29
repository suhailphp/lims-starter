/* REUSABLE */
import axios from 'axios'
import { store } from '@/store'
import { setCredentials, clearCredentials } from '@/features/auth/authSlice'
import { STORAGE_KEYS } from '@/lib/storageKeys'

const BASE_URL = import.meta.env.VITE_API_URL as string

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

/* Attach Bearer token from Redux on every request */
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // FormData bodies need a multipart Content-Type WITH boundary — only the
  // browser can produce the boundary. The shared client's default
  // `application/json` would silently override the browser's auto-set
  // value, so we strip it whenever the body is FormData. Without this,
  // multer sees no multipart and req.file is undefined.
  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    if (config.headers && 'Content-Type' in config.headers) {
      delete (config.headers as Record<string, unknown>)['Content-Type']
    }
  }
  return config
})

/* 401 handling: attempt silent refresh, then retry once */
let isRefreshing = false
let waitQueue: Array<(token: string) => void> = []

function drainQueue(token: string) {
  waitQueue.forEach((cb) => cb(token))
  waitQueue = []
}

function clearAuth() {
  store.dispatch(clearCredentials())
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)
  waitQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    /* Never retry auth endpoints — let the caller handle the error directly */
    if ((original.url as string)?.includes('/auth/')) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    if (!refreshToken) {
      clearAuth()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        waitQueue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`
          resolve(apiClient(original))
        })
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = data.data as { accessToken: string; refreshToken: string }

      /* Reuse stored user — refresh endpoint doesn't return it */
      const storedUser = (() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) ?? 'null') }
        catch { return null }
      })()

      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken)

      if (storedUser) {
        store.dispatch(setCredentials({ accessToken, user: storedUser }))
      } else {
        /* No user in storage — can't hydrate; force re-login */
        clearAuth()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      drainQueue(accessToken)
      original.headers.Authorization = `Bearer ${accessToken}`
      return apiClient(original)
    } catch {
      clearAuth()
      window.location.href = '/login'
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  },
)
