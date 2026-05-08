/* DOMAIN — User Add / Edit modal.
 * Pattern reference: features/sources/SourceFormDialog.tsx (FK pattern locked).
 *
 * Notes vs Customer:
 *   - Create has a one-time `password` field; edit does not (use reset-password flow).
 *   - `customerID` FKSelect renders only when role === 'CUSTOMER' (cross-field rule
 *      mirrors backend Zod superRefine).
 *   - `role` uses EnumSelect (5 static options).
 *   - Caption under password documents the mustChangePassword side effect.
 */
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { FormField, inputClass } from '@/components/ui/FormField'
import {
  createInvalidHandler,
  handleApiError,
  useFormSeed,
} from '@/utils/formErrors'

const KNOWN_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'password',
  'role',
  'customerID',
  'isActive',
  'profilePhotoAttachmentID',
] as const
import { EnumSelect, type EnumOption } from '@/components/ui/EnumSelect'
import { FKSelect, type FKOption } from '@/components/ui/FKSelect'
import { AttachmentUpload } from '@/components/ui/AttachmentUpload'
import { useCustomers } from '@/features/customers/customersQueries'
import { useUploadAttachment } from '@/features/attachments/queries'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useRefreshMe } from '@/features/auth/useRefreshMe'
import {
  userCreateFormSchema,
  userUpdateFormSchema,
  type UserCreateFormValues,
  type UserUpdateFormValues,
  ROLES,
} from './userSchema'
import { useCreateUser, useUpdateUser } from './usersQueries'
import { ROLE_LABEL } from './RoleBadge'
import { toast } from '@/lib/toast'
import type {
  User,
  UserCreateInput,
  UserUpdateInput,
  UserRole,
} from '@/types/user'

type Mode =
  | { kind: 'create' }
  | { kind: 'edit'; user: User }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: Mode
  onSuccess?: (user: User) => void
}

const CREATE_DEFAULTS: UserCreateFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'TECHNICIAN',
  customerID: null,
  isActive: true,
}

function valuesFromUser(u: User): UserUpdateFormValues {
  return {
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    customerID: u.customerID,
    isActive: u.isActive,
  }
}

const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

const ROLE_OPTIONS: EnumOption[] = ROLES.map((r) => ({
  value: r,
  label: ROLE_LABEL[r as UserRole],
}))

