# Implementation Plan

Full implementation plan for all features in ROADMAP.md.
Organized into **3 large chunks** designed to be executed back-to-back in one day.

---

## Strategy

Open Agent mode and run these commands in order, one after the other:

1. "Read `utils/PLAN.md` and `ROADMAP.md`. PLAN.md is the execution plan — it tells you what to build and in what order. ROADMAP.md is the full source of truth — it has every detail, formula, UI spec, bonus checklist, and design decision. When implementing anything, always cross-reference ROADMAP.md for the full details. Implement Chunk 1."
2. (When Chunk 1 finishes) New chat: "Read `utils/PLAN.md` and `ROADMAP.md`. PLAN.md is the execution plan, ROADMAP.md is the full source of truth with all details. Implement Chunk 2."
3. (When Chunk 2 finishes) New chat: "Read `utils/PLAN.md` and `ROADMAP.md`. PLAN.md is the execution plan, ROADMAP.md is the full source of truth with all details. Implement Chunk 3."
4. QA everything.

**Each chunk is a fresh chat** to avoid context window overflow.
Each chunk is self-contained: utils constants first, then backend, then dbUpdator, then client.
Total: ~3 sessions, then QA with as many sessions as needed for the rest of the month.

---

## Repos

| Repo | Path | Tech | Purpose |
|------|------|------|---------|
| **utils** | `utils/` | TypeScript | Shared constants, interfaces, helpers |
| **userService** | `userService/` | NestJS 8 + MongoDB | Backend API |
| **dbUpdator** | `dbUpdator/` | Node.js + MongoDB | Background resource/energy updates |
| **client** | `client/` | Angular 13 | Frontend SPA |

All repos on `dev` branch. Push to `origin dev` on GitHub (`DorHarongi/*`).

---

---

# CHUNK 1: Core Gameplay Foundation

**Contains:** Skill Tree, Troop Stats V2, Stable Building, Scouting/Spies, Village Power Display, Boss Battle Reports

This is the biggest chunk. It replaces the trait system, adds the new building, adds scouting, and polishes existing features. Everything else builds on top of this.

---

## 1. Utils — Skill Tree Constants

**File:** `utils/skills/skillConsts.ts` (new)

- `SkillCategory` enum: `SHARPER_BLADES`, `HEROIC_SHIELD`, `SELF_DEFENSE`, `SILENT_STEALTH`, `FILTHY_THIEF`, `GOLD_RUSH`, `QUICK_STEP`, `ADRENALINE_SURGE`, `IRON_VAULT`
- `SkillTier` enum: `I`, `II`, `III`
- `SKILL_TIER_COSTS`: `{ I: 1, II: 2, III: 3 }`
- `SKILL_TIER_BONUSES` per category per tier (e.g., `SHARPER_BLADES: { I: 0.05, II: 0.10, III: 0.15 }`)
- `getSkillPointsByAcademyLevel(level)` → `level * 2`
- `getUsedSkillPoints(skills)` → sum of tier costs for all learned skills
- `getAvailableSkillPoints(academyLevel, skills)` → total - used
- `canLearnSkill(academyLevel, skills, category, tier)` → checks points, prerequisite tier
- `getSkillBonus(skills, category)` → returns the bonus multiplier (0 if not learned)
- `Skills` interface: `Record<SkillCategory, SkillTier | null>`
- `EMPTY_SKILLS` constant: all categories set to `null`
- `SKILL_METADATA` array: name, description, icon placeholder, tier bonuses for each category

**File:** `utils/skills/skillResetConsts.ts` (new)

- Reset cost tiers based on points used:
  - 1-6 points: `{ wood: 5000, stones: 5000, crop: 5000 }`
  - 7-12 points: `{ wood: 50000, stones: 50000, crop: 50000 }`
  - 13-20 points: `{ wood: 250000, stones: 250000, crop: 250000 }`
- `getResetCost(skillPointsUsed)` → returns `MaterialsCost`

## 2. Utils — Troop Stats Version 2

**File:** `utils/troops/troopsConsts.ts`

Update all troop values to ROADMAP V2:

