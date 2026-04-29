/* DOMAIN — Category delete confirmation.
 * Backend returns 409 with `errors[]` blockers when Units/Tests/Sources reference the category.
 * Render those blockers inline so the user understands what to clean up first.
 */
import { useState } from 'react'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { useDeleteCategory } from './categoriesQueries'
import { toast } from '@/lib/toast'
import type { Category } from '@/types/category'

interface Props {
  category: Category | null
  onClose: () => void
}

interface Blocker {
  field: string
  message: string
}

export function CategoryDeleteDialog({ category, onClose }: Props) {
  const del = useDeleteCategory()
  const [error, setError] = useState<string | null>(null)
  const [blockers, setBlockers] = useState<Blocker[]>([])

  const handleConfirm = async () => {
    if (!category) return
    setError(null)
    setBlockers([])
    try {
      await del.mutateAsync(category.categoryID)
      toast.success(`Category "${category.name}" deleted`)
      onClose()
    } catch (err) {
      const { msg, blockers: bs } = formatErr(err)
      setError(msg)
      setBlockers(bs)
      toast.error(`Failed to delete category: ${msg}`)
    }
  }

  const handleClose = () => {
    setError(null)
    setBlockers([])
    onClose()
  }

  return (
    <Dialog
      open={!!category}
      onOpenChange={(o) => !o && handleClose()}
      title="Delete category"
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
        Delete <strong className="text-dark">{category?.name}</strong>? This
        will remove the category from your active list.
      </p>
      {error && (
        <div className="mt-4 rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
          <p className="font-medium">{error}</p>
          {blockers.length > 0 && (
            <ul className="mt-2 list-disc list-inside space-y-1">
              {blockers.map((b) => (
                <li key={b.field}>{b.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Dialog>
  )
}

function formatErr(err: unknown): { msg: string; blockers: Blocker[] } {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; errors?: Blocker[] }
      | undefined
    return {
      msg: data?.message ?? err.message,
      blockers: Array.isArray(data?.errors) ? data.errors : [],
    }
  }
  return { msg: 'Unexpected error. Please try again.', blockers: [] }
}
