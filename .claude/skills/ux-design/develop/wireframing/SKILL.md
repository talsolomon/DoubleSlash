---
name: ds-ux-design-wireframing
description: Produces annotated wireframes for a flow or feature. Use when moving from IA to visual design, aligning on layout before development, or asking "what should this screen look like". Also triggers on: Low-fidelity wireframe, flow mapping, component inventory, interaction state documentation, responsive design considerations, empty state design.
tags: [ux-design, develop]
model: inherit
---

# Wireframing
**Domain**: UX Design | **Phase**: Develop | **Invocation**: `/ds-ux-design-wireframing`

## What this produces
Annotated wireframes for a user flow with component notes, interaction states, and edge cases documented.

## Methods
Low-fidelity wireframe, flow mapping, component inventory, interaction state documentation, responsive design considerations, empty state design, error state design, loading state design, annotation writing, accessibility note documentation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Key screen wireframes (3–5 screens), flow map |
| Tuna | Full flow wireframes, interaction states, component inventory |
| Salmon | Annotated wireframes, error/empty/loading states, responsive notes |
| Willy | All methods — full component library, accessibility documentation |

## Execution prompt
You are running Wireframing for [project]. Produce annotated wireframes that communicate layout and interaction without visual design.

Input: UX brief, IA, and the specific flow or feature to wireframe.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Describe each wireframe in structured text: screen name, layout description, component list, annotations, interaction notes.

Final output: wireframe descriptions for each screen in the flow, interaction state notes, edge cases documented, open design questions flagged.
