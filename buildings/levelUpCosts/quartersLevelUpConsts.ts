import { MaterialsCost } from "../../materialsCost";

const quartersLevel0MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const quartersLevel1MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const quartersLevel2MaterialsCost: MaterialsCost = {stones: 2500, crop: 1750, wood: 3250}; // 50% stones 35% crop 65% wood of total storage
const quartersLevel3MaterialsCost: MaterialsCost = {stones: 6250, crop: 4375, wood: 8125};
const quartersLevel4MaterialsCost: MaterialsCost = {stones: 15000, crop: 10500, wood: 19500};
const quartersLevel5MaterialsCost: MaterialsCost = {stones: 37500, crop: 26250, wood: 48750};
const quartersLevel6MaterialsCost: MaterialsCost = {stones: 93750, crop: 65625, wood: 121875};
const quartersLevel7MaterialsCost: MaterialsCost = {stones: 237500, crop: 166250, wood: 308750};
const quartersLevel8MaterialsCost: MaterialsCost = {stones: 625000, crop: 437500, wood: 812500};
const quartersLevel9MaterialsCost: MaterialsCost = {stones: 1500000, crop: 1050000, wood: 1950000};
const quartersLevel10MaterialsCost: MaterialsCost = {stones: 5000000, crop: 3500000, wood: 6500000};

export const quartersUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ quartersLevel0MaterialsCost,
    quartersLevel1MaterialsCost,
    quartersLevel2MaterialsCost,
    quartersLevel3MaterialsCost,
    quartersLevel4MaterialsCost,
    quartersLevel5MaterialsCost,
    quartersLevel6MaterialsCost,
    quartersLevel7MaterialsCost,
    quartersLevel8MaterialsCost,
    quartersLevel9MaterialsCost,
    quartersLevel10MaterialsCost
];


