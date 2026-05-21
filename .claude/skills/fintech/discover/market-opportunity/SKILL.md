---
name: ds-fintech-market-opportunity
description: Sizes the fintech market opportunity and identifies underserved segments. Use when entering a new financial vertical, pitching investors, or asking "is this fintech opportunity worth pursuing". Also triggers on: Market sizing (TAM/SAM/SOM), segment identification and scoring, competitive landscape mapping, regulatory tailwind/headwind assessment, monetization model survey, unit economics benchmarking.
tags: [fintech, discover]
model: inherit
---

# Market Opportunity
**Domain**: Fintech | **Phase**: Discover | **Invocation**: `/ds-fintech-market-opportunity`

## What this produces
A fintech market opportunity brief with TAM/SAM/SOM, segment analysis, competitive white space, and go-forward recommendation.

## Methods
Market sizing (TAM/SAM/SOM), segment identification and scoring, competitive landscape mapping, regulatory tailwind/headwind assessment, monetization model survey, unit economics benchmarking, customer pain intensity scoring

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Market size, top 3 segments, competitive white space |
| Tuna | Opportunity brief with competitive landscape, unit economics |
| Salmon | Full analysis with regulatory assessment, monetization models |
| Willy | All methods — investor-ready sizing, full competitive map, go/no-go |

## Execution prompt
You are running Market Opportunity for [project]. Assess the fintech market and identify where to compete.

Input: target financial service vertical and any existing product context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Fintech opportunities must clear two filters: customer pain intensity AND regulatory feasibility. Score both.

Final output: TAM/SAM/SOM estimate, segment priority matrix, top 3 competitive gaps, regulatory feasibility score, monetization model recommendation.
