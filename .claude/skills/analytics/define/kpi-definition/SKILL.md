---
name: ds-analytics-kpi-definition
description: Writes precise KPI definitions with formulas, data sources, edge cases, targets, and owners. Use when formalizing metrics, creating a KPI dictionary, or asking "exactly how is this number calculated". Also triggers on: metric formula writing, SMART criteria, leading vs. lagging indicator, counter-metric, target-setting methodology.
tags: [analytics, define, kpi-definition, metric-formula, smart-criteria, counter-metrics]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# KPI Definition
**Domain**: Analytics | **Phase**: Define | **Invocation**: `/ds-analytics-kpi-definition`

## What this produces
A KPI dictionary with precise formulas, data sources, edge case handling, targets with benchmark rationale, owners, reporting cadence, and known limitations — specific enough that two analysts independently produce the same number.

## Methods
Metric formula writing, data source specification, edge case documentation, SMART criteria, target-setting methodology, benchmark research, counter-metric definition, owner assignment, reporting cadence design

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core KPIs | 5 KPI definitions with formulas and targets |
| Tuna | KPI dictionary | Definitions + sources + owners + cadence |
| Salmon | Complete dictionary | All above + edge cases + counter-metrics + benchmarks |
| Willy | KPI governance | All methods + review process + limitation documentation |

---

## Execution Prompt

Read the project context: list of metrics to define, data environment, business goals these metrics serve, FISH classification.

---

### Step 1 — KPI Definition Template (all FISH levels)

**Standard KPI definition format:**

```
KPI: [Official name — use this name everywhere, no synonyms]

Definition: [Plain English — what this metric measures and why it matters]

Formula:
  Numerator: [exact calculation, including filtering conditions]
  Denominator: [exact calculation]
  Result: [Numerator / Denominator × 100 (if percentage)]
  
Example: "30-Day Retention Rate = (Users who logged in at least once in days 8–37 after sign-up) / (Users who signed up in a given cohort) × 100"

Data sources:
  Primary: [table.column — e.g., production_db.users.last_login_at]
  Supporting: [if multiple sources are joined]
  
Filtering conditions:
  Include: [who counts — e.g., "users who completed onboarding"]
  Exclude: [who doesn't — e.g., "internal test accounts, users with is_staff = true"]
  
Grain: [per user / per session / per day / per cohort]
Time window: [rolling 30 days / calendar month / cohort-based]

Target: [X] by [date]
  Basis for target: [benchmark / historical growth rate / strategic goal]
  Trajectory: [where this should be in 6 months and 12 months]

Owner: [who is accountable for this metric — one person]
Reporting cadence: [daily / weekly / monthly]
Reviewed in: [which dashboard / report / meeting]
```

---

### Step 2 — Edge Case Documentation (Salmon, Willy)

**Common edge cases to document per metric:**

```
Edge case: [what situation]
Handling: [how to treat it in the formula]
Rationale: [why this treatment]

Examples:
  "User who signs up and churns same day" → excluded from retention calculation after Day 0
  "User who deletes and re-creates account" → treated as new user with new user_id
  "Refunded transaction" → excluded from revenue calculation on refund date
  "Duplicate events due to SDK bug" → deduplicated by event_id before counting
```

---

### Step 3 — Leading vs. Lagging Classification (Tuna, Salmon, Willy)

| KPI | Type | Leads by | What it predicts |
|---|---|---|---|
| [Daily Active Users] | Lagging | — | Current engagement state |
| [Feature adoption rate] | Leading | ~30 days | Future retention rate |
| [Support ticket volume] | Leading | ~14 days | NPS and churn risk |
| [Onboarding completion] | Leading | ~60 days | 90-day retention |

**Why this matters:** lagging metrics tell you what happened. Leading metrics tell you what's about to happen. Strategy optimizes both — not just the lagging metrics that leadership watches.

---

### Step 4 — Counter-Metrics (Salmon, Willy)

Every primary metric should have a counter-metric that catches gaming or narrow optimization.

| Primary metric | Counter-metric | Why |
|---|---|---|
| DAU | Session quality / depth | Prevents optimizing notifications that inflate sessions |
| Conversion rate | Refund rate / churn rate | Catches conversions that don't stick |
| Support ticket resolution time | CSAT on resolution | Fast resolution doesn't mean good resolution |
| Feature adoption | Feature abandonment rate | High adoption + high abandonment = the feature is a dead end |

---

### Step 5 — SMART Criteria Check (all FISH levels)

Each KPI must pass the SMART test:
- **S**pecific: is the formula unambiguous?
- **M**easurable: can it be calculated from available data?
- **A**chievable: is the target realistic given current baseline?
- **R**elevant: does it connect to a business decision or outcome?
- **T**ime-bound: does it have a reporting cadence and target date?

Flag any KPI that fails SMART — it's either not ready to use or the target needs revision.

---

### Final Output

**KPI definitions** — full template per metric, all edge cases documented
**Leading/lagging classification** — with prediction linkages (Tuna+)
**Counter-metrics** — one per primary KPI (Salmon+)
**SMART check** — pass/fail per KPI
**KPI dictionary** — formatted for team documentation
**Recommended next skill** — `/ds-analytics-measurement-framework` (build the hierarchy) or `/ds-analytics-analytics-implementation` (instrument these KPIs) with one-sentence reason
