---
name: ds-engineering-architecture-design
description: Designs system architecture — quality attributes, style selection, C4 diagrams, CAP theorem positioning, failure modes, ADRs, and DORA-aligned scaling plan. Use when building a new system, planning a major refactor, or asking "how should this be structured". Also triggers on: C4 model, microservices vs monolith, event-driven design, CQRS, circuit breaker, CAP theorem.
tags: [engineering, develop, architecture, c4, cap-theorem, adr, dora, circuit-breaker]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Architecture Design
**Domain**: Engineering | **Phase**: Develop | **Invocation**: `/ds-engineering-architecture-design`

## What this produces
A system architecture document: quality attributes ranking, style decision with rationale, C4 diagrams at the appropriate level, CAP theorem positioning, ADRs, failure mode analysis, and a DORA-aligned scaling plan.

## Methods
Quality attribute ranking, architecture style selection matrix, C4 model (all 4 levels), CAP theorem analysis, ADR authoring, failure mode analysis, circuit breaker and bulkhead patterns, database architecture, caching strategy, event-driven design, CQRS, infrastructure design, cost modeling, DORA scaling plan

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Architecture sketch | Style decision + C4 Level 1+2 + top 3 ADRs + top 3 risks |
| Tuna | Full architecture | All above + C4 Level 3 + CAP positioning + DB + caching strategy |
| Salmon | Production architecture | All above + C4 Level 4 + failure modes + circuit breakers + cost model |
| Willy | System architecture | All methods + event-driven/CQRS + DORA scaling + full infrastructure |

---

## Execution Prompt

Read the project context: what system is being designed, the technical spec from Define phase, team size and skills, scale requirements, compliance constraints, FISH classification.

---

### Step 1 — Quality Attributes (all FISH levels)

Before choosing an architecture style, rank what matters. Architecture is the art of trade-offs — you can't optimize everything simultaneously.

Force-rank these quality attributes for this system (1 = most important):

| Rank | Attribute | Current requirement | 3-year requirement |
|---|---|---|---|
| | **Availability** | [X]% uptime | [X]% uptime |
| | **Performance** | p99 < [X]ms | p99 < [X]ms at [N]× load |
| | **Scalability** | [current users] | [3-year users] |
| | **Security** | [compliance level] | [compliance level] |
| | **Maintainability** | [team size] | [team size] |
| | **Cost efficiency** | [$X/month] | [$X/month] |
| | **Time to market** | [current] | — |
| | **Consistency** | [strong/eventual] | [strong/eventual] |

**Rule**: your architecture style must be optimized for your top 3 ranked attributes. If the chosen style conflicts with a top-3 attribute, you've chosen the wrong style.

---

### Step 2 — Architecture Style Selection (all FISH levels)

| Style | Best for | Avoid when | Team size |
|---|---|---|---|
| **Monolith** | Early stage, fast iteration, small team, simple domain | Scale is a known constraint from day 1 | 1–10 |
| **Modular monolith** | Growing team, domain complexity, monolith feeling the strain | True horizontal scaling is required | 5–20 |
| **Microservices** | Independent scaling, multiple teams, clear domain boundaries | Team < 10 engineers, domain not yet understood | 10+ |
| **Event-driven** | Async workflows, audit logs, high throughput, loose coupling | Low-latency requirements, simple query patterns | Any |
| **Serverless** | Spiky workloads, low maintenance, per-invocation billing | Cold start latency is a constraint, long-running jobs | Any |

**Decision format:**
```
Architecture style: [chosen style]
Rationale: [why this style fits the top-ranked quality attributes]
Trade-offs accepted:
  - [What this style costs — be specific]
  - [What constraint triggers migration to next style]
Migration trigger: [what happens in the system that means it's time to evolve]
```

**Warning signs you're choosing the wrong style:**
- "We'll start microservices because we'll need to scale" — premature complexity kills velocity
- "We're too big for a monolith" — size is not the issue, coupling and team friction are
- "We chose event-driven for everything" — consistency problems at 2am are expensive

---

### Step 3 — C4 Model (all FISH levels)

C4 maps the system at four levels. Start at Level 1, go deeper based on FISH.

**Level 1 — System Context Diagram**
```
System: [name]

Users:
  [User type 1] → uses → [System] → to → [goal]
  [User type 2] → ...

External systems:
  [System] → sends/receives → [External system] → for → [purpose]
  [System] → sends/receives → [External system] → ...

Boundaries:
  [System] owns: [what data/behavior is inside the boundary]
  [System] does NOT own: [what stays outside]
```

**Level 2 — Container Diagram** (all FISH)
```
Containers inside [System]:

[Container]         [Technology]     [Responsibility]
Web app             React/Next.js    User interface, SSR
API server          Node.js/Go       Business logic, auth enforcement
Background worker   BullMQ/Sidekiq   Async jobs, retries
Database            Postgres         Persistent state
Cache               Redis            Session store, rate limiting
Message bus         Kafka/SQS        Event streaming

Connections:
  Web app → API server: HTTPS / REST
  API server → Database: TCP / connection pool
  API server → Cache: TCP / Redis protocol
  API server → Message bus: produces events
  Background worker → Message bus: consumes events
  Background worker → Database: writes
```

**Level 3 — Component Diagram** (Tuna, Salmon, Willy)

For each container, list the internal components and their responsibilities:

```
Container: API server

Components:
  AuthMiddleware     — validates JWT, enforces scopes, attaches user to context
  RequestValidator   — validates request body against schema, returns 400 on failure
  PaymentsController — handles /payments endpoints, delegates to service layer
  PaymentsService    — business logic — creates, reads, and updates payments
  PaymentsRepository — database queries — no business logic here
  EventPublisher     — publishes domain events to message bus
  ErrorHandler       — maps exceptions to standard error shape
```

