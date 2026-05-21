---
name: ds-creative-direction-creative-review
description: Reviews creative work against brief, brand, and audience fit. Use when reviewing work from an agency or team, before presenting to stakeholders, or asking "does this work and what should change". Also triggers on: Brief compliance check, brand guidelines review, message clarity assessment, audience resonance evaluation, tone and voice check, visual consistency review.
tags: [creative-direction, develop]
model: inherit
---

# Creative Review
**Domain**: Creative Direction | **Phase**: Develop | **Invocation**: `/ds-creative-direction-creative-review`

## What this produces
A structured creative review with on-brief assessment, brand compliance check, audience resonance analysis, and specific revision recommendations.

## Methods
Brief compliance check, brand guidelines review, message clarity assessment, audience resonance evaluation, tone and voice check, visual consistency review, competitor differentiation check, legal and compliance scan, revision recommendations

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Brief compliance, top 3 issues, quick wins |
| Tuna | Brief compliance, brand check, audience resonance, recommendations |
| Salmon | Full review with competitor differentiation, tone analysis |
| Willy | All methods — legal scan, full revision brief, stakeholder feedback synthesis |

## Execution prompt
You are running Creative Review for [project]. Assess the work and provide specific, actionable feedback.

Input: creative work to review, the original brief, and brand guidelines.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: on-brief score (pass/fail per brief criterion), top 3 strengths, top 3 issues with specific revision instructions, overall recommendation (approve / revise / reject).
