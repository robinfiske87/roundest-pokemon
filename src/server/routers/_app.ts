import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
// import * as trcp from '@trpc/server';
import { getOptionsForVote } from '@/utils/getRandomPokemon';

import { prisma } from '@/server/utils/prisma';

import { PokemonClient } from 'pokenode-ts';

export const appRouter =
router({
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

      const bothPokemon = [{name:firstPokemon.name, sprites: firstPokemon.sprites, id: first}, {name: secondPokemon.name, sprites: secondPokemon.sprites, id: second}]
      
      return { pokemonOne: bothPokemon[0], pokemonTwo: bothPokemon[1] } ;
  }),
  castVote: publicProcedure
    .input(z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }))
    .mutation(async ({input}) => {
      console.log(input)
        const voteInDb = await prisma.vote.create({
          data: {
            ...input
          }
        });
    return { success: true, vote: voteInDb }
}),
});

// export type definition of API
export type AppRouter = typeof appRouter;