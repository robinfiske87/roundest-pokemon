import { PokemonClient } from "pokenode-ts";

import { prisma } from "../src/server/utils/prisma";

const doBackfill = async () => {
  const api = new PokemonClient();
  const allPokemon = await api.listPokemons(0, 493);

  const formattedPokemon = allPokemon.results.map((pokemon, index) => ({
    id: index + 1,
    name: (pokemon as { name: string }).name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`  }))

  // console.log("pokemon?", allPokemon);

  const creation = await prisma.pokemon.createMany({ data: formattedPokemon });

  console.log("creation?", creation);

}

doBackfill()