# Node Map — Duble//Slash

## Session 2026-05-23
- decision: Open parallel service track — design-team AI working sessions [DECISION-021]
  - thinking: bridge revenue motion alongside product build; wedge = "do the work, not build agents"
  - decision: offer = done-with-you session · buyer = in-house design leaders · pricing = per-session/seat
  - artifact: company/design-ai-service-brief.md (publishable brief for WhatsApp/FB groups)
  - flag: SessionStart context hooks didn't fire; PreToolUse git hook is blocking ALL Bash, not just commits; git identity unset

## Session 2026-05-21
- thinking: DS viewer — how to make reflectional UI visible inside Claude Code?
  - decision: HTML + SSE server — zero deps, real-time file watching
  - decision: Three views: kanban, node-map, memory feed
  - artifact: ~/.claude/ds-viewer/server.js
- decision: Leader-driven session model locked [DECISION-019]
  - thinking: DS should lead every session — read Node Map, name next move, user approves
  - artifact: memory.md — leader-driven model noted in current state

## Session 2026-05-20
- decision: Allen branding retired — "// is ON" everywhere [DECISION-015]
  - artifact: agents/system.md (renamed from agents/allen.md)
- task: Build .claude/skills/ directory
  - decision: Skill naming convention — ds-{domain}-{skill} [DECISION-016]
  - artifact: .claude/skills/ — 21 domain folders, ~210 SKILL.md files
- artifact: router/dispatch.md — full // dispatch logic
- artifact: flows/user-journey.html
- artifact: flows/user-flow.html
- artifact: project-brief.md

## Session 2026-05-19
- decision: Product definition reset — DS is the onboarding layer for AI use
- decision: Positioning locked — "Finally, AI that moves your work forward" [DECISION-012]
- decision: Desktop-native is the unlock — system-wide // trigger from OS layer
- decision: Skills registry as aggregation layer, not hand-built list
- artifact: memory.md — full product state written
- artifact: decisionlog.md — DECISION-001 through DECISION-014
- artifact: .claude/settings.json — 7 hooks wired
- artifact: agents/system.md — full system agent definition
