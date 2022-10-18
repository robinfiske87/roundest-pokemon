import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';

import { PokemonClient } from 'pokenode-ts';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    }),
  getPokemonById: publicProcedure
    .query(async () => {
      const [first, second] = getOptionsForVote();

      const api = new PokemonClient();
      const firstPokemon = await api.getPokemonById(first)
      const secondPokemon = await api.getPokemonById(second)
      
      return {pokemonOne: firstPokemon, pokemonTwo: secondPokemon};
  })
    
});

// export type definition of API
export type AppRouter = typeof appRouter;