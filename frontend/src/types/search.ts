/* DOMAIN — Global Search types. */

export type SearchCategory =
  | 'all'
  | 'customers'
  | 'users'
  | 'tests'
  | 'methods'
  | 'equipment'
  | 'categories'
  | 'sources'
  | 'currencies'

export type SearchEntityType = Exclude<SearchCategory, 'all'>

export interface SearchResult {
  id: string
  type: SearchEntityType
  name: string
  subtitle: string | null
  isActive: boolean
  link: string
}

export interface SearchBucket {
  count: number
  results: SearchResult[]
}

export interface SearchAllResponse {
  query: string
  category: 'all'
  totalResults: number
  resultsByCategory: Partial<Record<SearchEntityType, SearchBucket>>
}

export interface SearchSingleResponse {
  query: string
  category: SearchEntityType
  totalResults: number
  results: SearchResult[]
}

export type SearchResponse = SearchAllResponse | SearchSingleResponse

export function isAllResponse(r: SearchResponse): r is SearchAllResponse {
  return r.category === 'all'
}

export interface SearchParams {
  q: string
  category?: SearchCategory
}
