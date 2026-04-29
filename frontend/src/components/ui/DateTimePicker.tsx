/* REUSABLE — Date / DateTime / DateRange picker built on PrimeReact <Calendar />.
 *
 * Vendor reference (visual + lib choice):
 *   /vendor/src/components/common-datepicker/commonDatepicker.tsx
 *   /vendor/src/pages/ui-elements/form-ui/formPickers.tsx
 *
 * Why PrimeReact (not flatpickr):
 *   Vendor's `flatpickr` package.json entry is a leftover — vendor's actual
 *   pickers all use PrimeReact <Calendar />. PrimeReact ships in our deps
 *   already (DataTable), and one component covers date / datetime / range
 *   in a single API. No new dep added.
 *
 * Modal compatibility:
 *   `appendTo="self"` keeps the calendar panel inside the Dialog content tree.
 *   Same trap as react-select: panels portaled to document.body get caught by
 *   Radix Dialog's modal pointer-events lockdown → option clicks no-op.
 *
 * Output formats (string serialization at the API boundary):
 *   - mode="date"     → "YYYY-MM-DD"          (e.g. "2026-04-25")
 *   - mode="datetime" → "YYYY-MM-DDTHH:mm"    (ISO local, no seconds, no TZ)
 *   - mode="range"    → { from: 'YYYY-MM-DD' | null, to: 'YYYY-MM-DD' | null }
 *
 * Usage (always wrap in <Controller> for symmetry with FKSelect/EnumSelect):
 *   <Controller
 *     name="calibrationDueDate"
 *     control={control}
 *     render={({ field }) => (
 *       <DateTimePicker
 *         mode="date"
 *         value={field.value}
 *         onChange={field.onChange}
 *         onBlur={field.onBlur}
 *         hasError={!!errors.calibrationDueDate}
 *         isClearable
 *       />
 *     )}
 *   />
 */
import { useMemo } from 'react'
import { Calendar, type CalendarProps } from 'primereact/calendar'
import { inputClass } from './FormField'

export interface DateRange {
  from: string | null
  to: string | null
}

export type DateTimeMode = 'date' | 'datetime' | 'range'

interface DateTimePickerProps {
  inputId?: string
  mode: DateTimeMode
  /** "YYYY-MM-DD" / "YYYY-MM-DDTHH:mm" / DateRange — depends on `mode`. */
  value: string | DateRange | null | undefined
  /** Output type matches `mode`: string for date/datetime, DateRange for range. */
  onChange: (value: string | DateRange | null) => void
  onBlur?: () => void
  isDisabled?: boolean
  /** Allow null on backspace / explicit clear. Doesn't render the panel button bar. */
  isClearable?: boolean
  /** Render the panel's "Today / Clear" button bar. Off by default to match
   *  vendor's demo polish — clearing still works via backspace + onChange(null). */
  showButtonBar?: boolean
  placeholder?: string
  hasError?: boolean
  ariaLabel?: string
  /** Min selectable date (passed through to PrimeReact). */
  minDate?: Date
  /** Max selectable date (passed through to PrimeReact). */
  maxDate?: Date
}

export function DateTimePicker({
  inputId,
  mode,
  value,
  onChange,
  onBlur,
  isDisabled = false,
  isClearable: _isClearable = true,
  showButtonBar = false,
  placeholder,
  hasError = false,
  ariaLabel,
  minDate,
  maxDate,
}: DateTimePickerProps) {
  const isRange = mode === 'range'
  const isDateTime = mode === 'datetime'

  const calValue = useMemo<Date | (Date | null)[] | null>(() => {
    if (isRange) {
      const r = value as DateRange | null | undefined
      if (!r) return null
      return [r.from ? parseDate(r.from) : null, r.to ? parseDate(r.to) : null]
    }
    const s = value as string | null | undefined
    return s ? parseDate(s) : null
  }, [value, isRange])

  const handleChange: CalendarProps['onChange'] = (e) => {
    const v = e.value
    if (isRange) {
      if (!v || !Array.isArray(v) || (!v[0] && !v[1])) {
        onChange(null)
        return
      }
      const [from, to] = v as unknown as [Date | null, Date | null]
      onChange({
        from: from ? toIsoDate(from) : null,
        to: to ? toIsoDate(to) : null,
      })
      return
    }
    if (!v) {
      onChange(null)
      return
    }
    const d = v as Date
    onChange(isDateTime ? toIsoDateTime(d) : toIsoDate(d))
  }

  const placeholderText =
    placeholder ??
    (isDateTime ? 'YYYY-MM-DD HH:mm' : isRange ? 'Select date range' : 'YYYY-MM-DD')

  return (
    <Calendar
      inputId={inputId}
      aria-label={ariaLabel}
      value={calValue}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={isDisabled}
      showButtonBar={showButtonBar}
      placeholder={placeholderText}
      // Date format tokens are PrimeReact-specific (yy = 4-digit year, mm = month, dd = day).
      dateFormat="yy-mm-dd"
      showTime={isDateTime}
      hourFormat="24"
      selectionMode={isRange ? 'range' : 'single'}
      minDate={minDate}
      maxDate={maxDate}
      // Inline panel — keeps option clicks live inside Radix Dialog (see component header).
      appendTo="self"
      panelClassName="z-[10001]"
      className="w-full custom-datepicker"
      inputClassName={inputClass(hasError)}
    />
  )
}

/* ---- helpers ---- */

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function toIsoDateTime(d: Date): string {
  return `${toIsoDate(d)}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

/** Parse strings produced by toIsoDate / toIsoDateTime back into a Date. */
function parseDate(s: string): Date | null {
  if (!s) return null
  // Date-only string ("YYYY-MM-DD") parsed directly hits UTC midnight, which can
  // shift to the previous day in negative TZ offsets. Build a local-midnight Date.
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split('-').map(Number)
    return new Date(y, m - 1, d)
  }
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}
