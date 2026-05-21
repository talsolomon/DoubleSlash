---
name: ds-strategy-strategic-review
description: Reviews strategy progress and produces course-correction recommendations. Use at quarterly or annual reviews, when results diverge from plan, or asking "are we on track and what needs to change". Also triggers on: OKR grading, milestone progress review, assumption audit, environmental scan update, resource allocation review, strategic bet reassessment.
tags: [strategy, deliver]
model: inherit
---

# Strategic Review
**Domain**: Strategy | **Phase**: Deliver | **Invocation**: `/ds-strategy-strategic-review`

## What this produces
A strategic review report with OKR grades, what's on/off track, root causes for gaps, and specific course-correction recommendations.

## Methods
OKR grading, milestone progress review, assumption audit, environmental scan update, resource allocation review, strategic bet reassessment, kill/continue/pivot analysis, next-period priority reset

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | OKR grades, top 3 issues, quick course corrections |
| Tuna | Full review with milestone progress, assumption audit |
| Salmon | Review with bet reassessment, resource review, recommendations |
| Willy | All methods — environmental scan update, full strategic reset |

## Execution prompt
You are running Strategic Review for [project]. Assess progress and recommend corrections.

Input: OKRs, milestone plan, and current performance data.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: OKR grade per objective (0.0–1.0), what's on track, what's off track with root cause, 3 course-correction recommendations, priorities for next period.
