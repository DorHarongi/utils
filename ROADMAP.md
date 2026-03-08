# Game Roadmap

## Completed Features

All of the following are implemented and live:

- Skill Tree System (Academy, 9 categories, 3 tiers, 20 max points)
- Achievements & Titles (11 achievements, weekly/total stats, title selection)
- Scouting/Spy System (spy missions, detection formula, reports in inbox)
- Stable Building (spy capacity, detection reduction, spy regen)
- Leaderboards (weekly boss damage, resources raided, best defenders — player + clan)
- Village Power Display (attack/defense totals in right toolbar)
- Boss Battle Reports (HP bar, troop losses, damage dealt, rewards)
- Travel Time System (troop speeds, movements, incoming attack display)
- Clan Chat (WebSocket + HTTP, leader styling, 7-day auto-cleanup)
- Theme Chooser (6 themes, CSS variables, per-user preference)
- Divine Relics & Endgame (5 relics, Mythic boss, relic stealing, betrayal, win condition)
- Server End State (read-only freeze, permanent win banner)
- Multi-Server Architecture (partially — server selection, separate DBs, account system)

---

## Future Features

---

### 1. Oasis System (King of the Hill)
**Priority:** High  
**Complexity:** High

**Description:**  
Resource-rich points on the world map that players can send troops to occupy. As long as your troops hold an oasis, they accumulate resources — but you only receive those resources when you choose to retreat. Other players can attack your troops there and steal everything you've gathered.

This is the game's answer to the "dead time between energy cycles" problem. Oasis interactions do NOT cost energy. They give every player something strategic to manage at all times — send troops, monitor accumulation, decide when to retreat, spy on occupied oases, and ambush other players' garrisons.

**The name: Oasis.**

---

**Core Mechanics:**

1. **Claiming an oasis:** Send troops to an unoccupied oasis. First to arrive claims it — no combat needed for an empty oasis. Troops begin harvesting immediately.

2. **One player per oasis.** Even within the same clan, only one player can occupy a given oasis. If a clanmate tries to send troops: "Someone from your clan already controls this oasis."

3. **Resource accumulation:** Each troop harvests resources over time while stationed. Rate: **175 of each resource per troop per hour** (same base loot value as PvP raiding). Resources accumulate in a "stash" tied to that oasis occupation — they are NOT sent to your village automatically.

4. **You only get resources when you retreat.** This is the core tension. Retreat too early → didn't harvest enough. Stay too long → risk losing everything to an attacker. Troops carry the stash home when they retreat (travel time applies, same as normal troop movement).

5. **Each oasis has a resource cap.** Every oasis spawns with a finite amount of resources (randomized per oasis, varies by "richness" tier). Once drained, there's nothing left to harvest.

6. **Auto-retreat when drained.** When troops have harvested the oasis to 0 remaining, they automatically begin their return trip with the full stash.

---

**Combat at Oases:**

When a player attacks an occupied oasis:
- Standard combat: attacker's troops vs. occupier's garrison troops
- **If attacker wins:** Occupier's troops are wiped. Attacker steals the occupier's entire accumulated stash.
- **If defender (occupier) wins:** Attacker's troops die. Occupier keeps their stash and remains in control.
- **Battle report** shows: attacker losses, defender losses, how many resources were stolen, and how many troops the opponent had.

