export interface Ability {
    name: string;
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

export interface Pokemon {
    abilities: Ability[]
    base_experience: number;
    id: number
    moves: Move[]
}

