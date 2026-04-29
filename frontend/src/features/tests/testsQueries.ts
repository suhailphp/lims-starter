/* DOMAIN — TanStack Query hooks for Tests */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTestApi,
  deleteTestApi,
  getTestApi,
  listTestsApi,
  updateTestApi,
} from '@/api/tests'
import type {
  Test,
  TestInput,
  TestUpdateInput,
  TestListParams,
  TestListResponse,
} from '@/types/test'

export const testsKey = {
  all: ['tests'] as const,
  list: (params: TestListParams) => ['tests', 'list', params] as const,
  one: (testID: string) => ['tests', 'one', testID] as const,
}

export function useTests(params: TestListParams) {
  return useQuery<TestListResponse>({
    queryKey: testsKey.list(params),
    queryFn: () => listTestsApi(params),
    placeholderData: (prev) => prev,
  })
}

/**
 * Fetch a single test by ID. Used by `?view=<id>` deep-links from
 * Global Search when the row isn't on the current paginated page.
 */
export function useTest(testID: string | null) {
  return useQuery<Test>({
    queryKey: testID ? testsKey.one(testID) : ['tests', 'one', 'noop'],
    queryFn: () => getTestApi(testID as string),
    enabled: !!testID,
  })
}

export function useCreateTest() {
  const qc = useQueryClient()
  return useMutation<Test, Error, TestInput>({
    mutationFn: createTestApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: testsKey.all })
    },
  })
}

export function useUpdateTest() {
  const qc = useQueryClient()
  return useMutation<Test, Error, { testID: string; input: TestUpdateInput }>({
    mutationFn: ({ testID, input }) => updateTestApi(testID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: testsKey.all })
    },
  })
}

export function useDeleteTest() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteTestApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: testsKey.all })
    },
  })
}

export function useToggleActiveTest() {
  const qc = useQueryClient()
  return useMutation<
    Test,
    Error,
    { test: Test; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ test, nextActive }) =>
      updateTestApi(test.testID, {
        name: test.name,
        decimalPlaces: test.decimalPlaces,
        resultType: test.resultType,
        isActive: nextActive,
      }),
    onMutate: async ({ test, nextActive }) => {
      await qc.cancelQueries({ queryKey: testsKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['tests', 'list'] })
      qc.setQueriesData<TestListResponse>(
        { queryKey: ['tests', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.testID === test.testID
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
      qc.invalidateQueries({ queryKey: testsKey.all })
    },
  })
}
