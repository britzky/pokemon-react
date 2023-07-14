import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const UsersTeam = () => {
    const { auth } = useContext(AuthContext);
    const { user, loading } = auth;

    if (loading) return <main>Loading...</main>

  return (
    <main>
        <div>
            <h1>Users Team</h1>
            {user ? (
            <>
            <p>{user.first_name}</p>
            </>) : (
            <>
            <p>Nothin</p>
            </>)}
        </div>
    </main>
  )
}
