import { MaterialsCost } from "../materialsCost";

// center building
const centerBuildinglevel2MaterialsCost: MaterialsCost = {wood: 5000, crop: 5000, stones: 5000};
const centerBuildinglevel3MaterialsCost: MaterialsCost = {wood: 12500, crop: 12500, stones: 12500};
const centerBuildinglevel4MaterialsCost: MaterialsCost = {wood: 30000, crop: 30000, stones: 30000};
const centerBuildinglevel5MaterialsCost: MaterialsCost = {wood: 75000, crop: 75000, stones: 75000};
const centerBuildinglevel6MaterialsCost: MaterialsCost = {wood: 187500, crop: 187500, stones: 187500};
const centerBuildinglevel7MaterialsCost: MaterialsCost = {wood: 475000, crop: 475000, stones: 475000};
const centerBuildinglevel8MaterialsCost: MaterialsCost = {wood: 1250000, crop: 1250000, stones: 1250000};
const centerBuildinglevel9MaterialsCost: MaterialsCost = {wood: 3000000, crop: 3000000, stones: 3000000};
const centerBuildinglevel10MaterialsCost: MaterialsCost = {wood: 10000000, crop: 10000000, stones: 10000000};

export const centerBuildingUpgradeMaterialCostByLevels = [ 0, 0,
    centerBuildinglevel2MaterialsCost,
    centerBuildinglevel3MaterialsCost,
    centerBuildinglevel4MaterialsCost,
    centerBuildinglevel5MaterialsCost,
    centerBuildinglevel6MaterialsCost,
    centerBuildinglevel7MaterialsCost,
    centerBuildinglevel8MaterialsCost,
    centerBuildinglevel9MaterialsCost,
    centerBuildinglevel10MaterialsCost
];

// to do finish other buildings