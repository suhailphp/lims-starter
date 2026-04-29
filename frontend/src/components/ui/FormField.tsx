/* REUSABLE — vendor's label + form-input + error pattern
 *   Vendor reference: userModal.tsx:61–75 (label + input wrapper)
 *   Inputs catalog: vendor/src/pages/ui-elements/form-ui/formElements.tsx
 */
import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: ReactNode
  required?: boolean
  error?: string
  helpText?: string
  /** Grid column-span class on the wrapper (e.g. "sm:col-span-6 col-span-12") */
  className?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  required,
  error,
  helpText,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-semibold text-dark"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <div className="relative">{children}</div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      {!error && helpText && (
        <p className="mt-1 text-xs text-gray-600">{helpText}</p>
      )}
    </div>
  )
}

/** Vendor `.form-input` + LIMS error border swap. Matches userModal.tsx:72. */
export function inputClass(hasError: boolean): string {
  const base =
    'form-input text-dark bg-white block w-full rounded-lg focus:ring-0 focus:outline-none border'
  return hasError
    ? `${base} border-danger focus:border-danger`
    : `${base} border-border-color focus:border-border-color`
}

/** Textarea variant — matches userModal.tsx:128. */
export function textareaClass(hasError: boolean): string {
  const base =
    'py-2.5 px-2.5 block text-dark w-full bg-white rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none border'
  return hasError
    ? `${base} border-danger focus:border-danger`
    : `${base} border-border-color focus:border-border-color`
}
