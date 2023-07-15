import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

export const UsersTeam = () => {
    const [userPokemon, setUserPokemon] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    
    let localUser = localStorage.getItem('username');
    
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
          })
          if (!response.ok) {
            throw new Error("Error getting team")
          }
  
          const responseData = await response.json()
          console.log(responseData)
          setUserPokemon(responseData)
  
        } catch (error) {
          console.error('Error: ', error)
        }
      }
      getUserTeam()
    }, [auth.user, navigate, auth.loading])

  return (
    <main>
        <div>
          <h1>{localUser}'s Pokemon</h1>
        </div>
        <ul>

        </ul>
    </main>
  )
}
