// Village Trait System - Academy Building

export enum VillageTrait {
    WARLORD = 'warlord',     // +attack power
    GUARDIAN = 'guardian',   // +defense, -troop losses
    VANGUARD = 'vanguard'    // +gathering speed, +troop movement speed
}

// Trait bonus percentages by academy level (levels 1-10)
// Level 1-2: No trait available
// Level 3: 7% bonus (first trait selection is free)
// Level 4-10: +2% per level, up to 25% at level 10
export const traitBonusByLevel: Record<number, number> = {
    1: 0,      // No trait available
    2: 0,      // No trait available
    3: 0.07,   // 7% - First trait selection unlocked
    4: 0.09,   // 9%
    5: 0.11,   // 11%
    6: 0.13,   // 13%
    7: 0.15,   // 15%
    8: 0.17,   // 17%
    9: 0.21,   // 21%
    10: 0.25   // 25%
};

// Minimum academy level required to select a trait
export const ACADEMY_TRAIT_UNLOCK_LEVEL = 3;

// Trait descriptions for UI
export const traitDescriptions: Record<VillageTrait, { name: string; shortDesc: string; fullDesc: string; icon: string; color: string }> = {
    [VillageTrait.WARLORD]: {
        name: 'Warlord',
        shortDesc: 'Increased attack power',
        fullDesc: 'Your attacking troops deal more damage in both PvP and PvE battles. Perfect for aggressive players who want to dominate the battlefield.',
        icon: 'assets/trait-warlord.png',
        color: '#c41e3a'
    },
    [VillageTrait.GUARDIAN]: {
        name: 'Guardian',
        shortDesc: 'Enhanced defense & survivability',
        fullDesc: 'Your village gains increased defense against attacks. Additionally, your troops suffer fewer casualties when attacking, making your army more sustainable.',
        icon: 'assets/trait-guardian.png',
        color: '#1e90ff'
    },
    [VillageTrait.VANGUARD]: {
        name: 'Vanguard',
        shortDesc: 'Faster gathering & movement',
        fullDesc: 'Your workers gather resources and energy faster. Your troops also move faster when attacking, allowing for quicker raids and reinforcements.',
        icon: 'assets/trait-vanguard.png',
        color: '#228b22'
    }
};

// Get the bonus multiplier for a trait at a given academy level
export function getTraitBonus(academyLevel: number): number {
    return traitBonusByLevel[academyLevel] || 0;
}

// Check if trait selection is available at given academy level
export function canSelectTrait(academyLevel: number): boolean {
    return academyLevel >= ACADEMY_TRAIT_UNLOCK_LEVEL;
}

// Calculate the cost to switch traits (full warehouse of academy level)
export function getTraitSwitchCost(academyLevel: number, warehouseStorageByLevel: number[]): { wood: number; crop: number; stones: number } {
    const storage = warehouseStorageByLevel[academyLevel] || 0;
    return {
        wood: storage,
        crop: storage,
        stones: storage
    };
}
