# Duble//Slash — Project Brief
_Last updated: 2026-05-20_

---

## What it is

**Duble//Slash** (`//`) is the onboarding layer for AI use.

Claude Code (and every other AI tool) can already do almost anything. The problem is access — most people don't know how to invoke the capability they need. DS solves this with one primitive: `//`.

Type `//` anywhere, pick a skill, get an outcome. No prompt engineering. No agent configuration. No workflow design. Just `//`.

**Three things DS ships:**
1. **Skills** — complete, outcome-producing capabilities organized by domain and phase. Customer discovery, competitive analysis, system design, GTM strategy — thousands of skills, each producing a deliverable.
2. **Loops** — automated runs. Set what should happen and when. DS handles execution.
3. **`//` trigger** — system-wide. Works from any app. One keystroke summons anything in the registry.

**In the background:** every run logs to shared memory. The team sees what happened — Kanban (active runs) + Node Map (session history + decisions) — zero admin.

---

## Who it's for

Knowledge workers who use AI tools but can't consistently extract value from them. 88% of orgs use AI; 60% get no real value. The gap is not capability — it's workflow. DS gives them the structure that makes AI behave like a domain expert.

**Enterprise wedge:** local execution, compliance-safe, no data leaves the device. Blocks the cloud-tool prohibition that keeps AI out of regulated industries (ref: Yonatan interview, 2026-05-19).

---

## Form factor

**Desktop app** — system-wide `//` trigger only works from the OS layer. Native install, menu-bar always-on. Wispr Flow / Raycast shape. Web companion for Kanban + Node Map visibility.

---

## Business model

$12/mo platform + user's own API key (BYOK). Tokens on the user — aligns with power users who already have Claude/OpenAI access, removes token cost risk from DS P&L. (DECISION-003 — open, needs validation.)

---

## Current phase

**Start of product build.** Definition is fully closed:
- Positioning locked (DECISION-004)
- Form factor locked (DECISION-002)
- Skills definition locked (DECISION-013, DECISION-014)
- System agent (formerly "Allen") retired in favor of "// is ON" identity (DECISION-015)

---

## Most blocking open questions (priority order)

1. **How does `//` technically intercept across different apps?** — Everything architectural hangs on this. macOS: `CGEventTap`, Accessibility API, or hotkey approach. Need a spike.
2. **How does the skill picker surface thousands of skills without overwhelming?** — Onboarding filter? Smart defaults by role? This is the UX inflection point.
3. **Who can publish skills?** — OSS-only catalog, or user-created skills? Marketplace model?
4. **Pricing validation** — $12/mo + BYOK needs signal. First cohort test.

---

## Locked decisions (do not relitigate)

| # | Decision | Date |
|---|---|---|
| 001 | Skills layer on top of Claude Code — not a custom runtime | 2026-05-19 |
| 002 | Desktop app, not web-only | 2026-05-19 |
| 004 | Onboarding layer positioning — not a workspace replacement | 2026-05-19 |
| 005 | System agent ships pre-installed — not optional | 2026-05-19 |
| 006 | Three-tier permission model | 2026-05-19 |
| 007 | System agent is a skill/persona, not a separate runtime | 2026-05-19 |
| 008 | Methodology-first — FISH + Double Diamond | 2026-05-19 |
| 009 | Project Intake Protocol — FISH → Node Map → Kanban → first move | 2026-05-19 |
| 010 | Leadership behavior — drives agenda, doesn't wait | 2026-05-19 |
| 011 | Security boundary — owner-only settings | 2026-05-19 |
| 012 | Skill menu at session open — phase-matched, not generic footer | 2026-05-19 |
| 013 | Skills = executable capabilities, not MCP integrations | 2026-05-19 |
| 014 | Skills registry: Domain × Phase × Methods, 21 domains MVP | 2026-05-19 |
| 015 | Kill Allen branding — "// is ON" everywhere | 2026-05-20 |

---

## Key files

| File | Purpose |
|---|---|
| `CLAUDE.md` | Operating instructions for every session |
| `memory.md` | Living project context |
| `decisionlog.md` | Closed decisions — never relitigate without flagging |
| `skills.md` | Full skill catalog — 21 domains × 4 phases |
| `skills/` | Skill folders — each skill as an executable unit |
| `agents/system.md` | System agent definition |
| `agents/allen-conversation-protocol.md` | Session open protocol |
| `methodology.md` | FISH + Double Diamond + HAI principles |
| `router/` | `//` dispatch logic |
