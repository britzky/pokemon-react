import { typeColors } from '../config/typeColors'
import { typeIcons } from './icons'

import { ImageCard } from '../components'

export const PokemonCard = ({pokemon}) => {
    let pokemonType = pokemon.pokemon_type[0]
    let PokemonIcon = typeIcons[pokemonType]

  return (
    <div className={`${typeColors[pokemonType]} border-4 rounded-lg px-5`}>
        <div className="flex items-center justify-around">
            {PokemonIcon && <PokemonIcon height='25' width='25' small='true' />}
            <h1 className="font-bold text-4xl m-4 text-center">{pokemon.name}</h1>
            {PokemonIcon && <PokemonIcon height='25' width='25' small='true' />}
        </div>
        <div className="flex justify-around ">
            <p>HP: {pokemon.hp_stat}</p>
            <p>EXP: {pokemon.base_experience}</p>
        </div>
        <ImageCard pokemonImage={pokemon.pokemon_sprite} pokemonType={pokemonType} />
    </div>
  )
}
