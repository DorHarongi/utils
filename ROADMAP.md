# Game Roadmap

## Future Features

---

### 0. Skill Tree System (Replaces Traits)
**Priority:** CRITICAL  
**Complexity:** High

**✅ TERMINOLOGY DECIDED: "Skills"**
- UI: "Skill Tree", "Skill Points", "Learn Skill", "Reset Skills"
- Codebase: `skills`, `skillPoints`, `learnedSkills`

**Description:**  
Replace the current all-or-nothing trait system with a skill tree.
Instead of choosing ONE trait (Warlord/Guardian/Vanguard), players spend skill points on individual skills.
This allows much more personalization and meaningful choices.

**Skill Points by Academy Level:**
| Academy Level | Points Gained | Total Points |
|---------------|---------------|--------------|
| 1 | +2 | 2 |
| 2 | +2 | 4 |
| 3 | +2 | 6 |
| 4 | +2 | 8 |
| 5 | +2 | 10 |
| 6 | +2 | 12 |
| 7 | +2 | 14 |
| 8 | +2 | 16 |
| 9 | +2 | 18 |
| 10 | +2 | 20 |

**Max: 20 skill points at Academy level 10**
**Every upgrade = 2 choices = feels rewarding every time**

---

**The Skill Tree (27 skills total, 9 categories × 3 tiers):**

**Tier Costs:**
| Tier | Cost | Bonus | To max 1 category |
|------|------|-------|-------------------|
| I | 1 point | +5% | 1 point |
| II | 2 points | +10% | 1+2 = 3 points |
| III | 3 points | +15% | 1+2+3 = **6 points** |

**Total to unlock everything:** 9 + 18 + 27 = **54 points**
**Player gets max:** 20 points = **37% coverage** (cruel!)

**The 9 Categories:**
| Category | Tier I (1pt) | Tier II (2pt) | Tier III (3pt) |
|----------|--------------|---------------|----------------|
| **Sharper Blades** (Attack) | +5% | +10% | +15% |
| **Heroic Shield** (Defense) | +5% | +10% | +15% |
| **Self Defense** (Troop Loss Reduction*) | -5% | -10% | -15% |
| **Silent Stealth** (Scouting) | +10% | +20% | +30% |
| **Filthy Thief** (PvP Loot) | +10% | +20% | +30% |
| **Gold Rush** (Resources) | +5% | +10% | +15% |
| **Quick Step** (Movement) | +5% | +10% | +15% |
| **Adrenaline Surge** (Energy) | +5% | +10% | +15% |
| **Iron Vault** (Protection) | +10% | +20% | +30% |

**Rules:**
- Tier I costs 1 point, Tier II costs 2, Tier III costs 3
- Must unlock Tier I before Tier II, Tier II before Tier III
- Max 20 points / 54 total = forces HARD choices (only 37%!)
- Tier III is a luxury (6 points = 30% of total for ONE +15% bonus)

**\*Self Defense - When it applies:**
| Scenario | Applies? | Reason |
|----------|----------|--------|
| Raid Boss (PvE) | ✅ Always | You're fighting monsters |
| PvP Attack - WIN | ✅ Yes | You won, fewer casualties |
| PvP Defense - WIN | ✅ Yes | You won, fewer casualties |
| PvP Attack - LOSE | ❌ No | You lost - ALL troops die |
| PvP Defense - LOSE | ❌ No | Overwhelmed - ALL troops die |

**Frontend description (short & clear):**
> "Reduces troop losses when raiding bosses or winning battles (attacking or defending)."

---

**Example Builds (20 points):**

| Build | Allocation | Points | Playstyle |
|-------|------------|--------|-----------|
| **Glass Cannon** | Attack III (6) + Loot III (6) + Speed II (3) + Energy II (3) + Gold I (1) + Stealth I (1) | 20 | Max offense, accepts troop losses |
| **Iron Wall** | Defense III (6) + Vault III (6) + SelfDef II (3) + Gold II (3) + Energy I (1) + Attack I (1) | 20 | Pure defense, minimizes all losses |
| **Efficient Raider** | Attack II (3) + SelfDef III (6) + Loot II (3) + Speed II (3) + Gold II (3) + Energy I (1) + Stealth I (1) | 20 | Hits hard, loses few troops |
| **Scout Master** | Stealth III (6) + Speed III (6) + Attack II (3) + Loot II (3) + Gold I (1) + Energy I (1) | 20 | Intel + quick strikes |
| **Wide & Shallow** | All 9× Tier I (9) + 3× Tier II (6) + 1× Tier II (3) + leftover | ~18-20 | Versatile, no specialization |

**The tradeoff:** 
- Want +15%? That's 6 points (30% of your total) for ONE bonus
- Most players will mix Tier II (+10%) skills for better coverage
- Tier III = statement build, not always optimal
- With 9 categories and only 20 points, you're leaving **63% on the table**

---

**Skill Reset:**
- Players can reset all skills and reallocate
- Cost is determined **solely by how many skill points were invested** — not by warehouse storage directly:

| Points Used | Reset Cost |
|-------------|------------|
| 1-6 | Low flat cost (small investment, cheap to redo) |
| 7-12 | Medium flat cost |
| 13-20 | High flat cost |

**Why this works perfectly:**

The cost is based on points invested — but this naturally and indirectly reflects warehouse size, because investing more points requires a higher Academy level, which requires more resources, which requires a bigger Warehouse. The correlation is automatic:

| Points Used | Academy Level | Why the cost is fair |
|-------------|---------------|----------------------|
| 1-6 | 1-3 | Early game — low investment, small reset cost |
| 7-12 | 4-6 | Mid game — medium investment, medium reset cost |
| 13-20 | 7-10 | Late game — full investment, high reset cost |

**Key insight:** Points invested already tells us everything about where the player is in the game. No need to query Warehouse level separately — the reset cost tiers map directly onto progression stages.

The reset cost is ALWAYS:
1. **Affordable** - a late-game player with 20 points has a large warehouse and can afford the high cost
2. **Fair** - scales with how much was invested, not arbitrarily
3. **Predictable** - players always know what a reset will cost before committing

**Implementation note:** Define the three cost tiers as flat resource amounts (or a formula tied to Academy level) — do NOT read warehouse capacity at reset time. The tier is determined purely by `skillPointsUsed`.

---

**UI Design: Styled Icon Grid**

Layout: 8 columns (categories) × 3 rows (tiers)

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                              🎯 Available Skill Points: 5                                │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│   ⚔️        🛡️        🩹        🔍        💰        🌾        🏃        ⚡        🏦      │
│ Attack   Defense  SelfDef  Stealth   Loot   Resources Speed   Energy   Vault            │
│                                                                                          │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐         │
│ │ +5% │  │ +5% │  │ -5% │  │ +5% │  │ +5% │  │ +5% │  │ +5% │  │ +5% │  │ +5% │  Tier I  │
│ │ 1pt │  │ 1pt │  │ 1pt │  │ 1pt │  │ 1pt │  │ 1pt │  │ 1pt │  │ 1pt │  │ 1pt │ (1 pt)  │
│ │  ✓  │  │  ✓  │  │  ●  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │         │
│ └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘         │
│                                                                                          │
│ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐         │
│ │+10% │  │+10% │  │-10% │  │+10% │  │+10% │  │+10% │  │+10% │  │+10% │  │+10% │  Tier II │
│ │ 2pt │  │ 2pt │  │ 2pt │  │ 2pt │  │ 2pt │  │ 2pt │  │ 2pt │  │ 2pt │  │ 2pt │ (2 pts) │
│ │  ●  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │         │
│ └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘         │
│                                                                                          │
│ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐         │
│ │+15% │  │+15% │  │-15% │  │+15% │  │+15% │  │+15% │  │+15% │  │+15% │  │+15% │ Tier III│
│ │ 3pt │  │ 3pt │  │ 3pt │  │ 3pt │  │ 3pt │  │ 3pt │  │ 3pt │  │ 3pt │  │ 3pt │ (3 pts) │
│ │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │  │  ○  │         │
│ └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘         │
│                                                                                          │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                              [🔄 Reset Skills]                                           │
└──────────────────────────────────────────────────────────────────────────────────────────┘

