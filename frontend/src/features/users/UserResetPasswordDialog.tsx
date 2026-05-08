/* DOMAIN — User reset-password modal.
 *
 * Two-step UX:
 *   Step 1 (Form):
 *     - Mode radio: "Generate temporary password" (default) | "Type a password"
 *     - Typed mode reveals new + confirm fields with show/hide toggle
 *   Step 2 (Result):
 *     - Backend returns the temp password ONCE
 *     - Modal swaps to a result panel: read-only password, copy button, warning
 *     - User must close manually; no toast (the panel IS the feedback)
 *
 * Backend: POST /api/users/:userID/reset-password
 *   Body: {} → server-generated 12-char password
 *   Body: { newPassword } → admin-typed password (validated against the same rule)
 */
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { IconCheck, IconCopy, IconEye, IconEyeOff } from '@tabler/icons-react'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import { summarizeFormErrors } from '@/utils/formErrors'
import {
  resetPasswordFormSchema,
  type ResetPasswordFormValues,
} from './userSchema'
import { useResetUserPassword } from './usersQueries'
import type { User } from '@/types/user'

interface Props {
  user: User | null
  onClose: () => void
}

const FORM_DEFAULTS: ResetPasswordFormValues = {
  mode: 'generate',
  newPassword: '',
  confirmPassword: '',
}

export function UserResetPasswordDialog({ user, onClose }: Props) {
  const reset = useResetUserPassword()
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [bannerError, setBannerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: 'onTouched',
    defaultValues: FORM_DEFAULTS,
  })

  const mode = useWatch({ control, name: 'mode' })
  const isTyped = mode === 'typed'

  // Reset internal state every time the dialog opens for a new user.
  useEffect(() => {
    if (!user) return
    resetForm(FORM_DEFAULTS)
    setTempPassword(null)
    setBannerError(null)
    setShowPassword(false)
    setCopied(false)
  }, [user, resetForm])

  const onSubmit = handleSubmit(
    async (values) => {
      if (!user) return
      setBannerError(null)
      try {
        const result = await reset.mutateAsync({
          userID: user.userID,
          input: isTyped ? { newPassword: values.newPassword } : {},
        })
        setTempPassword(result.tempPassword)
      } catch (err) {
        setBannerError(formatErr(err))
      }
    },
    (errs) => {
      // Validation failure — surface in the same banner the API errors use.
      console.warn('[UserResetPasswordDialog] Validation failed', errs)
      setBannerError(summarizeFormErrors(errs))
    },
  )

  const handleCopy = async () => {
    if (!tempPassword) return
    try {
      await navigator.clipboard.writeText(tempPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked; the password is still visible to manually copy.
    }
  }

  const handleClose = () => {
    setTempPassword(null)
    setBannerError(null)
    onClose()
  }

  if (!user) return null

  // ---- Step 2 — Result panel (one-shot reveal) ----
  if (tempPassword) {
    return (
      <Dialog
        open={!!user}
        onOpenChange={(o) => !o && handleClose()}
        title="Password reset"
        maxWidth="480px"
        footer={
          <button
            type="button"
            onClick={handleClose}
            className="btn bg-primary border border-primary text-white hover:bg-primary-800"
          >
            Done
          </button>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-default">
            New temporary password for{' '}
            <strong className="text-dark">
              {user.firstName} {user.lastName}
            </strong>
            . They will be required to change it on next sign-in.
          </p>

          <div className="rounded-lg border border-border-color bg-light px-3 py-2 flex items-center gap-2">
            <code className="flex-1 text-sm font-mono text-dark break-all">
              {tempPassword}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="btn h-8 px-2 inline-flex items-center gap-x-1 text-xs rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
              aria-label="Copy password"
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <p className="rounded-lg border border-warning bg-warning-50 px-3 py-2 text-xs text-warning-700">
            Share this with the user out-of-band (in person, secure chat, etc.).
            It will <strong>not</strong> be shown again.
          </p>
        </div>
      </Dialog>
    )
  }

  // ---- Step 1 — Form ----
  return (
    <Dialog
      open={!!user}
      onOpenChange={(o) => !o && handleClose()}
      title="Reset password"
      maxWidth="480px"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="reset-password-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </>
      }
    >
      <form id="reset-password-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <p className="text-sm text-default mb-4">
            Reset the password for{' '}
            <strong className="text-dark">
              {user.firstName} {user.lastName}
            </strong>
            . The user must change it on next sign-in.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            <label className="inline-flex items-start gap-2 cursor-pointer text-sm text-dark">
              <input
                type="radio"
                value="generate"
                {...register('mode')}
                className="mt-0.5 size-4 border-border-color text-primary focus:ring-0"
              />
              <span>
                <span className="font-medium">Generate temporary password</span>
                <span className="block text-xs text-default">
                  Server creates a secure 12-character password.
                </span>
              </span>
            </label>
            <label className="inline-flex items-start gap-2 cursor-pointer text-sm text-dark">
              <input
                type="radio"
                value="typed"
                {...register('mode')}
                className="mt-0.5 size-4 border-border-color text-primary focus:ring-0"
              />
              <span>
                <span className="font-medium">Type a password</span>
                <span className="block text-xs text-default">
                  Set a specific value yourself.
                </span>
              </span>
            </label>
          </div>

          {isTyped && (
            <div className="grid grid-cols-12 gap-4">
              <FormField
                id="reset-newPassword"
                label="New Password"
                required
                error={errors.newPassword?.message}
                helpText="Min 8 characters with at least one letter and one digit."
                className="col-span-12"
              >
                <div className="relative">
                  <input
                    id="reset-newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...register('newPassword')}
                    className={inputClass(!!errors.newPassword) + ' pe-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute end-2 top-1/2 -translate-y-1/2 text-default hover:text-primary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                  </button>
                </div>
              </FormField>

              <FormField
                id="reset-confirmPassword"
                label="Confirm Password"
                required
                error={errors.confirmPassword?.message}
                className="col-span-12"
              >
                <input
                  id="reset-confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={inputClass(!!errors.confirmPassword)}
                />
              </FormField>
            </div>
          )}

          {bannerError && (
            <div className="mt-4 rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
              {bannerError}
            </div>
          )}
        </fieldset>
      </form>
    </Dialog>
  )
}

function formatErr(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; errors?: Array<{ message?: string }> }
      | undefined
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return data.errors[0]?.message ?? data.message ?? err.message
    }
    return data?.message ?? err.message
  }
  return 'Unexpected error. Please try again.'
}
