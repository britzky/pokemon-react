import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchPokemon = (pokeName) => {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [pokemonLocation, setPokemonLocation] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const getPokemonInfo = async () => {
            if (!pokeName){
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
                if (!response.ok){
                    navigate('/*')
                }
                const data = await response.json();
                setPokemonInfo(data);
                setError(null);

                const locationResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`)
                const locationData = await locationResponse.json()
                setPokemonLocation(locationData)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getPokemonInfo();
    }, [pokeName])
  return { pokemonInfo, pokemonLocation, loading, error }
}
