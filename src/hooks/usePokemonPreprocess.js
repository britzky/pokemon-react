import { useCallback } from "react";

export const usePokemonPreprocess = () => {
    return useCallback((pokemon, moves) => {
        const processedPokemon = {
            pokedex_id: pokemon.id,
            name: pokemon.name,
            abilities: pokemon.abilities,
            base_experience: pokemon.base_experience,
            pokemon_stats: pokemon.stats,
            pokemon_sprite: pokemon.sprites.front_default,
            pokemon_types: pokemon.types,
            pokemon_moves: moves
          };
          return processedPokemon;
    }, [])
}

