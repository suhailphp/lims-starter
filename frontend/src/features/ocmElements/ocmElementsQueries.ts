/* DOMAIN — TanStack Query hooks for OcmElements */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createOcmElementApi,
  deleteOcmElementApi,
  listOcmElementsApi,
  updateOcmElementApi,
} from '@/api/ocmElements'
import type {
  OcmElement,
  OcmElementInput,
  OcmElementListParams,
  OcmElementListResponse,
} from '@/types/ocmElement'

export const ocmElementsKey = {
  all: ['ocmElements'] as const,
  list: (params: OcmElementListParams) => ['ocmElements', 'list', params] as const,
  one: (ocmElementID: string) => ['ocmElements', 'one', ocmElementID] as const,
}

export function useOcmElements(params: OcmElementListParams) {
  return useQuery<OcmElementListResponse>({
    queryKey: ocmElementsKey.list(params),
    queryFn: () => listOcmElementsApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateOcmElement() {
  const qc = useQueryClient()
  return useMutation<OcmElement, Error, OcmElementInput>({
    mutationFn: createOcmElementApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ocmElementsKey.all })
    },
  })
}

export function useUpdateOcmElement() {
  const qc = useQueryClient()
  return useMutation<OcmElement, Error, { ocmElementID: string; input: OcmElementInput }>({
    mutationFn: ({ ocmElementID, input }) => updateOcmElementApi(ocmElementID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ocmElementsKey.all })
    },
  })
}

export function useDeleteOcmElement() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteOcmElementApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ocmElementsKey.all })
    },
  })
}

export function useToggleActiveOcmElement() {
  const qc = useQueryClient()
  return useMutation<
    OcmElement,
    Error,
    { ocmElement: OcmElement; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ ocmElement, nextActive }) =>
      updateOcmElementApi(ocmElement.ocmElementID, {
        name: ocmElement.name,
        symbol: ocmElement.symbol,
        unit: ocmElement.unit,
        normalRangeMin: numOrNull(ocmElement.normalRangeMin),
        normalRangeMax: numOrNull(ocmElement.normalRangeMax),
        cautionRangeMin: numOrNull(ocmElement.cautionRangeMin),
        cautionRangeMax: numOrNull(ocmElement.cautionRangeMax),
        criticalRangeMin: numOrNull(ocmElement.criticalRangeMin),
        criticalRangeMax: numOrNull(ocmElement.criticalRangeMax),
        isActive: nextActive,
      }),
    onMutate: async ({ ocmElement, nextActive }) => {
      await qc.cancelQueries({ queryKey: ocmElementsKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['ocmElements', 'list'] })
      qc.setQueriesData<OcmElementListResponse>(
        { queryKey: ['ocmElements', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.ocmElementID === ocmElement.ocmElementID
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
      qc.invalidateQueries({ queryKey: ocmElementsKey.all })
    },
  })
}

/** OcmElement DECIMAL fields come back as numeric strings from Sequelize.
 * Convert to number-or-null for the update payload. */
function numOrNull(v: number | string | null | undefined): number | null {
  if (v == null || v === '') return null
  const n = typeof v === 'string' ? Number(v) : v
  return Number.isFinite(n) ? n : null
}
