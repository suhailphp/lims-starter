/* DOMAIN */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { clearCredentials } from '@/features/auth/authSlice'
import { changePasswordApi } from '@/api/auth'
import { STORAGE_KEYS } from '@/lib/storageKeys'
import { Logo } from '@/components/Logo'

const schema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[a-zA-Z]/, 'Must contain at least one letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

function formatApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }
  return 'An unexpected error occurred. Please try again.'
}

export function ChangePasswordPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      changePasswordApi({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      dispatch(clearCredentials())
      navigate('/login', {
        replace: true,
        state: { message: 'Password changed successfully. Please sign in with your new password.' },
      })
    },
  })

  const onSubmit = (data: FormValues) => mutation.mutate(data)

  return (
    <div className="flex min-h-screen items-center justify-center bg-light p-6">
      <div className="w-full max-w-[420px]">
        <div className="rounded-xl border border-border-color bg-white p-8 shadow-sm">
          <div className="mb-6 flex justify-center">
            <Logo size="md" />
          </div>

          <div className="mb-6 text-center">
            <h4 className="mb-1 text-gray-900">Change Password</h4>
            {user?.mustChangePassword ? (
              <p className="text-sm text-warning-600">
                You must set a new password before continuing.
              </p>
            ) : (
              <p className="text-sm text-default">Update your account password.</p>
            )}
          </div>

          {mutation.isError && (
            <div className="mb-4 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700">
              {formatApiError(mutation.error)}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <PasswordField
              id="currentPassword"
              label="Current password"
              show={showCurrent}
              onToggle={() => setShowCurrent((v) => !v)}
              registration={register('currentPassword')}
              error={errors.currentPassword?.message}
            />
            <PasswordField
              id="newPassword"
              label="New password"
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              registration={register('newPassword')}
              error={errors.newPassword?.message}
            />
            <PasswordField
              id="confirmPassword"
              label="Confirm new password"
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              registration={register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              disabled={mutation.isPending}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(21.05deg, #5711F6 -38.05%, #9614EB 37.02%, #FF1ADE 112.09%)' }}
            >
              {mutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving…
                </>
              ) : (
                'Change Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

interface PasswordFieldProps {
  id: string
  label: string
  show: boolean
  onToggle: () => void
  registration: ReturnType<ReturnType<typeof useForm<FormValues>>['register']>
  error?: string
}

function PasswordField({ id, label, show, onToggle, registration, error }: PasswordFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...registration}
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete={id === 'currentPassword' ? 'current-password' : 'new-password'}
          className={`block w-full rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-all focus:ring-0
            ${error ? 'border-danger focus:border-danger' : 'border-border-color focus:border-primary'}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
          aria-label={show ? 'Hide' : 'Show'}
        >
          {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  )
}
