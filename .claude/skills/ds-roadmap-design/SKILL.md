---
name: ds-roadmap-design
description: Builds a sequenced NOW/NEXT/LATER roadmap with OKRs and dependency map. Use when prioritization or sequencing is the bottleneck, before quarterly planning, or asking "what do we build first". Also triggers on: build a roadmap, NOW NEXT LATER, quarterly planning, what do we build first, OKRs, prioritize features, sequence work, release planning, dependency sequencing, roadmap, prioritization.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, develop, ds-core, planning]
model: inherit
---

# DS Roadmap Design

Sequences what gets built, when, and why — with OKRs, dependency mapping, and a capacity reality check.

**Produces:** NOW/NEXT/LATER roadmap table, 3–5 OKRs, top 3 dependencies with resolution path, capacity reality check.

---

## When to invoke

- **Prioritization is the bottleneck.** Too many things to build; need a sequenced plan.
- **Before quarterly planning.** Need a roadmap that aligns the team on what's happening when.
- **Dependencies blocking progress.** Need to sequence work around what depends on what.
- **After solution direction is set.** Have a direction — now need to sequence delivery.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick plan | NOW/NEXT/LATER, OKRs (3 max) |
| Tuna | Standard roadmap | Outcome roadmap, OKR design, dependency sequencing |
| Salmon | Quarterly plan | Theme-based roadmap, quarterly planning, capacity planning, risk-adjusted sequencing |
| Willy | Portfolio plan | All methods — stakeholder alignment, portfolio prioritization, full OKR cascade |

---

## Instructions

1. **Input required:** solution direction from Develop phase (or describe what you're sequencing)
2. **Classify** scope: Nemo / Tuna / Salmon / Willy
3. **Run each method** at this FISH level, producing each artifact clearly labeled
4. **Validate** against capacity — a roadmap that ignores reality isn't a plan

**Final output:** roadmap table (NOW / NEXT / LATER with owners and sizes), 3–5 OKRs, top 3 dependencies with resolution path, capacity reality check. Recommend ds-launch-planning for the first NOW item.

---

## Methods library

NOW/NEXT/LATER mapping, outcome roadmap, opportunity roadmap, theme-based roadmap, quarterly planning session, OKR design, release planning, dependency sequencing, stakeholder alignment workshop, capacity planning, risk-adjusted sequencing, portfolio prioritization

---

## Error handling

| Condition | Resolution |
|---|---|
| Everything is "NOW" | Force a ranking: if everything is top priority, nothing is — apply RICE scoring first |
| No capacity data | Use t-shirt sizing (S/M/L/XL) as a proxy — flag it as estimated |
| Stakeholders disagree on sequencing | Surface the disagreement as a dependency conflict — make it visible, not hidden |
