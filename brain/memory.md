# Project Memory — Duble//Slash
_Living document. Update every session. Always date your entries._

---

## What we're building
**Duble//Slash** — the onboarding layer for AI use.

The problem is not capability — it's access. Most people don't know how to harness what's already there. DS solves that by giving them the `//` power: a simple, out-of-the-box way to call anything they want, without replacing their workspace.

**Three things DS does:**
1. **Skills** — executable capabilities you summon with `//`. Each skill is a complete, outcome-producing workflow. Thousands in the registry.
2. **Loops** — you set what should run automatically, and when
3. **`//` trigger** — you call any skill from any tool, any time

## Positioning (locked 2026-05-19, updated 2026-05-21)
> **Tagline:** "Eliminate the distance between 'I have an idea' and 'it's live.'"
> **Sub-line:** "DS gives your AI the workflow it was missing — not a better model, the structure that makes it behave like one."

## Current state
- **Phase:** Product build — production spec ready, design handoff to Shenhav in progress
- **Session 2026-05-26:** DS architecture v2 built — 5-tier Brain folder structure (Root/Team/Project/Decision/Task), 5 new operational skills (ds-new-request, ds-project, ds-decision, ds-task, rewritten ds-dubleslash), voice layer injected into all 273 domain skills, CLAUDE.md thinned to 3-rule on/off switch, hooks updated to read brain/
- **Last session:** 2026-05-24 — full production spec written, flows updated to v0.3

### What's done
- `planning/ds-production-spec.md` — single source of truth for all design + engineering
- `flows/user-journey.html` → v0.3
- `flows/user-flow.html` → v0.3
- Skills: all 7 product-domain skills at mastermind level + config.json
- Domain skill scaffolds: 21 domains in `.claude/skills/`
- DS viewer: `~/.claude/ds-viewer/server.js`, localhost:3333, SSE-driven

### What's open
1. **OQ-01:** `//` OS intercept strategy — CGEventTap vs Accessibility API vs hotkey. Blocks Shenhav on Desktop Mode design.
2. **OQ-04:** Skills picker discoverability — role-based onboarding filter design
3. **MCP installer UX** — Shenhav to design one-click connector wizard
4. **Pricing validation** — first-cohort signal for $12/mo + BYOK (DECISION-003 open)
5. **AAAK memory methodology** — Shenhav owns this

## Architecture (current — 2026-05-26)
Five-tier Brain structure:
- **Root** `~/.claude/` — Claude.md (on/off), MEMORY.md
- **Team** `~/.claude/teams/dubleslash/` — cross-project shared knowledge
- **Project** `<project>/brain/` — memory, project-plan, sessions, feature-plans, MCP+creds, links
- **Decision** `<project>/decisions/<slug>/` — decision-plan, resources, memory/closets+drawers
- **Task** `<project>/decisions/<slug>/tasks/<slug>/` — brief.md (machine-readable, hook target)

Five DS operational skills:
- `ds-dubleslash` — session start, context check, orient and suggest
- `ds-new-request` — translates any request → project/feature/decision plan
- `ds-project` — session-end file sync (create/merge/archive all brain/ files)
- `ds-decision` — manages a decision folder lifecycle
- `ds-task` — manages task brief + status, hook-ready

## Strategic bets
1. Desktop-native is the unlock — system-wide `//` only works from OS layer
2. Skills registry = aggregation layer, not hand-built list (MCP/n8n/Pipedream/Zapier)
3. DS-native skills (human-AI coordination primitives) are the true IP
4. Memory + team UI as zero-admin side effect of every run
5. Task brief as hook target = path from AI assistant → AI that acts autonomously
