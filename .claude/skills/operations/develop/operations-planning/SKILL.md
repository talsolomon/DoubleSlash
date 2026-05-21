---
name: ds-operations-operations-planning
description: Plans operational implementation with timelines, milestones, and change management. Use when rolling out a new process, standing up a function, or asking "how do we actually make this change happen". Also triggers on: Phased rollout design, change impact assessment, stakeholder engagement planning, training and enablement design, communication plan, pilot design.
tags: [operations, develop]
model: inherit
---

# Operations Planning
**Domain**: Operations | **Phase**: Develop | **Invocation**: `/ds-operations-operations-planning`

## What this produces
An operations implementation plan with phased rollout, change management approach, training plan, and success metrics.

## Methods
Phased rollout design, change impact assessment, stakeholder engagement planning, training and enablement design, communication plan, pilot design, rollback planning, success metric definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Phased rollout, top 3 risks, training outline |
| Tuna | Implementation plan with change impact, comms plan |
| Salmon | Full plan with pilot design, rollback, stakeholder engagement |
| Willy | All methods — full change management plan, enablement program |

## Execution prompt
You are running Operations Planning for [project]. Build the implementation plan for the operational change.

Input: process design, stakeholder map, and organizational context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Plan for adoption, not just deployment. The plan succeeds when people actually use the new process consistently.

Final output: phased rollout timeline, change impact summary, training plan, comms plan, success metrics with targets.
