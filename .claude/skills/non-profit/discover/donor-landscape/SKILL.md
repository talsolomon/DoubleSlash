---
name: ds-non-profit-donor-landscape
description: Maps the funding landscape for a cause area including foundations, government grants, and individual donors. Use when starting a fundraising strategy, diversifying funding, or asking "who funds this kind of work and how do we reach them". Also triggers on: Foundation landscape mapping, government grant opportunity research, major donor segment analysis, corporate giving landscape, crowdfunding and small donor opportunity, funding gap identification.
tags: [non-profit, discover]
model: inherit
---

# Donor Landscape
**Domain**: Non-Profit | **Phase**: Discover | **Invocation**: `/ds-non-profit-donor-landscape`

## What this produces
A donor landscape brief with funder inventory, giving priorities, funding gaps, and prospecting opportunities.

## Methods
Foundation landscape mapping, government grant opportunity research, major donor segment analysis, corporate giving landscape, crowdfunding and small donor opportunity, funding gap identification, giving trend analysis, prospect qualification framework

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 10 funders, giving priorities, funding gaps |
| Tuna | Landscape with trend analysis, prospect qualification |
| Salmon | Full landscape with corporate giving, government grants |
| Willy | All methods — full funder database, prospect pipeline, gap analysis |

## Execution prompt
You are running Donor Landscape for [project]. Map who funds this work and where the gaps and opportunities are.

Input: cause area, geographic focus, and current funding situation.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Funding landscape shifts with priorities. Research what funders are currently saying, not just what they've funded historically.

Final output: funder inventory with giving priorities, funding gap analysis, top 10 prospects with rationale, funding trend summary.
