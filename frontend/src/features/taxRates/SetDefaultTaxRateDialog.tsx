/* DOMAIN — Confirm "Set as Default" with implications copy. */
import { useState } from 'react'
import axios from 'axios'
import { IconStar } from '@tabler/icons-react'
import { Dialog } from '@/components/ui/Dialog'
import { useSetDefaultTaxRate } from './taxRatesQueries'
import { toast } from '@/lib/toast'
import type { TaxRate } from '@/types/taxRate'

interface Props {
  taxRate: TaxRate | null
  currentDefault: TaxRate | null
  onClose: () => void
}

export function SetDefaultTaxRateDialog({ taxRate, currentDefault, onClose }: Props) {
  const setDefault = useSetDefaultTaxRate()
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!taxRate) return
    setError(null)
    try {
      await setDefault.mutateAsync(taxRate.taxRateID)
      toast.success(`${taxRate.code} is now the default tax rate`)
      onClose()
    } catch (err) {
      const msg = formatErr(err)
      setError(msg)
      toast.error(`Failed to set default: ${msg}`)
    }
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  if (!taxRate) return null

  return (
    <Dialog
      open={!!taxRate}
      onOpenChange={(o) => !o && handleClose()}
      title="Change Default Tax Rate"
      maxWidth="520px"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={setDefault.isPending}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={setDefault.isPending}
            className="btn inline-flex items-center gap-x-2 bg-primary border border-primary text-white hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            {setDefault.isPending && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            <IconStar size={14} />
            {setDefault.isPending ? 'Switching...' : `Set ${taxRate.code} as Default`}
          </button>
        </>
      }
    >
      <div className="space-y-3 text-sm text-dark">
        <p>
          Promote <strong className="font-mono">{taxRate.code}</strong>{' '}
          ({taxRate.name}) to default tax rate
          {currentDefault && (
            <>
              , replacing <strong className="font-mono">{currentDefault.code}</strong>
            </>
          )}.
        </p>
        <ul className="list-disc ms-5 space-y-1.5 text-default">
          <li>New quotes and invoices will pre-select this rate.</li>
          <li>The previous default keeps its row but loses its default flag.</li>
          <li>
            <strong className="text-dark">Existing quotes, invoices, and reports
            keep their stored tax snapshots</strong> — they do not change.
          </li>
          <li>Workflow setting <span className="font-mono">default_tax_rate_code</span> is updated atomically.</li>
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
