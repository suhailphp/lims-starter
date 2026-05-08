/* REUSABLE — RHF helpers (validation feedback + state seeding).
 *
 * Three responsibilities:
 *   1. `createInvalidHandler` — onInvalid callback for `handleSubmit(onValid,
 *      onInvalid)`. Without it RHF silently no-ops on validation failure.
 *   2. `handleApiError` — single source of truth for surfacing backend
 *      mutation errors. Extracts the LIMS API envelope, binds field-level
 *      errors to RHF fields, and folds the rest into a `root` banner.
 *   3. `useFormSeed` — ref-gated `reset()` that only fires when the entity
 *      identity changes. Prevents save-failure re-renders from wiping user
 *      input + the just-set `errors.root` banner.
 *
 * See docs/patterns/form-pattern.md for the locked rules these utilities
 * enforce.
 */
import { useEffect, useRef } from 'react'
import type { FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form'

/* =========================================================================
 * Validation summary + onInvalid
 * ========================================================================= */

/**
 * Walk an RHF errors object recursively and produce a human-readable summary
 * for the top-of-form banner. Output looks like:
 *   "Fix highlighted fields below: testID: Test is required; code: Required"
 */
export function summarizeFormErrors(
  errors: FieldErrors,
  maxItems: number = 5,
): string {
  const messages: string[] = []

  function walk(obj: unknown, path: string): void {
    if (!obj || typeof obj !== 'object') return
    const node = obj as Record<string, unknown>
    const message = node.message
    if (typeof message === 'string' && message.length > 0) {
      messages.push(`${path || '(form)'}: ${message}`)
      return
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'ref' || key === 'type') continue
      const newPath = path ? `${path}.${key}` : key
      walk(value, newPath)
    }
  }

  walk(errors, '')

  if (messages.length === 0) {
    return 'Validation failed. Please review the form.'
  }

  const summary = messages.slice(0, maxItems).join('; ')
  const overflow =
    messages.length > maxItems ? ` (and ${messages.length - maxItems} more)` : ''
  return `Fix highlighted fields below: ${summary}${overflow}`
}

/**
 * Create an RHF onInvalid handler that logs to console and sets a `root`
 * error so the form's top-of-form banner renders.
 *
 * Usage:
 *   const onSubmit = handleSubmit(
 *     async (values) => { ... },
 *     createInvalidHandler('CustomerFormDialog', setError),
 *   )
 */
export function createInvalidHandler<T extends FieldValues>(
  formName: string,
  setError: UseFormSetError<T>,
) {
  return (errors: FieldErrors<T>) => {
    // Visible in browser devtools — useful when debugging cross-field rules.
    console.warn(`[${formName}] Validation failed`, errors)
    // RHF types `setError` against the form's field union; `'root'` is allowed
    // by RHF runtime but not in the typed union, hence the cast.
    setError('root' as never, {
      type: 'manual',
      message: summarizeFormErrors(errors),
    })
  }
}

/* =========================================================================
 * Backend (mutation) error handling
 * ========================================================================= */

export interface ApiErrorField {
  /**
   * Dot-path to the field that failed, as emitted by the backend
   * `errorHandler.js#formatZodIssues` (e.g. `'name'`,
   * `'measurements.0.unit'`, `'(root)'`).
   */
  field: string
  message: string
}

export interface ApiError {
  success: false
  message: string
  errors?: ApiErrorField[]
  /** Set by `extractApiError` from the HTTP response status. */
  status?: number
}

/** True when the value matches the LIMS error envelope shape. */
export function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'success' in err &&
    (err as { success: unknown }).success === false &&
    'message' in err &&
    typeof (err as { message: unknown }).message === 'string'
  )
}

/**
 * Pull the LIMS error envelope out of an axios error / fetch error / raw
 * envelope. Returns `null` when the input doesn't match.
 */
export function extractApiError(err: unknown): ApiError | null {
  if (!err || typeof err !== 'object') return null
  // axios shape — `err.response.data` carries the envelope.
  if ('response' in err) {
    const response = (err as { response?: { data?: unknown; status?: number } })
      .response
    const data = response?.data
    if (isApiError(data)) {
      return { ...data, status: response?.status }
    }
  }
  // raw envelope passed directly
  if (isApiError(err)) return err
  return null
}

/**
 * Surface a backend mutation error to the user via RHF.
 *
 * - Field-level errors (`errors[].field`) bind to RHF fields when the
 *   top-level segment is in `knownFields` and the path is shallow. Deep
 *   paths (`measurements.0.unit`) and unknown fields fold into the
 *   top-of-form banner so nothing is silently dropped.
 * - 409 with no `errors[]` array is treated as a uniqueness conflict and
 *   bound to `conflictField` if provided (preserves the inline-on-name
 *   UX for duplicate-name validations); otherwise it falls back to the
 *   root banner.
 * - Anything that isn't a recognizable envelope falls back to a generic
 *   message — never silently swallow.
 *
 * Usage:
 *   catch (err) {
 *     handleApiError(err, setError, 'CustomerFormDialog', {
 *       knownFields: ['name', 'address', 'contactEmail'],
 *       conflictField: 'name',
 *     })
 *   }
 */
