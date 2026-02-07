import { MaterialsCost } from "../materialsCost";

export const spearFighterAttackingStat: number = 4;
export const spearFighterDefenceStat: number = 2;
export const spearFighterMinimumArsenalLevel: number = 1;
export const spearFighterMaterialsCost: MaterialsCost = {wood: 100, stones: 100, crop: 500 };

export const swordFighterAttackingStat: number = 2;
export const swordFighterDefenceStat: number = 4;
export const swordFighterMinimumArsenalLevel: number = 1;
export const swordFighterMaterialsCost: MaterialsCost = {wood: 100, stones: 100, crop: 500 };


export const axeFighterAttackingStat: number = 10;
export const axeFighterDefenceStat: number = 3;
export const axeFighterMinimumArsenalLevel: number = 2;
export const axeFighterMaterialsCost: MaterialsCost = {wood: 750, stones: 750, crop: 1500 };

export const archerAttackingStat: number = 25;
export const archerDefenceStat: number = 2;
export const archerMinimumArsenalLevel: number = 4;
export const archerMaterialsCost: MaterialsCost = {wood: 3000, stones: 2000, crop: 3000 };

export const magicianAttackingStat: number = 20;
export const magicianDefenceStat: number = 15;
export const magicianMinimumArsenalLevel: number = 5;
export const magicianMaterialsCost: MaterialsCost = {wood: 4000, stones: 4000, crop: 3250 };

export const horsemenAttackingStat: number = 35;
export const horsemenDefenceStat: number = 25;
export const horsemenMinimumArsenalLevel: number = 6;
export const horsemenMaterialsCost: MaterialsCost = {wood: 9000, stones: 9000, crop: 9000 };

export const catapultsAttackingStat: number = 200;
export const catapultsDefenceStat: number = 1;
export const catapultsMinimumArsenalLevel: number = 8;
export const catapultsMaterialsCost: MaterialsCost = {wood: 25000, stones: 25000, crop: 25000 };

export const lootingAbilityOfTroops: number = 175;

export const troopUnlockByLevel: {[level: number] : string; } = {
    [axeFighterMinimumArsenalLevel]: "Axe Fighter",
    [archerMinimumArsenalLevel]: "Archer",
    [magicianMinimumArsenalLevel]: "Magician",
    [horsemenMinimumArsenalLevel]: "Horsemen",
    [catapultsMinimumArsenalLevel]: "Catapults"
};