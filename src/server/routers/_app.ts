import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';

import { prisma } from '@/server/utils/prisma';

export const appRouter =
router({
  getPokemonById: publicProcedure
    .query(async () => {
      const [first, second] = getOptionsForVote();

      const bothPokemon = await prisma.pokemon.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothPokemon.length !== 2) {
        throw new Error('Could not find both pokemon');
      }
      
      return { pokemonOne: bothPokemon[0], pokemonTwo: bothPokemon[1] } ;
  }),
  castVote: publicProcedure
    .input(z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }))
    .mutation(async ({input}) => {
        const voteInDb = await prisma.vote.create({
          data: {
            votedAgainstId: input.votedAgainst,
            votedForId: input.votedFor,
          }
        });
    return { success: true, vote: voteInDb }
}),
});

// export type definition of API
export type AppRouter = typeof appRouter;