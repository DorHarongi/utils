import { MaterialsCost } from "../materialsCost";

// center building
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

// wood warehouse

const woodWarehouseLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const woodWarehouseLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const woodWarehouseLevel2MaterialsCost: MaterialsCost = {wood: 3500, crop: 1500, stones: 2500};
const woodWarehouseLevel3MaterialsCost: MaterialsCost = {wood: 8750, crop: 3750, stones: 12500}; // 0.7 0.3 0.5
const woodWarehouseLevel4MaterialsCost: MaterialsCost = {wood: 21000, crop: 9000, stones: 15000};
const woodWarehouseLevel5MaterialsCost: MaterialsCost = {wood: 52500, crop: 22500, stones: 37500};
const woodWarehouseLevel6MaterialsCost: MaterialsCost = {wood: 131250, crop: 56250, stones: 93750};
const woodWarehouseLevel7MaterialsCost: MaterialsCost = {wood: 332500, crop: 142500, stones: 237500};
const woodWarehouseLevel8MaterialsCost: MaterialsCost = {wood: 875000, crop: 375000, stones: 625000};
const woodWarehouseLevel9MaterialsCost: MaterialsCost = {wood: 2100000, crop: 900000, stones: 1500000};
const woodWarehouseLevel10MaterialsCost: MaterialsCost = {wood: 7000000, crop: 3000000, stones: 5000000};

export const woodWarehouseUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ woodWarehouseLevel0MaterialsCost,
    woodWarehouseLevel1MaterialsCost,
    woodWarehouseLevel2MaterialsCost,
    woodWarehouseLevel3MaterialsCost,
    woodWarehouseLevel4MaterialsCost,
    woodWarehouseLevel5MaterialsCost,
    woodWarehouseLevel6MaterialsCost,
    woodWarehouseLevel7MaterialsCost,
    woodWarehouseLevel8MaterialsCost,
    woodWarehouseLevel9MaterialsCost,
    woodWarehouseLevel10MaterialsCost
];
