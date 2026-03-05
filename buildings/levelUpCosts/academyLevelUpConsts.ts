import { MaterialsCost } from "../../materialsCost";

// Academy: mainly wood and stone (building materials), less crop. Totals match quarters/arsenal.
const academyLevel0MaterialsCost: MaterialsCost = { wood: 0, crop: 0, stones: 0 };
const academyLevel1MaterialsCost: MaterialsCost = { wood: 0, crop: 0, stones: 0 };
const academyLevel2MaterialsCost: MaterialsCost = { wood: 3400, crop: 1100, stones: 3000 };
const academyLevel3MaterialsCost: MaterialsCost = { wood: 8400, crop: 2850, stones: 7500 };
const academyLevel4MaterialsCost: MaterialsCost = { wood: 20000, crop: 7000, stones: 18000 };
const academyLevel5MaterialsCost: MaterialsCost = { wood: 50000, crop: 17500, stones: 45000 };
const academyLevel6MaterialsCost: MaterialsCost = { wood: 126500, crop: 42250, stones: 112500 };
const academyLevel7MaterialsCost: MaterialsCost = { wood: 320000, crop: 107500, stones: 285000 };
const academyLevel8MaterialsCost: MaterialsCost = { wood: 844000, crop: 281000, stones: 750000 };
const academyLevel9MaterialsCost: MaterialsCost = { wood: 2025000, crop: 675000, stones: 1800000 };
const academyLevel10MaterialsCost: MaterialsCost = { wood: 6750000, crop: 2250000, stones: 6000000 };

export const academyUpgradeMaterialCostByLevels: Array<MaterialsCost> = [
    academyLevel0MaterialsCost,
    academyLevel1MaterialsCost,
    academyLevel2MaterialsCost,
    academyLevel3MaterialsCost,
    academyLevel4MaterialsCost,
    academyLevel5MaterialsCost,
    academyLevel6MaterialsCost,
    academyLevel7MaterialsCost,
    academyLevel8MaterialsCost,
    academyLevel9MaterialsCost,
    academyLevel10MaterialsCost
];
