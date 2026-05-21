---
name: ds-retail-ecommerce-market-research
description: Researches the retail or ecommerce market landscape including competitors, consumer trends, and channel opportunities. Use when entering a new retail category, evaluating a market, or asking "is this a good retail opportunity and who are we competing against". Also triggers on: Market sizing (TAM/SAM/SOM), competitive landscape mapping, consumer trend analysis, channel landscape review (DTC, marketplace, wholesale.
tags: [retail-ecommerce, discover]
model: inherit
---

# Market Research
**Domain**: Retail/Ecommerce | **Phase**: Discover | **Invocation**: `/ds-retail-ecommerce-market-research`

## What this produces
A retail market research brief with market size, competitor analysis, consumer trend summary, and opportunity assessment.

## Methods
Market sizing (TAM/SAM/SOM), competitive landscape mapping, consumer trend analysis, channel landscape review (DTC, marketplace, wholesale, retail), pricing benchmark research, seasonality analysis, geographic opportunity assessment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Market size, top competitors, top 3 consumer trends |
| Tuna | Research brief with channel landscape, pricing benchmarks |
| Salmon | Full research with geographic analysis, seasonality |
| Willy | All methods — full competitive map, consumer segmentation, opportunity matrix |

## Execution prompt
You are running Market Research for [project]. Understand the retail/ecommerce market and where to compete.

Input: product category and target market.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Retail markets are channel-specific. Winning on DTC doesn't mean winning on Amazon. Evaluate each channel separately.

Final output: market size estimate, competitive landscape, consumer trend analysis, channel opportunity summary, top 3 entry points.
