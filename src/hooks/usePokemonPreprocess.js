import { useCallback } from "react";

export const usePokemonPreprocess = () => {
    return useCallback((pokemon) => {
        const processedPokemon = {
            pokedex_id: pokemon.id,
            name: pokemon.name,
            ability: pokemon.abilities.map(ability => ability.ability.name),
            base_experience: pokemon.base_experience,
            hp_stat: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat,
            attack_stat: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
            defense_stat: pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat,
            special_attack_stat: pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
            special_defense_stat: pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
            speed_stat: pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat,
            pokemon_sprite: pokemon.sprites.front_default,
            pokemon_type: pokemon.types.map(type => type.type.name)
          };
          return processedPokemon;
    }, [])
}

