export enum ClanQuestTrackingType {
    TOTAL_BOSS_DAMAGE = 'TOTAL_BOSS_DAMAGE',
    TOTAL_RESOURCES_STOLEN = 'TOTAL_RESOURCES_STOLEN',
    TOTAL_DEFENSES = 'TOTAL_DEFENSES',
    TOTAL_TROOPS_TRAINED = 'TOTAL_TROOPS_TRAINED',
    TOTAL_SUCCESSFUL_SPIES = 'TOTAL_SUCCESSFUL_SPIES',
    TOTAL_SUPPORT_SHIPMENTS = 'TOTAL_SUPPORT_SHIPMENTS',
    TOTAL_PVP_WINS = 'TOTAL_PVP_WINS',
    TOTAL_WORKERS_HIRED = 'TOTAL_WORKERS_HIRED',
    TOTAL_BUILDINGS_UPGRADED = 'TOTAL_BUILDINGS_UPGRADED',
    TOTAL_RESOURCE_SHIPMENTS = 'TOTAL_RESOURCE_SHIPMENTS',
    TOTAL_OASES_CONQUERED = 'TOTAL_OASES_CONQUERED',
    TOTAL_OASIS_RESOURCES_HARVESTED = 'TOTAL_OASIS_RESOURCES_HARVESTED',
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
    target: number;
    reward: ClanQuestReward;
}

