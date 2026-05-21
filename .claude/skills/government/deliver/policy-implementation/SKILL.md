---
name: ds-government-policy-implementation
description: Executes and monitors policy delivery against plan with early warning indicators. Use when going live with a policy, managing a program rollout, or asking "are we delivering the policy as designed". Also triggers on: Delivery milestone tracking, compliance and uptake monitoring, early warning indicator design, media and public sentiment monitoring, delivery partner performance review, escalation process.
tags: [government, deliver]
model: inherit
---

# Policy Implementation
**Domain**: Government | **Phase**: Deliver | **Invocation**: `/ds-government-policy-implementation`

## What this produces
A policy implementation tracker with delivery milestones, compliance rates, early warning indicators, and course-correction triggers.

## Methods
Delivery milestone tracking, compliance and uptake monitoring, early warning indicator design, media and public sentiment monitoring, delivery partner performance review, escalation process, adaptive management framework, ministerial reporting design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Milestone tracker, top 3 risks, escalation triggers |
| Tuna | Implementation tracker with compliance monitoring, partner review |
| Salmon | Full tracker with early warnings, adaptive management |
| Willy | All methods — ministerial reporting, full monitoring dashboard |

## Execution prompt
You are running Policy Implementation for [project]. Track delivery and catch problems before they become crises.

Input: implementation plan and early operational data.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Policy implementation fails silently. Design monitoring that detects divergence from plan early enough to correct.

Final output: implementation scorecard, compliance and uptake rates, early warning flags, course-correction options, reporting summary.
