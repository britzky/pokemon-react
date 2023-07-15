import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

import { PokemonCard } from "../components";

export const UsersTeam = () => {
    const [userPokemon, setUserPokemon] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!auth.loading && !auth.user) {
        navigate('/signin');
        return;
      };
      const getUserTeam = async () => {
        try {
          const response = await fetch('/team', {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error("Error getting team");
          };
          
          const responseData = await response.json();
          console.log(responseData);
          setUserPokemon(responseData);
          
        } catch (error) {
          console.error('Error: ', error);
        };
      };
      getUserTeam();
    }, [auth.user, navigate, auth.loading]);
    
    let localUser = localStorage.getItem('username');
   

    return (
      <main>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl">{localUser}'s Team</h1>
            <div>
            {userPokemon && userPokemon.map((pokemon) => (
              <div className="py-7">
                <PokemonCard pokemon={pokemon} />
              </div>
              ))}
            </div>
        </div>
    </main>
  )
}
