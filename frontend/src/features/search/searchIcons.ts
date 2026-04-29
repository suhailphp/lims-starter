/* DOMAIN — Map each search entity type to a Tabler icon + label.
 *
 * Centralized so SearchFilters tabs and SearchResultCard render the same
 * icon for the same entity. Adding a new entity = add a row here. */
import {
  IconApps,
  IconBuildingFactory2,
  IconCash,
  IconCategory,
  IconClipboardList,
  IconDroplet,
  IconFlask,
  IconUsers,
  type Icon,
} from '@tabler/icons-react'
import type { SearchCategory, SearchEntityType } from '@/types/search'

export interface SearchTypeMeta {
  label: string
  Icon: Icon
}

export const SEARCH_TYPE_META: Record<SearchEntityType, SearchTypeMeta> = {
  customers:  { label: 'Customers',  Icon: IconUsers },
  users:      { label: 'Users',      Icon: IconUsers },
  tests:      { label: 'Tests',      Icon: IconFlask },
  methods:    { label: 'Methods',    Icon: IconClipboardList },
  equipment:  { label: 'Equipment',  Icon: IconBuildingFactory2 },
  categories: { label: 'Categories', Icon: IconCategory },
  sources:    { label: 'Sources',    Icon: IconDroplet },
  currencies: { label: 'Currencies', Icon: IconCash },
}

export const ALL_META: SearchTypeMeta = { label: 'All', Icon: IconApps }

export const SEARCH_CATEGORY_ORDER: SearchCategory[] = [
  'all',
  'customers',
  'users',
  'tests',
  'methods',
  'equipment',
  'categories',
  'sources',
  'currencies',
]

