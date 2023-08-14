export interface ProcessedPokemon {
    pokedex_id: number;
    name: string;
    abilities: string[];
    base_experience: number;
    pokemon_moves: Move[];
    pokemon_sprite: string;
    pokemon_stats: PokemonStat[];
    pokemon_types: string[]
 }

 export interface Move {
    accuracy?: number;
    damage_class: string;
    effect_chance?: number;
    effect_entry: string;
    flavor_text: string;
    name: string;
    power?: number;
    stat_changes?: StatChange[];
    target: string;
    type: string;
}

export interface StatChange {
    amount: number;
    stat: string;
}

export interface PokemonStat {
    base_stat: number;
    stat_name: string;
}
