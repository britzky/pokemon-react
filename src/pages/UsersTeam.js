import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useGetUserTeam } from "../hooks";
import { AuthContext } from "../context/AuthContext"

import { PokemonCard, Alerts } from "../components";

export const UsersTeam = () => {
    const { auth } = useContext(AuthContext);
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
              <div key={pokemon.id} className="py-7 px-2 flex-basis-100 md:flex-basis-50 lg:flex-basis-33">
                <PokemonCard pokemon={pokemon} onRelease={releasePokemon}/>
              </div>
              ))}
            </div>
        </div>
    </main>
  )
}
