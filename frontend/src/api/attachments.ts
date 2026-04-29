/* DOMAIN — typed Attachment API client.
 *
 * Upload uses multipart/form-data — let axios set its own Content-Type header
 * (with boundary) by NOT passing one ourselves.
 */
import { apiClient } from './axios'
import type { Attachment } from '@/types/attachment'

interface SingleEnvelope {
  success: boolean
  data: Attachment
}

/**
 * POST /api/attachments — multipart, single field `file`.
 * Server validates MIME (jpeg/png/webp) and size (max 500 KB).
 *
 * IMPORTANT: the shared `apiClient` is created with a default
 * `Content-Type: application/json` header. We explicitly clear it here so
 * axios + the browser auto-set `multipart/form-data; boundary=...` for the
 * FormData body. Without this, multer sees no multipart and req.file is
 * undefined → backend 422 "No file provided".
 */
export async function uploadAttachmentApi(file: File): Promise<Attachment> {
  const fd = new FormData()
  fd.append('file', file)
  const res = await apiClient.post<SingleEnvelope>('/attachments', fd, {
    headers: { 'Content-Type': undefined },
  })
  return res.data.data
}

export async function getAttachmentApi(attachmentID: string): Promise<Attachment> {
  const res = await apiClient.get<SingleEnvelope>(`/attachments/${attachmentID}`)
  return res.data.data
}

export async function deleteAttachmentApi(attachmentID: string): Promise<void> {
  await apiClient.delete(`/attachments/${attachmentID}`)
}
