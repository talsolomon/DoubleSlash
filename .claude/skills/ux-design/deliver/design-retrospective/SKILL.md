---
name: ds-ux-design-design-retrospective
description: Reviews design decisions and usability outcomes post-launch. Use after shipping a feature, completing a design sprint, or asking "did the design work". Also triggers on: post-launch usability data review, design decision audit, assumption validation, SUS benchmark comparison, handoff effectiveness review, pattern library update.
tags: [ux-design, deliver, design-retrospective, sus-benchmark, decision-audit, pattern-library]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Design Retrospective
**Domain**: UX Design | **Phase**: Deliver | **Invocation**: `/ds-ux-design-design-retrospective`

## What this produces
A design retrospective with usability outcome data, design decision audit, assumption validation, handoff effectiveness review, and specific process improvements for the next design cycle.

## Methods
Post-launch usability data review, SUS benchmark comparison, design decision audit, assumption validation, handoff effectiveness review, research-to-design traceability, pattern library update recommendations, process improvement identification

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick retro | What worked / what didn't + 3 usability outcomes + 1 process change |
| Tuna | Full retro | Decision audit + assumption validation + outcomes + process review |
| Salmon | Deep review | Data review + SUS benchmark + handoff effectiveness + pattern library |
| Willy | Design system retro | All methods + research traceability + full pattern library update |

---

## Execution Prompt

Read the project context: the shipped feature, post-launch analytics and usability data, original UX brief, design decisions made and why, FISH classification.

---

### Step 1 — Usability Outcome Summary (all FISH levels)

Was the design successful? Measure against the success metrics defined in the UX brief.

| Metric | Target | Actual | Result |
|---|---|---|---|
| [Task completion rate] | [≥ X%] | [Y%] | Pass/Fail |
| [Time to complete] | [< X min] | [Y min] | Pass/Fail |
| [SUS score] | [≥ 72] | [Y] | Pass/Fail |
| [Error rate on [step]] | [< X%] | [Y%] | Pass/Fail |

**Data sources used:** [analytics / post-launch usability session / support tickets / NPS / session replay]

**Data gaps:** what you wish you had measured but didn't. This drives the instrumentation list for the next cycle.

---

### Step 2 — Design Decision Audit (Tuna, Salmon, Willy)

Review the major design decisions made during this project. Which were right? Which weren't?

**Format per decision:**
```
Decision: [What was decided — e.g., "Single-page checkout instead of multi-step"]
Rationale at the time: [Why we made this choice]
Evidence used: [What informed the decision — research, constraint, assumption]
Outcome: [What the data or user feedback shows now]
Verdict: Validated / Invalidated / Inconclusive
Learning: [What we now know that we didn't know then]
```

**Decision audit questions:**
- Were there decisions made without research? What happened to them?
- Were there decisions overridden by stakeholders? How did those turn out?
- Which decisions were made too late (slowed the sprint)? What caused the delay?
- Which assumptions were embedded in design decisions that turned out to be wrong?

---

### Step 3 — Assumption Validation (all FISH levels)

Every design embeds assumptions. Validate them explicitly.

| Assumption | What we believed | What data showed | Validated? | Implication |
|---|---|---|---|---|
| [e.g., Users will understand the tab navigation without onboarding] | Users recognize tab patterns | 40% of first-time users tried the wrong tab first | ❌ | Needs onboarding tooltip or clearer labels |
| [e.g., Single-column form reduces cognitive load] | One column = easier completion | Completion rate +8% vs. baseline | ✅ | Keep single-column as default |

**For each invalidated assumption:**
- What should the design have done instead?
- Was this testable earlier (with usability testing or research)? If so, why wasn't it tested?

---

### Step 4 — SUS Benchmark Comparison (Salmon, Willy)

If SUS was measured before and after, compare.

```
Pre-launch SUS (if available): [score] — [adjective]
Post-launch SUS: [score] — [adjective]
Change: [+/- X points]

Industry benchmark: 68 (average)
[Product] relative to benchmark: [above / below / at]

SUS interpretation:
  Score ≥ 85: Excellent — users will recommend this product
  Score 72–84: Good — meets user expectations
  Score 52–71: OK — usable but with friction
  Score < 52: Poor — significant redesign needed
  
If score < 72: which SUS questions scored lowest? These reveal the specific friction areas.
```

---

### Step 5 — Handoff Effectiveness Review (Salmon, Willy)

Was the design implementation what was designed? Handoff failures are design failures too.

**Review process:** compare the live shipped product to the design specs.

| Element | Design intent | Shipped implementation | Match? | Delta |
|---|---|---|---|---|
| [Component X] | [As designed] | [As built] | ✅ / ❌ | [If ❌: what's different] |

**Handoff failure patterns to document:**
- Spacing deviations — which values weren't followed?
- Missing states — which interaction states weren't implemented?
- Accessibility gaps — which WCAG requirements weren't met?
- Animation differences — what was designed vs. what shipped?

**Root cause of handoff failures:**
- Was the spec unclear? → improve annotation depth
- Was the spec not reviewed by engineering before build? → add engineering review step
- Was the spec updated after handoff without notification? → add change notification process
- Was it a time constraint? → flag for next sprint planning

---

### Step 6 — Pattern Library Updates (Willy)

Post-launch is the best time to update the design system with what was learned.

**New patterns to document:**
```
Pattern: [name]
When to use: [specific context]
When NOT to use: [constraints]
Example: [link to shipped component]
Accessibility requirements: [WCAG criteria this pattern must meet]
Engineering implementation notes: [token usage, interaction spec]
```

**Existing patterns to update:**
```
Pattern: [name — existing]
Change: [what was learned that changes the guidance]
Evidence: [usability data or research that drives the update]
Updated guidance: [new rule or recommendation]
```

**Deprecated patterns:**
```
Pattern: [name — to deprecate]
Reason: [why it's being retired]
Migration: [what to use instead]
Timeline: [when to remove from the library]
```

---

### Step 7 — Process Improvements (all FISH levels)

Format each improvement so it's actionable — not a vague intention.

```
Improvement: [what specifically changes]
Problem it solves: [what went wrong in this project that this prevents]
How to implement: [specific change to process, method, or tooling]
Owner: [who is responsible]
Starting: [next project / immediately]
```

**Areas to review:**
- Research → brief → wireframe traceability (did design reflect research?)
- Stakeholder alignment (were decisions litigated after they were made?)
- Handoff completeness (what did engineering need that wasn't provided?)
- Timeline (where was time lost? could it have been designed with higher fidelity earlier?)
- Tooling (what took longer than it should have?)

---

### Final Output

**Usability outcome summary** — metrics vs. targets from UX brief
**Design decision audit** — validated / invalidated / inconclusive, with learnings (Tuna+)
**Assumption validation** — what we got right and wrong, implications for next cycle (all FISH)
**SUS benchmark comparison** — before/after, vs. industry (Salmon+)
**Handoff effectiveness review** — shipped vs. designed, failure pattern analysis (Salmon+)
**Pattern library updates** — new, revised, deprecated patterns (Willy)
**Process improvements** — specific changes, owners, timelines
**Recommended next skill** — `/ds-ux-design-user-research` (if starting next design cycle) or `/ds-ux-design-ux-brief` (if problem is redefined by what we learned) with one-sentence reason
