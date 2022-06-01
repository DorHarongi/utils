import { MaterialsCost } from "../../materialsCost";
import { arsenalUpgradeMaterialCostByLevels } from "./arsenalLevelUpConsts";
import { centerBuildingUpgradeMaterialCostByLevels } from "./centerBuildingLevelUpConsts";
import { cropFarmUpgradeMaterialCostByLevels } from "./cropFarmLevelUpConsts";
import { cropWarehouseUpgradeMaterialCostByLevels } from "./cropWarehouseLevelUpConsts";
import { embassyUpgradeMaterialCostByLevels } from "./embassyLevelUpConsts";
import { quartersUpgradeMaterialCostByLevels } from "./quartersLevelUpConsts";
import { stoneMineUpgradeMaterialCostByLevels } from "./stoneMineLevelUpConsts";
import { stoneWarehouseUpgradeMaterialCostByLevels } from "./stoneWarehouseLevelUpConsts";
import { wallUpgradeMaterialCostByLevels } from "./wallLevelUpConsts";
import { woodFactoryUpgradeMaterialCostByLevels } from "./woodFactoryLevelUpConsts";
import { woodWarehouseUpgradeMaterialCostByLevels } from "./woodWarehouseLevelUpConsts";

export const buildingLevelUpMaterialCostsByName: {[name: string] : Array<MaterialsCost>; } = {
    ["arsenal"]: arsenalUpgradeMaterialCostByLevels,
    ["centerBuilding"]: centerBuildingUpgradeMaterialCostByLevels,
    ["cropFarm"]: cropFarmUpgradeMaterialCostByLevels,
    ["cropWarehouse"]: cropWarehouseUpgradeMaterialCostByLevels,
    ["embassy"]: embassyUpgradeMaterialCostByLevels,
    ["quarters"]: quartersUpgradeMaterialCostByLevels,
    ["stoneMine"]: stoneMineUpgradeMaterialCostByLevels,
    ["stoneWarehouse"]: stoneWarehouseUpgradeMaterialCostByLevels,
    ["wall"]: wallUpgradeMaterialCostByLevels,
    ["woodFactory"]: woodFactoryUpgradeMaterialCostByLevels,
    ["woodWarehouse"]: woodWarehouseUpgradeMaterialCostByLevels,
};