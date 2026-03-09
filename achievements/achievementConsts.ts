export type StatField =
    | 'weeklyStats.bossDamage'
    | 'weeklyStats.resourcesStolen'
    | 'weeklyStats.successfulDefenses'
    | 'totalStats.lifetimeBossDamage'
    | 'totalStats.lifetimeResourcesStolen'
    | 'totalStats.totalBattlesWon'
    | 'totalStats.successfulSpies'
    | 'totalStats.relicsStolen'
    | 'totalStats.resourcesSentToClan'
    | 'totalStats.mythicBossDamage'
    | 'totalStats.supportTroopsSent'
    | 'totalStats.oasesConquered';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    threshold: number;
    statField: StatField;
}

export const ACHIEVEMENTS: Achievement[] = [
    // --- Boss Slayer ---
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

    // --- Raider ---
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

    // --- Iron Wall ---
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

    // --- Warlord ---
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

    // --- Shadow Agent ---
    {
        id: 'shadow_agent_i',
        name: 'Shadow Agent I',
        description: 'Complete 10 successful spy missions.',
        threshold: 10,
        statField: 'totalStats.successfulSpies',
    },
    {
        id: 'shadow_agent_ii',
        name: 'Shadow Agent II',
        description: 'Complete 50 successful spy missions.',
        threshold: 50,
        statField: 'totalStats.successfulSpies',
    },
    {
        id: 'shadow_agent_iii',
        name: 'Shadow Agent III',
        description: 'Complete 250 successful spy missions.',
        threshold: 250,
        statField: 'totalStats.successfulSpies',
    },

    // --- Relic Hunter ---
    {
        id: 'relic_hunter_i',
        name: 'Relic Hunter I',
        description: 'Steal 1 Divine Relic via PvP.',
        threshold: 1,
        statField: 'totalStats.relicsStolen',
    },
    {
        id: 'relic_hunter_ii',
        name: 'Relic Hunter II',
        description: 'Steal 5 Divine Relics via PvP.',
        threshold: 5,
        statField: 'totalStats.relicsStolen',
    },
    {
        id: 'relic_hunter_iii',
        name: 'Relic Hunter III',
        description: 'Steal 15 Divine Relics via PvP.',
        threshold: 15,
        statField: 'totalStats.relicsStolen',
    },

    // --- Generous Ally ---
    {
        id: 'generous_ally_i',
        name: 'Generous Ally I',
        description: 'Send 500,000 total resources to clanmates.',
        threshold: 500_000,
        statField: 'totalStats.resourcesSentToClan',
    },
    {
        id: 'generous_ally_ii',
        name: 'Generous Ally II',
        description: 'Send 5,000,000 total resources to clanmates.',
        threshold: 5_000_000,
        statField: 'totalStats.resourcesSentToClan',
    },
    {
        id: 'generous_ally_iii',
        name: 'Generous Ally III',
        description: 'Send 50,000,000 total resources to clanmates.',
        threshold: 50_000_000,
        statField: 'totalStats.resourcesSentToClan',
    },

    // --- Titan Slayer ---
    {
        id: 'titan_slayer_i',
        name: 'Titan Slayer I',
        description: 'Deal 1,000,000 damage to Mythic bosses.',
        threshold: 1_000_000,
        statField: 'totalStats.mythicBossDamage',
    },
    {
        id: 'titan_slayer_ii',
        name: 'Titan Slayer II',
        description: 'Deal 25,000,000 damage to Mythic bosses.',
        threshold: 25_000_000,
        statField: 'totalStats.mythicBossDamage',
    },
    {
        id: 'titan_slayer_iii',
        name: 'Titan Slayer III',
        description: 'Deal 100,000,000 damage to Mythic bosses.',
        threshold: 100_000_000,
        statField: 'totalStats.mythicBossDamage',
    },

    // --- Shield Brother ---
    {
        id: 'shield_brother_i',
        name: 'Shield Brother I',
        description: 'Send 500 support troops to allies.',
        threshold: 500,
        statField: 'totalStats.supportTroopsSent',
    },
    {
        id: 'shield_brother_ii',
        name: 'Shield Brother II',
        description: 'Send 5,000 support troops to allies.',
        threshold: 5_000,
        statField: 'totalStats.supportTroopsSent',
    },
    {
        id: 'shield_brother_iii',
        name: 'Shield Brother III',
        description: 'Send 25,000 support troops to allies.',
        threshold: 25_000,
        statField: 'totalStats.supportTroopsSent',
    },

    // --- King of the Hill ---
    {
        id: 'king_of_the_hill_i',
        name: 'King of the Hill I',
        description: 'Conquer 10 different oases.',
        threshold: 10,
        statField: 'totalStats.oasesConquered',
    },
    {
        id: 'king_of_the_hill_ii',
        name: 'King of the Hill II',
        description: 'Conquer 50 different oases.',
        threshold: 50,
        statField: 'totalStats.oasesConquered',
    },
    {
        id: 'king_of_the_hill_iii',
        name: 'King of the Hill III',
        description: 'Conquer 200 different oases.',
        threshold: 200,
        statField: 'totalStats.oasesConquered',
    },
];
