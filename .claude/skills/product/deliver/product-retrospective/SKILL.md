---
name: ds-product-product-retrospective
description: Closes the loop on what shipped — OKR grades, lessons learned, kill/continue/pivot recommendation. Use after a launch, sprint, or quarter ends, or when asking "what did we learn" and "should we continue". Also triggers on: sprint retrospective, product retrospective, lessons learned, OKR grading, quarterly business review, kill/continue/pivot decision.
tags: [product, deliver, retrospective, okr-grading, lessons-learned, pivot]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Product Retrospective
**Domain**: Product | **Phase**: Deliver | **Invocation**: `/ds-product-product-retrospective`

## What this produces
A closed loop on what shipped. OKR grades, lessons learned, assumption audit, updated decision log, and a kill/continue/pivot recommendation with explicit rationale.

## Methods
Sprint retrospective (Start/Stop/Continue), product retrospective, lessons learned synthesis, decision log update, OKR grading, quarterly business review, assumption audit, kill/continue/pivot decision, north star metric review

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Sprint retro | Start/Stop/Continue + OKR pass/fail + north star check + one recommendation |
| Tuna | Product retro | OKR grading + assumption audit + lessons learned + kill/continue/pivot |
| Salmon | QBR-level | Full retrospective + decision log update + assumption audit + north star deep-dive |
| Willy | Org-wide retro | All above + exec summary + portfolio impact + revised strategy |

---

## Execution Prompt

Read the project context: what was built and launched, the OKRs and success metrics defined in the roadmap and launch plan, actual metric outcomes (if available — flag if missing), FISH classification, and any feedback signals captured in memory.

---

### Step 1 — Data Gathering (all FISH levels)

Before grading anything, establish what we know vs. what we're estimating.

Produce a data availability table:

| Metric | Defined? | Baseline set? | Actual result | Data quality |
|---|---|---|---|---|
| [North star metric] | Y/N | [value] | [value or "not measured"] | Confirmed / Estimated / Unknown |
| [OKR Key Result 1] | Y/N | [value] | [value] | ... |
| [OKR Key Result 2] | Y/N | ... | ... | ... |

Flag any metric where data quality is Estimated or Unknown. Grades on unknown data are not grades — they're guesses. Name the gap and how to close it.

---

### Step 2 — OKR Grading (all FISH levels)

Grade each OKR. Use Google's 0.0–1.0 scale:

| Grade | Meaning |
|---|---|
| 1.0 | Fully achieved — consider whether target was set too low |
| 0.7–0.9 | Strong — this is the target zone; 0.7 is a good result |
| 0.4–0.6 | Partial — meaningful progress but fell short |
| 0.0–0.3 | Missed — either execution failed or the target was wrong |

For each Objective, grade each Key Result. Then derive the Objective letter grade:

| OKR Average | Letter |
|---|---|
| 0.7–1.0 | A |
| 0.5–0.69 | B |
| 0.3–0.49 | C |
| < 0.3 | D/F |

**Format per OKR:**
```
Objective: [statement]
Grade: [letter]

  KR 1: [statement]
  Baseline: [X] → Target: [Y] → Actual: [Z]
  Grade: [0.0–1.0]
  What drove this result: [1–2 sentences]

  KR 2: ...
```

**Important**: separate "was the target wrong?" from "did we fail to execute?" Both land at a low grade, but they have different implications.

---

### Step 3 — North Star Metric Review (all FISH levels)

Is the north star metric moving in the right direction?

```
North Star: [metric name]
Before launch: [baseline]
After launch (30 days): [actual]
After launch (90 days): [actual or projected]
Direction: [↑ / ↓ / flat]
Significance: [is this within normal variance, or a real signal?]
```

If the north star is flat or declining despite a shipped feature: this is a signal that either the feature didn't address the real problem, or the metric is the wrong north star. Name which hypothesis you hold.

---

### Step 4 — Start / Stop / Continue (Nemo, Tuna)

The fastest retrospective format. For each:

**Start**: things we should begin doing that we weren't doing
- Be specific — "better communication" is not actionable. "Write a one-pager before any meeting with more than 4 people" is.

**Stop**: things we should stop doing
- Name the cost of continuing — why does this matter to stop?

