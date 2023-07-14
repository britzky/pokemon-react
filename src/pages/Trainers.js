import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

export const Trainers = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate()

    if (auth.loading) return <div>Loading...</div>

    if (!auth.user){
      navigate('/signin')
    }

  return (
    <main>Trainers</main>
  )
}
