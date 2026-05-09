---
name: Agents — navigation index
description: Single entry point for the full DubleSlash agent system. Start here.
---

# DubleSlash — Agent System

> **Start here.** This is the navigation index for every agent, skill, and piece of infrastructure in the DubleSlash agent fabric.

---

## Structure

```
agents/
├── README.md               ← you are here
├── config.yaml             ← system-wide paths, model policy, data classification
├── manifest.yaml           ← full system manifest (v0.2.0, three-tier)
├── system-map.html         ← interactive visual map (open in browser)
├── skill-manifest.csv      ← flat skill registry
├── operator-manifest.csv   ← operator skill matrix
│
├── orchestrators/          ── Tier 0: board-level intelligence
│   ├── apex/               ← Chief Orchestrator (CA, SC, AD, HR, PQ, LS)
│   └── guard/              ← Privacy Warden (HS, SA, ID, DC, RD, PR)
│
├── sync/                   ── Tier 1: session bridge & pattern watch
│   ├── echo/               ← Session Bridge (SC, CP, DD, SI, CR, SH)
│   └── prism/              ← Pattern Watcher (SM, CL, DD, OR, PS, GR)
│
├── operators/              ── Tier 2: FLOW phase workers
│   ├── dora/               ← Explorer — Explore phase (HMW, PM, CS, JM, IP…)
│   ├── sol/                ← Solidifier — Solidify phase (TA, BR, AC, PT, SK…)
│   ├── bran/               ← Builder — Build phase (GE, SL, TE, UV, IN, PR)
│   └── may/                ← Shipper — Ship phase (RE, CM, TR, RN, MS, NL…)
│
├── helpers/                ── Shared utilities (used by all operators)
│   ├── handoff-compose/    ← HO — compose a FLOW handoff
│   └── handback-compose/   ← HB — compose a FLOW handback
│
├── canon/                  ── Book canon (80+ texts, per-agent mappings)
│   ├── book-canon.md       ← full library organized by domain
│   └── book-canon-by-agent.md  ← each agent's primary texts + how applied
│
└── docs/                   ── Reference documentation
    ├── agent-system.md     ← master PRD-ready reference (all agents, infra, shipping order)
    ├── agents-overview.md  ← one-stop orientation (what each agent does, when to reach for it)
    ├── local-agents/       ← earlier operator specs (Dora, Sol, Bran, May, Experts)
    └── system-agents/      ← earlier background agent specs
```

---

## Three-Tier Architecture

| Tier | Layer | Agents | Invocation |
|------|-------|--------|------------|
| **0** | Orchestrators | Apex, Guard | `//apex`, `//guard` |
| **1** | Sync | Echo, Prism | `//echo`, `//prism` |
| **2** | Operators | Dora, Sol, Bran, May | `//explore`, `//solidify`, `//build`, `//ship` |

---

## Coordination Protocol

```
User invokes //     →  Apex runs CA silently (board read)
Operator emits HO   →  Apex routes to Guard (HS scan)
Guard PASS          →  HO written; Echo captures; Prism indexes
Guard FLAG          →  HO blocked until remediated
Session closes      →  Echo diffs + pushes to .flow/
                       Prism watches for cross-context patterns
Weekly (Mon 09:00)  →  Apex: HR + LS
Weekly (Sun 20:00)  →  Guard: PR (full .flow/ audit)
```

---

## Quick Reference

**Which agent do I reach for?**

| Situation | Agent | Command |
|-----------|-------|---------|
| Need to explore a problem space | Dora | `//explore` |
| Need to lock the shape / write AC | Sol | `//solidify` |
| Need to implement against the AC | Bran | `//build` |
| Need to release and narrate | May | `//ship` |
| Need board status / priority queue | Apex | `//apex` |
| Need to scan data before sync | Guard | `//guard` |
| Need to capture/restore a session | Echo | `//echo` |
| Need cross-context pattern analysis | Prism | `//prism` |

---

## Model Policy

- **Haiku** — extraction, tagging, pattern matching, mechanical work
- **Sonnet** — judgment, synthesis, quality gates, report writing
- **Opus** — **forbidden** (Sonnet is the ceiling, always)

See `config.yaml` → `model_policy` for per-capability hints.

---

## Infrastructure

- **Local state**: `.flow/` — cards, handoffs, sessions, guard reports
- **Cloud sync** (planned): Upstash Redis — sub-5ms, HTTP REST, ordered event stream
- **Knowledge base**: `planning/knowledge/` — entity-node graph (Rowboat-style), not wiki summaries
- **System map**: `agents/system-map.html` — open in browser for the interactive visual

---

## Canonical texts

Full library → `canon/book-canon.md`
Per-agent mappings → `canon/book-canon-by-agent.md`
