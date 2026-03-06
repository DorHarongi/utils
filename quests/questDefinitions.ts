import { Quest, QuestCompletionType } from "./questTypes";

/**
 * Beginner Quest System
 * 
 * These quests guide new players through the early game, ensuring they always
 * have enough resources to progress. Only available on the first village.
 * 
 * Quest rewards are calculated to cover the cost of the next quest.
 */
export const QUESTS: Quest[] = [
    {
        id: 1,
        title: "Upgrade Center Building",
        description: "Upgrade your Center Building to level 2. This unlocks level 2 upgrades for all other buildings in your village!",
        hint: "Click the Center Building in your village",
        rewards: { wood: 4000, stone: 2500, crop: 1000 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'centerBuilding', 
            level: 2 
        }
    },
    {
        id: 2,
        title: "Upgrade Wood Factory",
        description: "Upgrade your Wood Factory to level 2. Your wood production per worker will double from 0.25/sec to 0.5/sec!",
        hint: "Click the Wood Factory building",
        rewards: { wood: 3250, stone: 3250, crop: 1000 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'woodFactory', 
            level: 2 
        }
    },
    {
        id: 3,
        title: "Upgrade Stone Mine",
        description: "Upgrade your Stone Mine to level 2. Your stone production per worker will double from 0.25/sec to 0.5/sec!",
        hint: "Click the Stone Mine building",
        rewards: { wood: 3000, stone: 2250, crop: 2250 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'stoneMine', 
            level: 2 
        }
    },
    {
        id: 4,
        title: "Upgrade Crop Farm",
        description: "Upgrade your Crop Farm to level 2. Your crop production per worker will double from 0.25/sec to 0.5/sec!",
        hint: "Click the Crop Farm building",
        rewards: { wood: 2500, stone: 3250, crop: 1750 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'cropFarm', 
            level: 2 
        }
    },
    {
        id: 5,
        title: "Upgrade Arsenal",
        description: "Upgrade your Arsenal to level 2. This unlocks Axe Fighters - stronger troops for battle!",
        hint: "Click the Arsenal building",
        rewards: { wood: 1500, stone: 1500, crop: 6000 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'arsenal', 
            level: 2 
        }
    },
    {
        id: 6,
        title: "Train Your First Army",
        description: "Train 10 soldiers of any type. Soldiers take up population and fight for you in battles. Each soldier uses 1 population slot.",
        hint: "Go to Arsenal and train troops",
        rewards: { wood: 2000, stone: 2000, crop: 3000 },
        condition: { 
            type: QuestCompletionType.TRAIN_TROOPS, 
            count: 10 
        }
    },
    {
        id: 7,
        title: "Hire Workers",
        description: "Hire 50 workers to boost resource production. Workers also use population - your total population is workers + soldiers combined!",
        hint: "Go to any Factory and hire workers",
        rewards: { wood: 3250, stone: 2500, crop: 1750 },
        condition: { 
            type: QuestCompletionType.HIRE_WORKERS, 
            count: 50 
        }
    },
    {
        id: 8,
        title: "Upgrade Quarters",
        description: "Upgrade your Quarters to level 2. Your max population increases from 100 to 250, allowing more workers and soldiers!",
        hint: "Click the Quarters building",
        rewards: { wood: 3500, stone: 2500, crop: 1500 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'quarters', 
            level: 2 
        }
    },
    {
        id: 9,
        title: "Upgrade Wood Warehouse",
        description: "Upgrade your Wood Warehouse to level 2. Your wood storage increases from 5,000 to 12,500!",
        hint: "Click the Wood Warehouse building",
        rewards: { wood: 2500, stone: 3500, crop: 1500 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'woodWarehouse', 
            level: 2 
        }
    },
    {
        id: 10,
        title: "Upgrade Stone Warehouse",
        description: "Upgrade your Stone Warehouse to level 2. Your stone storage increases from 5,000 to 12,500!",
        hint: "Click the Stone Warehouse building",
        rewards: { wood: 2500, stone: 2500, crop: 2500 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'stoneWarehouse', 
            level: 2 
        }
    },
    {
        id: 11,
        title: "Upgrade Crop Warehouse",
        description: "Upgrade your Crop Warehouse to level 2. Your crop storage increases from 5,000 to 12,500!",
        hint: "Click the Crop Warehouse building",
        rewards: { wood: 12500, stone: 12500, crop: 12500 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'cropWarehouse', 
            level: 2 
        }
    },
    {
        id: 12,
        title: "Upgrade Center Building Again",
        description: "Upgrade your Center Building to level 3. This unlocks level 3 for all buildings - bigger upgrades ahead!",
        hint: "Click the Center Building",
        rewards: { wood: 6250, stone: 8125, crop: 4375 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'centerBuilding', 
            level: 3 
        }
    },
    {
        id: 13,
        title: "Upgrade Arsenal Further",
        description: "Upgrade your Arsenal to level 3. This unlocks even more powerful troop types!",
        hint: "Click the Arsenal building",
        rewards: { wood: 2000, stone: 4000, crop: 1500 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'arsenal', 
            level: 3 
        }
    },
    {
        id: 14,
        title: "Build Your Defenses",
        description: "Upgrade your Wall to level 2. Walls add defense bonus to your village and increase spy detection chance!",
        hint: "Click the Wall building",
        rewards: { wood: 6750, stone: 8500, crop: 1700 },
        condition: { 
            type: QuestCompletionType.BUILDING_LEVEL, 
            buildingName: 'wall', 
            level: 2 
        }
    },
    {
        id: 16,
        title: "Upgrade the Stable",
        description: "Upgrade your Stable to level 2. The Stable unlocks spies that can scout enemy villages and gather valuable information.",
        hint: "Click the Stable building and upgrade it to level 2",
        rewards: { wood: 4000, stone: 4000, crop: 2000 },
        condition: {
            type: QuestCompletionType.BUILDING_LEVEL,
            buildingName: 'stable',
            level: 2,
        }
    },
    {
        id: 17,
        title: "Unlock the Academy",
        description: "Upgrade your Academy to level 2. The Academy grants Skill Points you can invest in powerful bonuses for your village and army.",
        hint: "Click the Academy building and upgrade it to level 2",
        rewards: { wood: 5000, stone: 5000, crop: 5000 },
        condition: {
            type: QuestCompletionType.BUILDING_LEVEL,
            buildingName: 'academy',
            level: 2,
        }
    },
    {
        id: 15,
        title: "Join the Community",
        description: "Join or create a clan! Team up with other players for raids, support, and glory! You'll need to upgrade your Embassy to level 3 first.",
        hint: "Upgrade Embassy to level 3, then join or create a clan",
        rewards: { wood: 5000, stone: 5000, crop: 5000 },
        condition: { 
            type: QuestCompletionType.JOIN_CLAN
        }
    }
];

/**
 * Get a quest by ID
 */
export function getQuestById(id: number): Quest | undefined {
    return QUESTS.find(q => q.id === id);
}

/**
 * Get the quest at a specific index (1-based, matches currentQuestIndex)
 */
export function getQuestByIndex(index: number): Quest | undefined {
    if (index < 1 || index > QUESTS.length) return undefined;
    return QUESTS[index - 1];
}

/**
 * Total number of quests
 */
export const TOTAL_QUESTS = QUESTS.length;
