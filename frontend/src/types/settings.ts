/* DOMAIN — Settings entity (mirrors backend backend/src/models/Setting.js) */

export type SettingValueType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON' | 'IMAGE'

export type SettingCategory = 'tenant' | 'localization' | 'system' | 'workflow'

/** Embedded attachment summary returned by /api/settings/public for IMAGE rows. */
export interface SettingAttachment {
  attachmentID: string
  mimeType: string
  dataUrl: string | null
}

export interface Setting {
  settingID: string
  category: string
  settingKey: string
  /** Always stored as TEXT on the backend; the frontend coerces via valueType. */
  value: string | null
  valueType: SettingValueType
  displayLabel: string
  description: string | null
  isPublic: boolean
  isEditable: boolean
  displayOrder: number
  createdBy: string | null
  updatedBy: string | null
  createdAt: string
  updatedAt: string
  /** Only present on IMAGE-type rows in the /public payload. */
  attachment?: SettingAttachment | null
}

/** Bulk-update payload — flat `{ key: value }` map. */
export type SettingsBulkPayload = Record<
  string,
  string | number | boolean | null | Record<string, unknown>
>
