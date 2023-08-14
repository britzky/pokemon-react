export interface Ability {
    ability: {
        name: string
    };
}

export interface StatChange {
    amount: number;
    stat: string;
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
export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    }
}
export interface PokemonSprite {
    front_default: string;
}

export interface PokemonType {
    type: {
        name: string;
    }
}
 export interface ProcessedPokemon {
    pokedex_id: number;
    name: string;
    abilities: string[];
    base_experience: number;
    pokemon_moves: Move[];
    pokemon_sprite: string;
    pokemon_stats: PokemonStat[];
    pokemon_types: string[];
 }


/* PokeApi types */
export interface Pokemon {
    abilities: Ability[]
    base_experience: number;
    name: string;
    order: number;
    moves: Move[]
    stats: PokemonStat[]
    sprites: PokemonSprite
    types: PokemonType[]
}

export interface MoveLearnMethod {
    name: string;
}

export interface VersionGroupDetail {
    move_learn_method: MoveLearnMethod;
}

export interface LevelUpMoves {
    version_group_details: VersionGroupDetail[];
}

export interface ApiMove {
    move: {
        url: string;
    }
}

export interface EntryLanguage {
    language:{
        name: string;
    }
}

export interface StatChanges {
    change: number;
    stat: {
        name: string;
    }

}

export interface Trainer {
    username: string;
    id: number;
    pokemon: Pokemon[];
}

