---
name: ds-strategy-strategic-review
description: Reviews strategy progress and produces course-correction recommendations. Use at quarterly or annual reviews, when results diverge from plan, or asking "are we on track and what needs to change". Also triggers on: OKR grading, assumption audit, strategic bet reassessment, kill/continue/pivot, resource allocation review, environmental scan update.
tags: [strategy, deliver, strategic-review, okr-grading, assumption-audit, kill-continue-pivot]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Strategic Review
**Domain**: Strategy | **Phase**: Deliver | **Invocation**: `/ds-strategy-strategic-review`

## What this produces
A strategic review report with OKR grades, on/off-track analysis, root cause for gaps, assumption audit, bet reassessment, and specific course-correction recommendations for the next period.

## Methods
OKR grading (0.0–1.0 Google scale), milestone progress review, assumption audit, environmental scan update, resource allocation review, strategic bet reassessment, kill/continue/pivot analysis, next-period priority reset

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick grade | OKR grades + top 3 off-track issues + quick corrections |
| Tuna | Standard review | Full OKR grades + milestone review + assumption audit |
| Salmon | Deep review | All above + bet reassessment + resource review |
| Willy | Annual review | All methods + environmental scan update + full strategic reset |

---

## Execution Prompt

Read the project context: OKRs, milestone plan, current performance data, environmental changes since last review, FISH classification.

---

### Step 1 — OKR Grading (all FISH levels)

Use Google's 0.0–1.0 scale (same as product retrospective, applied to strategy).

```
Strategic Priority: [name]
Objective: [text]
Grade: [letter A/B/C/D]

  KR 1: [text]
  Target: [X] | Actual: [Y] | Grade: [0.0–1.0]
  Driver: [what caused this result — 1 sentence]
  
  KR 2: ...
  
Priority narrative: [2-3 sentences — what happened, why, and what it means]
```

**Grading scale:** 0.7–0.9 = strong (target zone). 1.0 = reconsider ambition. 0.4–0.6 = partial. < 0.3 = missed — distinguish execution failure from wrong target.

---

### Step 2 — On/Off Track Summary (all FISH levels)

| Initiative | Status | Grade | Root cause | Recommended action |
|---|---|---|---|---|
| [Initiative] | ✅ On track | 0.8 | [what's working] | Stay the course |
| [Initiative] | ⚠️ At risk | 0.5 | [what's blocking] | [specific course correction] |
| [Initiative] | ❌ Off track | 0.2 | [what failed] | Kill / Pivot / Rescue |

**For every off-track initiative:** is it an execution failure (we didn't do what we said) or a strategic error (we did what we said but the world didn't respond as expected)? These have different implications.

---

### Step 3 — Assumption Audit (Tuna, Salmon, Willy)

Pull the assumptions from the strategic framework and business cases. Which held? Which didn't?

| Assumption | What we believed | What happened | Status | Implication |
|---|---|---|---|---|
| [Market will grow at X%] | [belief] | [actual] | Held / Broke / Too early | [what changes] |
| [Customer will value Y] | [belief] | [evidence] | Held / Broke / Inconclusive | [what changes] |

**Pattern to look for:** if 3+ assumptions in the same category broke (e.g., all demand assumptions were too optimistic), it's a systematic calibration problem — not just bad luck.

---

### Step 4 — Strategic Bet Reassessment (Salmon, Willy)

For each strategic bet made in the framework:

```
Bet: [what we bet on — belief about market, technology, or customer behavior]
Evidence at time of bet: [what supported it]
New evidence this period: [what has happened that bears on this bet]
Status: Confirmed / Weakened / Contradicted / Too early to tell
Decision: Double down / Hold / Reduce / Exit
Rationale: [specific evidence driving the decision]
```

---

### Step 5 — Kill / Continue / Pivot (all FISH levels)

For any initiative graded < 0.5:

**Framework:**
1. Is the underlying problem we're solving still real? (Yes / No / Changed)
2. Did our approach fail, or did the problem change?
3. Do we have evidence a different approach would work?

**Decision:**
- Problem still real + approach failed → **Pivot** (try different approach)
- Problem still real + insufficient time/resource → **Rescue** (address root cause)
- Problem has changed → **Kill** and redirect resources
- Approach working but under-resourced → **Accelerate** (reallocate)

```
Initiative: [name]
Decision: [Kill / Pivot / Rescue / Accelerate]
Rationale: [evidence-based, 2-3 sentences]
If Kill: how resources are reallocated + communication plan
If Pivot: new direction hypothesis + validation step before re-investment
```

---

### Step 6 — Resource Reallocation (Salmon, Willy)

Based on grades and decisions, where should resources shift?

| From | To | Amount | Rationale |
|---|---|---|---|
| [Off-track initiative] | [On-track priority] | [$X / N people] | [strategic rationale] |

**Reallocation principle:** resources should flow from low-grade, low-confidence bets to high-grade, high-conviction bets. Don't pour resources into rescue operations unless there's a clear evidence-based thesis for why the outcome will be different.

---

### Step 7 — Next Period Priorities (all FISH levels)

After the review, what changes?

```
Retain from current period:
  [Priority/initiative]: [why still right]

Add for next period:
  [New priority]: [what creates this new priority — market signal, freed resource, strategic pivot]

Deprioritize:
  [Initiative]: [why — resource freed for better use, or no longer strategic]

One sentence strategy update:
  [Has the core strategy changed? If yes, state the updated direction in one sentence.]
```

---

### Final Output

**OKR grades** — 0.0–1.0 per KR, letter grade per Objective
**On/off track summary** — root causes, not just status
**Assumption audit** — held vs. broke, pattern analysis (Tuna+)
**Bet reassessment** — double down / hold / exit per bet (Salmon+)
**Kill/Continue/Pivot decisions** — for all initiatives graded < 0.5
**Resource reallocation** — from/to with rationale (Salmon+)
**Next period priorities** — what changes and why
**Recommended next skill** — `/ds-strategy-strategic-roadmap` (if major replanning needed) or `/ds-strategy-strategy-execution` (if execution needs tightening) with one-sentence reason
