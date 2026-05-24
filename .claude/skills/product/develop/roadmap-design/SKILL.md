---
name: ds-product-roadmap-design
description: Builds a sequenced NOW/NEXT/LATER roadmap with OKRs and dependency map. Use when prioritization or sequencing is the bottleneck, before quarterly planning, or asking "what do we build first". Also triggers on: NOW/NEXT/LATER mapping, outcome roadmap, opportunity roadmap, theme-based roadmap, quarterly planning, OKR design, release planning.
tags: [product, develop, roadmap, okr, prioritization, sequencing]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Roadmap Design
**Domain**: Product | **Phase**: Develop | **Invocation**: `/ds-product-roadmap-design`

## What this produces
A sequenced, outcome-driven plan: NOW/NEXT/LATER roadmap, OKR set, dependency sequence, and capacity reality check. On Willy: full portfolio roadmap with stakeholder alignment framing.

## Methods
NOW/NEXT/LATER mapping, outcome roadmap, opportunity roadmap, theme-based roadmap, quarterly planning, OKR design, release planning, dependency sequencing, stakeholder alignment workshop, capacity planning, risk-adjusted sequencing, portfolio prioritization, WSJF (Weighted Shortest Job First), MoSCoW prioritization

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean roadmap | NOW/NEXT/LATER + 2–3 OKRs + top 3 dependencies |
| Tuna | Outcome roadmap | Outcome-based roadmap + full OKR set + dependency map + capacity check |
| Salmon | Quarterly plan | Theme-based roadmap + OKRs with leading indicators + risk-adjusted sequencing + capacity plan |
| Willy | Portfolio roadmap | Full portfolio roadmap + OKR cascade + stakeholder alignment framing + WSJF prioritization |

---

## Execution Prompt

Read the project context: the requirements from Define phase (story map, scope boundary), FISH classification, team size and composition (if known), any constraints (deadline, budget, dependencies), and any strategic priorities from memory.

---

### Step 1 — Prioritization (all FISH levels)

Before building the roadmap, score what needs to go in it.

**Nemo — MoSCoW:**
Sort all features/stories into: Must Have (blocks launch), Should Have (important but workaroundable), Could Have (nice to have), Won't Have (explicitly out of scope v1).

Only Must Haves go in NOW. Should Haves split across NEXT/LATER by dependency order.

**Tuna/Salmon — RICE Re-score:**
Pull the RICE scores from Define phase. If missing, score now:
- Reach (users/quarter), Impact (3/2/1/0.5/0.25), Confidence (%), Effort (person-months)
- RICE = (R × I × C) / E
- Rank all items. Top quartile = NOW candidates. Second = NEXT. Rest = LATER or cut.

**Willy — WSJF (Weighted Shortest Job First):**
Score each item on: User/Business Value + Time Criticality + Risk Reduction — then divide by Job Size (story points or T-shirt).
WSJF = (Value + Time Criticality + Risk Reduction) / Job Size
Highest WSJF = build first. This optimizes for economic impact, not just user value.

---

### Step 2 — NOW / NEXT / LATER Map (all FISH levels)

**Format:**

```
## NOW — [timeframe, e.g., "This sprint" / "Q3 2026" / "0–6 weeks"]
Theme: [what problem this cluster solves]
| # | Item | Why now | Est. effort | OKR it moves |
|---|---|---|---|---|
| 1 | ... | ... | ... | ... |

## NEXT — [timeframe]
Theme: [what problem this cluster solves]
| # | Item | Why next | Depends on | OKR it moves |
|---|---|---|---|---|

## LATER — [timeframe or "TBD"]
Theme: [what this cluster unlocks]
| # | Item | Why later | Trigger to pull forward |
|---|---|---|---|
```

**Rules for a good roadmap:**
- NOW items are fully scoped and ready to build — no open questions
- NEXT items have clear dependencies identified — nothing is blocked by an unknown
- LATER items have a stated trigger: "We pull this forward when [condition]"
- No more than 5 items in NOW — anything beyond that is a lie

**Salmon/Willy — Theme-based format:**
Group items by theme (user outcome), not by feature. Each theme has: goal, 2–4 items, success metric, and time horizon.

