/* DOMAIN — TanStack Query hooks for Sources */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createSourceApi,
  deleteSourceApi,
  listSourcesApi,
  updateSourceApi,
} from '@/api/sources'
import type {
  Source,
  SourceInput,
  SourceUpdateInput,
  SourceListParams,
  SourceListResponse,
} from '@/types/source'

export const sourcesKey = {
  all: ['sources'] as const,
  list: (params: SourceListParams) => ['sources', 'list', params] as const,
  one: (sourceID: string) => ['sources', 'one', sourceID] as const,
}

export function useSources(params: SourceListParams) {
  return useQuery<SourceListResponse>({
    queryKey: sourcesKey.list(params),
    queryFn: () => listSourcesApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateSource() {
  const qc = useQueryClient()
  return useMutation<Source, Error, SourceInput>({
    mutationFn: createSourceApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sourcesKey.all })
    },
  })
}

export function useUpdateSource() {
  const qc = useQueryClient()
  return useMutation<Source, Error, { sourceID: string; input: SourceUpdateInput }>({
    mutationFn: ({ sourceID, input }) => updateSourceApi(sourceID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sourcesKey.all })
    },
  })
}

export function useDeleteSource() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteSourceApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sourcesKey.all })
    },
  })
}

export function useToggleActiveSource() {
  const qc = useQueryClient()
  return useMutation<
    Source,
    Error,
    { source: Source; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ source, nextActive }) =>
      updateSourceApi(source.sourceID, {
        sourceTypeID: source.sourceTypeID,
        categoryID: source.categoryID,
        sourceName: source.sourceName,
        equipmentName: source.equipmentName,
        componentType: source.componentType,
        model: source.model,
        make: source.make,
        isActive: nextActive,
      }),
    onMutate: async ({ source, nextActive }) => {
      await qc.cancelQueries({ queryKey: sourcesKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['sources', 'list'] })
      qc.setQueriesData<SourceListResponse>(
        { queryKey: ['sources', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.sourceID === source.sourceID
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
      qc.invalidateQueries({ queryKey: sourcesKey.all })
    },
  })
}
