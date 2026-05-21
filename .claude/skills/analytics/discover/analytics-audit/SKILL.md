---
name: ds-analytics-analytics-audit
description: Audits the current analytics setup for tracking gaps, metric inconsistencies, and tooling debt. Use when data doesn't match intuition, before a re-instrumentation, or asking "can we trust our numbers". Also triggers on: Event tracking coverage review, metric definition audit, funnel integrity check, tool stack inventory, data pipeline review, discrepancy investigation.
tags: [analytics, discover]
model: inherit
---

# Analytics Audit
**Domain**: Analytics | **Phase**: Discover | **Invocation**: `/ds-analytics-analytics-audit`

## What this produces
An analytics audit report with tracking coverage map, metric definition inconsistencies, tooling gaps, and trust assessment.

## Methods
Event tracking coverage review, metric definition audit, funnel integrity check, tool stack inventory, data pipeline review, discrepancy investigation, tagging and taxonomy review, reporting accuracy check

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 5 tracking gaps, metric definition issues, trust score |
| Tuna | Audit with funnel integrity, tool stack review |
| Salmon | Full audit with pipeline review, discrepancy investigation |
| Willy | All methods — taxonomy review, full accuracy audit, remediation plan |

## Execution prompt
You are running Analytics Audit for [project]. Determine whether the current analytics setup can be trusted.

Input: current tracking setup, metrics relied upon, and known data issues.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Be skeptical. Every assumed metric should be verified against its definition, collection method, and known edge cases.

Final output: tracking coverage assessment, metric trust scores, top 5 issues with severity, remediation priority list.
