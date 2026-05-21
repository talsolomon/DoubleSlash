---
name: ds-fintech-product-compliance
description: Defines compliance requirements that must be built into the fintech product. Use when specifying a regulated financial product, preparing for audit, or asking "what compliance features must this product have". Also triggers on: Regulatory requirement translation, KYC/AML requirement specification, data privacy mapping, audit trail design, reporting requirement identification, consent and disclosure design.
tags: [fintech, define]
model: inherit
---

# Product Compliance
**Domain**: Fintech | **Phase**: Define | **Invocation**: `/ds-fintech-product-compliance`

## What this produces
A product compliance specification with mandatory requirements, feature implications, data handling rules, and audit trail design.

## Methods
Regulatory requirement translation, KYC/AML requirement specification, data privacy mapping, audit trail design, reporting requirement identification, consent and disclosure design, security control specification, compliance testing plan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top compliance requirements, KYC/AML needs, data rules |
| Tuna | Compliance spec with audit trail, reporting requirements |
| Salmon | Full spec with security controls, consent design |
| Willy | All methods — testing plan, full compliance matrix, legal review checklist |

## Execution prompt
You are running Product Compliance for [project]. Translate regulatory requirements into product features and constraints.

Input: regulatory landscape assessment and product design.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Compliance is not a feature you add at the end — it changes the product architecture. Define it before building starts.

Final output: compliance requirement list with product implications, KYC/AML feature spec, audit trail requirements, data handling rules, top 5 compliance risks.
