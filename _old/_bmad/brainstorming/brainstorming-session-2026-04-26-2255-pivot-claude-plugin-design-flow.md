---
stepsCompleted: [1, 2]
inputDocuments: []
session_topic: 'Pivot from desktop app to Claude plugin + companion web app for designer/dev process & handoff'
session_goals: 'Find the ONE monetizable idea in AI-for-designers/developers — pivot is the vehicle for the search, not the goal'
selected_approach: 'ai-recommended'
techniques_used: ['First Principles Thinking', 'Assumption Reversal', 'Anti-Solution / Pre-mortem']
ideas_generated: []
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Tal Solomon
**Date:** 2026-04-26

## Session Overview

**Topic:** Pivot from desktop app to Claude plugin (`//` trigger) + companion web app, focused on designers and the designer↔developer handoff. Hypothesis: the real pain is syncing design *context* (not files) into dev-ready production. Web app = chain-of-process UI that builds brief → design system → PRD → Figma-integrated deliverables, powered by FLOW methodology + agents.

**Goals:**
- Pressure-test the pivot before committing
- Expose holes (especially the designer-handoff vs. context-moat tension)
- Generate 100+ orthogonal ideas across distribution, product surface, methodology fit, business model, defensibility, and edge cases
- Decide whether the framing is "Claude Design" or something else

### Pre-session framing note (facilitator)

Two pivots bundled into one:
1. **Distribution:** desktop → Claude plugin. Likely correct.
2. **Product:** human-AI context collaboration → designer-developer handoff. *Different category*. Risk: web app drifts into Figma Dev Mode / Zeplin territory and loses the FLOW/Context Cloud moat.

Brainstorming must hold both threads and force the user to pick — or invent a frame where they're the same thing.

### Session lens (mid-session reframe by Tal)

**The only thing being searched for is THE ONE monetizable idea in AI-for-designers/developers.** Pivot is the vehicle for the search. Filter every idea: who pays, for what, why this and not the free thing. Methodology / distribution / "interesting" features are noise unless they collapse into a payable surface.

## Technique Selection

**Approach:** AI-Recommended Techniques

**Sequence:**
1. **First Principles Thinking** — strip pivot to atomic truths; force "what is the unit of value someone pays for?"
2. **Assumption Reversal** — flip every load-bearing assumption (buyer, surface, host, methodology role)
3. **Anti-Solution / Pre-mortem** — generate failure modes, check which the pivot increases vs. decreases

**Total:** ~70 min. Output: yes/no/reshape verdict on the pivot, with the one monetizable wedge named.

---

## Phase 1: First Principles Thinking

### Tal's reframe (mid-Phase-1) — strongest pitch of the session

Web app that **mimics the FISH model as the team-shared visual container for AI work**. Plugin syncs Claude sessions into the board. Agents in the web app organize work and dispatch sub-agents. Runs 24/7 — agents work overnight. MCPs (Figma, etc.) auto-push deliverables into the board as cards.

**Thesis:** *There is no good team-level container for AI sessions. Linear/Notion/Jira don't model AI work as a first-class object. Cursor/Claude Code are single-player. The gap is a team-shared kanban dedicated to AI sessions.*

**Why this is the strongest framing so far:**
- Names a SKU shape: per-seat team SaaS, $15–$30/seat band
- Has a real category claim ("team-level container for AI sessions" is a real gap)
- FISH = differentiated visual on a known monetization pattern
- MCPs + auto-deliverables = switching-cost moat (the board becomes the destination)
- Plugin-as-distribution + web-app-as-retention is now a coherent funnel, not double-counting

### Holes flagged by facilitator

**Hole 1 — Crowding & sherlocking risk.** Direct & adjacent competitors:
- Anthropic Managed Agents (sherlock risk)
- Devin / Cognition, Sweep, Cosine, Codegen, Factory (async agent platforms)
- Linear AI roadmap, Notion AI, v0 Teams
- Window of unique positioning is short — assume Linear ships 70% of this as a checkbox within 12 mo
- Survival depends on what the FISH-board does that Linear-with-AI-features can't copy in a sprint

**Hole 2 — "Designers AND developers" is a tell.** Need to pick the wedge for v1:
- Designer-led wedge: FISH-visual board, Figma MCP killer integration, design-flavored agents, $20–30/seat, distro via Figma community
- Engineering-led wedge: agent task tracking, GitHub MCP, code-flavored agents, $30–50/seat, distro via HN/Cursor crowd
- Facilitator lean: **designer-led** — authentic credibility, less crowded, AI-for-designers-as-designers is genuinely under-tooled (Magic Patterns/v0/Galileo treat designer as code-target, not as designer)

**Hole 3 — Agent compute COGS.** 24/7 overnight runs = real money:
- (a) BYO Anthropic key — clean margin, high friction
- (b) Pass-through markup — thin margin, low friction
- (c) Seat tier caps + overage — managed margin, requires usage telemetry
- **Plugin architecture solves this elegantly:** agents run inside the user's own Claude session (user pays Anthropic), web app is just the team-shared state layer. Re-justifies the plugin choice on margin grounds, not just acquisition.

### Open questions Tal still owes Phase 1

- **The SKU sentence:** "$X/seat/month for [designer/developer/both] teams using Claude, where each seat unlocks [specific value], free→paid forcing function is [specific moment]."
- **The wedge pick:** designer-led v1 or engineer-led v1?




