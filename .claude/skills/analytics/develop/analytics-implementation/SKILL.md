---
name: ds-analytics-analytics-implementation
description: Plans the technical implementation of analytics tracking and pipelines. Use when instrumenting a product, building a data pipeline, or asking "how do we actually get the data we need". Also triggers on: Event taxonomy design, tracking specification writing, SDK and tool selection, pipeline architecture design, data warehouse schema design, QA and validation framework.
tags: [analytics, develop]
model: inherit
---

# Analytics Implementation
**Domain**: Analytics | **Phase**: Develop | **Invocation**: `/ds-analytics-analytics-implementation`

## What this produces
An analytics implementation plan with event taxonomy, tracking spec, pipeline architecture, and QA approach.

## Methods
Event taxonomy design, tracking specification writing, SDK and tool selection, pipeline architecture design, data warehouse schema design, QA and validation framework, implementation sequencing, documentation standards

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Event taxonomy, top 10 tracking specs, tool selection |
| Tuna | Implementation plan with tracking spec, pipeline design |
| Salmon | Full plan with schema design, QA framework |
| Willy | All methods — documentation standards, full implementation sequence |

## Execution prompt
You are running Analytics Implementation for [project]. Translate the measurement framework into a technical tracking plan.

Input: measurement framework, product/system description, and tech stack.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Every tracked event must have a clear purpose. Don't instrument for "maybe useful later" — instrument for the decisions defined in the framework.

Final output: event taxonomy, tracking spec (event name, properties, triggers, expected volume), pipeline architecture, QA checklist.
