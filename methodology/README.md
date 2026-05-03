---
name: Duble Slash Methodology — folder index
description: Top-level index for the Fish Model (AI-era methodology for design/product/engineering work), local agents (run inside the user's AI tool), and system agents (run in Duble Slash Cloud). This is the moat.
type: methodology-index
---

# Duble Slash Methodology

> **This folder is the moat.** Everything else in Duble Slash — the capture layer, the Duble Slash Cloud, the cross-tool handoff, the pricing model — serves a single purpose: *giving humans who work with AI a method that doesn't break under them*. The method is the **Fish Model** — the AI-era evolution of the original 2024 spec. The agents in this folder are what enact it.

---

## What lives here

```
methodology/
├── fish-model.md                   ← THE spec · one doc · read this first
├── methods.md                      ← Pillar 1 · method catalog · ai-mode + skill contracts
├── artifacts.md                    ← Pillar 2 · artifact graph · 69 types + schemas
├── projections.md                  ← Pillar 3 · Fish Kanban + foreign adapter contracts
├── agents-overview.md              ← all 13 agents in one map
├── fish/                           ← historical reference; fish-model.md is canonical
│   ├── README.md
│   ├── phases-and-methods.md
│   ├── human-ai-collaboration.md
│   ├── contracts.md                (retired — primitives deferred per Tal 2026-04-23)
│   ├── transitions-and-handoffs.md
│   └── use-cases.md
├── local-agents/                   ← 4 personas the user invokes via `//` (pre-rebuild)
│   ├── README.md                   roster + universal contract + capability codes
│   ├── explorer.md                 phase 1 · head · Dora   (renamed from Nova, Phase 3+4)
│   ├── solidifier.md               phase 2 · left body · Sol
│   ├── builder.md                  phase 3 · right body · Bran (renamed from Bram, Phase 3+4)
│   └── shipper.md                  phase 4 · tail · May    (renamed from Sage, Phase 3+4)
└── system-agents/                  ← 9 background workers in Duble Slash Cloud
    └── README.md                   Tally · Cipher · Relay · Beacon · Pack ·
                                     Echo · Twin · Gate · Loom
```

> **Note (2026-04-23 rebuild — Phase 1 revision):**
> Phase 1 deliverable is **`fish-model.md`** — one authoritative doc that supersedes every file
> in `fish/`. Primitives (`contracts.md`) deferred until the methodology is solid and an
> agent rebuild is underway. The `fish/` folder is kept in place to preserve references
> until the Phase 4 directory reorganization retires it atomically.

---

## Three layers, one methodology

| Layer | What it is | Where it runs | Who invokes it | Ships in |
|---|---|---|---|---|
| **Methodology** (`fish-model.md` + three pillars) | The spec — phases, fish types, steps, methods (Pillar 1), artifact graph (Pillar 2), projections (Pillar 3). | One folder. Everyone reads it. | n/a | Day 1 |
| **Local agents** (`local-agents/` → `agents/operators/`) | Four phase-shaped personas the user's AI tool adopts when they type `//`. | Inside Claude Desktop / Cursor / ChatGPT Desktop (as memory/instructions). | User, via `//{phase}` | OSS launch |
| **System agents** (`system-agents/`) | Background workers in Duble Slash Cloud that observe, protect, and route between tools and teammates. | Duble Slash desktop client + hosted backend. | Continuously; no user invocation. | Capture + Redaction → OSS launch; rest → V1 |

**Local and system agents are complementary, not redundant.** While the user talks to the Explorer inside Claude, the Capture agent is recording the session, the Redaction agent is gating any push, and the Sync agent (V1) is syndicating the result to teammates. Fish Model is the shared vocabulary that lets all of them cooperate without stepping on each other.

---

## How to read this folder

- **Which agent do I reach for / who are all these agents?** → [`agents-overview.md`](./agents-overview.md). The single-file roster + hierarchy + task-lookup.
- **New to the Fish Model:** start at [`fish-model.md`](./fish-model.md). One doc, every concept.
- **What methods can agents run, and how?** → [`methods.md`](./methods.md). ~85 methods, ai-modes, live loops, skill contracts.
- **What artifacts do methods produce?** → [`artifacts.md`](./artifacts.md). 69 types, schemas, the artifact graph.
- **How does work appear on the Kanban and in Jira/Figma/Linear/Slack?** → [`projections.md`](./projections.md). Native board + foreign adapter contracts.
- **"Why should I care as a designer using AI?":** [`fish-model.md` §13](./fish-model.md#13-what-ai-changes--real-pains-real-fixes). The 5-minute pitch.
- **"What do I actually *do* in each phase?":** [`fish-model.md` §5–7](./fish-model.md#5-the-four-phases-fish-anatomy).
- **"Show me a real example":** [`fish-model.md` §14](./fish-model.md#14-worked-examples--one-per-archetype).
- **Installing the `//` agents:** [`local-agents/README.md`](./local-agents/README.md).
- **Building / reviewing Duble Slash's background workers:** [`system-agents/README.md`](./system-agents/README.md).

---

## Core principle (from the article, restated)

> *"Communication is the key to success."*
> — The Fish Model, 2024

The Fish Model is a communication contract, dressed as a methodology. The phases, fish types, and handoffs exist so that **designer ↔ developer ↔ PM ↔ AI ↔ future-you** all describe the same work the same way. Everything in this folder is downstream of that principle.

---

## Status & ownership

- **Owner:** Tal
- **Last full revision:** 2026-05-03 (renamed FLOW → Fish Model; `flow.md` → `fish-model.md`; three-pillar runtime added: `methods.md` · `artifacts.md` · `projections.md`)
- **Source lineage:** <https://www.talsolomonux.com/p/0d2> (the 2024 article introducing the Fish Model) + subsequent blog posts cataloging the method set (see [`fish-model.md` §8](./fish-model.md#8-method-catalog)).
- **Change protocol:** edits to `fish-model.md` must be reflected in `local-agents/*` and `system-agents/*` within the same change if they alter phase names, axis semantics, or handoff shape. There is one source of truth per concept; files cross-reference rather than duplicate.
