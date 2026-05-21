---
name: ds-ux-design-design-retrospective
description: Reviews design decisions post-launch and surfaces lessons for future work. Use after shipping a feature, completing a design sprint, or asking "did the design work and what would we do differently". Also triggers on: Post-launch usability data review, design decision audit, assumption validation, design quality assessment, handoff effectiveness review, research-to-design traceability.
tags: [ux-design, deliver]
model: inherit
---

# Design Retrospective
**Domain**: UX Design | **Phase**: Deliver | **Invocation**: `/ds-ux-design-design-retrospective`

## What this produces
A design retrospective with usability outcomes, what worked, what didn't, and specific process improvements for the next design cycle.

## Methods
Post-launch usability data review, design decision audit, assumption validation, design quality assessment, handoff effectiveness review, research-to-design traceability, pattern library update recommendations, process improvement identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | What worked / what didn't, top 3 usability outcomes |
| Tuna | Decision audit, assumption validation, process review |
| Salmon | Full retro with data review, handoff effectiveness, pattern library updates |
| Willy | All methods — full design quality assessment, research traceability |

## Execution prompt
You are running a Design Retrospective for [project]. Review design decisions and outcomes to improve the next cycle.

Input: the shipped feature, any post-launch data, and the original design brief.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: 3 design decisions that worked (keep), 3 that didn't (change), usability outcome summary, top process improvement for next sprint.
