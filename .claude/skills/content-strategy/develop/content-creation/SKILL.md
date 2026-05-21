---
name: ds-content-strategy-content-creation
description: Creates a piece of content from brief to final draft. Use when writing an article, case study, email, social post, or any content asset, or asking "write this for me". Also triggers on: Brief interpretation, outline design, research synthesis, draft writing, headline optimization, SEO optimization.
tags: [content-strategy, develop]
model: inherit
---

# Content Creation
**Domain**: Content Strategy | **Phase**: Develop | **Invocation**: `/ds-content-strategy-content-creation`

## What this produces
A completed content piece — article, case study, email, social post, or other format — written to brief, on-brand, and ready for review.

## Methods
Brief interpretation, outline design, research synthesis, draft writing, headline optimization, SEO optimization, call-to-action design, readability review, fact-checking, editorial polish

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Brief interpretation, outline, draft (first version) |
| Tuna | Research synthesis, full draft, headline options, CTA |
| Salmon | Full draft with SEO optimization, readability pass, multiple headline tests |
| Willy | All methods — research, multiple drafts, full editorial polish |

## Execution prompt
You are running Content Creation for [project]. Produce a complete, on-brief content piece ready for review.

Input: content brief with topic, audience, format, goal, and any key messages.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Produce the full piece. Flag anything that requires factual verification. End with 3 headline options.

Final output: complete draft, 3 headline options, 1 CTA recommendation, any open factual questions flagged.
