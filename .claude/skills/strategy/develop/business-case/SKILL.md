---
name: ds-strategy-business-case
description: Builds a business case with problem, solution options, NPV/IRR/payback period, sensitivity analysis, risk matrix, and recommendation. Use when seeking investment or approval, justifying a major initiative, or asking "why should we do this and what does it take". Also triggers on: ROI model, cost-benefit analysis, NPV calculation, IRR, sensitivity analysis, payback period.
tags: [strategy, develop, business-case, npv, irr, roi, sensitivity-analysis, cost-benefit]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Business Case
**Domain**: Strategy | **Phase**: Develop | **Invocation**: `/ds-strategy-business-case`

## What this produces
A business case document with problem statement, solution options, financial model (NPV/IRR/payback period), sensitivity analysis, risk matrix, assumptions log, and a clear recommendation a decision-maker can act on.

## Methods
Problem articulation, solution options analysis, cost-benefit analysis, NPV/IRR calculation, payback period, sensitivity analysis, risk identification and scoring, assumptions documentation, recommendation framing

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean case | Problem + solution + high-level ROI + recommendation |
| Tuna | Standard case | Full cost-benefit + risk + assumptions + recommendation |
| Salmon | Investment case | Financial model + sensitivity analysis + risk matrix |
| Willy | Board case | All methods + NPV/IRR + scenario analysis + stakeholder alignment |

---

## Execution Prompt

Read the project context: the initiative being evaluated, available data, investment required, decision timeline, FISH classification.

---

### Step 1 — Problem Statement and Strategic Alignment (all FISH levels)

```
Problem: [One paragraph — what's broken, who's affected, what it costs if nothing changes]
Cost of inaction: [quantified if possible — market share lost, revenue at risk, efficiency cost]
Strategic alignment: [which strategic priority this initiative serves]
Decision required: [what approval is needed — budget, headcount, timeline]
Decision deadline: [when the decision must be made and why]
```

---

### Step 2 — Options Considered (all FISH levels)

Never present a business case with only one option — it becomes advocacy, not analysis.

| Option | Description | Est. Cost | Est. Value | Recommendation |
|---|---|---|---|---|
| Option 0 | Do nothing | $0 | [quantify opportunity cost] | Rejected — [why] |
| Option A | [Minimal approach] | $X | $Y | [Considered] |
| Option B | [Recommended approach] | $X | $Y | **Recommended** |
| Option C | [Maximum approach] | $X | $Y | [Considered] |

State the criteria used to choose between options — don't just assert the recommendation.

---

### Step 3 — Financial Model (all FISH levels)

**Summary table (Nemo):**
```
Investment required: $[X]
Expected benefit: $[Y] over [N] years
ROI: [Y/X × 100]%
Payback period: [Z months]
```

**Full model (Tuna+):**

| | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|---|
| **Investment** | | | | | |
| Implementation | $(X) | — | — | — | $(X) |
| Ongoing costs | — | $(Y) | $(Y) | $(Y) | $(3Y) |
| **Benefits** | | | | | |
| [Revenue gain / Cost reduction] | — | $A | $B | $C | $(A+B+C) |
| **Net cash flow** | $(X) | A-Y | B-Y | C-Y | |
| **Cumulative** | $(X) | | | | |

**Payback period:** the month when cumulative cash flow crosses zero.

**NPV (Salmon, Willy):**
```
NPV = Σ [Cash flow(t) / (1 + discount rate)^t] − Initial investment
Discount rate: [X% — company's WACC or required rate of return]
NPV: $[X] — [positive = value-creating / negative = value-destroying]
```

**IRR (Willy):** the discount rate at which NPV = 0. If IRR > WACC, the investment creates value.

---

### Step 4 — Sensitivity Analysis (Salmon, Willy)

A single financial forecast is always wrong. Show how the recommendation holds under different assumptions.

**Key variables to stress-test:**
```
Base case assumptions:
  Revenue growth: [X]% per year
  Cost reduction: [Y]% in year 1
  Implementation cost: $[Z]
  
Sensitivity table:
                    Pessimistic (-30%)  Base Case  Optimistic (+30%)
ROI:                [X]%               [Y]%       [Z]%
Payback period:     [X] months         [Y] months [Z] months
NPV:                $[X]               $[Y]       $[Z]
```

**Break-even analysis:** "The initiative breaks even if revenue grows by at least X% — we believe this is [conservative/achievable/aggressive] because [evidence]."

---

### Step 5 — Risk Matrix (all FISH levels)

| Risk | Probability (H/M/L) | Impact (H/M/L) | Mitigation | Residual risk |
|---|---|---|---|---|
| [Implementation delay] | M | H | [Phased delivery] | M |
| [Lower adoption than projected] | H | H | [Change management plan] | M |
| [Technology risk] | L | H | [PoC before full investment] | L |

**Rule:** every High Impact risk needs a mitigation regardless of probability. The expected cost of a risk = Probability × Impact — this informs how much to invest in mitigation.

---

### Step 6 — Assumptions Log (Tuna, Salmon, Willy)

The financial model is only as good as its assumptions. Make them explicit.

| Assumption | Value | Confidence | Source | What if wrong? |
|---|---|---|---|---|
| [Market growth rate] | [X]%/year | Medium | [Industry report] | [NPV drops by $Y] |
| [Implementation time] | [X] months | High | [Vendor estimate + 20%] | [Delays payback by Z months] |

---

### Step 7 — Recommendation (all FISH levels)

```
Recommendation: [Go / No-go / Go with conditions]
Rationale: [2-3 sentences connecting evidence to recommendation — not a summary of the model]
Conditions: [what must be true for this to proceed]
Decision required: [specific approval, budget, headcount]
Next step if approved: [first action within 48 hours]
```

---

### Final Output

**Problem statement** — quantified cost of inaction
**Options considered** — with criteria for selection
**Financial model** — cost-benefit, payback period (all FISH)
**NPV/IRR calculation** — with discount rate rationale (Salmon+)
**Sensitivity analysis** — pessimistic/base/optimistic (Salmon+)
**Risk matrix** — with mitigations for High Impact risks
**Assumptions log** — with confidence and data source (Tuna+)
**Recommendation** — Go/No-go/Conditional, with conditions and next step
**Recommended next skill** — `/ds-strategy-strategic-roadmap` (if approved) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
