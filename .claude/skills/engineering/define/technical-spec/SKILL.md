---
name: ds-engineering-technical-spec
description: Writes a technical specification for a feature or system — architecture decisions, data models, API contracts, edge cases. Use when handing off to engineers, starting a sprint, or asking "how do we build this". Also triggers on: Architecture decision records (ADRs), data model design, API contract specification, sequence diagram, state machine design, error handling matrix.
tags: [engineering, define]
model: inherit
---

# Technical Spec
**Domain**: Engineering | **Phase**: Define | **Invocation**: `/ds-engineering-technical-spec`

## What this produces
A complete technical specification ready for engineering handoff: architecture decisions, data models, API contracts, sequence diagrams, and acceptance criteria.

## Methods
Architecture decision records (ADRs), data model design, API contract specification, sequence diagram, state machine design, error handling matrix, edge case enumeration, performance requirements definition, scalability assumptions, security requirements, rollback strategy, monitoring and alerting spec

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | ADR (1 key decision), data model, API contract sketch |
| Tuna | ADRs, data model, API contract, error handling matrix |
| Salmon | Full spec with sequence diagrams, edge cases, performance requirements |
| Willy | All methods — state machines, security requirements, rollback strategy, monitoring spec |

## Execution prompt
You are running Technical Spec for [project]. Produce a complete specification that an engineer can implement from without ambiguity.

Input: feature requirements or PRD from Define phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

For each section, produce the artifact clearly labeled. Every decision must have a rationale. Every API endpoint must have request/response schema.

Final output: architecture decisions, data model, API contract, edge case list, acceptance criteria. No open questions.
