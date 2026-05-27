---
name: ds-solution-ideation
description: Generates and ranks solution concepts with trade-off analysis before committing to a direction. Use when the problem is clear but the right solution isn't, or when evaluating multiple directions. Also triggers on: brainstorm solutions, generate ideas, what should we build, ideation, concept generation, pick a direction, explore options, Crazy 8s, design sprint, trade-off analysis, solution concepts.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, develop, ds-core, ideation]
model: inherit
---

# DS Solution Ideation

Generates and evaluates solution concepts — produces a ranked direction with explicit trade-offs before anything gets built.

**Produces:** 3 ranked solution directions, each with a one-sentence description, what it unlocks, what it trades away, and a final recommended direction with explicit rationale.

---

## When to invoke

- **Problem is clear, solution isn't.** Know what to solve; need to figure out how.
- **Multiple directions on the table.** Team has ideas but hasn't pressure-tested them.
- **Before committing to a build.** Want to explore the solution space before writing requirements.
- **Running a design sprint.** Need rapid concept generation and evaluation.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Rapid concepts | Crazy 8s (rapid concept), impact/effort matrix, pick one |
| Tuna | Standard ideation | Crazy 8s, SCAMPER, 2×2 prioritization, solution narrative |
| Salmon | Thorough exploration | Analogical thinking, Rose/Bud/Thorn, concept sprint, assumption poker |
| Willy | Full design sprint | All methods — co-design, build/buy/partner analysis, full concept evaluation |

---

## Instructions

1. **Input required:** problem statement and any requirements from Define phase
2. **Classify** scope: Nemo / Tuna / Salmon / Willy
3. **For each method** at this FISH level, produce the ideation output (concepts, scores, narratives)
4. **Converge** to 3 ranked directions — no ties, no vague options

**Final output:** 3 ranked solution directions. For each: what it is (1 sentence), what it unlocks, what it trades away. Final recommendation: one direction with explicit rationale. Recommend ds-requirements-definition or ds-roadmap-design as next step.

---

## Methods library

Crazy 8s, design studio facilitation, analogical thinking, SCAMPER, worst possible idea (reverse brainstorming), Rose/Bud/Thorn, co-design session, concept sketching, assumption poker, impact/effort matrix, 2×2 prioritization, concept sprint, solution narrative, build/buy/partner analysis

---

## Error handling

| Condition | Resolution |
|---|---|
| All ideas feel obvious | Run worst possible idea (reverse brainstorming) to break the pattern |
| Can't pick a direction | Run assumption poker — the disagreement is about an assumption, not the solution |
| Build vs. buy unclear | Make build/buy/partner analysis the first method |
