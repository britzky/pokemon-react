import { typeColors } from '../config/typeColors'
import { typeIcons } from './icons'
import trash from '../assets/icons/trash-can.png'

import { ImageCard, Button } from '../components'

export const PokemonCard = ({pokemon, onRelease, fight, trainer}) => {    
    let pokemonType = pokemon.pokemon_type[0]
    let PokemonIcon = typeIcons[pokemonType]
  return (
    <div className={`${typeColors[pokemonType]} border-4 rounded-lg px-5`}>
        {fight ? (
            <>
            <div className="flex items-center justify-around mt-1">
                {PokemonIcon && <PokemonIcon height='15' width='15' small='true' />}
                <h1 className="text-center">{trainer}'s {pokemon.name}</h1>
                {PokemonIcon && <PokemonIcon height='15' width='15' small='true' />}
            </div>

            <div className='flex'>
                <div className="flex flex-col items-center">
                <ImageCard pokemonImage={pokemon.pokemon_sprite} pokemonType={pokemonType} />
                </div>
                <div className="flex flex-col justify-start">
                    {pokemon.ability.map((abl, index) => (
                        <div key={index}>
                            <Button ability>{abl}</Button>
                        </div>
                        
                    ))}
                </div>
            </div>
            </>
        ) : (
            <>
            <div className="flex items-center justify-around">
                {PokemonIcon && <PokemonIcon height='25' width='25' small='true' />}
                <h1 className="font-bold text-4xl m-4 text-center">{pokemon.name}</h1>
                {PokemonIcon && <PokemonIcon height='25' width='25' small='true' />}
            </div>
    
            <div className="flex justify-around ">
                <div className="flex gap-2">
                    <h4 className="font-bold">HP:</h4>
                    <p>{pokemon.hp_stat}</p>
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
                    {pokemon.ability.map((abl, index) => (
                        <li key={index} className="my-4">{abl}</li>
                    ))}
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="font-bold">Stats:</h4>
                    <div className="flex gap-1">
                        <h6>Atk:</h6>
                        <p>{pokemon.attack_stat}</p>
                    </div>
                    <div className="flex gap-1">
                        <h6>Def:</h6>
                        <p>{pokemon.defense_stat}</p>
                    </div>
                    <div className="flex gap-1">
                        <h6>Spd:</h6>
                        <p>{pokemon.speed_stat}</p>
                    </div>
                    <div className="flex gap-1">
                        <h6>Sp-Atk:</h6>
                        <p>{pokemon.special_attack_stat}</p>
                    </div>
                    <div className="flex gap-1 mb-4">
                        <h6>Sp-Def</h6>
                        <p>{pokemon.special_defense_stat}</p>
                    </div>
                </div>
            </div>
            {onRelease && 
            <div className="flex justify-center mb-4">
                <Button image={trash} imageName='trash-can' onClick={() => onRelease(pokemon.id)}>Release</Button>
            </div>
            }
            </>   
        )}
    </div>
  )
}