| Troop | Attack | Defense | Wood | Stone | Crop |
|-------|--------|---------|------|-------|------|
| Spear | 4 | 2 | 250 | 250 | 500 |
| Sword | 2 | 4 | 250 | 250 | 500 |
| Axe | 13 | 5 | 750 | 750 | 1500 |
| Archer | 15 | 15 | 1500 | 1500 | 2000 |
| Magician | 20 | 40 | 3500 | 3500 | 5000 |
| Horsemen | 50 | 30 | 10000 | 10000 | 10000 |
| Catapults | 200 | 5 | 25000 | 25000 | 25000 |

Add `movementSpeed` per troop: Spear 7, Sword 7, Axe 3, Archer 8, Magician 5, Horsemen 20, Catapults 1.
Add `SPY_SPEED = 20` (same as Horsemen).

## 3. Utils — Stable & Scouting Constants

**File:** `utils/buildings/stableConsts.ts` (new)

- `stableDetectionReductionByLevel`: `[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]` (percent)
- `stableMaxSpiesByLevel`: `[0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]`
- `SPY_REGEN_TIME_MS = 12 * 60 * 60 * 1000` (12 hours)
- `BASE_DETECTION_CHANCE = 40`
- `WALL_DETECTION_PER_LEVEL = 3`
- `getDetectionChance(wallLevel, stableLevel, silentStealthBonus)` → clamped 0-100
- `getMaxSpies(stableLevel)` → from array
- `stableUnlocksSpyAtNextLevel(level)` → true for even levels 2,4,6,8

**File:** `utils/buildings/levelUpCosts/stableLevelUpConsts.ts` (new)

Define 10 levels of costs (primarily wood, medium stone, low crop — similar to Arsenal pattern).

**File:** `utils/buildings/levelUpCosts/buildingLevelUpMaterialCostsByName.ts` — add `stable` entry.

**File:** `utils/bosses/bossConsts.ts` — add `BossReportType` to distinguish PvP/boss/spy reports.

**File:** `utils/index.ts` — export all new files.

## 4. UserService — Model Changes

**File:** `userService/src/user/models/village.entity.ts`

- Remove `trait?: VillageTrait` field
- Add `skills: Skills` (import from utils)
- Add `aliveSpies: number`
- Add `spyDeathTimestamps: Date[]`

**File:** `userService/src/user/models/buildingsLevels.ts`

- Add `stableLevel: number`

**File:** `userService/src/reports/models/attackReport.entity.ts`

Add:
- `reportType: 'pvp' | 'boss' | 'spy'`
- `bossName?: string`, `bossTier?: string`
- `bossHpBefore?: number`, `bossHpAfter?: number`, `bossDamageDealt?: number`
- `bossReward?: ResourcesAmounts`

## 5. UserService — Skill Endpoints

**File:** `userService/src/interactions/services/interactions.service.ts`

Replace `learnTrait()` with:
- `learnSkill(username, villageName, category, tier)` — validates points, prerequisites, persists
- `resetSkills(username, villageName)` — validates resources, resets all skills to null, deducts cost

**File:** `userService/src/interactions/interactions.controller.ts`

- Replace `POST /interactions/learn-trait` with `POST /interactions/learn-skill`
- Add `POST /interactions/reset-skills`

## 6. UserService — Apply Skill Bonuses in Combat

**File:** `userService/src/attacking/services/attacking/attacking.service.ts`

- **Sharper Blades:** Multiply `attackingPower` by `1 + getSkillBonus(attackerSkills, SHARPER_BLADES)`
- **Heroic Shield:** Multiply `villageDefence` by `1 + getSkillBonus(defenderSkills, HEROIC_SHIELD)`
- **Self Defense (attacker wins):** Reduce `killedAttackerTroops` by `1 - getSkillBonus(attackerSkills, SELF_DEFENSE)`
- **Self Defense (defender wins):** Reduce defender losses by `1 - getSkillBonus(defenderSkills, SELF_DEFENSE)`
- **Filthy Thief:** Multiply `lootedResources` by `1 + getSkillBonus(attackerSkills, FILTHY_THIEF)`
- **Iron Vault:** Reduce stealable resources by `1 - getSkillBonus(defenderSkills, IRON_VAULT)`

**File:** `userService/src/bosses/services/boss.service.ts`

