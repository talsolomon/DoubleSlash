---
name: ds-devops-infrastructure-infrastructure-design
description: Designs the target-state infrastructure architecture for reliability, scalability, and security. Use when building new systems, planning major migrations, or asking "what should this infrastructure look like". Also triggers on: Architecture pattern selection, cloud provider and service selection, network topology design, availability and resilience design, security architecture, scaling strategy (horizontal/vertical/auto).
tags: [devops-infrastructure, define]
model: inherit
---

# Infrastructure Design
**Domain**: DevOps/Infrastructure | **Phase**: Define | **Invocation**: `/ds-devops-infrastructure-infrastructure-design`

## What this produces
An infrastructure design document with architecture diagram, technology choices, scaling strategy, resilience design, and cost model.

## Methods
Architecture pattern selection, cloud provider and service selection, network topology design, availability and resilience design, security architecture, scaling strategy (horizontal/vertical/auto), disaster recovery design, cost modeling

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Architecture overview, tech choices, scaling approach |
| Tuna | Design doc with resilience design, security architecture |
| Salmon | Full design with disaster recovery, cost model |
| Willy | All methods — full network topology, DR runbook, detailed cost model |

## Execution prompt
You are running Infrastructure Design for [project]. Define the target infrastructure architecture.

Input: requirements (scale, availability, security), constraints, and existing environment.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Design for the failure modes you know about, not just the happy path. Every availability claim needs a mechanism.

Final output: architecture overview, technology selection with rationale, resilience design, security layers, cost estimate, top 3 open decisions.