Legend:
  ✓ = Unlocked (glowing, colored)
  ● = Available to unlock (pulsing border, shows cost on hover)
  ○ = Locked (faded/grayed out)
```

**Visual States:**
| State | Appearance |
|-------|------------|
| Unlocked | Colored icon, glowing border, checkmark |
| Available | Slightly faded, pulsing golden border (clickable) |
| Locked (tier not reached) | Grayed out, no border, semi-transparent |
| Locked (need previous tier) | Grayed out with lock icon overlay |

**Interactions:**
- Hover on any skill → Tooltip with full description and current bonus
- Click available skill → Confirmation modal: "Learn [Skill Name] for X skill points?"
- Click locked skill → Toast: "Learn Tier I first" or "Not enough skill points"
- Click Reset → Warning modal with cost breakdown

**Responsive:**
- Desktop: Full 8-column grid
- Mobile: 4×2 grid or vertical scroll with 2 columns

**Styling Notes:**
- Use game's existing color palette (browns, golds)
- Icons should be custom/generated per category
- Match button styles with rest of Academy UI
- Background: Use existing `top-bg.png` or similar texture

---

**Migration from Current Trait System:**

**Option A:** Auto-allocate equivalent points based on old trait:
  - Warlord → Sharper Blades (spend points based on Academy level)
  - Guardian → Heroic Shield
  - Vanguard → Gold Rush + Adrenaline Surge

**Option B (Recommended):** Reset all users to 0 and give them fresh points
  - Cleaner, no weird partial builds
  - Everyone gets to experience the new system fresh
  - Announce in advance so players aren't surprised

**⚠️ IMPORTANT - Database Migration Note:**
This is the FIRST TIME we need to DELETE a property from documents!
- Must remove `trait` field from all villages
- Add new `skills` object to all villages
- MongoDB: Use `$unset` to remove `trait`, `$set` to add `skills`
```javascript
db.users.updateMany({}, {
  $unset: { "villages.$[].trait": "" },
  $set: { "villages.$[].skills": { /* initial empty or allocated skills */ } }
});
```
- Also update `dbUpdator` to handle `skills` instead of `trait`
- Remove all trait-related code from client and server after migration

---

**Implementation:**
- [ ] Replace `trait` field with `skills` object in Village model
- [ ] Create skill definitions in utils
- [ ] Skill point calculation based on Academy level
- [ ] Skill tree UI component in Academy
- [ ] Skill reset endpoint with cost calculation
- [ ] Migration script for existing users

---

**⚠️ CRITICAL: Skill Bonus Implementation Checklist**

This is the hardest part - making sure EVERY skill is applied EVERYWHERE it should be.
Use this checklist when implementing. Check off each location as you verify it.

**1. Sharper Blades (Attack +5/10/15%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] PvP Attack | `attacking.service.ts` | Multiply `attackingPower` by bonus |
| [ ] PvE/Boss Attack | `boss.service.ts` | Multiply `damageMultiplier` by bonus |
| [ ] Training display | Arsenal page | Show RAW attack (no bonus) |
| [ ] Attacking display | Attack confirmation | Show CALCULATED attack (with bonus) |

**2. Heroic Shield (Defense +5/10/15%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] PvP Defense | `attacking.service.ts` | Multiply `villageDefence` by bonus when DEFENDING |
| [ ] Battle reports | Attack report component | Show defense bonus in reports |
| [ ] Right toolbar | See "Village Power Display" section below |

**⚠️ OPEN QUESTION: Should Heroic Shield also apply to clan support troops defending your village?**

**3. Self Defense (Troop Loss -5/10/15%)**

**⚠️ IMPORTANT: Only applies on WINS (PvP) or ALWAYS (PvE)**

| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] PvP Attack (WIN) | `attacking.service.ts` | IF attacker wins: reduce `killedAttackerTroops` by attacker's bonus |
| [ ] PvP Attack (LOSE) | `attacking.service.ts` | IF attacker loses: ALL attacker troops die (NO bonus) |
| [ ] PvP Defense (WIN) | `attacking.service.ts` | IF defender wins: reduce defender losses by defender's bonus |
| [ ] PvP Defense (LOSE) | `attacking.service.ts` | IF defender loses: ALL defender troops die (NO bonus) |
| [ ] PvE/Boss (ALWAYS) | `boss.service.ts` | Always reduce troop losses by bonus |

**4. Silent Stealth (Scout Success +10/20/30%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] Scout detection | `scouting.service.ts` (new) | Reduce detection chance by bonus |

**5. Filthy Thief (PvP Loot +10/20/30%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] Resource stealing | `attacking.service.ts` | Multiply stolen resources by bonus (ATTACKER side) |

**6. Gold Rush (Resource Production +5/10/15%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] Backend production | `dbUpdator/db-updator.js` | Multiply wood/stone/crop production by bonus |
| [ ] Client interval | `interval.service.ts` | Multiply production speed by bonus |
| [ ] Wood Factory display | `wood-factory.component.ts` | Show boosted production rate |
| [ ] Stone Mine display | `stone-mine.component.ts` | Show boosted production rate |
| [ ] Crop Farm display | `crop-farm.component.ts` | Show boosted production rate |
| [ ] Toolbar tooltips | `top-toolbar.component.ts` | Calculate time-to-max with bonus |

**7. Quick Step (Troop Movement +5/10/15%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] Attack travel time | `attacking.service.ts` (new) | Reduce travel time by bonus |
| [ ] Scout travel time | `scouting.service.ts` (new) | Reduce travel time by bonus |
| [ ] Travel time display | Attack confirmation modal | Show reduced ETA |

**8. Adrenaline Surge (Energy Regen +5/10/15%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] Backend energy regen | `dbUpdator/db-updator.js` | Multiply energy production by bonus |
| [ ] Client interval | `interval.service.ts` | Multiply energy regen by bonus |
| [ ] Energy timer display | `top-toolbar.component.ts` | Show reduced time-to-next-energy |
| [ ] Time to max energy | `top-toolbar.component.ts` | Calculate with bonus |

**9. Iron Vault (Unstealable Resources 10/20/30%)**
| Location | File (approximate) | What to do |
|----------|-------------------|------------|
| [ ] Resource stealing | `attacking.service.ts` | DEFENDER's bonus reduces what attacker can steal |
| [ ] Protected display | Resource tooltips | Show "X% protected from raids" in tooltips |

**⚠️ OPEN QUESTION: Should attacker see defender's Iron Vault protected amount in attack confirmation?**

---

**Testing Checklist:**
- [ ] Test each skill individually
- [ ] Test skill combinations
- [ ] Test with 0 skills (no bonuses)
- [ ] Test max skills (edge cases)
- [ ] Verify bonuses stack correctly (not compounding)
- [ ] Check both attacker AND defender perspectives for combat skills

---

### 1. Achievements & Titles
**Priority:** High  
**Complexity:** Medium

**Description:**  
Achievement system with titles that players can display on their profile.

**Stats Tracking:**
- **Weekly stats** (reset every week):
  - Damage dealt to bosses
  - Resources stolen
  - Successful defenses
- **Total stats** (never reset):
  - Lifetime boss damage
  - Lifetime resources stolen
  - Total battles won

**Boss Raid Reports:**
- Boss raid results should go to **Battle Reports** inbox (NOT show in boss modal)
- Allows players to see historical boss damage, troop losses, etc.
- Can track "how many troops did I lose to bosses this week?"
- Consistent with all other combat reports being in one place

**Titles (examples):**
- "Boss Slayer" - Deal 1M total damage to bosses
- "Raider" - Steal 10M resources
- "Iron Wall" - Successfully defend 100 attacks
- "Warlord" - Win 500 battles

**Implementation:**
- [ ] Add weekly/total stats fields to User model
- [ ] Weekly reset job (cron/scheduled task)
- [ ] Achievement definitions with thresholds
- [ ] Title selection UI in profile
- [ ] Display selected title on player profile/attacks

---

### 2. Scouting System
**Priority:** High  
**Complexity:** Medium-High

**Description:**  
Scout enemy villages before attacking. RNG-based detection creates tension.
"You messed with someone - now wait nervously to see if you got caught."

**Core Design:**
- Scouting costs **an available spy** (not energy — energy is for PvP and PvE only)
- Scout travels to target (takes time like troops)
- On arrival: RNG roll determines if caught
- If caught: scout fails, defender gets alert with attacker name; the spy is lost (dies)
- If success: full report delivered; spy returns home automatically

**Travel Time:**
- Spies move at Horsemen speed (fastest troop)
- No speed bonus from Stable (Stable gives detection reduction + spy capacity instead)
- **Quick Step skill DOES affect spy speed** (+5/10/15% faster spies)
- Creates anticipation while waiting for result

**✅ Design Decision: Quick Step affects ALL movement (troops + spies)**
- Consistency: One skill for all movement speed
- Makes Quick Step more attractive vs "obvious" Attack/Defense picks
- Creates build variety: "Fast army + fast spies" is a viable identity

**Detection Formula:**
```
base_detection = 40%
detection_chance = base_detection 
                 + (wall_level * 3%)        // Wall increases detection
                 - (stable_level * 2%)      // Stable decreases detection
                 - (silent_stealth_bonus)   // Silent Stealth skill decreases detection
