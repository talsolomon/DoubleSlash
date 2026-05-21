---
name: ds-ai-ml-model-retrospective
description: Reviews an AI/ML system's performance, reliability, and business impact post-deployment. Use at model review cycles, after incidents, or asking "is the model still working and is it worth keeping". Also triggers on: Model performance review, drift and degradation analysis, business impact measurement, failure and incident review, data quality review, cost and latency assessment.
tags: [ai-ml, deliver]
model: inherit
---

# Model Retrospective
**Domain**: AI/ML | **Phase**: Deliver | **Invocation**: `/ds-ai-ml-model-retrospective`

## What this produces
A model retrospective report with performance metrics, drift analysis, business impact assessment, failure review, and retraining or deprecation recommendation.

## Methods
Model performance review, drift and degradation analysis, business impact measurement, failure and incident review, data quality review, cost and latency assessment, retraining decision framework, deprecation criteria evaluation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Performance snapshot, drift flags, retrain/keep/deprecate recommendation |
| Tuna | Retro with business impact, incident review |
| Salmon | Full retro with drift analysis, data quality review |
| Willy | All methods — cost/latency assessment, full failure log, forward plan |

## Execution prompt
You are running Model Retrospective for [project]. Assess whether the deployed model is still performing and worth maintaining.

Input: model performance logs, business impact data, and incident history.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: performance scorecard, drift/degradation summary, business impact assessment, top 3 issues, recommendation (retrain / maintain / deprecate) with rationale.
