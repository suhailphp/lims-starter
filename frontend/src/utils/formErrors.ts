/* REUSABLE — RHF onInvalid helper.
 *
 * Wires every form's `handleSubmit(onValid, onInvalid)` to the same fail-safe:
 * console.warn the errors object, then `setError('root', ...)` with a human
 * summary so a top-of-form banner renders. Without this, RHF silently no-ops
 * on validation failure and the user sees a dead Save button.
 *
 * See docs/patterns/form-pattern.md for the locked rules this utility enforces.
 */
import type { FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form'

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
