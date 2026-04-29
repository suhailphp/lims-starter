/* DOMAIN — User delete confirmation. */
import { useState } from 'react'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { useDeleteUser } from './usersQueries'
import { toast } from '@/lib/toast'
import type { User } from '@/types/user'

interface Props {
  user: User | null
  onClose: () => void
}

export function UserDeleteDialog({ user, onClose }: Props) {
  const del = useDeleteUser()
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!user) return
    setError(null)
    try {
      await del.mutateAsync(user.userID)
      toast.success(`User "${user.firstName} ${user.lastName}" deleted`)
      onClose()
    } catch (err) {
      const msg = formatErr(err)
      setError(msg)
      toast.error(`Failed to delete user: ${msg}`)
    }
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  return (
    <Dialog
      open={!!user}
      onOpenChange={(o) => !o && handleClose()}
      title="Delete user"
      maxWidth="480px"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={del.isPending}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={del.isPending}
            className="btn inline-flex items-center gap-x-2 bg-danger border border-danger text-white hover:bg-danger-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            {del.isPending && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {del.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </>
      }
    >
      <p className="text-sm text-default">
        Delete{' '}
        <strong className="text-dark">
          {user?.firstName} {user?.lastName}
        </strong>
        ? Their active sessions will be revoked and they will lose access
        immediately.
      </p>
      {error && (
        <div className="mt-4 rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
          {error}
        </div>
      )}
    </Dialog>
  )
}

function formatErr(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    return data?.message ?? err.message
  }
  return 'Unexpected error. Please try again.'
}
