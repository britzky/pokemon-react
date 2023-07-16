import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useGetUserTeam } from "../hooks";
import { AuthContext } from "../context/AuthContext"

import { PokemonCard } from "../components";

export const UsersTeam = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userPokemon } = useGetUserTeam();

    if (!auth.loading && !auth.user) {
      navigate('/signin');
      return;
    };
    
    let localUser = localStorage.getItem('username');
   

    return (
      <main>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl">{localUser}'s Team</h1>
            <div>
            {userPokemon && userPokemon.map((pokemon) => (
              <div key={pokemon.id} className="py-7">
                <PokemonCard pokemon={pokemon} />
              </div>
              ))}
            </div>
        </div>
    </main>
  )
}
