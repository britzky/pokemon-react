import { useLocation } from "react-router-dom";

import avatar from '../assets/images/bowlcut.png'
import { AuthContext } from "../context/AuthContext";
import { useGetUserTeam } from "../hooks";
import { PokemonCard, ImageCard } from "../components";
import { useContext, useState } from "react";

export const Fight = () => {
    const [userMon,  setUserMon] = useState('');
    const { auth } = useContext(AuthContext);
    const { userPokemon } = useGetUserTeam();;
    const location = useLocation();
    const trainer = location.state.selectedTrainer;

    let localUser = localStorage.getItem('username');
    console.log('User Pokemon: ', userPokemon)

  return (
    <main>
      <div className="border-2 rounded-md p-4 dark:shadow-black shadow-xl dark:bg-gray-900">
        <div className="flex gap-1 items-center md:flex-row md:justify-evenly">
          <div className="grid grid-cols-3">
            {userPokemon.map((pokemon) => (
                <div key={pokemon.id}>
                  <ImageCard 
                    pokemonImage={pokemon.pokemon_sprite} 
                    pokemonType={pokemon.pokemon_type[0]}
                    onClick={() => setUserMon(pokemon)}
                  />
                </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1">
            <img src={avatar} alt="trainers avatar" className="w-12 h-12 rounded-lg " />
            <h1 className="text-2xl md:text-5xl">{localUser}</h1>
          </div>
        </div>
      </div>
      {userMon && 
      <div>
        <PokemonCard pokemon={userMon} fight trainer={localUser} />
      </div>
      }
      {trainer &&
      <div>
        <PokemonCard pokemon={trainer.pokemon[0]} fight trainer={trainer.name}/>
      </div>
      }
      <div>
      </div>
      <div className="border-2 rounded-md p-4 dark:shadow-black shadow-xl dark:bg-gray-900">
        <div className="flex gap-1 items-center md:flex-row md:justify-evenly">
          <div className="flex flex-col items-center gap-1">
            <img src={avatar} alt="trainers avatar" className="w-12 h-12 rounded-lg " />
            <h1 className="text-2xl md:text-5xl">{trainer.name}</h1>
          </div>
          <div className="grid grid-cols-3">
            {trainer.pokemon.map((pokemon) => (
                <div key={pokemon.id}>
                  <ImageCard 
                    pokemonImage={pokemon.pokemon_sprite} 
                    pokemonType={pokemon.pokemon_type[0]}
                  />
                </div>
            ))}
          </div>
        </div>
      </div>
      <div>

      </div>
    </main>
  )
}
