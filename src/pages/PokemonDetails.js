import { useContext } from "react";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { typeColors } from "../config/typeColors";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";


import { Button, ImageCard } from "../components";
import { typeIcons } from "../components/icons";

import pokeball from "../assets/icons/pokeball.svg"
import run from "../assets/icons/run.svg"


export const PokemonDetails = () => {
    const { name: pokeName } = useParams();
    const navigate = useNavigate();

    const { loading, error, pokemonInfo: pokemon, moveInfo, moves } = useFetchPokemon(pokeName);
    const { auth } = useContext(AuthContext);
    console.log(auth)
    const { user } = auth
    console.log(user)

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
    }));
    
    let PokemonIcon = typeIcons[pokemonType]

    
    const catchPokemon = async (pokemon) => {
      console.log("catchPokemon function called", pokemon)
      
      let pokemon_data = {
        pokedex_id: pokemon.id,
        name: pokemon.name,
        ability: JSON.stringify(pokemon.abilities),
        base_experience: pokemon.base_experience,
        hp_stat: pokemon.stats.find(stat => stat.stat.name === 'hp'),
        attack_stat: pokemon.stats.find(stat => stat.stat.name === 'attack'),
        defense_stat: pokemon.stats.find(stat => stat.stat.name === 'defense'),
        special_attack_stat: pokemon.stats.find(stat => stat.stat.name === 'special-attack'),
        special_defense_stat: pokemon.stats.find(stat => stat.stat.name ==='special-defense'),
        speed_stat: pokemon.stats.find(stat => stat.stat.name === 'speed'),
        pokemon_sprite: pokemon.sprites.front_default,
        pokemon_type: JSON.stringify(pokemon.types)
      }
      
      if (!user){
        navigate('/register')
      }
      try {
        const response = await fetch('/catch', {
          method: 'POST',
          headers: { 'Content-type': 'application/json'},
          body: JSON.stringify(pokemon_data),
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Failed to login');

        const responseData = await response.json();
        console.log(responseData)
      } catch(error){
        console.error('failed to fetch data', error)
      }
    
    }

  return (
    <main>
            <div className="grid grid-cols-3 gap-7 min-h-screen">
            <div className={`${typeColors[pokemonType]} border-4 py-3 rounded-full col-span-3`}>
              <div className="flex justify-around items-center">
                {PokemonIcon && <PokemonIcon />}
                <h1 className="text-7xl text-center dark:text-gray-300">{pokemon.name.toUpperCase()}</h1>
                {PokemonIcon && <PokemonIcon />}
              </div>
            </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl dark:text-gray-300 flex flex-col items-center py-4`}>
                    <h1 className="text-5xl">Abilities:</h1>
                    <div className="text-2xl flex flex-col justify-between">
                      {pokemon.abilities.map((ability) => (
                        <p className="py-3">{ability.ability.name}</p>
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
                    <ImageCard 
                      isImage={true} 
                      pokemonImage={pokemon.sprites.front_default}
                      pokemonType={pokemonType}
                    />                 
                      <div className="flex justify-around items-center mt-2">
                        <Button image={pokeball} onClick={() => catchPokemon(pokemon)}>Catch</Button>
                        <Button image={run}>Run</Button>
                      </div>
                </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl dark:text-gray-300`}>
                      <div className="flex flex-col justify-around items-center text-2xl py-5">
                        <h1 className="text-5xl pb-7">Extra Info:</h1>
                        <p className="py-3">PokeDex ID: {pokemon.order}</p>
                        <p>Base Experience: {pokemon.base_experience}</p>
                      </div>
                </div>
   
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl col-span-3 dark:text-gray-300`}>
                    <h1 className="text-5xl m-4">Moves Learned by Level-Up:</h1>
                    <div className="grid grid-flow-row-dense grid-cols-5 gap-3 text-2xl p-7">
                      {moves.map((move, index) => {
                        let moveIcon = moveInfo[index].type.name;
                        let MoveIcon = typeIcons[moveIcon]
                        return (
                          <div key={index} className="flex items-center">
                          {MoveIcon && <MoveIcon height='20' width='20' move='true' />}
                          <p className="mx-3">{move.move.name}</p>
                        </div>
                        )
                        })}
                    </div>
                </div>
                <div className={`${typeColors[pokemonType]} border-4 rounded-xl col-span-3 dark:text-gray-300 mb-7`}>
                    <h1 className="text-5xl m-4">Appears in:</h1>
                    <div className="grid grid-flow-row-dense grid-cols-5 gap-3 text-2xl p-7">
                        {pokemon.game_indices.map((game) => (
                          <>
                          <p>{game.version.name}</p>
                          </>
                        ))}
                    </div>
                </div>

            </div>
    
    </main>
  )
}
