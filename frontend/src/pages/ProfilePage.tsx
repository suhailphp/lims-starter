/* DOMAIN — User profile page (self-service).
 *
 * Vendor reference: vendor/src/pages/pages/profile/profile.tsx (banner +
 * two-column info/activities layout). LIMS-specific adaptations:
 *   - Stats slot → Status pills (RoleBadge + Active + Customer-scoped).
 *   - Avatar uses AttachmentUpload variant="pencil-overlay".
 *   - Action slot → Change Password link only (no Follow/Message).
 *   - Activity feed pulls from /api/users/me/activities (real backend).
 *
 * Save flow (deferred upload, mirrors UserFormDialog):
 *   1. PUT /api/users/:selfID with { firstName, lastName }.
 *   2. If pendingFile: POST /api/attachments → PUT user with new
 *      profilePhotoAttachmentID.
 *   3. If photoCleared: PUT user with profilePhotoAttachmentID = null.
 *   4. Refresh /api/auth/me into the auth slice so the header avatar
 *      reflects new state.
 */
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useUpdateUser } from '@/features/users/usersQueries'
import { useUploadAttachment } from '@/features/attachments/queries'
import { useRefreshMe } from '@/features/auth/useRefreshMe'
import { ProfileBanner } from '@/features/profile/ProfileBanner'
import { ProfileInfoCard } from '@/features/profile/ProfileInfoCard'
import { ProfileActivityFeed } from '@/features/profile/ProfileActivityFeed'
import { toast } from '@/lib/toast'
import type { ProfileFormValues } from '@/features/profile/profileSchema'

export function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user)
  const update = useUpdateUser()
  const uploadAttachment = useUploadAttachment()
  const refreshMe = useRefreshMe()

  const [isEditing, setEditing] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [photoCleared, setPhotoCleared] = useState(false)
  const [isSaving, setSaving] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  const photoDirty = !!pendingFile || photoCleared

  async function handleSave(values: ProfileFormValues) {
    if (!user) return
    setSaving(true)
    try {
      const nameChanged =
        values.firstName !== user.firstName || values.lastName !== user.lastName
      if (nameChanged) {
        await update.mutateAsync({
          userID: user.userID,
          input: { firstName: values.firstName, lastName: values.lastName },
        })
      }

      let photoFailed: string | null = null
      try {
        if (pendingFile) {
          const att = await uploadAttachment.mutateAsync(pendingFile)
          await update.mutateAsync({
            userID: user.userID,
            input: { profilePhotoAttachmentID: att.attachmentID },
          })
        } else if (photoCleared && user.profilePhotoAttachmentID) {
          await update.mutateAsync({
            userID: user.userID,
            input: { profilePhotoAttachmentID: null },
          })
        }
      } catch (err) {
        photoFailed = err instanceof Error ? err.message : 'Photo update failed'
      }

      // Refresh /me so the header avatar (and these forms) see fresh state.
      await refreshMe()

      if (photoFailed) {
        toast.error(`Saved, but photo failed: ${photoFailed}`)
      } else {
        toast.success('Profile updated')
      }
      setPendingFile(null)
      setPhotoCleared(false)
      setEditing(false)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed'
      toast.error(`Failed to save profile: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  // Photo edits commit immediately on this page — there's no "Save" button
  // for the banner (vendor pattern). Pick file → save fires automatically.
  async function handleSelectFile(file: File) {
    setPendingFile(file)
    setPhotoCleared(false)
    if (!isEditing) {
      // Banner edits don't require entering full edit mode; auto-commit.
      await commitPhotoOnly(file, false)
    }
  }

  async function handleRemovePhoto() {
    setPendingFile(null)
    setPhotoCleared(true)
    if (!isEditing) {
      await commitPhotoOnly(null, true)
    }
  }

  async function commitPhotoOnly(file: File | null, clear: boolean) {
    if (!user) return
    setSaving(true)
    try {
      if (file) {
        const att = await uploadAttachment.mutateAsync(file)
        await update.mutateAsync({
          userID: user.userID,
          input: { profilePhotoAttachmentID: att.attachmentID },
        })
        toast.success('Profile photo updated')
      } else if (clear && user.profilePhotoAttachmentID) {
        await update.mutateAsync({
          userID: user.userID,
          input: { profilePhotoAttachmentID: null },
        })
        toast.success('Profile photo removed')
      }
      await refreshMe()
      setPendingFile(null)
      setPhotoCleared(false)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Photo update failed'
      toast.error(`Failed to update photo: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Profile' },
        ]}
      />

      <ProfileBanner
        user={user}
        pendingFile={pendingFile}
        photoCleared={photoCleared}
        onSelectFile={handleSelectFile}
        onRemovePhoto={handleRemovePhoto}
        disabled={isSaving}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xl:col-span-5 flex">
          <ProfileInfoCard
            user={user}
            isEditing={isEditing}
            isSubmitting={isSaving}
            onStartEdit={() => setEditing(true)}
            onCancelEdit={() => {
              setEditing(false)
              setPendingFile(null)
              setPhotoCleared(false)
            }}
            onSave={handleSave}
          />
        </div>
        <div className="xl:col-span-7 flex">
          <ProfileActivityFeed />
        </div>
      </div>

      {/* Photo dirty hint when not in edit mode (rarely shown — auto-commit) */}
      {photoDirty && !isEditing && !isSaving && (
        <p className="text-xs text-default mt-2">Saving photo…</p>
      )}
    </>
  )
}
