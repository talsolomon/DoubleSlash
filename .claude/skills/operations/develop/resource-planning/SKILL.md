---
name: ds-operations-resource-planning
description: Plans headcount, tools, and budget required to run an operation. Use when sizing a team, building an ops budget, or asking "what does it actually take to run this". Also triggers on: Headcount modeling, role and skill requirement mapping, tooling needs assessment, budget estimation, capacity planning, make-vs-buy analysis.
tags: [operations, develop]
model: inherit
---

# Resource Planning
**Domain**: Operations | **Phase**: Develop | **Invocation**: `/ds-operations-resource-planning`

## What this produces
A resource plan with headcount model, tooling requirements, budget estimate, and capacity projections.

## Methods
Headcount modeling, role and skill requirement mapping, tooling needs assessment, budget estimation, capacity planning, make-vs-buy analysis, vendor evaluation framework, phased hiring plan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Headcount estimate, tooling needs, high-level budget |
| Tuna | Resource plan with roles, tooling, budget by category |
| Salmon | Full plan with capacity model, make-vs-buy, phased hiring |
| Willy | All methods — vendor evaluation, full financial model, risk scenarios |

## Execution prompt
You are running Resource Planning for [project]. Define what's needed to operate at target scale.

Input: operational scope, current state, and growth projections.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Be specific: roles, not headcount ranges. Tools, not tool categories. Tie every resource to a function it enables.

Final output: headcount model with roles and timing, tooling list with cost estimates, total budget summary, top 3 resource risks.
