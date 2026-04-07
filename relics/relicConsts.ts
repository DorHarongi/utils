export interface RelicDefinition {
  id: string;
  name: string;
  description: string;
  bonusLabel: string;
}

export const RELIC_NAMES: RelicDefinition[] = [
  {
    id: "apple_of_immortality",
    name: "Apple of Immortality",
    description: "Forbidden knowledge and immortality, the fruit of the gods.",
    bonusLabel: "Defense +30%",
  },
  {
    id: "eternal_flame",
    name: "Eternal Flame",
    description: "Divine fire stolen from the gods, burning without end.",
    bonusLabel: "Attack +30%",
  },
  {
    id: "chalice_of_ascension",
    name: "Chalice of Ascension",
    description: "A holy chalice said to choose the one destined to rule.",
    bonusLabel: "Resource Production +30%",
  },
  {
    id: "all_seeing_orb",
    name: "All-Seeing Orb",
    description: "An orb through which the gods once watched the world.",
    bonusLabel: "Spy Detection +40%",
  },
  {
    id: "sigil_of_thunder",
    name: "Sigil of Thunder",
    description:
      "A divine mark crackling with the fury of the storm, granting unmatched swiftness.",
    bonusLabel: "Movement Speed +50%",
  },
];

// Relic bonus values
export const RELIC_ATTACK_BONUS = 0.30;
export const RELIC_DEFENSE_BONUS = 0.30;
export const RELIC_PRODUCTION_BONUS = 0.30;
export const RELIC_SPY_DETECTION_BONUS = 40;
export const RELIC_SPEED_BONUS = 0.50;

export function getRelicAttackBonus(heldRelicIds: string[]): number {
  return heldRelicIds.includes('eternal_flame') ? RELIC_ATTACK_BONUS : 0;
}
export function getRelicDefenseBonus(heldRelicIds: string[]): number {
  return heldRelicIds.includes('apple_of_immortality') ? RELIC_DEFENSE_BONUS : 0;
}
export function getRelicProductionBonus(heldRelicIds: string[]): number {
  return heldRelicIds.includes('chalice_of_ascension') ? RELIC_PRODUCTION_BONUS : 0;
}
export function getRelicSpyDetectionBonus(heldRelicIds: string[]): number {
  return heldRelicIds.includes('all_seeing_orb') ? RELIC_SPY_DETECTION_BONUS : 0;
}
export function getRelicSpeedBonus(heldRelicIds: string[]): number {
  return heldRelicIds.includes('sigil_of_thunder') ? RELIC_SPEED_BONUS : 0;
}

// 3% daily chance to spawn a Mythic boss per server
export const MYTHIC_BOSS_DAILY_SPAWN_CHANCE = 0.03;

// 7-day cooldown between leader-initiated relic transfers
export const RELIC_TRANSFER_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export interface RelicHolder {
  relicId: string;
  username: string | null;
  villageName: string | null;
  clanName: string | null;
  transferCooldownUntil: Date | null;
}
