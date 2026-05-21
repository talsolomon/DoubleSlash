---
name: ds-manufacturing-supply-chain-research
description: Maps the supply chain landscape for sourcing, production, and logistics options. Use when evaluating manufacturing partners, entering physical goods production, or asking "who makes this and where". Also triggers on: Supplier landscape mapping, geographic sourcing analysis, cost benchmarking, lead time research, supplier certification review, geopolitical and trade risk assessment.
tags: [manufacturing, discover]
model: inherit
---

# Supply Chain Research
**Domain**: Manufacturing | **Phase**: Discover | **Invocation**: `/ds-manufacturing-supply-chain-research`

## What this produces
A supply chain research brief with supplier landscape, cost benchmarks, lead times, risk profile, and sourcing recommendations.

## Methods
Supplier landscape mapping, geographic sourcing analysis, cost benchmarking, lead time research, supplier certification review, geopolitical and trade risk assessment, nearshoring vs. offshoring analysis, MOQ and capacity benchmarking

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Supplier landscape, cost benchmarks, top 3 risks |
| Tuna | Research with lead times, certification requirements |
| Salmon | Full research with geopolitical risk, nearshoring analysis |
| Willy | All methods — full supplier map, cost model, risk mitigation options |

## Execution prompt
You are running Supply Chain Research for [project]. Map the supply chain options for producing this product.

Input: product description, volume targets, and quality requirements.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Supply chains optimize for cost, speed, or resilience — but not all three. Know which matters most before evaluating options.

Final output: supplier landscape, cost and lead time benchmarks, geographic risk profile, sourcing recommendation with trade-offs.
