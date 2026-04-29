/* DOMAIN — Empty/idle state for the Search page. */
import { IconSearch, IconMoodSad } from '@tabler/icons-react'

interface EmptyStateProps {
  /** Differentiates "no query yet" from "no results". */
  variant: 'idle' | 'no-results' | 'too-short'
  query?: string
}

export function EmptyState({ variant, query }: EmptyStateProps) {
  const isIdle = variant === 'idle' || variant === 'too-short'
  const Icon = isIdle ? IconSearch : IconMoodSad

  const title =
    variant === 'idle'
      ? 'Start typing to search'
      : variant === 'too-short'
        ? 'Keep typing…'
        : `No results found for "${query}"`

  const message =
    variant === 'idle'
      ? 'Search across customers, users, tests, methods, equipment, categories, sources and currencies.'
      : variant === 'too-short'
        ? 'Enter at least 2 characters to begin searching.'
        : 'Try a different keyword or change the category filter above.'

  return (
    <div className="bg-white border border-border-color rounded-lg p-12 text-center">
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-light text-default border border-border-color mb-4">
        <Icon size={28} />
      </span>
      <h6 className="text-dark mb-2">{title}</h6>
      <p className="text-default text-sm max-w-md mx-auto">{message}</p>
    </div>
  )
}
