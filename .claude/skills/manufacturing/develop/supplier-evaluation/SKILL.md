---
name: ds-manufacturing-supplier-evaluation
description: Evaluates and selects manufacturing suppliers using structured criteria. Use when qualifying new suppliers, consolidating the supply base, or asking "which supplier should we choose and why". Also triggers on: Supplier capability assessment, quality system audit, financial stability review, capacity verification, lead time and flexibility scoring, geopolitical and logistics risk assessment.
tags: [manufacturing, develop]
model: inherit
---

# Supplier Evaluation
**Domain**: Manufacturing | **Phase**: Develop | **Invocation**: `/ds-manufacturing-supplier-evaluation`

## What this produces
A supplier evaluation report with scored comparison, audit findings, risk assessment, and a sourcing recommendation.

## Methods
Supplier capability assessment, quality system audit, financial stability review, capacity verification, lead time and flexibility scoring, geopolitical and logistics risk assessment, total cost of ownership modeling, reference check design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Capability scores, top 3 risks, recommendation |
| Tuna | Evaluation with quality audit, TCO comparison |
| Salmon | Full evaluation with financial review, geopolitical risk |
| Willy | All methods — full audit, TCO model, reference checks, dual-source plan |

## Execution prompt
You are running Supplier Evaluation for [project]. Select the supplier that best meets quality, cost, and risk requirements.

Input: supplier shortlist, product spec, and sourcing criteria.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Evaluate total cost of ownership, not just unit price. Cheap suppliers with poor quality or long lead times are expensive.

Final output: scored supplier comparison, top risks per supplier, TCO summary, recommendation with rationale, contingency supplier.
