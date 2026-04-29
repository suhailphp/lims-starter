/* DOMAIN — TanStack Query hooks for Attachments.
 *
 * Mostly mutation-only — attachments usually arrive via the parent
 * entity's `include` (e.g. `user.profilePhoto.dataUrl`). The lab logo
 * is the exception: the public Settings payload only carries the
 * attachment ID, so the Header/Login/Settings page need a direct fetch
 * keyed on that ID.
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteAttachmentApi,
  getAttachmentApi,
  uploadAttachmentApi,
} from '@/api/attachments'
import type { Attachment } from '@/types/attachment'

export const attachmentKey = {
  all: ['attachments'] as const,
  one: (id: string) => ['attachments', id] as const,
}

export function useAttachment(
  attachmentID: string | null,
  options: { enabled?: boolean } = {},
) {
  return useQuery<Attachment>({
    queryKey: attachmentKey.one(attachmentID ?? ''),
    queryFn: () => getAttachmentApi(attachmentID as string),
    enabled: Boolean(attachmentID) && (options.enabled ?? true),
    staleTime: 1000 * 60 * 30,
  })
}

export function useUploadAttachment() {
  return useMutation<Attachment, Error, File>({
    mutationFn: uploadAttachmentApi,
  })
}

export function useDeleteAttachment() {
  return useMutation<void, Error, string>({
    mutationFn: deleteAttachmentApi,
  })
}
