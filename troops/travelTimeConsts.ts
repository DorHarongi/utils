import {
    archerMovementSpeed,
    axeFighterMovementSpeed,
    catapultsMovementSpeed,
    horsemenMovementSpeed,
    magicianMovementSpeed,
    spearFighterMovementSpeed,
    swordFighterMovementSpeed,
} from './troopsConsts';

export interface TroopsAmountsLike {
    spearFighters: number;
    swordFighters: number;
    axeFighters: number;
    archers: number;
    magicians: number;
    horsemen: number;
    catapults: number;
}

export const MERCHANT_SPEED = 5;

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
};

export const getArmySpeed = (troops: TroopsAmountsLike): number => {
    const speeds: number[] = [];

    if (troops.spearFighters > 0) {
        speeds.push(spearFighterMovementSpeed);
    }
    if (troops.swordFighters > 0) {
        speeds.push(swordFighterMovementSpeed);
    }
    if (troops.axeFighters > 0) {
        speeds.push(axeFighterMovementSpeed);
    }
    if (troops.archers > 0) {
        speeds.push(archerMovementSpeed);
    }
    if (troops.magicians > 0) {
        speeds.push(magicianMovementSpeed);
    }
    if (troops.horsemen > 0) {
        speeds.push(horsemenMovementSpeed);
    }
    if (troops.catapults > 0) {
        speeds.push(catapultsMovementSpeed);
    }

    if (speeds.length === 0) {
        return 0;
    }

    return Math.min(...speeds);
};

export const calculateTravelTimeMs = (
    distance: number,
    armySpeed: number,
    quickStepBonus: number,
): number => {
    if (armySpeed <= 0 || distance <= 0) {
        return 0;
    }

    const speedWithBonus = armySpeed * (1 + quickStepBonus);
    if (speedWithBonus <= 0) {
        return 0;
    }

    const travelTimeMinutes = distance / speedWithBonus;
    return Math.round(travelTimeMinutes * 60 * 1000);
};

