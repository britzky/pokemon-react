import { useFetchPokemon } from "../hooks/useFetchPokemon"
export const PokemonDetails = () => {
    const { pokemonInfo: pokemon } = useFetchPokemon();
  return (
    <div>
        <button onClick={(() => console.log(pokemon))}></button>
    </div>
  )
}
