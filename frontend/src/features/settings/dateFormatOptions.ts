/* DOMAIN — supported date-format strings for the localization form. */

export interface DateFormatOption {
  value: string
  label: string
}

export const DATE_FORMAT_OPTIONS: DateFormatOption[] = [
  { value: 'DD/MM/YYYY',  label: 'DD/MM/YYYY  (28/04/2026)' },
  { value: 'MM/DD/YYYY',  label: 'MM/DD/YYYY  (04/28/2026)' },
  { value: 'YYYY-MM-DD',  label: 'YYYY-MM-DD  (2026-04-28)' },
  { value: 'DD-MMM-YYYY', label: 'DD-MMM-YYYY (28-Apr-2026)' },
]

export const TIME_FORMAT_OPTIONS: DateFormatOption[] = [
  { value: '24h', label: '24-hour (15:30)' },
  { value: '12h', label: '12-hour (3:30 PM)' },
]
