---
name: ds-retail-ecommerce-pricing-framework
description: Designs the pricing strategy and framework for a retail or ecommerce business. Use when setting prices for a new product range, reviewing pricing strategy, or asking "how should we price and are we leaving money on the table". Also triggers on: Price positioning strategy (value/mid/premium), competitive price benchmarking, price elasticity analysis, tiered pricing design, promotional discount rules, bundling and upsell pricing.
tags: [retail-ecommerce, define]
model: inherit
---

# Pricing Framework
**Domain**: Retail/Ecommerce | **Phase**: Define | **Invocation**: `/ds-retail-ecommerce-pricing-framework`

## What this produces
A pricing framework with price architecture, positioning strategy, promotional pricing rules, and margin model.

## Methods
Price positioning strategy (value/mid/premium), competitive price benchmarking, price elasticity analysis, tiered pricing design, promotional discount rules, bundling and upsell pricing, MAP policy design, margin modeling

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Price positioning, benchmarks, margin model |
| Tuna | Framework with promotional rules, tier design |
| Salmon | Full framework with elasticity analysis, bundling |
| Willy | All methods — MAP policy, full margin model, competitor price monitoring |

## Execution prompt
You are running Pricing Framework for [project]. Design the pricing strategy that maximizes revenue and margin.

Input: cost structure, competitive benchmarks, and target customer segments.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Pricing is the fastest lever on margin. Get it right at the start — repricing is harder than launching correctly.

Final output: price architecture, positioning rationale, promotional pricing rules, bundling strategy, margin model, MAP policy.
