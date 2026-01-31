// Boss Configuration Constants

export enum BossTier {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary'
}

// HP ranges per tier (min, max)
export const bossHpRanges: Record<BossTier, { min: number; max: number }> = {
    [BossTier.COMMON]: { min: 50000, max: 100000 },
    [BossTier.RARE]: { min: 250000, max: 500000 },
    [BossTier.EPIC]: { min: 1000000, max: 2000000 },
    [BossTier.LEGENDARY]: { min: 5000000, max: 10000000 }
};

// Boss names per tier
export const bossNames: Record<BossTier, string> = {
    [BossTier.COMMON]: 'Goblin Horde',
    [BossTier.RARE]: 'Werewolf Pack',
    [BossTier.EPIC]: 'Spectral Wraith',
    [BossTier.LEGENDARY]: 'Ancient Dragon'
};

// Boss images (matching the assets)
export const bossImages: Record<BossTier, string> = {
    [BossTier.COMMON]: 'boss-common.png',
    [BossTier.RARE]: 'boss-rare.png',
    [BossTier.EPIC]: 'boss-epic.png',
    [BossTier.LEGENDARY]: 'boss-legendary.png'
};

// Spawn weights (higher = more common)
export const bossSpawnWeights: Record<BossTier, number> = {
    [BossTier.COMMON]: 50,
    [BossTier.RARE]: 30,
    [BossTier.EPIC]: 15,
    [BossTier.LEGENDARY]: 5
};

// Distance bonus calculation
// Returns damage multiplier based on distance (in grid cells)
// Max bonus at distance 0-5, decreasing as distance increases
export const getDistanceDamageMultiplier = (distance: number): number => {
    if (distance <= 5) return 2.0;      // 200% damage
    if (distance <= 10) return 1.75;    // 175% damage  
    if (distance <= 20) return 1.5;     // 150% damage
    if (distance <= 30) return 1.25;    // 125% damage
    if (distance <= 50) return 1.0;     // 100% damage (base)
    return 0.75;                         // 75% damage for very far attacks
};

// Distance bonus display text
export const getDistanceBonusText = (distance: number): string => {
    const multiplier = getDistanceDamageMultiplier(distance);
    const percentage = Math.round(multiplier * 100);
    if (multiplier > 1) {
        return `${percentage}% damage (+${percentage - 100}% bonus)`;
    } else if (multiplier < 1) {
        return `${percentage}% damage (${percentage - 100}% penalty)`;
    }
    return `${percentage}% damage`;
};

// Rewards: warehouse level rewards per tier
// Reward fills warehouse of this level for each clan member
export const bossRewardWarehouseLevel: Record<BossTier, number> = {
    [BossTier.COMMON]: 3,      // 30,000 of each resource
    [BossTier.RARE]: 5,        // 187,500 of each resource
    [BossTier.EPIC]: 7,        // 1,250,000 of each resource
    [BossTier.LEGENDARY]: 10   // 25,000,000 of each resource
};

// Boss claim duration (48 hours in milliseconds)
export const BOSS_CLAIM_DURATION_MS = 48 * 60 * 60 * 1000;

// Boss despawn duration for unclaimed bosses (48 hours)
export const BOSS_UNCLAIMED_DESPAWN_MS = 48 * 60 * 60 * 1000;

// Maximum bosses on map at once
export const MAX_BOSSES_ON_MAP = 10;

// Spawn check interval (30 minutes in cron expression)
export const BOSS_SPAWN_CRON = '0 */30 * * * *';

// Minimap colors for bosses
export const bossMinimapColors: Record<BossTier, string> = {
    [BossTier.COMMON]: '#808080',      // Gray
    [BossTier.RARE]: '#3498db',        // Blue
    [BossTier.EPIC]: '#9b59b6',        // Purple
    [BossTier.LEGENDARY]: '#f1c40f'    // Gold
};

// Claimed boss indicator color (orange - distinct from green villages)
export const CLAIMED_BOSS_COLOR = '#e67e22';
