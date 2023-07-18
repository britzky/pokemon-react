import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useGetTrainersTeam } from "../hooks";
import { TrainerCard } from "../components";

export const Trainers = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { trainers, loading, error } = useGetTrainersTeam();

    if (auth.loading || loading) return <main>Loading...</main>

    if (error) return <main>Error!</main>

    if (!auth.user && !auth.loading){
      navigate('/signin')
    }

  return (
    <main>
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-bold text-5xl">Trainers:</h1>
        {trainers && trainers.map((trainer) => (
          <TrainerCard trainer={trainer} />
        ))}
      </div>
    </main>
  )
}