```

| Factor | Effect |
|--------|--------|
| Wall Level 1-10 | +3% to +30% detection |
| Stable Level 1-10 | -2% to -20% detection |
| Silent Stealth I/II/III | -10% / -20% / -30% detection |

**Example scenarios:**
- No stable, no stealth vs Wall 10: 40% + 30% = **70% caught**
- Stable 10, Silent Stealth III vs Wall 10: 40% + 30% - 20% - 30% = **20% caught**

**✅ Max Spy Stealth Balance (documented):**
```
Base detection:      40%
Wall 10 bonus:      +30%
Stable 10 reduction: -20%
Silent Stealth III:  -30%
─────────────────────────
TOTAL:               20% chance caught
```
A dedicated spy build (Stable 10 + Silent Stealth III) has only 20% detection vs max Wall.
This is the intended balance ceiling for scouting.

**Silent Stealth Skill (from Skill Tree):**
- Tier I: -10% detection chance (1 skill point)
- Tier II: -20% detection chance (2 skill points total)
- Tier III: -30% detection chance (3 skill points total)

**Scout Report Shows (on success):**
- Troop counts (exact numbers)
- Resource levels
- Wall level
- Village trait & Academy level
- "Attack" button directly from report

**Player Experience Flow:**
1. Click enemy village → "Scout" button
2. Confirmation: "Scout will arrive in 12 minutes. Available spies: 4/5 → 3/5 while on mission. Proceed?"
3. Wait nervously...
4. Result arrives:
   - SUCCESS: Full report in inbox; spy returns home → available spies restore automatically
   - CAUGHT: "Your scout was caught by [DefenderName]!"; spy is lost → alive count drops (e.g. 4/4), regenerates to max over 12 hours
5. Defender (if caught): Alert "⚠️ [AttackerName] tried to scout your village!"

**Spy Reports Location:**
All spy reports go to **Battle Reports** inbox (same place as attack reports).

| Report Type | Clickable? | What it shows |
|-------------|------------|---------------|
| Your spy - SUCCESS | ✅ Yes | Full report with troops, resources, wall level, Academy level |
| Your spy - CAUGHT | ❌ No | "Your spy on [VillageName] was caught." (just text) |
| Enemy spy - CAUGHT | ❌ No | "[PlayerName] tried to spy on your village." (just text) |

**⚠️ OPEN QUESTION: Should successful scout reports also show the defender's learned skills?**
- This would give valuable intel (knowing their attack/defense bonuses)
- But might make scouting too powerful?
- See Open Questions section for options

**Why in Battle Reports:**
- Players can see spy history (how many attempts last week, etc.)
- Consistent with attack reports location
- One place for all combat/intel activity

**Implementation:**
- [ ] New building: Stable (see section below) — required for spy capacity
- [ ] Skill Tree must be implemented first (Silent Stealth skill)
- [ ] Scout button on village interaction popup (disabled if `availableSpies === 0`)
- [ ] Travel time calculation (same as troops, at Horsemen speed)
- [ ] "Scout in transit" state tracking (decrement `availableSpies` while spy is out)
- [ ] On spy return — SUCCESS: restore `availableSpies` (spy comes home)
- [ ] On spy return — CAUGHT: decrement `aliveSpies` (spy is dead); trigger 1-day regen to max
- [ ] Detection RNG roll on arrival (factoring Wall, Stable, Silent Stealth)
- [ ] Scout report component/UI (clickable for success, non-clickable for failures)
- [ ] Spy reports stored in Battle Reports inbox
- [ ] Alert system for defender when scout caught
- [ ] Confirmation modal shows current available spies count

---

### 2b. New Building: Stable
**Priority:** High (required for Scouting)  
**Complexity:** Medium

**Description:**  
New building that improves scouting capabilities. Future use for cavalry too.

**Spy Movement Speed:**
- Spies move at the same speed as Horsemen (fastest troop)
- Speed not yet defined in troopsConsts - needs to be added

**✅ DECIDED: Option B - Detection Reduction + Spy Capacity**

**Final Design (Benefits per level) - Max Level 10:**
| Level | Detection Reduction | Max Spies (Capacity) | Note |
|-------|---------------------|----------------------|------|
| 1 | -2% detection | 1 spy | Starting spy |
| 2 | -4% detection | 1 spy | "Next level unlocks another spy." |
| 3 | -6% detection | 2 spies | Unlocks 2nd spy |
| 4 | -8% detection | 2 spies | "Next level unlocks another spy." |
| 5 | -10% detection | 3 spies | Unlocks 3rd spy |
| 6 | -12% detection | 3 spies | "Next level unlocks another spy." |
| 7 | -14% detection | 4 spies | Unlocks 4th spy |
| 8 | -16% detection | 4 spies | "Next level unlocks another spy." |
| 9 | -18% detection | 5 spies | Unlocks 5th spy |
| 10 | -20% detection | 5 spies | Max spies reached |

**Rule: A new spy is unlocked every 2 levels (at levels 1, 3, 5, 7, 9).**

**UI Message:**
When the player is on an even level (2, 4, 6, 8), the Stable page shows:
> "Next level unlocks another spy."

This message is NOT shown at odd levels or at max level (10).

---

**Spy State System:**

Spies are a living resource — not an energy cost. Spying consumes an available spy for the duration of the mission.

| State | Available Spies | Explanation |
|-------|----------------|-------------|
| Spy at home, all alive | 5/5 | All spies idle |
| Spy on mission (traveling) | 4/5 | 1 spy out, 4 available |
| Spy returns safely | 5/5 | Spy comes home, automatically restored |
| Spy caught (dies) | 4/4 | Total alive drops; regenerates to 5/5 over 12 hours |

**Detailed Example (Stable level 10 = 5 spies):**
1. You have **5/5** spies available
2. You send a spy → **4/5** (spy is en route, 1 out)
3a. Spy returns safely → **5/5** (automatic restore on arrival)
3b. Spy gets caught →
   - Spy dies → now **4/4** alive spies
   - Over 12 hours → regenerates back to **5/5**

**Key rules:**
- `maxSpies` = capacity from Stable level (1–5 based on level tier)
- `aliveSpies` = spies currently living (can be less than max if caught)
- `availableSpies` = `aliveSpies` − spies currently on mission
- Sending a spy requires `availableSpies > 0`
- Dead spies regenerate to full capacity over **12 hours** (not instantly)
- A spy on a mission is unavailable but not dead — they are just away

**Why this design:**
- Spies already move at Horsemen speed (fastest) — speed bonus would be redundant
- Spy capacity creates meaningful progression: "Do I upgrade Stable to run more intel operations?"
- High-level players can scout multiple targets simultaneously
- The spy death/regen loop creates real stakes — getting caught has a cost that lingers
- Energy stays reserved for PvP and PvE combat actions

**No speed bonus from Stable** — spies are already fast.

---

**Building Costs (similar to Arsenal):**
- Primarily wood (horses need stables)
- Medium stone
- Low crop

**Future Uses:**
- Could affect Horsemen training time
- Could affect troop movement speed (Quick Step synergy)
- Could unlock cavalry-related features

**Current State (Partial Implementation):**
- [x] Added to village map (area coords done)
- [x] Added to BuildingTypes enum (index 12)
- [x] Level indicator div exists in HTML
- [ ] Level indicator position NOT calibrated (left: 380px, top: 750px - needs adjustment)
- [ ] Clicking does nothing (no route/component yet)
- [ ] stableLevel NOT in BuildingsLevels model (server + client)
- [ ] No Stable component created
- [ ] No upgrade costs defined
- [ ] No migration script for existing users
- [ ] Not integrated with scouting system yet

**Remaining Implementation:**
- [ ] Add stableLevel to BuildingsLevels (client model)
- [ ] Add stableLevel to BuildingsLevels (server model)
- [ ] Create Stable component (copy Arsenal pattern)
- [ ] Define upgrade costs in utils
- [ ] Add route for /Stable
- [ ] Calibrate level indicator position on map
- [ ] Migration script: add stableLevel: 0 to all existing villages
- [ ] Integrate with scouting detection formula
- [ ] Integrate with scout travel time
- [ ] Add `maxSpies` calculation utility (based on stable level: levels 1-2 → 1, 3-4 → 2, 5-6 → 3, 7-8 → 4, 9-10 → 5)
- [ ] Add `aliveSpies` and `spiesOnMission` fields to village model
- [ ] Migration script: set aliveSpies = maxSpies for existing villages
- [ ] Spy regen job in db-updator (dead spies recover to max capacity over 12 hours)
- [ ] Stable UI shows "Next level unlocks another spy." when at even level (2, 4, 6, 8)
- [ ] Block scout action if `availableSpies === 0`

---

### 2c. Spy Count in Top Toolbar
**Priority:** High (ships with Scouting)
**Complexity:** Low

**Description:**
Show the player's available spy count in the top toolbar so they always know their scouting capacity at a glance.

**Display:**
- Show `availableSpies / maxSpies` (e.g. `4/5`) with a spy icon in the top toolbar
- Only shown when the player has a Stable (stableLevel > 0)

**Hover Tooltip — only shown when at least one spy has died:**

| Alive vs Max | Tooltip text |
|---|---|
| 4/5 (one dead) | "One of your spies died. A new spy will be available in: **HH:MM:SS**" |
| 3/5 (two dead) | "Two of your spies died. A new spy will be available in: **HH:MM:SS**" |
| 2/5 (three dead) | "Three of your spies died. A new spy will be available in: **HH:MM:SS**" |
| ... | ... |

The countdown shows time until the **next** spy regenerates (not all of them — each one recovers on its own 12-hour timer from when it died).

**No tooltip** is shown when `aliveSpies === maxSpies` (all spies alive, nothing to report).

**Implementation:**
- [ ] Add spy icon to top toolbar assets
- [ ] Display `availableSpies / maxSpies` in top toolbar (hidden if no Stable)
- [ ] Track per-spy death timestamps to calculate per-spy regen countdowns
- [ ] Hover tooltip: shown only if `aliveSpies < maxSpies`; countdown to next regen; human-readable dead count ("One", "Two", "Three", etc.)
- [ ] Real-time countdown updates (same tick as energy timer)

---

### 3. Leaderboards
**Priority:** Medium  
**Complexity:** Low

**Categories (Weekly):**
- **Boss Damage** - Who dealt the most damage to raid bosses this week
- **Resource Raiders** - Who stole the most resources this week
- **Best Defenders** - Who defended successfully the most this week

**Display:**
- Top 10/25/50 players per category
- Reset weekly with previous week's winners archived

**✅ DECIDED: Clan Leaderboards Too**
- Same categories as individual leaderboards
- Aggregates all clan members' stats for the week
- Shows which clan dealt most boss damage, raided most, defended most

**Location in UI:**
- Statistics page → Third tab (next to "Players" and "Clans" tabs)

**Implementation:**
- [ ] Weekly stats already tracked via Achievements
- [ ] Leaderboard API endpoints (individual + clan aggregations)
- [ ] Leaderboard UI component in Statistics page (new tab)
- [ ] Weekly reset + archive previous winners
- [ ] Clan aggregation queries

---

### 3b. Village Power Display (Right Toolbar)
**Priority:** High  
**Complexity:** Low

**Description:**  
Show the player's accumulated Attack and Defense power in the right toolbar, below all troop counts.

**What to Display:**
- Accumulated Attack (sum of all your troops + clan support troops)
- Accumulated Defense (sum of all your troops + clan support troops)
- Uses same attack/defense icons as Arsenal page

**Location:**
- Right toolbar → Below the "Your Troops" and "Support Troops" containers
- Displayed in row or column layout (TBD, choose what looks better)

**Includes:**
- Your village troops
- Clan support troops defending your village
- Sharper Blades bonus (+5/10/15% attack)
- Heroic Shield bonus (+5/10/15% defense)

**Bug Fix:**
- Current containers in right toolbar have a visual bug where text gets cut off
- Fix this by either:
  - Making containers taller (more height)
  - Adding `overflow-y: auto` for scroll if content overflows
- Ensure the new Attack/Defense display doesn't get cut off either

**Implementation:**
- [ ] Calculate total attack power (troops + support + Sharper Blades bonus)
- [ ] Calculate total defense power (troops + support + Heroic Shield bonus)
- [ ] Display in right toolbar with icons
- [ ] Fix text cut-off bug in existing troop containers
- [ ] Test scrolling/overflow behavior

---

### 3c. Boss Battle Reports (Enhanced)
**Priority:** High  
**Complexity:** Medium

**Description:**  
Raid bosses should have their own unique battle reports, similar to PvP reports but with boss-specific info.

**What the Report Shows:**
```
╔══════════════════════════════════════════╗
║       BOSS RAID REPORT                   ║
╠══════════════════════════════════════════╣
║  [BOSS IMAGE HERE - Epic Dragon etc.]    ║
║                                          ║
║  YOUR TROOPS                             ║
║  ┌─────────────────────────────────────┐ ║
║  │ Spearmen: 500 → 423 (-77)           │ ║
║  │ Axe Fighters: 200 → 156 (-44)       │ ║
║  │ Archers: 100 → 0 (-100)             │ ║
║  │ ...                                 │ ║
║  └─────────────────────────────────────┘ ║
║                                          ║
║  BOSS HEALTH                             ║
║  ┌─────────────────────────────────────┐ ║
║  │ Before: 50,000 HP                   │ ║
║  │ Damage: -15,234 HP                  │ ║
║  │ After: 34,766 HP                    │ ║
║  │ [████████░░░░░░░░░] 69.5%          │ ║
║  └─────────────────────────────────────┘ ║
║                                          ║
║  REWARD: [loot if boss killed]           ║
╚══════════════════════════════════════════╝
```

**Key Elements:**
- Boss picture (Epic, Rare, etc.)
- Your troops: before → after (with losses shown)
- Boss HP: before, damage dealt, after
- HP progress bar showing current boss health
- Reward section (if boss was killed and dropped loot)

**Location:**
- Battle Reports inbox (same as PvP reports and spy reports)

**Implementation:**
- [ ] Boss raid report model/DTO
- [ ] Boss image integration in report
- [ ] Troop loss display (same format as PvP)
- [ ] Boss HP before/after/damage calculation
- [ ] HP progress bar component
- [ ] Store boss raid reports in Battle Reports
- [ ] Different styling/icon to distinguish from PvP reports

---

### 4. Theme Chooser
**Priority:** Low  
**Complexity:** Low

**Description:**  
Let players customize UI colors. Preference persists per user.

**Theme Options (ideas):**
- Default (current brown/gold)
- Dark mode
- Ocean blue
- Forest green
- Blood red
- Royal purple

**Implementation:**
- [ ] Add `theme` field to User model
- [ ] CSS variables for theme colors
- [ ] Theme selector in settings/profile
- [ ] Apply theme on login

---

### 5. Travel Time System (Attacks, Support, Resources)
**Priority:** High  
**Complexity:** High

**Description:**  
All troop and resource movements take time based on grid distance.
This applies to: attacks (PvP + PvE), support troops to clan, resource transfers, and return trips.

---

**5a. Unique Troop Movement Speeds**

Each troop type has a unique movement speed, defined in utils and shown in Arsenal page.

**✅ FINAL DECIDED VALUES:**
| Troop | Speed (tiles/min) | Notes |
|-------|-------------------|-------|
| Spear Fighter | 7 | Light infantry |
| Sword Fighter | 7 | Light infantry (same as Spear) |
| Axe Fighter | 3 | Heavy infantry, slow — balanced by best attack efficiency |
| Archer | 8 | Fast — balanced by mid-tier efficiency |
| Magician | 5 | Slow caster — balanced by best defense efficiency |
| Horsemen | 20 | Fastest troop (also SPY speed) |
| Catapults | 1 | Very slow siege |

**Rule: Your army moves at the speed of your SLOWEST troop.**

Example: 100 Horsemen (20) + 50 Catapults (1) = army moves at speed 1.

**Speed Display:**
- Requires a **speed icon** from user (see Open Questions #6)
- Must be shown in: Arsenal (training), PvP attack troop selection, Boss attack troop selection

**Implementation:**
- [ ] Add `movementSpeed` to each troop in `troopsConsts.ts`
- [ ] Display speed in Arsenal page for each troop (needs speed icon)
- [ ] Display speed in PvP attack troop selection (needs speed icon)
- [ ] Display speed in Boss attack troop selection (needs speed icon)
- [ ] Calculate army speed as `min(all troop speeds in army)`

---

**5b. Attack Travel Time (PvP + PvE)**

**Formula:**
```
distance = sqrt((x2-x1)² + (y2-y1)²)
army_speed = min(speed of all troops in army)
speed_with_bonus = army_speed * (1 + quick_step_bonus)
travel_time_minutes = distance / speed_with_bonus
```

**Implementation:**
- [ ] Distance calculation utility
- [ ] Travel time display in attack confirmation ("Troops will arrive in 23 minutes")
- [ ] "Troops in transit" state - can't use those troops elsewhere
- [ ] Arrival time tracking in database
- [ ] Execute attack on arrival (scheduled job or polling)

---

**5c. Return Trip After Attack**

After attack completes, **surviving troops return home**.

**⚠️ IMPORTANT:** The slowest troop might have died!
- You sent: Horsemen (15) + Catapults (3) → traveled at speed 3
- Catapults all died in battle
- Return trip: Only Horsemen survive → return at speed 15 (faster!)

**Implementation:**
- [ ] After battle calculation, determine surviving troops
- [ ] Calculate return speed based on survivors' slowest troop
- [ ] Track return trip separately
- [ ] Troops unavailable until they return home
- [ ] Show "Troops returning in X minutes" in UI

---

**5d. Support Troops to Clan**

When you send support troops to a clanmate's village, it takes time.

**Same formula as attacks** - based on distance and slowest troop.

**Implementation:**
- [ ] Support sending takes travel time
- [ ] Show ETA before confirming support send
- [ ] Track support "in transit"
- [ ] Receiving player sees "Support from [Name] arriving in X minutes"

---

**5e. Resource Transfers**

When you send resources to a clanmate, it takes time too.

**Formula:** Same distance calculation, but fixed speed (e.g., merchant cart speed).

**Visibility:**
- Sender sees: "Resources will arrive in 20 minutes" (with progress)
- Receiver sees: "Resources from [Name] arriving in 20 minutes" (with progress)

**Implementation:**
- [ ] Resource transfer takes travel time
- [ ] Both sender and receiver can see progress
- [ ] Resources "in transit" - deducted from sender immediately
- [ ] Resources arrive at receiver after travel time

---

**5f. Incoming Attack Visibility (CRITICAL UX)**

**Like Travian:** Players MUST clearly see incoming attacks on their home page.

**Display on Main Panel (always visible, all villages):**
```
⚠️ INCOMING ATTACKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗡️ 3 players are attacking you
   → Village "Main Base" in 12 min
   → Village "Outpost" in 34 min
   → Village "Main Base" in 45 min

