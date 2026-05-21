---
name: ds-operations-process-audit
description: Audits existing operational processes for inefficiency, gaps, and redundancy. Use when operations feel broken, before a redesign, or asking "what's actually happening vs what should be happening". Also triggers on: Process mapping (as-is), swim lane analysis, value stream mapping, cycle time measurement, waste identification (TIMWOOD), bottleneck analysis.
tags: [operations, discover]
model: inherit
---

# Process Audit
**Domain**: Operations | **Phase**: Discover | **Invocation**: `/ds-operations-process-audit`

## What this produces
A process audit report with current-state maps, waste analysis, gap inventory, and prioritized improvement opportunities.

## Methods
Process mapping (as-is), swim lane analysis, value stream mapping, cycle time measurement, waste identification (TIMWOOD), bottleneck analysis, exception and workaround cataloging, stakeholder pain point interviews

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | As-is map of top 2 processes, top 3 pain points |
| Tuna | Process maps with cycle times, waste identification |
| Salmon | Full audit with value stream map, bottleneck analysis |
| Willy | All methods — exception catalog, stakeholder interviews, full waste inventory |

## Execution prompt
You are running Process Audit for [project]. Document and evaluate existing operational processes.

Input: process scope, available documentation, and stakeholder input.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Map each process step by step. Identify where time is lost, decisions stall, or errors occur. Distinguish between official process and actual practice.

Final output: as-is process maps, cycle time per process, top 5 waste/gap findings, prioritized improvement opportunities.