**Energy cost for attacking an oasis:** Yes — attacking an oasis is PvP combat, so it costs 1 energy (consistent with all PvP attacks). Sending troops to claim an empty oasis costs NO energy (it's a garrison action, like sending support).

---

**Visibility — ✅ DECIDED: Total Fog of War**

You know **nothing** about an oasis except that it exists on the map (meaning it still has *some* resources — even if just 1 of each). Everything else is hidden:

- You do NOT know how many total resources it spawned with
- You do NOT know how much has already been harvested by a previous occupier
- You do NOT know if someone is currently inside
- You do NOT know the oasis tier or richness level
- The only thing the map tells you: "there is an oasis here that hasn't fully despawned yet"

**When you control the oasis:** You see the resources **remaining** in the oasis from the moment your troops arrived — NOT the original total. If someone before you already drained 80% of a Golden Oasis and then retreated, you arrive and see only what's left. You have no idea it used to be a Golden Oasis. Your troops only see what's in front of them.

**To find out before committing:** 
- **Spy it first** (costs a spy, not energy). A successful spy report on an oasis reveals: whether it's occupied, who occupies it (if anyone), how many troops are garrisoned, how much they've accumulated in their stash, and how many resources remain in the oasis.
- **Or:** You send 1 troop as a probe. If they die → someone's there. If they claim it → it was empty (and now you see what's left).
- **Or:** You send a full attack force and find out the hard way.

This creates maximum uncertainty. A player sees an oasis and thinks: "Is it full? Is it almost empty? Is someone already sitting there with 2,000 troops? I have no idea." The spy system becomes the key to informed decision-making — and players who skip scouting are gambling blind.

**✅ DECIDED: When you control it, UI shows REMAINING, not original:**
```
RESOURCES REMAINING
🪵 Wood:  127k remaining
🪨 Stone: 89k remaining  
🌾 Crop:  203k remaining

YOUR STASH (harvested so far)
🪵 Wood:  45k
🪨 Stone: 32k
🌾 Crop:  61k

Harvesting: +43,750/hr per resource
Time to drain remaining: ~2 hours
```
You see what's left and what you've taken. You don't know what it started with. You don't know if someone else already took 90% before you got there.

---

**Multi-Village Support:**

A player CAN send troops from multiple villages to the same oasis. Each village's troops contribute to the garrison and harvest resources separately — when retreated, resources return to the village that sent those troops.

This enables:
- Coordinated defense: send 5 villages' worth of troops to one oasis to make it a fortress
- If you know (or suspect) someone is there, you can overwhelm them with coordinated attacks from all your villages

---

**Oasis Tiers (Resource Richness):**

Each oasis spawns with one of several richness tiers that determine total harvestable resources:

| Tier | Name | Wood | Stone | Crop | Total Value | Rarity |
|------|------|------|-------|------|-------------|--------|
| 1 | Dusty Springs | 500k | 500k | 500k | 1.5M | Common |
| 2 | Fertile Clearing | 1.5M | 1.5M | 1.5M | 4.5M | Common |
| 3 | Hidden Wellspring | 3M | 3M | 3M | 9M | Uncommon |
| 4 | Abundant Grove | 4.5M | 3M | 6M | 13.5M | Rare |
| 5 | Golden Oasis | 8M | 8M | 8M | 24M | Very Rare |

**⚠️ OPEN: Exact tier values and distribution need playtesting.** The above are starting estimates. Resource ratios can be uneven (some oases are wood-heavy, some crop-heavy) to create preferences and competition for specific oases.

---

**Spawn Mechanics:**

- Spawn rate: similar to regular bosses — every 30 minutes, chance to spawn one
- Max oases on map at once: **~15** (higher than boss cap of 10, since oases are lower-stakes per individual)
- Oases despawn when fully drained (troops auto-retreat, oasis disappears from map)
- Empty oases that nobody claims despawn after **48 hours** (prevents map clutter)
- Oases do NOT spawn on occupied tiles (villages or bosses)

---

**UI — Oasis Interaction Panel (when you control an oasis):**

Click your occupied oasis on the map to see a real-time dashboard:

