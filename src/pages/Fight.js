import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import avatar from '../assets/images/bowlcut.png'
import { AuthContext } from "../context/AuthContext";
import { AlertContext } from "../context/AlertContext";
import { useGetUserTeam } from "../hooks";
import { ImageCard, PlayerCard, EnemyCard } from "../components";

export const Fight = () => {
    const [userMon,  setUserMon] = useState('');
    const [trainerMon, setTrainerMon] = useState(0);
    const { auth } = useContext(AuthContext);
    const { alert, setAlert } = useContext(AlertContext);
    const { userPokemon } = useGetUserTeam();
    const location = useLocation();
    
    const trainer = location.state.selectedTrainer;
    let localUser = localStorage.getItem('username');

    useEffect(() => {
      if (trainer.pokemon[trainerMon].pokemon_stats[0].base_stat === 0 && trainerMon < trainer.pokemon.length - 1){
        setTrainerMon(trainerMon + 1)
        battlePokemon(userMon.id, trainer.pokemon[trainerMon].id)
      }
    }, [trainer.pokemon, trainerMon]);

    const handleSelectPokemon = (pokemon) => {
      setUserMon(pokemon);
      battlePokemon(userMon.id, trainer.pokemon[trainerMon].id);
    }

    const battlePokemon = async (userMonId, trainerMonId) => {
      try {
        const response = await fetch('/battle', {
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
      <div>
        <PlayerCard pokemon={userMon} trainer={localUser} />
      </div>
      }
      {trainer.pokemon[trainerMon] &&
      <div>
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
            {trainer.pokemon.map((pokemon) => (
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