Identify: high-coupling components (changes ripple), missing components (logic in wrong layer), God components (doing too much).

**Level 4 — Code-Level Detail** (Salmon, Willy)

For the highest-risk or most complex components only:
- Class/function structure
- Key interfaces and contracts
- Where state lives
- Where side effects happen

---

### Step 4 — CAP Theorem Positioning (Tuna, Salmon, Willy)

The CAP theorem: in a distributed system, you can have at most 2 of: Consistency, Availability, Partition Tolerance.

Since partition tolerance is non-negotiable in any real network, the real choice is:

| Choice | Behavior | Choose when |
|---|---|---|
| **CP** (Consistent + Partition Tolerant) | System returns error or waits on partition | Payments, inventory, any financial data — wrong data = wrong money |
| **AP** (Available + Partition Tolerant) | System returns potentially stale data on partition | Social feeds, search, recommendations — stale data is acceptable |

**Document the choice per data store:**
| Data / Service | CP or AP | Rationale |
|---|---|---|
| User accounts | CP | Auth tokens must reflect current state |
| Payment records | CP | Double-charge is worse than downtime |
| Product catalog | AP | Stale price for 5s is acceptable |
| Event feed | AP | Eventual consistency is the feature |

**Eventual consistency design rules** (for AP choices):
- Document the maximum acceptable staleness window
- Design compensating transactions for when inconsistency is detected
- Expose consistency state to the UI ("Last updated X seconds ago")

---

### Step 5 — Database Architecture (Tuna, Salmon, Willy)

**Primary database selection:**
| Factor | Decision |
|---|---|
| Consistency model needed | Strong / Eventual |
| Query patterns | Relational joins / Document lookups / Key-value / Time-series |
| Scale pattern | Vertical (scale up) / Horizontal sharding / Read replicas |
| Compliance | PII encryption, audit logs, GDPR deletion support |

**Connection strategy:**
- Connection pool size: `(2 × num_cores) + num_disk_spindles` (PgBouncer formula)
- Max connections per service: define explicitly to prevent pool exhaustion
- Read replicas: for read-heavy workloads, route reads to replica, writes to primary

**Migration strategy:**
- Use the expand/contract pattern for zero-downtime schema changes
  - **Expand**: add new column/table (backward compatible)
  - **Migrate**: backfill data, update application to write to both
  - **Contract**: remove old column/table (now safe)
- Never lock a large table in production — use `pg_repack` or online DDL

---

### Step 6 — Failure Mode Analysis (Salmon, Willy)

For every external dependency, document what happens when it fails.

| Dependency | Failure mode | Impact | Pattern | Recovery |
|---|---|---|---|---|
| Database | Primary down | All writes fail | Circuit breaker + read replica fallback | Auto-failover (60s) |
| Cache | Redis down | Cache miss on every request | Graceful degradation to DB | Self-healing on reconnect |
| Payment provider | API unavailable | Payments fail | Circuit breaker + queue for retry | Retry with backoff |
| Message bus | Kafka down | Events not published | Local outbox pattern, write to DB | Replay from outbox on reconnect |
| Auth service | Down | All authenticated requests fail | Cache token validation (short TTL) | Graceful deny with retry-after |

**Resilience patterns:**

**Circuit breaker** — stops calling a failing dependency:
```
State: CLOSED → OPEN → HALF-OPEN → CLOSED
Open after: 5 failures in 30 seconds
Half-open: try 1 request after 60 seconds
Close: 3 consecutive successes
```

**Bulkhead** — isolates resource pools so one failing consumer can't starve others:
```
Payment service connection pool: 20 connections (reserved)
Reporting service connection pool: 5 connections (reserved)
Result: reporting slowdown doesn't block payments
```

**Retry with backoff:**
```
Attempts: 3
Backoff: exponential — 100ms, 500ms, 2500ms
Jitter: ±25% to prevent thundering herd
Retry on: 429, 503, 504 — NOT on 400, 401, 403, 422 (client errors, retrying is pointless)
```

---

### Step 7 — DORA Scaling Plan (Salmon, Willy)

Architecture must enable the DORA metrics trajectory. Poor architecture is the #1 cause of low DORA performance.

| DORA Metric | Architecture enabler | What to design in |
|---|---|---|
| **Deployment Frequency** | Independent deployability | Service boundaries that allow one service to deploy without coordinating others |
| **Lead Time** | Fast feedback loops | Feature flags, automated tests at each level, CI pipeline < 10 min |
| **MTTR** | Fast recovery | One-command rollback, circuit breakers, blue/green deployment |
| **Change Failure Rate** | Prevention | Automated testing, canary deploys, observability before rollout |

For each DORA metric below target:
- Name the architecture pattern that addresses it
- Name the infrastructure change required
- Estimate the effort to implement

---

### Final Output

**Quality attribute ranking** — force-ranked, drives all subsequent decisions
**Architecture style decision** — with rationale, trade-offs, and migration trigger
**C4 Level 1 + 2** — system context and container diagram (all FISH)
**C4 Level 3** — component diagram (Tuna+)
**C4 Level 4** — code-level detail for high-risk components (Salmon+)
**CAP theorem positioning** — per data store, with staleness window for AP choices (Tuna+)
**Database architecture** — store selection, connection strategy, migration approach (Tuna+)
**Failure mode analysis** — dependency failures, resilience patterns, circuit breakers (Salmon+)
**DORA scaling plan** — architecture enablers per metric (Salmon+)
**ADRs** — one per major architectural decision, Proposed status
**Recommended next skill** — `/ds-engineering-deployment-planning` (if architecture is decided) or `/ds-engineering-technical-spec` (if spec needs updating based on design) with one-sentence reason
