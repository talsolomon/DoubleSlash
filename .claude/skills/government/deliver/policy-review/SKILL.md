---
name: ds-government-policy-review
description: Reviews a policy or program for effectiveness, efficiency, and continuing relevance. Use at scheduled review cycles, after a change in context, or asking "is this policy still working and should we continue, change, or stop it". Also triggers on: Outcome vs. objective assessment, cost-effectiveness analysis, equity and distributional impact review, stakeholder satisfaction assessment, unintended consequence identification, changed-context assessment.
tags: [government, deliver]
model: inherit
---

# Policy Review
**Domain**: Government | **Phase**: Deliver | **Invocation**: `/ds-government-policy-review`

## What this produces
A policy review report with effectiveness assessment, efficiency analysis, equity review, and a continue/amend/terminate recommendation.

## Methods
Outcome vs. objective assessment, cost-effectiveness analysis, equity and distributional impact review, stakeholder satisfaction assessment, unintended consequence identification, changed-context assessment, international comparison, continue/amend/terminate recommendation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Effectiveness score, top findings, recommendation |
| Tuna | Review with cost-effectiveness, stakeholder satisfaction |
| Salmon | Full review with equity assessment, unintended consequences |
| Willy | All methods — international comparison, full evaluation report |

## Execution prompt
You are running Policy Review for [project]. Assess whether the policy is achieving its objectives and whether it should continue.

Input: policy framework, implementation data, and evaluation evidence.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: effectiveness assessment vs. original objectives, cost-effectiveness summary, equity findings, top 3 unintended consequences, continue/amend/terminate recommendation with rationale.
