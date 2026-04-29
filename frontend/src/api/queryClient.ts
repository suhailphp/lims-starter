/* REUSABLE */
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 min before refetch
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

/* Every successful mutation in the app produces SOMETHING the Profile
 * timeline cares about — either an AuditLog row (data mutations on the
 * 12 audited models) or a UserActivity row (login / logout / password /
 * photo events). With `staleTime: 5min`, the timeline cache wouldn't
 * refetch on next /profile mount, so freshly-written audit rows would
 * remain invisible until the user manually refreshed.
 *
 * Per-hook invalidation requires touching ~40 mutation hooks across 12
 * entities and is easy to forget when adding a new one. A global
 * mutation-cache listener catches all of them in one place — including
 * future modules — at the cost of one cheap invalidate-mark per mutation
 * (refetch only fires when an observer is mounted on the key).
 *
 * Per-hook invalidations in useLogin / useUpdateUser / etc. remain in
 * place; they're now redundant but harmless (a second invalidate on an
 * already-stale key is a no-op).
 */
queryClient.getMutationCache().subscribe((event) => {
  if (event.type === 'updated' && event.mutation.state.status === 'success') {
    queryClient.invalidateQueries({ queryKey: ['timeline'] })
    queryClient.invalidateQueries({ queryKey: ['user-activities'] })
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
  }
})
