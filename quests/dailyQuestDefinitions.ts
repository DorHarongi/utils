import { prettifyNumber } from '../numberUtils';

export enum DailyQuestCategory {
    PVP = 'PVP',
    PVE = 'PVE',
    ECONOMY = 'ECONOMY',
    SOCIAL = 'SOCIAL',
    SCOUTING = 'SCOUTING',
    OASIS = 'OASIS',
}

export enum DailyQuestTrackingType {
    WIN_PVP_ATTACKS = 'WIN_PVP_ATTACKS',
    STEAL_RESOURCES = 'STEAL_RESOURCES',
    DEAL_BOSS_DAMAGE = 'DEAL_BOSS_DAMAGE',
    ATTACK_DIFFERENT_BOSSES = 'ATTACK_DIFFERENT_BOSSES',
    TRAIN_TROOPS = 'TRAIN_TROOPS',

    UPGRADE_BUILDING = 'UPGRADE_BUILDING',
    SUCCESSFUL_SPIES = 'SUCCESSFUL_SPIES',
    SEND_SUPPORT = 'SEND_SUPPORT',
    SEND_RESOURCES_TO_CLAN = 'SEND_RESOURCES_TO_CLAN',
    GARRISON_OASIS = 'GARRISON_OASIS',
    RETREAT_OASIS_WITH_RESOURCES = 'RETREAT_OASIS_WITH_RESOURCES',
    WIN_WITH_LOW_LOSSES = 'WIN_WITH_LOW_LOSSES',
    ATTACK_OASIS = 'ATTACK_OASIS',
    WIN_PVP_STREAK = 'WIN_PVP_STREAK',
    SPY_OASIS = 'SPY_OASIS',
}

export interface DailyQuestReward {
    wood: number;
    stone: number;
    crop: number;
}

export interface DailyQuestDefinition {
    id: string;
    title: string;
    description: string;
    category: DailyQuestCategory;
    trackingType: DailyQuestTrackingType;
    target: number;
    reward: DailyQuestReward;
    troopType?: string;
    minBuildingLevel?: number;
    targetLabel?: [string, string];
}

export const DAILY_QUEST_POOL: DailyQuestDefinition[] = [
    // PVP — risky (troop losses), rewards skew toward crop (armies consume crop)
    {
        id: 'dq_win_pvp',
        title: 'Victorious Raid',
        description: 'Win {target} PvP {target_label} today.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.WIN_PVP_ATTACKS,
        target: 1,
        targetLabel: ['attack', 'attacks'],
        reward: { wood: 2500, stone: 2000, crop: 3500 },
    },
    {
        id: 'dq_steal_resources',
        title: 'War Loot',
        description: 'Steal {target} total resources via PvP raids.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.STEAL_RESOURCES,
        target: 50_000,
        reward: { wood: 3000, stone: 2500, crop: 4000 },
    },
    {
        id: 'dq_low_losses',
        title: 'Flawless Victory',
        description: 'Win a battle with less than 20% troop losses.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.WIN_WITH_LOW_LOSSES,
        target: 1,
        reward: { wood: 4000, stone: 3500, crop: 5500 },
    },
    {
        id: 'dq_win_streak',
        title: 'Win Streak',
        description: 'Win {target} PvP attacks in a row.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.WIN_PVP_STREAK,
        target: 2,
        reward: { wood: 3500, stone: 3000, crop: 5000 },
    },
    // PVE — moderate risk, balanced with slight stone bonus
    {
        id: 'dq_boss_damage',
        title: 'Monster Hunter',
        description: 'Deal at least {target} total boss damage today.',
        category: DailyQuestCategory.PVE,
        trackingType: DailyQuestTrackingType.DEAL_BOSS_DAMAGE,
        target: 5_000,
        reward: { wood: 3000, stone: 3500, crop: 3000 },
    },
    {
        id: 'dq_attack_bosses',
        title: 'Boss Rush',
        description: 'Attack {target} different bosses today.',
        category: DailyQuestCategory.PVE,
        trackingType: DailyQuestTrackingType.ATTACK_DIFFERENT_BOSSES,
        target: 2,
        reward: { wood: 3500, stone: 4500, crop: 3000 },
    },
    // ECONOMY — risk-free, lower total, skews toward wood
    {
        id: 'dq_train',
        title: 'Recruitment',
        description: 'Train {target} troops of any type.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.TRAIN_TROOPS,
        target: 100,
        reward: { wood: 2000, stone: 1500, crop: 1500 },
    },
    {
        id: 'dq_upgrade_building',
        title: 'Construction',
        description: 'Upgrade any building in any village.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.UPGRADE_BUILDING,
        target: 1,
        reward: { wood: 2500, stone: 2000, crop: 1500 },
    },
    // SCOUTING — moderate, skews toward crop
    {
        id: 'dq_spy',
        title: 'Intelligence Gathering',
        description: 'Complete {target} successful spy missions.',
        category: DailyQuestCategory.SCOUTING,
        trackingType: DailyQuestTrackingType.SUCCESSFUL_SPIES,
        target: 2,
        reward: { wood: 1500, stone: 2000, crop: 2500 },
    },
    {
        id: 'dq_spy_oasis',
        title: 'Oasis Recon',
        description: 'Spy on {target} {target_label}.',
        category: DailyQuestCategory.SCOUTING,
        trackingType: DailyQuestTrackingType.SPY_OASIS,
        target: 1,
        targetLabel: ['oasis', 'oases'],
        reward: { wood: 1500, stone: 2000, crop: 2500 },
    },
    // SOCIAL — easy, lower total, skews toward stone
    {
        id: 'dq_send_support',
        title: 'Allied Reinforcements',
        description: 'Send support troops to a clanmate.',
        category: DailyQuestCategory.SOCIAL,
        trackingType: DailyQuestTrackingType.SEND_SUPPORT,
        target: 1,
        reward: { wood: 2000, stone: 2500, crop: 2000 },
    },
    {
        id: 'dq_send_resources',
        title: 'Care Package',
        description: 'Send resources to a clanmate.',
        category: DailyQuestCategory.SOCIAL,
        trackingType: DailyQuestTrackingType.SEND_RESOURCES_TO_CLAN,
        target: 1,
        reward: { wood: 1500, stone: 2500, crop: 1500 },
    },
    // OASIS — troops tied up, skews toward wood
    {
        id: 'dq_garrison_oasis',
        title: 'Land Grab',
        description: 'Occupy {target} {target_label} today.',
        category: DailyQuestCategory.OASIS,
        trackingType: DailyQuestTrackingType.GARRISON_OASIS,
        target: 1,
        targetLabel: ['oasis', 'oases'],
        reward: { wood: 3500, stone: 2500, crop: 3000 },
    },
    {
        id: 'dq_retreat_oasis',
        title: 'Cash Out',
        description: 'Collect {target} total resources from oasis retreats.',
        category: DailyQuestCategory.OASIS,
        trackingType: DailyQuestTrackingType.RETREAT_OASIS_WITH_RESOURCES,
        target: 50_000,
        reward: { wood: 4000, stone: 3000, crop: 3500 },
    },
    {
        id: 'dq_attack_oasis',
        title: 'Oasis Raider',
        description: 'Attack an occupied oasis.',
        category: DailyQuestCategory.OASIS,
        trackingType: DailyQuestTrackingType.ATTACK_OASIS,
        target: 1,
        reward: { wood: 3500, stone: 2500, crop: 3000 },
    },
];

