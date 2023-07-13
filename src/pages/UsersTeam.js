import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const UsersTeam = () => {
    const { auth } = useContext(AuthContext);
    const { user } = auth;

  return (
    <main>
        users team
    </main>
  )
}