export function handleApiError<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>,
  formName: string,
  options?: {
    /** Top-level field names that should bind 422 errors inline. */
    knownFields?: readonly string[]
    /** When the backend returns a 409 with no `errors[]`, bind the top-level
     * `message` to this field instead of the root banner. Use for entities
     * with a unique-name constraint. */
    conflictField?: string
  },
): void {
  console.warn(`[${formName}] API error`, err)

  const apiError = extractApiError(err)

  // Unrecognized error shape — generic fallback so the banner never blanks.
  if (!apiError) {
    setError('root' as never, {
      type: 'server',
      message:
        err instanceof Error ? err.message : 'An unexpected error occurred',
    })
    return
  }

  // 409 uniqueness conflict — bind to a single field when caller opts in.
  const isConflictWithoutDetails =
    apiError.status === 409 && (!apiError.errors || apiError.errors.length === 0)
  if (isConflictWithoutDetails && options?.conflictField) {
    setError(options.conflictField as never, {
      type: 'server',
      message: apiError.message,
    })
    return
  }

  // 422 / 409-with-details / any envelope carrying field errors.
  if (apiError.errors && apiError.errors.length > 0) {
    const knownFields = options?.knownFields ?? []
    const bannerLines: string[] = []

    for (const detail of apiError.errors) {
      const top = detail.field.split('.')[0]
      const isShallow = !detail.field.includes('.')
      if (isShallow && knownFields.includes(top)) {
        setError(detail.field as never, {
          type: 'server',
          message: detail.message,
        })
      } else {
        bannerLines.push(`${detail.field}: ${detail.message}`)
      }
    }

    if (bannerLines.length > 0) {
      const summary = bannerLines.slice(0, 5).join('; ')
      const overflow =
        bannerLines.length > 5 ? ` (and ${bannerLines.length - 5} more)` : ''
      setError('root' as never, {
        type: 'server',
        message: `${apiError.message}: ${summary}${overflow}`,
      })
    }
    return
  }

  // Envelope without `errors[]` (404, 403, plain 500 with message, etc.)
  setError('root' as never, { type: 'server', message: apiError.message })
}

/* =========================================================================
 * Form state seeding
 * ========================================================================= */

/**
 * Ref-gated form `reset()`. Calls `seed()` only when the entity identity
 * changes — never on incidental parent re-renders.
 *
 * Why this matters: a save failure causes the parent to re-render. If the
 * parent passes a fresh object literal for `mode` (e.g. `{ kind: 'edit',
 * customer: row }`) on every render, the naive `useEffect(() => reset(...),
 * [open, mode])` re-runs and:
 *   - wipes the user's in-progress edits
 *   - clears the `errors.root` banner that `handleApiError` just set
 *   - blanks any nested rows (measurements, items, etc.)
 *
 * `useFormSeed` keys on a stable identity (entity ID for edits, '__new__'
 * for create) so the form re-seeds only when the user genuinely switches to
 * a different record.
 *
 * The `seed` callback is captured via a ref so it doesn't have to be
 * `useCallback`-stable — every render captures the latest closure, but the
 * effect itself only runs when `active` or `id` change.
 *
 * Usage:
 *   useFormSeed({
 *     active: open,
 *     id: isEdit ? mode.customer.customerID : null,
 *     seed: () => reset(isEdit ? valuesFromCustomer(mode.customer) : DEFAULTS),
 *   })
 */
export function useFormSeed({
  active,
  id,
  seed,
}: {
  /** Form is currently displayed (modal open, edit mode active, etc.). When
   *  false, the internal "last seeded" key is cleared so the next activation
   *  always reseeds. */
  active: boolean
  /** Stable identity for the entity being seeded; `null` for a fresh
   *  "create" form. Same id between renders → no reseed. */
  id: string | null
  /** Called inside `useEffect` once per identity change. Captured via a ref. */
  seed: () => void
}): void {
  const seedRef = useRef(seed)
  useEffect(() => {
    seedRef.current = seed
  })

  const lastSeededRef = useRef<string | null>(null)
  useEffect(() => {
    if (!active) {
      lastSeededRef.current = null
      return
    }
    const key = id ?? '__new__'
    if (lastSeededRef.current === key) return
    lastSeededRef.current = key
    seedRef.current()
  }, [active, id])
}