- **Sharper Blades:** Multiply damage by `1 + getSkillBonus(skills, SHARPER_BLADES)`
- **Self Defense:** Always reduce troop losses by `1 - getSkillBonus(skills, SELF_DEFENSE)`
- After boss attack: create a boss battle report via `reportsService.saveAttackReport()` with boss-specific fields (HP before/after, damage, reward, troop losses)

## 7. UserService — Stable Building

**File:** `userService/src/buildings/services/buildings-upgrading/buildings-upgrading.service.ts`

Add `stable` to the building upgrade switch/map so it can be upgraded like any other building.

## 8. UserService — Scouting Module (new)

**New module:** `userService/src/scouting/`

Files: `scouting.module.ts`, `scouting.controller.ts`, `scouting.service.ts`, `models/spyMission.entity.ts`

**New collection:** `spyMissions`

Schema:
```typescript
{
  attackerUsername: string
  attackerVillageName: string
  defenderUsername: string
  defenderVillageName: string
  departureTime: Date
  arrivalTime: Date
  status: 'in_transit' | 'returning' | 'completed' | 'caught'
}
```

**Scout flow:**
1. Validate: attacker has Stable, `availableSpies > 0`, target exists, not own village, not same clan
2. Calculate travel time: distance / (SPY_SPEED * (1 + quickStepBonus))
3. Create spyMission with `arrivalTime`
4. Decrement available spies (track via spyMissions count)
5. Cron every 10s: resolve arrived missions — RNG detection roll, create report, handle spy death/return

**Spy regen cron** (`@Cron('*/30 * * * * *')`):
- Find villages where `aliveSpies < getMaxSpies(stableLevel)`
- If oldest `spyDeathTimestamp` is > 12h ago → increment `aliveSpies`, remove timestamp

**File:** `userService/src/app.module.ts` — import `ScoutingModule`

## 9. dbUpdator — Replace Traits with Skills

**File:** `dbUpdator/db-updator.js`

- Replace all Vanguard trait multiplier logic with skill-based multipliers:
  - **Gold Rush:** Resource production `* (1 + goldRushBonus)`
  - **Adrenaline Surge:** Energy production `* (1 + adrenalineSurgeBonus)`
- Read `skills` field from villages instead of `trait`
- The aggregation pipeline `$switch` on trait becomes a `$switch` on skill tiers

## 10. Client — Village Model Update

**File:** `client/src/app/main-panel/models/Village.ts`

- Remove `trait` field, add `skills: Skills`

## 11. Client — Academy → Skill Tree UI

**File:** `client/src/app/main-panel/buildings/academy/academy.component.ts` (rewrite)
**File:** `client/src/app/main-panel/buildings/academy/academy.component.html` (rewrite)
**File:** `client/src/app/main-panel/buildings/academy/academy.component.scss` (rewrite)

Replace trait carousel with skill tree grid:
- 9 columns (categories) x 3 rows (tiers)
- Each cell: icon (crop.png placeholder), bonus text, cost, state (unlocked/available/locked)
- Click available → confirmation modal → `POST /interactions/learn-skill`
- Reset button → warning modal with cost → `POST /interactions/reset-skills`
- Follow existing game styling: `top-bg.png` buttons, black borders, box-shadows, brown/gold palette

## 12. Client — Stable Component (new)

**File:** `client/src/app/main-panel/buildings/stable/` (new, copy Arsenal pattern)

- `stable.component.ts` — Building instance with stable costs, spy count display, "next level unlocks another spy" message at even levels
- `stable.component.html` — `<app-building>` wrapper with spy info section
- `stable.component.scss` — match game styling
- Add to `app.routes.ts`: `{ path: 'Stable', component: StableComponent }`
- Add to `main-panel.module.ts` declarations

## 13. Client — Scout Button on Village Interaction

**File:** `client/src/app/world-map/village-interaction/village-interaction.component.ts` + `.html`

- Add "Scout" button next to "Attack" (disabled if `availableSpies === 0`)
- `showScoutPanel` flag, `scoutVillage()` → `POST /scouting/scout`
- Confirmation modal shows available spy count and travel time

## 14. Client — Spy Reports in Inbox

