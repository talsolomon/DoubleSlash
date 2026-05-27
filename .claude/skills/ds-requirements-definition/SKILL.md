---
name: ds-requirements-definition
description: Writes a buildable spec — PRD, user story map, acceptance criteria, and definition of done. Use when moving from problem to build, handing off to engineering, or asking "what exactly are we building". Also triggers on: write a PRD, product requirements document, user stories, acceptance criteria, feature spec, what are we building, handoff to eng, definition of done, scope the build, story mapping, job stories.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, define, ds-core, requirements]
model: inherit
---

# DS Requirements Definition

Produces a buildable specification — what gets built, by whom, and what done looks like.

**Produces:** PRD or user story map, acceptance criteria, definition of done, scope boundary. No ambiguity — every requirement has an acceptance criterion.

---

## When to invoke

- **Moving from problem to build.** Problem is defined; need a spec engineering can act on.
- **Handing off to engineering.** Need a document that removes ambiguity before sprint starts.
- **Defining scope.** What's in, what's out, and what done looks like.
- **Writing user stories.** Need structured requirements with acceptance criteria.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Lightweight spec | User story map (3–5 stories), acceptance criteria, definition of done |
| Tuna | Standard PRD | PRD (lean), user story map, acceptance criteria, scope boundary |
| Salmon | Full spec | Full PRD, story map, API contract, dependency map, edge case enumeration |
| Willy | Enterprise spec | All methods — non-functional requirements, assumption log, full constraint documentation |

---

## Instructions

1. **Input required:** problem statement and framing from Define phase (or describe the problem clearly)
2. **Classify** scope: Nemo / Tuna / Salmon / Willy
3. **Produce each artifact** clearly labeled at this FISH level
4. **For every requirement:** state the acceptance criterion — no requirement without one

**Final output:** the minimum required to hand off to engineering and start building. Recommend ds-solution-ideation if the solution direction isn't yet clear.

---

## Methods library

PRD writing, user story mapping, job stories (Alistair Cockburn format), acceptance criteria definition, API contract design, dependency mapping, constraint documentation, assumption log, definition of done, feature spec, scope boundary definition, non-functional requirements, edge case enumeration

---

## Error handling

| Condition | Resolution |
|---|---|
| No problem statement input | Run ds-problem-framing first — requirements without a frame are just feature lists |
| Scope keeps expanding | Define the scope boundary explicitly — name what's out, not just what's in |
| Conflicting requirements | Surface the conflict as an explicit trade-off decision, don't silently resolve it |
