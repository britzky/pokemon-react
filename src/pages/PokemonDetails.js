import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { useParams } from "react-router-dom";

import { Button } from "../components";

import pokeball from "../assets/icons/pokeball.svg"
import run from "../assets/icons/run.svg"


export const PokemonDetails = () => {
    const { name: pokeName } = useParams();

    const { loading, error, pokemonInfo: pokemon } = useFetchPokemon(pokeName);

    if (loading) {
        return <main> Loading...</main>
    }
    if (error){
        return <main>{error}</main>
    }

  return (
    <main>
            <div className="bg-red-500 mb-20 pb-5">
              <h1 className="text-7xl text-center mt-10">{pokemon.name}</h1>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-7 min-h-screen">
                <div className="border">
                    <h1 className="text-5xl text-center">Abilities:</h1>

                </div>
                <div className="border row-span-2">
                    <h1 className="text-5xl text-center">Stats:</h1>
                </div>
                <div className=" col-start-3 row-span-2 border">                  
                    <img className="object-contain w-full" src={pokemon.sprites.front_default} alt={pokemon.name} />
                      <div className="flex justify-around items-center mt-14">
                        <Button image={pokeball}>Catch</Button>
                        <Button image={run}>Run</Button>
                      </div>
                </div>
                <div className="border">
                    <h1 className="text-5xl text-center">Evolutions:</h1>
                </div>
   
                <div className="border col-span-3">
                    <h1 className="text-5xl m-4">Locations:</h1>
                </div>

            </div>
    
    </main>
  )
}
