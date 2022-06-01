import { MaterialsCost } from "../../materialsCost";

const arsenalLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const arsenalLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const arsenalLevel2MaterialsCost: MaterialsCost = {wood: 2500, crop: 1750, stones: 3250}; // 65% stones 35% crop 50% wood of total storage
const arsenalLevel3MaterialsCost: MaterialsCost = {wood: 6250, crop: 4375, stones: 8125};
const arsenalLevel4MaterialsCost: MaterialsCost = {wood: 15000, crop: 10500, stones: 19500};
const arsenalLevel5MaterialsCost: MaterialsCost = {wood: 37500, crop: 26250, stones: 48750};
const arsenalLevel6MaterialsCost: MaterialsCost = {wood: 93750, crop: 65625, stones: 121875};
const arsenalLevel7MaterialsCost: MaterialsCost = {wood: 237500, crop: 166250, stones: 308750};
const arsenalLevel8MaterialsCost: MaterialsCost = {wood: 625000, crop: 437500, stones: 812500};
const arsenalLevel9MaterialsCost: MaterialsCost = {wood: 1500000, crop: 1050000, stones: 1950000};
const arsenalLevel10MaterialsCost: MaterialsCost = {wood: 5000000, crop: 3500000, stones: 6500000};

export const arsenalUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ arsenalLevel0MaterialsCost,
    arsenalLevel1MaterialsCost,
    arsenalLevel2MaterialsCost,
    arsenalLevel3MaterialsCost,
    arsenalLevel4MaterialsCost,
    arsenalLevel5MaterialsCost,
    arsenalLevel6MaterialsCost,
    arsenalLevel7MaterialsCost,
    arsenalLevel8MaterialsCost,
    arsenalLevel9MaterialsCost,
    arsenalLevel10MaterialsCost
];


