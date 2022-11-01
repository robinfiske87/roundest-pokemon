import React from "react";
import type { GetServerSideProps } from "next"
import { prisma } from "@/server/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-hack"
import Image from "next/image";


const getPokemonInOrder = async () => {
    return await prisma.pokemon.findMany({orderBy: {
        votesFor: {_count: "desc"},
    },
    select: {
        id: true,
        name: true,
        spriteUrl: true,
        _count: {
            select: {
                votesFor: true,
                votesAgainst: true, 
                }
            },
        },
    });
}

type PokemonQueryResults = AsyncReturnType<typeof getPokemonInOrder>;

const PokemonListing: React.FC<{pokemon: PokemonQueryResults[number] }> = (props) => {
    return <div className="flex border-b p-2">
        <Image 
            alt="pokemonImage" 
            className="w-64 h-64" 
            src={props.pokemon.spriteUrl} 
            width={64} height={64} layout="fixed" />
            <div className="capitalize">{props.pokemon.name}</div>
        </div>
}

const ResultsPage: React.FC<{
    pokemon: AsyncReturnType<typeof getPokemonInOrder>;
    }> = (props) => {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl p-4">Results</h2>
            <div className="p-2"></div>
            <div className="flex flex-col w-full max-w-2xl border">
            {props.pokemon.map((currentPokemon, index) => {
                return <PokemonListing pokemon={currentPokemon} key={index} />
            })}</div>
        </div>
        )
}

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
    const pokemonOrdered = await getPokemonInOrder();
    return { props: { pokemon: pokemonOrdered }, revalidate: 60 };
}
