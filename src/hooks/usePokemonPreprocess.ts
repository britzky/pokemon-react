import { useCallback } from "react";
import { Move, Pokemon } from "../types/pokemon";

export const usePokemonPreprocess = () => {
    return useCallback((pokemon: Pokemon, moves: Move[]) => {
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
            pokemon_moves: moves.map((move) => ({
                name: move.name,
                accuracy: move?.accuracy,
                damage_class: move?.damage_class,
                effect_chance: move?.effect_chance,
                effect_entry: move?.effect_entry,
                flavor_text: move?.flavor_text,
                power: move?.power,
                stat_changes: move?.stat_changes,
                target: move?.target,
                type: move?.type

            }))
          };
          return processedPokemon;
    }, [])
}

