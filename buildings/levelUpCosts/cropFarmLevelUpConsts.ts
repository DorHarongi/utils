import { MaterialsCost } from "../../materialsCost";

const cropFarmLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const cropFarmLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const cropFarmLevel2MaterialsCost: MaterialsCost = {wood: 3000, crop: 2250, stones: 2250}; // 60% wood 45% crop 45% stones of total storage
const cropFarmLevel3MaterialsCost: MaterialsCost = {wood: 7500, crop: 5625, stones: 5625}; 
const cropFarmLevel4MaterialsCost: MaterialsCost = {wood: 18000, crop: 13500, stones: 13500};
const cropFarmLevel5MaterialsCost: MaterialsCost = {wood: 45000, crop: 33750, stones: 33750};
const cropFarmLevel6MaterialsCost: MaterialsCost = {wood: 112500, crop: 84375, stones: 84375};
const cropFarmLevel7MaterialsCost: MaterialsCost = {wood: 285000, crop: 213750, stones: 213750};
const cropFarmLevel8MaterialsCost: MaterialsCost = {wood: 750000, crop: 562500, stones: 562500};
const cropFarmLevel9MaterialsCost: MaterialsCost = {wood: 1800000, crop: 1350000, stones: 1350000};
const cropFarmLevel10MaterialsCost: MaterialsCost = {wood: 6000000, crop: 4500000, stones: 4500000};

export const cropFarmUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ cropFarmLevel0MaterialsCost,
    cropFarmLevel1MaterialsCost,
    cropFarmLevel2MaterialsCost,
    cropFarmLevel3MaterialsCost,
    cropFarmLevel4MaterialsCost,
    cropFarmLevel5MaterialsCost,
    cropFarmLevel6MaterialsCost,
    cropFarmLevel7MaterialsCost,
    cropFarmLevel8MaterialsCost,
    cropFarmLevel9MaterialsCost,
    cropFarmLevel10MaterialsCost
];
