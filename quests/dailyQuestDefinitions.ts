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
    DEFEND_ATTACKS = 'DEFEND_ATTACKS',
    STEAL_RESOURCES = 'STEAL_RESOURCES',
    DEAL_BOSS_DAMAGE = 'DEAL_BOSS_DAMAGE',
    ATTACK_DIFFERENT_BOSSES = 'ATTACK_DIFFERENT_BOSSES',
    TRAIN_TROOPS = 'TRAIN_TROOPS',
    HIRE_WORKERS = 'HIRE_WORKERS',
    UPGRADE_BUILDING = 'UPGRADE_BUILDING',
    SUCCESSFUL_SPIES = 'SUCCESSFUL_SPIES',
    SEND_SUPPORT = 'SEND_SUPPORT',
    SEND_RESOURCES_TO_CLAN = 'SEND_RESOURCES_TO_CLAN',
    GARRISON_OASIS = 'GARRISON_OASIS',
    RETREAT_OASIS_WITH_RESOURCES = 'RETREAT_OASIS_WITH_RESOURCES',
    WIN_WITH_LOW_LOSSES = 'WIN_WITH_LOW_LOSSES',
    TRAIN_SPECIFIC_TROOP = 'TRAIN_SPECIFIC_TROOP',
    UPGRADE_BUILDING_TO_LEVEL = 'UPGRADE_BUILDING_TO_LEVEL',
    ATTACK_OASIS = 'ATTACK_OASIS',
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
}

