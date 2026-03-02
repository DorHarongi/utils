import { MaterialsCost } from "../materialsCost";

const LOW_RESET_COST: MaterialsCost = { wood: 5000, stones: 5000, crop: 5000 };
const MEDIUM_RESET_COST: MaterialsCost = { wood: 50000, stones: 50000, crop: 50000 };
const HIGH_RESET_COST: MaterialsCost = { wood: 250000, stones: 250000, crop: 250000 };

export const getResetCost = (skillPointsUsed: number): MaterialsCost => {
    if (skillPointsUsed <= 0) {
        return { wood: 0, stones: 0, crop: 0 };
    }
    if (skillPointsUsed <= 6) {
        return LOW_RESET_COST;
    }
    if (skillPointsUsed <= 12) {
        return MEDIUM_RESET_COST;
    }
    return HIGH_RESET_COST;
};

