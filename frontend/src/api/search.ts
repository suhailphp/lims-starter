/* DOMAIN — typed Global Search API client. */
import { apiClient } from './axios'
import type { SearchParams, SearchResponse } from '@/types/search'

interface SearchEnvelope {
  success: boolean
  data: SearchResponse
}

export async function searchApi(params: SearchParams): Promise<SearchResponse> {
  const res = await apiClient.get<SearchEnvelope>('/search', {
    params: {
      q: params.q,
      ...(params.category && params.category !== 'all'
        ? { category: params.category }
        : {}),
    },
  })
  return res.data.data
}
