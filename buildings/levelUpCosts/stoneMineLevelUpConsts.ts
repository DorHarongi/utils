import { MaterialsCost } from "../../materialsCost";

const stoneMineLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const stoneMineLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const stoneMineLevel2MaterialsCost: MaterialsCost = {wood: 3250, crop: 1000, stones: 3250}; // 80% wood 20% crop 50% stones of total storage
const stoneMineLevel3MaterialsCost: MaterialsCost = {wood: 8125, crop: 2500, stones: 8125}; 
const stoneMineLevel4MaterialsCost: MaterialsCost = {wood: 19500, crop: 6000, stones: 19500};
const stoneMineLevel5MaterialsCost: MaterialsCost = {wood: 48750, crop: 15000, stones: 48750};
const stoneMineLevel6MaterialsCost: MaterialsCost = {wood: 121875, crop: 37500, stones: 121875};
const stoneMineLevel7MaterialsCost: MaterialsCost = {wood: 308750, crop: 95000, stones: 308750};
const stoneMineLevel8MaterialsCost: MaterialsCost = {wood: 812500, crop: 250000, stones: 812500};
const stoneMineLevel9MaterialsCost: MaterialsCost = {wood: 1950000, crop: 600000, stones: 1950000};
const stoneMineLevel10MaterialsCost: MaterialsCost = {wood: 6500000, crop: 2000000, stones: 6500000};

export const stoneMineUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ stoneMineLevel10MaterialsCost,
    stoneMineLevel10MaterialsCost,
    stoneMineLevel2MaterialsCost,
    stoneMineLevel3MaterialsCost,
    stoneMineLevel4MaterialsCost,
    stoneMineLevel5MaterialsCost,
    stoneMineLevel6MaterialsCost,
    stoneMineLevel7MaterialsCost,
    stoneMineLevel8MaterialsCost,
    stoneMineLevel9MaterialsCost,
    stoneMineLevel10MaterialsCost
];
