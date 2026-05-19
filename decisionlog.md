# Decision Log
_Decisions are permanent once closed. Read this before proposing direction changes._

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

## [DECISION-003] Monetization model — platform fee + BYOK
**Date**: 2026-05-19  
**Status**: Open (needs validation)  
**Options considered**: (A) Token-inclusive subscription / (B) Platform fee + user brings own API key  
**Decision**: Leaning (B) — $12/mo for platform, tokens on the user (Claude Code subscription or direct API key)  
**Rationale**: BYOK aligns with power users who already have Claude/OpenAI access. Removes token cost risk from our P&L.  
**Consequences**: Requires users to have an existing API key. May add friction at onboarding. Revisit if conversion data shows dropoff here.
