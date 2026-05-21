---
name: ds-devops-infrastructure-deployment-automation
description: Plans and implements automated deployment processes for production systems. Use when eliminating manual deploys, reducing deployment risk, or asking "how do we make deployments boring and safe". Also triggers on: Manual deploy audit, automation tooling selection, health check and readiness probe design, canary and progressive rollout configuration, automated rollback trigger design, deployment notification setup.
tags: [devops-infrastructure, deliver]
model: inherit
---

# Deployment Automation
**Domain**: DevOps/Infrastructure | **Phase**: Deliver | **Invocation**: `/ds-devops-infrastructure-deployment-automation`

## What this produces
A deployment automation plan with runbook replacement strategy, automation tooling, health check design, and progressive rollout configuration.

## Methods
Manual deploy audit, automation tooling selection, health check and readiness probe design, canary and progressive rollout configuration, automated rollback trigger design, deployment notification setup, deployment frequency tracking, runbook-to-automation conversion

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Automation approach, health checks, rollback triggers |
| Tuna | Automation plan with progressive rollout, notifications |
| Salmon | Full plan with canary configuration, runbook conversion |
| Willy | All methods — deployment metrics, full automation spec, training plan |

## Execution prompt
You are running Deployment Automation for [project]. Replace manual deployment steps with reliable, observable automation.

Input: current deployment process, system description, and risk tolerance.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Goal: every deployment is triggered by a merge, visible in a dashboard, and automatically rolled back if health checks fail.

Final output: automation tooling recommendation, health check spec, canary/progressive rollout config, automated rollback triggers, deployment runbook retirement plan.
