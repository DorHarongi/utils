import { prettifyNumber } from '../numberUtils';

export enum ClanQuestTrackingType {
    TOTAL_BOSS_DAMAGE = 'TOTAL_BOSS_DAMAGE',
    TOTAL_RESOURCES_STOLEN = 'TOTAL_RESOURCES_STOLEN',
    TOTAL_TROOPS_TRAINED = 'TOTAL_TROOPS_TRAINED',
    TOTAL_SUCCESSFUL_SPIES = 'TOTAL_SUCCESSFUL_SPIES',
    TOTAL_SUPPORT_SHIPMENTS = 'TOTAL_SUPPORT_SHIPMENTS',
    TOTAL_PVP_WINS = 'TOTAL_PVP_WINS',

    TOTAL_BUILDINGS_UPGRADED = 'TOTAL_BUILDINGS_UPGRADED',
    TOTAL_RESOURCE_SHIPMENTS = 'TOTAL_RESOURCE_SHIPMENTS',
    TOTAL_OASES_CONQUERED = 'TOTAL_OASES_CONQUERED',
    TOTAL_OASIS_RESOURCES_HARVESTED = 'TOTAL_OASIS_RESOURCES_HARVESTED',
    TOTAL_BOSS_KILLS = 'TOTAL_BOSS_KILLS',
    TOTAL_OASIS_SPIES = 'TOTAL_OASIS_SPIES',
}

export enum ClanQuestScalingType {
    ATTACK_POWER = 'ATTACK_POWER',
    POPULATION = 'POPULATION',
    MEMBER_COUNT = 'MEMBER_COUNT',
}

export interface ClanQuestReward {
    wood: number;
    stone: number;
    crop: number;
}

export interface ClanQuestDefinition {
    id: string;
    title: string;
    description: string;
    trackingType: ClanQuestTrackingType;
    scalingType: ClanQuestScalingType;
    target: number;
    reward: ClanQuestReward;
}

export const CLAN_QUEST_POOL: ClanQuestDefinition[] = [
    // Attack power scaled — stronger clan army = higher targets
    {
        id: 'cq_boss_damage',
        title: 'Clan Boss Slayers',
        description: 'Deal {target} total boss damage as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BOSS_DAMAGE,
        scalingType: ClanQuestScalingType.ATTACK_POWER,
        target: 500_000,
        reward: { wood: 10000, stone: 12000, crop: 8000 },
    },
    {
        id: 'cq_raid',
        title: 'Clan Raiders',
        description: 'Steal {target} total resources via PvP as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_RESOURCES_STOLEN,
        scalingType: ClanQuestScalingType.ATTACK_POWER,
        target: 300_000,
        reward: { wood: 6000, stone: 7000, crop: 9500 },
    },
    {
        id: 'cq_pvp',
        title: 'Conquerors',
        description: 'Win {target} PvP battles as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_PVP_WINS,
        scalingType: ClanQuestScalingType.ATTACK_POWER,
        target: 25,
        reward: { wood: 8000, stone: 9000, crop: 13000 },
    },
    {
        id: 'cq_boss_kills',
        title: 'Boss Killers',
        description: 'Defeat {target} bosses as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BOSS_KILLS,
        scalingType: ClanQuestScalingType.ATTACK_POWER,
        target: 20,
        reward: { wood: 15000, stone: 12000, crop: 12000 },
    },
    // Population scaled — bigger economy = higher targets
    {
        id: 'cq_train',
        title: 'Army Builders',
        description: 'Train {target} troops collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_TROOPS_TRAINED,
        scalingType: ClanQuestScalingType.POPULATION,
        target: 5_000,
        reward: { wood: 6000, stone: 4500, crop: 4500 },
    },
    {
        id: 'cq_buildings',
        title: 'Master Architects',
        description: 'Upgrade {target} buildings across all clan members this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BUILDINGS_UPGRADED,
        scalingType: ClanQuestScalingType.POPULATION,
        target: 10,
        reward: { wood: 9000, stone: 7500, crop: 6000 },
    },
    {
        id: 'cq_oasis_harvest',
        title: 'Harvesters',
        description: 'Harvest {target} total resources from oases this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASIS_RESOURCES_HARVESTED,
        scalingType: ClanQuestScalingType.POPULATION,
        target: 1_000_000,
        reward: { wood: 14000, stone: 11000, crop: 11000 },
    },
    // Member count scaled — more members = more activity expected
    {
        id: 'cq_spy',
        title: 'Scout Network',
        description: 'Complete {target} successful spy missions as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_SUCCESSFUL_SPIES,
        scalingType: ClanQuestScalingType.MEMBER_COUNT,
        target: 20,
        reward: { wood: 6000, stone: 7500, crop: 9000 },
    },
    {
        id: 'cq_support',
        title: 'Brothers in Arms',
        description: 'Send {target} support troop shipments to clanmates this week.',
        trackingType: ClanQuestTrackingType.TOTAL_SUPPORT_SHIPMENTS,
        scalingType: ClanQuestScalingType.MEMBER_COUNT,
        target: 10,
        reward: { wood: 7000, stone: 8000, crop: 7500 },
    },
    {
        id: 'cq_resource_shipments',
        title: 'Supply Lines',
        description: 'Send {target} resource shipments to clanmates this week.',
        trackingType: ClanQuestTrackingType.TOTAL_RESOURCE_SHIPMENTS,
        scalingType: ClanQuestScalingType.MEMBER_COUNT,
        target: 20,
        reward: { wood: 7000, stone: 8500, crop: 7000 },
    },
    {
        id: 'cq_oasis',
        title: 'Oasis Dominators',
        description: 'Conquer {target} oases collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASES_CONQUERED,
        scalingType: ClanQuestScalingType.MEMBER_COUNT,
        target: 5,
        reward: { wood: 12000, stone: 9000, crop: 9000 },
    },
    {
        id: 'cq_oasis_intel',
        title: 'Oasis Intel',
        description: 'Spy on {target} oases collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASIS_SPIES,
        scalingType: ClanQuestScalingType.MEMBER_COUNT,
        target: 15,
        reward: { wood: 6000, stone: 7500, crop: 9000 },
    },
];

