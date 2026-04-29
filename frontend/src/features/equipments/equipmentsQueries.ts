/* DOMAIN — TanStack Query hooks for Equipments */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createEquipmentApi,
  deleteEquipmentApi,
  listEquipmentsApi,
  updateEquipmentApi,
} from '@/api/equipments'
import type {
  Equipment,
  EquipmentInput,
  EquipmentListParams,
  EquipmentListResponse,
} from '@/types/equipment'

export const equipmentsKey = {
  all: ['equipments'] as const,
  list: (params: EquipmentListParams) => ['equipments', 'list', params] as const,
  one: (equipmentID: string) => ['equipments', 'one', equipmentID] as const,
}

export function useEquipments(params: EquipmentListParams) {
  return useQuery<EquipmentListResponse>({
    queryKey: equipmentsKey.list(params),
    queryFn: () => listEquipmentsApi(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateEquipment() {
  const qc = useQueryClient()
  return useMutation<Equipment, Error, EquipmentInput>({
    mutationFn: createEquipmentApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: equipmentsKey.all })
    },
  })
}

export function useUpdateEquipment() {
  const qc = useQueryClient()
  return useMutation<Equipment, Error, { equipmentID: string; input: EquipmentInput }>({
    mutationFn: ({ equipmentID, input }) => updateEquipmentApi(equipmentID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: equipmentsKey.all })
    },
  })
}

export function useDeleteEquipment() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteEquipmentApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: equipmentsKey.all })
    },
  })
}

export function useToggleActiveEquipment() {
  const qc = useQueryClient()
  return useMutation<
    Equipment,
    Error,
    { equipment: Equipment; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ equipment, nextActive }) =>
      updateEquipmentApi(equipment.equipmentID, {
        name: equipment.name,
        model: equipment.model,
        serialNumber: equipment.serialNumber,
        calibrationDueDate: equipment.calibrationDueDate,
        isActive: nextActive,
      }),
    onMutate: async ({ equipment, nextActive }) => {
      await qc.cancelQueries({ queryKey: equipmentsKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['equipments', 'list'] })
      qc.setQueriesData<EquipmentListResponse>(
        { queryKey: ['equipments', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.equipmentID === equipment.equipmentID
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
      qc.invalidateQueries({ queryKey: equipmentsKey.all })
    },
  })
}
