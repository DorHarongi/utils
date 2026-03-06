import { MaterialsCost } from "../materialsCost";

export const spearFighterAttackingStat: number = 4;
export const spearFighterDefenceStat: number = 2;
export const spearFighterMinimumArsenalLevel: number = 1;
export const spearFighterMaterialsCost: MaterialsCost = {
  wood: 250,
  stones: 250,
  crop: 500,
};

export const swordFighterAttackingStat: number = 2;
export const swordFighterDefenceStat: number = 4;
export const swordFighterMinimumArsenalLevel: number = 1;
export const swordFighterMaterialsCost: MaterialsCost = {
  wood: 250,
  stones: 250,
  crop: 500,
};

export const axeFighterAttackingStat: number = 13;
export const axeFighterDefenceStat: number = 5;
export const axeFighterMinimumArsenalLevel: number = 2;
export const axeFighterMaterialsCost: MaterialsCost = {
  wood: 750,
  stones: 750,
  crop: 1500,
};

export const archerAttackingStat: number = 15;
export const archerDefenceStat: number = 15;
export const archerMinimumArsenalLevel: number = 4;
export const archerMaterialsCost: MaterialsCost = {
  wood: 1500,
  stones: 1500,
  crop: 2000,
};

export const magicianAttackingStat: number = 25;
export const magicianDefenceStat: number = 40;
export const magicianMinimumArsenalLevel: number = 5;
export const magicianMaterialsCost: MaterialsCost = {
  wood: 3500,
  stones: 3500,
  crop: 5000,
};

export const horsemenAttackingStat: number = 50;
export const horsemenDefenceStat: number = 30;
export const horsemenMinimumArsenalLevel: number = 6;
export const horsemenMaterialsCost: MaterialsCost = {
  wood: 10000,
  stones: 10000,
  crop: 10000,
};

export const catapultsAttackingStat: number = 200;
export const catapultsDefenceStat: number = 5;
export const catapultsMinimumArsenalLevel: number = 8;
export const catapultsMaterialsCost: MaterialsCost = {
  wood: 25000,
  stones: 25000,
  crop: 25000,
};

export const spearFighterMovementSpeed: number = 7;
export const swordFighterMovementSpeed: number = 7;
export const axeFighterMovementSpeed: number = 3;
export const archerMovementSpeed: number = 8;
export const magicianMovementSpeed: number = 5;
export const horsemenMovementSpeed: number = 20;
export const catapultsMovementSpeed: number = 1;

export const SPY_SPEED: number = 20;

export const lootingAbilityOfTroops: number = 175;

export const troopUnlockByLevel: { [level: number]: string } = {
  [axeFighterMinimumArsenalLevel]: "Axe Fighter",
  [archerMinimumArsenalLevel]: "Archer",
  [magicianMinimumArsenalLevel]: "Magician",
  [horsemenMinimumArsenalLevel]: "Horsemen",
  [catapultsMinimumArsenalLevel]: "Catapults",
};
