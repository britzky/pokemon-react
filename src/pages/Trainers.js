import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const Trainers = () => {
    const { auth } = useContext(AuthContext);
    const { user } = auth;
    
  return (
    <main>Trainers</main>
  )
}
