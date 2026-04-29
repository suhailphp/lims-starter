/* REUSABLE — global toast facade.
 *
 * Wraps `react-hot-toast` so callers import a stable LIMS-namespaced API:
 *   toast.success('Customer created')
 *   toast.error('Failed to delete customer')
 *
 * The Toaster mount lives in App.tsx. Visual styling matches vendor's
 * success/danger color tokens.
 */
import baseToast from 'react-hot-toast'

export const toast = {
  success(message: string) {
    baseToast.success(message)
  },
  error(message: string) {
    baseToast.error(message)
  },
  info(message: string) {
    baseToast(message)
  },
}

export { Toaster } from 'react-hot-toast'

/** Default toaster options — vendor success/danger color tokens. */
export const toasterOptions = {
  position: 'top-right' as const,
  toastOptions: {
    duration: 3500,
    style: {
      background: '#fff',
      color: '#101828',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      fontSize: '14px',
    },
    success: {
      iconTheme: { primary: '#009966', secondary: '#fff' },
    },
    error: {
      iconTheme: { primary: '#F83636', secondary: '#fff' },
      duration: 5000,
    },
  },
}
