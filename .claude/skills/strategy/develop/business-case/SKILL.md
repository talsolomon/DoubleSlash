---
name: ds-strategy-business-case
description: Builds a business case with problem, solution, ROI, risk, and recommendation. Use when seeking investment or approval, justifying a major initiative, or asking "why should we do this and what does it take". Also triggers on: Problem articulation, solution options analysis, ROI modeling, cost-benefit analysis, NPV/IRR calculation, payback period.
tags: [strategy, develop]
model: inherit
---

# Business Case
**Domain**: Strategy | **Phase**: Develop | **Invocation**: `/ds-strategy-business-case`

## What this produces
A business case document with problem statement, proposed solution, financial model, risk assessment, and a clear recommendation.

## Methods
Problem articulation, solution options analysis, ROI modeling, cost-benefit analysis, NPV/IRR calculation, payback period, sensitivity analysis, risk identification and scoring, assumptions documentation, recommendation framing

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Problem, solution, high-level ROI, recommendation |
| Tuna | Business case with cost-benefit, risk, recommendation |
| Salmon | Full case with financial model, sensitivity analysis |
| Willy | All methods — NPV/IRR, full risk matrix, stakeholder considerations |

## Execution prompt
You are running Business Case for [project]. Build a case that enables a decision-maker to say yes or no with confidence.

Input: the initiative being evaluated, available data, and the decision context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: problem statement, proposed solution with options considered, financial summary (costs/benefits/ROI), top 3 risks, clear recommendation.
