import { trpc } from "@/utils/trpc";



export default function Home() {

  const { 
    data: pokemonPair, 
    refetch, 
    isLoading,
   } = trpc.getPokemonById.useQuery();

  //  console.log(pokemonPair);

   if(isLoading) return null

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 bg-red-800"><img className="w-full" src={pokemonPair?.pokemonOne.sprites.front_default} /></div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 bg-red-800"><img className="w-full" src={pokemonPair?.pokemonTwo.sprites.front_default} /></div>
      </div>
    </div>
  );
}

