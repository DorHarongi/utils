import { prettifyNumber } from '../numberUtils';

export enum OasisTier {
    DUSTY_SPRINGS = 'dusty_springs',
    FERTILE_CLEARING = 'fertile_clearing',
    HIDDEN_WELLSPRING = 'hidden_wellspring',
    ABUNDANT_GROVE = 'abundant_grove',
    GOLDEN_OASIS = 'golden_oasis',
}

export interface OasisTierConfig {
    name: string;
    wood: number;
    stone: number;
    crop: number;
    rarity: string;
}

export const oasisTierConfigs: Record<OasisTier, OasisTierConfig> = {
    [OasisTier.DUSTY_SPRINGS]: {
        name: 'Dusty Springs',
        wood: 500_000,
        stone: 500_000,
        crop: 500_000,
        rarity: 'Common',
    },
    [OasisTier.FERTILE_CLEARING]: {
        name: 'Fertile Clearing',
        wood: 1_500_000,
        stone: 1_500_000,
        crop: 1_500_000,
        rarity: 'Common',
    },
    [OasisTier.HIDDEN_WELLSPRING]: {
        name: 'Hidden Wellspring',
        wood: 3_000_000,
        stone: 3_000_000,
        crop: 3_000_000,
        rarity: 'Rare',
    },
    [OasisTier.ABUNDANT_GROVE]: {
        name: 'Abundant Grove',
        wood: 4_500_000,
        stone: 3_000_000,
        crop: 6_000_000,
        rarity: 'Epic',
    },
    [OasisTier.GOLDEN_OASIS]: {
        name: 'Golden Oasis',
        wood: 8_000_000,
        stone: 8_000_000,
        crop: 8_000_000,
        rarity: 'Legendary',
    },
};

export const oasisSpawnWeights: Record<OasisTier, number> = {
    [OasisTier.DUSTY_SPRINGS]: 35,
    [OasisTier.FERTILE_CLEARING]: 30,
    [OasisTier.HIDDEN_WELLSPRING]: 20,
    [OasisTier.ABUNDANT_GROVE]: 10,
    [OasisTier.GOLDEN_OASIS]: 5,
};

export const OASIS_HARVEST_RATE_PER_TROOP_PER_HOUR = 175;

// Dynamic oasis cap based on player count: max(10, ceil(playerCount * 0.4))
export function getMaxOasesOnMap(playerCount: number): number {
    return Math.max(10, Math.ceil(playerCount * 0.4));
}

export const OASIS_SPAWN_INTERVAL_CRON = '0 */30 * * * *';

export const OASIS_UNCLAIMED_DESPAWN_MS = 48 * 60 * 60 * 1000;

export const OASIS_SPAWN_CHANCE = 0.7;

export const OASIS_PROXIMITY_RANGE = 20;

export function generateOasisResources(tier: OasisTier): { wood: number; stone: number; crop: number } {
    const config = oasisTierConfigs[tier];
    const base = [config.wood, config.stone, config.crop];

    const randomized = base.map(val => {
        const minVal = Math.floor(val * 0.9);
        const maxVal = Math.floor(val * 1.1);
        return minVal + Math.floor(Math.random() * (maxVal - minVal + 1));
    });

    const maxRandom = Math.max(randomized[0], randomized[1], randomized[2]);
    const minRandom = Math.min(randomized[0], randomized[1], randomized[2]);
    if (maxRandom > 0 && (maxRandom - minRandom) / maxRandom > 0.1) {
        const cap = Math.floor(maxRandom * 0.9);
        for (let i = 0; i < randomized.length; i++) {
            if (randomized[i] < cap) randomized[i] = cap;
        }
    }

    return {
        wood: prettifyNumber(randomized[0]),
        stone: prettifyNumber(randomized[1]),
        crop: prettifyNumber(randomized[2]),
    };
}

export function selectRandomOasisTier(): OasisTier {
    const tiers = [
        OasisTier.DUSTY_SPRINGS,
        OasisTier.FERTILE_CLEARING,
        OasisTier.HIDDEN_WELLSPRING,
        OasisTier.ABUNDANT_GROVE,
        OasisTier.GOLDEN_OASIS,
    ];
    let totalWeight = 0;
    for (const t of tiers) {
        totalWeight += oasisSpawnWeights[t];
    }
    let roll = Math.random() * totalWeight;
    for (const t of tiers) {
        roll -= oasisSpawnWeights[t];
        if (roll <= 0) return t;
    }
    return OasisTier.DUSTY_SPRINGS;
}
