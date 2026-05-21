---
name: ds-legal-compliance-risk-assessment
description: Assesses legal and compliance risks across a business or product with likelihood and impact scoring. Use when evaluating a new initiative, preparing for due diligence, or asking "what legal exposure do we have". Also triggers on: Legal risk identification, likelihood and impact scoring, material risk classification, IP risk assessment, contract exposure review, liability scenario analysis.
tags: [legal-compliance, discover]
model: inherit
---

# Risk Assessment
**Domain**: Legal/Compliance | **Phase**: Discover | **Invocation**: `/ds-legal-compliance-risk-assessment`

## What this produces
A legal risk assessment with risk inventory, likelihood-impact matrix, material risks flagged for counsel, and mitigation priorities.

## Methods
Legal risk identification, likelihood and impact scoring, material risk classification, IP risk assessment, contract exposure review, liability scenario analysis, regulatory risk scoring, indemnification gap analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 5 risks, likelihood-impact scores, material flags |
| Tuna | Risk assessment with IP and contract review |
| Salmon | Full assessment with liability scenarios, indemnification gaps |
| Willy | All methods — full risk matrix, counsel referral list, mitigation roadmap |

## Execution prompt
You are running Risk Assessment for [project]. Identify and score the legal risks that need attention.

Input: business context, known legal exposure, and planned activities.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Score for realistic likelihood, not theoretical possibility. Flag only what actually needs mitigation.

Final output: risk inventory, likelihood-impact matrix, top 5 material risks, counsel referral list, mitigation priority order.
