import { useLocation } from "react-router-dom";

import avatar from '../assets/images/bowlcut.png'
import { AuthContext } from "../context/AuthContext";
import { useGetUserTeam } from "../hooks";
import { PokemonCard, ImageCard } from "../components";

export const Fight = () => {
  
    const location = useLocation();
    const selectedTrainer = location.state.selectedTrainer;

  return (
    <main>
      <div className="border-2 rounded-md p-4 dark:shadow-black shadow-xl">
        <div className="flex gap-1 items-center md:flex-row md:justify-evenly">
          <div className="flex flex-col items-center gap-1">
            <img src={avatar} alt="trainers avatar" className="w-12 h-12 rounded-lg " />
            <h1 className="text-2xl md:text-5xl">{selectedTrainer.name}</h1>
          </div>
          <div className="grid grid-cols-3">
            {selectedTrainer.pokemon.map((pokemon) => (
                <div key={pokemon.id}>
                  <ImageCard 
                    pokemonImage={pokemon.pokemon_sprite} 
                    pokemonType={pokemon.pokemon_type[0]}
                  />
                </div>
            ))}
          </div>
        </div>
        <div className="flex ">
        </div>
      </div>
    </main>
  )
}
