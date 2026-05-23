# Project Memory
_Living document. Update whenever product state, decisions, or priorities change. Always date your entries._

**How to use this file:**
- Update it when you learn something new, close a decision, or shift direction
- Keep it lean — archive old context rather than accumulating drift
- This file is read at every session start — if it's stale, // will flag it
- Format: `## Section` headers for themes, dated bullets for specific entries

---

## What we're building
**Duble//Slash** — the onboarding layer for AI use.

Claude Code (and other models) are already capable of doing everything. The problem is not capability — it's access. Most people don't know how to harness what's already there. DS solves that by giving them the `//` power: a simple, out-of-the-box way to call anything they want, without replacing their workspace.

DS does NOT replace Claude Code, ChatGPT, Figma, Jira, or any existing tool. It sits on top and connects them.

**Three things DS does:**
1. **Skills** — executable capabilities you summon with `//`. Each skill is a complete, outcome-producing workflow: analytical assessment, competitive analysis, PRD creation, UX flow design, GTM strategy, code review, etc. Thousands in the registry. The agent/persona that executes it is an implementation detail — the user sees the outcome.
2. **Loops** — you set what should run automatically, and when
3. **`//` trigger** — you call any skill from any tool, any time

**What skills are NOT:** MCP servers, n8n integrations, or tool configurations. Those are plumbing — the execution layer underneath. A skill is the capability and its output. (Updated 2026-05-19)

**In the background:** every run is logged to shared memory and surfaced in the team UI, so the whole team sees what's happened — with zero admin overhead.

## Positioning (locked 2026-05-19)
> "The onboarding layer for AI use — giving people the `//` power without replacing their workspace."

**Hero line (updated 2026-05-21, DECISION-020):**
> "Eliminate the distance between 'I have an idea' and 'it's live.'"

**Sub-line:**
> "DS gives your AI the workflow it was missing — not a better model, the structure that makes it behave like one."

**Research validation (2026-05-19):**
- 88% of orgs use AI, 60% get no real value from it — the gap is workflow, not capability
- "The real bottleneck in AI adoption: broken workflows, not bad models" — matches DS thesis exactly
- When AI works in steps it behaves like a domain expert; when it guesses at everything it behaves like a chatbot — DS gives it the steps

- We are NOT building another agent runtime
- We are NOT replacing Claude Code or any AI model
- We are NOT a workspace or a Jira replacement
- We ARE the easy button that makes Claude Code accessible to everyone
- We ARE the layer that connects skills to `//` to loops to shared memory

## Onboarding flow (locked)
```
Welcome to DS
  → Choose your skills
  → Set your loops
  → Start working — call anything with //
```
In the background: every action updates shared memory + the team UI automatically.

## Parallel track — design-team AI service (opened 2026-05-23, DECISION-021)
A "for the time being" bridge revenue motion alongside the product build. Tal sells **done-with-you working sessions** to **in-house design leaders**, using the `//` methodology to do real product-design work against the team's actual backlog (research synthesis, JTBD, framing, flows, PRDs, critique). Pricing **per-session / per-seat** — numbers TBD, need first-cohort signal. NOT agent-building/automation — the wedge is "designers want to do the work, not babysit agents." Publishable brief: `company/design-ai-service-brief.md` (long post + short post + hook options + pricing placeholder). Open: confirm in-house vs. open-enrollment; Hebrew version for local communities; lock pricing numbers.

## Current state
- **Phase**: Product build — definition fully closed, UX flow design in progress
- **Date reset**: 2026-05-19
- **Last session**: 2026-05-21 — leader-driven session model locked
  - **Leader-driven model closed (DECISION-019)**: DS leads every session — reads Node Map, names next move, user approves. `/` menu and `//` invocation are power-user escape hatches, not primary UX.
  - Main product offer reframed: DS is an OS / framework that leads your full project lifecycle (research → define → develop → design → ship). Skills are the execution mechanism — not the hero.
  - **Files updated** per DECISION-019 (2026-05-21):
    - `flows/user-journey.html` → v0.2 — leader-driven flow, new tagline, Agent Mode steps rewritten
    - `flows/user-flow.html` → v0.2 — Agent Mode primary flow is leader-driven; / picker is escape hatch branch
    - `agents/system.md` → Phase Gate added, FISH table updated, orientation mode updated, session-start loop updated
    - `CLAUDE.md` → session open protocol updated, Phase Gate + "one move not a menu" as hard rules
  - AAAK memory methodology — still open, not yet defined

- **Previous session (2026-05-20)**:
  - "Allen" branding retired → "// is ON" everywhere (DECISION-015)
  - `agents/allen.md` renamed to `agents/system.md`
  - `.claude/skills/` built — 21 domain scaffold folders + 10 DS-native skills
  - `router/dispatch.md` written
  - `flows/user-journey.html` + `flows/user-flow.html` created (need update per DECISION-019)

## Automation — hooks + digest (live 2026-05-19)
7 Claude Code hooks wired in `.claude/settings.json`:
- UserPromptSubmit: // orientation + save-signal check before every response
- Stop: end-of-turn reminder to write unsaved signal
- PreCompact: force-save before context compression
- SessionStart: file-age scan, flags stale memory in orientation
- PostToolUse (Write|Edit): confirms node-map.md / kanban.md writes to future DS-007
- PreToolUse (Bash git commit): blocks commits with wrong git identity
- PostCompact: re-injects phase + last 3 decisions after context compression

Weekly digest routine live: `trig_015jPcfsVAPFt9cTBbNYAKHw` — every Monday 9am Israel time. Runs // digest (What changed / What's blocked / What needs a decision), saves to company/digests/ in CCR session.

