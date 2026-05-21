---
name: ds-government-policy-research
description: Researches the policy landscape, prior art, and evidence base for a government initiative. Use when designing new policy, evaluating an existing program, or asking "what does the evidence say and what have others tried". Also triggers on: Evidence base review, comparable jurisdiction scanning, policy precedent research, academic and think-tank literature review, program evaluation review, regulatory impact research.
tags: [government, discover]
model: inherit
---

# Policy Research
**Domain**: Government | **Phase**: Discover | **Invocation**: `/ds-government-policy-research`

## What this produces
A policy research brief with evidence review, comparable jurisdiction analysis, stakeholder landscape, and preliminary findings.

## Methods
Evidence base review, comparable jurisdiction scanning, policy precedent research, academic and think-tank literature review, program evaluation review, regulatory impact research, stakeholder needs mapping, political feasibility assessment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Evidence summary, 3 comparable jurisdictions, key stakeholders |
| Tuna | Research brief with program evaluations, political feasibility |
| Salmon | Full research with literature review, impact analysis |
| Willy | All methods — full evidence base, stakeholder mapping, feasibility matrix |

## Execution prompt
You are running Policy Research for [project]. Build the evidence base for the policy decision.

Input: policy area and jurisdiction context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Policy built on weak evidence fails at implementation. Identify what the evidence actually supports, not what the brief assumes.

Final output: evidence summary, comparable jurisdiction analysis, stakeholder landscape, political feasibility assessment, key research gaps.
