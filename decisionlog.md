# Decision Log
_Decisions are permanent once closed. Read this before proposing direction changes._

**When to write a decision:**
- Before you consider a direction "decided" — write the ADR first, then act on it
- When you've considered two or more real options and chosen one
- When a choice rules something out that you might revisit later
- When a disagreement gets resolved — the resolution goes here, not in conversation

**When NOT to write one:** implementation details, temporary choices, things that are easily reversible.

**Status values:** `Open` (exploring) | `Closed` (decided, do not relitigate) | `Superseded by [DECISION-NNN]`

Format per entry:
```
## [DECISION-NNN] Title
**Date**: YYYY-MM-DD  
**Status**: Open | Closed  
**Options considered**: A / B / C  
**Decision**: What we chose  
**Rationale**: Why  
**Consequences**: What this rules out
```

---

## [DECISION-001] Product direction — skills layer on top of Claude Code
**Date**: 2026-05-19  
**Status**: Closed  
**Options considered**: (A) Build a custom agent runtime / (B) Build agent teams from scratch / (C) Build a skills + visibility layer on top of Claude Code  
**Decision**: (C) — Claude Code IS the agent. We build the skills registry, loops, `//` trigger, and shared memory layer on top of it.  
**Rationale**: Claude Code already handles execution, tool use, memory, and sub-agents. Building another agent runtime is redundant. The gap in the market is the skills library, the loop scheduler, and the team visibility layer — not another LLM wrapper.  
**Consequences**: We are not building agent personas, custom runtimes, or comms channel routing. Skills are the core product. Everything else is infrastructure for the skills to run and be visible.

---

## [DECISION-004] Positioning — onboarding layer, not a workspace replacement
**Date**: 2026-05-19  
**Status**: Closed  
**Options considered**: (A) Agent team management platform / (B) Skills layer on Claude Code / (C) Onboarding layer for AI use that adds `//` power without replacing any existing workspace  
**Decision**: (C)  
**Rationale**: Claude Code and other models already do everything. The gap isn't capability — it's access. DS is not another agent tool competing with Claude. It's the layer that makes Claude accessible to anyone, via skill selection + `//` trigger, without disrupting their existing tools.  
**Consequences**: We never market DS as replacing Claude, Jira, Figma, or any workspace. We position alongside Claude, not against it. All copy, onboarding, and product decisions must pass the test: "does this add `//` power without replacing something the user already has?"

---

## [DECISION-002] Form factor — desktop app, not web-only
**Date**: 2026-05-19  
**Status**: Closed  
**Options considered**: (A) Web app / (B) Desktop app with system-wide trigger / (C) Browser extension  
**Decision**: Desktop app (B)  
**Rationale**: Competitive research confirms zero products occupy the native desktop space. System-wide `//` trigger is only possible from OS layer. Wispr Flow / Raycast shape.  
**Consequences**: We are not building a web-first product. Web may exist as a companion (dashboard/Kanban visibility) but the core is desktop.

---

## [DECISION-005] Allen — default system agent, ships pre-installed with every DS instance
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) No default agent — users configure everything from scratch / (B) A generic onboarding wizard that runs once / (C) A persistent default system agent (Allen) that watches root context and guides every session
**Decision**: (C) — Allen ships with every DS install, is not optional, and is not user-replaceable. He runs on session start, on context file changes, and weekly.
**Rationale**: Without a ground-layer agent watching the root, loops drift silently and the team loses the thread. Allen is the guarantee that the system stays coherent — not a feature on top of DS, but the condition under which the rest of DS works correctly. He also serves as dog-food: Allen runs on the DS project itself, making the product thesis testable from day one.
**Consequences**: Allen's skills, loop triggers, and escalation paths must be designed as product infrastructure, not as a user-configurable agent. Any change to Allen's behavior is a product release, not a user setting.

---

## [DECISION-006] Agent permission model — explicit grant required, three tiers
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) Agents act autonomously within their skill scope / (B) Every action requires user confirmation / (C) Three-tier permission model: pre-approved / ask-first / never
**Decision**: (C) — agents must have explicit user-granted permissions. Outside those permissions, they ask. Some actions are hardcoded off regardless of settings.
**Rationale**: Agents taking unsanctioned actions — even small ones — erodes trust immediately. The permission model must be visible, editable, and enforced at the platform level, not left to agent configuration. This is the HAI line.
**Consequences**: Every skill in the registry must declare its permission tier. The agent setup flow must include a permissions review step. DS enforces the "never" tier — it cannot be overridden by user settings or agent config.

Permission tiers:
- **Pre-approved**: user granted at setup — agent executes without asking (e.g. send me a Slack DM, read my Figma file)
- **Ask-first**: agent surfaces the action and waits for approval before executing (e.g. post a PR comment, push to main, send external email)
- **Never**: hardcoded off, no user setting can enable (e.g. delete files, make payments, impersonate the user)

---

## [DECISION-007] Allen is a skill/persona, not a separate agent runtime
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) Allen as a separate agent runtime loaded on demand from `agents/allen.md` / (B) Allen as a persistent skill/persona that Claude Code adopts throughout every session
**Decision**: (B) — Allen is a skill. Claude Code IS Allen. The `agents/` directory holds role/skill configurations, not separate runtimes.
**Rationale**: Claude Code is already the agent runtime. Defining Allen as a separate agent made him absent by default — you had to explicitly summon him, and even then he lasted one response. As a persistent skill/persona declared in CLAUDE.md and reinforced via session hooks, Allen is always present. His capabilities equal Claude Code's full tool access, inherited automatically. No separate runtime needed.
**Consequences**: Any new "agent" in DS is a skill configuration (persona + scope + escalation path) that Claude Code loads — not a standalone process. The distinction between "agent" and "skill" in DS collapses at the execution layer: all agents are skills, all skills run on Claude Code. `agents/` should be understood as `roles/`.

---

## [DECISION-003] Monetization model — platform fee + BYOK
**Date**: 2026-05-19  
**Status**: Open (needs validation)  
**Options considered**: (A) Token-inclusive subscription / (B) Platform fee + user brings own API key  
**Decision**: Leaning (B) — $12/mo for platform, tokens on the user (Claude Code subscription or direct API key)  
**Rationale**: BYOK aligns with power users who already have Claude/OpenAI access. Removes token cost risk from our P&L.  
**Consequences**: Requires users to have an existing API key. May add friction at onboarding. Revisit if conversion data shows dropoff here.
