import { MaterialsCost } from "../../materialsCost";

const stableLevel0MaterialsCost: MaterialsCost = { wood: 0, crop: 0, stones: 0 };
const stableLevel1MaterialsCost: MaterialsCost = { wood: 0, crop: 0, stones: 0 };

// Primarily wood, medium stone, low crop (totals mirror Arsenal pattern)
const stableLevel2MaterialsCost: MaterialsCost = { wood: 3750, crop: 1500, stones: 2250 };
const stableLevel3MaterialsCost: MaterialsCost = { wood: 9375, crop: 3750, stones: 5625 };
const stableLevel4MaterialsCost: MaterialsCost = { wood: 22500, crop: 9000, stones: 13500 };
const stableLevel5MaterialsCost: MaterialsCost = { wood: 56250, crop: 22500, stones: 33750 };
const stableLevel6MaterialsCost: MaterialsCost = { wood: 140625, crop: 56250, stones: 84375 };
const stableLevel7MaterialsCost: MaterialsCost = { wood: 356250, crop: 142500, stones: 213750 };
const stableLevel8MaterialsCost: MaterialsCost = { wood: 937500, crop: 375000, stones: 562500 };
const stableLevel9MaterialsCost: MaterialsCost = { wood: 2250000, crop: 900000, stones: 1350000 };
const stableLevel10MaterialsCost: MaterialsCost = { wood: 7500000, crop: 3000000, stones: 4500000 };

export const stableUpgradeMaterialCostByLevels: Array<MaterialsCost> = [
    stableLevel0MaterialsCost,
    stableLevel1MaterialsCost,
    stableLevel2MaterialsCost,
    stableLevel3MaterialsCost,
    stableLevel4MaterialsCost,
    stableLevel5MaterialsCost,
    stableLevel6MaterialsCost,
    stableLevel7MaterialsCost,
    stableLevel8MaterialsCost,
    stableLevel9MaterialsCost,
    stableLevel10MaterialsCost,
];

