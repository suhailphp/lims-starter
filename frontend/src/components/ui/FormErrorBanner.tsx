/* REUSABLE — top-of-form error banner for RHF `errors.root.message`.
 *
 * Pair with `createInvalidHandler` from `@/utils/formErrors`. Rendered
 * inside the form's grid (12-col by default) so it spans the full row.
 * Color tokens use vendor `danger` palette so it flips correctly in
 * dark mode.
 */
import type { FieldError } from 'react-hook-form'

interface FormErrorBannerProps {
  /** RHF `errors.root` — the banner is hidden when undefined or empty. */
  error?: FieldError
  /** Override the default `col-span-12` if the parent is not a 12-col grid. */
  className?: string
}

export function FormErrorBanner({
  error,
  className = 'col-span-12',
}: FormErrorBannerProps) {
  if (!error?.message) return null
  return (
    <div
      role="alert"
      className={`${className} rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700`}
    >
      {error.message}
    </div>
  )
}
