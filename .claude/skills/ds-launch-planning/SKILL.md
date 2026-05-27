---
name: ds-launch-planning
description: Creates a complete GTM and launch plan — rollout, feature flags, success metrics, risk assessment. Use when shipping to users, planning a beta, preparing for a product launch, or asking "how do we get this out". Also triggers on: GTM, go to market, ship it, launch strategy, release plan, rollout, how do we launch, beta program, feature flags, launch checklist, launch risk.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, deliver, ds-core, launch]
model: inherit
---

# DS Launch Planning

Produces a complete, executable plan to get a feature or product to users safely and measurably.

**Produces:** GTM strategy (1 page), launch checklist with owners, top 3 launch risks with mitigation, 3 success metrics with thresholds.

---

## When to invoke

- **Shipping to users.** Have something ready — need a plan to release it.
- **Planning a beta.** Want controlled early access before full launch.
- **Preparing for a product launch.** Coordinating across engineering, marketing, sales, support.
- **Defining success before launch.** Need metrics and thresholds agreed before shipping.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Simple release | Launch checklist, success metrics (3 max), soft vs. hard launch decision |
| Tuna | Standard launch | GTM strategy, launch checklist, rollout plan, success metrics |
| Salmon | Full launch | GTM, beta program design, stakeholder comms, risk assessment |
| Willy | Coordinated launch | All methods — feature flag strategy, post-launch review framework, full comms cascade |

---

## Instructions

1. **Input required:** product/feature being launched, target audience, current readiness
2. **Classify** scope: Nemo / Tuna / Salmon / Willy
3. **Run each method** at this FISH level
4. **For every risk:** name a mitigation — no unmitigated risks in the output

**Final output:** GTM strategy, launch checklist (actionable, owner per item), top 3 launch risks with mitigation, 3 success metrics with thresholds. Recommend ds-product-retrospective to run post-launch.

---

## Methods library

GTM strategy, launch checklist, rollout plan, feature flag strategy, beta program design, stakeholder communication plan, success metrics definition, post-launch review framework, launch retrospective, soft launch vs. hard launch decision, launch risk assessment

---

## Error handling

| Condition | Resolution |
|---|---|
| No success metrics defined | Block the launch plan — "we'll know it when we see it" is not a metric |
| Launch dependencies on other teams | Surface them in the checklist with owner + deadline — unowned items don't ship |
| Risk list is empty | Re-examine — every launch has risks; an empty list means they're hidden |
