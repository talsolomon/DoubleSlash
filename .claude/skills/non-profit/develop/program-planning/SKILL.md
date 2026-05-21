---
name: ds-non-profit-program-planning
description: Plans the operational delivery of a non-profit program including schedule, staffing, and partnerships. Use when preparing to launch a program, scaling an existing one, or asking "how do we actually deliver this at scale". Also triggers on: Delivery timeline planning, staffing model design, volunteer engagement plan, partnership activation plan, monitoring and evaluation framework, budget development.
tags: [non-profit, develop]
model: inherit
---

# Program Planning
**Domain**: Non-Profit | **Phase**: Develop | **Invocation**: `/ds-non-profit-program-planning`

## What this produces
A program operations plan with delivery schedule, staffing model, partnership agreements, M&E framework, and budget.

## Methods
Delivery timeline planning, staffing model design, volunteer engagement plan, partnership activation plan, monitoring and evaluation framework, budget development, risk management, community engagement planning

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Delivery schedule, staffing needs, M&E framework |
| Tuna | Operations plan with partnerships, budget |
| Salmon | Full plan with volunteer engagement, risk management |
| Willy | All methods — community engagement plan, full budget, evaluation framework |

## Execution prompt
You are running Program Planning for [project]. Build the operations plan that delivers the program reliably.

Input: program design, fundraising strategy, and organizational capacity.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Non-profit programs often over-promise and under-resource. Budget and timeline assumptions should be stress-tested before the program is committed.

Final output: delivery schedule, staffing model, partnership plan, M&E framework, program budget, top 3 delivery risks.
