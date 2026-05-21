---
name: ds-operations-operations-launch
description: Executes the go-live of a new or redesigned operation with cutover plan and stabilization tracking. Use when deploying a process change, standing up a new function, or asking "how do we go live without breaking things". Also triggers on: Cutover planning, go/no-go criteria definition, parallel-run design, day-1 runbook creation, hypercare period planning, escalation path design.
tags: [operations, deliver]
model: inherit
---

# Operations Launch
**Domain**: Operations | **Phase**: Deliver | **Invocation**: `/ds-operations-operations-launch`

## What this produces
An operations launch plan with cutover sequence, go/no-go criteria, stabilization period plan, and day-1 runbook.

## Methods
Cutover planning, go/no-go criteria definition, parallel-run design, day-1 runbook creation, hypercare period planning, escalation path design, stabilization metric tracking, rollback trigger definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Cutover sequence, go/no-go checklist, escalation path |
| Tuna | Launch plan with parallel-run design, day-1 runbook |
| Salmon | Full plan with hypercare period, stabilization metrics |
| Willy | All methods — rollback triggers, full comms sequence, hypercare runbook |

## Execution prompt
You are running Operations Launch for [project]. Plan and execute the go-live of the operational change.

Input: implementation plan, process design, and stakeholder readiness assessment.
FISH classification: [Nemo/Tuna/Salmon/Willy]

The launch is not done at go-live — it's done when the new process runs stably without support.

Final output: cutover sequence, go/no-go checklist, day-1 runbook, stabilization metrics with targets, rollback trigger conditions.
