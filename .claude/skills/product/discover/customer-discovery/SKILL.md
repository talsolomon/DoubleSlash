---
name: ds-product-customer-discovery
description: Surfaces real user problems through interviews, empathy mapping, and observation. Use when starting a new project, validating an idea, or asking "who is this for" and "what problem are we solving". Also triggers on: JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing.
tags: [product, discover]
model: inherit
---

# Customer Discovery
**Domain**: Product | **Phase**: Discover | **Invocation**: `/ds-product-customer-discovery`

## What this produces
Research synthesis surfacing real user problems before anything gets built. Output: prioritized problem list with evidence, user segments, and recommended next phase.

## Methods
JTBD interview, problem interview, contextual inquiry, ethnographic observation, diary study, day-in-the-life shadowing, empathy mapping, experience sampling, NPS deep-dive, churn interview, win/loss analysis, survey design, customer advisory board facilitation, participatory observation, longitudinal panel

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | JTBD interview (3–5 users), empathy mapping |
| Tuna | JTBD interview, problem interview, NPS deep-dive, empathy mapping |
| Salmon | Contextual inquiry, JTBD interview, win/loss analysis, survey design, empathy mapping |
| Willy | Full methods list — diary study, shadowing, longitudinal panel, all interviews |

## Execution prompt
You are running the Customer Discovery skill for [project]. Your job is to surface real user problems before anything gets built.

FISH classification: [Nemo/Tuna/Salmon/Willy]
Run the methods listed for this FISH level.

For each method:
1. State what you're doing and why
2. Produce the output (interview guide, survey, synthesis, or analysis)
3. Summarize signal — what did you learn?

Final output: prioritized problem list (max 5 problems) with evidence for each and a recommended direction into Define phase.
