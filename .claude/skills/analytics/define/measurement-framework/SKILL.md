---
name: ds-analytics-measurement-framework
description: Defines what to measure, why, and how — connecting metrics to business outcomes through a metric hierarchy. Use when building an analytics strategy, aligning a team on success, or asking "what metrics actually matter and why". Also triggers on: input/output/outcome/impact hierarchy, north star metric, counter-metrics, instrumentation requirements.
tags: [analytics, define, measurement-framework, north-star, metric-hierarchy, input-output-outcome]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Measurement Framework
**Domain**: Analytics | **Phase**: Define | **Invocation**: `/ds-analytics-measurement-framework`

## What this produces
A measurement framework with north star metric, metric hierarchy (Input → Output → Outcome → Impact), leading/lagging indicators, counter-metrics, ownership map, and instrumentation requirements.

## Methods
Outcome-to-metric mapping, metric hierarchy design, north star metric definition, leading/lagging indicator identification, counter-metric definition, instrumentation requirements, metric ownership assignment, data collection specification

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core framework | North star + 3 supporting metrics + outcome linkage |
| Tuna | Full framework | Metric hierarchy + leading/lagging + ownership |
| Salmon | Complete framework | All above + counter-metrics + instrumentation requirements |
| Willy | Analytics system | All methods + ownership map + metric glossary + review process |

---

## Execution Prompt

Read the project context: business objectives, product or feature scope, available or planned data sources, team context, FISH classification.

---

### Step 1 — North Star Metric (all FISH levels)

The north star metric is the single number that best captures the value delivered to users. Everything else is in service of it.

**Selection criteria:**
- Measures the core user action (not company output like revenue — the thing users do that creates value)
- Correlates with long-term business health (retention, growth)
- Can be influenced by the team's work
- Is specific enough to disagree about (not "engagement")

**North star candidates — pick one:**
```
Candidate: [metric name]
Formula: [exact calculation]
Argument for: [why this captures core value]
Argument against: [what it misses or could be gamed]
```

**Once selected:**
```
North star: [metric]
Formula: [formula]
Current value: [baseline]
12-month target: [target]
Rationale: [why this is the right north star — what user value it captures]
```

---

### Step 2 — Metric Hierarchy (Tuna, Salmon, Willy)

The metric hierarchy maps the causal chain from user actions to business outcomes.

```
Level 4 — Impact (business outcome):
  [Revenue / Market share / Customer lifetime value]
  ↑ driven by
  
Level 3 — Outcome (user behavior change):
  [Retention / Activation / Referral]
  ↑ driven by
  
Level 2 — Output (product delivery):
  [Feature adoption / Task completion / Sessions per user]
  ↑ driven by
  
Level 1 — Input (team activity):
  [Features shipped / Experiments run / Support resolution time]
```

**For each metric in the hierarchy:**
- Name the causal link: "If [Level N metric] increases, we expect [Level N+1 metric] to increase because [mechanism]"
- Name the lag: how many days/weeks before the lower-level change shows up in the higher-level metric?

---

### Step 3 — Metric Decision Matrix (all FISH levels)

For each metric, identify the decision it enables. If a metric doesn't change a decision, cut it.

| Metric | Who uses it | Decision it enables | Action threshold |
|---|---|---|---|
| [North star metric] | Leadership | Overall strategy direction | < target for 2 quarters → strategic review |
| [Feature adoption] | PM | Invest / iterate / abandon feature | < 20% adoption at 30 days → investigate |
| [Error rate] | Engineering | Rollback / patch / monitor | > 2% → incident response |
| [NPS] | Product / CS | Roadmap prioritization | Decrease > 5 points → root cause analysis |

---

### Step 4 — Counter-Metrics (Salmon, Willy)

For each metric optimized by the team, define a counter-metric that catches narrow optimization.

| Metric | Counter-metric | Why needed |
|---|---|---|
| [Sessions per user] | [Task completion rate per session] | More sessions ≠ more value if users are failing |
| [Feature adoption rate] | [Feature abandonment after first use] | Adoption without retention = wasted development |
| [Conversion rate] | [30-day churn rate] | Fast conversions may attract wrong-fit users |

---

### Step 5 — Instrumentation Requirements (Tuna, Salmon, Willy)

What must be tracked to measure the metrics in this framework?

| Metric | Required events | Required properties | Source | Status |
|---|---|---|---|---|
| [Retention] | session_started | user_id, timestamp | SDK | ✅ Exists |
| [Feature adoption] | feature_X_used | user_id, feature_name, context | SDK | ❌ Not tracked |
| [NPS] | survey_submitted | user_id, score, comment, trigger | Survey tool | ⚠️ Missing user_id |

**Instrumentation priority:** highest-priority metrics (north star, directly tied to strategy) must be instrumented before lower-tier metrics. Don't let perfect instrumentation block measurement of what matters most.

---

### Final Output

**North star metric** — with formula, baseline, target, and rationale
**Metric hierarchy** — 4 levels with causal linkages and lags (Tuna+)
**Decision matrix** — what each metric enables, action thresholds
**Counter-metrics** — one per optimized metric (Salmon+)
**Instrumentation requirements** — events, properties, source, status (Tuna+)
**Recommended next skill** — `/ds-analytics-analytics-implementation` (build the tracking) or `/ds-analytics-kpi-definition` (formalize individual metrics) with one-sentence reason
