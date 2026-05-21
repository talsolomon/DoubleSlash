---
name: ds-devops-infrastructure-sla-definition
description: Defines service level objectives, agreements, and error budgets for systems and APIs. Use when formalizing reliability targets, setting customer expectations, or asking "what uptime and latency are we actually committing to". Also triggers on: SLI identification (availability, latency, error rate, throughput), SLO target setting, SLA contractual framing.
tags: [devops-infrastructure, define]
model: inherit
---

# SLA Definition
**Domain**: DevOps/Infrastructure | **Phase**: Define | **Invocation**: `/ds-devops-infrastructure-sla-definition`

## What this produces
An SLA/SLO specification with availability targets, latency budgets, error budget policy, measurement methodology, and escalation definitions.

## Methods
SLI identification (availability, latency, error rate, throughput), SLO target setting, SLA contractual framing, error budget calculation, burn rate alerting design, measurement methodology, violation escalation design, incident classification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Core SLIs, SLO targets, error budget |
| Tuna | Full SLO spec with measurement, burn rate alerts |
| Salmon | SLA document with escalation, violation policy |
| Willy | All methods — incident classification, contractual SLA, review cadence |

## Execution prompt
You are running SLA Definition for [project]. Specify reliability commitments with measurable targets and enforcement mechanisms.

Input: system description, business criticality, and historical reliability data.
FISH classification: [Nemo/Tuna/Salmon/Willy]

An SLO without a measurement method is a wish. Every target must have a defined collection mechanism and review cadence.

Final output: SLI/SLO table with targets, error budget policy, measurement methodology, burn rate alert thresholds, escalation path.
