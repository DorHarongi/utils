import { MaterialsCost } from "../../materialsCost";

const embassyLevel0MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const embassyLevel1MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const embassyLevel2MaterialsCost: MaterialsCost = {stones: 3750, crop: 750, wood: 3000}; // 75% stones 15% crop 60% wood of total storage
const embassyLevel3MaterialsCost: MaterialsCost = {stones: 9375, crop: 1875, wood: 7500}; 
const embassyLevel4MaterialsCost: MaterialsCost = {stones: 22500, crop: 4500, wood: 18000};
const embassyLevel5MaterialsCost: MaterialsCost = {stones: 56250, crop: 11250, wood: 45000};
const embassyLevel6MaterialsCost: MaterialsCost = {stones: 140625, crop: 28125, wood: 112500};
const embassyLevel7MaterialsCost: MaterialsCost = {stones: 356250, crop: 71250, wood: 285000};
const embassyLevel8MaterialsCost: MaterialsCost = {stones: 937500, crop: 187500, wood: 750000};
const embassyLevel9MaterialsCost: MaterialsCost = {stones: 2250000, crop: 450000, wood: 1800000};
const embassyLevel10MaterialsCost: MaterialsCost = {stones: 7500000, crop: 1500000, wood: 6000000};

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