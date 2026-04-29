/* REUSABLE — Time-only picker built on PrimeReact <Calendar timeOnly />.
 *
 * Vendor reference:
 *   /vendor/src/components/common-timepicker/commonTimepicker.tsx
 *
 * Kept separate from DateTimePicker because:
 *   - Time-only is a distinct UX (no calendar surface)
 *   - Cleaner mental model: "I need a time" → TimePicker
 *   - Still uses PrimeReact <Calendar /> internally (same lib, same look)
 *
 * Output format: "HH:mm" (24-hour). e.g. "14:30".
 *
 * Usage (always wrap in <Controller>):
 *   <Controller
 *     name="testStartTime"
 *     control={control}
 *     render={({ field }) => (
 *       <TimePicker
 *         value={field.value}
 *         onChange={field.onChange}
 *         onBlur={field.onBlur}
 *         hasError={!!errors.testStartTime}
 *       />
 *     )}
 *   />
 */
import { useMemo } from 'react'
import { Calendar, type CalendarProps } from 'primereact/calendar'
import { inputClass } from './FormField'

interface TimePickerProps {
  inputId?: string
  /** "HH:mm" 24-hour string. */
  value: string | null | undefined
  onChange: (value: string | null) => void
  onBlur?: () => void
  isDisabled?: boolean
  isClearable?: boolean
  /** Render the panel's "Now / Clear" button bar. Off by default to match
   *  vendor's demo polish — clearing still works via backspace + onChange(null). */
  showButtonBar?: boolean
  placeholder?: string
  hasError?: boolean
  ariaLabel?: string
}

export function TimePicker({
  inputId,
  value,
  onChange,
  onBlur,
  isDisabled = false,
  isClearable: _isClearable = true,
  showButtonBar = false,
  placeholder = 'HH:mm',
  hasError = false,
  ariaLabel,
}: TimePickerProps) {
  const calValue = useMemo<Date | null>(() => {
    if (!value) return null
    return parseTime(value)
  }, [value])

  const handleChange: CalendarProps['onChange'] = (e) => {
    const v = e.value
    if (!v || Array.isArray(v)) {
      onChange(null)
      return
    }
    const d = v as Date
    onChange(`${pad2(d.getHours())}:${pad2(d.getMinutes())}`)
  }

  return (
    <Calendar
      inputId={inputId}
      aria-label={ariaLabel}
      value={calValue}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={isDisabled}
      showButtonBar={showButtonBar}
      placeholder={placeholder}
      timeOnly
      hourFormat="24"
      // Inline panel — Radix Dialog modal pointer-events lockdown breaks portaled panels.
      appendTo="self"
      panelClassName="z-[10001]"
      className="w-full custom-datepicker"
      inputClassName={inputClass(hasError)}
    />
  )
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function parseTime(hhmm: string): Date | null {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm)
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h < 0 || h > 23 || min < 0 || min > 59) return null
  const d = new Date()
  d.setHours(h, min, 0, 0)
  return d
}