export function UserFormDialog({ open, onOpenChange, mode, onSuccess }: Props) {
  const create = useCreateUser()
  const update = useUpdateUser()
  const uploadAttachment = useUploadAttachment()
  const refreshMe = useRefreshMe()
  const currentUserID = useAppSelector((s) => s.auth.user?.userID)
  const isEdit = mode.kind === 'edit'

  // Photo workflow state lives outside RHF — File objects don't roundtrip
  // through Zod, and the upload happens AFTER the user save (deferred flow).
  // - pendingFile: locally-picked file, not yet uploaded.
  // - photoCleared: edit mode, user clicked Remove on the existing photo.
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [photoCleared, setPhotoCleared] = useState(false)

  const customersQ = useCustomers({ ...LOOKUP_PARAMS, sort: 'name' })
  const customerOptions = useMemo<FKOption[]>(
    () =>
      (customersQ.data?.data ?? []).map((c) => ({
        value: c.customerID,
        label: c.name,
      })),
    [customersQ.data],
  )

  const schema = isEdit ? userUpdateFormSchema : userCreateFormSchema

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateFormValues>({
    // Both schemas share the create shape (create has a superset incl. password).
    resolver: zodResolver(schema as typeof userCreateFormSchema),
    mode: 'onTouched',
    defaultValues: CREATE_DEFAULTS,
  })

  const selectedRole = useWatch({ control, name: 'role' })
  const watchedFirst = useWatch({ control, name: 'firstName' })
  const watchedLast = useWatch({ control, name: 'lastName' })
  const showCustomerFK = selectedRole === 'CUSTOMER'
  const photoName = `${watchedFirst ?? ''} ${watchedLast ?? ''}`.trim() || 'New user'

  useFormSeed({
    active: open,
    id: isEdit ? mode.user.userID : null,
    seed: () => {
      if (isEdit) {
        reset({
          ...CREATE_DEFAULTS,
          ...valuesFromUser(mode.user),
          // password is unused in edit mode but the field exists in form values type
          password: '',
        })
      } else {
        reset(CREATE_DEFAULTS)
      }
      // Reset photo workflow only on the same identity transition that
      // re-seeds the form. A save-failure re-render must NOT discard the
      // user's already-picked photo file.
      setPendingFile(null)
      setPhotoCleared(false)
    },
  })

  // When role changes away from CUSTOMER, clear the customerID so the cross-field
  // rule passes silently. Otherwise the user has to manually clear it.
  useEffect(() => {
    if (!showCustomerFK) {
      setValue('customerID', null, { shouldValidate: false })
    }
  }, [showCustomerFK, setValue])

  const onSubmit = handleSubmit(async (values) => {
    try {
      let saved: User
      if (isEdit) {
        const input: UserUpdateInput = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          role: values.role,
          customerID: values.role === 'CUSTOMER' ? (values.customerID ?? null) : null,
          isActive: values.isActive,
        }
        saved = await update.mutateAsync({
          userID: mode.user.userID,
          input,
        })
      } else {
        const input: UserCreateInput = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: values.role,
          customerID: values.role === 'CUSTOMER' ? (values.customerID ?? null) : null,
          isActive: values.isActive,
        }
        saved = await create.mutateAsync(input)
      }

      // Phase 2: photo flow (deferred until after save).
      // Partial success is OK — user is already persisted; if photo upload
      // fails the user can re-attach via Edit. We toast a warning so the
      // admin knows the save itself succeeded.
      let photoFailed: string | null = null
      try {
        if (pendingFile) {
          // Upload first, then attach to user via PUT.
          const att = await uploadAttachment.mutateAsync(pendingFile)
          saved = await update.mutateAsync({
            userID: saved.userID,
            input: { profilePhotoAttachmentID: att.attachmentID },
          })
        } else if (photoCleared && saved.profilePhotoAttachmentID) {
          // Edit mode: user clicked Remove on existing photo.
          saved = await update.mutateAsync({
            userID: saved.userID,
            input: { profilePhotoAttachmentID: null },
          })
        }
      } catch (photoErr) {
        photoFailed = formatPhotoErr(photoErr)
      }

      const fullName = `${saved.firstName} ${saved.lastName}`
      if (photoFailed) {
        toast.error(
          `User "${fullName}" saved, but photo failed: ${photoFailed}`,
        )
      } else {
        toast.success(
          isEdit
            ? `User "${fullName}" updated`
            : `User "${fullName}" created`,
        )
      }
      // If the admin edited their own row, refresh the auth slice so the
      // header avatar (and dropdown name/role) reflect the change without
      // a re-login. Fire-and-forget; cosmetic.
      if (saved.userID === currentUserID) {
        void refreshMe()
      }
      onSuccess?.(saved)
      onOpenChange(false)
    } catch (err) {
      handleApiError(err, setError, 'UserFormDialog', {
        knownFields: KNOWN_FIELDS,
        conflictField: 'email',
      })
    }
  }, createInvalidHandler('UserFormDialog', setError))

  const submitLabel = isSubmitting
    ? 'Saving...'
    : isEdit
      ? 'Update User'
      : 'Add User'
  const title = isEdit ? 'Edit User' : 'Add User'

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="user-form"
            disabled={isSubmitting}
            className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {submitLabel}
          </button>
        </>
      }
    >
      <form id="user-form" onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="contents">
          <div className="grid md:grid-cols-12 gap-4">
            <div className="col-span-12">
              <p className="mb-1 block text-sm font-semibold text-dark">
                Profile Photo
              </p>
              <AttachmentUpload
                existing={photoCleared ? null : (isEdit ? mode.user.profilePhoto : null)}
                pendingFile={pendingFile}
                onSelect={(f) => {
                  setPendingFile(f)
                  setPhotoCleared(false)
                }}
                onRemove={() => {
                  setPendingFile(null)
                  setPhotoCleared(true)
                }}
                name={photoName}
                disabled={isSubmitting}
              />
            </div>

            <FormField
              id="user-firstName"
              label="First Name"
              required
              error={errors.firstName?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="user-firstName"
                type="text"
                {...register('firstName')}
                className={inputClass(!!errors.firstName)}
              />
            </FormField>

            <FormField
              id="user-lastName"
              label="Last Name"
              required
              error={errors.lastName?.message}
              className="sm:col-span-6 col-span-12"
            >
              <input
                id="user-lastName"
                type="text"
                {...register('lastName')}
                className={inputClass(!!errors.lastName)}
              />
            </FormField>

            <FormField
              id="user-email"
              label="Email"
              required
              error={errors.email?.message}
              className="col-span-12"
            >
              <input
                id="user-email"
                type="email"
                autoComplete="off"
                {...register('email')}
                className={inputClass(!!errors.email)}
              />
            </FormField>

            {!isEdit && (
              <FormField
                id="user-password"
                label="Temporary Password"
                required
                error={errors.password?.message}
                helpText="Min 8 characters with at least one letter and one digit. The user will be required to change this on first login."
                className="col-span-12"
              >
                <input
                  id="user-password"
                  type="text"
                  autoComplete="new-password"
                  {...register('password')}
                  className={inputClass(!!errors.password)}
                />
              </FormField>
            )}

            <FormField
              id="user-role"
              label="Role"
              required
              error={errors.role?.message}
              className="sm:col-span-6 col-span-12"
            >
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <EnumSelect
                    inputId="user-role"
                    options={ROLE_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v || '')}
                    onBlur={field.onBlur}
                    hasError={!!errors.role}
                    ariaLabel="Role"
                  />
                )}
              />
            </FormField>

            {showCustomerFK && (
              <FormField
                id="user-customerID"
                label="Customer"
                required
                error={errors.customerID?.message}
                helpText="Required for CUSTOMER role"
                className="sm:col-span-6 col-span-12"
              >
                <Controller
                  name="customerID"
                  control={control}
                  render={({ field }) => (
                    <FKSelect
                      inputId="user-customerID"
                      options={customerOptions}
                      value={field.value ?? ''}
                      onChange={(v) => field.onChange(v || null)}
                      onBlur={field.onBlur}
                      isLoading={customersQ.isLoading}
                      placeholder="Select customer..."
                      hasError={!!errors.customerID}
                      ariaLabel="Customer"
                    />
                  )}
                />
              </FormField>
            )}

            <div className="col-span-12">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-dark">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="size-4 rounded border-border-color text-primary focus:ring-0"
                />
                <span className="font-medium">Active</span>
              </label>
            </div>

            {errors.root?.message && (
              <div className="col-span-12 rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
                {errors.root.message}
              </div>
            )}
          </div>
        </fieldset>
      </form>
    </Dialog>
  )
}

function formatPhotoErr(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    return data?.message ?? err.message
  }
  return 'Unexpected error'
}

