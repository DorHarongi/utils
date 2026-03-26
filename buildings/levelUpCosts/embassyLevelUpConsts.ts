import { MaterialsCost } from "../../materialsCost";

const embassyLevel0MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const embassyLevel1MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const embassyLevel2MaterialsCost: MaterialsCost = {stones: 3500, crop: 1000, wood: 3000}; // 70% stones 20% crop 60% wood of total storage
const embassyLevel3MaterialsCost: MaterialsCost = {stones: 8750, crop: 2500, wood: 7500};
const embassyLevel4MaterialsCost: MaterialsCost = {stones: 21000, crop: 6000, wood: 18000};
const embassyLevel5MaterialsCost: MaterialsCost = {stones: 52500, crop: 15000, wood: 45000};
const embassyLevel6MaterialsCost: MaterialsCost = {stones: 131250, crop: 37500, wood: 112500};
const embassyLevel7MaterialsCost: MaterialsCost = {stones: 332500, crop: 95000, wood: 285000};
const embassyLevel8MaterialsCost: MaterialsCost = {stones: 875000, crop: 250000, wood: 750000};
const embassyLevel9MaterialsCost: MaterialsCost = {stones: 2100000, crop: 600000, wood: 1800000};
const embassyLevel10MaterialsCost: MaterialsCost = {stones: 7000000, crop: 2000000, wood: 6000000};

export const embassyUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ embassyLevel0MaterialsCost,
    embassyLevel1MaterialsCost,
    embassyLevel2MaterialsCost,
    embassyLevel3MaterialsCost,
    embassyLevel4MaterialsCost,
    embassyLevel5MaterialsCost,
    embassyLevel6MaterialsCost,
    embassyLevel7MaterialsCost,
    embassyLevel8MaterialsCost,
    embassyLevel9MaterialsCost,
    embassyLevel10MaterialsCost
];