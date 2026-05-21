---
name: ds-product-launch-planning
description: Creates a complete GTM and launch plan — rollout, flags, success metrics, risk assessment. Use when shipping to users, planning a beta, preparing for a product launch, or asking "how do we get this out". Also triggers on: GTM strategy, launch checklist, rollout plan, feature flag strategy, beta program design, stakeholder communication plan.
tags: [product, deliver]
model: inherit
---

# Launch Planning
**Domain**: Product | **Phase**: Deliver | **Invocation**: `/ds-product-launch-planning`

## What this produces
A complete plan to get a feature or product to users safely and measurably. Output: GTM strategy, launch checklist, rollout plan with flags, success metrics, and risk assessment.

## Methods
GTM strategy, launch checklist, rollout plan, feature flag strategy, beta program design, stakeholder communication plan, success metrics definition, post-launch review framework, launch retrospective, soft launch vs. hard launch decision, launch risk assessment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Launch checklist, success metrics (3 max), soft vs. hard launch decision |
| Tuna | GTM strategy, launch checklist, rollout plan, success metrics |
| Salmon | Full GTM, beta program design, stakeholder comms, risk assessment |
| Willy | All methods — feature flag strategy, post-launch review framework, full comms cascade |

## Execution prompt
You are running Launch Planning for [project]. Produce a complete, executable launch plan.

Input: product/feature being launched, target audience, current phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Run the methods for this FISH level.

Final output: GTM strategy (1 page), launch checklist (actionable, owner per item), top 3 launch risks with mitigation, and 3 success metrics with thresholds.