**File:** `client/src/app/inbox/inbox.component.ts` + `.html`

Handle `reportType: 'spy'` and `reportType: 'boss'`:
- Spy SUCCESS: clickable, shows troop counts, resources, wall, academy level
- Spy CAUGHT: non-clickable, just text
- Boss: boss image, troops before/after, HP bar, damage, reward

**File:** `client/src/app/inbox/scout-report/` (new component)
Display scout report data with game styling.

## 15. Client — Spy Count in Top Toolbar

**File:** `client/src/app/main-panel/top-toolbar/top-toolbar.component.ts` + `.html`

- Show `availableSpies / maxSpies` with placeholder spy icon (only if `stableLevel > 0`)
- Hover tooltip when spies are dead: "X of your spies died. New spy in: HH:MM:SS"
- Follow existing `.icon-with-badge` pattern

## 16. Client — Village Power Display (Right Toolbar)

**File:** `client/src/app/main-panel/right-toolbar/right-toolbar.component.ts` + `.html` + `.scss`

- Below troops: total Attack and Defense (troops + support + skill bonuses)
- Fix text cut-off bug: `overflow-y: auto` or increase heights

## 17. Migration Script — Skills + Stable + Spies (combined)

**File:** `userService/src/scripts/migrate-chunk1.ts` (new)

- Remove `trait` from all villages
- Add `skills` (all null), `stableLevel: 0`, `aliveSpies: 0`, `spyDeathTimestamps: []`

## 18. Commit and push all 4 repos

---

---

# CHUNK 2: Travel Time, Achievements, Leaderboards, Clan Chat

**Contains:** Travel Time system (attacks become delayed), Achievements & Titles, Stats tracking, Leaderboards, Clan Chat with WebSocket

This chunk transforms combat from instant to time-based and adds social/competitive features.

---

## 1. Utils — Travel Time Helpers

**File:** `utils/troops/travelTimeConsts.ts` (new)

- `calculateDistance(x1, y1, x2, y2)` → Euclidean distance
- `getArmySpeed(troopsAmounts)` → min speed of all troops with count > 0
- `calculateTravelTimeMs(distance, armySpeed, quickStepBonus)` → milliseconds
- `MERCHANT_SPEED = 5` (for resource transfers)

## 2. Utils — Achievement Definitions

**File:** `utils/achievements/achievementConsts.ts` (new)

- `Achievement` interface: `id, name, description, threshold, statField`
- `ACHIEVEMENTS` array with all definitions (Boss Slayer, Raider, Iron Wall, Warlord, etc.)
- `Title` interface: `achievementId, displayName`

**File:** `utils/index.ts` — export new files.

## 3. UserService — User Model: Stats Fields

**File:** `userService/src/user/models/user.entity.ts`

Add:
```typescript
weeklyStats: {
  bossDamage: number
  resourcesStolen: number
  successfulDefenses: number
}
totalStats: {
  lifetimeBossDamage: number
  lifetimeResourcesStolen: number
  totalBattlesWon: number
}
selectedTitle?: string
```

## 4. UserService — Movements Collection & Processing

**New collection:** `movements`

Schema:
```typescript
{
  type: 'attack' | 'support' | 'resources' | 'return'
  senderUsername: string
  senderVillageName: string
  targetUsername: string
  targetVillageName: string
  troops?: TroopsAmounts
  resources?: ResourcesAmounts
  departureTime: Date
  arrivalTime: Date
  status: 'in_transit' | 'completed'
}
```

**File:** `userService/src/attacking/services/movement.service.ts` (new)

`@Cron('*/10 * * * * *')` — every 10 seconds:
- Find movements where `arrivalTime <= now` and `status === 'in_transit'`
- `attack`: execute battle logic (moved from instant-attack)
- `support`: deliver troops to target village
- `resources`: deliver resources to target
- `return`: return troops to sender
- Mark as `completed`

## 5. UserService — Refactor Attack to Delayed

**File:** `userService/src/attacking/services/attacking/attacking.service.ts`

Refactor `attack()`:
- Instead of instant battle: deduct troops, create movement with calculated `arrivalTime`
- Battle logic moves to `movement.service.ts` (triggered on arrival)
- Return trip created after battle with surviving troops (recalculate speed based on survivors)

