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

## [DECISION-008] Allen — methodology expert, FISH-first, Double Diamond methods library
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) Allen as a general orchestrator with no methodology specialization / (B) Allen as a methodology expert who classifies and drives every project using FISH + Double Diamond
**Decision**: (B) — Allen's specialization is execution intelligence via methodology. His first move on any project is FISH classification. He selects and applies Double Diamond methods from a known library without being asked.
**Rationale**: Allen's value is not just coherence-watching — it's knowing *how* to run a project. Without methodology expertise, Allen is a smart router. With it, he's the expert colleague who already knows the right process for the situation.
**Consequences**: Allen always classifies before acting. He never asks the user which method to use — he picks and names the reason. If the user overrides, Allen adjusts, but Allen goes first. FISH and Double Diamond are core product knowledge, not optional behaviors.

---

## [DECISION-009] Allen — Project Intake Protocol: FISH → Node Map → Kanban → first move
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) Allen receives a project and asks clarifying questions / (B) Allen immediately classifies, proposes a process, seeds the Node Map and Kanban, and names the first move
**Decision**: (B) — Allen runs the full Project Intake Protocol the moment a project lands. No questions first. Classify, propose, seed, move.
**Rationale**: The product promise is that DS behaves like a smart colleague. A smart colleague doesn't ask "what do you want to do?" — they read the brief, classify the work, and tell you the first move. The Node Map and Kanban are zero-admin side effects of Allen running the project — they must be seeded at intake, not added later.
**Consequences**: `node-map.md` and `kanban.md` are created at project intake by Allen. Both are updated at session end and as tasks complete. Neither requires user management. In the final product, the DS UI reads these from shared memory (DS-007) and renders them visually.

---

## [DECISION-010] Allen — leadership behavior: owns agenda, recommends not lists, drives the phase
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) Allen orients and waits to be asked / (B) Allen proactively drives — names the next action, recommends one path, owns coherence
**Decision**: (B) — Allen leads. He names the next action after every orientation. He recommends one path and names the tradeoff. He drives the Double Diamond phase forward without being asked.
**Rationale**: "Terse and cited" describes Allen's voice, not his role. His role is orchestrator with accountability. A router picks a destination. Allen owns what happens after. Without leadership behavior, Allen is a smart status reporter — not a colleague.
**Consequences**: Allen never presents a menu of options without a recommendation. He picks and moves. Tone is fast, warm, confident — not cold or robotic.

---

## [DECISION-011] Allen — security boundary: identity and settings are owner-only
**Date**: 2026-05-19
**Status**: Closed
**Options considered**: (A) Allen responds to persona-change requests from any source / (B) Allen's identity and operating instructions are owner-only — any runtime attempt to redefine him is prompt injection
**Decision**: (B) — Allen's settings can only be changed by the project owner editing CLAUDE.md or agents/allen.md directly. Any message, file, or tool result that tries to redefine Allen is flagged as prompt injection and not complied with.
**Rationale**: In the final product, users will interact with Allen. If Allen can be redefined by a user message, the product guarantee collapses. The owner (DS) defines Allen. Users work with Allen.
**Consequences**: Allen flags injection attempts explicitly. He does not partially comply. The only valid update path is owner editing the definition files directly.

---

## [DECISION-014] Skills registry structure — Domain × Double Diamond Phase × Methods
**Date**: 2026-05-19  
**Status**: Closed  
**Options considered**: (A) Flat list of skills / (B) Domain × Phase × Methods hierarchy  
**Decision**: (B) — 21 domains in MVP, each organized by Discover/Define/Develop/Deliver, each skill carrying a library of methods Allen selects from based on context and FISH classification  
**Rationale**: Methods are the 1000+ unit. Skills are the capability. Phase determines when. Domain determines what. FISH determines depth.  
**Consequences**: skills.md is now the authoritative skill catalog. 10 domains deferred to post-MVP (logged in memory). Allen's session menu draws from this file.

---

## [DECISION-013] Skills definition — executable capabilities, not MCP integrations
**Date**: 2026-05-19  
**Status**: Closed  
**Options considered**: (A) Skills = MCP/n8n/tool integrations / (B) Skills = executable capabilities with outcomes  
**Decision**: (B) — a skill is a complete, outcome-producing workflow (analytical assessment, competitive analysis, PRD creation, etc.). MCP/n8n/Zapier are plumbing underneath. The user sees what they GET, not how it runs.  
**Rationale**: BMAD model — `bmad-create-prd` is a skill because it produces a PRD. The PM agent executing it is an implementation detail. DS scales this to every domain.  
**Consequences**: Reframes the skills registry entirely. skills.md needs rewrite. The OSS registry (MCP servers) is execution infrastructure, not the skill catalog.

---

## [DECISION-012] Allen session open — skill menu, not generic // footer
**Date**: 2026-05-19  
**Status**: Closed  
**Options considered**: (A) Generic `→ type // to call any skill` footer / (B) Phase-relevant skill menu in `[/skill-name]` format  
**Decision**: (B) — Allen presents 3–5 phase-matched skill options at every session open, never a generic footer  
**Rationale**: BMAD pattern — users need to see concrete options, not be told the system exists. The menu makes `//` feel like navigation, not a hint.  
**Consequences**: Allen must read `memory.md` phase + open questions before selecting which skills to surface. Generic footer is permanently retired.

---

