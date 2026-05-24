---
name: ds-engineering-technical-spec
description: Writes a complete technical specification ready for engineering handoff — RFC format, data models, API contracts, sequence diagrams, STRIDE threat model, NFRs, and acceptance criteria. Use when handing off to engineers, starting a sprint, or asking "how do we build this". Also triggers on: ADRs, API contract specification, data model design, state machine, STRIDE threat model, NFR definition.
tags: [engineering, define, technical-spec, rfc, stride, nfr, api-contract]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Technical Spec
**Domain**: Engineering | **Phase**: Define | **Invocation**: `/ds-engineering-technical-spec`

## What this produces
A complete technical specification that an engineer can implement from without ambiguity. On Nemo: key decision + data model + API sketch. On Willy: RFC-format document with sequence diagrams, STRIDE threat model, NFRs, full API contracts, and acceptance criteria.

## Methods
RFC format, ADR authoring, data model design, API contract specification, sequence diagram, state machine design, STRIDE threat model, NFR definition, error handling matrix, edge case enumeration, performance requirements, rollback strategy, monitoring spec

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Spec sketch | Key decision + data model + API contract sketch + ACs |
| Tuna | Full spec | RFC format + ADRs + data model + API contracts + error matrix |
| Salmon | Production spec | All above + sequence diagrams + STRIDE + NFRs + edge cases |
| Willy | System spec | All methods + state machines + rollback strategy + monitoring spec |

---

## Execution Prompt

Read the project context: the feature requirements or PRD from Define phase, system architecture context, FISH classification, any existing API contracts or data models this must integrate with.

---

### Step 1 — RFC Header (all FISH levels)

Every technical spec opens with a problem statement that an engineer unfamiliar with the context can read and immediately understand.

```
RFC-[NNN]: [Title]
Author: [name]
Date: [YYYY-MM-DD]
Status: Draft / In Review / Accepted
Reviewers: [who must approve before implementation]

## Problem
[What problem does this feature solve? One paragraph. Reference the user story or OKR it maps to.]

## Goals
- [Specific, measurable goal 1]
- [Specific, measurable goal 2]

## Non-Goals
- [What this spec explicitly does NOT address — prevents scope creep]
- [What will be handled in a follow-up spec]

## Background
[Context an engineer needs to understand the decision. Links to prior ADRs, system diagrams, or related specs.]
```

---

### Step 2 — Architecture Decision Records (all FISH levels)

For each significant technical decision, produce an ADR. One ADR per decision — don't combine.

**What counts as a decision that needs an ADR:**
- Choice of technology or library (covered by tech-landscape-research but referenced here)
- Data model shape (especially relationships and normalization choices)
- Synchronous vs. asynchronous processing
- Caching strategy and invalidation
- Error handling and retry strategy
- Consistency model (strong vs. eventual)

```markdown
## ADR-[NNN]: [Decision title]
Status: Proposed

Context: [Why this decision is needed]
Decision: [What was decided — one sentence]
Rationale: [Why this option over alternatives]
Consequences: [What this enables and what it costs]
```

---

### Step 3 — Data Model (all FISH levels)

Define every entity, its fields, types, constraints, and relationships.

**Entity format:**
```
Entity: [name]
Table: [table_name]

Fields:
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid()
  [field]     [type]      [constraints] -- [purpose if not obvious]
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()

Indexes:
  [field] — [why: query pattern this supports]

Relationships:
  [entity] — [one-to-many / many-to-many] — [join key]

Invariants:
  - [A rule that must always be true about this entity]
  - [e.g., "balance must never be negative"]
```

**Data model decisions to document explicitly:**
- Why this normalization level (1NF/2NF/3NF)?
- Where are soft deletes used vs. hard deletes?
- What is the audit strategy (audit table, event log, versioning)?
- How is PII stored, encrypted, and tagged?

---

### Step 4 — API Contracts (all FISH levels)

Every endpoint must have a complete request/response contract. No endpoint without a schema.

**REST endpoint format:**
```
[METHOD] /api/v1/[resource]

Description: [what this endpoint does]
Auth: [required auth level — public / user / admin / service-to-service]
Rate limit: [X requests / minute per user]

Request:
  Headers:
    Authorization: Bearer {token}
    Idempotency-Key: {uuid}  [if mutation]

  Body (application/json):
    {
      "field": "type"        // required — description
      "field?": "type"       // optional — description, default: X
    }

Response 200:
    {
      "id": "uuid",
      "field": "type",
      "created_at": "ISO 8601"
    }

Errors:
  400 Bad Request    — validation failure, see error shape
  401 Unauthorized   — missing or invalid token
  403 Forbidden      — authenticated but not authorized
  404 Not Found      — resource does not exist
  409 Conflict       — idempotency key collision or state conflict
  422 Unprocessable  — semantically invalid (e.g., balance insufficient)
  429 Too Many Requests — rate limit exceeded
  500 Internal Error — unexpected failure

Standard error shape:
    {
      "error": {
        "code": "VALIDATION_ERROR",   // machine-readable
        "message": "human readable",  // user-facing or developer-facing
        "field": "field_name"         // for validation errors only
      }
    }
```

**Async operations (queues, webhooks):**
```
Event: [event_name]
Trigger: [what causes this event]
Payload:
  {
    "event": "string",
    "id": "uuid",
    "data": {},
    "timestamp": "ISO 8601"
  }
Delivery guarantee: [at-least-once / exactly-once]
Retry policy: [exponential backoff, max X attempts]
Dead letter: [what happens after max retries]
```

