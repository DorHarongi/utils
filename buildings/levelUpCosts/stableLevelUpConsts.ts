import { MaterialsCost } from "../../materialsCost";

// Stable: wood (structure), crop (horses), less stone. Totals match quarters/arsenal.
const stableLevel0MaterialsCost: MaterialsCost = { wood: 0, crop: 0, stones: 0 };
const stableLevel1MaterialsCost: MaterialsCost = { wood: 0, crop: 0, stones: 0 };
const stableLevel2MaterialsCost: MaterialsCost = { wood: 3000, crop: 2600, stones: 1900 };
const stableLevel3MaterialsCost: MaterialsCost = { wood: 7500, crop: 6600, stones: 4650 };
const stableLevel4MaterialsCost: MaterialsCost = { wood: 18000, crop: 16000, stones: 11000 };
const stableLevel5MaterialsCost: MaterialsCost = { wood: 45000, crop: 39500, stones: 28000 };
const stableLevel6MaterialsCost: MaterialsCost = { wood: 112500, crop: 98500, stones: 70250 };
const stableLevel7MaterialsCost: MaterialsCost = { wood: 285000, crop: 249500, stones: 178000 };
const stableLevel8MaterialsCost: MaterialsCost = { wood: 750000, crop: 656000, stones: 469000 };
const stableLevel9MaterialsCost: MaterialsCost = { wood: 1800000, crop: 1575000, stones: 1125000 };
const stableLevel10MaterialsCost: MaterialsCost = { wood: 6000000, crop: 5250000, stones: 3750000 };

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
