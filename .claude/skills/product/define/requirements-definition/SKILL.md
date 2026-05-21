---
name: ds-product-requirements-definition
description: Writes a buildable spec — PRD, user story map, acceptance criteria, definition of done. Use when moving from problem to build, handing off to engineering, or asking "what exactly are we building". Also triggers on: PRD writing, user story mapping, job stories (Alistair Cockburn format), acceptance criteria definition, API contract design, dependency mapping.
tags: [product, define]
model: inherit
---

# Requirements Definition
**Domain**: Product | **Phase**: Define | **Invocation**: `/ds-product-requirements-definition`

## What this produces
A buildable specification — what gets built, by whom, and what "done" looks like. Output: PRD or user story map, acceptance criteria, definition of done, and a scope boundary.

## Methods
PRD writing, user story mapping, job stories (Alistair Cockburn format), acceptance criteria definition, API contract design, dependency mapping, constraint documentation, assumption log, definition of done, feature spec, scope boundary definition, non-functional requirements, edge case enumeration

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | User story map (3–5 stories), acceptance criteria, definition of done |
| Tuna | PRD (lean), user story map, acceptance criteria, scope boundary |
| Salmon | Full PRD, story map, API contract, dependency map, edge case enumeration |
| Willy | All methods — non-functional requirements, assumption log, full constraint doc |

## Execution prompt
You are running Requirements Definition for [project]. Produce a buildable specification.

Input: problem statement and framing from Define phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Run the methods for this FISH level. Produce each artifact clearly labeled.

Final output: the minimum required to hand off to engineering and start building. No ambiguity. Every requirement has an acceptance criterion.
