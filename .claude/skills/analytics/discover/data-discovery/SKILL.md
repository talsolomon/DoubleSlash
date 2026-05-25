---
name: ds-analytics-data-discovery
description: Maps available data sources, quality, and gaps relative to business questions. Use when starting an analytics initiative, inheriting a data environment, or asking "what data do we actually have". Also triggers on: data source cataloging, data quality assessment (completeness, accuracy, freshness, consistency), lineage mapping, business question to data mapping.
tags: [analytics, discover, data-discovery, data-quality, lineage, data-catalog]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Data Discovery
**Domain**: Analytics | **Phase**: Discover | **Invocation**: `/ds-analytics-data-discovery`

## What this produces
A data inventory with source catalog, quality scores across 4 dimensions, gap analysis vs. business questions, lineage map, and readiness assessment.

## Methods
Data source cataloging, schema documentation, data quality assessment (completeness, accuracy, freshness, consistency), lineage mapping, business question to data mapping, gap identification, data trust scoring

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick inventory | Source catalog + top 3 quality issues + gap summary |
| Tuna | Full discovery | Quality assessment + business question mapping |
| Salmon | Deep discovery | All above + lineage map + trust scores per source |
| Willy | Data platform audit | All methods + full schema docs + completeness audit |

---

## Execution Prompt

Read the project context: the business questions to answer, available data environment, team and tooling context, FISH classification.

---

### Step 1 — Data Source Catalog (all FISH levels)

| Source | Type | Owner | Tables/Schemas | Update frequency | Access |
|---|---|---|---|---|---|
| [Production DB] | Transactional | Engineering | users, orders, payments | Real-time | DBA approval |
| [CRM — Salesforce] | CRM | Sales | leads, opportunities | Nightly sync | Read-only |
| [Segment → BigQuery] | Event stream | Data team | events, users | 1-hour lag | BigQuery role |
| [Stripe] | Payment data | Finance | charges, subscriptions | Webhook | API key |

---

### Step 2 — Data Quality Assessment (all FISH levels)

Score each source on 4 dimensions:

| Dimension | Definition | Score (1-5) |
|---|---|---|
| **Completeness** | Are all expected records present? No nulls in required fields? | |
| **Accuracy** | Do values match reality? Can you verify a sample? | |
| **Freshness** | Is data current enough for the decisions it informs? | |
| **Consistency** | Does the same entity look the same across sources? | |

**For each low-scoring dimension (≤ 2), document:**
```
Source: [name]
Dimension: [completeness/accuracy/freshness/consistency]
Issue: [specific — e.g., "user_id is null in 12% of event records"]
Impact: [what business questions this breaks]
Root cause: [why this happens — SDK bug, ETL gap, manual process]
Fix: [specific remediation]
```

---

### Step 3 — Business Question to Data Mapping (Tuna, Salmon, Willy)

For each key business question, assess whether the data exists to answer it.

| Business question | Data needed | Available? | Quality | Gaps |
|---|---|---|---|---|
| "What is our 30-day retention?" | Events with user_id + timestamps | ✅ | High | Need cohort definition standardized |
| "Which channel drives highest LTV?" | Orders + acquisition source | ⚠️ | Medium | Attribution model missing for organic |
| "What features correlate with churn?" | Feature usage + subscription end | ❌ | — | Feature usage not tracked |

**Prioritize by impact:** business questions tied to active product decisions are P1. Questions about historical context are P2. Nice-to-knows are P3.

---

### Step 4 — Lineage Map (Salmon, Willy)

For each key metric, trace the data lineage from raw source to reported number.

```
Metric: [name — e.g., "Monthly Active Users"]

Raw source: Production DB → users table
  ↓ ETL (nightly, dbt model: stg_users)
  ↓ Transformation (active = logged in within 30 days)
  ↓ Aggregation (COUNT DISTINCT user_id per month)
  ↓ Loaded to: BigQuery → analytics.monthly_active_users
  ↓ Reported in: [Dashboard / Mixpanel / weekly report]
  
Known issues in lineage:
  - [ETL fails silently on weekends — no alerting — data for Sat/Sun may be stale]
  - [Definition of "active" changed 2024-03 — historical comparison broken]
```

Lineage maps reveal where data can break undetected and why metrics diverge between tools.

---

### Step 5 — Data Readiness Report (all FISH levels)

```
Question: [Business question]
Readiness: Ready / Partially ready / Not ready
Blocker: [What prevents answering this today]
Effort to unblock: [S / M / L]
Recommendation: [Build / Buy / Borrow / Deprioritize]
```

**Overall data environment grade:**
| Grade | Description |
|---|---|
| A | Data is reliable, fresh, well-defined, and answers 80%+ of key business questions |
| B | Mostly reliable with documented gaps; can answer most questions with caveats |
| C | Significant trust issues; analysis requires heavy validation; major gaps exist |
| D | Data cannot be trusted for decisions without significant remediation first |

---

### Final Output

**Data source catalog** — sources, owners, freshness, access
**Quality scores** — 4 dimensions per source, issues documented
**Business question mapping** — data availability and quality per question (Tuna+)
**Lineage map** — for key metrics (Salmon+)
**Data readiness report** — per business question with effort to unblock
**Overall grade** — A/B/C/D with prioritized remediation
**Recommended next skill** — `/ds-analytics-kpi-definition` (formalize metrics) or `/ds-analytics-analytics-implementation` (fix tracking) with one-sentence reason
