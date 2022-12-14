import React from 'react';
import { trpc } from "@/utils/trpc";
import { inferPokemonQueryResponse } from "./api/trpc/[trpc]";
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";

const btn = "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";



export default function Home() {


  const
  {
    data,
    refetch,
    isLoading,
  }
   = trpc.getPokemonById.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const voteMutation = trpc.castVote.useMutation();

   if(isLoading) return null
   

  const voteForRoundest = (selected: number) => {
    if(!data) return
    if(selected === data.pokemonOne.id) {
      voteMutation.mutate({ votedFor: data.pokemonOne.id, votedAgainst: data.pokemonTwo.id });
    } else {
      voteMutation.mutate({ votedFor: data.pokemonTwo.id, votedAgainst: data.pokemonOne.id });
    }
    refetch()
  }


  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">

      <Head>
        <title>Chunkiest Pokemon</title>
      </Head>

      <div className="text-2xl text-center pt-8">Which Pokemon is Rounder</div>
      
        {data && ( 
          <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
            <PokemonListing pokemon={data.pokemonOne} vote={() => voteForRoundest(data.pokemonOne.id)}/>          
            <div className="p-8">Vs</div>
            <PokemonListing pokemon={data.pokemonTwo} vote={() => voteForRoundest(data.pokemonTwo.id)}/>   
            <div className="p-2" />       
          </div>
        )}
        {!data && <Image alt="spinn loader" src="/rings.svg" className="w-48"  width={130} height={130} layout="fixed"/>}
        <div className="w-full text-xl text-center pb-2" >
          <Link href="/results">
            <a>Results</a>
          </Link>
        </div>

      </div>
      
  );
}



type PokemonFromServer = inferPokemonQueryResponse["pokemonOne"];
const PokemonListing: React.FC<{pokemon: PokemonFromServer, vote: () => void}> = (props) => {

  return (

    <div className="flex flex-col items-center">
    <Image alt="pokemonImage" className="w-64 h-64" src={props.pokemon.spriteUrl} width={256} height={256} layout="fixed" />
    <div className="text-xl text-center capitalize mt-[-2rem] ">{props.pokemon.name}</div>
    <button className={btn} onClick={() => props.vote()}>Rounder</button>
  </div>
  )

};

