---
name: ds-product-opportunity-landscape
description: Maps and sizes the problem space — TAM/SAM/SOM, whitespace, early adopter profile. Use when evaluating which market to enter, asking "is this worth building", or prioritizing between opportunities. Also triggers on: TAM/SAM/SOM sizing, whitespace analysis, horizontal/vertical market scan, adjacent market mapping, pain/gain mapping, demand signal aggregation.
tags: [product, discover]
model: inherit
---

# Opportunity Landscape
**Domain**: Product | **Phase**: Discover | **Invocation**: `/ds-product-opportunity-landscape`

## What this produces
A map of the problem space — which opportunities are real, which are sized, which are worth pursuing. Output: opportunity ranking with TAM/SAM/SOM, whitespace analysis, and early adopter profile.

## Methods
TAM/SAM/SOM sizing, whitespace analysis, horizontal/vertical market scan, adjacent market mapping, pain/gain mapping, demand signal aggregation, early adopter profiling, Jobs-to-be-done market segmentation, unmet needs scoring, technology readiness assessment

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Pain/gain mapping, early adopter profiling |
| Tuna | TAM/SAM/SOM, whitespace analysis, early adopter profiling |
| Salmon | Full market scan + JTBD segmentation + unmet needs scoring |
| Willy | All methods — full TAM model, adjacency mapping, technology readiness |

## Execution prompt
You are running the Opportunity Landscape skill for [project]. Map the space of problems worth solving.

FISH classification: [Nemo/Tuna/Salmon/Willy]

For each method at this FISH level:
1. Run the analysis with available information (flag assumptions explicitly)
2. Size the opportunity where relevant
3. Rank findings by signal strength

Final output: top 3 opportunities ranked, each with size estimate, evidence, and a go/no-go recommendation.
