---
name: ds-ux-design-usability-testing
description: Designs and runs usability tests on flows or prototypes to surface friction and failures. Produces SUS scores, task completion rates, severity-rated findings, and design recommendations. Use when validating a design, testing a prototype, or asking "can users actually do this". Also triggers on: think-aloud testing, task-based testing, SUS scoring, first-click test, Jakob Nielsen's heuristics.
tags: [ux-design, discover, usability-testing, sus, task-completion, nielsen-heuristics]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Usability Testing
**Domain**: UX Design | **Phase**: Discover | **Invocation**: `/ds-ux-design-usability-testing`

## What this produces
A usability test plan, task list with success criteria, SUS score interpretation, findings with severity ratings, and a prioritized fix list the design team can act on immediately.

## Methods
Think-aloud protocol, task-based testing, first-click testing, five-second test, System Usability Scale (SUS), Jakob Nielsen's 10 heuristics, error rate analysis, task completion rate, time-on-task, eye tracking (if available), session replay analysis

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick test | 3 tasks + think-aloud + top 5 issues + severity ratings |
| Tuna | Standard test | Full test plan + 5 tasks + SUS + findings report |
| Salmon | Full study | Moderated + unmoderated + heuristic evaluation + benchmark |
| Willy | Benchmark study | All methods + longitudinal + competitive benchmark + full report |

---

## Execution Prompt

Read the project context: what is being tested (flow, prototype, live product), the target user profile, what design questions need answering, FISH classification.

---

### Step 1 — Test Objectives (all FISH levels)

Define what questions this test must answer. Every task should map to a question.

```
Primary objective: [The one thing you need to know — e.g., "Can first-time users complete checkout without assistance?"]

Secondary objectives:
1. [e.g., "Where does confusion happen in the payment form?"]
2. [e.g., "Is the confirmation state clearly understood?"]

What we're NOT testing: [scope — prevents rabbit holes mid-session]

Success definition: [e.g., "If 4 of 5 users complete Task 1 without errors, the flow passes"]
```

---

### Step 2 — Task Design (all FISH levels)

**Task design rules:**
- Tasks are **scenarios**, not instructions. "You want to update your billing address" not "Click Settings"
- Tasks are realistic — based on real user behavior from research
- Tasks have a clear completion state — you know when the user is done
- Tasks don't use product vocabulary the user doesn't know yet

**Task format:**
```
Task [N]: [Name]
Scenario: "[The user's situation, in their words. Example: You've just received an invoice and want to pay it before the deadline. Please go ahead and do that."]
Starting point: [what screen they start on]
Success: [observable completion state]
Expected path: [the designed path — not shared with user]
Key moments to observe: [specific interactions or decision points]
Time limit: [if applicable]
```

**Prototype tasks (Nemo: 3, Tuna: 5, Salmon: 7, Willy: 10)**

---

### Step 3 — Session Protocol (all FISH levels)

**Moderated session script:**
```
Introduction (5 min):
"Thank you for joining. I want to be clear — we're testing the design, not you.
There are no right or wrong answers. Please think out loud as you go — tell me
what you're looking at, what you're thinking, what you expect will happen.
If you get stuck, that's valuable information. Please don't stop unless you want to."

Warm-up:
"Before we start, tell me a bit about how you usually [relevant domain activity]."

Tasks: [deliver scenario cards one at a time]

Debrief (10 min):
"Looking back at what you just did, what was the most confusing moment?"
"What would have helped you when you got stuck at [specific moment]?"
"SUS questionnaire now" [if using SUS]
```

**Observation protocol:**
- Observer notes: what the user does, says, and hesitates at — not interpretations
- Timestamp key moments for clip review
- Note body language: leaning in = engaged, leaning back = lost

---

### Step 4 — System Usability Scale (Tuna, Salmon, Willy)

SUS is a 10-item questionnaire administered post-test. Scores are on a 0–100 scale.

**SUS questions** (administered as-is — alternating positive/negative phrasing):
1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to use this.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going.

**Scoring:** Odd items: score - 1. Even items: 5 - score. Sum × 2.5 = SUS score.

**SUS interpretation:**
| Score | Grade | Adjective |
|---|---|---|
| 85–100 | A | Excellent |
| 72–84 | B | Good |
| 52–71 | C | OK |
| 38–51 | D | Poor |
| < 38 | F | Awful |

**Industry benchmark:** Average SUS score across products is ~68. Below 68 means you're worse than average — this is not acceptable for a designed product.

---

### Step 5 — Heuristic Evaluation (Salmon, Willy)

Jakob Nielsen's 10 heuristics as a structured walkthrough of the design. Complement, don't replace, user testing.

| # | Heuristic | Question to ask |
|---|---|---|
| 1 | Visibility of system status | Does the user always know what's happening? |
| 2 | Match between system and real world | Does the product speak the user's language? |
| 3 | User control and freedom | Can users undo mistakes easily? |
| 4 | Consistency and standards | Does the product follow platform conventions? |
| 5 | Error prevention | Are errors prevented before they happen? |
| 6 | Recognition over recall | Is everything visible — or must users remember things? |
| 7 | Flexibility and efficiency | Can experts take shortcuts? |
| 8 | Aesthetic and minimalist design | Is every element necessary? |
| 9 | Help users recognize, diagnose, and recover from errors | Are error messages plain language with a solution? |
| 10 | Help and documentation | Is help findable and task-oriented? |

For each heuristic, rate: Pass / Minor issue / Major issue / Catastrophic violation.

---

### Step 6 — Findings Synthesis (all FISH levels)

**Severity rating scale:**
| Rating | Definition | Action |
|---|---|---|
| **Critical** | Task failure — user cannot complete without help | Fix before launch, no exceptions |
| **High** | Major friction — user completes but with significant struggle or errors | Fix in this sprint |
| **Medium** | Minor friction — user completes but expresses confusion or frustration | Schedule for next sprint |
| **Low** | Polish — cosmetic or very minor | Address when time allows |

**Finding format:**
```
[SEVERITY] Finding [N]: [Title]
Description: [What happened — specific, behavioral]
Evidence: "[User quote]" / [timestamp in recording]
Frequency: [X of N users encountered this]
Root cause: [Why this happens — design issue identified]
Recommendation: [Specific design change — not "improve clarity"]
```

**Task completion metrics:**
| Task | Completion Rate | Avg Time | Error Rate | Notes |
|---|---|---|---|---|
| Task 1: [name] | X/N (%) | [min] | [N errors] | |

---

### Step 7 — Fix List (all FISH levels)

Translate findings into a prioritized action list for the design team.

| # | Fix | Finding ref | Effort | Impact | Priority |
|---|---|---|---|---|---|
| 1 | [Specific design change] | Critical-01 | S/M/L | H/M/L | P1 |

Sort by: Critical findings first, then High, then by effort (low effort / high impact wins).

---

### Final Output

**Test objectives** — primary question + secondary questions, success definition
**Tasks** — scenarios with clear completion states, starting points
**Session protocol** — script for moderated testing
**SUS score** — with percentile interpretation (Tuna+)
**Heuristic evaluation** — 10 heuristics rated (Salmon+)
**Findings** — severity-rated, with quotes and frequency
**Task completion metrics** — rates, time, error counts
**Prioritized fix list** — specific changes ordered by impact
**Recommended next skill** — `/ds-ux-design-wireframing` (for redesign) or `/ds-ux-design-design-handoff` (if issues are minor) with one-sentence reason