⚔️ 4 of your attacks in progress
   → Raid Boss (Epic) arrives in 8 min
   → PlayerX arrives in 15 min
   → Raid Boss (Rare) arrives in 22 min
   → PlayerY arrives in 1h 3min
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Rules:**
- Show incoming attacks to ANY of your villages (not just current one)
- Show YOUR outgoing attacks/raids
- Sorted by arrival time (soonest first)
- Clicking an entry could jump to that village or show details

**Implementation:**
- [ ] Global "movements" tracker in user data
- [ ] Incoming attacks panel on main page (always visible)
- [ ] Shows attacks to ALL your villages
- [ ] Real-time countdown timers
- [ ] Outgoing attacks/raids section
- [ ] Clicking navigates to relevant village/target

---

**Full Implementation Checklist:**
- [ ] Skill Tree must be implemented first (Quick Step skill)
- [ ] Troop speeds in utils
- [ ] Arsenal page shows troop speeds
- [ ] Distance calculation utility
- [ ] Army speed calculation (slowest troop)
- [ ] Attack travel time + return trip
- [ ] Support troop travel time
- [ ] Resource transfer travel time
- [ ] Incoming/outgoing movements panel on main page
- [ ] Real-time countdown timers
- [ ] "In transit" states for troops and resources
- [ ] Scheduled execution on arrival (attacks, support, resources)

