import { Skills, getSkillBonus, SkillCategory } from '../skills/skillConsts';
import {
  getRelicAttackBonus,
  getRelicDefenseBonus,
  getRelicProductionBonus,
  getRelicSpeedBonus,
  getRelicSpyDetectionBonus,
} from '../relics/relicConsts';

export function getEffectiveAttackMultiplier(skills: Skills, heldRelicIds: string[]): number {
  return 1 + getSkillBonus(skills, SkillCategory.SHARPER_BLADES) + getRelicAttackBonus(heldRelicIds);
}

export function getEffectiveDefenseMultiplier(skills: Skills, heldRelicIds: string[]): number {
  return 1 + getSkillBonus(skills, SkillCategory.HEROIC_SHIELD) + getRelicDefenseBonus(heldRelicIds);
}

export function getEffectiveSpeedBonus(skills: Skills, heldRelicIds: string[]): number {
  return getSkillBonus(skills, SkillCategory.QUICK_STEP) + getRelicSpeedBonus(heldRelicIds);
}

export function getEffectiveProductionMultiplier(skills: Skills, heldRelicIds: string[]): number {
  return 1 + getSkillBonus(skills, SkillCategory.GOLD_RUSH) + getRelicProductionBonus(heldRelicIds);
}

export function getEffectiveSpyDetectionBonus(heldRelicIds: string[]): number {
  return getRelicSpyDetectionBonus(heldRelicIds);
}
