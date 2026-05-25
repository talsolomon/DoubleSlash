---
name: ds-analytics-reporting
description: Produces structured analytics reports with insights, trends, anomaly explanations, cohort analysis, and data-backed recommendations. Use when preparing a business review, presenting data, or asking "what does the data say and what should we do". Also triggers on: insight pyramid (observation-insight-recommendation), cohort analysis, anomaly detection, segment comparison.
tags: [analytics, deliver, reporting, insight-pyramid, cohort-analysis, anomaly-detection]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Reporting
**Domain**: Analytics | **Phase**: Deliver | **Invocation**: `/ds-analytics-reporting`

## What this produces
An analytics report with performance summary, insight pyramid (observation → insight → recommendation), anomaly flags with root cause hypotheses, cohort analysis, and specific data-backed recommendations.

## Methods
KPI performance summarization, insight pyramid, trend identification, anomaly detection and explanation, cohort analysis, segment comparison, insight prioritization, narrative writing

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Snapshot | KPI snapshot + top 3 insights + 2 recommendations |
| Tuna | Business report | Performance + trends + segment comparison + recommendations |
| Salmon | Full report | All above + cohort analysis + anomaly explanations |
| Willy | Executive report | Full narrative + supporting appendix + decision framework |

---

## Execution Prompt

Read the project context: KPI data for the period, comparison periods, audience, and decisions this report must inform, FISH classification.

---

### Step 1 — Performance Summary (all FISH levels)

**Format: every metric vs. target AND vs. prior period.**

| Metric | This period | vs. Target | vs. Prior period | Status |
|---|---|---|---|---|
| [North star metric] | [X] | [+Y% / -Y%] | [+Z% / -Z%] | ✅ / ⚠️ / ❌ |
| [Supporting metric 1] | [X] | [vs. target] | [vs. prior] | |

**Status coding:**
- ✅ Green: at or above target
- ⚠️ Yellow: within 10% of target or declining but above threshold
- ❌ Red: > 10% below target or below threshold

**Narrative:** 2-3 sentences on what the period summary tells us at a glance — not a list of what each number says, but what the pattern means.

---

### Step 2 — Insight Pyramid (all FISH levels)

Every finding follows the pyramid: Observation → Insight → Recommendation

**Don't describe data — interpret it.**

```
Finding [N]:

Observation: [What the data shows — specific, with numbers]
"Retention dropped from 42% to 34% in the Feb cohort vs. the Jan cohort."

Insight: [Why this happened — connect the observation to a cause]
"The Feb cohort was acquired primarily through a paid campaign targeting a different 
persona — these users completed onboarding at 60% vs. 78% for organic users, suggesting 
poor product-audience fit."

Recommendation: [Specific action — what to do, by when, who owns it]
"Pause the Feb campaign target segment until onboarding completion rate reaches > 70%. 
Owner: [PM name]. Decision by [date]."
```

Produce 3 findings (Nemo), 5 (Tuna), 7 (Salmon), 10 (Willy). Every finding that doesn't have a recommendation is incomplete.

---

### Step 3 — Anomaly Detection and Explanation (Tuna, Salmon, Willy)

An anomaly is any metric that deviates > 2 standard deviations from its expected value for the period.

```
Anomaly: [metric name]
Period: [when it occurred]
Deviation: [X% above/below expected range]

Hypotheses (list 2-3, ordered by likelihood):
1. [Most likely cause — with evidence]
2. [Alternative cause — with evidence or lack thereof]
3. [Data quality issue — rule out before acting]

Recommended next step: [validate hypothesis 1 by checking [specific data]]
Owner: [who investigates]
ETA: [by when — within 48 hours for metrics affecting key decisions]
```

---

### Step 4 — Cohort Analysis (Salmon, Willy)

Cohort analysis compares behavior of users grouped by their start date. It separates what's happening NOW from what's happening to DIFFERENT GROUPS of users.

```
Cohort analysis: [metric — e.g., 30-day retention]

Cohort   | Day 1 | Day 7 | Day 14 | Day 30 | Day 60 | Day 90
Jan 2026 | 100%  | 60%   | 45%    | 38%    | 32%    | 28%
Feb 2026 | 100%  | 55%   | 40%    | 34%    | —      | —
Mar 2026 | 100%  | 58%   | 43%    | —      | —      | —

Key finding: [e.g., "Feb cohort shows 10% lower Day 7 retention than Jan — this cohort 
was acquired during the paid campaign targeting non-ideal personas"]

Trend: [Is retention getting better or worse across cohorts? What's causing the change?]
```

---

### Step 5 — Segment Comparison (Tuna, Salmon, Willy)

Break the top-line metric into segments to find where performance is strong and weak.

**Segment dimensions:** acquisition channel / user type / geography / plan tier / device / cohort

```
Metric: [name] — This period: [X]

By segment:
  [Segment A]: [value] — [+/-X% vs. prior] [% of total]
  [Segment B]: [value] — [+/-X% vs. prior] [% of total]
  
Insight: [What the segmentation reveals that the top-line hides]
"The overall 5% decline in conversion is entirely driven by mobile users (-18%) while 
desktop users held flat (+1%). Mobile checkout needs investigation."
```

---

### Final Output

**Performance summary** — all key metrics vs. target and prior period
**Insight pyramid** — observation → insight → recommendation per finding
**Anomaly flags** — with hypotheses and next steps (Tuna+)
**Cohort analysis** — retention/engagement across cohorts (Salmon+)
**Segment comparison** — where top-line metrics are hiding performance differences (Tuna+)
**Decision brief** — the 3 specific decisions this report should drive (Willy)
**Recommended next skill** — `/ds-analytics-data-retrospective` (quarterly infrastructure review) with one-sentence reason
