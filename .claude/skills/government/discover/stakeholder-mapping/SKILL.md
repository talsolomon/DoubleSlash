---
name: ds-government-stakeholder-mapping
description: Maps stakeholders affected by or influential in a policy or government initiative. Use when designing consultation, managing political risk, or asking "who cares about this and how much power do they have". Also triggers on: Stakeholder identification, influence-interest matrix, position and sentiment assessment, coalition analysis, opposition risk mapping, consultation obligation review.
tags: [government, discover]
model: inherit
---

# Stakeholder Mapping
**Domain**: Government | **Phase**: Discover | **Invocation**: `/ds-government-stakeholder-mapping`

## What this produces
A stakeholder map with influence-interest matrix, position assessment, engagement strategy, and coalition opportunity analysis.

## Methods
Stakeholder identification, influence-interest matrix, position and sentiment assessment, coalition analysis, opposition risk mapping, consultation obligation review, media and advocacy landscape, engagement strategy design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Stakeholder list, influence-interest matrix, top 5 risks |
| Tuna | Map with position assessment, coalition analysis |
| Salmon | Full map with opposition risks, consultation obligations |
| Willy | All methods — advocacy landscape, engagement strategy, coalition playbook |

## Execution prompt
You are running Stakeholder Mapping for [project]. Understand who will shape and be shaped by this policy.

Input: policy scope and known stakeholder groups.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Power matters more than number. A small, organized, high-influence stakeholder can stop policy that 80% of the public supports.

Final output: stakeholder inventory, influence-interest matrix, position map, top 5 political risks, engagement strategy recommendations.
