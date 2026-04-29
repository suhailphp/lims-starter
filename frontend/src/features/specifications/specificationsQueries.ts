/* DOMAIN — TanStack Query hooks for Specifications */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createSpecificationApi,
  deleteSpecificationApi,
  listSpecificationsApi,
  updateSpecificationApi,
} from '@/api/specifications'
import type {
  Specification,
  SpecificationInput,
  SpecificationListParams,
  SpecificationListResponse,
} from '@/types/specification'

export const specificationsKey = {
  all: ['specifications'] as const,
  list: (params: SpecificationListParams) =>
    ['specifications', 'list', params] as const,
  one: (specificationID: string) =>
    ['specifications', 'one', specificationID] as const,
}

export function useSpecifications(params: SpecificationListParams) {
  return useQuery<SpecificationListResponse>({
    queryKey: specificationsKey.list(params),
    queryFn: () => listSpecificationsApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateSpecification() {
  const qc = useQueryClient()
  return useMutation<Specification, Error, SpecificationInput>({
    mutationFn: createSpecificationApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: specificationsKey.all })
    },
  })
}

export function useUpdateSpecification() {
  const qc = useQueryClient()
  return useMutation<Specification, Error, { specificationID: string; input: SpecificationInput }>({
    mutationFn: ({ specificationID, input }) => updateSpecificationApi(specificationID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: specificationsKey.all })
    },
  })
}

export function useDeleteSpecification() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteSpecificationApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: specificationsKey.all })
    },
  })
}

export function useToggleActiveSpecification() {
  const qc = useQueryClient()
  return useMutation<
    Specification,
    Error,
    { specification: Specification; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ specification, nextActive }) =>
      updateSpecificationApi(specification.specificationID, {
        name: specification.name,
        isActive: nextActive,
      }),
    onMutate: async ({ specification, nextActive }) => {
      await qc.cancelQueries({ queryKey: specificationsKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['specifications', 'list'] })
      qc.setQueriesData<SpecificationListResponse>(
        { queryKey: ['specifications', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.specificationID === specification.specificationID
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
      qc.invalidateQueries({ queryKey: specificationsKey.all })
    },
  })
}
