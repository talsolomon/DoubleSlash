---
name: ds-marketing-campaign-planning
description: Plans a multi-channel marketing campaign with timeline, owners, and budget. Use when executing a campaign brief, coordinating across channels, or asking "how do we run this campaign". Also triggers on: Multi-channel campaign design, channel sequencing, content matrix, paid media planning, organic channel planning, email sequence design.
tags: [marketing, develop]
model: inherit
---

# Campaign Planning
**Domain**: Marketing | **Phase**: Develop | **Invocation**: `/ds-marketing-campaign-planning`

## What this produces
A campaign execution plan with channel breakdown, content plan, timeline, owner assignments, budget allocation, and risk flags.

## Methods
Multi-channel campaign design, channel sequencing, content matrix, paid media planning, organic channel planning, email sequence design, influencer/partner outreach planning, A/B test planning, budget allocation modeling, risk identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Channel breakdown (top 2), content matrix, timeline |
| Tuna | Multi-channel plan, content matrix, email sequence, budget outline |
| Salmon | Full plan with A/B tests, paid/organic split, risk flags |
| Willy | All methods — influencer plan, full budget model, optimization framework |

## Execution prompt
You are running Campaign Planning for [project]. Translate the campaign brief into an executable plan.

Input: campaign brief, available channels, and budget.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: channel plan with objectives per channel, content matrix (format × channel × timing), timeline with milestones, owner list, budget allocation, top 3 risks.
