/* DOMAIN — Confirm "Set as Base" with implications copy. */
import { useState } from 'react'
import axios from 'axios'
import { IconStar } from '@tabler/icons-react'
import { Dialog } from '@/components/ui/Dialog'
import { useSetBaseCurrency } from './currenciesQueries'
import { toast } from '@/lib/toast'
import type { Currency } from '@/types/currency'

interface Props {
  currency: Currency | null
  currentBase: Currency | null
  onClose: () => void
}

export function SetBaseCurrencyDialog({ currency, currentBase, onClose }: Props) {
  const setBase = useSetBaseCurrency()
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!currency) return
    setError(null)
    try {
      await setBase.mutateAsync(currency.currencyID)
      toast.success(`${currency.code} is now the base currency`)
      onClose()
    } catch (err) {
      const msg = formatErr(err)
      setError(msg)
      toast.error(`Failed to set base: ${msg}`)
    }
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  if (!currency) return null

  return (
    <Dialog
      open={!!currency}
      onOpenChange={(o) => !o && handleClose()}
      title="Change Base Currency"
      maxWidth="520px"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={setBase.isPending}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={setBase.isPending}
            className="btn inline-flex items-center gap-x-2 bg-primary border border-primary text-white hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {setBase.isPending && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            <IconStar size={14} />
            {setBase.isPending ? 'Switching...' : `Set ${currency.code} as Base`}
          </button>
        </>
      }
    >
      <div className="space-y-3 text-sm text-dark">
        <p>
          Promote <strong className="font-mono">{currency.code}</strong>{' '}
          ({currency.name}) to base currency
          {currentBase && (
            <>
              , replacing <strong className="font-mono">{currentBase.code}</strong>
            </>
          )}.
        </p>
        <ul className="list-disc ms-5 space-y-1.5 text-default">
          <li>The new base currency's rate becomes implicit 1.000000.</li>
          <li>The previous base currency loses its base flag (you can keep it active or deactivate it later).</li>
          <li>
            <strong className="text-dark">Existing quotes, invoices, and reports
            keep their stored exchange rate snapshots</strong> — they do not
            re-price.
          </li>
          <li>From now on, NEW transactions price against {currency.code}.</li>
        </ul>
      </div>
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
  return 'Unexpected error.'
}
