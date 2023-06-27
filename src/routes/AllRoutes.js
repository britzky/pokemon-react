import { Routes, Route } from "react-router-dom";
import { PokemonDetails, Home, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-gray-800">
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="pokemon/:name" element={<PokemonDetails />} />  
            <Route path ="*" element={<PageNotFound />} />
        </Routes>
    </div>
  )
}
