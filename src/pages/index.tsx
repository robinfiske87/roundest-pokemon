import { trpc } from "@/utils/trpc";
import Image from "next/image";



export default function Home() {

  const data 
  // { 
  //   data: pokemonPair, 
  //   refetch, 
  //   isLoading,
  //  }
    = trpc.getPokemonById.useQuery(), { refetch, isLoading } = data;

  //  console.log(pokemonPair);

  // console.log(data);

   if(isLoading) return null

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          <Image alt="pokemon1" className="h-full" src={data?.data?.pokemonOne.sprites.front_default || "srcTextFiller"} width="100%" height="100%" />
          <div>{data?.data?.pokemonOne.name}</div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <Image alt="pokemon2" className="" src={data?.data?.pokemonTwo.sprites.front_default || "srcTextFiller"} width="100%" height="100%" />
          <div>{data?.data?.pokemonTwo.name}</div>
        </div>
      </div>
    </div>
  );
}

