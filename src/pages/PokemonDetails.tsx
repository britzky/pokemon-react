import { typeColors } from "../config/typeColors";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth, useAlert, useFetchPokemon, usePokemonPreprocess } from "../hooks";
import { Button, ImageCard, Alerts } from "../components";
import { typeIcons } from "../components/icons";

import pokeball from "../assets/icons/pokeball.svg"
import { Pokemon, Move } from "../types/pokemon";

export const PokemonDetails = () => {
  const auth = useAuth();
  const { alert, setAlert } = useAlert();
  
  const navigate = useNavigate();
  const preprocessPokemon = usePokemonPreprocess();
  const { name: pokeName } = useParams();
  const name = pokeName || '';

    if (!pokeName) {
      return <main>An error has occured!</main>
    }

    
    const { loading, error, pokemonInfo: pokemon, moves } = useFetchPokemon(pokeName);
    if (!pokemon){
      return <main>Loading...</main>
    }
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
    
    let PokemonIcon = typeIcons[pokemonType as keyof typeof typeIcons]
    
    const catchPokemon = async (pokemon: Pokemon, moves: Move[]) => {
      console.log("catchPokemon function called", pokemon)
      console.log("moves object: ", moves)
      console.log("Pokemon Abilities: ", pokemon.abilities)
      console.log("Pokemon Stats: ", pokemon.stats)
      if (!moves){
        <main>Loading moves...</main>
      }
      
      const processPokemon = preprocessPokemon(pokemon, moves)
      console.log("Processed Pokemon: ", processPokemon)
      
      if (!auth.user){
        navigate('/signin');
        return;
      }
      try {
        const response = await fetch('/catch', {
          method: 'POST',
          headers: { 'Content-type': 'application/json'},
          body: JSON.stringify(processPokemon),
          credentials: 'include',
        })
        if (!response.ok) {
          const responseData = await response.json()
          setAlert(responseData)
          throw new Error(responseData.message);
        }
        const responseData = await response.json();
        localStorage.setItem('alert', JSON.stringify(responseData))
        setAlert(responseData)
        console.log(alert)
        navigate('/myteam')
      } catch(error){
        console.error('failed to fetch data', error)
      }
    
    }
    let pokeColor = typeColors[pokemonType as keyof typeof typeColors]

  return (
    <main>
    { alert && <Alerts /> }
            <div className="grid grid-cols-3 gap-7 min-h-screen">
            <div className={`${pokeColor} border-4 py-3 rounded-full col-span-3`}>
              <div className="flex justify-around items-center">
                {PokemonIcon && <PokemonIcon />}
                <h1 className="text-7xl text-center dark:text-gray-300">{pokemon.name.toUpperCase()}</h1>
                {PokemonIcon && <PokemonIcon />}
              </div>
            </div>
                <div className={`${pokeColor} border-4 rounded-xl flex flex-col items-center py-4`}>
                    <h1 className="text-5xl">Abilities:</h1>
                    <div className="text-2xl flex flex-col justify-between">
                      {pokemon.abilities.map((ability, index) => (
                        <p key={index} className="py-3">{ability.ability.name}</p>
                      ))}
                    </div>
                </div>
                <div className={`${pokeColor} border-4 rounded-xl row-span-2 dark:text-gray-300 flex flex-col items-center py-4`}>
                    <div>
                    <h1 className="text-5xl pb-3">Stats:</h1>
                    </div>
                    <div className="flex flex-col justify-around h-full text-xl">
                      {pokemonStats.map((stat, index) => (
                        <div key={index} className="flex justify-between">
                        <p>{stat.statName.toUpperCase()}:</p>
                        <p>{stat.baseStat}</p>
                        </div>
                      ))}
                    </div>
                </div>
                <div className={`${pokeColor} col-start-3 row-span-2 border-4 rounded-xl dark:text-gray-300 flex flex-col justify-between pb-6`}> 
                    <ImageCard 
                      pokemonImage={pokemon.sprites.front_default}
                      pokemonType={pokemonType}
                    />                 
                      <div className="flex justify-center mt-2">
                        <Button image={pokeball} onClick={() => catchPokemon(pokemon, moves)}>Catch</Button>
                      </div>
                </div>
                <div className={`${pokeColor} border-4 rounded-xl dark:text-gray-300`}>
                      <div className="flex flex-col justify-around items-center text-2xl py-5">
                        <h1 className="text-5xl pb-7">Extra Info:</h1>
                        <p className="py-3">PokeDex ID: {pokemon.order}</p>
                        <p>Base Experience: {pokemon.base_experience}</p>
                      </div>
                </div>
   
                <div className={`${pokeColor} border-4 rounded-xl col-span-3 dark:text-gray-300`}>
                    <h1 className="text-5xl m-4">Moves Learned by Level-Up:</h1>
                    <div className="grid grid-flow-row-dense grid-cols-5 gap-3 text-2xl p-7">
                      {moves.map((move, index) => {
                        let moveIcon = move.type;
                        let MoveIcon = typeIcons[moveIcon as keyof typeof typeIcons]
                        return (
                          <div key={index} className="flex items-center">
                          {MoveIcon && <MoveIcon height='20' width='20' small='true' />}
                          <p className="mx-3">{move.name}</p>
                        </div>
                        )
                        })}
                    </div>
                </div>
            </div>
    </main>
  )
}
