/* DOMAIN — TanStack Query hooks for Units */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createUnitApi,
  deleteUnitApi,
  listUnitsApi,
  updateUnitApi,
} from '@/api/units'
import type {
  Unit,
  UnitInput,
  UnitUpdateInput,
  UnitListParams,
  UnitListResponse,
} from '@/types/unit'

export const unitsKey = {
  all: ['units'] as const,
  list: (params: UnitListParams) => ['units', 'list', params] as const,
  one: (unitID: string) => ['units', 'one', unitID] as const,
}

export function useUnits(params: UnitListParams) {
  return useQuery<UnitListResponse>({
    queryKey: unitsKey.list(params),
    queryFn: () => listUnitsApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateUnit() {
  const qc = useQueryClient()
  return useMutation<Unit, Error, UnitInput>({
    mutationFn: createUnitApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: unitsKey.all })
    },
  })
}

export function useUpdateUnit() {
  const qc = useQueryClient()
  return useMutation<Unit, Error, { unitID: string; input: UnitUpdateInput }>({
    mutationFn: ({ unitID, input }) => updateUnitApi(unitID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: unitsKey.all })
    },
  })
}

export function useDeleteUnit() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteUnitApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: unitsKey.all })
    },
  })
}

export function useToggleActiveUnit() {
  const qc = useQueryClient()
  return useMutation<
    Unit,
    Error,
    { unit: Unit; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ unit, nextActive }) =>
      updateUnitApi(unit.unitID, {
        name: unit.name,
        symbol: unit.symbol,
        isActive: nextActive,
      }),
    onMutate: async ({ unit, nextActive }) => {
      await qc.cancelQueries({ queryKey: unitsKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['units', 'list'] })
      qc.setQueriesData<UnitListResponse>(
        { queryKey: ['units', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.unitID === unit.unitID
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
      qc.invalidateQueries({ queryKey: unitsKey.all })
    },
  })
}
