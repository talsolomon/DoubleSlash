---
name: ds-legal-compliance-compliance-audit
description: Audits the organization's compliance program against regulatory requirements. Use before a regulatory examination, after a period of rapid growth, or asking "would we pass an audit today". Also triggers on: Control effectiveness testing, regulatory requirement mapping, evidence collection planning, gap analysis, severity scoring, audit trail review.
tags: [legal-compliance, deliver]
model: inherit
---

# Compliance Audit
**Domain**: Legal/Compliance | **Phase**: Deliver | **Invocation**: `/ds-legal-compliance-compliance-audit`

## What this produces
A compliance audit report with control effectiveness scores, gaps, evidence inventory, and remediation plan.

## Methods
Control effectiveness testing, regulatory requirement mapping, evidence collection planning, gap analysis, severity scoring, audit trail review, third-party and vendor compliance check, remediation prioritization

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Control scores, top 5 gaps, priority remediations |
| Tuna | Audit with evidence inventory, vendor check |
| Salmon | Full audit with third-party review, audit trail |
| Willy | All methods — audit-ready report, full gap matrix, remediation roadmap |

## Execution prompt
You are running Compliance Audit for [project]. Test whether compliance controls work in practice, not just on paper.

Input: compliance framework, current evidence, and recent regulatory activity.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Test the controls, not the documentation. Ask whether each control would actually prevent or detect the violation it's designed to address.

Final output: control effectiveness scores, gap list with severity, evidence inventory, remediation plan with owners and deadlines, audit readiness rating.
