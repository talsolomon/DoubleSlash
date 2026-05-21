---
name: ds-ai-ml-data-landscape
description: Maps the data available for AI/ML training, evaluation, and inference. Use when starting an ML project, evaluating feasibility, or asking "do we have the data to build this model". Also triggers on: Dataset cataloging, data volume and diversity assessment, label availability review, data quality profiling, bias and distribution analysis, data access and licensing review.
tags: [ai-ml, discover]
model: inherit
---

# Data Landscape
**Domain**: AI/ML | **Phase**: Discover | **Invocation**: `/ds-ai-ml-data-landscape`

## What this produces
A data landscape report with available dataset inventory, quality and volume assessment, labeling requirements, and data readiness score per ML use case.

## Methods
Dataset cataloging, data volume and diversity assessment, label availability review, data quality profiling, bias and distribution analysis, data access and licensing review, synthetic data opportunity identification, data collection gap planning

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Dataset inventory, top 3 quality issues, readiness score |
| Tuna | Landscape with quality profiling, labeling requirements |
| Salmon | Full landscape with bias analysis, access review |
| Willy | All methods — synthetic data options, gap collection plan, full audit |

## Execution prompt
You are running Data Landscape for [project]. Assess whether the data exists to support the intended ML application.

Input: ML use case and current data environment.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Be honest about what's missing. An optimistic data assessment is the most common reason ML projects fail.

Final output: dataset inventory, quality scores, labeling gap analysis, data readiness score per use case, top 3 data risks.
