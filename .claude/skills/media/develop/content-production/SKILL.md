---
name: ds-media-content-production
description: Plans and manages the production pipeline for media content at scale. Use when scaling content production, reducing backlog, or asking "how do we produce more without losing quality". Also triggers on: Production pipeline design, role and workflow definition, capacity planning, tooling and CMS selection, briefing template design, review and approval workflow.
tags: [media, develop]
model: inherit
---

# Content Production
**Domain**: Media | **Phase**: Develop | **Invocation**: `/ds-media-content-production`

## What this produces
A content production plan with pipeline design, team structure, workflow, tools selection, and capacity model.

## Methods
Production pipeline design, role and workflow definition, capacity planning, tooling and CMS selection, briefing template design, review and approval workflow, contributor network design, quality control design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Pipeline design, team structure, capacity estimate |
| Tuna | Production plan with workflow, tooling selection |
| Salmon | Full plan with contributor network, quality control |
| Willy | All methods — full pipeline spec, CMS requirements, team handbook |

## Execution prompt
You are running Content Production for [project]. Design the production system that delivers content reliably at scale.

Input: editorial strategy, format design, and team capacity.
FISH classification: [Nemo/Tuna/Salmon/Willy]

The bottleneck in most media operations is editorial review, not creation. Design the pipeline around where decisions slow things down.

Final output: pipeline design, role definitions, workflow, tooling recommendations, capacity model, quality control checkpoints.
