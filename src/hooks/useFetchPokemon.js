import { useState, useEffect } from "react";

export const useFetchPokemon = (pokeName) => {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const getPokemonInfo = async () => {
            if (!pokeName){
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
                if (!response.ok){
                    throw new Error(`pokemon fetch failed with status: ${response.status}`);
                }
                const data = await response.json();
                setPokemonInfo(data);
                setError(null);
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getPokemonInfo();
    }, [pokeName])
  return { pokemonInfo, loading, error }
}
