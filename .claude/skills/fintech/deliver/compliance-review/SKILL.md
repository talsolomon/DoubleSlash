---
name: ds-fintech-compliance-review
description: Reviews a fintech product or period for regulatory compliance gaps and remediation needs. Use at regulatory review cycles, before audits, or asking "are we still compliant and what needs to change". Also triggers on: Regulatory requirement re-mapping, KYC/AML effectiveness review, audit trail completeness check, reporting obligation review, data privacy compliance check, vendor compliance verification.
tags: [fintech, deliver]
model: inherit
---

# Compliance Review
**Domain**: Fintech | **Phase**: Deliver | **Invocation**: `/ds-fintech-compliance-review`

## What this produces
A compliance review report with regulatory adherence scores, gap findings, remediation plan, and audit readiness assessment.

## Methods
Regulatory requirement re-mapping, KYC/AML effectiveness review, audit trail completeness check, reporting obligation review, data privacy compliance check, vendor compliance verification, incident and breach review, remediation prioritization

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Compliance score, top 3 gaps, priority remediations |
| Tuna | Review with audit trail check, reporting obligations |
| Salmon | Full review with vendor compliance, data privacy check |
| Willy | All methods — audit-ready report, full gap matrix, remediation roadmap |

## Execution prompt
You are running Compliance Review for [project]. Assess current regulatory compliance and identify gaps before they become enforcement actions.

Input: current compliance documentation, product changes since last review, and regulatory updates.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: compliance scorecard per regulatory area, gap list with severity, remediation plan with owners and dates, audit readiness assessment.
