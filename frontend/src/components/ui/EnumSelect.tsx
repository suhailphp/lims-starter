/* REUSABLE — Static enum dropdown built on FKSelect.
 *
 * Use for short fixed enum lists (e.g. Category type, calibration status, role).
 * - isSearchable={false} — typeahead is noise for 3–5 options.
 * - Static options passed by caller; no query, no caching.
 * - Same vendor-aligned styling as FKSelect (one source of truth for select look).
 *
 * For dynamic / FK-backed selects, use `FKSelect` directly.
 *
 * Usage:
 *   <EnumSelect
 *     options={[{ value: 'FUEL', label: 'FUEL' }, ...]}
 *     value={field.value}
 *     onChange={field.onChange}
 *     hasError={!!errors.type}
 *   />
 */
import { FKSelect, type FKOption } from './FKSelect'

interface EnumSelectProps {
  inputId?: string
  options: FKOption[]
  value: string | null | undefined
  onChange: (value: string | null) => void
  onBlur?: () => void
  isDisabled?: boolean
  placeholder?: string
  hasError?: boolean
  ariaLabel?: string
}

export function EnumSelect(props: EnumSelectProps) {
  return <FKSelect {...props} isSearchable={false} />
}

export type { FKOption as EnumOption }
