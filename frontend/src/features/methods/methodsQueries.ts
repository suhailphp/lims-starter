/* DOMAIN — TanStack Query hooks for Methods */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createMethodApi,
  deleteMethodApi,
  listMethodsApi,
  updateMethodApi,
} from '@/api/methods'
import type {
  Method,
  MethodInput,
  MethodUpdateInput,
  MethodListParams,
  MethodListResponse,
} from '@/types/method'

export const methodsKey = {
  all: ['methods'] as const,
  list: (params: MethodListParams) => ['methods', 'list', params] as const,
  one: (methodID: string) => ['methods', 'one', methodID] as const,
}

export function useMethods(params: MethodListParams) {
  return useQuery<MethodListResponse>({
    queryKey: methodsKey.list(params),
    queryFn: () => listMethodsApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateMethod() {
  const qc = useQueryClient()
  return useMutation<Method, Error, MethodInput>({
    mutationFn: createMethodApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: methodsKey.all })
    },
  })
}

export function useUpdateMethod() {
  const qc = useQueryClient()
  return useMutation<Method, Error, { methodID: string; input: MethodUpdateInput }>({
    mutationFn: ({ methodID, input }) => updateMethodApi(methodID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: methodsKey.all })
    },
  })
}

export function useDeleteMethod() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteMethodApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: methodsKey.all })
    },
  })
}

export function useToggleActiveMethod() {
  const qc = useQueryClient()
  return useMutation<
    Method,
    Error,
    { method: Method; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ method, nextActive }) =>
      updateMethodApi(method.methodID, {
        code: method.code,
        description: method.description,
        isDefault: method.isDefault,
        isActive: nextActive,
      }),
    onMutate: async ({ method, nextActive }) => {
      await qc.cancelQueries({ queryKey: methodsKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['methods', 'list'] })
      qc.setQueriesData<MethodListResponse>(
        { queryKey: ['methods', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.methodID === method.methodID
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
      qc.invalidateQueries({ queryKey: methodsKey.all })
    },
  })
}
