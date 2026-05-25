---
name: ds-analytics-analytics-implementation
description: Plans the technical implementation of analytics tracking — event taxonomy (object-action format), tracking spec per event, pipeline architecture, data warehouse schema, and QA validation framework.
tags: [analytics, develop]
model: inherit
---

# Analytics Implementation
**Domain**: Analytics | **Phase**: Develop | **Invocation**: `/ds-analytics-analytics-implementation`

## What this produces
An analytics implementation plan with event taxonomy, detailed tracking spec per event, pipeline architecture diagram, data warehouse schema design, and QA validation checklist.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Event taxonomy + top 10 specs + tool recommendation |
| Tuna | Taxonomy + spec + pipeline architecture |
| Salmon | All above + schema design + QA framework |
| Willy | All methods + sequencing + documentation standards |

---

## Execution Prompt

You are planning Analytics Implementation for [project]. Define the tracking system that delivers the data the measurement framework requires.

**Input**: measurement framework, product/system description, tech stack, existing analytics setup.

---

### 1. Event Taxonomy

Use **object-action format** for all event names — creates a consistent, queryable namespace.

**Format**: `[object]_[past_tense_action]`

| Object | Actions | Event names |
|---|---|---|
| user | signed_up, logged_in, logged_out, deleted | user_signed_up, user_logged_in, ... |
| payment | initiated, completed, failed, refunded | payment_initiated, payment_completed, ... |
| feature_x | viewed, used, completed, abandoned | feature_x_viewed, feature_x_used, ... |
| onboarding | started, step_completed, completed, abandoned | onboarding_started, ... |

**Taxonomy rules:**
- snake_case for all event names (no camelCase, PascalCase, or spaces)
- Past tense (things that happened)
- Specific enough to query without additional filtering
- Consistent across platforms (web and mobile use same event name)

---

### 2. Tracking Specification

For each event, a full spec engineering can implement directly:

```
Event: [event_name]
When: [exact trigger — "when user clicks Submit and API returns 200"]
NOT when: [exceptions — "do NOT fire on validation errors, only on success"]

Properties:
  user_id:         string    required  — authenticated user ID (null if anonymous)
  session_id:      string    required  — current session identifier
  timestamp:       ISO 8601  required  — event timestamp (UTC)
  [property_name]: [type]    required  — [description]
  [property_name]: [type]    optional  — [description, default: null]

Example payload:
  {
    "event": "payment_completed",
    "user_id": "usr_abc123",
    "session_id": "ses_xyz789",
    "timestamp": "2026-05-24T10:30:00Z",
    "amount_cents": 4999,
    "currency": "USD",
    "payment_method": "card",
    "plan_id": "plan_pro_monthly"
  }

Expected volume: [N events/day]
Platform: [web / iOS / Android / server]
Implementation: [client-side SDK / server-side API]
Test: [how to verify this fires correctly in dev]
```

---

### 3. Pipeline Architecture

```
[Client / Server]
  ↓ SDK events (Segment / Amplitude / custom)
[CDP Layer — Segment]
  ↓ Routes to destinations
  ├→ [Product Analytics — Mixpanel / Amplitude] (real-time)
  ├→ [Data Warehouse — BigQuery / Snowflake] (historical)
  └→ [CRM — HubSpot] (lifecycle automation)

[Data Warehouse]
  ↓ dbt transformations
[BI Tool — Metabase / Looker / Tableau]
  ↓
[Dashboards + Reports]

Latency:
  Client → Product Analytics: < 30 seconds
  Client → Data Warehouse: 1-hour batch
  Warehouse → BI: 24-hour dbt run
```

**Failure handling:**
- SDK queues events locally if offline (no data loss)
- Segment retries failed deliveries for 24 hours
- Warehouse loads have idempotency keys to prevent duplicates

---

### 4. QA Framework

**Pre-release checklist per event:**
```
[ ] Event fires at correct trigger (verified in dev with Segment Debugger)
[ ] Event does NOT fire at non-triggers (negative test)
[ ] All required properties present and non-null
[ ] Properties have correct data types
[ ] user_id present for authenticated events
[ ] Event appears in product analytics within 30 seconds
[ ] Event appears in data warehouse within 2 hours
[ ] No duplicate events from same trigger
```

**Production monitoring alerts:**
```
Alert: event volume drops > 50% vs. prior day → pipeline or tracking bug
Alert: required property null rate > 5% → implementation issue
Alert: event fires on wrong platform → tagging error
```
