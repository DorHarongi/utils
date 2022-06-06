import { MaterialsCost } from "../../materialsCost";

const woodWarehouseLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const woodWarehouseLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const woodWarehouseLevel2MaterialsCost: MaterialsCost = {wood: 3500, crop: 1500, stones: 2500}; // 70% wood 30% crop 50% stones of total storage
const woodWarehouseLevel3MaterialsCost: MaterialsCost = {wood: 8750, crop: 3750, stones: 6250}; 
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

// const woodWarehouseLevel0MinimumCenterBuildingLevel: MaterialsCost = 0;
// const woodWarehouseLevel1MaterialsCost: MaterialsCost = 0;
// const woodWarehouseLevel2MaterialsCost: MaterialsCost = {wood: 3500, crop: 1500, stones: 2500}; // 70% wood 30% crop 50% stones of total storage
// const woodWarehouseLevel3MaterialsCost: MaterialsCost = {wood: 8750, crop: 3750, stones: 6250}; 
// const woodWarehouseLevel4MaterialsCost: MaterialsCost = {wood: 21000, crop: 9000, stones: 15000};
// const woodWarehouseLevel5MaterialsCost: MaterialsCost = {wood: 52500, crop: 22500, stones: 37500};
// const woodWarehouseLevel6MaterialsCost: MaterialsCost = {wood: 131250, crop: 56250, stones: 93750};
// const woodWarehouseLevel7MaterialsCost: MaterialsCost = {wood: 332500, crop: 142500, stones: 237500};
// const woodWarehouseLevel8MaterialsCost: MaterialsCost = {wood: 875000, crop: 375000, stones: 625000};
// const woodWarehouseLevel9MaterialsCost: MaterialsCost = {wood: 2100000, crop: 900000, stones: 1500000};
// const woodWarehouseLevel10MaterialsCost: MaterialsCost = {wood: 7000000, crop: 3000000, stones: 5000000};
