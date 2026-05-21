---
name: ds-legal-compliance-legal-retrospective
description: Reviews legal and compliance performance for the period with lessons and program improvements. Use at year-end, after an enforcement action, or asking "how did our legal and compliance program actually perform". Also triggers on: Legal incident and dispute review, enforcement action analysis, compliance program effectiveness scoring, legal cost review, contract dispute analysis, policy violation review.
tags: [legal-compliance, deliver]
model: inherit
---

# Legal Retrospective
**Domain**: Legal/Compliance | **Phase**: Deliver | **Invocation**: `/ds-legal-compliance-legal-retrospective`

## What this produces
A legal retrospective report with incident review, program performance scores, cost analysis, and compliance program improvements.

## Methods
Legal incident and dispute review, enforcement action analysis, compliance program effectiveness scoring, legal cost review, contract dispute analysis, policy violation review, lessons learned documentation, program improvement roadmap

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Incident summary, program scores, top 3 improvements |
| Tuna | Retro with cost review, policy violation analysis |
| Salmon | Full retro with enforcement analysis, contract disputes |
| Willy | All methods — full incident log, program improvement roadmap, board summary |

## Execution prompt
You are running Legal Retrospective for [project]. Assess how the legal and compliance function performed.

Input: incident log, legal costs, compliance program metrics, and regulatory interactions.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: incident and enforcement summary, program effectiveness scores, legal cost breakdown, top 3 lessons, compliance program improvements for next period.
