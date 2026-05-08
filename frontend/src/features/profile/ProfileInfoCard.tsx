/* DOMAIN — Profile info card (left column).
 *
 * Sections: About, Personal Information, Account, Security.
 * Vendor reference: profile.tsx:155-269.
 *
 * Edit mode: triggered by parent. Only firstName/lastName are editable
 * (backend enforces SELF_ALLOWED_UPDATE_FIELDS). Other rows render as
 * read-only key/value pairs in both modes.
 */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { IconPencil } from '@tabler/icons-react'
import { FormField, inputClass } from '@/components/ui/FormField'
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'
import { createInvalidHandler, useFormSeed } from '@/utils/formErrors'
import { profileFormSchema, type ProfileFormValues } from './profileSchema'
import type { User } from '@/types/auth'

interface ProfileInfoCardProps {
  user: User
  isEditing: boolean
  isSubmitting: boolean
  onStartEdit: () => void
  onCancelEdit: () => void
  /** Caller commits firstName/lastName + (separately) the photo state. */
  onSave: (values: ProfileFormValues) => void | Promise<void>
}

export function ProfileInfoCard({
  user,
  isEditing,
  isSubmitting,
  onStartEdit,
  onCancelEdit,
  onSave,
}: ProfileInfoCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onTouched',
    defaultValues: { firstName: user.firstName, lastName: user.lastName },
  })

  // Re-seed only when entering edit mode or switching to a different user.
  // Save-failure re-renders keep the user's in-progress edits.
  useFormSeed({
    active: isEditing,
    id: user.userID,
    seed: () => reset({ firstName: user.firstName, lastName: user.lastName }),
  })

  const submit = handleSubmit(
    (values) => onSave(values),
    createInvalidHandler('ProfileInfoCard', setError),
  )

  return (
    <div className="bg-white border border-border-color rounded-lg p-5 mb-6 shadow flex-1">
      <form onSubmit={submit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          {/* About */}
          <div className="mb-5 pb-5 border-b border-border-color">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-base font-bold text-dark">About</h4>
              {!isEditing && (
                <button
                  type="button"
                  onClick={onStartEdit}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer"
                >
                  <IconPencil size={14} /> Edit
                </button>
              )}
            </div>
            <p className="text-sm text-default">
              {roleBlurb(user.role)}
            </p>
          </div>

          {/* Personal Information */}
          <div className="mb-5 pb-5 border-b border-border-color">
            <h4 className="text-base font-bold text-dark mb-4">Personal Information</h4>
            {isEditing && errors.root?.message && (
              <div className="mb-3">
                <FormErrorBanner error={errors.root} className="" />
              </div>
            )}
            {isEditing ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  id="profile-firstName"
                  label="First Name"
                  required
                  error={errors.firstName?.message}
                >
                  <input
                    id="profile-firstName"
                    type="text"
                    {...register('firstName')}
                    className={inputClass(!!errors.firstName)}
                  />
                </FormField>
                <FormField
                  id="profile-lastName"
                  label="Last Name"
                  required
                  error={errors.lastName?.message}
                >
                  <input
                    id="profile-lastName"
                    type="text"
                    {...register('lastName')}
                    className={inputClass(!!errors.lastName)}
                  />
                </FormField>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <Row label="First Name" value={user.firstName} />
                <Row label="Last Name" value={user.lastName} />
                <Row label="Email" value={user.email} />
              </div>
            )}
            {!isEditing && (
              <p className="mt-3 text-xs text-default">
                To change your email or role, contact an administrator.
              </p>
            )}
          </div>

          {/* Account */}
          <div className="mb-5 pb-5 border-b border-border-color">
            <h4 className="text-base font-bold text-dark mb-4">Account</h4>
            <div className="space-y-2 text-sm">
              <Row label="Role" value={user.role} />
              {user.customerID && <Row label="Customer ID" value={user.customerID} />}
              <Row label="User ID" value={user.userID} mono />
            </div>
          </div>

          {/* Security */}
          <div>
            <h4 className="text-base font-bold text-dark mb-4">Security</h4>
            <div className="space-y-2 text-sm">
              <Row
                label="Must change password"
                value={user.mustChangePassword ? 'Yes' : 'No'}
              />
              <p className="pt-1">
                <Link
                  to="/change-password"
                  className="text-primary hover:underline text-sm"
                >
                  Change password →
                </Link>
              </p>
            </div>
          </div>

          {/* Save / Cancel — only in edit mode */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-border-color">
              <button
                type="button"
                onClick={onCancelEdit}
                className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <p className="flex items-center justify-between gap-4">
      <span className="text-default">{label}</span>
      <span
        className={`font-medium text-dark ${mono ? 'font-mono text-xs break-all' : ''}`}
      >
        {value}
      </span>
    </p>
  )
}

function roleBlurb(role: string): string {
  switch (role) {
    case 'ADMIN':
      return 'Administrator with full system access. Manages users, master data, and system configuration.'
    case 'MANAGER':
      return 'Lab manager. Reviews results and approves reports.'
    case 'TECHNICIAN':
      return 'Lab technician. Performs tests and records results.'
    case 'RECEPTIONIST':
      return 'Sample intake. Receives and registers samples for testing.'
    case 'CUSTOMER':
      return 'Customer portal user. Views own quotes, samples, and reports.'
    default:
      return 'LIMS user.'
  }
}
