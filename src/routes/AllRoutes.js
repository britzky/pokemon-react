import { Routes, Route } from "react-router-dom";
import { Register, SignIn, PokemonDetails, Home, PageNotFound, UsersTeam, Trainers } from "../pages";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-gray-800 bg-gray-100">
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="pokemon/:name" element={<PokemonDetails />} />
            <Route path="myteam" element={<UsersTeam />} />
            <Route path="trainers" element={<Trainers />} />  
            <Route path ="*" element={<PageNotFound />} />
        </Routes>
    </div>
  )
}