```
╔══════════════════════════════════════════════╗
║              OASIS                           ║
║          Status: Under Your Control          ║
╠══════════════════════════════════════════════╣
║                                              ║
║  YOUR GARRISON                               ║
║  ┌────────────────────────────────────────┐  ║
║  │ Archers: 200                          │  ║
║  │ Horsemen: 50                          │  ║
║  │ Total: 250 troops                     │  ║
║  └────────────────────────────────────────┘  ║
║                                              ║
║  RESOURCES REMAINING IN OASIS                ║
║  ┌────────────────────────────────────────┐  ║
║  │ 🪵 Wood:  127k remaining              │  ║
║  │ 🪨 Stone: 89k remaining               │  ║
║  │ 🌾 Crop:  203k remaining              │  ║
║  └────────────────────────────────────────┘  ║
║                                              ║
║  YOUR STASH (harvested so far)               ║
║  ┌────────────────────────────────────────┐  ║
║  │ 🪵 Wood:  45k                         │  ║
║  │ 🪨 Stone: 32k                         │  ║
║  │ 🌾 Crop:  61k                         │  ║
║  │                                        │  ║
║  │ Harvesting: +43,750/hr per resource   │  ║
║  │ (250 troops × 175/hr)                 │  ║
║  │                                        │  ║
║  │ Time to drain remaining: ~2 hours     │  ║
║  └────────────────────────────────────────┘  ║
║                                              ║
║  [🏃 RETREAT — Bring Resources Home]         ║
║  (Travel time: 2 min 30 sec)                 ║
║                                              ║
╚══════════════════════════════════════════════╝
```

