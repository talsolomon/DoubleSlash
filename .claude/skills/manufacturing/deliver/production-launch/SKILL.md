---
name: ds-manufacturing-production-launch
description: Plans and executes the launch of a new production line or product into manufacturing. Use when going from prototype to production, launching a new product line, or asking "how do we start mass production without chaos". Also triggers on: Pre-production qualification design, first article inspection planning, pilot production run design, ramp rate planning, supplier readiness verification, tooling and equipment qualification.
tags: [manufacturing, deliver]
model: inherit
---

# Production Launch
**Domain**: Manufacturing | **Phase**: Deliver | **Invocation**: `/ds-manufacturing-production-launch`

## What this produces
A production launch plan with ramp schedule, pre-production qualification checklist, first-article inspection plan, and go-live criteria.

## Methods
Pre-production qualification design, first article inspection planning, pilot production run design, ramp rate planning, supplier readiness verification, tooling and equipment qualification, training and certification plan, go-live criteria definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Launch checklist, ramp schedule, go-live criteria |
| Tuna | Launch plan with first article inspection, supplier readiness |
| Salmon | Full plan with pilot run design, equipment qualification |
| Willy | All methods — full qualification plan, training program, escalation process |

## Execution prompt
You are running Production Launch for [project]. Plan the transition from development to reliable mass production.

Input: manufacturing spec, quality framework, and production plan.
FISH classification: [Nemo/Tuna/Salmon/Willy]

New production launches almost always have surprises. Build in buffer time at the ramp, not at the end.

Final output: launch readiness checklist, first article inspection plan, ramp schedule with milestones, go-live criteria, escalation path.
