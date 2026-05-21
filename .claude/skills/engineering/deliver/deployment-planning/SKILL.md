---
name: ds-engineering-deployment-planning
description: Plans a safe, rollback-ready deployment to production — strategy, checklist, monitoring, and rollback plan. Use when shipping to production, planning a release, or asking "how do we deploy this safely". Also triggers on: Deployment strategy selection (blue-green, canary, rolling, feature flags), pre-deployment checklist, database migration planning.
tags: [engineering, deliver]
model: inherit
---

# Deployment Planning
**Domain**: Engineering | **Phase**: Deliver | **Invocation**: `/ds-engineering-deployment-planning`

## What this produces
A complete deployment plan with strategy, pre-flight checklist, monitoring setup, and rollback procedure.

## Methods
Deployment strategy selection (blue-green, canary, rolling, feature flags), pre-deployment checklist, database migration planning, zero-downtime deployment design, health check definition, monitoring and alerting setup, rollback procedure, smoke test suite, communication plan, post-deployment validation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Deployment strategy, pre-flight checklist, rollback steps |
| Tuna | Strategy, checklist, health checks, monitoring, rollback |
| Salmon | Full plan with migration strategy, smoke tests, comms plan |
| Willy | All methods — canary analysis, full monitoring setup, post-deploy validation |

## Execution prompt
You are running Deployment Planning for [project]. Produce a deployment plan that enables safe release with a clear rollback path.

Input: what is being deployed, the target environment, and any known risks.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Plan deployment sequentially: pre-deploy → deploy → validate → monitor → rollback trigger.

Final output: deployment strategy with rationale, pre-flight checklist, rollback procedure (step-by-step), success criteria and monitoring thresholds.
