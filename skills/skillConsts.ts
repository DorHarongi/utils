export enum SkillCategory {
    SHARPER_BLADES = 'sharperBlades',
    HEROIC_SHIELD = 'heroicShield',
    SILENT_STEALTH = 'silentStealth',
    FILTHY_THIEF = 'filthyThief',
    GOLD_RUSH = 'goldRush',
    QUICK_STEP = 'quickStep',
    ADRENALINE_SURGE = 'adrenalineSurge',
    IRON_VAULT = 'ironVault',
}

export enum SkillTier {
    I = 'I',
    II = 'II',
    III = 'III',
}

export const SKILL_TIER_COSTS: Record<SkillTier, number> = {
    [SkillTier.I]: 1,
    [SkillTier.II]: 2,
    [SkillTier.III]: 3,
};

const SMALL_BONUS: Record<SkillTier, number> = {
    [SkillTier.I]: 0.05,
    [SkillTier.II]: 0.10,
    [SkillTier.III]: 0.15,
};

const MEDIUM_BONUS: Record<SkillTier, number> = {
    [SkillTier.I]: 0.10,
    [SkillTier.II]: 0.20,
    [SkillTier.III]: 0.30,
};

export const SKILL_TIER_BONUSES: Record<SkillCategory, Record<SkillTier, number>> = {
    [SkillCategory.SHARPER_BLADES]: SMALL_BONUS,
    [SkillCategory.HEROIC_SHIELD]: SMALL_BONUS,
    [SkillCategory.SILENT_STEALTH]: MEDIUM_BONUS,
    [SkillCategory.FILTHY_THIEF]: MEDIUM_BONUS,
    [SkillCategory.GOLD_RUSH]: SMALL_BONUS,
    [SkillCategory.QUICK_STEP]: MEDIUM_BONUS,
    [SkillCategory.ADRENALINE_SURGE]: SMALL_BONUS,
    [SkillCategory.IRON_VAULT]: MEDIUM_BONUS,
};

export type Skills = Record<SkillCategory, SkillTier | null>;

export const EMPTY_SKILLS: Skills = {
    [SkillCategory.SHARPER_BLADES]: null,
    [SkillCategory.HEROIC_SHIELD]: null,
    [SkillCategory.SILENT_STEALTH]: null,
    [SkillCategory.FILTHY_THIEF]: null,
    [SkillCategory.GOLD_RUSH]: null,
    [SkillCategory.QUICK_STEP]: null,
    [SkillCategory.ADRENALINE_SURGE]: null,
    [SkillCategory.IRON_VAULT]: null,
};

export const getSkillPointsByAcademyLevel = (level: number): number => {
    if (level <= 0) {
        return 0;
    }
    return level * 2;
};

/** Cumulative cost to reach a tier (I=1, II=1+2=3, III=1+2+3=6) */
export const getCumulativeCostForTier = (tier: SkillTier): number => {
    const tierOrder: SkillTier[] = [SkillTier.I, SkillTier.II, SkillTier.III];
    const idx = tierOrder.indexOf(tier);
    let sum = 0;
    for (let i = 0; i <= idx; i++) {
        sum += SKILL_TIER_COSTS[tierOrder[i]];
    }
    return sum;
};

export const getUsedSkillPoints = (skills: Skills): number => {
    let sum = 0;
    for (const key in skills) {
        const tier = skills[key as keyof Skills];
        if (tier) {
            sum += getCumulativeCostForTier(tier);
        }
    }
    return sum;
};

export const getAvailableSkillPoints = (academyLevel: number, skills: Skills): number => {
    const total = getSkillPointsByAcademyLevel(academyLevel);
    const used = getUsedSkillPoints(skills);
    return total - used;
};

export const canLearnSkill = (
    academyLevel: number,
    skills: Skills,
    category: SkillCategory,
    tier: SkillTier,
): boolean => {
    const availablePoints = getAvailableSkillPoints(academyLevel, skills);
    const tierCost = SKILL_TIER_COSTS[tier];

    if (tierCost > availablePoints) {
        return false;
    }

    const currentTier = skills[category];

    switch (tier) {
        case SkillTier.I:
            return currentTier === null;
        case SkillTier.II:
            return currentTier === SkillTier.I;
        case SkillTier.III:
            return currentTier === SkillTier.II;
        default:
            return false;
    }
};

export const getSkillBonus = (skills: Skills, category: SkillCategory): number => {
    const tier = skills[category];
    if (!tier) {
        return 0;
    }
    const bonusesForCategory = SKILL_TIER_BONUSES[category];
    return bonusesForCategory?.[tier] ?? 0;
};

export interface SkillMetadata {
    category: SkillCategory;
    name: string;
    description: string;
    icon: string;
    tierBonuses: Record<SkillTier, number>;
}

export const SKILL_METADATA: SkillMetadata[] = [
    {
        category: SkillCategory.SHARPER_BLADES,
        name: 'Sharper Blades',
        description: 'Increases your troops\' attack power in PvP and boss battles.',
        icon: 'sharper-blades.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.SHARPER_BLADES],
    },
    {
        category: SkillCategory.HEROIC_SHIELD,
        name: 'Heroic Shield',
        description: 'Increases your village\'s total defense when being attacked by another player.',
        icon: 'heroic-shield.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.HEROIC_SHIELD],
    },
    {
        category: SkillCategory.SILENT_STEALTH,
        name: 'Silent Stealth',
        description: 'Reduces the chance that your spies are detected while scouting.',
        icon: 'silent-stealth.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.SILENT_STEALTH],
    },
    {
        category: SkillCategory.FILTHY_THIEF,
        name: 'Filthy Thief',
        description: 'Increases the amount of resources looted from PvP attacks.',
        icon: 'filthy-thief.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.FILTHY_THIEF],
    },
    {
        category: SkillCategory.GOLD_RUSH,
        name: 'Gold Rush',
        description: 'Increases wood, stone, and crop production.',
        icon: 'gold-rush.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.GOLD_RUSH],
    },
    {
        category: SkillCategory.QUICK_STEP,
        name: 'Quick Step',
        description: 'Increases movement speed of your troops and spies.',
        icon: 'quick-step.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.QUICK_STEP],
    },
    {
        category: SkillCategory.ADRENALINE_SURGE,
        name: 'Adrenaline Surge',
        description: 'Increases your energy regeneration speed. Stacks across all villages.',
        icon: 'andrenaline-surge.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.ADRENALINE_SURGE],
    },
    {
        category: SkillCategory.IRON_VAULT,
        name: 'Iron Vault',
        description: 'Protects a portion of your resources from being stolen in PvP.',
        icon: 'iron-vault.png',
        tierBonuses: SKILL_TIER_BONUSES[SkillCategory.IRON_VAULT],
    },
];

