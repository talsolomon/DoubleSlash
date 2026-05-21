---
name: ds-devops-infrastructure-incident-management
description: Designs or runs an incident management process from detection to post-mortem. Use when responding to an outage, building on-call culture, or asking "how do we handle incidents better". Also triggers on: Incident severity classification, response runbook design, on-call rotation design, communication template creation, escalation path definition, war room process.
tags: [devops-infrastructure, deliver]
model: inherit
---

# Incident Management
**Domain**: DevOps/Infrastructure | **Phase**: Deliver | **Invocation**: `/ds-devops-infrastructure-incident-management`

## What this produces
An incident management framework with severity tiers, response runbook, communication templates, escalation paths, and post-mortem process.

## Methods
Incident severity classification, response runbook design, on-call rotation design, communication template creation, escalation path definition, war room process, blameless post-mortem design, MTTD/MTTR metric tracking

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Severity tiers, response steps, escalation path |
| Tuna | Framework with communication templates, post-mortem design |
| Salmon | Full framework with on-call design, MTTD/MTTR tracking |
| Willy | All methods — full runbook library, blameless culture guide, metrics dashboard |

## Execution prompt
You are running Incident Management for [project]. Design or improve how incidents are detected, managed, and learned from.

Input: current incident history, team structure, and available tooling.
FISH classification: [Nemo/Tuna/Salmon/Willy]

The best incident management is boring: clear severity, clear steps, clear owner, and learning that prevents recurrence.

Final output: severity classification table, response runbook, communication templates, escalation path, post-mortem template, MTTD/MTTR baseline.
