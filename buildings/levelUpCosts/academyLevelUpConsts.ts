import { MaterialsCost } from "../../materialsCost";

// Academy costs: primarily stone, similar wood, less crop
const academyLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const academyLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const academyLevel2MaterialsCost: MaterialsCost = {wood: 1500, crop: 800, stones: 2000};
const academyLevel3MaterialsCost: MaterialsCost = {wood: 4000, crop: 2000, stones: 5000}; // Level 3 unlocks trait selection
const academyLevel4MaterialsCost: MaterialsCost = {wood: 10000, crop: 5000, stones: 12500};
const academyLevel5MaterialsCost: MaterialsCost = {wood: 25000, crop: 12500, stones: 31250};
const academyLevel6MaterialsCost: MaterialsCost = {wood: 62500, crop: 31250, stones: 78125};
const academyLevel7MaterialsCost: MaterialsCost = {wood: 156250, crop: 78125, stones: 195312};
const academyLevel8MaterialsCost: MaterialsCost = {wood: 390625, crop: 195312, stones: 488281};
const academyLevel9MaterialsCost: MaterialsCost = {wood: 976562, crop: 488281, stones: 1220703};
const academyLevel10MaterialsCost: MaterialsCost = {wood: 2441406, crop: 1220703, stones: 3051757};

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
