export interface RelicDefinition {
    id: string;
    name: string;
    description: string;
}

export const RELIC_NAMES: RelicDefinition[] = [
    {
        id: 'apple_of_eternity',
        name: 'Apple of Eternity',
        description: 'Forbidden knowledge and immortality, the fruit of the gods.'
    },
    {
        id: 'eternal_flame',
        name: 'Eternal Flame',
        description: 'Divine fire stolen from the gods, burning without end.'
    },
    {
        id: 'chalice_of_ascension',
        name: 'Chalice of Ascension',
        description: 'A holy chalice said to choose the one destined to rule.'
    },
    {
        id: 'all_seeing_orb',
        name: 'All-Seeing Orb',
        description: 'An orb through which the gods once watched the world.'
    },
    {
        id: 'sigil_of_creation',
        name: 'Sigil of Creation',
        description: 'The mark that forged the world, source of ultimate authority.'
    }
];

// 5% daily chance to spawn a Mythic boss per server
export const MYTHIC_BOSS_DAILY_SPAWN_CHANCE = 0.05;

// 7-day cooldown between leader-initiated relic transfers
export const RELIC_TRANSFER_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export interface RelicHolder {
    relicId: string;
    username: string | null;
    villageName: string | null;
    clanName: string | null;
    transferCooldownUntil: Date | null;
}

