---
name: ds-strategy-strategic-roadmap
description: Translates strategy into a sequenced execution plan — NOW/NEXT/LATER horizons, OKR cascade, dependency map, resource implications, and risk-adjusted sequencing. Use when moving from strategy to action, planning a year, or asking "how do we execute on this". Also triggers on: initiative prioritization, milestone planning, capacity planning, dependency mapping.
tags: [strategy, develop, strategic-roadmap, now-next-later, okr, dependencies, capacity-planning]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Strategic Roadmap
**Domain**: Strategy | **Phase**: Develop | **Invocation**: `/ds-strategy-strategic-roadmap`

## What this produces
A strategic roadmap with NOW/NEXT/LATER initiative sequencing, OKR cascade, dependency map, capacity implications, and risk-adjusted sequencing — ready to drive quarterly planning.

## Methods
NOW/NEXT/LATER sequencing, initiative prioritization, OKR design, milestone definition, dependency mapping, resource and capacity planning, risk-adjusted sequencing, stakeholder alignment

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Roadmap sketch | NOW/NEXT/LATER table + 3 OKRs + top dependencies |
| Tuna | Full roadmap | Sequenced initiatives + milestones + OKRs + dependency map |
| Salmon | Resource-planned roadmap | All above + capacity model + risk-adjusted sequencing |
| Willy | Operating roadmap | All methods + stakeholder alignment plan + governance cadence |

---

## Execution Prompt

Read the project context: strategic framework and priorities, organizational capacity, key constraints, planning horizon, FISH classification.

---

### Step 1 — Initiative Inventory (all FISH levels)

List every initiative the organization is considering or committed to. Categorize before prioritizing.

| Initiative | Strategic priority it serves | Type | Effort | Impact |
|---|---|---|---|---|
| [Initiative] | [Priority 1] | Keep-lights-on / Growth / Transform | S/M/L | H/M/L |

**Types:**
- **Keep-lights-on**: mandatory, existing operations must continue
- **Growth**: extend or scale what's working
- **Transform**: build new capabilities or enter new markets

**Rule:** resource is always constrained. If everything is "high priority," nothing is. Force-rank by impact/effort before sequencing.

---

### Step 2 — NOW/NEXT/LATER Sequencing (all FISH levels)

```
NOW (0–3 months):
  [Initiative] — [Why now: dependency, timing, or urgency]
  [Initiative] — [...]

NEXT (3–12 months):
  [Initiative] — [Prerequisite: what must happen in NOW phase first]
  [Initiative] — [...]

LATER (12+ months):
  [Initiative] — [What has to be true for this to move forward]
  [Initiative] — [...]

Explicitly excluded:
  [Initiative] — [Why not now: resource constraint, strategic depriority]
```

**Gate criteria between NOW → NEXT:**
Define what must be true before NEXT work begins. Prevents premature scaling.

---

### Step 3 — OKR Cascade (Tuna, Salmon, Willy)

For each NOW initiative, define the OKRs that govern its execution.

```
Initiative: [name]
Owner: [person]
Q[N] OKRs:

Objective: [qualitative direction]
  KR 1: [Metric] from [X] to [Y] by [date]
  KR 2: [Metric] from [X] to [Y] by [date]
  
Grade threshold: 0.7 = success, 1.0 = question whether target was ambitious enough
```

---

### Step 4 — Dependency Map (all FISH levels)

```
Initiative [A] depends on:
  → [Initiative B] completing first — [specific output required from B]
  → [External: partner API ready] — [expected date, risk if delayed]
  
Initiative [B] depends on:
  → [Team C hiring 2 engineers] — [expected by date]
  
Critical path: [the sequence of dependencies where any delay cascades to roadmap delay]
```

**Flag every dependency that crosses team or organizational boundaries.** These are the most common source of roadmap failure — they require explicit coordination commitments, not just documentation.

---

### Step 5 — Capacity Model (Salmon, Willy)

```
Team | Capacity (person-days/quarter) | Committed to NOW | Available for NEXT
[Team A] | [X] | [Y allocated] | [X-Y remaining]
[Team B] | [X] | [Y allocated] | [X-Y remaining]

Capacity gap: [if NOW work > total capacity, name what gets cut or delayed]
Hiring implications: [if NEXT work requires additional headcount]
```

**Rule:** roadmaps that don't account for capacity are wishlists. If the math doesn't work, something must be descoped — name it explicitly.

---

### Step 6 — Risk-Adjusted Sequencing (Salmon, Willy)

For each NOW initiative, assess whether its sequence is risk-optimal.

| Initiative | Risk | If failed early | Sequence adjustment |
|---|---|---|---|
| [Initiative] | [dependency risk] | [impact] | [Build proof-of-concept before full investment] |
| [Initiative] | [market risk] | [impact] | [Pilot with 1 customer before scaling] |

**Principle:** high-risk, high-investment work should be de-risked early (small experiments first). Low-risk, high-value work can be executed with confidence.

---

### Final Output

**Initiative inventory** — categorized and ranked
**NOW/NEXT/LATER table** — with gate criteria between horizons
**OKR cascade** — per NOW initiative (Tuna+)
**Dependency map** — cross-team dependencies highlighted
**Capacity model** — allocation vs. availability, hiring implications (Salmon+)
**Risk-adjusted sequence** — high-risk items de-risked early (Salmon+)
**Recommended next skill** — `/ds-strategy-strategy-execution` (set up governance to execute) with one-sentence reason
