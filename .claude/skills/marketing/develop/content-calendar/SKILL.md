---
name: ds-marketing-content-calendar
description: Builds a content calendar aligned to campaign goals and audience. Use when planning content production, managing a content team, or asking "what do we publish and when". Also triggers on: Content pillar definition, topic ideation, format selection, channel mapping, publishing cadence design, SEO keyword mapping.
tags: [marketing, develop]
model: inherit
---

# Content Calendar
**Domain**: Marketing | **Phase**: Develop | **Invocation**: `/ds-marketing-content-calendar`

## What this produces
A content calendar with topics, formats, channels, publish dates, owners, and content pillars mapped to business goals.

## Methods
Content pillar definition, topic ideation, format selection, channel mapping, publishing cadence design, SEO keyword mapping, evergreen vs. timely content balance, content recycling strategy, approval workflow design, performance feedback loop

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Content pillars (3), 2-week topic list, channel mapping |
| Tuna | Full calendar with pillars, topics, formats, cadence, owners |
| Salmon | Calendar with SEO mapping, evergreen strategy, approval workflow |
| Willy | All methods — recycling strategy, performance loop, full quarter plan |

## Execution prompt
You are running Content Calendar for [project]. Produce a calendar that keeps content production on track and aligned to goals.

Input: campaign goals, content channels, and team capacity.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: content pillars (3–5), topic list for the planning period, calendar table (date × channel × format × topic × owner), publishing cadence.
