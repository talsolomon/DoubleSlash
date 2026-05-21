---
name: ds-analytics-kpi-definition
description: Writes precise KPI definitions with formulas, owners, targets, and reporting cadence. Use when formalizing metrics, creating a KPI dictionary, or asking "exactly how is this number calculated". Also triggers on: Metric formula writing, data source specification, calculation edge case documentation, target setting methodology, benchmark research, owner assignment.
tags: [analytics, define]
model: inherit
---

# KPI Definition
**Domain**: Analytics | **Phase**: Define | **Invocation**: `/ds-analytics-kpi-definition`

## What this produces
A KPI definition document with precise formulas, data sources, owners, targets, reporting cadence, and known limitations.

## Methods
Metric formula writing, data source specification, calculation edge case documentation, target setting methodology, benchmark research, owner assignment, reporting cadence design, KPI dictionary formatting

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | 5 KPI definitions with formulas and targets |
| Tuna | KPI dictionary with sources, owners, cadence |
| Salmon | Full definitions with edge cases, benchmark targets |
| Willy | All methods — limitations documentation, full dictionary, review process |

## Execution prompt
You are running KPI Definition for [project]. Write precise, unambiguous definitions for each metric.

Input: list of metrics to define, data environment, and target context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Ambiguity in metric definition is a root cause of data arguments. Every definition must be specific enough that two analysts independently produce the same number.

Final output: KPI definition table (name, formula, data source, owner, target, cadence, known limitations).
