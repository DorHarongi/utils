import { MaterialsCost } from "../materialsCost";

/**
 * Reset cost per resource. Scaled to warehouse capacity so the relative burden stays heavy.
 * Fee is strictly non-decreasing at every step (never gets smaller).
 * All costs under warehouse cap. Nice numbers only.
 */
const COST_BY_POINTS: number[] = [
    0,        // 0
    500,      // 1   10% of 5k    fee 500
    1000,     // 2   20%          fee 500
    1500,     // 3   30%          fee 500
    2000,     // 4   40%          fee 500
    2500,     // 5   50%          fee 500
    4000,     // 6   80%          fee 1500
    6500,     // 7   52% of 12.5k fee 2500
    10000,    // 8   80%          fee 3500
    35000,    // 9   47% of 75k   fee 25000
    65000,    // 10  87%          fee 30000
    100000,   // 11  53% of 187.5k fee 35000
    150000,   // 12  80%          fee 50000
    250000,   // 13  53% of 475k   fee 100000
    350000,   // 14  74%          fee 100000
    500000,   // 15  40% of 1.25M  fee 150000
    700000,   // 16  56%          fee 200000
    950000,   // 17  76%          fee 250000
    1250000,  // 18  100%         fee 300000
    1800000,  // 19  60% of 3M    fee 550000
    2500000   // 20  83%          fee 700000
];

export const getResetCost = (skillPointsUsed: number): MaterialsCost => {
    if (skillPointsUsed <= 0) {
        return { wood: 0, stones: 0, crop: 0 };
    }
    const amount = COST_BY_POINTS[Math.min(skillPointsUsed, 20)] ?? COST_BY_POINTS[20];
    return { wood: amount, stones: amount, crop: amount };
};

