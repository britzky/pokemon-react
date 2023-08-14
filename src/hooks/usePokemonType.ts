import { typeColors } from "../config/typeColors";
import { typeIcons } from "../components/icons";
import { ProcessedPokemon } from "../types/backendapi/pokemon.type";


export const usePokemonType = (pokemon: ProcessedPokemon) => {
    let pokemonType = pokemon.pokemon_types[0];
    let PokemonIcon = typeIcons[pokemonType as keyof typeof typeIcons];
    let pokemonColor = typeColors[pokemonType as keyof typeof typeColors];
    let stat = pokemon.pokemon_stats.find(stat => stat.stat_name === 'hp');
    let pokemonHp = stat ? stat.base_stat : 0;
    return {pokemonType, PokemonIcon, pokemonColor, pokemonHp}
}