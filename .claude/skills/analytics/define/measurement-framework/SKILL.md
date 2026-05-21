---
name: ds-analytics-measurement-framework
description: Defines what to measure, why, and how — connecting metrics to business outcomes. Use when building an analytics strategy, aligning a team on success, or asking "what metrics actually matter and why". Also triggers on: Outcome-to-metric mapping, metric hierarchy design, leading/lagging indicator identification, north star metric definition, counter-metric definition, instrumentation requirements.
tags: [analytics, define]
model: inherit
---

# Measurement Framework
**Domain**: Analytics | **Phase**: Define | **Invocation**: `/ds-analytics-measurement-framework`

## What this produces
A measurement framework with metric hierarchy, business outcome linkage, leading vs. lagging indicators, and instrumentation requirements.

## Methods
Outcome-to-metric mapping, metric hierarchy design, leading/lagging indicator identification, north star metric definition, counter-metric definition, instrumentation requirements, metric ownership assignment, data collection specification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | North star metric, 3 supporting metrics, outcome linkage |
| Tuna | Framework with metric hierarchy, leading/lagging split |
| Salmon | Full framework with counter-metrics, instrumentation requirements |
| Willy | All methods — ownership map, full instrumentation spec, metric glossary |

## Execution prompt
You are running Measurement Framework for [project]. Define the metric system that proves whether the work is succeeding.

Input: business objectives and available or planned data sources.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Every metric must connect to a decision. If no one would change behavior based on the metric, cut it.

Final output: metric hierarchy table, north star metric with rationale, leading/lagging split, top 3 instrumentation requirements.