## 6. UserService — Stats Tracking in Combat

Update `attacking.service.ts`:
- On attacker win: increment `resourcesStolen` (weekly + total), `totalBattlesWon`
- On defender win: increment defender's `successfulDefenses`

Update `boss.service.ts`:
- On boss attack: increment `bossDamage` (weekly + total)

## 7. UserService — Weekly Reset Cron

**File:** `userService/src/user/services/user-repository.service.ts`

Add `@Cron('0 0 * * 1')` (Monday midnight): reset all users' `weeklyStats` to 0.

## 8. UserService — Leaderboard + Movement Endpoints

**File:** `userService/src/user/user.controller.ts`

- `GET /users/leaderboard/:category` — top players by weekly stat
- `GET /clans/leaderboard/:category` — aggregated clan stats
- `GET /movements/:username` — all active movements (incoming + outgoing)

## 9. UserService — Clan Chat (WebSocket)

Install: `@nestjs/websockets @nestjs/platform-socket.io socket.io`

**File:** `userService/src/chat/chat.module.ts` (new)
**File:** `userService/src/chat/chat.gateway.ts` (new)
**File:** `userService/src/chat/chat.service.ts` (new)

WebSocket gateway on `/chat` namespace:
- `@SubscribeMessage('joinClan')` — join room by clan name
- `@SubscribeMessage('sendMessage')` — broadcast to clan room
- Auth token validation on connection

Service:
- `saveChatMessage(clanName, senderUsername, senderRole, content)`
- `getChatHistory(clanName, page)` — paginated
- `cleanOldMessages()` — `@Cron('0 0 * * *')` delete > 7 days

**New collection:** `chatMessages` — `{ clanName, senderUsername, senderRole: 'leader' | 'member', content, date }`

**File:** `userService/src/app.module.ts` — import `ChatModule`

## 10. Client — Travel Time in Attack Confirmation

**File:** `client/src/app/world-map/village-interaction/village-interaction.component.ts` + `.html`

- Calculate and display travel time, army speed (slowest troop), ETA before attack

## 11. Client — Incoming/Outgoing Movements Panel

**File:** `client/src/app/main-panel/movements/movements.component.ts` (new)

- Fetch `GET /movements/:username` on interval
- Show incoming attacks with countdown, outgoing attacks/support/resources with countdown
- Display on main panel (always visible)

## 12. Client — Arsenal Speed Display

**File:** `client/src/app/main-panel/buildings/arsenal/arsenal.component.html`

Add speed stat next to each troop (use crop.png as placeholder icon).

## 13. Client — Statistics: Leaderboards Tab

**File:** `client/src/app/statistics/statistics/statistics.component.ts` + `.html`

Third tab "Leaderboards":
- Category selector (Boss Damage, Resources Raided, Best Defenders)
- Player + Clan leaderboard tables

## 14. Client — Titles on Player Profile

**File:** `client/src/app/player/player-page/player-page.component.ts` + `.html`

Show selected title under player name.

## 15. Client — Clan Chat

Install: `socket.io-client`

**File:** `client/src/app/clan/clan-chat/clan-chat.component.ts` (new)

- Connect to WebSocket, load history via HTTP, send via WebSocket
- Leader messages: bold blue (check `senderRole`)
- Add `<app-clan-chat>` to clan page HTML

## 16. Migration Script — Stats

**File:** `userService/src/scripts/migrate-chunk2.ts` (new)

Add `weeklyStats`, `totalStats`, `selectedTitle` to all users with zeroed values.

## 17. Commit and push all 4 repos

---

---

# CHUNK 3: Endgame, Multi-Server, Theme

**Contains:** Divine Relics, Mythic Boss, Global Announcements, Betrayal, Server End State, Multi-Server Architecture, Theme Chooser

This chunk adds the endgame win condition, the entire multi-server system, and polish features.

---

## 1. Utils — Relic & Mythic Boss Constants

**File:** `utils/relics/relicConsts.ts` (new)

