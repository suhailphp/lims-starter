/* DOMAIN — vendor-styled card frame + footer for any settings section.
 *
 * Vendor reference: vendor/src/pages/settings/general-settings/generalSettings.tsx.
 * Centered 8/12 card with shadow + p-5; the section content slot accepts
 * arbitrary children grouped into vendor's `border-b` subsection bands.
 * Footer sticks to the right with Cancel + Save Changes. */
import type { FormEvent, ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  isSaving: boolean
  isDirty: boolean
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  children: ReactNode
}

export function SectionFormFrame({
  title,
  description,
  isSaving,
  isDirty,
  onSubmit,
  onCancel,
  children,
}: Props) {
  return (
    <div className="bg-white shadow rounded-md p-5 border border-border-color">
      <div className="mb-5">
        <h5 className="text-gray-900 mb-1">{title}</h5>
        {description && <p className="text-sm text-default mb-0">{description}</p>}
      </div>
      <form onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSaving} className="contents">
          {children}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={!isDirty || isSaving}
              className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-gray-900 font-semibold rounded-lg hover:bg-light disabled:opacity-50 disabled:pointer-events-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isSaving}
              className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSaving ? (
                <>
                  <span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

interface SubsectionProps {
  title?: string
  Icon?: React.ComponentType<{ size?: number; className?: string }>
  /** When true, no bottom border (use for the LAST subsection). */
  last?: boolean
  children: ReactNode
}

export function Subsection({ title, Icon, last = false, children }: SubsectionProps) {
  return (
    <div className={last ? 'mb-5' : 'mb-5 pb-5 border-b border-border-color'}>
      {title && (
        <h6 className="flex items-center gap-2 mb-5 text-gray-900">
          {Icon && <Icon size={16} className="me-1" />}
          {title}
        </h6>
      )}
      {children}
    </div>
  )
}

interface FieldShellProps {
  label: string
  hint?: string | null
  systemLocked?: boolean
  children: ReactNode
}

export function FieldShell({ label, hint, systemLocked, children }: FieldShellProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-gray-900">
        {label}
        {systemLocked && (
          <span className="ms-2 inline-block badge-small rounded-md bg-light text-default border border-border-color text-[10px] uppercase tracking-wide font-medium">
            System
          </span>
        )}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-default mb-0">{hint}</p>}
    </div>
  )
}

export const inputClass =
  'form-input block w-full bg-white border border-border-color rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none disabled:opacity-50 disabled:bg-light'
