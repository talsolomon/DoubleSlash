---
name: ds-analytics-data-retrospective
description: Reviews analytics infrastructure and data quality for the period. Use at quarter-end, after a data incident, or asking "is our data getting better or worse". Also triggers on: data quality scoring, pipeline reliability review, metric drift analysis, SLA tracking, data incident review, analytics team process review.
tags: [analytics, deliver, data-retrospective, data-quality, pipeline-reliability, metric-drift]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Data Retrospective
**Domain**: Analytics | **Phase**: Deliver | **Invocation**: `/ds-analytics-data-retrospective`

## What this produces
A data retrospective with data quality scores, pipeline reliability metrics, incident review with root causes, metric drift analysis, and an improvement roadmap for next period.

## Methods
Data quality scoring, incident and data error review, pipeline reliability review, metric drift analysis, tooling performance assessment, team process review, improvement backlog building

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick health check | Quality scores + top 3 incidents + 3 improvements |
| Tuna | Standard retro | Quality + reliability + drift analysis |
| Salmon | Deep retro | All above + tooling assessment + process review |
| Willy | Analytics platform review | All methods + incident log + full improvement roadmap |

---

## Execution Prompt

Read the project context: data quality metrics for the period, incident log, pipeline reliability data, team retrospective input, FISH classification.

---

### Step 1 — Data Quality Scorecard (all FISH levels)

Score each data source and key metric on quality dimensions.

| Source / Metric | Completeness | Accuracy | Freshness | Consistency | Overall |
|---|---|---|---|---|---|
| [Production DB] | 9/10 | 9/10 | 10/10 | 8/10 | **9.0** |
| [Event stream] | 7/10 | 8/10 | 9/10 | 6/10 | **7.5** |
| [CRM sync] | 6/10 | 7/10 | 6/10 | 5/10 | **6.0** |

**Quality trend:** is overall quality improving, declining, or flat vs. prior period?

**Threshold:** any source below 7.0 overall requires a remediation plan in the improvement roadmap. Any source below 5.0 should have data usage restricted until fixed.

---

### Step 2 — Pipeline Reliability Review (Tuna, Salmon, Willy)

| Pipeline | Uptime % | Incidents | Avg recovery time | SLA met? |
|---|---|---|---|---|
| [Segment → BigQuery] | 99.2% | 2 | 45 min | ✅ SLA: 99% |
| [dbt daily run] | 97.1% | 5 | 2 hours | ❌ SLA: 99% |
| [CRM nightly sync] | 94.3% | 8 | 4 hours | ❌ SLA: 98% |

**SLA definition for data pipelines:**
- Uptime: % of scheduled runs that complete successfully
- Recovery time: time from failure detection to data available
- Data freshness SLA: maximum acceptable lag before alert

---

### Step 3 — Incident Review (all FISH levels)

For each data incident in the period:

```
Incident: [description — e.g., "Revenue metric showed 40% spike for 3 days"]
Date: [when occurred]
Duration: [how long affected]
Impact: [which reports or decisions were affected]
Root cause: [what caused it — data bug, code change, source change]
Detection: [how was it caught — alert / user report / routine check]
Time to detection: [X hours/days from occurrence]
Resolution: [what was done to fix]
Prevention: [what change prevents recurrence]
```

**Detection gap analysis:** was this caught by monitoring or by a user? Incidents caught by users = monitoring gap. Build the alert that would have caught this first.

---

### Step 4 — Metric Drift Analysis (Tuna, Salmon, Willy)

Metric drift = a metric's calculation changes over time without explicit decision to change it.

Common causes: schema changes in source systems, new user segments included/excluded, SDK changes, tool version updates.

| Metric | This period trend | Expected trend | Drift detected? | Suspected cause |
|---|---|---|---|---|
| [DAU] | +3%/week | +2%/week | ⚠️ Slight | [New bot detection removed synthetic users] |
| [Conversion rate] | -8% sudden | Stable | ❌ Significant | [Definition change in CRM — contacts now includes leads] |

**For each significant drift:** produce a formal investigation and, if real, update the metric definition with the change date noted.

---

### Step 5 — Improvement Roadmap (all FISH levels)

| Improvement | Category | Impact | Effort | Owner | Quarter |
|---|---|---|---|---|---|
| [Add alerting for dbt run failures] | Pipeline | High | Low | [Data eng] | Q3 |
| [Fix CRM sync error handling] | Reliability | High | Medium | [Data eng] | Q3 |
| [Standardize event naming taxonomy] | Data quality | Medium | High | [Data team] | Q4 |

Sort by: High Impact + Low Effort first (quick wins). High Impact + High Effort next (projects for next quarter).

---

### Final Output

**Data quality scorecard** — per source, trend vs. prior period
**Pipeline reliability** — uptime, incidents, SLA compliance (Tuna+)
**Incident review** — root causes, detection gaps, prevention (all FISH)
**Metric drift analysis** — changes detected, investigated, documented (Tuna+)
**Improvement roadmap** — prioritized, with owners and quarters
**Recommended next skill** — `/ds-analytics-analytics-audit` (if quality issues are significant) with one-sentence reason
