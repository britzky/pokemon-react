import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { typeColors } from "../config/typeColors";
import { useParams } from "react-router-dom";

import { Button, Card } from "../components";

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

    let pokemonType = pokemon.types[0].type.name;
    
  return (
    <main>
            <div className={`${typeColors[pokemonType]} border-4 mb-20 pb-10 rounded-full`}>
              <h1 className="text-7xl text-center mt-10">{pokemon.name.toUpperCase()}</h1>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-7 min-h-screen">
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl shadow-lg hover:shadow-xl`}>
                    <h1 className="text-5xl text-center">Abilities:</h1>

                </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl row-span-2 shadow-lg hover:shadow-xl`}>
                    <h1 className="text-5xl text-center">Stats:</h1>
                </div>
                <div className={`${typeColors[pokemonType]} col-start-3 row-span-2 border-4 rounded-xl shadow-lg hover:shadow-xl`}> 
                    <Card 
                      isImage={true} 
                      pokemonImage={pokemon.sprites.front_default}
                      pokemonType={pokemonType}
                    />                 
                      <div className="flex justify-around items-center mt-14">
                        <Button image={pokeball}>Catch</Button>
                        <Button image={run}>Run</Button>
                      </div>
                </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl shadow-lg hover:shadow-xl`}>
                    <h1 className="text-5xl text-center">Evolutions:</h1>
                </div>
   
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl col-span-3 shadow-lg hover:shadow-xl`}>
                    <h1 className="text-5xl m-4">Locations:</h1>
                </div>

            </div>
    
    </main>
  )
}
