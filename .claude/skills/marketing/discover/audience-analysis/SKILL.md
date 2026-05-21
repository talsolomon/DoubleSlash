---
name: ds-marketing-audience-analysis
description: Profiles target audiences — jobs, pain points, channels, and messages that resonate. Use when defining who to market to, personalizing campaigns, or asking "who is our customer and what do they care about". Also triggers on: Customer persona development, jobs-to-be-done analysis, pain point mapping, channel preference mapping, buying journey mapping, psychographic profiling.
tags: [marketing, discover]
model: inherit
---

# Audience Analysis
**Domain**: Marketing | **Phase**: Discover | **Invocation**: `/ds-marketing-audience-analysis`

## What this produces
Audience profiles with job-to-be-done, pain points, preferred channels, buying triggers, and message hooks.

## Methods
Customer persona development, jobs-to-be-done analysis, pain point mapping, channel preference mapping, buying journey mapping, psychographic profiling, demographic analysis, voice-of-customer synthesis, review mining, social listening

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | 2 personas, JTBD for each, top channel preference |
| Tuna | Personas, pain point map, buying journey, channel preferences |
| Salmon | Full audience analysis with psychographics, voice-of-customer, review mining |
| Willy | All methods — social listening, full buying journey, multi-segment analysis |

## Execution prompt
You are running Audience Analysis for [project]. Profile the target audience so marketing can reach and convert them.

Input: product description, existing customer data, or market research.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: 2–3 audience profiles each with JTBD, top 3 pain points, preferred channels, and a message hook that will resonate.