---

### 6. Clan Chat
**Priority:** Medium  
**Complexity:** Medium

**Description:**  
In-clan messaging system. Messages persist for 1 week.

**Features:**
- Real-time or near-real-time chat
- Messages auto-delete after 7 days
- Leader messages are always visually distinct (bold blue) — every message they send, regardless of tone
- Useful for coordinating boss attacks, warnings, celebrations, etc.

**✅ DECIDED: Leader Message Styling**
- **All** messages sent by the clan leader are rendered in bold blue
- This is not a special "yell mode" the leader activates — it is simply how leader messages always look
- The distinction exists so clan members immediately know when a message is from their leader, whatever it says
- Normal members' messages use the standard (non-bold) style

**✅ DECIDED: WebSocket + HTTP**
- WebSocket for live real-time updates
- HTTP for loading chat history

**Implementation:**
- [ ] Chat messages collection/table (store sender role alongside each message)
- [ ] Clan chat HTTP endpoints (send, get history)
- [ ] WebSocket for real-time message push
- [ ] Chat UI component in clan page
- [ ] Auto-cleanup job for messages older than 7 days
- [ ] Leader message styling: bold blue for all leader messages (role-based, not a toggle)

---

## Priority Order

1. **Skill Tree System** - MUST come first, replaces traits, required by other features
2. **Village Power Display** - Quick win, improves UX
3. **Boss Battle Reports** - Quick win, improves UX
4. **Attack Travel Time** - Changes core gameplay (requires Quick Step skill)
5. **Stable Building** - Required for scouting
6. **Scouting** - Adds strategy depth (requires Stable + Silent Stealth skill)
7. **Achievements & Titles** - Player engagement/retention
8. **Leaderboards** - Competition, uses achievement stats
9. **Clan Chat** - Social feature
10. **Theme Chooser** - Nice to have, low priority

---

## ✅ DECIDED QUESTIONS

### Terminology: Skills
**DECIDED:** Use "Skills" terminology everywhere.
- UI: "Skill Tree", "Skill Points", "Learn Skill", "Reset Skills"
- Codebase: `skills`, `skillPoints`, `learnedSkills`, etc.
- NOT perks, traits, talents, or abilities

