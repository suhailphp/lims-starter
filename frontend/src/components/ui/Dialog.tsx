/* REUSABLE — Radix Dialog wearing vendor's modal frame
 *   Vendor reference: vendor/src/pages/systems-security/users-roles/userModal.tsx (frame).
 *   We replace Preline's hs-overlay open/close with Radix React state.
 *   Visual classes lifted verbatim from vendor.
 */
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  children: ReactNode
  footer?: ReactNode
  /** Tailwind/CSS max-width value; vendor default is 800px */
  maxWidth?: string
}

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  footer,
  maxWidth = '800px',
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* z-index 10000 sits above the sidebar (z-9999 in vendor's .sidebar-twocol.sidebar)
            so the backdrop dims the sidebar too — vendor's Preline overlay achieves the same
            via hs-overlay-backdrop at a higher z. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[10000] bg-black/40" />
        <div className="fixed inset-0 z-[10000] overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full mx-auto" style={{ maxWidth }}>
              {/* Vendor frame — userModal.tsx:16 */}
              <DialogPrimitive.Content className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5 focus:outline-none">
                {/* Header — userModal.tsx:17 */}
                <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color">
                  <DialogPrimitive.Title asChild>
                    <h4 className="text-lg font-bold text-gray-900 leading-tight">
                      {title}
                    </h4>
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close asChild>
                    {/* Close button — vendor userModal.tsx:21 reference, with
                      * `focus:bg-danger` removed: Radix autofocuses the close
                      * button when the dialog opens, leaving it stuck red
                      * until the user clicks elsewhere. We keep red ONLY for
                      * hover (the "destructive action coming" affordance) and
                      * use a subtle ring for keyboard-focus visibility. */}
                    <button
                      type="button"
                      className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                      aria-label="Close"
                    >
                      <IconX size={14} />
                    </button>
                  </DialogPrimitive.Close>
                </div>

                {children}

                {footer && (
                  /* Footer — userModal.tsx:140 */
                  <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
                    {footer}
                  </div>
                )}
              </DialogPrimitive.Content>
            </div>
          </div>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
