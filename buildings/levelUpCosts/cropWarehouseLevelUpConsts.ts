import { MaterialsCost } from "../../materialsCost";

const cropWarehouseLevel0MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const cropWarehouseLevel1MaterialsCost: MaterialsCost = {wood: 0, crop: 0, stones: 0};
const cropWarehouseLevel2MaterialsCost: MaterialsCost = {wood: 2500, crop: 2500, stones: 2500}; // 50% stones 50% crop 50% wood of total storage
const cropWarehouseLevel3MaterialsCost: MaterialsCost = {wood: 6250, crop: 6250, stones: 6250}; 
const cropWarehouseLevel4MaterialsCost: MaterialsCost = {wood: 15000, crop: 15000, stones: 15000};
const cropWarehouseLevel5MaterialsCost: MaterialsCost = {wood: 37500, crop: 37500, stones: 37500};
const cropWarehouseLevel6MaterialsCost: MaterialsCost = {wood: 93750, crop: 93750, stones: 93750};
const cropWarehouseLevel7MaterialsCost: MaterialsCost = {wood: 237500, crop: 237500, stones: 237500};
const cropWarehouseLevel8MaterialsCost: MaterialsCost = {wood: 625000, crop: 625000, stones: 625000};
const cropWarehouseLevel9MaterialsCost: MaterialsCost = {wood: 1500000, crop: 1500000, stones: 1500000};
const cropWarehouseLevel10MaterialsCost: MaterialsCost = {wood: 5000000, crop: 5000000, stones: 5000000};

export const cropWarehouseUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ cropWarehouseLevel0MaterialsCost,
    cropWarehouseLevel1MaterialsCost,
    cropWarehouseLevel2MaterialsCost,
    cropWarehouseLevel3MaterialsCost,
    cropWarehouseLevel4MaterialsCost,
    cropWarehouseLevel5MaterialsCost,
    cropWarehouseLevel6MaterialsCost,
    cropWarehouseLevel7MaterialsCost,
    cropWarehouseLevel8MaterialsCost,
    cropWarehouseLevel9MaterialsCost,
    cropWarehouseLevel10MaterialsCost
];
