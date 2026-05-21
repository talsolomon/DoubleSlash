---
name: ds-ai-ml-ml-problem-framing
description: Translates a business problem into a precise ML problem formulation. Use when scoping an ML project, before selecting a model approach, or asking "what exactly is the machine learning task here". Also triggers on: Business-to-ML problem translation, task type classification (classification/regression/clustering/generation), input-output specification, success metric definition, baseline definition, constraint identification (latency.
tags: [ai-ml, define]
model: inherit
---

# ML Problem Framing
**Domain**: AI/ML | **Phase**: Define | **Invocation**: `/ds-ai-ml-ml-problem-framing`

## What this produces
An ML problem statement with task type, input/output specification, success criteria, constraints, and evaluation framework.

## Methods
Business-to-ML problem translation, task type classification (classification/regression/clustering/generation), input-output specification, success metric definition, baseline definition, constraint identification (latency, accuracy, explainability), failure mode analysis, evaluation framework design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Task type, input/output spec, success metric |
| Tuna | Problem statement with baseline, constraints, evaluation |
| Salmon | Full framing with failure modes, evaluation framework |
| Willy | All methods — edge case catalog, fairness criteria, full spec |

## Execution prompt
You are running ML Problem Framing for [project]. Convert a business objective into a precise ML task specification.

Input: business goal, available data description, and known constraints.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Precision matters: vague problem framing produces vague models. Define exactly what the model predicts, from what inputs, with what acceptable error rate.

Final output: ML task type, input/output specification, success criteria (with thresholds), baseline to beat, top 3 constraints, evaluation approach.
