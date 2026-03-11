import { prettifyNumber } from "../numberUtils";

export const warehouseStorageByLevel = [0, 5000, 12500, 30000, 75000, 187500, 475000, 1250000, 3000000, 10000000, 25000000];

const BASE_WAREHOUSE_CAPACITY = 5000;

export function getQuestRewardMultiplier(lowestWarehouseCapacity: number): number {
    if (lowestWarehouseCapacity <= BASE_WAREHOUSE_CAPACITY) return 1;
    return Math.pow(lowestWarehouseCapacity / BASE_WAREHOUSE_CAPACITY, 0.45);
}

export function scaleQuestReward(
    baseReward: { wood: number; stone: number; crop: number },
    lowestWarehouseCapacity: number,
): { wood: number; stone: number; crop: number } {
    const multiplier = getQuestRewardMultiplier(lowestWarehouseCapacity);
    return {
        wood: prettifyNumber(Math.floor(baseReward.wood * multiplier)),
        stone: prettifyNumber(Math.floor(baseReward.stone * multiplier)),
        crop: prettifyNumber(Math.floor(baseReward.crop * multiplier)),
    };
}