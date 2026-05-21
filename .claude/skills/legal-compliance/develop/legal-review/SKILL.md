---
name: ds-legal-compliance-legal-review
description: Reviews a product, process, or document for legal issues before launch or execution. Use when preparing for a launch, reviewing a contract, or asking "is there anything in here that will get us in trouble". Also triggers on: Document or product review against applicable law, IP clearance check, liability exposure analysis, disclosure and consent review, contractual risk identification, prohibited conduct screening.
tags: [legal-compliance, develop]
model: inherit
---

# Legal Review
**Domain**: Legal/Compliance | **Phase**: Develop | **Invocation**: `/ds-legal-compliance-legal-review`

## What this produces
A legal review report with findings, risk severity ratings, required changes, and counsel referral items.

## Methods
Document or product review against applicable law, IP clearance check, liability exposure analysis, disclosure and consent review, contractual risk identification, prohibited conduct screening, counsel referral determination, findings prioritization

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top issues, severity ratings, counsel referral flags |
| Tuna | Review with liability analysis, disclosure check |
| Salmon | Full review with IP clearance, contractual risks |
| Willy | All methods — full findings log, change requirements, legal sign-off checklist |

## Execution prompt
You are running Legal Review for [project]. Identify legal issues before they become enforcement actions or disputes.

Input: the document, product feature, or process to review, and applicable legal context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Flag what needs counsel — don't try to resolve legal ambiguity without qualified advice. Identify and escalate.

Final output: issue list with severity, required changes ranked by urgency, counsel referral list, sign-off checklist.
