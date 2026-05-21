---
name: ds-analytics-dashboard-design
description: Designs analytics dashboards for specific audiences and decisions. Use when building a new reporting surface, redesigning a confusing dashboard, or asking "what should leadership actually see". Also triggers on: Audience and decision mapping, metric selection and prioritization, layout and hierarchy design, chart type selection, alert and threshold definition, drill-down path design.
tags: [analytics, develop]
model: inherit
---

# Dashboard Design
**Domain**: Analytics | **Phase**: Develop | **Invocation**: `/ds-analytics-dashboard-design`

## What this produces
A dashboard design specification with audience definition, metric selection, layout logic, and update cadence.

## Methods
Audience and decision mapping, metric selection and prioritization, layout and hierarchy design, chart type selection, alert and threshold definition, drill-down path design, refresh cadence planning, access and permission design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Audience, 5 key metrics, layout sketch |
| Tuna | Design spec with metric selection, chart types, cadence |
| Salmon | Full spec with drill-down paths, alert design |
| Willy | All methods — access model, full layout spec, test plan |

## Execution prompt
You are running Dashboard Design for [project]. Design a reporting surface that drives decisions.

Input: audience, decisions to support, and available metrics.
FISH classification: [Nemo/Tuna/Salmon/Willy]

A good dashboard answers specific questions. Design backward from the decision, not forward from available data.

Final output: audience definition, metric list with rationale, layout specification, chart type recommendations, refresh cadence, top 3 alerts to configure.
