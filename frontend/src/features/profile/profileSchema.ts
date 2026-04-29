/* DOMAIN — Self-edit form for the Profile page.
 *
 * Email/role/customer/isActive are admin-only, so they're omitted here.
 * Backend enforces SELF_ALLOWED_UPDATE_FIELDS = ['firstName', 'lastName',
 * 'profilePhotoAttachmentID']; the photo flows through AttachmentUpload, not
 * RHF, so this schema only covers name fields.
 */
import { z } from 'zod'

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(100, 'Must be 100 characters or fewer'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(100, 'Must be 100 characters or fewer'),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
