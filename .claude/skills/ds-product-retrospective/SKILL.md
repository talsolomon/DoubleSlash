---
name: ds-product-retrospective
description: Closes the loop on what shipped — OKR grades, lessons learned, kill/continue/pivot recommendation. Use after a launch, sprint, or quarter ends, or when asking "what did we learn" and "should we continue". Also triggers on: retro, retrospective, lessons learned, OKR grades, what worked, post-mortem, kill pivot continue, sprint review, quarterly review, what did we learn.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, deliver, ds-core, retrospective]
model: inherit
---

# DS Product Retrospective

Closes the loop on what shipped — grades OKRs, captures lessons, and produces a kill/continue/pivot recommendation.

**Produces:** 3 things that worked (keep), 3 things that didn't (change), OKR grade per OKR (0.0–1.0), one kill/continue/pivot recommendation with explicit rationale.

---

## When to invoke

- **After a launch.** Feature or product shipped — need to measure what happened.
- **End of sprint or quarter.** Closing out a cycle with structured learning.
- **Kill/continue/pivot decision.** Need to decide whether to keep going, change direction, or stop.
- **OKR grading.** Time to score results against what was committed.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick check | Start/Stop/Continue, OKR grades (pass/fail), north star check |
| Tuna | Standard retro | Product retrospective, OKR grading, assumption audit |
| Salmon | Full retrospective | Full retrospective, QBR, decision log update, kill/continue/pivot |
| Willy | Deep review | All methods — deep assumption audit, full OKR decomposition, north star metric review |

---

## Instructions

1. **Input required:** what was built, launch metrics, OKRs from the roadmap
2. **Classify** scope: Nemo / Tuna / Salmon / Willy
3. **Run each method** at this FISH level
4. **Grade OKRs** on a 0.0–1.0 scale — 0.7 is the pass threshold (Google standard)
5. **Make the call** — kill, continue, or pivot. Name the specific rationale.

**Final output:** 3 keep / 3 change, OKR grades, kill/continue/pivot recommendation. Update decisionlog.md with the recommendation before the session closes.

---

## Methods library

Sprint retrospective (Start/Stop/Continue), product retrospective, lessons learned synthesis, decision log update, OKR grading, quarterly business review, assumption audit, kill/continue/pivot decision, north star metric review

---

## Error handling

| Condition | Resolution |
|---|---|
| No OKRs were set | Grade against whatever success metrics existed — flag the missing OKRs for next cycle |
| Metrics unavailable | Run a qualitative retrospective — evidence-based is best, but structured reflection beats nothing |
| Team avoids kill decision | Surface the economic case for killing — time and resources spent vs. expected return |
