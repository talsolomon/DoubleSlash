---
name: ds-legal-compliance-regulatory-research
description: Researches applicable laws, regulations, and enforcement landscape for a product or business. Use when entering a regulated space, evaluating legal risk, or asking "what laws govern what we're building". Also triggers on: Applicable law identification, regulatory body mapping, enforcement history review, recent rule changes and proposals, jurisdictional comparison, industry standard review.
tags: [legal-compliance, discover]
model: inherit
---

# Regulatory Research
**Domain**: Legal/Compliance | **Phase**: Discover | **Invocation**: `/ds-legal-compliance-regulatory-research`

## What this produces
A regulatory research brief with applicable laws, enforcement bodies, recent enforcement activity, and preliminary risk assessment.

## Methods
Applicable law identification, regulatory body mapping, enforcement history review, recent rule changes and proposals, jurisdictional comparison, industry standard review, legal precedent research, counsel engagement scope definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Applicable laws, enforcement bodies, top 3 risks |
| Tuna | Research brief with enforcement history, recent changes |
| Salmon | Full research with jurisdictional comparison, precedents |
| Willy | All methods — proposed rule tracking, full risk map, counsel scope |

## Execution prompt
You are running Regulatory Research for [project]. Identify what laws and regulations govern this activity.

Input: product or business description and target jurisdictions.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Research what's enforced, not just what's written. Enforcement patterns reveal actual regulatory priority.

Final output: regulation inventory, enforcement body map, top 5 legal risks with likelihood, recent enforcement actions, preliminary risk assessment.
