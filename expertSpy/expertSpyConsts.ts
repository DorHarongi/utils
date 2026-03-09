export const EXPERT_SPY_UNLOCK_STABLE_LEVEL = 5;

export const EXPERT_SPY_EMBED_DURATION_MS = 6 * 60 * 60 * 1000;

export const EXPERT_SPY_DEATH_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export const CROW_SPEED_TILES_PER_MIN = 20;

export type ExpertSpyStatus = 'available' | 'deployed' | 'dead';

export interface ExpertSpyState {
    status: ExpertSpyStatus;
    targetUsername?: string;
    targetVillageName?: string;
    targetType?: 'village' | 'oasis';
    targetOasisId?: string;
    deployedAt?: Date;
    embedExpiresAt?: Date;
    deathCooldownUntil?: Date;
}

export const EMPTY_EXPERT_SPY_STATE: ExpertSpyState = {
    status: 'available',
};