export const DAILY_QUEST_POOL: DailyQuestDefinition[] = [
    {
        id: 'dq_win_pvp_1',
        title: 'Victorious Raid',
        description: 'Win a PvP attack against another player.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.WIN_PVP_ATTACKS,
        target: 1,
        reward: { wood: 2500, stone: 2500, crop: 2500 },
    },
    {
        id: 'dq_win_pvp_2',
        title: 'Double Strike',
        description: 'Win 2 PvP attacks against other players.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.WIN_PVP_ATTACKS,
        target: 2,
        reward: { wood: 4000, stone: 4000, crop: 4000 },
    },
    {
        id: 'dq_defend_1',
        title: 'Hold the Line',
        description: 'Successfully defend against an attack.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.DEFEND_ATTACKS,
        target: 1,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
    },
    {
        id: 'dq_steal_resources',
        title: 'Plunder',
        description: 'Steal 50,000 total resources via PvP raids.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.STEAL_RESOURCES,
        target: 50_000,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
    },
    {
        id: 'dq_low_losses',
        title: 'Flawless Victory',
        description: 'Win a battle with less than 20% troop losses.',
        category: DailyQuestCategory.PVP,
        trackingType: DailyQuestTrackingType.WIN_WITH_LOW_LOSSES,
        target: 1,
        reward: { wood: 4000, stone: 4000, crop: 4000 },
    },
    {
        id: 'dq_boss_damage_5k',
        title: 'Monster Hunter',
        description: 'Deal at least 5,000 damage to a boss in a single attack.',
        category: DailyQuestCategory.PVE,
        trackingType: DailyQuestTrackingType.DEAL_BOSS_DAMAGE,
        target: 5_000,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
    },
    {
        id: 'dq_boss_damage_10k',
        title: 'Beast Slayer',
        description: 'Deal at least 10,000 total boss damage today.',
        category: DailyQuestCategory.PVE,
        trackingType: DailyQuestTrackingType.DEAL_BOSS_DAMAGE,
        target: 10_000,
        reward: { wood: 3500, stone: 3500, crop: 3500 },
    },
    {
        id: 'dq_attack_2_bosses',
        title: 'Boss Rush',
        description: 'Attack 2 different bosses today.',
        category: DailyQuestCategory.PVE,
        trackingType: DailyQuestTrackingType.ATTACK_DIFFERENT_BOSSES,
        target: 2,
        reward: { wood: 3500, stone: 3500, crop: 3500 },
    },
    {
        id: 'dq_train_100',
        title: 'Enlistment',
        description: 'Train 100 troops of any type.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.TRAIN_TROOPS,
        target: 100,
        reward: { wood: 2000, stone: 2000, crop: 2000 },
    },
    {
        id: 'dq_train_200',
        title: 'Mobilization',
        description: 'Train 200 troops of any type.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.TRAIN_TROOPS,
        target: 200,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
    },
    {
        id: 'dq_hire_50',
        title: 'Workforce Expansion',
        description: 'Hire 50 workers across your villages.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.HIRE_WORKERS,
        target: 50,
        reward: { wood: 1500, stone: 1500, crop: 1500 },
    },
    {
        id: 'dq_hire_100',
        title: 'Industrial Boom',
        description: 'Hire 100 workers across your villages.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.HIRE_WORKERS,
        target: 100,
        reward: { wood: 2000, stone: 2000, crop: 2000 },
    },
    {
        id: 'dq_upgrade_building',
        title: 'Construction',
        description: 'Upgrade any building in any village.',
        category: DailyQuestCategory.ECONOMY,
        trackingType: DailyQuestTrackingType.UPGRADE_BUILDING,
        target: 1,
        reward: { wood: 2500, stone: 2500, crop: 2500 },
    },
    {
        id: 'dq_spy_2',
        title: 'Intelligence Gathering',
        description: 'Complete 2 successful spy missions.',
        category: DailyQuestCategory.SCOUTING,
        trackingType: DailyQuestTrackingType.SUCCESSFUL_SPIES,
        target: 2,
        reward: { wood: 2000, stone: 2000, crop: 2000 },
    },
    {
        id: 'dq_spy_3',
        title: 'Master Spy',
        description: 'Complete 3 successful spy missions.',
        category: DailyQuestCategory.SCOUTING,
        trackingType: DailyQuestTrackingType.SUCCESSFUL_SPIES,
        target: 3,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
    },
    {
        id: 'dq_send_support',
        title: 'Allied Reinforcements',
        description: 'Send support troops to a clanmate.',
        category: DailyQuestCategory.SOCIAL,
        trackingType: DailyQuestTrackingType.SEND_SUPPORT,
        target: 1,
        reward: { wood: 2500, stone: 2500, crop: 2500 },
    },
    {
        id: 'dq_send_resources',
        title: 'Care Package',
        description: 'Send resources to a clanmate.',
        category: DailyQuestCategory.SOCIAL,
        trackingType: DailyQuestTrackingType.SEND_RESOURCES_TO_CLAN,
        target: 1,
        reward: { wood: 2000, stone: 2000, crop: 2000 },
    },
    {
        id: 'dq_garrison_oasis',
        title: 'Land Grab',
        description: 'Send troops to occupy an oasis.',
        category: DailyQuestCategory.OASIS,
        trackingType: DailyQuestTrackingType.GARRISON_OASIS,
        target: 1,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
    },
    {
        id: 'dq_retreat_oasis',
        title: 'Cash Out',
        description: 'Retreat from an oasis with at least 50,000 of any resource.',
        category: DailyQuestCategory.OASIS,
        trackingType: DailyQuestTrackingType.RETREAT_OASIS_WITH_RESOURCES,
        target: 50_000,
        reward: { wood: 3500, stone: 3500, crop: 3500 },
    },
    {
        id: 'dq_attack_oasis',
        title: 'Oasis Raider',
        description: 'Attack an occupied oasis.',
        category: DailyQuestCategory.OASIS,
        trackingType: DailyQuestTrackingType.ATTACK_OASIS,
        target: 1,
        reward: { wood: 3000, stone: 3000, crop: 3000 },
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

const SCALED_TRACKING_TYPES = new Set<DailyQuestTrackingType>([
    DailyQuestTrackingType.DEAL_BOSS_DAMAGE,
    DailyQuestTrackingType.STEAL_RESOURCES,
    DailyQuestTrackingType.TRAIN_TROOPS,
    DailyQuestTrackingType.HIRE_WORKERS,
    DailyQuestTrackingType.RETREAT_OASIS_WITH_RESOURCES,
]);

const BASE_ATTACK_POWER = 800;

export function scaleQuestTarget(
    baseTarget: number,
    trackingType: DailyQuestTrackingType,
    totalAttackPower: number,
): number {
    if (!SCALED_TRACKING_TYPES.has(trackingType)) return baseTarget;
    if (totalAttackPower <= BASE_ATTACK_POWER) return baseTarget;
    const multiplier = Math.sqrt(totalAttackPower / BASE_ATTACK_POWER);
    return prettifyNumber(Math.round(baseTarget * multiplier));
}
