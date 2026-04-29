/* DOMAIN — TanStack Query hooks for Categories */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createCategoryApi,
  deleteCategoryApi,
  listCategoriesApi,
  updateCategoryApi,
} from '@/api/categories'
import type {
  Category,
  CategoryInput,
  CategoryListParams,
  CategoryListResponse,
} from '@/types/category'

export const categoriesKey = {
  all: ['categories'] as const,
  list: (params: CategoryListParams) =>
    ['categories', 'list', params] as const,
  one: (categoryID: string) =>
    ['categories', 'one', categoryID] as const,
}

export function useCategories(params: CategoryListParams) {
  return useQuery<CategoryListResponse>({
    queryKey: categoriesKey.list(params),
    queryFn: () => listCategoriesApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateCategory() {
  const qc = useQueryClient()
  return useMutation<Category, Error, CategoryInput>({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKey.all })
    },
  })
}

export function useUpdateCategory() {
  const qc = useQueryClient()
  return useMutation<Category, Error, { categoryID: string; input: CategoryInput }>({
    mutationFn: ({ categoryID, input }) => updateCategoryApi(categoryID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKey.all })
    },
  })
}

export function useDeleteCategory() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKey.all })
    },
  })
}

export function useToggleActiveCategory() {
  const qc = useQueryClient()
  return useMutation<
    Category,
    Error,
    { category: Category; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ category, nextActive }) =>
      updateCategoryApi(category.categoryID, {
        name: category.name,
        type: category.type,
        isActive: nextActive,
      }),
    onMutate: async ({ category, nextActive }) => {
      await qc.cancelQueries({ queryKey: categoriesKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['categories', 'list'] })
      qc.setQueriesData<CategoryListResponse>(
        { queryKey: ['categories', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.categoryID === category.categoryID
                ? { ...row, isActive: nextActive }
                : row,
            ),
          }
        },
      )
      return { snapshots }
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx?.snapshots) return
      for (const [key, data] of ctx.snapshots) qc.setQueryData(key, data)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: categoriesKey.all })
    },
  })
}
