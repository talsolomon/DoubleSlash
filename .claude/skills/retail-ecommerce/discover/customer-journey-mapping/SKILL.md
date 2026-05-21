---
name: ds-retail-ecommerce-customer-journey-mapping
description: Maps the end-to-end customer journey for a retail or ecommerce experience. Use when redesigning a store experience, improving conversion, or asking "what does the customer actually go through from awareness to repeat purchase". Also triggers on: Journey stage definition (awareness/consideration/purchase/fulfillment/return/repurchase), touchpoint mapping, channel and device mapping, emotional state charting, friction point identification, drop-off analysis.
tags: [retail-ecommerce, discover]
model: inherit
---

# Customer Journey Mapping
**Domain**: Retail/Ecommerce | **Phase**: Discover | **Invocation**: `/ds-retail-ecommerce-customer-journey-mapping`

## What this produces
A customer journey map with touchpoints, emotional states, friction points, and conversion opportunity analysis.

## Methods
Journey stage definition (awareness/consideration/purchase/fulfillment/return/repurchase), touchpoint mapping, channel and device mapping, emotional state charting, friction point identification, drop-off analysis, loyalty driver identification, moment-of-truth flagging

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Journey stages, top 5 friction points, conversion opportunities |
| Tuna | Journey map with emotional states, drop-off analysis |
| Salmon | Full map with channel/device overlay, loyalty drivers |
| Willy | All methods — moments-of-truth, full friction catalog, redesign opportunities |

## Execution prompt
You are running Customer Journey Mapping for [project]. Map what the customer experiences and where the experience breaks down.

Input: customer segments, channels, and available analytics or research.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Map what customers actually do, not what the internal process flow says they should do. Friction hides in the gap between the two.

Final output: journey map, touchpoint inventory, top 5 friction points, top 3 conversion opportunities, moments-of-truth.
