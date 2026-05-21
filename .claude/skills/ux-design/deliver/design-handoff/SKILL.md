---
name: ds-ux-design-design-handoff
description: Prepares design specs, tokens, annotations, and assets for engineering handoff. Use when designs are approved and ready to build, or asking "what does engineering need from us". Also triggers on: Design token documentation, component spec writing, redline annotation, asset export guide, spacing and layout specification, responsive breakpoint documentation.
tags: [ux-design, deliver]
model: inherit
---

# Design Handoff
**Domain**: UX Design | **Phase**: Deliver | **Invocation**: `/ds-ux-design-design-handoff`

## What this produces
A handoff package with design specs, component annotations, asset exports, design tokens, and an implementation guide.

## Methods
Design token documentation, component spec writing, redline annotation, asset export guide, spacing and layout specification, responsive breakpoint documentation, interaction specification, accessibility checklist, implementation Q&A, developer walkthrough script

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Component specs, key assets, spacing documentation |
| Tuna | Design tokens, component specs, responsive breakpoints, interaction spec |
| Salmon | Full handoff with accessibility checklist, implementation guide |
| Willy | All methods — developer walkthrough, full token documentation, Q&A |

## Execution prompt
You are running Design Handoff for [project]. Produce everything engineering needs to implement the design accurately.

Input: approved design files and the engineering team's questions or concerns.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: component spec list, design token definitions, interaction spec for non-obvious behaviors, accessibility requirements, top 5 implementation questions with answers.
