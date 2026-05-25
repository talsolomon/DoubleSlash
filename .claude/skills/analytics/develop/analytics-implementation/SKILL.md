---
name: ds-analytics-analytics-implementation
description: Plans the technical implementation of analytics tracking — event taxonomy, tracking spec, pipeline architecture, QA framework. Use when instrumenting a product, building a data pipeline, or asking "how do we get the data we need". Also triggers on: event taxonomy (object-action format), Segment tracking spec, data warehouse schema, QA and validation.
tags: [analytics, develop, analytics-implementation, event-taxonomy, tracking-spec, pipeline, segment]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Analytics Implementation
**Domain**: Analytics | **Phase**: Develop | **Invocation**: `/ds-analytics-analytics-implementation`

## What this produces
An analytics implementation plan with event taxonomy, detailed tracking spec per event, pipeline architecture, data warehouse schema design, and a QA validation framework.

## Methods
Event taxonomy design (object-action format), tracking specification writing, SDK and tool selection, pipeline architecture design, data warehouse schema design, QA and validation framework, implementation sequencing

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core tracking | Event taxonomy + top 10 specs + tool recommendation |
| Tuna | Full implementation plan | Taxonomy + spec + pipeline architecture |
| Salmon | Production implementation | All above + schema design + QA framework |
| Willy | Analytics platform | All methods + sequencing + documentation standards |

---

## Execution Prompt

Read the project context: measurement framework, product/system description, tech stack, existing analytics setup, FISH classification.

---

### Step 1 — Event Taxonomy (all FISH levels)

Use the **object-action format** for all event names. This creates a consistent, queryable event namespace.

**Format:** `[object]_[past_tense_action]`

**Examples:**
- `user_signed_up` (not "SignUp" or "new_user")
- `payment_completed` (not "purchase" or "transactionComplete")
- `feature_x_used` (not "featureXEvent")
- `onboarding_step_completed` (not "onboarding_progress")

**Event taxonomy table:**

| Object | Actions | Event names |
|---|---|---|
| user | signed_up, logged_in, logged_out, deleted | user_signed_up, user_logged_in, ... |
| payment | initiated, completed, failed, refunded | payment_initiated, ... |
| feature_x | viewed, used, completed, abandoned | feature_x_viewed, ... |
| onboarding | started, step_completed, completed, abandoned | onboarding_started, ... |

**Taxonomy rules:**
- snake_case for all event names (no camelCase, PascalCase, or spaces)
- Past tense (things that happened, not things happening)
- Specific enough to query without additional filtering
- Consistent across platforms (web and mobile same event name)

---

### Step 2 — Tracking Specification (all FISH levels)

For each event, a full spec that engineering can implement directly.

```
Event: [event_name]
When: [exact trigger — "when the user clicks Submit and the API returns 200"]
NOT when: [exceptions — "do NOT fire on validation errors, only on success"]

Properties:
  user_id:         string    required  — authenticated user ID (null if anonymous)
  session_id:      string    required  — current session identifier
  timestamp:       ISO 8601  required  — event timestamp (UTC)
  [property_name]: [type]    required/optional — [description]
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

Expected volume: [N events/day or /month]
Platform: [web / iOS / Android / server]
Implementation: [client-side SDK / server-side API call]
Test: [how to verify this event fires correctly in dev]
```

---

### Step 3 — Pipeline Architecture (Tuna, Salmon, Willy)

```
Data flow:

[Client / Server]
  ↓ SDK events (Segment / Amplitude / custom)
[CDP Layer — Segment]
  ↓ Routes to destinations
  ├→ [Product Analytics — Mixpanel / Amplitude] (real-time analysis)
  ├→ [Data Warehouse — BigQuery / Snowflake] (historical analysis)
  └→ [CRM — HubSpot] (lifecycle automation)

[Data Warehouse]
  ↓ dbt transformations
[Analytics Layer — dbt models]
  ↓
[BI Tool — Metabase / Looker / Tableau]
  ↓
[Dashboards + Reports]

Latency per path:
  Client → Product Analytics: < 30 seconds (near real-time)
  Client → Data Warehouse: 1-hour batch or streaming via Kinesis/Pub/Sub
  Warehouse → BI: 24-hour dbt run or triggered on new data
```

**Pipeline failure handling:**
- SDK queues events locally if offline (no data loss)
- Segment retries failed deliveries for 24 hours
- Data warehouse loads have idempotency keys to prevent duplicates

---

### Step 4 — QA Framework (Salmon, Willy)

Before shipping, validate that tracking works as specified.

**Pre-release checklist per event:**
```
[ ] Event fires at the correct trigger (verified in dev with Segment Debugger / browser console)
[ ] Event does NOT fire at non-triggers (validated via negative test)
[ ] All required properties are present and non-null
[ ] Properties have correct data types (string IDs not cast as integers)
[ ] user_id is present for authenticated events (check post-login state)
[ ] Event appears in product analytics tool within 30 seconds
[ ] Event appears in data warehouse within 2 hours
[ ] No duplicate events from the same trigger (check with event_id deduplication)
```

**Production monitoring:**
```
Alert: event volume drops > 50% vs. prior day → pipeline or tracking bug
Alert: required property null rate > 5% → implementation issue
Alert: event fires on wrong platform (e.g., iOS event appearing as web) → tagging error
```

---

### Final Output

**Event taxonomy** — object-action format, all objects and actions defined
**Tracking specifications** — full spec per event including properties, triggers, volume
**Pipeline architecture** — data flow diagram with tools and latency (Tuna+)
**Data warehouse schema** — key tables and relationships (Salmon+)
**QA framework** — pre-release checklist + production monitoring alerts (Salmon+)
**Recommended next skill** — `/ds-analytics-dashboard-design` (build reporting on this data) with one-sentence reason
