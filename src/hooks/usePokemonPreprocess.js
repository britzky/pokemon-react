import { useCallback } from "react";

export const usePokemonPreprocess = () => {
    return useCallback((pokemon, moves) => {
        const processedPokemon = {
            pokedex_id: pokemon.id,
            name: pokemon.name,
            abilities: pokemon.abilities.map((ability) => ability.ability.name),
            base_experience: pokemon.base_experience,
            pokemon_stats: pokemon.stats.map((stat) => ({
                base_stat: stat.base_stat,
                stat_name: stat.stat.name
            })),
            pokemon_sprite: pokemon.sprites.front_default,
            pokemon_types: pokemon.types.map((type) => type.type.name),
            pokemon_moves: moves
          };
          return processedPokemon;
    }, [])
}

