---
name: ds-ai-ml-prompt-engineering
description: Designs, tests, and optimizes prompts for LLM-based features and applications. Use when building on top of foundation models, improving output quality, or asking "how do we get the model to do what we need". Also triggers on: Task decomposition, system prompt design, few-shot example curation, chain-of-thought prompting, output format specification, temperature and parameter tuning.
tags: [ai-ml, develop]
model: inherit
---

# Prompt Engineering
**Domain**: AI/ML | **Phase**: Develop | **Invocation**: `/ds-ai-ml-prompt-engineering`

## What this produces
A prompt design specification with system prompt, few-shot examples, chain-of-thought strategy, output format, and evaluation test suite.

## Methods
Task decomposition, system prompt design, few-shot example curation, chain-of-thought prompting, output format specification, temperature and parameter tuning, adversarial testing, evaluation set design, prompt versioning

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | System prompt, 3 few-shot examples, output format |
| Tuna | Prompt spec with chain-of-thought, parameter recommendations |
| Salmon | Full spec with adversarial tests, evaluation set |
| Willy | All methods — prompt versioning, full eval suite, failure mode catalog |

## Execution prompt
You are running Prompt Engineering for [project]. Design and test prompts that reliably produce target outputs.

Input: task description, desired output examples, and known failure modes.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Test against failures, not just successes. A prompt is only as good as its worst-case output.

Final output: system prompt, few-shot examples, chain-of-thought instructions, output format spec, evaluation test cases (pass/fail criteria).
