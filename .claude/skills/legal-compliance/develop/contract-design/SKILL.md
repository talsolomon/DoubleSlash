---
name: ds-legal-compliance-contract-design
description: Designs contract structure, terms, and negotiation strategy for business agreements. Use when creating a new contract type, entering major negotiations, or asking "what should this agreement actually say". Also triggers on: Contract structure design, key provision identification, liability and indemnification design, IP ownership clause design, termination and dispute resolution design, negotiation redline strategy.
tags: [legal-compliance, develop]
model: inherit
---

# Contract Design
**Domain**: Legal/Compliance | **Phase**: Develop | **Invocation**: `/ds-legal-compliance-contract-design`

## What this produces
A contract design brief with term structure, key provisions, negotiation redlines, and must-have/nice-to-have classification.

## Methods
Contract structure design, key provision identification, liability and indemnification design, IP ownership clause design, termination and dispute resolution design, negotiation redline strategy, must-have classification, standard vs. custom term identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Contract structure, top 5 provisions, must-haves |
| Tuna | Design brief with liability, IP, termination clauses |
| Salmon | Full brief with negotiation redlines, dispute resolution |
| Willy | All methods — standard form design, full negotiation playbook |

## Execution prompt
You are running Contract Design for [project]. Design the contract that protects the organization's interests.

Input: business relationship being formalized and key risks to protect against.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Know which terms are negotiable and which are not before entering any negotiation. Surprise concessions are how bad contracts happen.

Final output: contract structure, key provisions with rationale, must-have vs. nice-to-have classification, negotiation redlines, deal-breaker list.
