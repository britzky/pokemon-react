import { BugIcon } from './BugIcon';
import { DarkIcon } from './DarkIcon';
import { DragonIcon } from './DragonIcon';
import { ElectricIcon } from './ElectricIcon';
import { FairyIcon } from './FairyIcon';
import { FightingIcon } from './FightingIcon';
import { FireIcon } from './FireIcon';
import { FlyingIcon } from './FlyingIcon';
import { GhostIcon } from './GhostIcon';
import { GrassIcon } from './GrassIcon';
import { GroundIcon } from './GroundIcon';
import { IceIcon } from './IceIcon';
import { NormalIcon } from './NormalIcon';
import { PoisonIcon } from './PoisonIcon';
import { PsychicIcon } from './PsychicIcon';
import { RockIcon } from './RockIcon';
import { SteelIcon } from './SteelIcon';
import { WaterIcon } from './WaterIcon';

export interface TypeIcons {
    bug: typeof BugIcon,
    dark: typeof DarkIcon,
    dragon: typeof DragonIcon,
    electric: typeof ElectricIcon,
    fairy: typeof FairyIcon,
    fighting: typeof FightingIcon,
    fire: typeof FireIcon,
    flying: typeof FlyingIcon,
    ghost: typeof GhostIcon,
    grass: typeof GrassIcon,
    ground: typeof GroundIcon,
    ice: typeof IceIcon,
    normal: typeof NormalIcon,
    poison: typeof PoisonIcon,
    psychic: typeof PsychicIcon,
    rock: typeof RockIcon,
    steel: typeof SteelIcon,
    water: typeof WaterIcon
}

export const typeIcons: TypeIcons = {
    bug: BugIcon,
    dark: DarkIcon,
    dragon: DragonIcon,
    electric: ElectricIcon,
    fairy: FairyIcon,
    fighting: FightingIcon,
    fire: FireIcon,
    flying: FlyingIcon,
    ghost: GhostIcon,
    grass: GrassIcon,
    ground: GroundIcon,
    ice: IceIcon,
    normal: NormalIcon,
    poison: PoisonIcon,
    psychic: PsychicIcon,
    rock: RockIcon,
    steel: SteelIcon,
    water: WaterIcon
}