Example theme:
```
Theme: Reduce time-to-first-value
Goal: New users reach core value in < 10 minutes
Items: Onboarding flow v2, Smart defaults, Empty state redesign
Metric: Median time-to-activation
Horizon: Q3 2026
```

---

### Step 3 — OKRs (all FISH levels)

Write OKRs that are outcome-driven, not feature-driven. Every OKR is tied to user value, not shipping volume.

**Objective format:**
> [Direction] [user segment] can [achieve outcome] — [emotional resonance]

Examples:
- Good: "New users reach their first meaningful result in under one session"
- Bad: "Ship onboarding v2"

**Key Result format:**
> [Metric] moves from [baseline] to [target] by [date]

Rules for good Key Results:
- Measurable without interpretation
- Time-bound (quarter or sprint cycle)
- 2–4 KRs per Objective — more dilutes focus
- At least one KR is a leading indicator (signals progress before the final outcome lands)

**Nemo**: 2–3 OKRs total
**Tuna**: 3–5 OKRs, each with 2–3 KRs
**Salmon**: Full quarterly OKR set — one Objective per roadmap theme
**Willy**: OKR cascade — company OKRs → product OKRs → team OKRs, with alignment shown

---

### Step 4 — Dependency Sequencing (Tuna, Salmon, Willy)

Map dependencies explicitly. A dependency missed now becomes a blocker in two weeks.

**Dependency types to map:**
- **Technical**: "Feature B requires Feature A's API to be complete"
- **Team**: "Design must deliver X before engineering can start Y"
- **External**: "Launch requires legal sign-off on Z"
- **Data**: "We need 30 days of data before we can tune the algorithm"

Format:
```
## Dependency Map

[Item A] → [Item B] → [Item C]   ← sequential dependency chain
                    ↗
          [Item D] →              ← parallel dependency

Blockers (resolve before sprint starts):
- [Item] blocked by [dependency] — owned by [person] — ETA [date]
```

Identify the **critical path** — the longest chain of dependencies. The critical path determines the earliest possible ship date. Highlight it.

---

### Step 5 — Capacity Reality Check (Tuna, Salmon, Willy)

Match the roadmap to real capacity. A roadmap that ignores capacity is a wishlist.

**Inputs**: team size, velocity (if known), sprint/cycle length, holidays or planned absences

**Format:**

```
## Capacity Check — [timeframe]

Available: [N] engineers × [X] weeks × [Y]% productive time = [Z] person-weeks
Roadmap asks for: [total effort estimate] person-weeks

Gap: [positive = under capacity / negative = over capacity]
```

If over capacity: identify which NEXT items get pushed to LATER. Name the cut explicitly — don't hide it.

**Nemo**: skip capacity check unless team size is known. Flag if unknown.

---

### Step 6 — Risk-Adjusted Sequencing (Salmon, Willy only)

For each NOW/NEXT item, identify one risk and one mitigation:

| Item | Top risk | Probability (H/M/L) | Impact if realized | Mitigation |
|---|---|---|---|---|

Items with High probability + High impact risks get a contingency plan or get pushed until the risk resolves.

---

### Step 7 — Stakeholder Alignment Framing (Willy only)

The roadmap is not just a plan — it's a communication artifact. Write a one-page narrative version:

**For executives**: lead with business outcomes and strategic bets. OKR format. No feature names.
**For engineering**: lead with what's fully scoped and ready, dependencies resolved, DoD expectations.
**For design**: lead with user outcomes and what needs design before engineering starts.
**For sales/GTM**: lead with what ships when and what the customer-facing story is.

Produce a summary paragraph for each audience. Same roadmap, different lens.

---

### Final Output

**Prioritization rationale** — MoSCoW / RICE / WSJF scores with ranking
**NOW / NEXT / LATER table** — with themes, items, reasons, effort, OKR alignment
**OKR set** — Objectives + Key Results, tied to roadmap themes
**Dependency map** — critical path highlighted, blockers named with owners
**Capacity check** — gap analysis with explicit cuts named (Tuna+)
**Risk register** — top risks with mitigation (Salmon+)
**Stakeholder narratives** — audience-specific framing (Willy)
**Recommended next skill** — `/ds-product-requirements-definition` (if requirements not yet written) or `/ds-product-launch-planning` with one-sentence reason
