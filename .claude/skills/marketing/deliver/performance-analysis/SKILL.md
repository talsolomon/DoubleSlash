---
name: ds-marketing-performance-analysis
description: Analyzes campaign performance and produces optimization recommendations. Use after a campaign runs, at mid-campaign checkpoints, or when asking "is this working and what should we change". Also triggers on: KPI tracking review, channel performance comparison, attribution modeling, conversion funnel analysis, cost-per-acquisition analysis, audience segment performance.
tags: [marketing, deliver]
model: inherit
---

# Performance Analysis
**Domain**: Marketing | **Phase**: Deliver | **Invocation**: `/ds-marketing-performance-analysis`

## What this produces
A campaign performance report with channel-by-channel results, attribution analysis, what's working, what isn't, and a prioritized optimization plan.

## Methods
KPI tracking review, channel performance comparison, attribution modeling, conversion funnel analysis, cost-per-acquisition analysis, audience segment performance, creative performance analysis, A/B test results synthesis, budget reallocation recommendations, forecasting

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | KPI review vs. targets, top 3 findings, quick wins |
| Tuna | Channel comparison, funnel analysis, CPA, optimization priorities |
| Salmon | Full analysis with attribution, segment performance, creative review |
| Willy | All methods — A/B synthesis, budget reallocation model, forecast |

## Execution prompt
You are running Performance Analysis for [project]. Assess campaign results and produce an actionable optimization plan.

Input: campaign KPIs, channel data, and the original campaign brief.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: performance vs. targets (by channel), top 3 what's working, top 3 what isn't, optimization recommendations ranked by expected impact.
