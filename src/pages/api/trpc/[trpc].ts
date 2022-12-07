import * as trpcNext from '@trpc/server/adapters/next'
import { AppRouter, appRouter } from '@/server/routers/_app'
import { inferProcedureOutput } from '@trpc/server'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['procedures'],
> = inferProcedureOutput<AppRouter['_def']['procedures'][TRouteKey]>
