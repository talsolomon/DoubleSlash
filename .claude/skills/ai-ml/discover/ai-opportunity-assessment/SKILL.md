---
name: ds-ai-ml-ai-opportunity-assessment
description: Identifies and prioritizes where AI/ML can create the most value in a product or business. Use when starting an AI initiative, building an AI roadmap, or asking "where should we actually apply AI". Also triggers on: Use case generation, value potential scoring, technical feasibility assessment, data availability check, build-vs-buy analysis, risk and regulatory screening.
tags: [ai-ml, discover]
model: inherit
---

# AI Opportunity Assessment
**Domain**: AI/ML | **Phase**: Discover | **Invocation**: `/ds-ai-ml-ai-opportunity-assessment`

## What this produces
An AI opportunity map with prioritized use cases, feasibility scores, value estimates, and a recommended starting point.

## Methods
Use case generation, value potential scoring, technical feasibility assessment, data availability check, build-vs-buy analysis, risk and regulatory screening, quick-win identification, AI maturity benchmarking

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 3 use cases, feasibility scores, recommended start |
| Tuna | Opportunity map with value/feasibility matrix, data check |
| Salmon | Full assessment with build-vs-buy, risk screening |
| Willy | All methods — maturity benchmarking, full use case catalog, roadmap |

## Execution prompt
You are running AI Opportunity Assessment for [project]. Identify where AI creates the most value with the least friction.

Input: business context, current pain points, and available data landscape.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Score opportunities on value potential × technical feasibility × data readiness. Prioritize quick wins that build toward larger bets.

Final output: use case matrix (name, value, feasibility, data readiness, risk), top 3 recommendations with rationale, suggested first initiative.
