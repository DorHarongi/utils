import { MaterialsCost } from "../../materialsCost";

const stoneWarehouseLevel0MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const stoneWarehouseLevel1MaterialsCost: MaterialsCost = {stones: 0, crop: 0, wood: 0};
const stoneWarehouseLevel2MaterialsCost: MaterialsCost = {stones: 3500, crop: 1500, wood: 2500}; // 70% stones 30% crop 50% wood of total storage
const stoneWarehouseLevel3MaterialsCost: MaterialsCost = {stones: 8750, crop: 3750, wood: 6250}; 
const stoneWarehouseLevel4MaterialsCost: MaterialsCost = {stones: 21000, crop: 9000, wood: 15000};
const stoneWarehouseLevel5MaterialsCost: MaterialsCost = {stones: 52500, crop: 22500, wood: 37500};
const stoneWarehouseLevel6MaterialsCost: MaterialsCost = {stones: 131250, crop: 56250, wood: 93750};
const stoneWarehouseLevel7MaterialsCost: MaterialsCost = {stones: 332500, crop: 142500, wood: 237500};
const stoneWarehouseLevel8MaterialsCost: MaterialsCost = {stones: 875000, crop: 375000, wood: 625000};
const stoneWarehouseLevel9MaterialsCost: MaterialsCost = {stones: 2100000, crop: 900000, wood: 1500000};
const stoneWarehouseLevel10MaterialsCost: MaterialsCost = {stones: 7000000, crop: 3000000, wood: 5000000};

export const stoneWarehouseUpgradeMaterialCostByLevels: Array<MaterialsCost> = [ stoneWarehouseLevel0MaterialsCost,
    stoneWarehouseLevel1MaterialsCost,
    stoneWarehouseLevel2MaterialsCost,
    stoneWarehouseLevel3MaterialsCost,
    stoneWarehouseLevel4MaterialsCost,
    stoneWarehouseLevel5MaterialsCost,
    stoneWarehouseLevel6MaterialsCost,
    stoneWarehouseLevel7MaterialsCost,
    stoneWarehouseLevel8MaterialsCost,
    stoneWarehouseLevel9MaterialsCost,
    stoneWarehouseLevel10MaterialsCost
];