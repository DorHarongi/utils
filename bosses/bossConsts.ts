// Boss Configuration Constants

export enum BossTier {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  MYTHIC = "mythic",
}

export type BossReportType = "pvp" | "boss" | "spy" | "oasis" | "oasis_spy";

// HP ranges per tier (min, max)
export const bossHpRanges: Record<BossTier, { min: number; max: number }> = {
  [BossTier.COMMON]: { min: 40000, max: 80000 },
  [BossTier.RARE]: { min: 200000, max: 400000 },
  [BossTier.EPIC]: { min: 800000, max: 1600000 },
  [BossTier.LEGENDARY]: { min: 4000000, max: 8000000 },
  // Mythic HP is calculated dynamically at spawn: 2 * playerCount * legendaryAvg (10x–100x legendary)
  // This range is a fallback only
  [BossTier.MYTHIC]: { min: 60_000_000, max: 600_000_000 },
};

// Boss names per tier
export const bossNames: Record<BossTier, string> = {
  [BossTier.COMMON]: "Goblin Horde",
  [BossTier.RARE]: "Werewolf Pack",
  [BossTier.EPIC]: "Spectral Wraith",
  [BossTier.LEGENDARY]: "Sun Dragon",
  [BossTier.MYTHIC]: "Ancient Titan",
};

// Boss images (matching the assets)
export const bossImages: Record<BossTier, string> = {
  [BossTier.COMMON]: "boss-common.png",
  [BossTier.RARE]: "boss-rare.png",
  [BossTier.EPIC]: "boss-epic.png",
  [BossTier.LEGENDARY]: "boss-legendary.png",
  [BossTier.MYTHIC]: "mythic-boss.png",
};

// Get boss image filename by boss name
export const getBossImageByName = (bossName: string | undefined): string => {
  if (!bossName) return bossImages[BossTier.COMMON];

  // Find the tier that matches this boss name
  const tiers: BossTier[] = [
    BossTier.COMMON,
    BossTier.RARE,
    BossTier.EPIC,
    BossTier.LEGENDARY,
    BossTier.MYTHIC,
  ];
  for (const tier of tiers) {
    if (bossNames[tier] === bossName) {
      return bossImages[tier];
    }
  }
  return bossImages[BossTier.COMMON]; // fallback
};

// Spawn weights (higher = more common)
export const bossSpawnWeights: Record<BossTier, number> = {
  [BossTier.COMMON]: 50,
  [BossTier.RARE]: 30,
  [BossTier.EPIC]: 15,
  [BossTier.LEGENDARY]: 5,
  // Mythic bosses are spawned via a dedicated daily roll, not the regular spawn pipeline
  [BossTier.MYTHIC]: 0,
};

// Distance bonus calculation
// Returns damage multiplier based on distance (in grid cells)
// Bonus for being close, no penalty for being far
export const getDistanceDamageMultiplier = (distance: number): number => {
  if (distance <= 5) return 1.75; // 175% damage
  if (distance <= 10) return 1.5; // 150% damage
  if (distance <= 20) return 1.25; // 125% damage
  return 1.0; // 100% damage (base)
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
  [BossTier.COMMON]: 331250, // Level 5.5 (between 187,500 and 475,000)
  [BossTier.RARE]: 1250000, // Level 7
  [BossTier.EPIC]: 6500000, // Level 8.5 (between 3,000,000 and 10,000,000)
  [BossTier.LEGENDARY]: 25000000, // Level 10
  // Mythic rewards are enormous; exact tuning can be adjusted via playtesting
  [BossTier.MYTHIC]: 100000000,
};

// Boss max damage back per tier (flat caps, not scaling with HP)
// Calibrated for ~10% loss with well-prepared armies, 25% cap for smaller armies
// Lower values make PvE profitable while still having meaningful troop cost
export const bossMaxDamageBack: Record<BossTier, number> = {
  [BossTier.COMMON]: 1000, // ~10% loss for 10k attack army
  [BossTier.RARE]: 5000, // ~10% loss for 50k attack army
  [BossTier.EPIC]: 15000, // ~10% loss for 150k attack army
  [BossTier.LEGENDARY]: 50000, // ~10% loss for 500k attack army, requires clan for profit
  [BossTier.MYTHIC]: 200000, // Endgame raids with very high but still capped losses
};

// Boss claim duration (48 hours in milliseconds)
export const BOSS_CLAIM_DURATION_MS = 48 * 60 * 60 * 1000;

// Boss despawn duration for unclaimed bosses (48 hours)
export const BOSS_UNCLAIMED_DESPAWN_MS = 48 * 60 * 60 * 1000;

// Dynamic boss cap based on player count: max(10, ceil(playerCount / 5))
export function getMaxBossesOnMap(playerCount: number): number {
  return Math.max(10, Math.ceil(playerCount / 5));
}

// Per-clan claim limit: max(3, floor(maxBosses * 0.25))
export function getMaxClaimsPerClan(maxBosses: number): number {
  return Math.max(3, Math.floor(maxBosses * 0.25));
}

// Spawn check interval (every minute, 3.33% chance per tick ≈ 30 min avg)
export const BOSS_SPAWN_CRON = "* * * * *";

// Minimap & rarity colors (shared palette for bosses and oases)
export const rarityColors: Record<string, string> = {
  common: "#808080",
  rare: "#3498db",
  epic: "#9b59b6",
  legendary: "#f1c40f",
  mythic: "#e74c3c",
};

export const bossMinimapColors: Record<BossTier, string> = {
  [BossTier.COMMON]: rarityColors.common,
  [BossTier.RARE]: rarityColors.rare,
  [BossTier.EPIC]: rarityColors.epic,
  [BossTier.LEGENDARY]: rarityColors.legendary,
  [BossTier.MYTHIC]: rarityColors.mythic,
};

// Claimed boss indicator color (orange - distinct from green villages)
export const CLAIMED_BOSS_COLOR = "#e67e22";
