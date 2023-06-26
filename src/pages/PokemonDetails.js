import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { useParams } from "react-router-dom";


export const PokemonDetails = () => {
    const { name: pokeName } = useParams();

    const { loading, error, pokemonInfo: pokemon } = useFetchPokemon(pokeName);

    if (loading) {
        return <main> Loading...</main>
    }
    if (error){
        return <main>{error}</main>
    }

  return (
    <main>
            <div className="bg-red-500 mb-20 pb-5">
              <h1 className="text-7xl text-center mt-10">{pokemon.name}</h1>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-7 min-h-screen">
                <div className="border">
                    <h1 className="text-5xl text-center">Abilities</h1>

                </div>
                <div className="border">

                </div>
                <div className=" col-start-3 row-span-2 flex flex-row-reverse border">
                    <img className="object-contain" src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <div className="border">

                </div>
                <div className="border">

                </div>
                <div className="border col-span-3">

                </div>

            </div>
    
    </main>
  )
}
