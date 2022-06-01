import { MaterialsCost } from "../../materialsCost";

const centerBuildingLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const centerBuildingLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const centerBuildingLevel2MaterialsCost: MaterialsCost = {wood: 5000, crop: 5000, stones: 5000};
const centerBuildingLevel3MaterialsCost: MaterialsCost = {wood: 12500, crop: 12500, stones: 12500};
const centerBuildingLevel4MaterialsCost: MaterialsCost = {wood: 30000, crop: 30000, stones: 30000};
const centerBuildingLevel5MaterialsCost: MaterialsCost = {wood: 75000, crop: 75000, stones: 75000};
const centerBuildingLevel6MaterialsCost: MaterialsCost = {wood: 187500, crop: 187500, stones: 187500};
const centerBuildingLevel7MaterialsCost: MaterialsCost = {wood: 475000, crop: 475000, stones: 475000};
const centerBuildingLevel8MaterialsCost: MaterialsCost = {wood: 1250000, crop: 1250000, stones: 1250000};
const centerBuildingLevel9MaterialsCost: MaterialsCost = {wood: 3000000, crop: 3000000, stones: 3000000};
const centerBuildingLevel10MaterialsCost: MaterialsCost = {wood: 10000000, crop: 10000000, stones: 10000000};

export const centerBuildingUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ centerBuildingLevel0MaterialsCost,
    centerBuildingLevel1MaterialsCost,
    centerBuildingLevel2MaterialsCost,
    centerBuildingLevel3MaterialsCost,
    centerBuildingLevel4MaterialsCost,
    centerBuildingLevel5MaterialsCost,
    centerBuildingLevel6MaterialsCost,
    centerBuildingLevel7MaterialsCost,
    centerBuildingLevel8MaterialsCost,
    centerBuildingLevel9MaterialsCost,
    centerBuildingLevel10MaterialsCost
];


