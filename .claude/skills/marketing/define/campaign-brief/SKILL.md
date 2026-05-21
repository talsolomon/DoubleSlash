---
name: ds-marketing-campaign-brief
description: Writes a campaign brief with objective, audience, message, channels, timeline, and KPIs. Use when starting a campaign, aligning stakeholders on scope, or asking "what is this campaign for and how will we know it worked". Also triggers on: Objective definition, audience targeting, message selection, channel strategy, timeline planning, budget allocation framework.
tags: [marketing, define]
model: inherit
---

# Campaign Brief
**Domain**: Marketing | **Phase**: Define | **Invocation**: `/ds-marketing-campaign-brief`

## What this produces
A campaign brief that aligns team and stakeholders on objective, audience, message, channels, timeline, budget envelope, and success metrics.

## Methods
Objective definition, audience targeting, message selection, channel strategy, timeline planning, budget allocation framework, KPI definition, creative requirements, approval workflow design, measurement plan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Objective, audience, message, top channel, 2 KPIs |
| Tuna | Full brief: objective, audience, message, channels, timeline, KPIs |
| Salmon | Brief with budget framework, creative requirements, measurement plan |
| Willy | All methods — approval workflow, full measurement plan, stakeholder alignment |

## Execution prompt
You are running Campaign Brief for [project]. Write a brief that enables a team to execute without needing to re-ask scope questions.

Input: marketing goal, available channels, and target audience.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: one-page brief with objective (1 sentence), audience (2 sentences), core message, channel plan, timeline milestones, and 3 success KPIs with targets.