export const CLAN_QUEST_POOL: ClanQuestDefinition[] = [
    // Boss damage — balanced, slight stone bonus
    {
        id: 'cq_boss_damage_500k',
        title: 'Clan Boss Slayers',
        description: 'Deal {target} total boss damage as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BOSS_DAMAGE,
        target: 500_000,
        reward: { wood: 10000, stone: 12000, crop: 8000 },
    },
    {
        id: 'cq_boss_damage_1m',
        title: 'Dragon Hunters',
        description: 'Deal {target} total boss damage as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BOSS_DAMAGE,
        target: 1_000_000,
        reward: { wood: 15000, stone: 17500, crop: 12500 },
    },
    {
        id: 'cq_boss_damage_2m',
        title: 'Titan Crushers',
        description: 'Deal {target} total boss damage as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BOSS_DAMAGE,
        target: 2_000_000,
        reward: { wood: 20000, stone: 25000, crop: 15000 },
    },
    // PvP raids — crop-heavy (armies)
    {
        id: 'cq_raid_300k',
        title: 'Clan Raiders',
        description: 'Steal {target} total resources via PvP as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_RESOURCES_STOLEN,
        target: 300_000,
        reward: { wood: 6000, stone: 7000, crop: 9500 },
    },
    {
        id: 'cq_raid_1m',
        title: 'Warlords',
        description: 'Steal {target} total resources via PvP as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_RESOURCES_STOLEN,
        target: 1_000_000,
        reward: { wood: 12500, stone: 14000, crop: 18500 },
    },
    // Defense — stone-heavy (walls, fortifications)
    {
        id: 'cq_defense_15',
        title: 'Iron Fortress',
        description: 'Successfully defend {target} attacks across all clan members this week.',
        trackingType: ClanQuestTrackingType.TOTAL_DEFENSES,
        target: 15,
        reward: { wood: 8000, stone: 14000, crop: 8000 },
    },
    {
        id: 'cq_defense_30',
        title: 'Unbreakable',
        description: 'Successfully defend {target} attacks across all clan members this week.',
        trackingType: ClanQuestTrackingType.TOTAL_DEFENSES,
        target: 30,
        reward: { wood: 12000, stone: 20000, crop: 13000 },
    },
    // Training — wood-heavy
    {
        id: 'cq_train_5000',
        title: 'Army Builders',
        description: 'Train {target} troops collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_TROOPS_TRAINED,
        target: 5_000,
        reward: { wood: 6000, stone: 4500, crop: 4500 },
    },
    {
        id: 'cq_train_10000',
        title: 'Grand Army',
        description: 'Train {target} troops collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_TROOPS_TRAINED,
        target: 10_000,
        reward: { wood: 12000, stone: 9000, crop: 9000 },
    },
    // Scouting — crop-heavy
    {
        id: 'cq_spy_20',
        title: 'Scout Network',
        description: 'Complete {target} successful spy missions as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_SUCCESSFUL_SPIES,
        target: 20,
        reward: { wood: 6000, stone: 7500, crop: 9000 },
    },
    {
        id: 'cq_spy_40',
        title: 'Eyes Everywhere',
        description: 'Complete {target} successful spy missions as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_SUCCESSFUL_SPIES,
        target: 40,
        reward: { wood: 10000, stone: 12000, crop: 14000 },
    },
    // Support — balanced
    {
        id: 'cq_support_10',
        title: 'Brothers in Arms',
        description: 'Send {target} support troop shipments to clanmates this week.',
        trackingType: ClanQuestTrackingType.TOTAL_SUPPORT_SHIPMENTS,
        target: 10,
        reward: { wood: 7000, stone: 8000, crop: 7500 },
    },
    // PvP wins — crop-heavy
    {
        id: 'cq_pvp_25',
        title: 'Conquerors',
        description: 'Win {target} PvP battles as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_PVP_WINS,
        target: 25,
        reward: { wood: 8000, stone: 9000, crop: 13000 },
    },
    {
        id: 'cq_pvp_50',
        title: 'Warmongers',
        description: 'Win {target} PvP battles as a clan this week.',
        trackingType: ClanQuestTrackingType.TOTAL_PVP_WINS,
        target: 50,
        reward: { wood: 12000, stone: 14000, crop: 19000 },
    },
    // Economy — wood-heavy
    {
        id: 'cq_workers_1000',
        title: 'Industrialists',
        description: 'Hire {target} workers collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_WORKERS_HIRED,
        target: 1_000,
        reward: { wood: 6000, stone: 4500, crop: 4500 },
    },
    {
        id: 'cq_buildings_10',
        title: 'Master Architects',
        description: 'Upgrade {target} buildings across all clan members this week.',
        trackingType: ClanQuestTrackingType.TOTAL_BUILDINGS_UPGRADED,
        target: 10,
        reward: { wood: 9000, stone: 7500, crop: 6000 },
    },
    {
        id: 'cq_resource_shipments_20',
        title: 'Supply Lines',
        description: 'Send {target} resource shipments to clanmates this week.',
        trackingType: ClanQuestTrackingType.TOTAL_RESOURCE_SHIPMENTS,
        target: 20,
        reward: { wood: 7000, stone: 8500, crop: 7000 },
    },
    // Oasis — wood-heavy
    {
        id: 'cq_oasis_5',
        title: 'Oasis Dominators',
        description: 'Conquer {target} oases collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASES_CONQUERED,
        target: 5,
        reward: { wood: 12000, stone: 9000, crop: 9000 },
    },
    {
        id: 'cq_oasis_harvest_1m',
        title: 'Harvesters',
        description: 'Harvest {target} total resources from oases this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASIS_RESOURCES_HARVESTED,
        target: 1_000_000,
        reward: { wood: 14000, stone: 11000, crop: 11000 },
    },
    {
        id: 'cq_support_20',
        title: 'Shield Wall',
        description: 'Send {target} support troop shipments to clanmates this week.',
        trackingType: ClanQuestTrackingType.TOTAL_SUPPORT_SHIPMENTS,
        target: 20,
        reward: { wood: 11000, stone: 13000, crop: 12000 },
    },
    {
        id: 'cq_oasis_10',
        title: 'Land Empire',
        description: 'Conquer {target} oases collectively this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASES_CONQUERED,
        target: 10,
        reward: { wood: 18000, stone: 13500, crop: 13500 },
    },
    {
        id: 'cq_oasis_harvest_3m',
        title: 'Grand Harvest',
        description: 'Harvest {target} total resources from oases this week.',
        trackingType: ClanQuestTrackingType.TOTAL_OASIS_RESOURCES_HARVESTED,
        target: 3_000_000,
        reward: { wood: 24000, stone: 18000, crop: 18000 },
    },
];

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
