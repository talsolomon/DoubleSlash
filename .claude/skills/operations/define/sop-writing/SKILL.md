---
name: ds-operations-sop-writing
description: Writes Standard Operating Procedures from process designs or tribal knowledge. Use when formalizing how things get done, onboarding new team members, or asking "how do we make this repeatable". Also triggers on: Process step decomposition, role and responsibility documentation, decision criteria writing, template and checklist design, quality checkpoint definition, version control setup.
tags: [operations, define]
model: inherit
---

# SOP Writing
**Domain**: Operations | **Phase**: Define | **Invocation**: `/ds-operations-sop-writing`

## What this produces
A standard operating procedure document with purpose, scope, step-by-step instructions, roles, and quality checkpoints.

## Methods
Process step decomposition, role and responsibility documentation, decision criteria writing, template and checklist design, quality checkpoint definition, version control setup, review and approval workflow, training guide creation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Step-by-step instructions, roles, top 3 checkpoints |
| Tuna | Full SOP with decision criteria, checklists |
| Salmon | SOP with training guide, version control, review workflow |
| Willy | All methods — template library, full approval workflow, edge cases |

## Execution prompt
You are running SOP Writing for [project]. Convert process design into an executable standard operating procedure.

Input: process design or description, roles involved, and compliance requirements.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Write for the person doing the work, not the person who designed it. Every step must be actionable. Every decision point must have clear criteria.

Final output: SOP document (purpose, scope, roles, step-by-step, checkpoints), checklist version, review cadence.
