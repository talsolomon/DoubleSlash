---
name: ds-fintech-integration-planning
description: Plans technical integrations with banks, payment processors, and financial data providers. Use when selecting fintech infrastructure partners, scoping integrations, or asking "which BaaS or payment rail do we use and how do we connect". Also triggers on: Partner evaluation (BaaS, payment processors, KYC providers, data aggregators), API capability assessment, integration architecture design.
tags: [fintech, develop]
model: inherit
---

# Integration Planning
**Domain**: Fintech | **Phase**: Develop | **Invocation**: `/ds-fintech-integration-planning`

## What this produces
An integration plan with partner selection, API integration spec, data flow design, and implementation timeline.

## Methods
Partner evaluation (BaaS, payment processors, KYC providers, data aggregators), API capability assessment, integration architecture design, data flow and transformation design, fallback and redundancy planning, SLA and cost comparison, implementation sequencing

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Partner shortlist, integration approach, timeline |
| Tuna | Integration plan with API spec, data flow design |
| Salmon | Full plan with fallback design, SLA comparison |
| Willy | All methods — full partner evaluation, implementation spec, cost model |

## Execution prompt
You are running Integration Planning for [project]. Select and plan integrations with financial infrastructure partners.

Input: product spec, budget, and regulatory requirements.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Partner choice in fintech is a multi-year commitment — evaluate for current needs AND growth ceiling.

Final output: partner recommendation with alternatives, integration architecture, data flow spec, SLA comparison, implementation timeline.
