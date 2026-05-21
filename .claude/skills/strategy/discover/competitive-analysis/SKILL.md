---
name: ds-strategy-competitive-analysis
description: Analyzes competitors — positioning, strengths, weaknesses, and strategic gaps. Use when assessing the market, preparing for a strategy session, or asking "who are we competing with and where are they weak". Also triggers on: Competitor profiling, positioning map, SWOT per competitor, feature and capability comparison, pricing analysis, distribution and channel analysis.
tags: [strategy, discover]
model: inherit
---

# Competitive Analysis
**Domain**: Strategy | **Phase**: Discover | **Invocation**: `/ds-strategy-competitive-analysis`

## What this produces
A competitive analysis with positioning map, competitor profiles, strength/weakness assessment, and gap opportunities.

## Methods
Competitor profiling, positioning map, SWOT per competitor, feature and capability comparison, pricing analysis, distribution and channel analysis, funding and momentum assessment, win/loss pattern analysis, customer review mining

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 5 competitors, positioning map, top gaps |
| Tuna | Competitor profiles, SWOT, positioning, pricing |
| Salmon | Full analysis with distribution, momentum, win/loss patterns |
| Willy | All methods — customer review mining, full capability comparison |

## Execution prompt
You are running Competitive Analysis for [project]. Produce a competitive map that identifies where to win.

Input: company description and known competitors.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: competitor profiles (5–8), positioning map, top 3 competitor weaknesses, top 3 strategic gap opportunities.
