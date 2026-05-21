---
name: ds-marketing-campaign-launch
description: Executes a campaign launch — go/no-go checklist, monitoring plan, and live optimization. Use when a campaign is ready to go live or asking "are we ready to launch and how do we watch it". Also triggers on: Go/no-go checklist, tracking verification, UTM parameter audit, landing page QA, ad creative review, email deliverability check.
tags: [marketing, deliver]
model: inherit
---

# Campaign Launch
**Domain**: Marketing | **Phase**: Deliver | **Invocation**: `/ds-marketing-campaign-launch`

## What this produces
A campaign launch package: go/no-go checklist, monitoring dashboard setup, day-1 response plan, and optimization triggers.

## Methods
Go/no-go checklist, tracking verification, UTM parameter audit, landing page QA, ad creative review, email deliverability check, monitoring dashboard setup, real-time response plan, budget pacing check, early performance threshold definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Go/no-go checklist, tracking verification, top monitoring metrics |
| Tuna | Full checklist, tracking audit, monitoring setup, response plan |
| Salmon | Complete launch package with budget pacing, optimization triggers |
| Willy | All methods — full QA checklist, deliverability audit, escalation plan |

## Execution prompt
You are running Campaign Launch for [project]. Ensure everything is ready and define how we watch performance on day one.

Input: campaign plan and all assets and channels going live.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: go/no-go checklist (sign off each item), monitoring metrics with thresholds, first-48-hours response plan, optimization trigger conditions.
