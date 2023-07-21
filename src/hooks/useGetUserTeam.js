import { useState, useEffect } from 'react';


export const useGetUserTeam = () => {
    const [userPokemon, setUserPokemon] = useState([]);

    const releasePokemon = async (id) => {
      try {
        const response = await fetch('/release', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({pokemon_id: id}),
          credentials: 'include',
        })
        if (!response.ok){
          throw new Error('Error releasing pokemon');
        }
        setUserPokemon((prevPokemon) => prevPokemon.filter(pokemon => pokemon.id !== id))
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    }


    useEffect(() => {
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
      }, []);
  
    return { userPokemon, releasePokemon }
}
