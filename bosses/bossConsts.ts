// Boss Configuration Constants

export enum BossTier {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary'
}

// HP ranges per tier (min, max)
export const bossHpRanges: Record<BossTier, { min: number; max: number }> = {
    [BossTier.COMMON]: { min: 40000, max: 80000 },
    [BossTier.RARE]: { min: 200000, max: 400000 },
    [BossTier.EPIC]: { min: 800000, max: 1600000 },
    [BossTier.LEGENDARY]: { min: 4000000, max: 8000000 }
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

// Rewards: direct resource amounts per tier
// Using interpolated values for half-levels (e.g., 5.5 = avg of level 5 and 6)
export const bossRewardAmounts: Record<BossTier, number> = {
    [BossTier.COMMON]: 331250,      // Level 5.5 (between 187,500 and 475,000)
    [BossTier.RARE]: 1250000,       // Level 7
    [BossTier.EPIC]: 6500000,       // Level 8.5 (between 3,000,000 and 10,000,000)
    [BossTier.LEGENDARY]: 25000000  // Level 10
};

// Boss max damage back per tier (flat caps, not scaling with HP)
// Calibrated for ~10% loss with well-prepared armies, 25% cap for smaller armies
// Lower values make PvE profitable while still having meaningful troop cost
export const bossMaxDamageBack: Record<BossTier, number> = {
    [BossTier.COMMON]: 1000,      // ~10% loss for 10k attack army
    [BossTier.RARE]: 5000,        // ~10% loss for 50k attack army
    [BossTier.EPIC]: 15000,       // ~10% loss for 150k attack army
    [BossTier.LEGENDARY]: 50000   // ~10% loss for 500k attack army, requires clan for profit
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
