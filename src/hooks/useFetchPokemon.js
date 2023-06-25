import { useState, useEffect } from "react";

export const useFetchPokemon = (pokeName) => {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`

    useEffect(() => {
        const getPokemonInfo = async () => {
            try {
                const response = await fetch(baseUrl);
                if (!response.ok){
                    throw new Error('pokemon fetch failed');
                }
                const data = await response.json();
                setPokemonInfo(data);
                }catch(error){
                console.log('pokemon fetch failed')
                }
        }
        getPokemonInfo();
    }, [baseUrl])
  return { pokemonInfo }
}
