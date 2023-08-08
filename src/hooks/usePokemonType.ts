import { typeColors } from "../config/typeColors";
import { typeIcons } from "../components/icons";

export const usePokemonType = (pokemon) => {
    let pokemonType = pokemon.pokemon_types[0];
    let PokemonIcon = typeIcons[pokemonType];
    let pokemonColor = typeColors[pokemonType];
    let pokemonHp = pokemon.pokemon_stats.find(stat => stat.stat_name === 'hp').base_stat
    return {pokemonType, PokemonIcon, pokemonColor, pokemonHp}
}