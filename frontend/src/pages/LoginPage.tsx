/* DOMAIN */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IconEye, IconEyeOff, IconMail, IconAlertCircle } from '@tabler/icons-react'
import axios from 'axios'
import { Logo } from '@/components/Logo'
import { useTenantSettings } from '@/contexts/SettingsContext'
import { useLogin } from '@/features/auth/useLogin'
import { summarizeFormErrors } from '@/utils/formErrors'
import type { LoginRequest } from '@/types/auth'

const schema = z.object({
  email: z.string().min(1, 'Email is required').refine(
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    'Invalid email address',
  ),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

function formatApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg: string = error.response?.data?.message ?? error.message
    if (msg.startsWith('Account locked until ')) {
      const isoStr = msg.replace('Account locked until ', '')
      try {
        const formatted = new Date(isoStr).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
        return `Account locked. Try again after ${formatted}.`
      } catch {
        return msg
      }
    }
    return msg
  }
  return 'An unexpected error occurred. Please try again.'
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = (location.state as { message?: string } | null)?.message

  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const login = useLogin()
  const { labName, labShortName, labLogoDataUrl } = useTenantSettings()

  const clearError = () => setApiError(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const emailValue = watch('email')
  const passwordValue = watch('password')

  const onSubmit = (data: LoginRequest) => {
    setApiError(null)
    login.mutate(data, {
      onSuccess: ({ user }) => {
        if (user.mustChangePassword) {
          navigate('/change-password', { replace: true })
        } else {
          navigate('/dashboard', { replace: true })
        }
      },
      onError: (err) => setApiError(formatApiError(err)),
    })
  }

  return (
    <div className="grid h-full grid-cols-1 gap-x-6 p-3 lg:grid-cols-12">
      {/* ── Left decorative panel (xl only) ───────────────────────── */}
      <div className="col-span-5 hidden h-full xl:block">
        <div
          className="brand-panel relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl px-10"
          style={{ background: 'linear-gradient(180deg, #210426 0%, #7A13F0 100%)' }}
        >
          {/* Corner shapes */}
          <div className="absolute -right-9 -top-9 h-20 w-20 rounded-full bg-white/20" />
          <div className="absolute -bottom-9 -left-9 h-20 w-20 rounded-full bg-white/20" />

          {/* Center content */}
          <div className="z-10 flex flex-col items-center gap-6 text-center">
            {/* Decorative icon mark — uploaded logo if available, else fallback */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm overflow-hidden">
              {labLogoDataUrl ? (
                <img
                  src={labLogoDataUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <span className="text-4xl font-black text-white">
                  {(labShortName?.[0] ?? 'L').toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">{labName}</h2>
              <p className="max-w-xs text-sm leading-relaxed text-white/70">
                Laboratory Information Management System for oil, water, and lubricant testing operations
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Sample Tracking', 'Test Results', 'PDF Reports', 'Client Portal'].map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom tagline */}
          <p className="absolute bottom-6 left-6 right-6 z-10 text-center text-xs italic text-white/50">
            Precision. Compliance. Clarity.
          </p>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────────────── */}
      <div className="col-span-12 flex h-full items-center justify-center p-6 xl:col-span-7">
        <div className="flex w-full max-w-[420px] flex-col gap-6">

          {/* Logo */}
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h4 className="mb-1 text-gray-900">Welcome Back</h4>
            <p className="text-sm text-default">Sign in to your LIMS account</p>
          </div>

          {/* Success message (after password change redirect) */}
          {successMessage && (
            <div className="rounded-lg border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700">
              {successMessage}
            </div>
          )}

          {/* API error banner — persists until user types */}
          {apiError && (
            <div className="flex items-start gap-3 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3">
              <IconAlertCircle size={16} className="mt-0.5 shrink-0 text-danger" />
              <p className="text-sm text-danger-700">{apiError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit, (errs) => {
              console.warn('[LoginPage] Validation failed', errs)
              setApiError(summarizeFormErrors(errs))
            })}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div className="relative">
              <input
                {...register('email', { onChange: clearError })}
                id="email"
                type="email"
                placeholder=" "
                autoComplete="email"
                className={`peer block w-full rounded-lg border bg-white py-3 pl-3 pr-10 text-sm text-gray-900 outline-none transition-all
                  focus:ring-0
                  ${errors.email
                    ? 'border-danger focus:border-danger'
                    : 'border-border-color focus:border-primary'
                  }
                  ${emailValue ? 'pt-5 pb-1.5' : 'pt-3 pb-3'}`}
              />
              <label
                htmlFor="email"
                className={`pointer-events-none absolute left-3 z-10 bg-white px-0.5 text-gray-400 transition-all duration-200
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
                  peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary
                  ${emailValue
                    ? 'top-1 translate-y-0 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-sm'
                  }`}
              >
                Email address
              </label>
              <span className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <IconMail size={16} />
              </span>
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                {...register('password', { onChange: clearError })}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                autoComplete="current-password"
                className={`peer block w-full rounded-lg border bg-white py-3 pl-3 pr-10 text-sm text-gray-900 outline-none transition-all
                  focus:ring-0
                  ${errors.password
                    ? 'border-danger focus:border-danger'
                    : 'border-border-color focus:border-primary'
                  }
                  ${passwordValue ? 'pt-5 pb-1.5' : 'pt-3 pb-3'}`}
              />
              <label
                htmlFor="password"
                className={`pointer-events-none absolute left-3 z-10 bg-white px-0.5 text-gray-400 transition-all duration-200
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
                  peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary
                  ${passwordValue
                    ? 'top-1 translate-y-0 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-sm'
                  }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={login.isPending}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(21.05deg, #5711F6 -38.05%, #9614EB 37.02%, #FF1ADE 112.09%)' }}
            >
              {login.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
