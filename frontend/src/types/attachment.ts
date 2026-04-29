/* DOMAIN — Attachment entity (mirrors backend backend/src/models/Attachment.js) */

export interface Attachment {
  attachmentID: string
  fileName: string
  mimeType: string
  fileSize: number
  /** Base64-encoded body (no `data:` prefix). */
  fileData: string
  /** Server-computed convenience: `data:${mimeType};base64,${fileData}`. */
  dataUrl: string | null
  createdBy: string | null
  updatedBy: string | null
  createdAt: string
  updatedAt: string
}

/** POST /api/attachments response payload. */
export interface AttachmentEnvelope {
  success: boolean
  message: string
  data: Attachment
}
