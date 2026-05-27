---
name: ds-heuristic-evaluation
description: Runs an expert review of a UI against Nielsen's 10 usability heuristics, producing a severity-rated violation list and fix recommendations — without requiring user sessions. Use when evaluating an existing product, auditing a design before testing, or getting fast usability signal without recruiting users. Also triggers on: heuristic review, expert review, heuristic audit, Nielsen evaluation, UI audit, usability audit, UX audit, evaluate the design, review the interface, what's wrong with this UI, design critique, expert walkthrough, PURE evaluation, usability inspection, heuristic analysis, quick UX check.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Read
tags: [ux-design, discover, ds-core, evaluation, audit]
model: inherit
---

# DS Heuristic Evaluation

Runs a structured expert review against Nielsen's 10 usability heuristics — producing a severity-rated violation list and prioritized fixes without requiring user sessions.

**Produces:** Heuristic evaluation report with per-heuristic violation list, severity ratings (0–4 scale), top 5 critical fixes, and recommended next step (user testing, redesign, or ship).

---

## When to invoke

- **Fast signal before user testing.** Need to know if the design has obvious violations before investing in a moderated session.
- **Existing product audit.** Evaluating a live product or competitor for usability gaps.
- **Design critique.** Team needs structured, principled feedback — not just opinions.
- **No users available.** Timeline or budget doesn't allow recruitment; need best-available signal now.

---

## FISH classification

| Level | Scope | Run these methods |
|---|---|---|
| Nemo | Single screen or flow | Walk the flow against all 10 heuristics; list top 5 violations |
| Tuna | Feature set, 3–5 screens | Full heuristic walkthrough + PURE evaluation + severity matrix |
| Salmon | Full product or competitive audit | All Tuna methods + comparative analysis + accessibility heuristics (WCAG overlay) |
| Willy | Multi-product or design system audit | Full suite + keystroke-level model for critical tasks + benchmark against competitor |

---

## Nielsen's 10 Heuristics

Apply all 10 to every evaluation. Never skip one — absence of violations is a valid finding.

1. **Visibility of system status** — Does the system always keep users informed about what's happening?
2. **Match between system and real world** — Does the interface use language and concepts familiar to the user?
3. **User control and freedom** — Can users easily undo, redo, or exit unwanted states?
4. **Consistency and standards** — Does the design follow platform and industry conventions?
5. **Error prevention** — Does the design prevent problems from occurring in the first place?
6. **Recognition over recall** — Are options visible rather than requiring the user to remember information?
7. **Flexibility and efficiency of use** — Are there shortcuts for expert users without burdening novices?
8. **Aesthetic and minimalist design** — Is every element necessary? Does irrelevant content compete with relevant content?
9. **Help users recognize, diagnose, and recover from errors** — Are error messages plain-language and actionable?
10. **Help and documentation** — If help is needed, is it easy to search, focused on the user's task, and concise?

---

## Severity scale

| Score | Label | Meaning |
|---|---|---|
| 0 | Not a problem | No usability issue |
| 1 | Cosmetic | Fix only if time permits |
| 2 | Minor | Low priority fix |
| 3 | Major | Important to fix; impacts task completion |
| 4 | Catastrophic | Fix before release; blocks users |

---

## Instructions

1. **Classify** this evaluation: Nemo / Tuna / Salmon / Willy based on scope and what decision it feeds
2. **State** what is being evaluated — product, flow, screen set, or competitor — and what question this evaluation answers
3. **Walk the evaluation:**

   **Heuristic walkthrough** *(all levels)*
   - For each of the 10 heuristics: list every violation found, assign a severity score (0–4), and name the specific element or interaction causing it
   - Format: `H[number] — [Heuristic name] — Severity [score]: [Violation description]`
   - Record "No violations" explicitly — it confirms coverage

   **PURE evaluation** *(Tuna+)*
   - For each critical task: rate Preventable, Unrecoverable, and Recurring separately
   - Flags the highest-risk failure modes even if no heuristic violation is obvious

   **Comparative analysis** *(Salmon+)*
   - Benchmark the same flows against one direct competitor or a recognized best-in-class example
   - Note where the evaluated product is better, worse, or equivalent per heuristic

   **Accessibility overlay** *(Salmon+)*
   - Cross-reference Severity 3–4 violations with WCAG 2.2 AA criteria
   - Flag any that are also accessibility failures — these escalate to launch blockers

4. **Produce the severity matrix** — all violations sorted by severity score, highest first
5. **Write the top 5 critical fixes** — for each Severity 3–4: root cause, one specific fix recommendation, effort estimate (S/M/L)
6. **State the recommendation:** ready to ship / test with users first / redesign required

**Final output:** Per-heuristic findings table, severity matrix, top 5 critical fixes, and a clear ship/test/redesign recommendation.

---

## Methods library

Nielsen's 10 heuristics walkthrough, PURE evaluation, severity rating (0–4), keystroke-level model, comparative heuristic analysis, accessibility overlay (WCAG 2.2), expert walkthrough, design critique facilitation

---

## Error handling

| Condition | Resolution |
|---|---|
| No design artifact provided | Ask for screenshots, a Figma link, or a live URL before starting |
| Evaluating a competitor without access | Run against publicly available screens; note the limitation in the report |
| Team disputes a severity rating | Severity is the evaluator's judgment call; note disagreements and let user testing adjudicate |
| All violations are Severity 1–2 | Report this as a positive finding; recommend moving to user testing to catch anything missed |
| Design is pre-prototype (no UI yet) | Heuristic evaluation requires a tangible artifact — redirect to ds-prototyping first |
