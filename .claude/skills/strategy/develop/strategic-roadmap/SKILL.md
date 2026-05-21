---
name: ds-strategy-strategic-roadmap
description: Translates strategy into a sequenced execution plan with milestones and OKRs. Use when moving from strategy to action, planning a year, or asking "how do we actually execute on this". Also triggers on: NOW/NEXT/LATER sequencing, milestone definition, OKR design, dependency mapping, resource and capacity planning, initiative prioritization.
tags: [strategy, develop]
model: inherit
---

# Strategic Roadmap
**Domain**: Strategy | **Phase**: Develop | **Invocation**: `/ds-strategy-strategic-roadmap`

## What this produces
A strategic roadmap with NOW/NEXT/LATER sequencing, OKRs, milestones, dependencies, and resource implications.

## Methods
NOW/NEXT/LATER sequencing, milestone definition, OKR design, dependency mapping, resource and capacity planning, initiative prioritization, risk-adjusted sequencing, stakeholder alignment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | NOW/NEXT/LATER roadmap, OKRs (3), top dependencies |
| Tuna | Roadmap with milestones, OKRs, dependency map |
| Salmon | Full roadmap with resource implications, risk-adjusted sequencing |
| Willy | All methods — stakeholder alignment plan, full capacity model |

## Execution prompt
You are running Strategic Roadmap for [project]. Translate strategic priorities into a sequenced plan.

Input: strategic framework and priorities.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: roadmap table (NOW/NEXT/LATER), 3–5 OKRs per priority, top 3 dependencies with owners, resource implications summary.
