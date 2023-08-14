import { usePokemonType } from "../hooks"
import { ImageCard, Button } from '.'
import { ProcessedPokemon, Move } from "../types/backendapi/pokemon.type";

interface PlayerCardProps {
    pokemon: ProcessedPokemon;
    trainer: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({pokemon, trainer}) => {
    const {PokemonIcon, pokemonType, pokemonColor, pokemonHp} = usePokemonType(pokemon);

    let movesByType = pokemon.pokemon_moves.reduce<Record<string, Move[]>>((acc, move) => {
        if(!acc[move.type]) {
            acc[move.type] = [];
        }
        acc[move.type].push(move);
        return acc;
    }, {});
    console.log("Moves: ", movesByType)

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
            <div className="mx-4 flex flex-wrap items-center">
                <h1 className="text-xl">Move types:</h1>
                {Object.keys(movesByType).map((type) => (
                    <Button isAbilityButton>{type}</Button>
                    ))}
            </div>
        </div>
    </div>
  )
}
