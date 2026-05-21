---
name: ds-strategy-strategy-execution
description: Plans strategy execution — owners, cadence, decision rights, and reporting. Use when moving from strategy approval to implementation, or asking "how do we make sure this actually happens". Also triggers on: Owner and RACI assignment, governance cadence design, decision rights framework, progress reporting design, initiative tracking system, blocker escalation process.
tags: [strategy, deliver]
model: inherit
---

# Strategy Execution
**Domain**: Strategy | **Phase**: Deliver | **Invocation**: `/ds-strategy-strategy-execution`

## What this produces
A strategy execution plan with owner map, governance cadence, decision rights, and progress reporting framework.

## Methods
Owner and RACI assignment, governance cadence design, decision rights framework, progress reporting design, initiative tracking system, blocker escalation process, alignment mechanism design, communication plan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Owner assignments, monthly review cadence, top 3 risks |
| Tuna | Execution plan with RACI, governance cadence, reporting |
| Salmon | Full plan with decision rights, escalation process |
| Willy | All methods — communication plan, full governance framework |

## Execution prompt
You are running Strategy Execution for [project]. Design the system that turns strategic intent into results.

Input: strategic roadmap and organizational context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: owner map per initiative, governance cadence (meeting × purpose × frequency), decision rights framework, progress reporting template.
