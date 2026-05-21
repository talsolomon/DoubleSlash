---
name: ds-ai-ml-data-requirements
description: Specifies the data needed to train, validate, and run an ML model. Use when planning ML infrastructure, scoping data collection, or asking "exactly what data does this model need". Also triggers on: Feature engineering specification, training/validation/test split design, labeling schema design, data volume estimation, collection methodology selection, annotation guidelines writing.
tags: [ai-ml, define]
model: inherit
---

# Data Requirements
**Domain**: AI/ML | **Phase**: Define | **Invocation**: `/ds-ai-ml-data-requirements`

## What this produces
A data requirements specification with feature list, volume targets, labeling schema, collection plan, and governance requirements.

## Methods
Feature engineering specification, training/validation/test split design, labeling schema design, data volume estimation, collection methodology selection, annotation guidelines writing, data governance and privacy review, data pipeline requirements

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Feature list, volume target, labeling schema |
| Tuna | Requirements with split design, collection plan |
| Salmon | Full spec with annotation guidelines, governance review |
| Willy | All methods — pipeline requirements, privacy review, full schema |

## Execution prompt
You are running Data Requirements for [project]. Specify exactly what data the ML system needs to work.

Input: ML problem framing and data landscape assessment.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Be specific about quantity, quality, and provenance. "More data" is not a spec.

Final output: feature specification, volume and diversity targets, labeling schema, collection/annotation plan, data governance requirements.
