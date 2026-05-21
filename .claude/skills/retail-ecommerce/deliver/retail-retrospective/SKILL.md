---
name: ds-retail-ecommerce-retail-retrospective
description: Reviews retail or ecommerce performance for the period with conversion analysis and strategy adjustments. Use at end of season, after a major campaign, or asking "how did the business perform and what do we change". Also triggers on: Revenue and margin review, conversion funnel analysis, bestseller and slow-mover analysis, inventory sell-through review, promotional ROI analysis, channel performance comparison.
tags: [retail-ecommerce, deliver]
model: inherit
---

# Retail Retrospective
**Domain**: Retail/Ecommerce | **Phase**: Deliver | **Invocation**: `/ds-retail-ecommerce-retail-retrospective`

## What this produces
A retail retrospective report with sales performance, conversion analysis, inventory review, and trading strategy adjustments.

## Methods
Revenue and margin review, conversion funnel analysis, bestseller and slow-mover analysis, inventory sell-through review, promotional ROI analysis, channel performance comparison, customer LTV and repeat rate, trading strategy refinements

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Revenue summary, conversion snapshot, top 3 adjustments |
| Tuna | Retro with bestseller analysis, promotional ROI |
| Salmon | Full retro with inventory review, channel comparison |
| Willy | All methods — LTV analysis, full trading review, next-season strategy |

## Execution prompt
You are running Retail Retrospective for [project]. Assess the trading period and identify what to do differently next season.

Input: sales data, inventory data, promotional results, and channel analytics.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: revenue and margin scorecard, conversion funnel performance, bestseller/slow-mover analysis, promotional ROI, top 3 strategy adjustments for next period.
