import { MaterialsCost } from "../materialsCost";

export const spearFighterAttackingStat: number = 4;
export const spearFighterDefenceStat: number = 2;
export const spearFighterMinimumArsenalLevel: number = 1;
export const spearFighterMaterialsCost: MaterialsCost = {wood: 100, stones: 100, crop: 500 };

export const swordFighterAttackingStat: number = 2;
export const swordFighterDefenceStat: number = 4;
export const swordFighterMinimumArsenalLevel: number = 1;
export const swordFighterMaterialsCost: MaterialsCost = {wood: 100, stones: 100, crop: 500 };


export const axeFighterAttackingStat: number = 7;
export const axeFighterDefenceStat: number = 3;
export const axeFighterMinimumArsenalLevel: number = 2;
export const axeFighterMaterialsCost: MaterialsCost = {wood: 1500, stones: 1500, crop: 2000 };

export const archerAttackingStat: number = 20;
export const archerDefenceStat: number = 1;
export const archerMinimumArsenalLevel: number = 4;
export const archerMaterialsCost: MaterialsCost = {wood: 3500, stones: 2500, crop: 5000 };

export const magicianAttackingStat: number = 15;
export const magicianDefenceStat: number = 10;
export const magicianMinimumArsenalLevel: number = 5;
export const magicianMaterialsCost: MaterialsCost = {wood: 5000, stones: 5000, crop: 7500 };

export const horsemenAttackingStat: number = 25;
export const horsemenDefenceStat: number = 15;
export const horsemenMinimumArsenalLevel: number = 6;
export const horsemenMaterialsCost: MaterialsCost = {wood: 15000, stones: 15000, crop: 15000 };

export const catapultsAttackingStat: number = 150;
export const catapultsDefenceStat: number = 1;
export const catapultsMinimumArsenalLevel: number = 8;
export const catapultsMaterialsCost: MaterialsCost = {wood: 35000, stones: 35000, crop: 25000 };

export const lootingAbilityOfTroops: number = 175;

export const troopUnlockByLevel: {[level: number] : string; } = {
    [axeFighterMinimumArsenalLevel]: "Axe Fighter",
    [archerMinimumArsenalLevel]: "Archer",
    [magicianMinimumArsenalLevel]: "Magician",
    [horsemenMinimumArsenalLevel]: "Horsemen",
    [catapultsMinimumArsenalLevel]: "Catapults"
};