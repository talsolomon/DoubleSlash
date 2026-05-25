---
name: ds-analytics-analytics-audit
description: Audits the current analytics setup for tracking gaps, metric inconsistencies, and tooling debt — producing trust scores, coverage map, funnel integrity assessment, and prioritized remediation list.
tags: [analytics, discover]
model: inherit
---

# Analytics Audit
**Domain**: Analytics | **Phase**: Discover | **Invocation**: `/ds-analytics-analytics-audit`

## What this produces
An analytics audit report with data trust scores per metric, tracking coverage map, funnel integrity assessment, tooling inventory, and a P1/P2/P3 remediation list.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Trust score per key metric + top 5 gaps + severity |
| Tuna | Coverage map + funnel integrity + tool stack review |
| Salmon | All above + pipeline review + discrepancy root causes |
| Willy | All methods + taxonomy review + full remediation plan |

---

## Execution Prompt

You are running an Analytics Audit for [project]. Establish whether the data can be trusted before any analysis or decision-making proceeds.

**Input**: current analytics setup, metrics relied on for decisions, known data issues, business questions analytics is expected to answer.

---

### 1. Metric Trust Scoring

Establish trust scores before auditing the setup.

**Trust score per metric (0–10):**

| Metric | Defined? | Collected correctly? | Consistent across tools? | Fresh? | Trust Score |
|---|---|---|---|---|---|
| [Metric name] | Y/N | Y/N | Y/N | Y/N | [0-10] |

**Scoring deductions:**
- -3 if no written definition (different people calculate it differently)
- -2 if collection method not verified
- -2 if inconsistent across tools (Mixpanel says X, Google Analytics says Y)
- -2 if stale beyond acceptable freshness window
- -1 if no owner accountable for accuracy

**Trust thresholds**: < 7 = don't make decisions from this metric without investigation. < 4 = stop reporting until fixed.

---

### 2. Tracking Coverage Map

Map every user action against its tracking status.

| User action | Tracked? | Where? | Event name | Properties captured | Issues |
|---|---|---|---|---|---|
| [Sign up] | ✅ | Segment → Mixpanel | user_signed_up | user_id, plan, source | — |
| [Checkout complete] | ⚠️ | GA4 only | purchase | amount, item | Missing user_id |
| [Feature X used] | ❌ | Not tracked | — | — | No event exists |

**Coverage targets by action type:**
- Acquisition events (sign-up, first use): 100% required
- Core product actions: > 90%
- Edge case / error events: > 70%

---

### 3. Funnel Integrity Check

For each critical funnel, verify the numbers add up.

```
Funnel: [name — e.g., Sign-up → Activation]

Step | Unique users | Conversion | Sanity check
[Step 1] | N | — | Is this number plausible?
[Step 2] | N | X% | Is step 2 ≤ step 1? (If not: double-counting or tracking error)
[Step 3] | N | X% | Does this match platform data?

Funnel issues found:
  - [Step 3 shows more users than Step 2 — impossible, indicates double-tracking]
  - [Step 4 drop-off = 80% — investigate whether event fires correctly]
```

---

### 4. Tool Stack Inventory

| Tool | Purpose | Data collected | Integration | Issues |
|---|---|---|---|---|
| [Segment] | CDP / event routing | All client events | → Mixpanel, BigQuery | Schema drift |
| [Mixpanel] | Product analytics | Routed from Segment | — | User identity mismatches |
| [BigQuery] | Data warehouse | All events + CRM | — | 2 tables undocumented |

**Duplication audit**: is the same event tracked in multiple tools independently? Duplication inflates counts and creates discrepancy.

---

### 5. Remediation Priority List

| Issue | Severity | Metric(s) affected | Effort | Priority |
|---|---|---|---|---|
| [Missing sign-up user_id] | Critical | DAU, retention | Low | P1 |
| [Funnel double-tracking] | High | Activation rate | Medium | P1 |
| [Events with no owner] | Medium | Attribution | Low | P2 |

**Rule**: P1 issues — those affecting metrics relied on for product or business decisions — must be fixed before any new analytics work. Building on broken data = wasted effort.
