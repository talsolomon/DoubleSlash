---
name: ds-devops-infrastructure-infrastructure-audit
description: Audits existing infrastructure for reliability, security, cost, and scalability risks. Use when inheriting a system, preparing for scale, or asking "what's actually running and how healthy is it". Also triggers on: Infrastructure inventory mapping, service dependency cataloging, reliability and uptime review, security posture assessment, cost analysis, performance bottleneck identification.
tags: [devops-infrastructure, discover]
model: inherit
---

# Infrastructure Audit
**Domain**: DevOps/Infrastructure | **Phase**: Discover | **Invocation**: `/ds-devops-infrastructure-infrastructure-audit`

## What this produces
An infrastructure audit report with inventory, health scores, cost analysis, security findings, and prioritized risk list.

## Methods
Infrastructure inventory mapping, service dependency cataloging, reliability and uptime review, security posture assessment, cost analysis, performance bottleneck identification, tech debt cataloging, compliance gap review

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Inventory, top 5 risks, cost snapshot |
| Tuna | Audit with health scores, security findings, cost analysis |
| Salmon | Full audit with bottleneck analysis, tech debt catalog |
| Willy | All methods — compliance review, full risk matrix, remediation plan |

## Execution prompt
You are running Infrastructure Audit for [project]. Assess the health, cost, and risk profile of the current infrastructure.

Input: infrastructure description, known issues, and scale targets.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Flag hidden risks: services with no monitoring, single points of failure, unpatched dependencies, and costs with no owner.

Final output: infrastructure inventory, health scores per service, top 5 risks with severity, cost breakdown, security findings summary.
