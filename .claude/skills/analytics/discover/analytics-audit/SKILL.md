---
name: ds-analytics-analytics-audit
description: Audits the current analytics setup for tracking gaps, metric inconsistencies, and tooling debt. Use when data doesn't match intuition, before a re-instrumentation, or asking "can we trust our numbers". Also triggers on: event tracking coverage review, metric definition audit, funnel integrity check, data trust scoring, discrepancy investigation.
tags: [analytics, discover, analytics-audit, data-trust, funnel-integrity, metric-audit]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Analytics Audit
**Domain**: Analytics | **Phase**: Discover | **Invocation**: `/ds-analytics-analytics-audit`

## What this produces
An analytics audit report with data trust scores per metric, tracking coverage map, funnel integrity assessment, tooling gaps, and a prioritized remediation list.

## Methods
Event tracking coverage review, metric definition audit, funnel integrity check, tool stack inventory, data pipeline review, discrepancy investigation, tagging and taxonomy review, reporting accuracy check

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Trust check | Trust score per key metric + top 5 gaps + severity |
| Tuna | Full audit | Coverage map + funnel integrity + tool stack review |
| Salmon | Deep audit | All above + pipeline review + discrepancy root causes |
| Willy | Analytics platform audit | All methods + taxonomy review + full remediation plan |

---

## Execution Prompt

Read the project context: current analytics setup, metrics relied upon for decisions, known data issues, business questions analytics is expected to answer, FISH classification.

---

### Step 1 — Metric Trust Scoring (all FISH levels)

Before auditing the setup, establish trust scores for the metrics that matter most.

**Trust score per metric (0–10):**

| Metric | Defined? | Collected correctly? | Consistent across tools? | Fresh? | Trust Score |
|---|---|---|---|---|---|
| [Metric name] | Y/N | Y/N | Y/N | Y/N | 0–10 |

**Scoring guide:**
- -3 if no written definition (different people calculate it differently)
- -2 if collection method not verified (assume tracking fires when it should)
- -2 if inconsistent across tools (Mixpanel says X, Google Analytics says Y)
- -2 if stale beyond acceptable freshness window
- -1 if no owner who is accountable for accuracy

**Trust threshold:** < 7 = don't make decisions from this metric without investigation. < 4 = stop reporting this metric until fixed.

---

### Step 2 — Tracking Coverage Map (Tuna, Salmon, Willy)

Map every user action against its tracking status.

| User action | Tracked? | Where? | Event name | Properties captured | Issues |
|---|---|---|---|---|---|
| [Sign up] | ✅ | Segment → Mixpanel | user_signed_up | user_id, plan, source | — |
| [Checkout complete] | ⚠️ | GA4 only | purchase | amount, item | Missing user_id |
| [Feature X used] | ❌ | Not tracked | — | — | No event exists |

**Coverage target by action type:**
- Acquisition events (sign-up, first use): 100% coverage required
- Core product actions: > 90% coverage
- Edge case / error events: > 70% coverage

---

### Step 3 — Funnel Integrity Check (all FISH levels)

For each critical funnel, verify that the numbers add up.

```
Funnel: [name — e.g., Sign-up → Activation]

Step | Unique users | Conversion | Sanity check
[Step 1] | N | — | Is this number plausible?
[Step 2] | N | X% | Is step 2 ≤ step 1? (If not: double-counting or tracking error)
[Step 3] | N | X% | Does this match platform data?

Funnel issues found:
  - [Step 3 shows more users than Step 2 — impossible, indicates double-tracking]
  - [Step 4 drop-off = 80% — much higher than expected, investigate whether event fires correctly]
```

---

### Step 4 — Tool Stack Inventory (Tuna, Salmon, Willy)

| Tool | Purpose | Data collected | Integration | Issues |
|---|---|---|---|---|
| [Segment] | CDP / event routing | All client events | → Mixpanel, BigQuery | Schema drift in v2 |
| [Mixpanel] | Product analytics | Routed from Segment | — | User identity mismatches |
| [BigQuery] | Data warehouse | All events + CRM | — | 2 tables undocumented |

**Duplication audit:** is the same event being tracked in multiple tools independently? Duplication inflates counts and creates discrepancy.

---

### Step 5 — Remediation Priority List (all FISH levels)

| Issue | Severity | Metric(s) affected | Effort | Priority |
|---|---|---|---|---|
| [Missing sign-up user_id] | Critical | DAU, retention | Low | P1 |
| [Funnel double-tracking] | High | Activation rate | Medium | P1 |
| [3 events with no owner] | Medium | Attribution | Low | P2 |

**Rule:** P1 issues (affecting any metric relied on for product or business decisions) must be fixed before any new analytics work. Building on broken data = wasted effort.

---

### Final Output

**Trust scores** — per metric, with rationale for low scores
**Tracking coverage map** — actions vs. events, gaps highlighted (Tuna+)
**Funnel integrity report** — sanity check per funnel step
**Tool stack inventory** — with duplication and integration issues (Tuna+)
**Remediation priority list** — P1/P2/P3, with effort and metric impact
**Recommended next skill** — `/ds-analytics-data-discovery` (map all available data) or `/ds-analytics-kpi-definition` (fix definitions first) with one-sentence reason
