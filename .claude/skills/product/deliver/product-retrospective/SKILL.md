---
name: ds-product-product-retrospective
description: Closes the loop on what shipped — OKR grades, lessons learned, kill/continue/pivot recommendation. Use after a launch, sprint, or quarter ends, or when asking "what did we learn" and "should we continue". Also triggers on: Sprint retrospective (Start/Stop/Continue), product retrospective, lessons learned synthesis, decision log update, OKR grading, quarterly business review.
tags: [product, deliver]
model: inherit
---

# Product Retrospective
**Domain**: Product | **Phase**: Deliver | **Invocation**: `/ds-product-product-retrospective`

## What this produces
A closed loop on what shipped and what it taught you. Output: lessons learned, OKR grades, decision log updates, and a kill/continue/pivot recommendation.

## Methods
Sprint retrospective (Start/Stop/Continue), product retrospective, lessons learned synthesis, decision log update, OKR grading, quarterly business review, assumption audit, kill/continue/pivot decision, north star metric review

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Start/Stop/Continue, OKR grades (pass/fail), north star check |
| Tuna | Product retrospective, OKR grading, assumption audit |
| Salmon | Full retrospective, QBR, decision log update, kill/continue/pivot decision |
| Willy | All methods — deep assumption audit, full OKR decomposition, north star metric review |

## Execution prompt
You are running a Product Retrospective for [project]. Close the loop on what shipped.

Input: what was built, launch metrics, and OKRs from the roadmap.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Run the methods for this FISH level.

Final output: 3 things that worked (keep), 3 things that didn't (change), OKR grade (0.0–1.0 per OKR), and one kill/continue/pivot recommendation with explicit rationale.
