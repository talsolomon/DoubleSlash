---
name: ds-fintech-financial-model
description: Builds the unit economics and financial model for a fintech product. Use when validating a business model, preparing investor materials, or asking "does the math work on this fintech product". Also triggers on: Unit economics modeling (CAC, LTV, payback), revenue model design, interchange and fee structure analysis, cost structure breakdown.
tags: [fintech, define]
model: inherit
---

# Financial Model
**Domain**: Fintech | **Phase**: Define | **Invocation**: `/ds-fintech-financial-model`

## What this produces
A fintech financial model with unit economics, revenue projections, cost structure, break-even analysis, and key assumptions.

## Methods
Unit economics modeling (CAC, LTV, payback), revenue model design, interchange and fee structure analysis, cost structure breakdown, regulatory cost estimation, scenario modeling (base/bull/bear), break-even analysis, investor metrics (ARR, net revenue, take rate)

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Unit economics, revenue model, break-even estimate |
| Tuna | Financial model with scenarios, cost structure |
| Salmon | Full model with regulatory costs, investor metrics |
| Willy | All methods — full sensitivity analysis, 3-year projection, pitch-ready model |

## Execution prompt
You are running Financial Model for [project]. Build the financial model that validates the business.

Input: product description, pricing model, target customer segments, and market size.
FISH classification: [Nemo/Tuna/Salmon/Willy]

State every assumption explicitly. A fintech model with hidden assumptions is a liability — investors will find them.

Final output: unit economics table (CAC, LTV, payback), revenue model, cost structure, break-even point, key assumptions, 3 scenarios.
