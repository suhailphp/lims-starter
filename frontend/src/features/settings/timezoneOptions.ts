/* DOMAIN — IANA timezone list, sourced from the runtime.
 *
 * `Intl.supportedValuesOf('timeZone')` is supported in all modern
 * browsers (Chromium 99+, Firefox 100+, Safari 15.4+). It returns the
 * full ICU set (~440 entries). We lazily compute once and cache. */

export interface TimezoneOption {
  value: string
  label: string
}

let cached: TimezoneOption[] | null = null

export function getTimezoneOptions(): TimezoneOption[] {
  if (cached) return cached
  /* `Intl.supportedValuesOf` is on the Intl object as a static method.
   * TypeScript's lib.es2022.intl typings include it. */
  const values = Intl.supportedValuesOf('timeZone')
  cached = values.map((tz) => ({ value: tz, label: tz }))
  return cached
}
