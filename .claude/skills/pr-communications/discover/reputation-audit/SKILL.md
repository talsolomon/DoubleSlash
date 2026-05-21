---
name: ds-pr-communications-reputation-audit
description: Audits an organization's current reputation, coverage, and public perception. Use when entering a new market, after a crisis, or asking "how are we actually perceived and what do we need to fix". Also triggers on: Media coverage analysis, sentiment scoring, social listening review, analyst and influencer perception research, employee and customer perception review, competitor reputation comparison.
tags: [pr-communications, discover]
model: inherit
---

# Reputation Audit
**Domain**: PR/Communications | **Phase**: Discover | **Invocation**: `/ds-pr-communications-reputation-audit`

## What this produces
A reputation audit report with current perception summary, coverage sentiment analysis, reputation gaps, and priority areas for communications investment.

## Methods
Media coverage analysis, sentiment scoring, social listening review, analyst and influencer perception research, employee and customer perception review, competitor reputation comparison, crisis history review, reputation gap identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Perception summary, top 3 reputation gaps, priority areas |
| Tuna | Audit with coverage sentiment, competitor comparison |
| Salmon | Full audit with social listening, analyst perception |
| Willy | All methods — crisis history, full sentiment map, gap remediation plan |

## Execution prompt
You are running Reputation Audit for [project]. Understand how the organization is currently perceived and what the communications gaps are.

Input: company/brand context and available coverage and perception data.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Reputation is built by what you do and how it's covered — not by what you say. Distinguish earned reputation from desired reputation.

Final output: perception summary, coverage sentiment analysis, top 5 reputation gaps, comparison vs. competitors, priority communications investment areas.
