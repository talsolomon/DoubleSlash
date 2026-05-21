---
name: ds-operations-operations-retrospective
description: Reviews an operational change or period for lessons, performance, and next improvements. Use at the end of a major ops initiative, quarterly ops review, or asking "did we improve and what's next". Also triggers on: KPI performance review, process adherence analysis, stakeholder satisfaction assessment, root cause analysis, waste elimination review, improvement backlog building.
tags: [operations, deliver]
model: inherit
---

# Operations Retrospective
**Domain**: Operations | **Phase**: Deliver | **Invocation**: `/ds-operations-operations-retrospective`

## What this produces
An operations retrospective report with performance vs. targets, root cause analysis of gaps, process improvement recommendations, and next-cycle priorities.

## Methods
KPI performance review, process adherence analysis, stakeholder satisfaction assessment, root cause analysis, waste elimination review, improvement backlog building, lessons learned documentation, next-cycle priority setting

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | KPI grades, top 3 issues, 3 improvements for next cycle |
| Tuna | Retro with process adherence, root causes, improvement list |
| Salmon | Full retro with stakeholder feedback, waste review |
| Willy | All methods — full lessons log, improvement backlog, next-cycle plan |

## Execution prompt
You are running Operations Retrospective for [project]. Assess what worked, what didn't, and what to fix next.

Input: KPI targets vs. actuals, process performance data, and stakeholder feedback.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: KPI scorecard, top 3 root causes for gaps, improvement recommendations ranked by impact, priorities for next operational cycle.
