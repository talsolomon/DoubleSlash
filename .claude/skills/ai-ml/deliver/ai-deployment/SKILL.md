---
name: ds-ai-ml-ai-deployment
description: Plans the production deployment of an AI/ML system with monitoring, fallbacks, and rollout strategy. Use when taking a model to production, planning a phased ML rollout, or asking "how do we ship this safely". Also triggers on: Serving architecture design, latency and throughput planning, model monitoring design, drift detection setup, fallback and circuit breaker design, A/B test and shadow mode rollout.
tags: [ai-ml, deliver]
model: inherit
---

# AI Deployment
**Domain**: AI/ML | **Phase**: Deliver | **Invocation**: `/ds-ai-ml-ai-deployment`

## What this produces
An AI deployment plan with serving architecture, monitoring setup, fallback design, rollout strategy, and go-live checklist.

## Methods
Serving architecture design, latency and throughput planning, model monitoring design, drift detection setup, fallback and circuit breaker design, A/B test and shadow mode rollout, safety and guardrail design, incident response plan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Serving approach, monitoring plan, rollout sequence |
| Tuna | Deployment plan with fallback design, A/B strategy |
| Salmon | Full plan with drift detection, safety design |
| Willy | All methods — incident response, full monitoring setup, guardrail spec |

## Execution prompt
You are running AI Deployment for [project]. Plan a production rollout that ships safely and monitors reliably.

Input: model design, infrastructure context, and risk tolerance.
FISH classification: [Nemo/Tuna/Salmon/Willy]

ML systems fail silently. Build monitoring that catches drift, degradation, and edge case failures before users do.

Final output: serving architecture, monitoring plan (metrics + alerts), fallback design, rollout sequence, go-live checklist.
