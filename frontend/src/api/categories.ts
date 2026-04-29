/* DOMAIN — typed Category API client */
import { apiClient } from './axios'
import type {
  Category,
  CategoryInput,
  CategoryListParams,
  CategoryListResponse,
  PageMeta,
} from '@/types/category'

interface ListEnvelope {
  success: boolean
  data: Category[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Category
}

export async function listCategoriesApi(
  params: CategoryListParams,
): Promise<CategoryListResponse> {
  const res = await apiClient.get<ListEnvelope>('/categories', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getCategoryApi(categoryID: string): Promise<Category> {
  const res = await apiClient.get<SingleEnvelope>(`/categories/${categoryID}`)
  return res.data.data
}

export async function createCategoryApi(input: CategoryInput): Promise<Category> {
  const res = await apiClient.post<SingleEnvelope>('/categories', input)
  return res.data.data
}

export async function updateCategoryApi(
  categoryID: string,
  input: CategoryInput,
): Promise<Category> {
  const res = await apiClient.put<SingleEnvelope>(`/categories/${categoryID}`, input)
  return res.data.data
}

export async function deleteCategoryApi(categoryID: string): Promise<void> {
  await apiClient.delete(`/categories/${categoryID}`)
}
