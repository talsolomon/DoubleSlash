---
name: ds-brand-brand-audit
description: Audits existing brand assets, consistency, and perception gaps. Use when refreshing a brand, diagnosing inconsistency, or asking "how is our brand showing up and where is it broken". Also triggers on: Visual consistency audit, voice and tone audit, brand touchpoint mapping, asset inventory, competitor perception comparison, customer perception research.
tags: [brand, discover]
model: inherit
---

# Brand Audit
**Domain**: Brand | **Phase**: Discover | **Invocation**: `/ds-brand-brand-audit`

## What this produces
A brand audit report with consistency assessment, asset inventory, perception gap analysis, and priority areas for improvement.

## Methods
Visual consistency audit, voice and tone audit, brand touchpoint mapping, asset inventory, competitor perception comparison, customer perception research, internal brand alignment assessment, digital presence audit, employer brand assessment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Visual consistency check, top 3 inconsistencies, asset gaps |
| Tuna | Full consistency audit, touchpoint map, digital presence review |
| Salmon | Audit with perception gap analysis, competitor comparison |
| Willy | All methods — customer perception research, employer brand, full asset inventory |

## Execution prompt
You are running a Brand Audit for [project]. Assess where the brand is consistent, where it's broken, and what matters most to fix.

Input: brand assets, touchpoints to review, and any known perception concerns.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: consistency score by touchpoint, asset inventory gaps, top 5 priority issues with severity, recommended focus areas.
