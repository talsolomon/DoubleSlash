---
name: ds-government-regulatory-design
description: Designs regulations, rules, and compliance mechanisms to achieve a policy objective. Use when drafting regulations, reviewing a regulatory approach, or asking "what rules do we need and how should they work". Also triggers on: Regulatory instrument selection, rule drafting principles, compliance cost estimation, enforcement mechanism design, regulatory impact assessment, sunset and review clause design.
tags: [government, define]
model: inherit
---

# Regulatory Design
**Domain**: Government | **Phase**: Define | **Invocation**: `/ds-government-regulatory-design`

## What this produces
A regulatory design specification with rule structure, compliance mechanism, enforcement approach, and regulatory impact assessment.

## Methods
Regulatory instrument selection, rule drafting principles, compliance cost estimation, enforcement mechanism design, regulatory impact assessment, sunset and review clause design, appeals and exceptions process, industry consultation design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Rule structure, compliance mechanism, enforcement approach |
| Tuna | Design spec with compliance costs, regulatory impact |
| Salmon | Full spec with sunset clauses, appeals process |
| Willy | All methods — full regulatory impact assessment, industry consultation |

## Execution prompt
You are running Regulatory Design for [project]. Design the regulatory mechanism that achieves the policy objective.

Input: policy framework and legal authority.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Regulations that are too complex to comply with produce non-compliance. Design for the average regulated party, not the ideal one.

Final output: regulatory structure, compliance requirements, enforcement mechanism, regulatory impact summary, sunset and review provisions.
