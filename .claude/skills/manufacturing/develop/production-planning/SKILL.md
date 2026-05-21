---
name: ds-manufacturing-production-planning
description: Plans production schedules, capacity, and materials for a manufacturing operation. Use when ramping production, managing seasonal demand, or asking "how do we hit output targets without running out of materials or capacity". Also triggers on: Demand forecasting, master production schedule design, MRP (Materials Requirements Planning), capacity planning, inventory level optimization, constraint identification and management.
tags: [manufacturing, develop]
model: inherit
---

# Production Planning
**Domain**: Manufacturing | **Phase**: Develop | **Invocation**: `/ds-manufacturing-production-planning`

## What this produces
A production plan with schedule, capacity model, materials requirements, inventory targets, and constraint identification.

## Methods
Demand forecasting, master production schedule design, MRP (Materials Requirements Planning), capacity planning, inventory level optimization, constraint identification and management, supplier lead time integration, production run sequencing

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Production schedule, capacity check, materials requirements |
| Tuna | Plan with MRP, inventory targets, constraint map |
| Salmon | Full plan with demand forecast integration, supplier lead times |
| Willy | All methods — full MRP model, scenario planning, constraint mitigation |

## Execution prompt
You are running Production Planning for [project]. Build the plan that gets product made on time at the right cost.

Input: demand forecast, capacity data, and materials availability.
FISH classification: [Nemo/Tuna/Salmon/Willy]

The constraint is the plan. Identify what limits output and build the plan around that, not around ideal-state capacity.

Final output: production schedule, capacity utilization model, materials requirements, inventory targets, top 3 constraints with mitigation.
