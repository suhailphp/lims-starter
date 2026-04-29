/* DOMAIN — Currency delete confirmation. */
import { useState } from 'react'
import axios from 'axios'
import { Dialog } from '@/components/ui/Dialog'
import { useDeleteCurrency } from './currenciesQueries'
import { toast } from '@/lib/toast'
import type { Currency } from '@/types/currency'

interface Props {
  currency: Currency | null
  onClose: () => void
}

export function CurrencyDeleteDialog({ currency, onClose }: Props) {
  const del = useDeleteCurrency()
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!currency) return
    setError(null)
    try {
      await del.mutateAsync(currency.currencyID)
      toast.success(`Currency "${currency.code}" deleted`)
      onClose()
    } catch (err) {
      const msg = formatErr(err)
      setError(msg)
      toast.error(`Failed to delete currency: ${msg}`)
    }
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  return (
    <Dialog
      open={!!currency}
      onOpenChange={(o) => !o && handleClose()}
      title="Delete currency"
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
        Delete <strong className="text-dark">{currency?.code} — {currency?.name}</strong>?
        Its exchange rate history will be soft-deleted and the currency removed from
        the active list. Existing quotes / invoices that snapshotted this currency
        keep their stored rate.
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
