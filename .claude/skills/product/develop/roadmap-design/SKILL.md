---
name: ds-product-roadmap-design
description: Builds a sequenced NOW/NEXT/LATER roadmap with OKRs and dependency map. Use when prioritization or sequencing is the bottleneck, before quarterly planning, or asking "what do we build first". Also triggers on: NOW/NEXT/LATER mapping, outcome roadmap, opportunity roadmap, theme-based roadmap, quarterly planning session, OKR design.
tags: [product, develop]
model: inherit
---

# Roadmap Design
**Domain**: Product | **Phase**: Develop | **Invocation**: `/ds-product-roadmap-design`

## What this produces
A sequenced plan for what gets built, when, and why. Output: NOW/NEXT/LATER roadmap, OKR set, dependency sequence, and capacity plan.

## Methods
NOW/NEXT/LATER mapping, outcome roadmap, opportunity roadmap, theme-based roadmap, quarterly planning session, OKR design, release planning, dependency sequencing, stakeholder alignment workshop, capacity planning, risk-adjusted sequencing, portfolio prioritization

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | NOW/NEXT/LATER, OKRs (3 max) |
| Tuna | Outcome roadmap, OKR design, dependency sequencing |
| Salmon | Theme-based roadmap, quarterly planning, capacity planning, risk-adjusted sequencing |
| Willy | All methods — stakeholder alignment workshop, portfolio prioritization, full OKR cascade |

## Execution prompt
You are running Roadmap Design for [project]. Sequence what gets built, when, and why.

Input: solution direction from Develop phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Run the methods for this FISH level. Produce each artifact clearly.

Final output: roadmap table (NOW / NEXT / LATER), 3–5 OKRs, top 3 dependencies with resolution path, capacity reality check.