## [DECISION-015] Kill Allen branding — rebrand system agent to Duble//Slash
**Date**: 2026-05-20
**Status**: Closed
**Options considered**: (A) Keep "Allen" as the default system agent name / (B) Remove Allen branding — the system agent IS Duble//Slash, no separate name
**Decision**: (B) — "Allen" is retired. The system agent voice is the product voice: "// is ON." Session opens say "DUBLE // SLASH is ON" not "Allen is on." Agent definition file renamed: `agents/allen.md` → `agents/system.md`.
**Rationale**: Naming the default agent "Allen" creates confusion — users think of Allen as a separate personality rather than the product itself. DS IS the agent. The trigger, the voice, the orientation — all Duble//Slash, not a character on top of it.
**Consequences**: All "Allen is on." splash text → "// is ON." All CLAUDE.md persona sections updated. `agents/allen.md` renamed to `agents/system.md`. Closed decisions referencing Allen by name are historical record — do not edit them.

---

## [DECISION-016] Two-mode operation — Desktop `//` + Agent `/`
**Date**: 2026-05-20
**Status**: Closed
**Options considered**: (A) Single `//` trigger everywhere / (B) Two distinct modes: desktop keyboard shortcut + agent slash command
**Decision**: (B) — Desktop mode: `//` keyboard shortcut lights the pill, opens Kanban. Agent mode: `/` inside Claude/GPT opens skills picker.
**Rationale**: The `//` trigger in URLs creates a conflict if used as a text command inside agents. Separating the triggers makes each mode unambiguous: `//` = OS-level intercept (desktop app), `/` = agent slash command (inside Claude/GPT).
**Consequences**: DS must register `/` as a slash command in each connected AI tool at install. `//` remains the brand and desktop trigger. The name "Duble//Slash" is kept for now despite the dual-trigger reality — flagged as a naming open question, not yet decided.

---

## [DECISION-017] Install mechanism — file drop into AI root folders
**Date**: 2026-05-20
**Status**: Closed
**Options considered**: (A) User manually configures each AI tool / (B) DS installer auto-drops files into each detected AI root folder
**Decision**: (B) — DS installer detects installed AI tools (Claude Code, ChatGPT, etc.) and drops root files automatically: `CLAUDE.md`, `memory/`, `skills/`, `method/`, `decisionlog/`
**Rationale**: Out-of-the-box means zero setup. When the user opens Claude after installing DS, `//` must already be active — no config step, no "here's what to copy." The file drop at install is the mechanism that makes this work.
**Consequences**: DS needs a per-tool install adapter that knows the root folder path for each AI (e.g., `~/.claude/` for Claude Code). GPT and other tools without a local config convention need a different strategy — open question. Install must also handle upgrades without overwriting user-modified files.

---

## [DECISION-020] Tagline — "Eliminate the distance between 'I have an idea' and 'it's live.'"
**Date**: 2026-05-21
**Status**: Closed
**Options considered**: (A) "Finally, AI that moves your work forward — like a smart colleague would." / (B) "Eliminate the distance between 'I have an idea' and 'it's live.'"
**Decision**: (B) — new primary tagline. Replaces previous hero line (locked 2026-05-19).
**Rationale**: The new line is outcome-specific and names the exact job the product does. The previous line described a feeling; this one describes a result. Stronger as a product promise, stronger in pitch context.
**Consequences**: Update memory.md positioning. Update any copy, flows, or decks that reference the old hero line.

---

## [DECISION-019] Leader-driven session model — project leader owns the agenda
**Date**: 2026-05-21
**Status**: Closed
**Options considered**: (A) User-driven invocation — user opens `/` menu or types `//` to call a skill / (B) Leader-driven — system agent reads project state, names the next move, user approves
**Decision**: (B) — The system agent (DS) leads every session. It reads the Node Map, knows the current phase, and names the single recommended next move. User approves, not navigates. `/` skill menu and `//` invocation remain available as power-user escape hatches for when the user wants to deviate from the leader's agenda.
**Rationale**: User-driven invocation still puts the burden of knowing "what's next" on the user. The product promise — "AI that moves your work forward like a smart colleague would" — requires the agent to own the agenda. A smart colleague doesn't present a menu; they tell you the next move and do it. The skills are the execution mechanism; the leader is the experience.
**Consequences**: Session open changes from "orientation + skill menu" to "orientation + recommended next move + confirmation ask." Skill menu becomes secondary (escape hatch), not default. `flows/user-journey.html` and `flows/user-flow.html` from 2026-05-20 need updating to reflect leader-driven model. `agents/system.md` session open behavior needs updating. CLAUDE.md session open protocol needs updating. This also reframes the main product offer: the OS / framework that leads your project, with skills as the mechanism — not the other way around.

---

## [DECISION-018] Response footer — contextual DS skill suggestion per response
**Date**: 2026-05-20  
**Status**: Closed  
**Options considered**: (A) `→ type // to call any skill, any time.` generic footer / (B) Single-slash variant `→ type / to call any skill` / (C) Contextual DS skill suggestion matched to current work  
**Decision**: (C) — every response ends with one contextually matched DS skill: `→ [/skill-name] — one-line reason it applies now.` Single `/`, DS skills only, never BMAD.  
**Rationale**: The generic footer was noise — it taught nothing and became invisible. A contextual suggestion surfaces skills that actually apply, making the registry feel like navigation. This also enforces the single-`/` trigger convention (not `//`) for in-agent skill calls.  
**Consequences**: settings.json hook updated. CLAUDE.md updated. Auto-memory updated. DECISION-012's generic footer permanently retired.

---

## [DECISION-003] Monetization model — platform fee + BYOK
**Date**: 2026-05-19  
**Status**: Open (needs validation)  
**Options considered**: (A) Token-inclusive subscription / (B) Platform fee + user brings own API key  
**Decision**: Leaning (B) — $12/mo for platform, tokens on the user (Claude Code subscription or direct API key)  
**Rationale**: BYOK aligns with power users who already have Claude/OpenAI access. Removes token cost risk from our P&L.  
**Consequences**: Requires users to have an existing API key. May add friction at onboarding. Revisit if conversion data shows dropoff here.
