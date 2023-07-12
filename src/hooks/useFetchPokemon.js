import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchPokemon = (pokeName) => {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [pokemonLocation, setPokemonLocation] = useState([]);
    const [moves, setMoves] = useState([]);
    const [moveInfo, setMoveInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const getPokemonInfo = async () => {
            if (!pokeName){
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
                if (!response.ok){
                    navigate('/*')
                }
                const data = await response.json();
                console.log( "pokemon info:", data)
                setPokemonInfo(data);
                setError(null);

                const locationResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`)
                const locationData = await locationResponse.json()
                setPokemonLocation(locationData)
                
                const levelUpMoves = data.moves.filter(move => {
                    return move.version_group_details.some(detail => {
                        return detail.move_learn_method.name === 'level-up'
                    })
                })
                setMoves(levelUpMoves);

                const movePromises = levelUpMoves.map( async (move) => {
                    const moveResponse = await fetch(move.move.url)
                    const moveData = await moveResponse.json()
                    return moveData
                })
                const movePromiseInfo = await Promise.all(movePromises);
                setMoveInfo(movePromiseInfo)

            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getPokemonInfo();

    }, [pokeName])
  return { pokemonInfo, pokemonLocation, loading, error, moves, moveInfo }
}
