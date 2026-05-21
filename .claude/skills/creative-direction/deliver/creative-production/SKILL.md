---
name: ds-creative-direction-creative-production
description: Plans and manages creative production to final delivery. Use when moving approved concepts to finished assets, managing an agency, or asking "how do we get this made on time". Also triggers on: Asset list definition, production timeline design, vendor briefing, resource assignment, quality checkpoint design, delivery specification.
tags: [creative-direction, deliver]
model: inherit
---

# Creative Production
**Domain**: Creative Direction | **Phase**: Deliver | **Invocation**: `/ds-creative-direction-creative-production`

## What this produces
A production plan with asset list, vendor/resource assignments, timeline, quality checkpoints, and delivery spec.

## Methods
Asset list definition, production timeline design, vendor briefing, resource assignment, quality checkpoint design, delivery specification, format requirements, file naming conventions, asset handoff checklist

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Asset list, timeline, delivery spec |
| Tuna | Production plan with resource assignments, quality checkpoints |
| Salmon | Full plan with vendor briefs, file conventions, handoff checklist |
| Willy | All methods — full production management framework |

## Execution prompt
You are running Creative Production for [project]. Plan the production process from approved concept to delivered assets.

Input: approved creative concept, asset requirements, timeline.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: complete asset list with specs, production timeline with milestones, owner per asset, delivery requirements, quality checkpoint criteria.
