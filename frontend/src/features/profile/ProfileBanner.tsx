/* DOMAIN — Profile page banner card.
 *
 * Vendor reference: vendor/src/pages/pages/profile/profile.tsx:35-152.
 *
 * Adapted for LIMS:
 *   - Cover banner: vendor variable gradient (no asset, dark-mode-flips).
 *   - Stats slot (col-4 left)  → status pills (Role + Active + Customer if applicable).
 *   - Avatar slot (col-4 mid)  → AttachmentUpload variant="pencil-overlay".
 *   - Action slot (col-4 right) → "Change Password" link (no Follow/Message).
 *
 * Photo workflow: parent owns `pendingFile` and `photoCleared` state; this
 * component just reflects them and reports onSelect/onRemove. Parent commits
 * after Save.
 */
import { Link } from 'react-router-dom'
import { IconLock } from '@tabler/icons-react'
import { AttachmentUpload } from '@/components/ui/AttachmentUpload'
import { RoleBadge } from '@/features/users/RoleBadge'
import type { User } from '@/types/auth'

interface ProfileBannerProps {
  user: User
  pendingFile: File | null
  photoCleared: boolean
  onSelectFile: (file: File) => void
  onRemovePhoto: () => void
  disabled: boolean
}

export function ProfileBanner({
  user,
  pendingFile,
  photoCleared,
  onSelectFile,
  onRemovePhoto,
  disabled,
}: ProfileBannerProps) {
  const fullName = `${user.firstName} ${user.lastName}`
  const existing = photoCleared ? null : (user.profilePhoto ?? null)

  return (
    <div className="relative">
      {/* Cover banner — vendor: h-[132px] rounded-t-lg. Vendor uses an image;
        * we use a gradient on vendor color tokens so it dark-mode-flips with
        * no asset. */}
      <div
        className="h-[132px] w-full overflow-hidden rounded-t-lg"
        style={{
          background:
            'linear-gradient(135deg, var(--color-primary-50, #eef2ff) 0%, var(--color-info-50, #ecfeff) 50%, var(--color-primary-100, #e0e7ff) 100%)',
        }}
      />

      <div className="bg-white border border-border-color rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 items-center gap-6">
          {/* LEFT col-4 — status pills (replaces vendor's Followers/Posts/Following) */}
          <div className="xl:col-span-4 order-2 xl:order-1 flex xl:justify-start xl:items-start justify-center items-center">
            <div className="flex flex-wrap items-center gap-3 rounded-lg p-4 border border-border-color bg-light">
              <RoleBadge role={user.role} />
              {user.isActive ? (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-default border border-border-color">
                  <span className="bg-gray-400 w-[5px] h-[5px] block rounded-full me-1" />
                  Inactive
                </span>
              )}
              {user.role === 'CUSTOMER' && user.customerID && (
                <span className="text-xs text-default">Customer-scoped</span>
              )}
            </div>
          </div>

          {/* CENTER col-4 — avatar with pencil-overlay variant + name + email */}
          <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col items-center text-center -mt-[77px]">
            <div className="mb-4">
              <AttachmentUpload
                variant="pencil-overlay"
                existing={existing}
                pendingFile={pendingFile}
                onSelect={onSelectFile}
                onRemove={onRemovePhoto}
                name={fullName}
                disabled={disabled}
              />
            </div>
            <h4 className="flex items-center gap-2 mb-1 text-dark">{fullName}</h4>
            <p className="text-sm text-default break-all">{user.email}</p>
          </div>

          {/* RIGHT col-4 — actions */}
          <div className="xl:col-span-4 order-3 flex justify-center items-center xl:justify-end gap-3">
            <Link
              to="/change-password"
              className="btn inline-flex items-center gap-x-2 bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white"
            >
              <IconLock size={16} />
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
