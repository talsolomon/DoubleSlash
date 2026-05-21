---
name: ds-non-profit-fundraising-strategy
description: Designs the fundraising strategy to sustain and grow organizational revenue. Use when building a development function, diversifying funding, or asking "how do we raise what we need reliably". Also triggers on: Revenue target setting, channel mix design (major gifts, foundations, government, events, individual giving).
tags: [non-profit, develop]
model: inherit
---

# Fundraising Strategy
**Domain**: Non-Profit | **Phase**: Develop | **Invocation**: `/ds-non-profit-fundraising-strategy`

## What this produces
A fundraising strategy with revenue targets, channel mix, donor acquisition and retention plan, and 12-month pipeline.

## Methods
Revenue target setting, channel mix design (major gifts, foundations, government, events, individual giving), donor acquisition strategy, retention and stewardship design, grant calendar development, case for support development, board fundraising engagement, major donor cultivation plan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Revenue targets, top 3 channels, 12-month pipeline |
| Tuna | Strategy with donor acquisition, retention plan |
| Salmon | Full strategy with grant calendar, case for support |
| Willy | All methods — board engagement, major donor cultivation, full channel plan |

## Execution prompt
You are running Fundraising Strategy for [project]. Design how the organization will raise what it needs.

Input: donor landscape, funding gaps, and organizational capacity.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Fundraising strategies fail when they rely on one or two funders. Build a diversified strategy from the start.

Final output: revenue target by channel, acquisition and retention plan, grant calendar, case for support outline, 12-month pipeline.
