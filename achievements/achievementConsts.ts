export type StatField =
    | 'weeklyStats.bossDamage'
    | 'weeklyStats.resourcesStolen'
    | 'weeklyStats.successfulDefenses'
    | 'totalStats.lifetimeBossDamage'
    | 'totalStats.lifetimeResourcesStolen'
    | 'totalStats.totalBattlesWon';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    threshold: number;
    statField: StatField;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'boss_slayer_i',
        name: 'Boss Slayer I',
        description: 'Deal 1,000,000 total damage to bosses.',
        threshold: 1_000_000,
        statField: 'totalStats.lifetimeBossDamage',
    },
    {
        id: 'boss_slayer_ii',
        name: 'Boss Slayer II',
        description: 'Deal 10,000,000 total damage to bosses.',
        threshold: 10_000_000,
        statField: 'totalStats.lifetimeBossDamage',
    },
    {
        id: 'boss_slayer_iii',
        name: 'Boss Slayer III',
        description: 'Deal 100,000,000 total damage to bosses.',
        threshold: 100_000_000,
        statField: 'totalStats.lifetimeBossDamage',
    },
    {
        id: 'raider_i',
        name: 'Raider I',
        description: 'Steal 1,000,000 total resources from other players.',
        threshold: 1_000_000,
        statField: 'totalStats.lifetimeResourcesStolen',
    },
    {
        id: 'raider_ii',
        name: 'Raider II',
        description: 'Steal 10,000,000 total resources from other players.',
        threshold: 10_000_000,
        statField: 'totalStats.lifetimeResourcesStolen',
    },
    {
        id: 'raider_iii',
        name: 'Raider III',
        description: 'Steal 100,000,000 total resources from other players.',
        threshold: 100_000_000,
        statField: 'totalStats.lifetimeResourcesStolen',
    },
    {
        id: 'iron_wall_i',
        name: 'Iron Wall I',
        description: 'Successfully defend 25 attacks.',
        threshold: 25,
        statField: 'weeklyStats.successfulDefenses',
    },
    {
        id: 'iron_wall_ii',
        name: 'Iron Wall II',
        description: 'Successfully defend 100 attacks.',
        threshold: 100,
        statField: 'totalStats.totalBattlesWon',
    },
    {
        id: 'iron_wall_iii',
        name: 'Iron Wall III',
        description: 'Successfully defend 500 attacks.',
        threshold: 500,
        statField: 'totalStats.totalBattlesWon',
    },
    {
        id: 'warlord_i',
        name: 'Warlord I',
        description: 'Win 100 battles.',
        threshold: 100,
        statField: 'totalStats.totalBattlesWon',
    },
    {
        id: 'warlord_ii',
        name: 'Warlord II',
        description: 'Win 500 battles.',
        threshold: 500,
        statField: 'totalStats.totalBattlesWon',
    },
    {
        id: 'warlord_iii',
        name: 'Warlord III',
        description: 'Win 2,000 battles.',
        threshold: 2_000,
        statField: 'totalStats.totalBattlesWon',
    },
];

