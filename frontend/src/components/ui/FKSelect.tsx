/* REUSABLE — Foreign-key dropdown built on react-select.
 *
 * The vendor theme has no react-select example (vendor uses PrimeReact Dropdown
 * via CommonSelect), so we ship this thin wrapper that styles react-select to
 * match vendor's `.form-input` look (rounded-lg, border-border-color, focus
 * states, danger swap on error). Use this for ALL FK selects across master
 * data so the visual treatment stays consistent.
 *
 * Usage:
 *   <FKSelect
 *     options={[{ value: 'id1', label: 'Acme' }]}
 *     value="id1"
 *     onChange={(v) => setValue('customerID', v || '')}
 *     hasError={!!errors.customerID}
 *     placeholder="Select customer..."
 *     isClearable
 *   />
 */
import Select, { type StylesConfig } from 'react-select'

export interface FKOption {
  value: string
  label: string
}

interface FKSelectProps {
  inputId?: string
  options: FKOption[]
  value: string | null | undefined
  onChange: (value: string | null) => void
  onBlur?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  isClearable?: boolean
  /** Disable the typeahead filter — pass `false` for small enum lists where search is noise. Defaults to true. */
  isSearchable?: boolean
  placeholder?: string
  hasError?: boolean
  ariaLabel?: string
}

export function FKSelect({
  inputId,
  options,
  value,
  onChange,
  onBlur,
  isLoading = false,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  placeholder = 'Select...',
  hasError = false,
  ariaLabel,
}: FKSelectProps) {
  const selected = value ? (options.find((o) => o.value === value) ?? null) : null

  return (
    <Select<FKOption, false>
      inputId={inputId}
      aria-label={ariaLabel}
      classNamePrefix="fkselect"
      options={options}
      value={selected}
      onChange={(opt) => onChange(opt ? opt.value : null)}
      onBlur={onBlur}
      isLoading={isLoading}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      placeholder={placeholder}
      // No menuPortalTarget — Radix Dialog modal mode applies a pointer-events
      // lockdown to everything outside Dialog.Content. Portaling to document.body
      // makes the menu a sibling of the Dialog, which Radix treats as "outside" →
      // option clicks silently no-op. Rendering the menu inline (still
      // position:fixed so it escapes overflow clipping) keeps it inside the
      // Dialog tree where pointer events stay live.
      menuPosition="fixed"
      styles={fkStyles(hasError)}
    />
  )
}

/* Vendor-aligned styles. Mirrors `.form-input` border + focus look from
 * FormField.inputClass(). Menu uses position:fixed (no portal) so it escapes
 * overflow clipping while staying inside Dialog.Content's pointer-events tree.
 *
 * Dark-mode rule: every theme-aware color reads from a vendor CSS variable
 * (`var(--color-*)`) so it auto-flips under `[data-theme="dark"]`. Hardcoded
 * hex (#fff, #eef2ff, etc.) does NOT flip — see CLAUDE.md "Dark mode rules".
 */
function fkStyles(hasError: boolean): StylesConfig<FKOption, false> {
  const borderColor = hasError
    ? 'var(--color-danger, #ef4444)'
    : 'var(--color-border-color, #e5e7eb)'
  const surface = 'var(--color-white, #ffffff)'
  const text = 'var(--color-dark, #111827)'
  const focusBg = 'var(--color-primary-50, #eef2ff)'
  const selectedBg = 'var(--color-primary, #4f46e5)'
  // Disabled tint — semi-transparent so it works on light AND dark surfaces.
  const disabledBg = 'color-mix(in srgb, var(--color-border-color, #e5e7eb) 50%, transparent)'
  return {
    control: (base, state) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '0.5rem',
      borderColor: state.isFocused ? borderColor : borderColor,
      boxShadow: 'none',
      backgroundColor: state.isDisabled ? disabledBg : surface,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      ':hover': { borderColor },
      fontSize: '0.875rem',
    }),
    valueContainer: (base) => ({ ...base, padding: '0 0.625rem' }),
    input: (base) => ({ ...base, color: text }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--color-gray-500, rgba(75, 85, 99, 0.6))',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--color-gray-500, rgba(75, 85, 99, 0.6))',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: surface,
      borderRadius: '0.5rem',
      border: '1px solid var(--color-border-color, #e5e7eb)',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      fontSize: '0.875rem',
      zIndex: 10001,
    }),
    menuList: (base) => ({ ...base, backgroundColor: surface }),
    option: (base, state) => ({
      ...base,
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? selectedBg
        : state.isFocused
          ? focusBg
          : surface,
      // Selected option uses primary background (saturated in both modes), so
      // permanent-white text is correct in both light and dark.
      color: state.isSelected ? '#ffffff' : text,
    }),
    singleValue: (base) => ({ ...base, color: text }),
    noOptionsMessage: (base) => ({
      ...base,
      color: 'var(--color-default, var(--color-gray-600, #6b7280))',
    }),
  }
}