**Key displays:**
- Your garrison troop breakdown
- Resources REMAINING in the oasis (what's left to harvest — NOT the original total)
- Your stash (how much you've personally harvested so far)
- Harvest rate (troops × 175/hr)
- Estimated time to drain remaining resources
- Retreat button with travel time estimate
- Real-time updates (same tick rate as resource production)

**You do NOT see:** the original total, who was here before you, or how much was already taken.

**UI — Oasis on map (for non-occupiers):**

Click an oasis you don't control → minimal panel with maximum uncertainty:

```
╔══════════════════════════════════════════════╗
║              OASIS                           ║
║          Status: Unknown                     ║
╠══════════════════════════════════════════════╣
║                                              ║
║  This oasis still has resources.             ║
║  You don't know how much.                    ║
║  You don't know if anyone is here.           ║
║                                              ║
║  [🔍 Scout]  [⚔️ Attack]  [🏕️ Send Troops]  ║
║                                              ║
╚══════════════════════════════════════════════╝
```

- **Scout:** Send a spy to reveal: occupancy, troop count, accumulated stash, and remaining resources (costs 1 spy, NOT energy)
- **Attack:** Send troops to fight whoever is there (costs 1 energy)
- **Send Troops:** Send troops to garrison (NO energy cost)

**✅ DECIDED: Troops fight on arrival if oasis is occupied.** If you send troops to garrison an empty oasis, you claim it peacefully. If someone is already there, your troops automatically fight the garrison on arrival — same combat as a normal attack. You thought it was empty, surprise. This is clean, dramatic, and consistent. No "your troops turned around" — they commit.

---

**Spy Detection at Oases — ✅ DECIDED: Much Easier Than Villages**

Oases are open terrain, not fortified settlements. Detection chance is drastically lower:

- **Empty oasis:** Spying an unoccupied oasis has **100% success rate**. No one is there to catch your spy. You simply get a report: "Oasis is unoccupied. Resources remaining: X wood, Y stone, Z crop."
- **Occupied oasis:** Detection uses the **same formula as a village with Wall level 0** (base 40%, no wall bonus). The garrison has no walls, no watchtowers — just troops in a field. The attacker's Stable level and Silent Stealth still reduce detection normally.

```
Occupied oasis detection:
  base_detection = 40%
  wall_bonus = 0%  (no wall at an oasis)
  - stable_level * 2%
  - silent_stealth_bonus
```

**Example:** Stable 5, Silent Stealth II vs occupied oasis: 40% + 0% - 10% - 20% = **10% caught**. Spying oases is safe for anyone with a halfway decent spy build.

**Spy report on oasis (success) reveals:**
- Whether it's occupied or empty
- If occupied: who controls it, exact troop counts by type (e.g., "200 Archers, 50 Horsemen"), exact stash amounts
- Remaining resources in the oasis (what's left to harvest)
- **Multi-village limitation:** If the occupier sent troops from multiple villages, the spy sees the combined total — NOT which village each troop came from. "Player X: 200 Archers, 50 Horsemen" — the spy can't tell if 100 Archers came from village A and 100 from village B.

---

**Expert Spy on Oases:**

The Expert Spy (section 2) can also be deployed to an oasis, not just enemy villages. When embedded at an oasis:

- Same detection rules as regular oasis spying (100% if empty, wall-level-0 formula if occupied)
- If successfully embedded, the Expert Spy monitors the oasis for hours and reports:
  - When someone arrives to garrison or attack
  - When someone retreats with their stash
  - Troop counts of anyone coming or going
  - When the oasis is drained and despawns
- This turns oasis surveillance into a clan intelligence tool: "Park our Expert Spy on that rich oasis near the enemy clan's territory. We'll know the moment they show up."

---

**Interaction with Skills:**

| Skill | Effect on Oasis |
|-------|-----------------|
| Quick Step | Faster travel to/from oasis |
| Silent Stealth | Lower detection when spying occupied oases |
| Sharper Blades | Stronger when attacking oasis garrisons |
| Heroic Shield | Stronger garrison defense |
| Self Defense | Fewer losses in oasis combat (on wins) |
| Filthy Thief | +% on stolen stash when attacking occupied oasis |
| Iron Vault | -% lost from your stash when your garrison is defeated |

---

**Why This Design Works:**

1. **Fills the dead time.** Between energy cycles, players check their oasis, decide whether to retreat, scan the map for new oases, spy on occupied ones. There's always something to think about.
2. **Creates the investment tension.** "I've been here for 4 hours and harvested 800k of each... do I pull out now or keep going? What if someone attacks tonight while I sleep?" This feeling — the fear of losing accumulated gains — is the emotional hook.
3. **Doesn't break energy balance.** Claiming an oasis costs no energy. Attacking one costs energy (same as all PvP). Beginners can safely garrison empty oases without being energy-gated.
4. **Doesn't break resource economy.** Oases have finite resources and despawn. They're a supplement to factory production, not a replacement. The resource amounts are tunable.
5. **Creates map-level strategy.** Players plan village placement near oasis-rich areas. Clans compete for map control. Forward-base villages near the center get more oasis options.
6. **Mystery mode + spy integration.** The hidden occupancy makes the Stable and Silent Stealth investments more valuable — ties into existing systems instead of creating isolated mechanics.

---

**Implementation:**
- [ ] Utils: Oasis tier definitions, resource caps, harvest rate constants
- [ ] Utils: Oasis spawn rate constants (interval, max on map, despawn timer)
- [ ] Server: Oasis collection/model (position, tier, resources remaining, occupier, stash, garrison troops)
- [ ] Server: Oasis spawn cron (similar to boss spawn)
- [ ] Server: Garrison endpoint — send troops to oasis (no energy cost)
- [ ] Server: Attack oasis endpoint — standard combat + stash theft (1 energy)
- [ ] Server: Retreat endpoint — begin return trip with accumulated stash
- [ ] Server: Harvest cron — update stash per occupied oasis (175/troop/hour)
- [ ] Server: Auto-retreat when oasis drained to 0
- [ ] Server: Oasis despawn after 48h unclaimed
- [ ] Server: Spy/scout integration for oases (reveal occupancy, troop count, stash amount)
- [ ] Server: Multi-village garrison support (track per-village troops + stash separately)
- [ ] Server: Combat at oasis (battle between attacker and garrison)
- [ ] Server: Battle report for oasis fights (include stash stolen)
- [ ] Client: Oasis entity on world map (new icon type alongside villages and bosses)
- [ ] Client: Oasis interaction panel (for occupier — real-time dashboard)
- [ ] Client: Oasis interaction panel (for non-occupier — scout/attack/garrison buttons)
- [ ] Client: "Your Oases" section in main panel or movements panel (shows all active garrisons)
- [ ] Client: Retreat button with travel time + confirmation
- [ ] Client: Spy report for oasis (show occupancy, troops, stash)

---

### 2. Expert Spy (Enhancement to Scouting System)
**Priority:** Medium  
**Complexity:** Medium

**Description:**  
A special elite spy unit — one per village — that can embed inside an enemy village **or an oasis** for hours and provide ongoing intelligence reports.

Unlike regular spies (one-time snapshot), the Expert Spy is a **persistent surveillance agent**. It stays inside the target and sends intelligence home via crow messengers whenever events happen — no polling, no fixed intervals.

---

**Core Design:**

- **One Expert Spy per village** (each village can train and deploy its own)
- Unlocked at Stable level 5 (mid-game building investment required)
- The Expert Spy is visually and mechanically distinct from regular spies — it's a special unit
- When deployed, it embeds at the target for a **configurable duration** (default: 6 hours)
- The Expert Spy is **event-driven**: whenever a relevant event occurs at the target (troops departing, arriving, support withdrawn, etc.), the spy dispatches a crow carrying the intelligence back to your village
- After the duration expires, the Expert Spy returns home automatically

---

**Crow Messenger System:**

When the Expert Spy observes an event, it sends a **crow** back to the village that deployed it:
- Crow travel speed: **20 tiles per minute** (fast but not instant — distance matters)
- The crow appears in your **movements panel** with a dedicated crow icon, flying toward your village
- Once the crow arrives, you receive the intelligence report in your inbox
- The crow is one-way — it does not return to the Expert Spy
- Multiple events = multiple crows in flight (you might see several crows incoming if a lot is happening at the target)

This means intelligence is not instant. If your Expert Spy is embedded 40 tiles away, each report takes 2 minutes to reach you. If the target is nearby (5 tiles), you get near-real-time intel. **Distance to target directly affects how fresh your intelligence is.**

---

**What Triggers a Crow:**

**On enemy villages:**

| Event | Report Content |
|-------|---------------|
| Troops depart for attack | "Target sent troops to attack [village coordinates] (500 troops)" |
| Troops depart for boss | "Target sent troops to attack a boss at [coordinates]" |
| Troops depart as support | "Target sent 300 troops as support to [village coordinates]" |
| Support troops received | "Target received support troops from [player name]" |
| Support troops withdrawn | "Support troops from [player name] have left the target" |
| Troops return from PvP | "Target's troops returned from PvP — 200 survivors" |
| Troops return from PvE | "Target's troops returned from boss raid — 450 survivors" |

**On oases:**

| Event | Report Content |
|-------|---------------|
| Someone arrives to garrison | "400 troops arrived at the oasis from [player name]" |
| Someone attacks the oasis | "600 troops attacked the oasis — combat occurred" |
| Someone retreats with stash | "[Player name] retreated from the oasis with their stash" |
| Oasis drained | "The oasis has been fully drained and will despawn" |

**Regular spy** = one-time snapshot, exact numbers. **Expert Spy** = ongoing event-driven surveillance, also exact numbers. The difference is duration and persistence, not accuracy.

---

**Detection and Death:**

- The Expert Spy has the **same detection formula as regular spies** (Wall + Stable + Silent Stealth for villages; wall-level-0 formula for oases)
- Detection is rolled ONCE on arrival (same as regular spy)
- If caught on arrival: Expert Spy dies immediately, defender gets alert, **24-hour cooldown** before clan gets a new Expert Spy
- If NOT caught on arrival: Expert Spy is embedded safely for the full duration — no further detection rolls
- The 24-hour cooldown (vs 12h for regular spies) makes losing the Expert Spy a significant blow to the clan

**Why this makes Silent Stealth more valuable:**
- Losing a regular spy is annoying (12h regen). Losing the Expert Spy cripples your clan's intelligence for 24h.
- Players who invest in Silent Stealth III are protecting their clan's most valuable intelligence asset
- The Expert Spy creates a real cost/benefit analysis for scouting: use a regular spy for a quick snapshot, or risk the Expert for deep sustained intelligence

---

**Deployment Targets:**

The Expert Spy can be deployed to:
1. **Enemy villages** — reports on troop movements (support in/out, PvP/PvE attacks, returning troops)
2. **Oases** — reports on who arrives and leaves, troop counts coming and going, when someone retreats with their stash, when the oasis is drained

**Oasis-specific detection:** Same rules as regular oasis spying — 100% success on empty oasis, wall-level-0 formula if occupied (see section 1 "Spy Detection at Oases").

---

**Limitations:**

- Can only embed at **one target at a time** (you have one Expert Spy — village OR oasis, not both)
- Cannot be recalled early once deployed (committed for the full duration)
- If the Expert Spy's clan mate attacks the target during the embed, the Expert Spy is NOT revealed (they're separate operations)
- The target has NO way to know they're being surveilled unless they catch the spy on arrival
- Expert Spy does NOT reveal skill builds (consistent with regular spy design — skills stay secret)

---

**UI:**

- In the Stable building page: "Expert Spy" section (visible at Stable 5+) showing status: Available / Deployed / Dead (cooldown timer)
- On map: village interaction for enemies has a third spy option: "Deploy Expert Spy" alongside the regular "Scout" button
- Confirmation modal: "Deploy Expert Spy on [village name]? Duration: 6 hours. If caught, 24h cooldown."
- Movements panel: incoming crow icon with travel progress (same as troop movements)
- Inbox: Expert Spy reports appear as a special report type with their own icon, grouped by deployment mission

---

**Implementation:**
- [ ] Utils: Expert spy constants (embed duration, crow speed 20 tiles/min, cooldown)
- [ ] Server: Expert spy state tracking (per village)
- [ ] Server: Deploy endpoint — validate expert spy available, calculate arrival, detection roll on arrival
- [ ] Server: Hook into movement/combat events — when a relevant event occurs at a surveilled target, create a crow movement
- [ ] Server: Crow movement type — one-way movement from target to deployer's village, carries intel payload
- [ ] Server: On crow arrival — deliver intelligence report to deployer's inbox
- [ ] Server: Auto-return after embed duration expires
- [ ] Server: 24h cooldown on death (tracked per village)
- [ ] Client: Expert Spy section in Stable UI
- [ ] Client: "Deploy Expert Spy" button on village interaction (disabled if unavailable)
- [ ] Client: Crow icon in movements panel (incoming crow with travel time)
- [ ] Client: Expert Spy reports in inbox (special styling, grouped per mission)
- [ ] Client: Expert Spy status indicator (in Stable page or top toolbar)

---

### 3. Daily Quests (Rotating)
**Priority:** High  
**Complexity:** Low-Medium

**Description:**  
After the initial 17 tutorial quests are complete, players receive a set of **3 rotating daily quests** that refresh every 24 hours. These provide daily engagement goals, structure each gaming session, and give players a reason to log in and plan beyond just energy management.

---

**Core Design:**

- **3 quests per day**, randomly selected from the pool below
- Refresh at **00:00 UTC daily** (all players get new quests at the same time)
- Each quest has a **clear objective** and a **resource reward**
- Quests are per-player, per-day (every player gets the same 3 quests — shared across the server, so clans can coordinate)
- Available on ALL villages (not just first village like tutorial quests)
- Unclaimed quest rewards expire when the next day's quests arrive (use it or lose it)

---

**Quest Pool (examples — pull 3 per day):**

| Category | Quest | Requirement | Reward |
|----------|-------|-------------|--------|
| PvE | Deal damage to a boss | Deal 10,000+ boss damage in one attack | 50k each |
| PvE | Attack 2 different bosses | Hit 2 separate bosses today | 75k each |
| PvP | Win a raid | Win a PvP attack | 40k each |
| PvP | Successfully defend an attack | Defender wins a PvP fight | 60k each |
| PvP | Scout 2 enemy villages | Complete 2 successful spy missions | 30k each |
| Economy | Hire 100 workers | Hire 100 workers (cumulative today) | 30k each |
| Economy | Harvest 50k of any resource | Factory production reaches 50k today | 20k each |
| Social | Send support to a clanmate | Send any support troops | 40k each |
| Social | Send resources to a clanmate | Transfer resources to clan member | 30k each |
| Oasis | Garrison troops at an oasis | Successfully claim or garrison an oasis | 50k each |
| Oasis | Retreat from an oasis with 100k+ | Retreat from oasis with 100k+ of any resource | 60k each |
| Combat | Win a fight with less than 10% losses | Win any combat with < 10% troop losses | 75k each |
| Combat | Train 200 troops | Train 200 troops of any type today | 25k each |

**⚠️ OPEN: Exact quest pool, reward amounts, and difficulty curves need playtesting.**

---

**Quest Selection Rules:**
- Never 3 quests from the same category (variety guaranteed)
- If a quest requires a feature the player hasn't unlocked (e.g., "Scout" but no Stable), it's skipped and another is drawn
- At least 1 quest should be achievable without energy (economy/social/oasis)

---

**Bonus: Completion Streak**

If a player completes all 3 daily quests:
- **Daily completion bonus:** Extra reward (e.g., 100k of each resource)
- **Streak tracking:** 3 days in a row → small bonus, 7 days → bigger bonus
- Streak breaks if you miss a day (all 3 not completed)

**⚠️ OPEN: Streak rewards and thresholds need design. Keep rewards meaningful but not so large that missing a day feels punishing.**

---

**UI:**

- Quest widget (same location as tutorial quest widget, evolves after tutorial is done)
- Shows 3 quests with progress bars and claim buttons
- Timer showing "Quests refresh in: HH:MM:SS"
- Completion bonus indicator: "Complete all 3 for bonus reward!"

---

**Implementation:**
- [ ] Utils: Daily quest definitions (pool, categories, requirements, rewards)
- [ ] Utils: Quest selection algorithm (random from pool, no duplicate categories, feature gating)
- [ ] Server: Daily quest generation cron (00:00 UTC, same quests for all players on server)
- [ ] Server: Quest progress tracking per player per day
- [ ] Server: Quest claim endpoint
- [ ] Server: Streak tracking (consecutive days with all 3 complete)
- [ ] Server: Expire unclaimed rewards on daily reset
- [ ] Client: Daily quest widget (replaces tutorial widget after quest 17 done)
- [ ] Client: Progress bars, claim buttons, refresh timer
- [ ] Client: Streak display and bonus indicator

---

### 4. Clan Missions (Weekly)
**Priority:** Medium  
**Complexity:** Low-Medium

**Description:**  
Weekly collaborative objectives for the entire clan. One active mission per week, chosen automatically. All clan members contribute toward a shared progress bar, and everyone receives rewards when the mission is completed.

This keeps clan chat active between boss spawns and gives the clan a shared focus beyond "wait for the next Mythic."

---

**Core Design:**

- **1 mission per week** (auto-selected, not leader-chosen — reduces leadership burden)
- Starts Monday 00:00 UTC, ends Sunday 23:59 UTC (same cycle as weekly stat reset)
- All clan members contribute through normal gameplay — no special actions needed
- Progress bar visible on clan page
- If completed before Sunday: rewards distributed immediately, no new mission until next week
- If NOT completed by Sunday: no reward, new mission starts

---

**Mission Pool (examples):**

| Mission | Requirement | Reward (per member) |
|---------|-------------|---------------------|
| Clan Boss Slayers | Deal 500k total clan boss damage this week | 100k each |
| Clan Raiders | Steal 300k total resources via PvP raids | 75k each |
| Iron Fortress | Successfully defend 15 attacks across all members | 100k each |
| Oasis Dominators | Collectively harvest 1M resources from oases | 80k each |
| Scout Network | Complete 20 successful spy missions | 60k each |
| Army Builders | Train 5,000 troops collectively | 50k each |

**⚠️ OPEN: Requirements should scale with clan size or active member count to prevent 20-member clans from trivially completing missions designed for 5-member clans. Consider: `base_requirement × (active_members / 10)` scaling.**

---

**UI:**

- Clan page: dedicated "Clan Mission" section with:
  - Mission name and description
  - Progress bar (current / target)
  - Individual contribution breakdown (who contributed how much)
  - Time remaining
  - Reward preview
- Clan chat: automated message when mission starts and when completed

---

**Implementation:**
- [ ] Utils: Clan mission definitions (pool, requirements, rewards)
- [ ] Server: Weekly mission selection cron (Monday 00:00 UTC)
- [ ] Server: Mission progress tracking (aggregate across clan members)
- [ ] Server: Mission completion check and reward distribution
- [ ] Server: Individual contribution tracking per member
- [ ] Client: Clan mission section on clan page
- [ ] Client: Progress bar with contribution breakdown
- [ ] Client: Reward notification on completion

---

### 5. Trap Defense System
**Priority:** Low (future consideration)  
**Complexity:** Medium

**Description:**  
Defensive traps that are placed on the Wall and trigger automatically during incoming attacks, dealing damage to attackers before combat begins. Traps are **consumable** — they break after triggering and must be rebuilt with resources.

This gives defensive players an active gameplay loop: constantly investing resources into trap upkeep, creating a money sink and a reason to keep logging in.

---

**Core Concept:**

- Traps are "installed" on the Wall (Wall level determines trap capacity)
- When attacked, traps fire FIRST (before normal combat), killing some attacking troops
- Each trap triggers once and is destroyed — must be rebuilt afterward
- Traps cost resources to build (not instant — or instant with resource cost, TBD)
- The defender must actively maintain traps after each attack

---

**Trap Types (examples):**

| Trap | Damage | Cost | Wall Level Req |
|------|--------|------|----------------|
| Spike Pit | Kills 5 attacking troops | 500 each resource | Wall 2+ |
| Rolling Stones | Kills 15 attacking troops | 2000 each resource | Wall 4+ |
| Boiling Oil | Kills 30 attacking troops | 5000 each resource | Wall 6+ |
| Greek Fire | Kills 75 attacking troops | 15000 each resource | Wall 8+ |

**Trap capacity by Wall level:** `Wall level × 5` traps max (Wall 10 = 50 trap slots).

---

**Why "Low Priority":**

This feature is interesting but adds balancing complexity. It's documented here for future consideration. Core questions:
- Does this make defense too strong, preventing relic steals?
- Does the resource sink feel engaging or just tedious?
- How does this interact with the "total wipe = relic stolen" mechanic?

**⚠️ This feature is in the "cool idea, park it" category. Implement only after Oasis, Daily Quests, and Clan Missions are live and balanced.**

---

**Implementation (when/if prioritized):**
- [ ] Utils: Trap definitions (types, damage, costs, capacity formula)
- [ ] Server: Trap inventory per village (array of trap types + counts)
- [ ] Server: Trap trigger logic in combat (damage applied before main battle)
- [ ] Server: Trap consumption after triggering
- [ ] Server: Rebuild trap endpoint
- [ ] Client: Trap management UI in Wall building page
- [ ] Client: Trap results shown in battle reports (pre-combat damage section)

---

## Priority Order

1. **Oasis System** - HIGH. Solves the dead time problem, gives players something to do between energy cycles, adds map-level strategy
2. **Daily Quests** - HIGH. Low effort to build, high daily retention impact, structures every session
3. **Clan Missions** - MEDIUM. Keeps clans active between boss spawns, reinforces social bonds
4. **Expert Spy** - MEDIUM. Enhances existing spy system, adds sustained intelligence layer
5. **Trap Defense** - LOW. Cool concept, park for future. Build only after core engagement features are live

---