## System agent — definition status (locked 2026-05-19, rebranded 2026-05-20)
System agent definition is complete. Key things locked:
- **Identity**: The product voice. No "Claude." No "Allen." Pre-installed, always on, not optional. Session opens with "// is ON." (DECISION-015)
- **Leadership**: Owns the agenda. Recommends, doesn't list. Drives the Double Diamond phase.
- **Methodology**: FISH-first on every project (Nemo/Tuna/Salmon/Willy). Full Double Diamond methods library. Selects and applies without being asked.
- **Project Intake Protocol**: FISH → propose process → seed Node Map (`node-map.md`) → seed Kanban (`kanban.md`) → name first move. Runs automatically on every new project.
- **Skill loading**: Reads `skills/` folder and invokes skills proactively via `router/dispatch.md`.
- **Security boundary**: Owner-only settings. Prompt injection from any source is flagged and blocked.

Source files: `CLAUDE.md`, `agents/system.md`. Decisions: DECISION-008 through DECISION-011, DECISION-015.

## What we know from research (2026-05-19)

### Competitive landscape
- No product has a native desktop install — browser-only is universal
- Skills-as-onboarding: nobody does this
- Cross-tool `//` invocation: nobody has it
- BYOK: table stakes — Claude Code subscription covers it naturally

### Skills scale (live data, 2026-05-19)
The OSS skills ecosystem is enormous — we don't need to build skills, we need to surface them:
- **punkpeye/awesome-mcp-servers**: 2,628 lines, 50+ categories, thousands of servers
- **n8n**: 1,759 integrations across 14 categories
- **Pipedream**: 2,500 APIs, 8,000+ tools
- **Zapier/Rube (Composio)**: 8,000+ app connections
- **LangChain**: 100+ built-in tools
- **appcypher/awesome-mcp-servers**: deep categories — biology, aerospace, gaming, legal, real estate, IoT, robotics, and more

DS-native skills that don't exist in OSS yet:
- Approval gates, Human-in-the-Loop pause, Context handoff, Task decompose, Parallel fan-out, Idempotency guard

## Reflectional UI (2026-05-19)
The team visibility layer is not a dashboard the user manages — it's a zero-admin side effect of every DS run. Two views:

**Kanban** — live view of all currently running tasks across the project. Each card = one active skill run or loop execution. Source: shared memory. Purpose: the team sees what's happening right now without any admin work.

**Node Map** — per-project tree of past sessions. Each node = a session or significant decision point; edges show how one led to the next. Surfaces artifacts produced, decisions made, directions considered and discarded. Closest analogy: a visual decision log + artifact map layered over time.

Both views are "reflectional" — they reflect back what the AI has done. This is how DS makes team AI usage legible. It is a key product differentiator and part of the zero-admin promise.

## Strategic bets
1. Desktop-native is the unlock — system-wide `//` trigger only works from the OS layer
2. The skills registry is an aggregation layer, not a hand-built list — we source from MCP/n8n/Pipedream/Zapier
3. DS-native skills (the human-AI coordination primitives) are the true IP
4. Memory + team UI as a zero-admin side effect of every run

## What we built (2026-05-20)
- `.claude/skills/` — 21 domains fully populated. Each domain has: domain SKILL.md (menu), 4 phase SKILL.md files, 8 individual skill SKILL.md files (with FISH guide + execution prompt). Total: ~210 SKILL.md files.
- **Skill invocation convention (locked 2026-05-20)**: registered `name:` field is `ds-{domain}-{skill}` (e.g. `ds-product-customer-discovery`). Domain menus register as `ds-{domain}` (e.g. `ds-product`). In-agent trigger is always `/` (single slash), never `//`. All SKILL.md files updated to reflect this — 189 files corrected.
- **Two-step skill navigation (locked)**: User types `/ds-product` → domain menu renders 8 skills → user picks `/ds-product-roadmap-design`. Individual skills also appear in flat `/` picker for direct access. Domain level = the "second layer."
- No `skills/` directory at project root — flat catalog is `skills.md`; executables live in `.claude/skills/`
- `router/dispatch.md` — full dispatch logic for `//` (desktop OS trigger) and `/` (in-agent slash command). DECISION-016.
- `project-brief.md` — one-page project state: what DS is, current phase, all closed decisions, open questions priority-ordered

## Open questions (priority order)
1. **How does `//` technically intercept across different apps?** — macOS: `CGEventTap`, Accessibility API, or hotkey approach? Everything architectural hangs here.
2. **Install strategy for cloud-only AI tools** — ChatGPT Web, Gemini, etc. have no local root folder. How does DS install into them?
3. **Naming tension** — product is "Duble//Slash" but the in-agent trigger is `/` (single slash) and `//` in URLs causes conflicts. Does the name hold? Deferred — not decided.
4. **How does the `/` skills picker surface thousands of skills without overwhelming?** — Onboarding filter? Smart defaults by role?
5. **Who can publish skills?** — OSS-only catalog or user-created? Marketplace model?
6. **Pricing validation** — $12/mo + BYOK needs first-cohort signal (DECISION-003 still Open)
7. **Loop configuration UI** — what does setting a loop look like for a non-technical user?

## Backlog tasks (not time-sensitive — do when capacity allows)
- **Skills picker discoverability** — the Claude Code `/` picker is flat. `ds-product` appears alongside `ds-product-customer-discovery` with no visual grouping or hierarchy. Users don't know to invoke the domain menu first to navigate to sub-skills. Fix lives in the DS desktop app UI (Shenhav), not in SKILL.md files. Requirements: domain skill groups visually collapsed/expandable in the skills picker; OR onboarding teaches the two-step pattern explicitly. Relates to open question #4. (Logged 2026-05-20)
