---
name: ds-engineering-system-audit
description: Audits an existing system for technical debt, gaps, dependencies, and risk. Use when assessing a legacy codebase, planning a refactor, onboarding to a new system, or asking "what's the state of the code". Also triggers on: Codebase analysis, dependency mapping, test coverage assessment, cyclomatic complexity review, dead code identification, security vulnerability scan.
tags: [engineering, discover]
model: inherit
---

# System Audit
**Domain**: Engineering | **Phase**: Discover | **Invocation**: `/ds-engineering-system-audit`

## What this produces
A system health report with debt inventory, risk areas, dependency map, and prioritized remediation recommendations.

## Methods
Codebase analysis, dependency mapping, test coverage assessment, cyclomatic complexity review, dead code identification, security vulnerability scan, performance profiling, API contract review, data model audit, logging and observability audit, documentation gap analysis, incident history review

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Dependency mapping, test coverage, top 3 risk areas |
| Tuna | Codebase analysis, dependency mapping, security scan, documentation gaps |
| Salmon | Full debt inventory, performance profiling, observability audit, API review |
| Willy | All methods — incident history, data model audit, full remediation plan |

## Execution prompt
You are running a System Audit for [project]. Assess the current state of the codebase and surface risks before planning any new work.

Input: codebase description, known problem areas, or areas of concern.
FISH classification: [Nemo/Tuna/Salmon/Willy]

For each method:
1. Assess the area and identify specific issues
2. Score severity: Critical / High / Medium / Low
3. Estimate remediation effort

Final output: debt inventory by severity, dependency risk map, top 5 remediation priorities with effort estimates.
