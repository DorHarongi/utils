import { MaterialsCost } from "../materialsCost";

export enum QuestCompletionType {
    BUILDING_LEVEL = 'BUILDING_LEVEL',
    TRAIN_TROOPS = 'TRAIN_TROOPS',
    HIRE_WORKERS = 'HIRE_WORKERS'
}

export interface QuestReward {
    wood: number;
    stone: number;
    crop: number;
}

export interface QuestCompletionCondition {
    type: QuestCompletionType;
    buildingName?: string;  // For BUILDING_LEVEL
    level?: number;         // For BUILDING_LEVEL
    count?: number;         // For TRAIN_TROOPS / HIRE_WORKERS
}

export interface Quest {
    id: number;
    title: string;
    description: string;
    hint: string;           // Short tip shown in floating widget
    rewards: QuestReward;
    condition: QuestCompletionCondition;
}

export interface QuestCompletionResult {
    completedQuestId: number;
    completedQuestTitle: string;
    rewards: QuestReward;
    nextQuest: Quest | null;
}

// Action types that can trigger quest completion
export interface QuestAction {
    type: 'UPGRADE_BUILDING' | 'TRAIN_TROOPS' | 'HIRE_WORKERS';
    buildingName?: string;
    newLevel?: number;
    totalTroops?: number;
    totalWorkers?: number;
}