### Iron Vault Visibility
**DECIDED:** Hidden from attacker.
- Attacker does NOT see defender's Iron Vault protected amount in attack confirmation
- Adds uncertainty to raiding ("will this be worth it?")
- If you want intel, scout first

---

## ⚠️ OPEN QUESTIONS (Need Decisions)

### 1. Troop Movement Speeds
**Status:** ✅ DECIDED

**Version 1 (archived):**

| Troop | Attack | Defense | Wood | Stone | Crop | Total Cost | Speed | Cost/Atk | Cost/Def | Role |
|-------|--------|---------|------|-------|------|------------|-------|----------|----------|------|
| Spear Fighter | 4 | 2 | 100 | 100 | 500 | 700 | 7 | **175** 🥇 | 350 | Best attack efficiency |
| Sword Fighter | 2 | 4 | 100 | 100 | 500 | 700 | 7 | 350 | **175** 🥇 | Best defense efficiency |
| Axe Fighter | 10 | 3 | 750 | 750 | 1500 | 3000 | 3 | 300 🥈 | 1000 | 2nd best attacker, slow |
| Archer | 10 | 10 | 2000 | 2000 | 2000 | 6000 | 8 | 600 | 600 | Balanced + fast |
| Magician | 15 | 30 | 3500 | 3500 | 5000 | 12000 | 5 | 800 | 400 🥈 | 2nd best defender, slow |
| Horsemen | 35 | 25 | 9000 | 9000 | 9000 | 27000 | 20 | 771 | 1080 | Speed specialist, spy speed |
| Catapults | 200 | 5 | 25000 | 25000 | 25000 | 75000 | 1 | 375 | 15000 | Endgame nuke, very slow |

---

**✅ Version 2 — Current (source of truth):**

| Troop | Attack | Defense | Wood | Stone | Crop | Total Cost | Speed | Cost/Atk | Cost/Def | Stats/1k mats | Role |
|-------|--------|---------|------|-------|------|------------|-------|----------|----------|---------------|------|
| Spear Fighter | 4 | 2 | 250 | 250 | 500 | 1000 | 7 | 250 | 500 | 6.0 | Cheap starter attacker |
| Sword Fighter | 2 | 4 | 250 | 250 | 500 | 1000 | 7 | 500 | **250** 🥇 | 6.0 | Best defense efficiency |
| Axe Fighter | 13 | 5 | 750 | 750 | 1500 | 3000 | 3 | **231** 🥇 | 600 | 6.0 | Best attacker, slow |
| Archer | 15 | 15 | 1500 | 1500 | 2000 | 5000 | 8 | 333 | 333 | 6.0 | Balanced + fast |
| Magician | 20 | 40 | 3500 | 3500 | 5000 | 12000 | 5 | 600 | **300** 🥈 | 5.0 | Elite defender, strong attacker |
| Horsemen | 50 | 30 | 10000 | 10000 | 10000 | 30000 | 20 | 600 | 1000 | 2.7 | Pure speed luxury, ties mage on attack efficiency |
| Catapults | 200 | 5 | 25000 | 25000 | 25000 | 75000 | 1 | 375 | 15000 | 2.7 | Endgame nuke, very slow |

**Design Philosophy v2:**
- **Spear/Sword/Axe/Archer** all have exactly **6.0 stats per 1000 materials** — equal overall efficiency, just different stat distributions and speeds. Players choose based on role, not efficiency.
- **Spear** = cheap starter attacker, replaced by axe as you grow
- **Sword** = best defender per material, stays relevant all game
- **Axe** = best attacker per material, very slow — good for planned raids
- **Archer** = perfectly balanced 15/15, fast — the versatile all-rounder
- **Magician** = elite defender (300 cost/def beats archer's 333), also strong attacker — expensive but powerful
- **Horsemen** = pure speed luxury (2.5 stats/1000 mats) — you pay for speed 20, not efficiency
- **Catapult** = insane raw attack (200), endgame only, glacially slow

**Rule: Army moves at SLOWEST troop speed.**

**Timing Table (what speeds mean in practice):**

| Distance | Catapult (1) | Axe (3) | Magician (5) | Spear/Sword (7) | Archer (8) | Horsemen (20) |
|----------|--------------|---------|--------------|-----------------|------------|---------------|
| 10 tiles (neighbor) | 10 min | 3.3 min | 2 min | 1.4 min | 1.3 min | 30 sec |
| 30 tiles (nearby) | 30 min | 10 min | 6 min | 4.3 min | 3.8 min | 1.5 min |
| 60 tiles (medium) | 60 min | 20 min | 12 min | 8.6 min | 7.5 min | 3 min |
| 100 tiles (far) | 100 min | 33 min | 20 min | 14.3 min | 12.5 min | 5 min |
| 150 tiles (cross-map) | 150 min | 50 min | 30 min | 21 min | 19 min | 7.5 min |

**Remember:** 100 Horsemen + 1 Catapult = 100+ min to travel 100 tiles (not 5 min)!

**Speed Display (pending user icon):**
- Speed stat must be shown in **Arsenal** when training troops (requires speed icon - see Open Questions #5)
- Speed stat must be shown when **selecting troops for PvP attack**
- Speed stat must be shown when **selecting troops for Boss attack**
- ⚠️ Requires speed icon from user before UI implementation

---

### 2. Troop Loot Capacity
**Status:** ✅ DECIDED — Keep equal

All troops carry the same loot amount (`lootingAbilityOfTroops = 175` per troop, already in `troopsConsts.ts`).
Differentiating loot capacity adds too much balancing complexity without enough payoff.
Filthy Thief skill applies as a percentage bonus on top of the flat 175 × troop count.

---

### 3. Heroic Shield + Support Troops
**Status:** ✅ DECIDED — Option A (total defense multiplied by YOUR Heroic Shield)

**Formula:**
```
total_defense = (wall_defense + your_troops_defense + support_troops_defense) * heroic_shield_bonus
```

Simple, linear, predictable. The Heroic Shield owner's bonus applies to everything defending their village.
This makes Heroic Shield more valuable (rewards investing in it) and is easy for players to understand.
No per-troop tracking needed — just multiply the final total.

---

### 4. Skills in Scout Reports
**Status:** ⚠️ LEANING TOWARDS DECIDED — Skills stay secret (Option B)

**Question:** When a spy successfully scouts an enemy, should they see the enemy's learned skills?

**Options:**
- A) Yes - full intel on their build → very valuable scouting
- B) **No** - only troops/resources/wall/academy level → skills stay secret ← **current lean**
- C) Partial - show categories invested but not exact tier (e.g., "Sharper Blades: ●●○")

**Reasoning for B:**
- Skills are a strategic identity — revealing them removes the element of surprise
- If you want to know their build, you have to attack and find out
- Academy level is shown (so you know how many skill points they have), just not where they spent them
- Makes the skill system feel more like a hidden "spec" which adds depth

**Reasoning for A (counterargument):**
- Scouting feels more rewarding if it gives full intel
- Players can plan better counter-attacks

**✅ DECIDED: Option B — Skills stay secret.**

**Reasoning:**
- Revealing skills is not just stat intel — it exposes the player's entire strategic identity (raider? turtle? spy build? farmer?)
- The defender doesn't even know they've been exposed, with no way to adapt
- Real scout value = "how many troops do they have, can I beat them?" — that's what changes your immediate decision
- Skill build is long-term personality, discoverable over time through battles, not a one-scout reveal
- Academy level IS shown → opponent knows "they have 14 skill points somewhere" but not where → great tension

**Implement as:** Scout report shows troop counts, resources, wall level, and Academy level. Skills learned are NOT shown.

---

### 5. Skill Icons
**Status:** WAITING FOR USER

User will provide icons for all 9 skill categories:
- [ ] Sharper Blades (Attack)
- [ ] Heroic Shield (Defense)
- [ ] Silent Stealth (Scouting)
- [ ] Filthy Thief (PvP loot)
- [ ] Gold Rush (Resources)
- [ ] Quick Step (Speed)
- [ ] Adrenaline Surge (Energy)
- [ ] Iron Vault (Protection)
- [ ] Self Defense (Troop survival)

