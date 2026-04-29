/* DOMAIN — TanStack Query hooks for Users */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createUserApi,
  deleteUserApi,
  getUserApi,
  listUsersApi,
  resetUserPasswordApi,
  updateUserApi,
} from '@/api/users'
import { userActivitiesKey, timelineKey } from '@/features/userActivities/queries'
import type {
  User,
  UserCreateInput,
  UserUpdateInput,
  UserListParams,
  UserListResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
} from '@/types/user'

export const usersKey = {
  all: ['users'] as const,
  list: (params: UserListParams) => ['users', 'list', params] as const,
  one: (userID: string) => ['users', 'one', userID] as const,
}

export function useUsers(params: UserListParams) {
  return useQuery<UserListResponse>({
    queryKey: usersKey.list(params),
    queryFn: () => listUsersApi(params),
    placeholderData: (prev) => prev,
  })
}

/**
 * Fetch a single user by ID. Used by `?view=<id>` deep-links from
 * Global Search when the row isn't on the current paginated page.
 */
export function useUser(userID: string | null) {
  return useQuery<User>({
    queryKey: userID ? usersKey.one(userID) : ['users', 'one', 'noop'],
    queryFn: () => getUserApi(userID as string),
    enabled: !!userID,
  })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation<User, Error, UserCreateInput>({
    mutationFn: createUserApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKey.all })
    },
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation<User, Error, { userID: string; input: UserUpdateInput }>({
    mutationFn: ({ userID, input }) => updateUserApi(userID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKey.all })
      // Backend may have logged PROFILE_UPDATED / PHOTO_UPDATED on the
      // edited user's UserActivity feed AND emitted an AuditLog row. If
      // that user is the current session's user, their Profile feed +
      // unified timeline both need a refetch.
      qc.invalidateQueries({ queryKey: userActivitiesKey.all })
      qc.invalidateQueries({ queryKey: timelineKey.all })
    },
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKey.all })
      // The DELETE writes a soft-delete AuditLog row.
      qc.invalidateQueries({ queryKey: timelineKey.all })
    },
  })
}

export function useResetUserPassword() {
  const qc = useQueryClient()
  return useMutation<
    ResetPasswordResponse,
    Error,
    { userID: string; input: ResetPasswordInput }
  >({
    mutationFn: ({ userID, input }) => resetUserPasswordApi(userID, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKey.all })
      // Target user gets a PASSWORD_RESET activity row.
      qc.invalidateQueries({ queryKey: userActivitiesKey.all })
      qc.invalidateQueries({ queryKey: timelineKey.all })
    },
  })
}

/**
 * Toggle a user's `isActive` flag with optimistic UI.
 * Reuses the PUT endpoint with a minimal admin-allowed payload.
 */
export function useToggleActiveUser() {
  const qc = useQueryClient()
  return useMutation<
    User,
    Error,
    { user: User; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ user, nextActive }) =>
      updateUserApi(user.userID, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        customerID: user.customerID,
        isActive: nextActive,
      }),
    onMutate: async ({ user, nextActive }) => {
      await qc.cancelQueries({ queryKey: usersKey.all })
      const snapshots = qc.getQueriesData({ queryKey: ['users', 'list'] })
      qc.setQueriesData<UserListResponse>(
        { queryKey: ['users', 'list'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map((row) =>
              row.userID === user.userID
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
      for (const [key, data] of ctx.snapshots) {
        qc.setQueryData(key, data)
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: usersKey.all })
    },
  })
}
