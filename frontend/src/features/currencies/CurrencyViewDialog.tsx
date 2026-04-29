/* DOMAIN — Currency View modal (read-only) with rate history timeline. */
import { Dialog } from '@/components/ui/Dialog'
import { useExchangeRates } from './currenciesQueries'
import { IconStar } from '@tabler/icons-react'
import type { Currency, ExchangeRate } from '@/types/currency'

interface Props {
  currency: Currency | null
  onClose: () => void
  onEdit: (currency: Currency) => void
  onDelete: (currency: Currency) => void
  onUpdateRate: (currency: Currency) => void
  onSetBase: (currency: Currency) => void
}

export function CurrencyViewDialog({
  currency,
  onClose,
  onEdit,
  onDelete,
  onUpdateRate,
  onSetBase,
}: Props) {
  const { data: ratesData, isLoading: ratesLoading } = useExchangeRates(
    currency?.currencyID ?? null,
    { page: 1, limit: 50, sort: 'effectiveDate', order: 'desc' },
  )

  if (!currency) return null

  const rates = ratesData?.data ?? []

  return (
    <Dialog
      open={!!currency}
      onOpenChange={(o) => !o && onClose()}
      title={`${currency.code} — ${currency.name}`}
      maxWidth="720px"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white"
          >
            Close
          </button>
          {!currency.isBase && (
            <button
              type="button"
              onClick={() => onDelete(currency)}
              className="btn bg-danger border border-danger text-white hover:bg-danger-700"
            >
              Delete
            </button>
          )}
          {!currency.isBase && currency.isActive && (
            <button
              type="button"
              onClick={() => onSetBase(currency)}
              className="btn bg-white border border-border-color text-dark hover:bg-light"
            >
              <IconStar size={14} className="me-1" />
              Set as Base
            </button>
          )}
          {!currency.isBase && (
            <button
              type="button"
              onClick={() => onUpdateRate(currency)}
              className="btn bg-white border border-border-color text-dark hover:bg-light"
            >
              Update Rate
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(currency)}
            className="btn bg-primary border border-primary text-white hover:bg-primary-800"
          >
            Edit
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <Section title="Details">
          <ViewField label="Code" value={currency.code} mono />
          <ViewField label="Name" value={currency.name} />
          <ViewField label="Symbol" value={currency.symbol} mono />
          <ViewField label="Decimal Places" value={String(currency.decimalPlaces)} />
          <ViewField label="Display Order" value={String(currency.displayOrder)} />
        </Section>

        <Section title="Status">
          <div className="grid grid-cols-3 gap-2 py-1.5">
            <span className="col-span-1 text-sm text-default">Status</span>
            <span className="col-span-2 flex items-center gap-2">
              {currency.isActive ? (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-light text-default border border-border-color">
                  <span className="bg-gray-400 w-[5px] h-[5px] block rounded-full me-1" />
                  Inactive
                </span>
              )}
              {currency.isBase && (
                <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                  <IconStar size={10} className="me-1" />
                  Base Currency
                </span>
              )}
            </span>
          </div>
        </Section>

        <Section title="Current Rate">
          {currency.isBase ? (
            <p className="text-sm text-default">
              Base currency — rate is implicit{' '}
              <span className="font-mono text-dark">1.000000</span>.
            </p>
          ) : currency.currentRate ? (
            <div className="rounded-lg border border-border-color bg-light px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-semibold text-dark">
                  {currency.currentRate.rate}
                </span>
                <span className="text-sm text-default">
                  {currency.code} per 1 base unit
                </span>
              </div>
              {currency.currentRate.effectiveDate && (
                <div className="mt-1 text-xs text-default">
                  Effective {currency.currentRate.effectiveDate}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-danger">
              No exchange rate on file. Use “Update Rate” to add one.
            </p>
          )}
        </Section>

        {!currency.isBase && (
          <Section title="Rate History">
            {ratesLoading ? (
              <div className="py-3 text-sm text-default">Loading history...</div>
            ) : rates.length === 0 ? (
              <p className="text-sm text-default">No history yet.</p>
            ) : (
              <Timeline rates={rates} />
            )}
          </Section>
        )}

        <Section title="Audit">
          <ViewField label="Created" value={formatDateTime(currency.createdAt)} />
          <ViewField label="Last Updated" value={formatDateTime(currency.updatedAt)} />
        </Section>
      </div>
    </Dialog>
  )
}

function Timeline({ rates }: { rates: ExchangeRate[] }) {
  return (
    <ol className="relative border-s border-border-color ms-2">
      {rates.map((r, i) => {
        const isCurrent = r.expiryDate === null
        return (
          <li key={r.exchangeRateID} className="ms-4 mb-4 last:mb-0">
            <span
              className={`absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white ${isCurrent ? 'bg-primary' : 'bg-gray-400'}`}
            />
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-semibold text-dark">{r.rate}</span>
              {isCurrent && (
                <span className="inline-flex items-center badge rounded-lg text-[10px] font-medium bg-primary-50 text-primary border border-primary">
                  Current
                </span>
              )}
            </div>
            <div className="text-xs text-default mt-0.5">
              Effective {r.effectiveDate}
              {r.expiryDate ? ` → ${r.expiryDate}` : ' → present'}
              {r.source && r.source !== 'manual' ? ` · ${r.source}` : ''}
            </div>
            {r.notes && (
              <div className="text-xs text-default mt-0.5 italic">{r.notes}</div>
            )}
            {i === rates.length - 1 && i > 0 && (
              <div className="text-[11px] text-gray-500 mt-1">Initial rate</div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h6 className="text-sm font-semibold text-gray-900 mb-2">{title}</h6>
      <div>{children}</div>
    </div>
  )
}

function ViewField({
  label,
  value,
  mono,
}: {
  label: string
  value: string | null | undefined
  mono?: boolean
}) {
  const empty = value == null || value === ''
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5">
      <span className="col-span-1 text-sm text-default">{label}</span>
      <span
        className={`col-span-2 text-sm ${empty ? 'text-gray-400' : 'text-dark'} ${mono ? 'font-mono' : ''}`}
      >
        {empty ? '—' : value}
      </span>
    </div>
  )
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}
