import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import avatar from '../assets/images/bowlcut.png'
import { useAuth, useAlert, useGetUserTeam } from "../hooks";
import { ImageCard, PlayerCard, EnemyCard } from "../components";
import { ProcessedPokemon } from "../types/backendapi/pokemon.type";

export const Fight = () => {
    const [userMon,  setUserMon] = useState<ProcessedPokemon | null>(null);
    const [trainerMon, setTrainerMon] = useState<number>(0);
    const auth = useAuth()
    const { alert, setAlert } = useAlert();
    const { userPokemon } = useGetUserTeam();
    const location = useLocation();
    
    const trainer = location.state.selectedTrainer;
    let localUser = localStorage.getItem('username');
    useEffect(() => {
      if (trainer.pokemon[trainerMon].pokemon_stats[0].base_stat === 0 && trainerMon < trainer.pokemon.length - 1){
        setTrainerMon(trainerMon + 1)
        if (userMon?.id !== undefined && trainer.pokemon[trainerMon]?.id !== undefined) {
          battlePokemon(userMon.id, trainer.pokemon[trainerMon].id);
        }
      }
    }, [userMon, trainer.pokemon, trainerMon]);

    const handleSelectPokemon = (pokemon: ProcessedPokemon) => {
      setUserMon(pokemon);
      if (userMon?.id !== undefined && trainer.pokemon[trainerMon]?.id !== undefined) {
        battlePokemon(userMon.id, trainer.pokemon[trainerMon].id);
      }
    }

    const battlePokemon = async (userMonId: number, trainerMonId: number) => {
      try {
        const response = await fetch('/api/battle', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_mon_id: userMonId,
            trainer_mon_id: trainerMonId
          }),
          credentials: 'include',
        })
        if (!response.ok) throw new Error("Error sending id's")
        const data = await response.json()
        setAlert(data)
      } catch(error){
        console.error("Failed sending Id's ", error);
      };
    }

  return (
    <main>
      <div className="border-2 rounded-md p-4 dark:shadow-black shadow-xl dark:bg-gray-900">
        <div className="flex gap-1 items-center md:flex-row md:justify-evenly">
          <div className="grid grid-cols-3">
            {userPokemon.map((pokemon) => (
                <div key={pokemon.id}>
                  <ImageCard 
                    pokemonImage={pokemon.pokemon_sprite} 
                    pokemonType={pokemon.pokemon_types[0]}
                    onClick={() => handleSelectPokemon(pokemon)}
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
      <div className="flex justify-center">
        <PlayerCard pokemon={userMon} trainer={localUser} />
      </div>
      }
      {trainer.pokemon[trainerMon] &&
      <div className="flex justify-center">
        <EnemyCard pokemon={trainer.pokemon[trainerMon]} trainer={trainer.name}/>
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
            {trainer.pokemon.map((pokemon: ProcessedPokemon) => (
                <div key={pokemon.id}>
                  <ImageCard 
                    pokemonImage={pokemon.pokemon_sprite} 
                    pokemonType={pokemon.pokemon_types[0]}
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
