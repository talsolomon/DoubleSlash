---
name: ds-devops-infrastructure-dependency-mapping
description: Maps service, library, and external dependencies to surface hidden risks and failure chains. Use when planning a migration, investigating an outage, or asking "what breaks if this goes down". Also triggers on: Service dependency graphing, library and package dependency audit, external API dependency review, critical path identification, single point of failure analysis, blast radius calculation.
tags: [devops-infrastructure, discover]
model: inherit
---

# Dependency Mapping
**Domain**: DevOps/Infrastructure | **Phase**: Discover | **Invocation**: `/ds-devops-infrastructure-dependency-mapping`

## What this produces
A dependency map with service graph, critical path identification, external dependency risk assessment, and blast radius analysis.

## Methods
Service dependency graphing, library and package dependency audit, external API dependency review, critical path identification, single point of failure analysis, blast radius calculation, version and EOL risk flagging, circular dependency detection

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Service graph, critical paths, top 3 failure risks |
| Tuna | Dependency map with blast radius, external risks |
| Salmon | Full map with EOL risks, circular dependency detection |
| Willy | All methods — full blast radius analysis, mitigation plan per risk |

## Execution prompt
You are running Dependency Mapping for [project]. Document what depends on what and where the hidden failure risks are.

Input: service list or system description and available documentation.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Draw the dependency graph. Then ask: what fails when each node goes down? Where are the cascades?

Final output: service dependency graph, critical path list, top 5 failure risks with blast radius, external dependency risk summary.
