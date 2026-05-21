---
name: ds-analytics-data-discovery
description: Maps available data sources, quality, and gaps relative to business questions. Use when starting an analytics initiative, inheriting a data environment, or asking "what data do we actually have and can we trust it". Also triggers on: Data source cataloging, schema documentation, data quality assessment, completeness and freshness audit, lineage mapping, business question to data mapping.
tags: [analytics, discover]
model: inherit
---

# Data Discovery
**Domain**: Analytics | **Phase**: Discover | **Invocation**: `/ds-analytics-data-discovery`

## What this produces
A data inventory with source catalog, quality assessment, gap analysis, and readiness score per business question.

## Methods
Data source cataloging, schema documentation, data quality assessment, completeness and freshness audit, lineage mapping, business question to data mapping, gap identification, data trust scoring

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Source catalog, top 3 quality issues, gap summary |
| Tuna | Discovery with quality assessment, business question mapping |
| Salmon | Full discovery with lineage map, trust scores |
| Willy | All methods — full schema docs, completeness audit, readiness report |

## Execution prompt
You are running Data Discovery for [project]. Understand what data exists, its quality, and what questions it can answer.

Input: business questions to answer and available data environment description.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Map what exists to what's needed. Flag where data is missing, stale, unreliable, or siloed.

Final output: data source inventory, quality scores per source, gap list vs. business questions, top 3 data risks.
