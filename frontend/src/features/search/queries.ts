/* DOMAIN — TanStack Query hook for Global Search.
 *
 * The page debounces the typed input (300 ms) and feeds the debounced value
 * here. We keep `placeholderData: prev` so the UI never flashes empty while
 * the next request is in flight; the thin progress bar drives loading
 * affordance instead. */
import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/api/search'
import type { SearchCategory, SearchResponse } from '@/types/search'

export const searchKey = {
  all: ['search'] as const,
  query: (q: string, category: SearchCategory) =>
    ['search', q, category] as const,
}

interface UseGlobalSearchOpts {
  q: string
  category: SearchCategory
}

export function useGlobalSearch({ q, category }: UseGlobalSearchOpts) {
  const trimmed = q.trim()
  const enabled = trimmed.length >= 2

  return useQuery<SearchResponse>({
    queryKey: searchKey.query(trimmed, category),
    queryFn: () => searchApi({ q: trimmed, category }),
    enabled,
    placeholderData: (prev) => prev,
  })
}