const BASE_CLAN_ATTACK_POWER = 50_000;
const BASE_CLAN_POPULATION = 5_000;
const BASE_CLAN_MEMBERS = 5;

function scaleByRatio(baseTarget: number, ratio: number): number {
    if (ratio <= 1) {
        const multiplier = Math.max(0.5, ratio);
        return prettifyNumber(Math.max(1, Math.round(baseTarget * multiplier)));
    }
    const multiplier = Math.sqrt(ratio);
    return prettifyNumber(Math.max(1, Math.round(baseTarget * multiplier)));
}

export interface ClanScalingData {
    totalAttackPower: number;
    totalPopulation: number;
    memberCount: number;
}

export function scaleClanQuestTarget(
    quest: ClanQuestDefinition,
    scalingData: ClanScalingData,
): number {
    switch (quest.scalingType) {
        case ClanQuestScalingType.ATTACK_POWER:
            return scaleByRatio(quest.target, scalingData.totalAttackPower / BASE_CLAN_ATTACK_POWER);
        case ClanQuestScalingType.POPULATION:
            return scaleByRatio(quest.target, scalingData.totalPopulation / BASE_CLAN_POPULATION);
        case ClanQuestScalingType.MEMBER_COUNT: {
            const ratio = scalingData.memberCount / BASE_CLAN_MEMBERS;
            if (ratio <= 1) {
                return prettifyNumber(Math.max(1, Math.round(quest.target * Math.max(0.5, ratio))));
            }
            return prettifyNumber(Math.round(quest.target * ratio));
        }
        default:
            return quest.target;
    }
}

export function selectClanQuest(seed: number): ClanQuestDefinition {
    let s = seed;
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const index = s % CLAN_QUEST_POOL.length;
    return CLAN_QUEST_POOL[index];
}

export function getClanQuestWeekSeed(): number {
    const now = new Date();
    const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (86400000));
    const weekNumber = Math.floor(dayOfYear / 7);
    return now.getUTCFullYear() * 100 + weekNumber;
}