- `RELIC_NAMES`: 5 objects with `id`, `name`, `description` (Apple of Eternity, Eternal Flame, Chalice of Ascension, All-Seeing Orb, Sigil of Creation)
- `MYTHIC_BOSS_DAILY_SPAWN_CHANCE = 0.01`
- `RELIC_TRANSFER_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000`
- `RelicHolder` interface: `{ relicId, username, villageName, clanName, transferCooldownUntil }`

**File:** `utils/bosses/bossConsts.ts`

Add `MYTHIC` to `BossTier` enum:
- HP: `800_000_000` to `1_600_000_000`
- No time limit, no despawn
- Per-clan damage leaderboard tracking

**File:** `utils/index.ts` — export new files.

## 2. UserService — Relics Module (new)

**File:** `userService/src/relics/` — `relics.module.ts`, `relics.controller.ts`, `relics.service.ts`

**New collection:** `relics`

Schema:
```typescript
{
  relicId: string
  holderUsername: string | null
  holderVillageName: string | null
  holderClanName: string | null
  transferCooldownUntil: Date | null
  obtainedAt: Date | null
}
```

Initialize with 5 documents (one per relic), all null.

Endpoints:
- `GET /relics` — all relic statuses
- `GET /relics/clan/:clanName` — relics held by a clan
- `POST /relics/transfer` — leader transfers relic (7-day cooldown)

## 3. UserService — Mythic Boss + Relic Assignment

**File:** `userService/src/bosses/services/boss.service.ts`

- Mythic boss spawn: daily 1% roll in cron
- Track per-clan damage on Mythic boss (separate `mythicBossDamage` collection or field)
- On Mythic defeat: assign relic to clan with most damage via `relics.service`

## 4. UserService — Relic Stealing in Combat

**File:** `userService/src/attacking/services/attacking/attacking.service.ts` (or `movement.service.ts`)

After battle (attacker wins with total wipe — all defender + support troops dead):
- Check if defender holds any relics
- If yes: transfer all relics to attacker's village/clan
- Create global announcement

## 5. UserService — Global Announcements

**New collection:** `announcements` — `{ type, content, metadata, date }`

**File:** `userService/src/announcements/` — `announcements.module.ts`, `announcements.service.ts`, `announcements.controller.ts`

- `createAnnouncement(type, content, metadata)`
- `GET /announcements/recent?limit=20`
- Called from: relic events, mythic boss spawn, win condition, betrayal

## 6. UserService — Betrayal Handling

**File:** `userService/src/clans/services/clans.service.ts`

In `leaveClan()`:
- Check if leaving player holds relics → relic stays with player, create announcement
In `joinClan()`:
- If player holds relics → create second announcement

## 7. UserService — Server End State

**New collection:** `serverConfig` — `{ serverId, status: 'active' | 'ended', winningClanName, endedAt }`

**File:** `userService/src/server/server.service.ts` (new)

- `getServerStatus()`
- `endServer(winningClanName)` → freeze server
- Win condition check: after any relic change, check if one clan holds all 5
- `GET /server/status`

**File:** `userService/src/server/server-status.guard.ts` (new)

NestJS guard: blocks mutation endpoints if `serverStatus === 'ended'`.
Apply to: attack, train, upgrade, scout, support, resources, learn-skill, transfer-relic, etc.
Read-only endpoints (statistics, reports, map) NOT guarded.

## 8. UserService — Multi-Server: Dynamic DB Routing

**Architecture: Option B — Separate DBs per server.**

**File:** `userService/src/database/services/db-connector.service.ts`

- Accept `serverId`, connect to `pasiflora_server_{serverId}`
- Cache connections per server
- Account queries → `pasiflora_accounts` database

**File:** `userService/src/server/server.module.ts` (new)

- `GET /servers` — list all servers
- `POST /servers/join` — player joins a server
- `POST /servers/create` — auto-create new server (triggered by win)

All services: read `serverId` from `X-Server-Id` request header via middleware/interceptor.

## 9. UserService — Theme Endpoint

Add `theme: string` to user model (default: `'default'`).
`POST /users/theme` to update.

## 10. dbUpdator — Multi-Server Awareness

**File:** `dbUpdator/db-updator.js`

- Query `pasiflora_accounts.servers` for all active servers
- Loop: run resource/energy/spy-regen updates per server database
- Also: daily mythic boss spawn roll per server

