---
name: ds-ux-design-ux-brief
description: Writes a UX brief that frames the design problem, defines the user, and sets success criteria. Use when starting a design project, aligning with stakeholders, or asking "what are we designing and for whom". Also triggers on: Problem statement synthesis, user persona definition, job story framing, design goal setting, constraint mapping, success metric definition.
tags: [ux-design, define]
model: inherit
---

# UX Brief
**Domain**: UX Design | **Phase**: Define | **Invocation**: `/ds-ux-design-ux-brief`

## What this produces
A UX brief with problem statement, user definition, design goals, constraints, success metrics, and out-of-scope boundaries.

## Methods
Problem statement synthesis, user persona definition, job story framing, design goal setting, constraint mapping, success metric definition, scope boundary definition, stakeholder alignment, design principles articulation, accessibility requirements definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Problem statement, user definition, top 3 design goals |
| Tuna | Brief with problem, user, goals, constraints, success metrics |
| Salmon | Full brief with job stories, design principles, accessibility requirements |
| Willy | All methods — stakeholder alignment workshop, full constraint mapping |

## Execution prompt
You are running UX Brief for [project]. Produce a brief that aligns the team on what is being designed, for whom, and what success looks like.

Input: research findings, product requirements, or stakeholder context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: problem statement (1 sentence), user definition (2–3 sentences), 3–5 design goals, top constraints, 2–3 success metrics, explicit out-of-scope items.
