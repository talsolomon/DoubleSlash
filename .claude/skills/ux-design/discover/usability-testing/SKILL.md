---
name: ds-ux-design-usability-testing
description: Designs and synthesizes usability tests on flows or prototypes to surface friction and failures. Use when validating a design, testing a prototype, or asking "can users actually do this". Also triggers on: Think-aloud testing, task-based testing, first-click testing, five-second test, hallway testing, moderated remote testing.
tags: [ux-design, discover]
model: inherit
---

# Usability Testing
**Domain**: UX Design | **Phase**: Discover | **Invocation**: `/ds-ux-design-usability-testing`

## What this produces
A usability test plan, task list, and findings report with severity-rated issues and design recommendations.

## Methods
Think-aloud testing, task-based testing, first-click testing, five-second test, hallway testing, moderated remote testing, unmoderated testing, System Usability Scale (SUS), task completion rate analysis, error rate analysis, time-on-task measurement

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Task-based test (3 tasks), think-aloud protocol, top issues |
| Tuna | Moderated test, task completion analysis, SUS score, findings synthesis |
| Salmon | Full test plan, moderated + unmoderated, error analysis, recommendations |
| Willy | All methods — longitudinal testing, benchmark study, full SUS analysis |

## Execution prompt
You are running Usability Testing for [project]. Design a test and synthesize findings that translate directly into design improvements.

Input: the flow, screen, or prototype to test, and the user task to validate.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Produce the test plan first, then the task list with success criteria, then the findings synthesis.

Final output: test plan, 3–5 tasks with success criteria, findings with severity ratings (Critical/High/Medium/Low), prioritized fix list.