## 11. Client — Relic Medallion Component

**File:** `client/src/app/shared/relic-medallion/relic-medallion.component.ts` (new)

Smart cropping algorithm using the two provided images:
- Image 1 (all glowing): `assets/relics-found.png`
- Image 2 (all dark): `assets/relics-empty.png`
- For each of the 5 relic positions (fixed coordinates in the circular image), crop from image 1 if held, image 2 if not
- Composite using canvas or CSS clip-path per relic slot
- Input: `@Input() heldRelicIds: string[]`

## 12. Client — Embassy Relic Management

**File:** `client/src/app/main-panel/buildings/embassy/embassy-relics/` (new component)

- Show all 5 relics with holder info (name, village, cooldown)
- Leader only: transfer form (select player → select village → confirmation modal with warnings)
- Holder: personal notice about betrayal possibility
- Cooldown countdown display

## 13. Client — Statistics: Divine Relics Column

**File:** `client/src/app/statistics/statistics/statistics.component.html`

Add "Divine Relics" column to clan table — show mini relic medallion per clan.

## 14. Client — Announcements Banner

**File:** `client/src/app/main-panel/announcements/announcements.component.ts` (new)

- Poll `GET /announcements/recent` every 30s
- Toast/banner display, relic names in gold

## 15. Client — Server End State

**File:** `client/src/app/app.component.ts`

On init: check `GET /server/status`. If ended:
- Permanent banner: "Clan [Name] has won this server."
- Global `serverEnded` flag → disable all action buttons

## 16. Client — Server Selection Screen

**File:** `client/src/app/server-select/server-select.component.ts` (new)

- Shown after login, before entering game
- List servers with status, player count
- Select → store `serverId` in session
- All HTTP requests include `X-Server-Id` header (via AuthInterceptor)

## 17. Client — Theme Chooser

**File:** `client/src/styles.scss`

CSS custom properties per theme:
```scss
[data-theme="default"] { --bg-primary: #7d5210; ... }
[data-theme="dark"] { --bg-primary: #1a1a2e; ... }
[data-theme="ocean"] { ... }
[data-theme="forest"] { ... }
[data-theme="blood"] { ... }
[data-theme="royal"] { ... }
```

Settings page with theme selector. Apply `data-theme` attribute on `<body>`.

## 18. Migration Scripts

**File:** `userService/src/scripts/migrate-chunk3.ts` (new)

- Initialize 5 relic documents (all holders null)
- Add `theme: 'default'` to all users
- Create `serverConfig` document: `{ serverId: 1, status: 'active' }`

**File:** `userService/src/scripts/migrate-multi-server.ts` (new) — run LAST

1. Rename `users` database to `pasiflora_server_1`
2. Create `pasiflora_accounts` with user auth data
3. Create `servers` collection with Server 1 entry

## 19. Commit and push all 4 repos

---

---

# Migration Execution Order

Run once, in this order, before going live:

1. `migrate-chunk1.ts` — traits → skills, add stable + spy fields
2. `migrate-chunk2.ts` — add stats, title fields
3. `migrate-chunk3.ts` — relics, theme, server config
4. `migrate-multi-server.ts` — database restructure (LAST, most dangerous)

---

# Summary

| Chunk | What | Estimated Size |
|-------|------|----------------|
| **Chunk 1** | Skill Tree + Troop V2 + Stable + Scouting + Village Power + Boss Reports | Largest — new systems, model rewrites, new building, new module |
| **Chunk 2** | Travel Time + Achievements + Leaderboards + Clan Chat (WebSocket) | Medium — combat refactor to delayed, stats, WebSocket |
| **Chunk 3** | Divine Relics + Endgame + Multi-Server + Theme | Medium — endgame mechanics, DB restructure, polish |

**Execution:** 3 fresh Agent mode chats, back to back, one day. Then QA.

---

# Notes

- All missing icons use `crop.png` as placeholder until real assets are provided
- All new components follow existing game styling (top-bg.png buttons, brown/gold palette, black borders)
- All new API endpoints need auth guard (JWT validation)
- The relic medallion uses smart cropping of the two provided images (glowing vs dark) to render any combination of found/unfound relics
