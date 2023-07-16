import { useState, useEffect } from 'react';

export const useGetUserTeam = () => {
    const [userPokemon, setUserPokemon] = useState([]);

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
  
    return { userPokemon }
}
