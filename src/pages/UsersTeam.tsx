import { useNavigate } from "react-router-dom";
import { useGetUserTeam, useAuth } from "../hooks";

import { PokemonCard, Alerts } from "../components";

export const UsersTeam = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { userPokemon, releasePokemon, alert } = useGetUserTeam();
    

    if (!auth.loading && !auth.user) {
      navigate('/signin');
      return;
    };
    
    let localUser = localStorage.getItem('username');
   

    return (
      <main>
          {alert && <Alerts />}
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl">{localUser}'s Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-3">
            {userPokemon && userPokemon.map((pokemon) => (
              <div key={pokemon.id} className="px-2 flex-basis-100 md:flex-basis-50 lg:flex-basis-33">
                <PokemonCard pokemon={pokemon} onRelease={releasePokemon}/>
              </div>
              ))}
            </div>
        </div>
    </main>
  )
}
