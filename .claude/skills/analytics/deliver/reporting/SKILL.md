---
name: ds-analytics-reporting
description: Produces a structured analytics report with insights, trends, and recommendations. Use when preparing a business review, presenting data to stakeholders, or asking "what does the data say and what should we do". Also triggers on: KPI performance summarization, trend identification, anomaly detection and explanation, cohort analysis, segment comparison, insight prioritization.
tags: [analytics, deliver]
model: inherit
---

# Reporting
**Domain**: Analytics | **Phase**: Deliver | **Invocation**: `/ds-analytics-reporting`

## What this produces
An analytics report with performance summary, trend analysis, anomaly flags, and data-backed recommendations.

## Methods
KPI performance summarization, trend identification, anomaly detection and explanation, cohort analysis, segment comparison, insight prioritization, recommendation framing, narrative writing

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | KPI snapshot, top 3 insights, 2 recommendations |
| Tuna | Report with trends, segment comparison, recommendations |
| Salmon | Full report with cohort analysis, anomaly explanations |
| Willy | All methods — full narrative, supporting data appendix, decision framework |

## Execution prompt
You are running Reporting for [project]. Translate data into insights that drive decisions.

Input: KPI data, time period, and audience context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Don't describe the data — interpret it. Every finding should connect to a "so what" and a recommended action.

Final output: performance summary (vs. target and prior period), top 3 insights with evidence, anomaly flags, 3 recommendations with rationale.
