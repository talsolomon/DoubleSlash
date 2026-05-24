# Node Map — Duble//Slash

## Session 2026-05-24
- thinking: converge DS methodology for Shenhav handoff — user journey, session model, skills architecture, MCPs
  - artifact: planning/ds-production-spec.md — full production spec (8 sections): user journey, session methodology, FISH, Phase Gate, skills architecture + OSS model, MCPs/connectors, UI requirements for Shenhav, open questions blocking design
  - artifact: flows/user-journey.html → v0.3 — MCP install step added, OS shortcut registration, date updated
  - artifact: flows/user-flow.html → v0.3 — MCP one-click installer in install flow, date updated
- decision: Skills OSS model — github.com/dubleslash/skills, folder-per-skill, CONTRIBUTING.md + skill-template, PR-based curation [implied from spec]
- decision: MCP strategy — DS presents one-click connector wizard, writes config files automatically, user never sees JSON
- open: AAAK memory methodology still undefined
- open: OQ-01 (// OS intercept) and OQ-04 (skills picker discoverability) block Shenhav's Desktop Mode design

## Session 2026-05-21
- thinking: DS viewer — how to make reflectional UI visible inside Claude Code?
  - decision: HTML + SSE server — zero deps, real-time file watching [DECISION-021]
  - decision: Three views: kanban, node-map, memory feed
  - artifact: ~/.claude/ds-viewer/server.js — 648-line single-file viewer
  - decision: Cytoscape.js + dagre for node map hierarchical layout [DECISION-022]
    - artifact: Cytoscape graph view — type shapes, depth-staggered entrance, tooltip
    - artifact: List view toggle — indented outline, full labels, all items clickable
  - decision: install.sh bash script for distribution [DECISION-023]
    - artifact: install/server.js — canonical viewer source in repo
    - artifact: install.sh — global install + --init project seed
  - artifact: planning/ds-live-viewer-spec.md — FISH Salmon full spec
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
