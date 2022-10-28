import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter, AppRouter } from '../../../server/routers/_app';
import { inferProcedureOutput } from '@trpc/server/dist/core';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export type inferPokemonQueryResponse = inferProcedureOutput<AppRouter['getPokemonById']>;

