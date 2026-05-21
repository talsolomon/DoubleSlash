---
name: ds-analytics-data-retrospective
description: Reviews analytics infrastructure and data quality for the period with lessons and improvement plan. Use at quarter-end, after a data incident, or asking "is our data getting better or worse over time". Also triggers on: Data quality scoring, incident and data error review, pipeline reliability review, metric drift analysis, tooling performance assessment, team process review.
tags: [analytics, deliver]
model: inherit
---

# Data Retrospective
**Domain**: Analytics | **Phase**: Deliver | **Invocation**: `/ds-analytics-data-retrospective`

## What this produces
A data retrospective report with data quality scores, incident review, infrastructure health assessment, and improvement roadmap.

## Methods
Data quality scoring, incident and data error review, pipeline reliability review, metric drift analysis, tooling performance assessment, team process review, improvement backlog building, next-quarter data priorities

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Quality scores, top 3 incidents, 3 improvements |
| Tuna | Retro with pipeline reliability, metric drift analysis |
| Salmon | Full retro with tooling assessment, process review |
| Willy | All methods — full incident log, improvement roadmap, team health |

## Execution prompt
You are running Data Retrospective for [project]. Assess the health of the data infrastructure and analytics practice.

Input: data quality metrics, incident log, pipeline reliability data, and team input.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: data quality scorecard, incident summary with root causes, infrastructure health rating, top 5 improvements for next period.