---

### Step 5 — Sequence Diagrams (Salmon, Willy)

For every non-trivial flow (more than 2 hops), produce a sequence diagram in text.

```
Flow: [name — e.g., "User initiates payment"]

Client → API Gateway: POST /payments {amount, method}
API Gateway → Auth Service: Validate token
Auth Service → API Gateway: {user_id, scopes}
API Gateway → Payment Service: CreatePayment {user_id, amount, method}
Payment Service → Database: INSERT payment (status: pending)
Payment Service → Payment Provider: ChargeCard {amount, token}
Payment Provider → Payment Service: {charge_id, status: success}
Payment Service → Database: UPDATE payment (status: confirmed, charge_id)
Payment Service → Event Bus: payment.confirmed {payment_id, user_id}
Notification Service ← Event Bus: payment.confirmed
Notification Service → Email Provider: SendReceipt {user_id, amount}
Payment Service → API Gateway: 200 {payment_id, status: confirmed}
API Gateway → Client: 200 {payment_id, status: confirmed}

Error path (card declined):
Payment Provider → Payment Service: {status: failed, code: CARD_DECLINED}
Payment Service → Database: UPDATE payment (status: failed)
Payment Service → API Gateway: 422 {error: {code: CARD_DECLINED}}
```

For each sequence diagram, document:
- What can go wrong at each step
- How failure at each step is handled
- What is the user-visible state during each transition

---

### Step 6 — STRIDE Threat Model (Salmon, Willy)

STRIDE is a structured way to enumerate security threats before they're shipped.

| Threat | STRIDE Category | Description | Mitigation | Severity |
|---|---|---|---|---|
| User accesses another user's data | **S**poofing | Auth token not validated per resource | Validate user_id on every resource read | Critical |
| JWT not expiring | **T**ampering | Long-lived tokens = long-lived breach | Set exp claim, revocation list | High |
| API endpoint denial | **R**epudiation | No audit log of mutations | Log all writes with user_id, timestamp | High |
| PII exposed in logs | **I**nformation Disclosure | User data printed in error logs | PII scrubber on log pipeline | High |
| Spike traffic overwhelms service | **D**enial of Service | No rate limiting | Per-user rate limit, circuit breaker | Medium |
| Admin endpoint open | **E**levation of Privilege | Missing role check | Middleware RBAC enforcement | Critical |

**STRIDE categories:**
- **S**poofing — impersonating users or systems
- **T**ampering — modifying data in transit or at rest
- **R**epudiation — denying actions without an audit trail
- **I**nformation Disclosure — exposing data to unauthorized parties
- **D**enial of Service — exhausting resources
- **E**levation of Privilege — gaining unauthorized access

For every Critical or High threat: the spec is not done until the mitigation is implemented in the design, not just noted.

---

### Step 7 — Non-Functional Requirements (Tuna, Salmon, Willy)

NFRs must be measurable. "Fast" is not an NFR. "p99 latency < 200ms at 1,000 req/s" is.

| NFR | Requirement | Measurement Method | Owner |
|---|---|---|---|
| Latency | p99 < [X]ms at [N] req/s | APM / load test | Backend eng |
| Availability | [X]% uptime, SLA: < [Y] mins downtime/month | Uptime monitor | SRE |
| Throughput | Support [N] concurrent users / [M] req/s | Load test | Backend eng |
| Error rate | < [X]% 5xx in rolling 24h window | Error monitoring | On-call |
| Data durability | Zero data loss on any single point of failure | DR test | Infra |
| Security | All PII encrypted at rest (AES-256) and in transit (TLS 1.3+) | Security audit | Security |
| Compliance | GDPR data deletion within 30 days of request | Audit log | Product/Legal |

---

### Step 8 — Acceptance Criteria (all FISH levels)

Every story in this spec must have Given/When/Then ACs. These become the test suite.

```
Story: [user story title]

AC 1 — Happy path:
  Given [precondition — the state of the system]
  When [action the user or system takes]
  Then [expected outcome — observable, testable]
  And [secondary outcome]

AC 2 — Error path:
  Given [invalid state or input]
  When [action attempted]
  Then [error response with correct code and message]

AC 3 — Edge case:
  Given [boundary condition]
  When [action]
  Then [correct handling]
```

**Definition of Done** — a story is done only when:
- [ ] All ACs passing (automated)
- [ ] Security review complete (Salmon+)
- [ ] NFRs met (load tested)
- [ ] Monitoring instrumented (metrics firing)
- [ ] Runbook written (Salmon+)
- [ ] ADRs committed to repo

---

### Final Output

**RFC header** — problem, goals, non-goals, background
**ADRs** — one per key decision, Proposed status
**Data model** — entities, fields, constraints, relationships, invariants
**API contracts** — every endpoint with full request/response schemas and error codes
**Sequence diagrams** — for all non-trivial flows, including error paths (Salmon+)
**STRIDE threat model** — 6 categories, mitigations for all Critical/High (Salmon+)
**NFRs** — measurable, with measurement method and owner (Tuna+)
**Acceptance criteria** — Given/When/Then for every story, Definition of Done checklist
**Recommended next skill** — `/ds-engineering-architecture-design` (if system design is open) or `/ds-engineering-api-design` (if API surface needs depth) with one-sentence reason
