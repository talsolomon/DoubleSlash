---
name: ds-engineering-architecture-design
description: Designs system architecture — components, data flow, service boundaries, and infrastructure. Use when building a new system, planning a major refactor, or asking "how should this be structured". Also triggers on: Component diagram, data flow design, service boundary definition, microservices vs monolith decision, event-driven architecture design, CQRS pattern.
tags: [engineering, develop]
model: inherit
---

# Architecture Design
**Domain**: Engineering | **Phase**: Develop | **Invocation**: `/ds-engineering-architecture-design`

## What this produces
A system architecture document with component diagram, data flow, service boundaries, infrastructure design, and trade-off analysis.

## Methods
Component diagram, data flow design, service boundary definition, microservices vs monolith decision, event-driven architecture design, CQRS pattern, database architecture, caching strategy, infrastructure design, fault tolerance design, scalability planning, cost modeling

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Component diagram, service boundaries, database choice |
| Tuna | Component diagram, data flow, caching strategy, infrastructure sketch |
| Salmon | Full architecture with fault tolerance, scalability planning, cost model |
| Willy | All methods — event-driven patterns, CQRS, full infrastructure design, cost modeling |

## Execution prompt
You are running Architecture Design for [project]. Design the system structure before any code is written.

Input: technical spec or feature requirements from Define phase.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Work top-down: system boundaries → components → data flow → infrastructure → failure modes.

Final output: component diagram (described in text), data flow narrative, service boundary decisions with rationale, infrastructure design, top 3 architectural risks.
