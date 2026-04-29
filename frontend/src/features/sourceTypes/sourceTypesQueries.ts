/* DOMAIN — TanStack Query hooks for SourceTypes */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createSourceTypeApi,
  deleteSourceTypeApi,
  listSourceTypesApi,
  updateSourceTypeApi,
} from '@/api/sourceTypes'
import type {
  SourceType,
  SourceTypeInput,
  SourceTypeListParams,
  SourceTypeListResponse,
} from '@/types/sourceType'

export const sourceTypesKey = {
  all: ['sourceTypes'] as const,
  list: (params: SourceTypeListParams) =>
    ['sourceTypes', 'list', params] as const,
  one: (sourceTypeID: string) =>
    ['sourceTypes', 'one', sourceTypeID] as const,
}

export function useSourceTypes(params: SourceTypeListParams) {
  return useQuery<SourceTypeListResponse>({
    queryKey: sourceTypesKey.list(params),
    queryFn: () => listSourceTypesApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateSourceType() {
  const qc = useQueryClient()
  return useMutation<SourceType, Error, SourceTypeInput>({
    mutationFn: createSourceTypeApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sourceTypesKey.all })
    },
  })
}

export function useUpdateSourceType() {
  const qc = useQueryClient()
  return useMutation<SourceType, Error, { sourceTypeID: string; input: SourceTypeInput }>({
    mutationFn: ({ sourceTypeID, input }) => updateSourceTypeApi(sourceTypeID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sourceTypesKey.all })
    },
  })
}

export function useDeleteSourceType() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteSourceTypeApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sourceTypesKey.all })
    },
  })
}

export function useToggleActiveSourceType() {
  const qc = useQueryClient()
  return useMutation<
    SourceType,
    Error,
    { sourceType: SourceType; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ sourceType, nextActive }) =>
      updateSourceTypeApi(sourceType.sourceTypeID, {
        name: sourceType.name,
        label: sourceType.label,
        isActive: nextActive,
      }),
    onMutate: async ({ sourceType, nextActive }) => {
      await qc.cancelQueries({ queryKey: sourceTypesKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['sourceTypes', 'list'] })
      qc.setQueriesData<SourceTypeListResponse>(
        { queryKey: ['sourceTypes', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.sourceTypeID === sourceType.sourceTypeID
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
      qc.invalidateQueries({ queryKey: sourceTypesKey.all })
    },
  })
}
