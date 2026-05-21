---
name: ds-engineering-incident-retrospective
description: Runs a post-incident review and produces a blameless timeline, root cause analysis, and action items. Use after an outage, production issue, or data incident, or when asking "what happened and how do we prevent it". Also triggers on: Blameless post-mortem, 5 Whys root cause analysis, timeline reconstruction, contributing factor analysis, impact assessment, detection gap analysis.
tags: [engineering, deliver]
model: inherit
---

# Incident Retrospective
**Domain**: Engineering | **Phase**: Deliver | **Invocation**: `/ds-engineering-incident-retrospective`

## What this produces
A blameless post-incident report with timeline, root cause analysis, contributing factors, and concrete action items with owners and deadlines.

## Methods
Blameless post-mortem, 5 Whys root cause analysis, timeline reconstruction, contributing factor analysis, impact assessment, detection gap analysis, response effectiveness review, action item generation, monitoring improvement plan, runbook update

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Timeline reconstruction, 5 Whys, top 3 action items |
| Tuna | Post-mortem, root cause, impact assessment, action items |
| Salmon | Full post-mortem, detection gaps, response review, monitoring improvements |
| Willy | All methods — contributing factor analysis, runbook update, full prevention plan |

## Execution prompt
You are running an Incident Retrospective for [project]. Produce a blameless post-mortem that prevents recurrence.

Input: incident description, timeline of events, impact, and any known contributing factors.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Maintain blameless framing throughout — systems and processes, not people. Every root cause gets an action item.

Final output: incident summary, reconstruction timeline, root cause(s), action items (owner + deadline per item), monitoring/alerting improvements.
