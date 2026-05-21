---
name: ds-manufacturing-production-audit
description: Audits existing manufacturing operations for efficiency, quality, and capacity gaps. Use when inheriting manufacturing operations, diagnosing production problems, or asking "why is production not performing as expected". Also triggers on: OEE (Overall Equipment Effectiveness) measurement, quality defect analysis, capacity utilization assessment, bottleneck identification, waste mapping (TIMWOOD), changeover time analysis.
tags: [manufacturing, discover]
model: inherit
---

# Production Audit
**Domain**: Manufacturing | **Phase**: Discover | **Invocation**: `/ds-manufacturing-production-audit`

## What this produces
A production audit report with OEE assessment, quality failure analysis, capacity utilization, bottleneck map, and improvement priorities.

## Methods
OEE (Overall Equipment Effectiveness) measurement, quality defect analysis, capacity utilization assessment, bottleneck identification, waste mapping (TIMWOOD), changeover time analysis, maintenance effectiveness review, yield rate analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | OEE score, top 3 bottlenecks, quality failure summary |
| Tuna | Audit with waste mapping, capacity analysis |
| Salmon | Full audit with changeover analysis, maintenance review |
| Willy | All methods — full OEE breakdown, yield analysis, improvement roadmap |

## Execution prompt
You are running Production Audit for [project]. Assess manufacturing performance against potential.

Input: production data, quality records, and equipment inventory.
FISH classification: [Nemo/Tuna/Salmon/Willy]

OEE below 65% is a symptom. Identify the root causes: availability losses, performance losses, or quality losses.

Final output: OEE scorecard, bottleneck map, defect rate analysis, waste inventory, top 5 improvement opportunities with estimated impact.
