import { useCallback } from "react";

const usePokemonPreprocess = () => {
    return useCallback((pokemon) => {
        pokemon.hp_stat = pokemon.hp_stat.base_stat;
        pokemon.attack_stat = pokemon.attack_stat.base_stat;
        pokemon.defense_stat = pokemon.defense_stat.base_stat;
        pokemon.special_attack_stat = pokemon.special_attack_stat.base_stat;
        pokemon.special_defense_stat = pokemon.special_defense_stat.base_stat;
        pokemon.speed_stat = pokemon.speed_stat.base_stat;
        pokemon.ability = pokemon.ability.map(ability => ability.ability.name);
        pokemon.pokemon_type = pokemon.pokemon_type.map(type => type.type.name);

        return pokemon;
    }, [])
}

export default usePokemonPreprocess;