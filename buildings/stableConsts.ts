export const stableDetectionReductionByLevel: number[] = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export const stableMaxSpiesByLevel: number[] = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

export const SPY_REGEN_TIME_MS: number = 12 * 60 * 60 * 1000;

export const BASE_DETECTION_CHANCE: number = 40;
export const WALL_DETECTION_PER_LEVEL: number = 3;

const clamp = (value: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, value));

export const getDetectionChance = (
    wallLevel: number,
    stableLevel: number,
    silentStealthBonus: number,
    defenderRelicBonus: number = 0,
): number => {
    const wallBonus = Math.max(0, wallLevel) * WALL_DETECTION_PER_LEVEL;
    const stableIndex = clamp(stableLevel, 0, stableDetectionReductionByLevel.length - 1);
    const stableReduction = stableDetectionReductionByLevel[stableIndex];
    const stealthReduction = silentStealthBonus * 100;

    const rawChance = BASE_DETECTION_CHANCE + wallBonus - stableReduction - stealthReduction + defenderRelicBonus;
    return clamp(Math.round(rawChance), 0, 100);
};

export const getMaxSpies = (stableLevel: number): number => {
    const index = clamp(stableLevel, 0, stableMaxSpiesByLevel.length - 1);
    return stableMaxSpiesByLevel[index];
};

export const stableUnlocksSpyAtNextLevel = (level: number): boolean => {
    if (level < 0) {
        return false;
    }
    const current = getMaxSpies(level);
    const next = getMaxSpies(level + 1);
    return next > current;
};

