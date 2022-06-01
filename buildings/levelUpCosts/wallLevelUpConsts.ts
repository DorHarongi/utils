import { MaterialsCost } from "../../materialsCost";

const wallLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const wallLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const wallLevel2MaterialsCost: MaterialsCost = {wood: 2000, crop: 1500, stones: 4000}; // 40% wood 30% crop 80% stones of total storage
const wallLevel3MaterialsCost: MaterialsCost = {wood: 5000, crop: 3750, stones: 10000}; 
const wallLevel4MaterialsCost: MaterialsCost = {wood: 12000, crop: 9000, stones: 24000};
const wallLevel5MaterialsCost: MaterialsCost = {wood: 30000, crop: 22500, stones: 60000};
const wallLevel6MaterialsCost: MaterialsCost = {wood: 74000, crop: 56250, stones: 148000};
const wallLevel7MaterialsCost: MaterialsCost = {wood: 190000, crop: 142500, stones: 380000};
const wallLevel8MaterialsCost: MaterialsCost = {wood: 500000, crop: 375000, stones: 1000000};
const wallLevel9MaterialsCost: MaterialsCost = {wood: 1200000, crop: 900000, stones: 2400000};
const wallLevel10MaterialsCost: MaterialsCost = {wood: 4000000, crop: 3000000, stones: 8000000};

export const wallUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ wallLevel0MaterialsCost,
    wallLevel1MaterialsCost,
    wallLevel2MaterialsCost,
    wallLevel3MaterialsCost,
    wallLevel4MaterialsCost,
    wallLevel5MaterialsCost,
    wallLevel6MaterialsCost,
    wallLevel7MaterialsCost,
    wallLevel8MaterialsCost,
    wallLevel9MaterialsCost,
    wallLevel10MaterialsCost
];
