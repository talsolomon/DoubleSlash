---
name: ds-ai-ml-model-design
description: Designs the model architecture, training approach, and evaluation methodology for an ML system. Use when selecting a modeling strategy, planning experiments, or asking "how should we build this model". Also triggers on: Architecture selection and comparison, pre-trained model evaluation, fine-tuning vs. training-from-scratch analysis, hyperparameter strategy, experiment design, evaluation methodology.
tags: [ai-ml, develop]
model: inherit
---

# Model Design
**Domain**: AI/ML | **Phase**: Develop | **Invocation**: `/ds-ai-ml-model-design`

## What this produces
A model design specification with architecture options, training approach, experiment plan, evaluation methodology, and infrastructure requirements.

## Methods
Architecture selection and comparison, pre-trained model evaluation, fine-tuning vs. training-from-scratch analysis, hyperparameter strategy, experiment design, evaluation methodology, infrastructure sizing, MLOps pipeline design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Architecture recommendation, training approach, evaluation method |
| Tuna | Design spec with experiment plan, infrastructure needs |
| Salmon | Full spec with architecture comparison, MLOps design |
| Willy | All methods — full experiment matrix, infrastructure sizing, serving design |

## Execution prompt
You are running Model Design for [project]. Specify how the ML model should be built and evaluated.

Input: ML problem framing and data requirements specification.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Default to the simplest approach that meets the success criteria. Complexity in ML systems compounds — justify every layer of it.

Final output: architecture recommendation with alternatives considered, training approach, experiment plan, evaluation methodology, infrastructure requirements.
