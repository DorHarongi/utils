import { MaterialsCost } from "../../materialsCost";

const woodFactoryLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const woodFactoryLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const woodFactoryLevel2MaterialsCost: MaterialsCost = {wood: 4000, crop: 1000, stones: 2500}; // 80% wood 20% crop 50% stones of total storage
const woodFactoryLevel3MaterialsCost: MaterialsCost = {wood: 10000, crop: 2500, stones: 6250}; 
const woodFactoryLevel4MaterialsCost: MaterialsCost = {wood: 24000, crop: 6000, stones: 15000};
const woodFactoryLevel5MaterialsCost: MaterialsCost = {wood: 60000, crop: 15000, stones: 37500};
const woodFactoryLevel6MaterialsCost: MaterialsCost = {wood: 150000, crop: 37500, stones: 93750};
const woodFactoryLevel7MaterialsCost: MaterialsCost = {wood: 380000, crop: 95000, stones: 237500};
const woodFactoryLevel8MaterialsCost: MaterialsCost = {wood: 1000000, crop: 250000, stones: 625000};
const woodFactoryLevel9MaterialsCost: MaterialsCost = {wood: 2400000, crop: 600000, stones: 1500000};
const woodFactoryLevel10MaterialsCost: MaterialsCost = {wood: 8000000, crop: 2000000, stones: 5000000};

export const woodFactoryUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ woodFactoryLevel0MaterialsCost,
    woodFactoryLevel1MaterialsCost,
    woodFactoryLevel2MaterialsCost,
    woodFactoryLevel3MaterialsCost,
    woodFactoryLevel4MaterialsCost,
    woodFactoryLevel5MaterialsCost,
    woodFactoryLevel6MaterialsCost,
    woodFactoryLevel7MaterialsCost,
    woodFactoryLevel8MaterialsCost,
    woodFactoryLevel9MaterialsCost,
    woodFactoryLevel10MaterialsCost
];
