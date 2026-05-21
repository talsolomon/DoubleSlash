---
name: ds-ux-design-prototype-design
description: Designs an interactive prototype plan for testing or handoff. Use when preparing for user testing, validating interactions, or asking "how do we test this before building it". Also triggers on: Fidelity selection (paper/lo-fi/hi-fi), interaction flow design, hotspot mapping, transition and animation design, prototype scenario definition, test task alignment.
tags: [ux-design, develop]
model: inherit
---

# Prototype Design
**Domain**: UX Design | **Phase**: Develop | **Invocation**: `/ds-ux-design-prototype-design`

## What this produces
A prototype specification with fidelity decision, interaction flow, clickable states, test scenarios, and handoff notes.

## Methods
Fidelity selection (paper/lo-fi/hi-fi), interaction flow design, hotspot mapping, transition and animation design, prototype scenario definition, test task alignment, Figma/Framer prototype spec, edge case coverage, accessibility interaction design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Fidelity decision, key flow hotspot map, test scenarios |
| Tuna | Interaction flow, prototype spec, test task alignment |
| Salmon | Full prototype plan, transition design, edge case coverage |
| Willy | All methods — hi-fi with animations, full accessibility interactions |

## Execution prompt
You are running Prototype Design for [project]. Plan an interactive prototype that answers the key design questions before development.

Input: wireframes and the design questions the prototype must answer.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: fidelity recommendation with rationale, interaction flow description, clickable state inventory, 3–5 test scenarios, handoff notes for the designer.
