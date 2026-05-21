---
name: ds-strategy-scenario-planning
description: Develops future scenarios and stress-tests strategy against each. Use when planning under uncertainty, preparing for major decisions, or asking "what if things go differently than expected". Also triggers on: Scenario axis identification, scenario narrative development, probability and impact assessment, strategy stress-testing, early indicator definition, contingency trigger design.
tags: [strategy, define]
model: inherit
---

# Scenario Planning
**Domain**: Strategy | **Phase**: Define | **Invocation**: `/ds-strategy-scenario-planning`

## What this produces
3–4 future scenarios with descriptions, probability assessments, strategic implications, and a strategy stress-test.

## Methods
Scenario axis identification, scenario narrative development, probability and impact assessment, strategy stress-testing, early indicator definition, contingency trigger design, pre-mortem analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | 2 scenarios (best/worst), strategy implications for each |
| Tuna | 3 scenarios with narratives, probability, key implications |
| Salmon | 4 scenarios with stress-test, early indicators |
| Willy | All methods — contingency triggers, pre-mortem, full stress-test |

## Execution prompt
You are running Scenario Planning for [project]. Develop future scenarios that test the strategy against uncertainty.

Input: strategic framework and the key uncertainties the organization faces.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: 3–4 named scenarios with narrative, probability estimate, strategic implications per scenario, 3 early indicators to watch.
