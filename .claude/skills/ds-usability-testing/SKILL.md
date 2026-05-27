---
name: ds-usability-testing
description: Validates design decisions with real users through structured testing, producing a severity-rated findings report with actionable fixes. Use when a design or prototype is ready to evaluate, before a launch, or when friction points are suspected but unconfirmed. Also triggers on: usability test, test with users, cognitive walkthrough, first impression test, 5-second test, A/B test, think-aloud protocol, accessibility testing, guerrilla testing, can users complete this, do users understand this, validate design, UX testing, test the prototype, user testing session.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [ux-design, deliver, ds-core, testing, validation]
model: inherit
---

# DS Usability Testing

Plans and runs structured usability evaluation — from guerrilla hallway tests to moderated sessions — and produces a severity-rated findings report with prioritized fixes.

**Produces:** Usability test plan, session guide, findings report with severity ratings (Critical / Serious / Minor), and a prioritized fix list with recommendations.

---

## When to invoke

- **Pre-launch gate.** Design is final; need to confirm it works before shipping.
- **Prototype validation.** Running `ds-prototyping` output through a test before committing to high-fidelity.
- **Suspected friction.** Qualitative signal or drop-off data suggests users struggle somewhere specific.
- **Accessibility check.** Need to confirm WCAG compliance or catch assistive-tech blockers.
- **A/B hypothesis.** Have two variants; need a structured comparison before running a live experiment.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Quick validation, 1–3 tasks | First impression test (5-second), guerrilla think-aloud (3 users), findings summary |
| Tuna | Feature or flow validation, 3–6 tasks | Cognitive walkthrough, moderated think-aloud (5 users), task completion analysis |
| Salmon | Full product or critical launch, 6–10 tasks | All Tuna methods + A/B test design, accessibility audit, heatmap analysis brief, beta feedback synthesis |
| Willy | High-stakes launch, multi-segment | Full suite + longitudinal diary debrief, desirability testing, SUS scoring, SUPR-Q |

---

## Instructions

1. **Classify** this testing effort: Nemo / Tuna / Salmon / Willy based on stakes and what's being validated
2. **State** the FISH level, which methods you're running, and what hypothesis each test is designed to answer
3. **Define the test scope** before producing any guide:
   - What is being tested (screen, flow, or full product)
   - What tasks users will attempt (verb-first, no hints)
   - What a passing result looks like per task

4. **Run each method** in sequence:

   **First impression test / 5-second test** *(all levels)*
   - Show the design for 5 seconds; ask what the user remembers and what they think the product does
   - Measures: comprehension, visual hierarchy, value proposition clarity

   **Guerrilla think-aloud** *(Nemo)*
   - 3-user unmoderated session; user narrates what they're doing and why
   - Produces: list of friction moments with user quotes

   **Cognitive walkthrough** *(Tuna+)*
   - Walk through each task step-by-step asking: Does the user know what to do? Can they see how to do it? Will they understand the feedback?
   - Produces: per-step failure risk list with root cause

   **Moderated usability test** *(Tuna+)*
   - Write a session guide: intro script, task scenarios, probing questions, wrap-up
   - Run 5 users minimum; record or note observations per task
   - Produces: task completion rates, time-on-task, verbatim quotes

   **A/B test design** *(Salmon+)*
   - Define variants, primary metric, secondary metrics, minimum sample size, and run duration
   - Flag what must be held constant between variants
   - Produces: A/B test brief ready for engineering handoff

   **Accessibility audit** *(Salmon+)*
   - Check against WCAG 2.2 AA criteria: color contrast, keyboard navigation, screen reader labels, focus management, error handling
   - Produces: accessibility issues list with WCAG criterion reference

   **Heatmap analysis brief** *(Salmon+)*
   - Define which screens to instrument, what behavior to capture (clicks, scroll depth, attention), and what question each screen answers
   - Produces: analytics instrumentation brief

5. **Rate every finding:**
   - **Critical** — blocks task completion; ship-stopper
   - **Serious** — significantly impairs task; fix before launch
   - **Minor** — annoyance or polish; fix in next iteration

6. **Produce the fix list** — for each Critical and Serious finding: root cause, recommended fix, effort estimate (S/M/L)

**Final output:** Test plan, session guide, severity-rated findings report, prioritized fix list, and pass/fail recommendation against launch readiness.

---

## Methods library

First impression test, 5-second test, guerrilla think-aloud, cognitive walkthrough, moderated usability test, unmoderated usability test, think-aloud protocol, retrospective probing, A/B test design, accessibility audit (WCAG 2.2), heatmap analysis brief, beta feedback synthesis, desirability testing, SUS scoring, SUPR-Q scoring, longitudinal diary debrief

---

## Error handling

| Condition | Resolution |
|---|---|
| No prototype or design to test | Run `ds-prototyping` first; testing requires a testable artifact |
| Fewer than 3 users available | Flag the limitation; 5 is the minimum for reliable usability signal; guerrilla testing is the fallback |
| Team wants to skip testing before launch | Surface the risk explicitly; recommend at minimum a Nemo-level first impression test |
| A/B test requested with insufficient traffic | Note minimum sample size; recommend a Nemo usability test as the faster signal source |
| Accessibility audit reveals Critical issues | These are launch blockers — escalate to engineering with WCAG criterion reference and fix recommendation |
| Findings conflict across user segments | Do not average; report segment-specific findings separately |
