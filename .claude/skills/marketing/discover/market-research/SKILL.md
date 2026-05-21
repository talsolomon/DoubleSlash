---
name: ds-marketing-market-research
description: Researches market size, trends, competitors, and customer segments. Use when entering a new market, validating a product idea, or asking "is there a market for this" and "who else is doing it". Also triggers on: TAM/SAM/SOM sizing, competitor analysis, market trend analysis, customer segment identification, search volume analysis, social listening.
tags: [marketing, discover]
model: inherit
---

# Market Research
**Domain**: Marketing | **Phase**: Discover | **Invocation**: `/ds-marketing-market-research`

## What this produces
A market research report with TAM/SAM/SOM, key trends, competitive landscape, and top customer segments.

## Methods
TAM/SAM/SOM sizing, competitor analysis, market trend analysis, customer segment identification, search volume analysis, social listening, industry report synthesis, analyst coverage review, job posting analysis (demand signal), pricing benchmarking

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Market sizing (rough), top 3 competitors, 2 customer segments |
| Tuna | TAM/SAM/SOM, competitor analysis, trend analysis |
| Salmon | Full research: sizing, competitors, segments, pricing benchmarks |
| Willy | All methods — social listening, analyst synthesis, job posting signals |

## Execution prompt
You are running Market Research for [project]. Produce a market picture that informs positioning and go-to-market decisions.

Input: the product or market being researched.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: market size estimate (TAM/SAM/SOM), top 5 competitors with one-line positioning each, 3 key trends, top 2 customer segments with pain points.
