---
name: ds-government-policy-planning
description: Plans policy implementation including timeline, resources, and interdependencies. Use when moving policy from design to delivery, preparing a policy brief, or asking "how do we actually implement this". Also triggers on: Implementation milestone planning, resource and capacity planning, interdependency mapping, risk register development, accountability framework design, delivery partner identification.
tags: [government, develop]
model: inherit
---

# Policy Planning
**Domain**: Government | **Phase**: Develop | **Invocation**: `/ds-government-policy-planning`

## What this produces
A policy implementation plan with delivery timeline, resource requirements, interdependencies, risk register, and accountability framework.

## Methods
Implementation milestone planning, resource and capacity planning, interdependency mapping, risk register development, accountability framework design, delivery partner identification, monitoring and evaluation design, contingency planning

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Timeline, resources, top 5 risks |
| Tuna | Implementation plan with interdependencies, accountability |
| Salmon | Full plan with M&E design, delivery partners |
| Willy | All methods — full risk register, contingency plan, resource model |

## Execution prompt
You are running Policy Planning for [project]. Build the implementation plan that turns policy design into delivery.

Input: policy framework, regulatory design, and organizational context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Policy delays most often come from underestimating interdependencies — other agencies, legislation, IT systems. Map them before the plan is finalized.

Final output: implementation timeline, resource requirements, interdependency map, risk register, accountability framework, M&E design.
