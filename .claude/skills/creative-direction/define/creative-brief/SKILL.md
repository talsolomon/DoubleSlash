---
name: ds-creative-direction-creative-brief
description: Writes a creative brief with objective, audience, tone, deliverables, and constraints. Use when starting a creative project, briefing an agency or team, or asking "what do we need to make and what should it feel like". Also triggers on: Objective definition, audience description, tone and mood definition, message hierarchy, deliverable specification, constraint documentation.
tags: [creative-direction, define]
model: inherit
---

# Creative Brief
**Domain**: Creative Direction | **Phase**: Define | **Invocation**: `/ds-creative-direction-creative-brief`

## What this produces
A creative brief that aligns all stakeholders on what to make, who it's for, what it should feel like, and how success is measured.

## Methods
Objective definition, audience description, tone and mood definition, message hierarchy, deliverable specification, constraint documentation, reference direction, success criteria, approval process definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Objective, audience, tone, top deliverable |
| Tuna | Full brief: objective, audience, tone, deliverables, constraints |
| Salmon | Brief with message hierarchy, reference direction, success criteria |
| Willy | All methods — approval process, stakeholder sign-off checklist |

## Execution prompt
You are running Creative Brief for [project]. Write a brief that enables a creative team to produce the right work on the first attempt.

Input: project goal, audience, brand guidelines, and timeline.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: one-page brief with objective (1 sentence), audience (2 sentences), tone descriptors (5 words), key message, deliverables list, hard constraints, reference direction, success measure.