**Continue**: things that worked and should be protected
- Often skipped in retrospectives — don't skip it. What worked is as important as what didn't.

Produce 3 items per category. Every item is actionable, specific, and has an implied owner.

---

### Step 5 — Assumption Audit (Tuna, Salmon, Willy)

Pull the assumption log from Define phase. For each assumption:

| Assumption | What we believed | What actually happened | Was it right? | Implication |
|---|---|---|---|---|
| [Assumption text] | [our bet] | [what data showed] | Yes/No/Partially | [what this changes] |

Then: which assumptions being wrong explains the OKR misses? This is the most important insight from the retrospective — it tells you whether to blame execution or strategy.

**Pattern to look for:** if 3+ assumptions in the same category were wrong (e.g., all user behavior assumptions were wrong), it's a signal that discovery was insufficient. That's a methodology gap, not just a product miss.

---

### Step 6 — Lessons Learned (Tuna, Salmon, Willy)

Not just "what went wrong" — lessons learned are the reusable insights that change how you work next time.

Format each lesson:
```
Lesson: [one sentence — the insight]
Evidence: [what happened that taught you this]
Applies to: [what future work this should change]
Action: [specific change to process, method, or tooling]
Owner: [who implements this change]
```

Produce 5 lessons (Tuna) or 8 lessons (Salmon/Willy). Balance: at least 2 lessons about what worked (often ignored).

---

### Step 7 — Decision Log Update (Salmon, Willy)

After a launch and retrospective, some prior decisions are confirmed and some are invalidated. Update the decision log.

For each relevant decision from the decision log:

**Confirmed decisions** (evidence supports the original call):
- Decision: [title]
- Evidence: [what we saw that confirms this was right]
- Status: remains Closed, now with validation evidence

**Invalidated decisions** (evidence contradicts the original call):
- Decision: [title]
- What we got wrong: [specific]
- New decision needed: [what should now be decided]
- Status: flag as Superseded — open a new decision

**New decisions created by what we learned:**
- [Decision that must now be made based on retrospective findings]

---

### Step 8 — Kill / Continue / Pivot (all FISH levels)

The hardest call. Make it explicitly, not implicitly.

**Framework:**
1. Does the problem we set out to solve still exist? (Yes / No / Changed)
2. Did our solution move the north star? (Yes / No / Too early to tell)
3. Is the team and market still right for this? (Yes / No / Changed)

**Decision tree:**
- Problem still exists + north star moved → **Continue** (double down)
- Problem still exists + north star flat → **Pivot** (solution is wrong, not the problem)
- Problem still exists + north star declined → **Pivot** (or validate that metric is right)
- Problem no longer exists → **Kill** (or find the new problem)
- Market or team fundamentally changed → **Reassess** (before deciding)

State the decision explicitly. Then:

```
Decision: [Kill / Continue / Pivot]
Rationale: [2–3 sentences connecting to the evidence]
If Continue: next OKR set [draft]
If Pivot: new direction hypothesis [one sentence] + next validation step
If Kill: what we're shutting down, by when, and how we communicate it
```

---

### Step 9 — Exec Summary (Willy only)

One-page summary for leadership:

```
What we shipped: [one sentence]
What we expected: [top 2 OKRs]
What we got: [actual results]
Overall grade: [A/B/C/D]

Top insight: [the single most important thing we learned]
Decision: [Kill / Continue / Pivot] — [one sentence rationale]
Ask of leadership: [what you need from them to execute the decision]
```

---

### Final Output

**Data availability table** — what we know vs. what we're guessing
**OKR grades** — 0.0–1.0 per KR, letter grade per Objective
**North star review** — direction, significance, interpretation
**Start/Stop/Continue** — 3 per category, actionable (Nemo/Tuna)
**Assumption audit** — what we got right and wrong, pattern identification (Tuna+)
**Lessons learned** — 5–8 reusable insights with actions and owners (Tuna+)
**Decision log updates** — confirmed, invalidated, new decisions needed (Salmon+)
**Kill/Continue/Pivot** — explicit decision with rationale and next step
**Exec summary** (Willy)
**Recommended next skill** — `/ds-product-opportunity-landscape` (if pivoting) or `/ds-product-problem-framing` (if continuing with new direction) with one-sentence reason
