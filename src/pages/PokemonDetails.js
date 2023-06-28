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
    let pokemonStats = pokemon.stats.map((stat) => ({
        baseStat: stat.base_stat,
        statName: stat.stat.name,
    }))

    
  return (
    <main>
            <div className={`${typeColors[pokemonType]} border-4 my-20 pb-10 rounded-full`}>
              <h1 className="text-7xl text-center mt-10 dark:text-gray-300">{pokemon.name.toUpperCase()}</h1>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-7 min-h-screen">
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl dark:text-gray-300 flex flex-col items-center`}>
                    <h1 className="text-5xl">Abilities:</h1>
                    <div className="text-2xl">
                      {pokemon.abilities.map((ability) => (
                        <p className="py-7">{ability.ability.name}</p>
                      ))}
                    </div>
                </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl row-span-2 dark:text-gray-300 flex flex-col items-center py-4`}>
                    <div>
                    <h1 className="text-5xl pb-3">Stats:</h1>
                    </div>
                    <div className="flex flex-col justify-around h-full text-xl">
                      {pokemonStats.map((stat) => (
                        <div className="flex justify-between">
                        <p>{stat.statName.toUpperCase()}:</p>
                        <p>{stat.baseStat}</p>
                        </div>
                      ))}
                    </div>
                </div>
                <div className={`${typeColors[pokemonType]} col-start-3 row-span-2 border-4 rounded-xl dark:text-gray-300 flex flex-col justify-between pb-6`}> 
                    <Card 
                      isImage={true} 
                      pokemonImage={pokemon.sprites.front_default}
                      pokemonType={pokemonType}
                    />                 
                      <div className="flex flex-col items-center text-2xl">
                        <p>PokeDex ID: {pokemon.order}</p>
                        <p>Base Experience: {pokemon.base_experience}</p>
                      </div>
                      <div className="flex justify-around items-center">
                        <Button image={pokeball}>Catch</Button>
                        <Button image={run}>Run</Button>
                      </div>
                </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl dark:text-gray-300`}>
                    <h1 className="text-5xl text-center">Evolutions:</h1>
                </div>
   
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl col-span-3 dark:text-gray-300`}>
                    <h1 className="text-5xl m-4">Appears in:</h1>
                    <div className="flex flex-wrap gap-10 text-2xl p-7">
                        {pokemon.game_indices.map((game) => (
                          <>
                          <p>{game.version.name}</p>
                          <p>|</p>
                          </>
                        ))}
                    </div>
                </div>

            </div>
    
    </main>
  )
}
