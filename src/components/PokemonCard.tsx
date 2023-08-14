import trash from '../assets/icons/trash-can.png'
import { usePokemonType } from '../hooks'

import { ImageCard, Button } from '.'
import { ProcessedPokemon } from '../types/backendapi/pokemon.type'

interface PokemonCardProps {
    pokemon: ProcessedPokemon;
    onRelease?: (id: number) => void;
} 

export const PokemonCard: React.FC<PokemonCardProps> = ({pokemon, onRelease}) => {    
    const { pokemonType, pokemonColor, PokemonIcon, pokemonHp} = usePokemonType(pokemon);

    const handleRelease = () => {
        if (pokemon.id !== undefined && onRelease !== undefined) {
            onRelease(pokemon.id);
        }
    }

  return (
    <div className={`${pokemonColor} border-4 rounded-lg px-5 my-7`}>
            <>
            <div className="flex items-center justify-around">
                {PokemonIcon && <PokemonIcon height='25' width='25' small='true' />}
                <h1 className="font-bold text-4xl m-4 text-center">{pokemon.name}</h1>
                {PokemonIcon && <PokemonIcon height='25' width='25' small='true' />}
            </div>
            <div className="flex justify-around ">
                <div className="flex gap-2">
                    <h4 className="font-bold">HP:</h4>
                    <p>{pokemonHp}</p>
                </div>
                <div className="flex gap-2">
                    <h4 className="font-bold">EXP:</h4>
                    <p>{pokemon.base_experience}</p>
                </div>
            </div>
            <ImageCard pokemonImage={pokemon.pokemon_sprite} pokemonType={pokemonType} />
            <div className="flex justify-around">
                <div className="flex flex-col items-center">
                    <h4 className="font-bold">Abilities:</h4>
                    <ul>
                    {pokemon.abilities.map((abilities, index) => (
                        <li key={index} className="my-4">{abilities}</li>
                    ))}
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="font-bold text-center">Stats:</h4>
                    {pokemon.pokemon_stats.map((stat, index) => (
                        <div className="flex gap-2" key={index}>
                            <h6>{stat.stat_name}</h6>
                            <p>{stat.base_stat}</p>
                        </div>
                    ))}
                </div>
            </div>
            {onRelease && 
            <div className="flex justify-center my-4">
                <Button image={trash} imageName='trash-can' onClick={handleRelease}>Release</Button>
            </div>
            }
            </>   
    </div>
  )
}