export const DAILY_QUESTS_PER_DAY = 3;

export function selectDailyQuests(seed: number): DailyQuestDefinition[] {
    const shuffled = [...DAILY_QUEST_POOL];
    let s = seed;
    for (let i = shuffled.length - 1; i > 0; i--) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const j = s % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected: DailyQuestDefinition[] = [];
    const usedCategories = new Set<DailyQuestCategory>();

    for (const quest of shuffled) {
        if (selected.length >= DAILY_QUESTS_PER_DAY) break;
        if (usedCategories.has(quest.category)) continue;
        selected.push(quest);
        usedCategories.add(quest.category);
    }

    while (selected.length < DAILY_QUESTS_PER_DAY && shuffled.length > 0) {
        const remaining = shuffled.filter(q => !selected.includes(q));
        if (remaining.length === 0) break;
        selected.push(remaining[0]);
    }

    return selected;
}

export function getDailyQuestSeed(): number {
    const now = new Date();
    return now.getUTCFullYear() * 10000 + (now.getUTCMonth() + 1) * 100 + now.getUTCDate();
}

const ATTACK_SCALED_TYPES = new Set<DailyQuestTrackingType>([
    DailyQuestTrackingType.DEAL_BOSS_DAMAGE,
    DailyQuestTrackingType.STEAL_RESOURCES,
    DailyQuestTrackingType.RETREAT_OASIS_WITH_RESOURCES,
]);

const POPULATION_SCALED_TYPES = new Set<DailyQuestTrackingType>([
    DailyQuestTrackingType.TRAIN_TROOPS,
]);

const VILLAGE_SCALED_TYPES = new Set<DailyQuestTrackingType>([
    DailyQuestTrackingType.GARRISON_OASIS,
    DailyQuestTrackingType.WIN_PVP_ATTACKS,
    DailyQuestTrackingType.SUCCESSFUL_SPIES,
    DailyQuestTrackingType.SPY_OASIS,
]);

const BASE_ATTACK_POWER = 800;
const BASE_POPULATION = 150;

function scaleByRatio(baseTarget: number, ratio: number): number {
    if (ratio <= 1) {
        const multiplier = Math.max(0.3, ratio);
        return prettifyNumber(Math.max(1, Math.round(baseTarget * multiplier)));
    }
    const multiplier = Math.sqrt(ratio);
    return prettifyNumber(Math.round(baseTarget * multiplier));
}

export function scaleQuestTarget(
    baseTarget: number,
    trackingType: DailyQuestTrackingType,
    totalAttackPower: number,
    totalPopulation?: number,
    villageCount?: number,
): number {
    if (VILLAGE_SCALED_TYPES.has(trackingType) && villageCount !== undefined && villageCount > 1) {
        return prettifyNumber(Math.max(baseTarget, Math.round(baseTarget * Math.sqrt(villageCount))));
    }
    if (POPULATION_SCALED_TYPES.has(trackingType) && totalPopulation !== undefined) {
        return scaleByRatio(baseTarget, totalPopulation / BASE_POPULATION);
    }
    if (ATTACK_SCALED_TYPES.has(trackingType)) {
        return scaleByRatio(baseTarget, totalAttackPower / BASE_ATTACK_POWER);
    }
    return baseTarget;
}
