---
name: ds-opportunity-landscape
description: Maps and sizes the problem space — TAM/SAM/SOM, whitespace, early adopter profile — to identify which opportunities are worth pursuing. Use when evaluating markets, asking "is this worth building", sizing an opportunity, or prioritizing between multiple directions. Also triggers on: market sizing, TAM SAM SOM, whitespace analysis, market opportunity, where should we play, evaluate markets, early adopters, market research, opportunity assessment.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [product, discover, ds-core, market]
model: inherit
---

# DS Opportunity Landscape

Maps the problem space to determine which opportunities are real, which are sized, and which are worth pursuing.

**Produces:** Opportunity ranking with TAM/SAM/SOM estimates, whitespace analysis, early adopter profile, and go/no-go recommendation per opportunity.

---

## When to invoke

- **Evaluating a market.** Unsure whether the space is large enough or real enough to enter.
- **Prioritizing between opportunities.** Multiple directions on the table — need a ranked view.
- **Sizing before commitment.** Need market estimates before pitching to stakeholders or investors.
- **Finding whitespace.** Looking for gaps competitors haven't filled.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick sizing | Pain/gain mapping, early adopter profiling |
| Tuna | Standard assessment | TAM/SAM/SOM, whitespace analysis, early adopter profiling |
| Salmon | Full landscape | Market scan, JTBD segmentation, unmet needs scoring |
| Willy | Investment-grade | Full TAM model, adjacency mapping, technology readiness assessment |

---

## Instructions

1. **Classify** the assessment scope: Nemo / Tuna / Salmon / Willy
2. **State** which methods you're running and why
3. **For each method:** run the analysis, flag assumptions explicitly, size where relevant, rank findings by signal strength
4. **Synthesize** into a ranked opportunity view

**Final output:** top 3 opportunities ranked, each with size estimate, evidence, key assumptions, and a go/no-go recommendation.

---

## Methods library

TAM/SAM/SOM sizing, whitespace analysis, horizontal/vertical market scan, adjacent market mapping, pain/gain mapping, demand signal aggregation, early adopter profiling, Jobs-to-be-done market segmentation, unmet needs scoring, technology readiness assessment

---

## Error handling

| Condition | Resolution |
|---|---|
| No market data available | Use bottom-up sizing from first principles — flag it as an estimate |
| Market too broad to size | Segment first (geography, persona, use case) then size each segment |
| Multiple equally-ranked opportunities | Flag the tie — don't artificially pick one; surface the decision to the user |
