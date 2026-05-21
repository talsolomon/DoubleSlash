---
name: ds-operations-process-design
description: Designs new or improved operational processes with clear steps, owners, and decision points. Use when redesigning a broken process, building a new function, or asking "what should this look like end to end". Also triggers on: To-be process mapping, swim lane design, RACI assignment, decision tree design, handoff specification, exception handling design.
tags: [operations, define]
model: inherit
---

# Process Design
**Domain**: Operations | **Phase**: Define | **Invocation**: `/ds-operations-process-design`

## What this produces
A to-be process design with flow maps, RACI assignments, decision logic, and handoff specifications.

## Methods
To-be process mapping, swim lane design, RACI assignment, decision tree design, handoff specification, exception handling design, automation opportunity identification, process KPI definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | To-be flow map, owner per step, 3 decision points |
| Tuna | Process design with RACI, decision logic, handoffs |
| Salmon | Full design with exception handling, automation opportunities |
| Willy | All methods — process KPIs, full RACI matrix, edge case design |

## Execution prompt
You are running Process Design for [project]. Design the target-state process that solves identified gaps.

Input: audit findings or process scope, stakeholders, and constraints.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Design for clarity: every step has an owner, every decision has defined logic, every handoff has a specification.

Final output: to-be process flow, RACI table, decision points with logic, handoff specs, top 3 automation opportunities.
