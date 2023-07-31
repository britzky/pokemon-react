import { typeColors } from "../config/typeColors";
import { typeIcons } from "../components/icons";

export const usePokemonType = (pokemon) => {
    let pokemonType = pokemon.pokemon_types[0];
    let PokemonIcon = typeIcons[pokemonType];
    let pokemonColor = typeColors[pokemonType];
    return {pokemonType, PokemonIcon, pokemonColor}
}