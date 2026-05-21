---
name: ds-non-profit-impact-research
description: Researches the problem landscape, evidence base, and existing interventions for a social or environmental issue. Use when designing a new program, entering a new cause area, or asking "what actually works to address this problem". Also triggers on: Problem scope and magnitude research, root cause analysis, existing intervention landscape mapping, evidence effectiveness review, gap and white space identification, beneficiary needs research.
tags: [non-profit, discover]
model: inherit
---

# Impact Research
**Domain**: Non-Profit | **Phase**: Discover | **Invocation**: `/ds-non-profit-impact-research`

## What this produces
An impact research brief with problem scope, existing intervention evidence, gaps, and highest-leverage entry points.

## Methods
Problem scope and magnitude research, root cause analysis, existing intervention landscape mapping, evidence effectiveness review, gap and white space identification, beneficiary needs research, cost-effectiveness benchmarking, leverage point identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Problem scope, top 3 interventions, evidence summary |
| Tuna | Research brief with effectiveness review, gap analysis |
| Salmon | Full research with root cause analysis, leverage points |
| Willy | All methods — cost-effectiveness benchmarks, full intervention map |

## Execution prompt
You are running Impact Research for [project]. Understand the problem and what interventions have the best evidence.

Input: cause area and organizational context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Don't assume the problem — verify it with evidence. Well-intentioned programs built on incorrect problem models waste resources and can cause harm.

Final output: problem scope with evidence, top 3 effective interventions with evidence quality rating, gap analysis, highest-leverage entry points.