Until icons are provided, skill UI cannot be fully implemented.

---

### 6. Speed Stat Icon
**Status:** WAITING FOR USER

A **speed icon** is needed to display troop movement speed in:
1. **Arsenal page** — shown next to each troop when training, so players know how fast each unit is
2. **PvP attack troop selection** — shown so players can calculate expected travel time
3. **Boss attack troop selection** — same as above

**What to provide:** One icon representing "movement speed" / "troop speed" (e.g., boots, lightning bolt, footsteps — whatever fits the game's art style).

Until this icon is provided, speed stat display in UI cannot be implemented (the stat will still exist in code, just not shown visually).

---

---

## 🏆 ENDGAME SCENARIO — The Divine Relics

### Overview
The endgame win condition is **clan-based** — no individual player wins. A clan wins the game by **simultaneously holding all 5 Divine Relics**.

This creates the most intense late-game experience: multi-clan warfare, giant nukes, paranoid defense, and global drama as everyone watches the leaderboard.

---

### The 5 Divine Relics

Each relic is a **godly object of power** with its own unique name, identity, and icon. They are not "piece 1 of 5" — each one feels legendary and worth dying for on its own. Together, collecting all 5 completes a divine ritual and wins the game.

**Lore:** These are the 5 objects the gods left behind when they abandoned this world. Whoever collects all of them can call the gods back — or become one.

**The 5 Divine Relics:**

| Relic | Godly Feeling / Inspiration |
|-------|-----------------------------|
| 🍎 **The Apple of Eternity** | Forbidden knowledge, immortality — Eden / Garden of Hesperides |
| 🔥 **The Eternal Flame** | Divine fire stolen from the gods — Prometheus |
| ⚗️ **The Chalice of Ascension** | Holy Grail energy — whoever possesses it is destined to rule |
| 👁️ **The All-Seeing Orb** | Divine omniscience — the gods watched the world through this |
| ⚡ **The Sigil of Creation** | The mark that created the world — ultimate divine authority |

**⚠️ WAITING FOR USER: Icons for all 5 relics** (one unique icon per relic, fitting the game's art style)

**UI Display — "Infinity Gauntlet" style:**
Show all 5 relics at once in a dedicated display (clan statistics, embassy relic page, etc.). Relics your clan holds are shown fully — glowing, vivid, alive. Relics you don't hold are shown as dark/faded silhouettes in their slots. The "we're missing just one" feeling is immediate and powerful.

**⚠️ OPEN: Think of a cool UI layout to display all 5 together** — inspired by how Thanos's gauntlet shows all 6 infinity stones at once. Each relic has its own slot. Could be a stone altar, an ancient tablet with carved slots, or any other thematically fitting container. To be designed.

---

### How to Obtain a Divine Relic — The Mythic Boss

**A new boss tier: Mythic Boss** (above Legendary).

| Property | Value |
|----------|-------|
| HP | ~100-200x stronger than Legendary boss |
| Time limit | None — it stays until defeated |
| Spawn rate | **Random — 1% chance per day** (coin flip every day) |
| Reward | The Divine Relic goes to the clan that dealt the **most total damage** |
| Announcement | Full **damage leaderboard** is visible to all players |

**Why random spawn?**
- Fixed dates feel artificial and "scheduled"
- Random creates genuine excitement — any day could be THE day
- 1% daily = roughly one spawn per ~3 months on average, making each one a major event

**Why most damage wins (not first to claim)?**
- Prevents a single fast clan from locking others out
- Encourages every clan to attack — the more you attack, the more you contribute
- Creates chaotic multi-clan battles on the same boss

---

### Holding a Divine Relic

- The relic is held by **one specific player** in the clan (not just "the clan" abstractly)
- **One player CAN hold multiple relics** — it's a strategic choice with high risk. If that player is defeated, all their relics are stolen at once. A clan might concentrate relics on their strongest player or spread them across many players — both are valid strategies with different tradeoffs.
- The clan leader can see who holds each relic
- **Transfer rules:**
  - A relic can be transferred to another clan member **once per week** (or the clan leader can force-recall it to themselves)
  - While in transit: the relic **cannot be stolen** — but transit is limited to prevent abuse (always-in-transit = uncatchable)
  - This prevents the "infinite transfer" exploit where the relic is always moving

---

### Stealing a Divine Relic

To steal a relic, you must **attack the player holding it and completely wipe their defenses**:
- All of the holder's own troops must die
- All support troops from their clan must die
- If you win the battle under these conditions → you steal the relic

**This is intentionally hard.** A clan defending 4 relic holders simultaneously needs:
- Constant max support on 4 different players
- Resources to sustain that support
- While also training offensive troops to hunt the 5th relic

This creates the iconic endgame tension: your clan is simultaneously attacking AND defending, stretched thin on all fronts.

**The 100k Catapult Nuke:**
The hardest defense can be broken. 100k catapults = 200 * 100,000 = 20,000,000 attack. Max defense without support = 100k magicians = 40 * 100,000 = 4,000,000. Even with support from 20 clanmates, it's breakable with coordinated nukes. This is intentional — the endgame should be about mass coordination, not impenetrable turtling.

---

### Global Announcements

Every relic event is announced to **all players** globally:

| Event | Announcement |
|-------|-------------|
| Mythic Boss spawns | "⚡ A Mythic Boss has appeared at [coordinates]!" |
| Relic obtained | "👑 Clan [Name] has obtained [Relic Name]!" |
| Relic stolen | "⚔️ Clan [Attacker] stole [Relic Name] from [Defender] of clan [Name]!" |
| Clan wins | "🏆 Clan [Name] has collected all 5 Divine Relics and won the game!" |

The stolen announcement includes both the attacking clan AND the specific player who was attacked — public drama is intentional.

---

### Statistics Page — Divine Relics Column

In the **Clan Statistics table**, add a new column: **Divine Relics**.

- Each clan row shows the **icons** of the relics they currently hold
- Empty if none held
- This makes the current standings instantly visible to all players
- Creates pressure and target-painting on leading clans

---

### Win Condition

- **No time requirement** — the moment a clan simultaneously holds all 5 relics, they win
- The win triggers a global announcement
- What happens after winning? **Open question** — server reset? Hall of Fame? New season?

---

### Embassy — Relic Management Page

A dedicated page inside the **Embassy** building for managing divine relics. Visible to all clan members, but management actions are **clan leader only**.

---

**What all clan members see:**

A list of all 5 divine relics. For each relic the clan holds, it shows:
- The relic icon + name (in gold)
- The player currently holding it (name + village)
- Whether the relic is in cooldown (cannot be moved this week)

Members see this so they know **exactly who to send support troops to**. Everyone in the clan should know who the high-value targets are at all times. Note: this info can leak to other clans if a member shares it — that's part of the game.

---

**What the clan leader additionally sees:**

For each held relic, a **"Transfer Relic" button** (or similar action).

**Transfer flow (leader only):**
1. Leader clicks "Transfer Relic" on a specific relic
2. A **form** opens (not drag-and-drop — relics must be assigned to a specific village of a specific player):
   - Select player (dropdown of clan members)
   - Select village of that player (dropdown)
3. Leader clicks "Confirm Transfer"
4. A **confirmation modal** appears with two warnings:
   - ⚠️ "This relic cannot be moved again for 7 days. Choose carefully — only transfer to a well-supported village."
   - ⚠️ "Remember: the player receiving this relic can leave the clan and take it with them. Trust wisely."
5. Leader confirms → relic transfers → 7-day cooldown starts

**Why a form instead of drag-and-drop:**
Relics must be assigned to a specific village (not just a player — a player may have multiple villages with different defense levels). A form is clearer and safer for such a high-stakes action.

---

**What the relic holder sees:**

On the same page, if the current player is holding a relic, they see a personal notice below their relic:

> "You are holding the **[Relic Name]**. This relic belongs to your clan — protect it at all costs.
> ⚠️ Note: If you leave this clan, the relic leaves with you. Your clan cannot stop you."

This is the intentional hint that betray is possible. It's not hidden — players should know their own power.

---

**Transfer Cooldown Rules:**
- After any transfer (leader-initiated), the relic cannot be moved for **7 days**
- The cooldown is shown clearly on the relic card ("Transferable in 4 days")
- A player leaving the clan with a relic does NOT respect the cooldown — betrayal is always possible regardless
- This prevents the "always in transit = uncatchable" exploit while still allowing betrayal

---

### Implementation Checklist
- [ ] Design 5 relic names and icons (USER)
- [ ] New boss tier: Mythic Boss (stats, no time limit, rare spawn logic)
- [ ] Daily 1% spawn roll in db-updator
- [ ] Mythic boss damage leaderboard (per-clan tracking)
- [ ] Relic assignment on boss defeat (most damage wins)
- [ ] Relic holder tracking per player + village
- [ ] Embassy — Relic Management page (all members view + leader transfer form)
- [ ] Transfer form: select player → select village → confirmation modal with warnings
- [ ] 7-day transfer cooldown (leader-initiated transfers only, not betrayals)
- [ ] Holder warning message: hint about betrayal possibility
- [ ] Steal mechanic (wipe all defenses = steal relic)
- [ ] Global announcement system for all relic events (including betrayal 2-step)
- [ ] Relic names rendered in gold in all announcements
- [ ] Divine Relics column in clan statistics table (show icons)
- [ ] Win condition check (all 5 simultaneously)
- [ ] Post-win flow (TBD — see open questions)

---

### ⚠️ Betrayal Mechanic — Player Leaves Clan While Holding a Relic

A player holding a relic can **threaten their clan** or even **betray them** by leaving the clan while holding the object. When they leave, the relic leaves with them.

**The clan leader cannot do anything to stop it.** No force-recall. No override. If you trusted the wrong person, you pay the price.

**This is intentional and adds depth:**
- Creates internal clan politics and trust dynamics
- A disgruntled player is a genuine threat to the entire clan's endgame progress
- Clan leaders must manage relationships, not just battle strategy
- Creates leverage: "Give me [X] or I walk with the relic"

**Global Announcements for Betrayal:**

Two separate announcements, in sequence:

**Step 1 — Player leaves clan:**
> "Notice: Dor from clan Kings left with the **Divine Apple**" *(relic name shown in gold)*

**Step 2 — Player joins a new clan (if they do):**
> "Notice: Dor has joined clan Blizzards and they now hold the **Divine Apple**" *(relic name shown in gold)*

These are two separate messages because the player may **not** join another clan immediately — or ever. A clanless relic holder is completely exposed: no support troops from any clan, a solo target for every player in the game. This creates a unique scenario where the traitor becomes the hunted.

---

### Open Questions — Endgame
- [ ] **Final relic names and icons** (user to provide)
- [ ] **Post-win:** Fully decided — see "Server End State" section below. A new server opens automatically when a clan wins (see Multi-Server section).
- [ ] **Mythic Boss HP:** Exact value TBD (needs playtesting once travel time + nuke meta develops)
- [ ] **Betrayal mechanic — relic name color:** Relic names in global announcements should be rendered in gold. Requires rich-text support in the announcement system.

---

---

### 🏁 Server End State — What Happens When a Clan Wins

When a clan collects all 5 Divine Relics, the server **immediately enters a frozen read-only state**.

**Global win announcement (shown to all players):**
> "🏆 Clan [Name] has collected all 5 Divine Relics and won the game!"

---

**On next login (and every time a player opens the app on that server):**

A prominent banner or overlay is shown at the top of the screen:
> "**Clan [Name] has won this server.**"

This cannot be dismissed — it is permanently visible for the lifetime of the server.

---

**Read-only mode — all action buttons are disabled:**
- ❌ Cannot attack players
- ❌ Cannot attack raid bosses
- ❌ Cannot spy on anyone
- ❌ Cannot send support troops
- ❌ Cannot send resources
- ❌ Cannot train troops
- ❌ Cannot upgrade buildings
- ❌ Cannot transfer relics
- ❌ Cannot join or leave clans

**Still accessible (view only):**
- ✅ Navigate all pages freely
- ✅ Statistics page (players, clans, leaderboards)
- ✅ Map (view only, no interactions)
- ✅ Inbox / battle reports (read only)
- ✅ Village view (read only)
- ✅ Relic medallion — shows the final state, all 5 slots glowing for the winning clan

The server becomes a **living monument** — players can browse the final state, see who won, check the leaderboards, and reflect on the war. Then they join the new server and start fresh.

---

**Simultaneously:** A new server is automatically opened (see Multi-Server Architecture section).

---

**Implementation Checklist — Server End State:**
- [ ] `serverStatus` field in DB: `active` | `ended`
- [ ] When win condition triggers: set `serverStatus = ended`, record winning clan
- [ ] All action endpoints check `serverStatus` — return error if `ended`
- [ ] Frontend: on app load, check server status
- [ ] If ended: show permanent win banner with clan name
- [ ] If ended: disable all action buttons globally (single flag, not per-button)
- [ ] Statistics / map / inbox remain navigable in read-only mode

---

## 🌐 MULTI-SERVER ARCHITECTURE

### Overview
The game will support **multiple concurrent servers**. Each server is a fully independent game world — players, clans, villages, and relics are all scoped to their server. Servers cannot interact with each other.

**Trigger:** When an endgame win condition is reached on a server, a **new server automatically opens**, giving all players (and new players) a fresh world to compete in.

**Speed multiplier:** Current servers run at **x1 speed**. The architecture should be designed to support configurable speed multipliers per server (e.g., x2, x5 for future "fast servers"), even if this is not used at launch.

---

### Server Isolation Rules
- Every server has its own **completely separate database** (or database namespace)
- Players, clans, villages, bosses, relics — all scoped to one server
- A player account can exist on multiple servers simultaneously (they choose which server to join)
- No data leaks between servers — a player on Server 1 cannot see or interact with Server 2
- Global announcements are server-scoped (Server 1 players only see Server 1 events)

---

### ⚠️ Critical: Database Migration — Current Data → Server 1

**The current database has no concept of servers.** All collections (users, clans, villages, bosses, etc.) exist in a flat structure.

When multi-server is implemented, the existing data must be migrated to be **Server 1**:

- All existing users → Server 1
- All existing clans → Server 1
- All existing villages → Server 1
- All existing bosses/state → Server 1
- Every document/collection gets a `serverId: 1` field (or moves into a server-scoped database)

**This migration must be carefully planned and tested** — it touches every collection in the database. A rollback plan is required before executing.

---

### Architecture Options (to decide during implementation)

**Option A — Single DB, serverId field on every document**
- Add `serverId` to every collection
- All queries filtered by `serverId`
- Pro: one DB connection, simpler migration
- Con: collections grow indefinitely across all servers, harder to archive old servers cleanly

**Option B — Separate database per server**
- Server 1 → `pasiflora_server_1` DB
- Server 2 → `pasiflora_server_2` DB
- Pro: perfect isolation, easy to archive or delete ended servers
- Con: userService needs dynamic DB connection routing

**Recommendation:** Option B for true isolation and clean archival. Option A is acceptable for MVP.

---

### Frontend — Server Selection
- Players must be able to **choose which server to join** on registration or after a server ends
- A server lobby/selection screen shows available servers with status (active, ended, player count)
- The frontend passes `serverId` with every API request

---

### Implementation Checklist
- [ ] Decide: Option A (serverId field) vs Option B (separate DBs per server)
- [ ] **Database migration: tag all existing data as Server 1** *(most critical step)*
- [ ] userService: all queries scoped by serverId
- [ ] dbUpdator: server-aware (runs per-server or has serverId context)
- [ ] Auto-open new server when win condition triggers
- [ ] Server selection UI on frontend
- [ ] Speed multiplier field per server (always 1x at launch, configurable for future)
- [ ] Global announcements scoped to server
- [ ] Server status tracking (active / ended / archived)

---
