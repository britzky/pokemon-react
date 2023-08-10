import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchPokemon = (pokeName: string) => {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [moves, setMoves] = useState([]);
    const [loading, setLoading] = useState<Boolean>(true)
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
                
                const levelUpMoves = data.moves.filter(move => {
                    return move.version_group_details.some(detail => {
                        return detail.move_learn_method.name === 'level-up'
                    })
                })

                const movePromises = levelUpMoves.map( async (move) => {
                    const moveResponse = await fetch(move.move.url)
                    const moveData = await moveResponse.json()
                    const englishEffectEntry = moveData.effect_entries.find(entry => entry.language.name ===  'en');
                    const englishFlavorText = moveData.flavor_text_entries.find(entry => entry.language.name === 'en');
                    return {
                        accuracy: moveData.accuracy,
                        effect_chance: moveData.effect_chance,
                        damage_class: moveData.damage_class.name,
                        name: moveData.name,
                        type: moveData.type.name,
                        effect_entry: englishEffectEntry ? englishEffectEntry.effect : 'Exciting pokemon effect!',
                        flavor_text: englishFlavorText ? englishFlavorText.flavor_text : 'Exciting pokemon move!',
                        power: moveData.power,
                        stat_changes: moveData.stat_changes.map((change) => ({
                            amount: change.change,
                            stat: change.stat.name,
                        })),
                        target: moveData.target.name

                    }
                })
                const movePromiseInfo = await Promise.all(movePromises);
                setMoves(movePromiseInfo)

            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getPokemonInfo();

    }, [pokeName])
  return { pokemonInfo, loading, error, moves }
}
