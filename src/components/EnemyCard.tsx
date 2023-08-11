import { usePokemonType } from "../hooks";
import { ImageCard } from ".";
import { Pokemon } from "../types/pokemon";

interface EnemyCardProps {
    pokemon?: Pokemon 
    trainer?: 
}

export const EnemyCard: React.FC<EnemyCardProps> = ({pokemon, trainer}) => {
    const {PokemonIcon, pokemonType, pokemonColor, pokemonHp} = usePokemonType(pokemon);
  return (
    <div className={`${pokemonColor} border-4 rounded-lg px-5 my-7`}>
        <div className="flex items-center justify-around my-1">
            {PokemonIcon && <PokemonIcon height='15' width='15' small='true' />}
            <h1 className="text-center text-xl">{trainer}'s {pokemon.name}</h1>
            {PokemonIcon && <PokemonIcon height='15' width='15' small='true' />}
        </div>
        <div className="flex items-center justify-evenly my-1">
            <h1>HP:</h1>
            {pokemonHp}
        </div>
        <div className='my-1'>
            <ImageCard pokemonImage={pokemon.pokemon_sprite} pokemonType={pokemonType} />
        </div>
    </div>
  )
}
