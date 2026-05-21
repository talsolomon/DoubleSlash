---
name: ds-product-solution-ideation
description: Generates and ranks solution concepts with trade-off analysis. Use when the problem is clear but the right solution isn't, or when you need to evaluate multiple directions before committing. Also triggers on: Crazy 8s, design studio facilitation, analogical thinking, SCAMPER, worst possible idea (reverse brainstorming), Rose/Bud/Thorn.
tags: [product, develop]
model: inherit
---

# Solution Ideation
**Domain**: Product | **Phase**: Develop | **Invocation**: `/ds-product-solution-ideation`

## What this produces
Ranked solution concepts with trade-off analysis. Output: 3–5 solution directions, each with rationale, what it rules out, and a recommended direction with reasoning.

## Methods
Crazy 8s, design studio facilitation, analogical thinking, SCAMPER, worst possible idea (reverse brainstorming), Rose/Bud/Thorn, co-design session, concept sketching, assumption poker, impact/effort matrix, 2×2 prioritization, concept sprint, solution narrative, build/buy/partner analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Crazy 8s (rapid concept), impact/effort matrix, pick one |
| Tuna | Crazy 8s, SCAMPER, 2×2 prioritization, solution narrative |
| Salmon | Analogical thinking, Rose/Bud/Thorn, concept sprint, assumption poker |
| Willy | All methods — co-design, build/buy/partner, full concept evaluation |

## Execution prompt
You are running Solution Ideation for [project]. Generate and evaluate solution concepts before committing to a direction.

Input: problem statement and requirements from Define phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

For each method at this FISH level, produce the ideation output (concepts, scores, narratives).

Final output: 3 ranked solution directions. For each: what it is (1 sentence), what it unlocks, what it trades away. Final recommendation: one direction with explicit rationale.