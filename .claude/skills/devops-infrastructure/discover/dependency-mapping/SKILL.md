---
name: ds-devops-infrastructure-dependency-mapping
description: Maps service, library, and external dependencies to surface hidden risks and failure chains. Use when planning a migration, investigating an outage, or asking "what breaks if this goes down". Also triggers on: Service dependency graphing, library and package dependency audit, external API dependency review, critical path identification, single point of failure analysis, blast radius calculation.
tags: [devops-infrastructure, discover]
model: inherit
---

# Dependency Mapping
**Domain**: DevOps/Infrastructure | **Phase**: Discover | **Invocation**: `/ds-devops-infrastructure-dependency-mapping`

## What this produces
A dependency map with service graph, critical path identification, external dependency risk assessment, blast radius analysis, and a risk-ranked failure cascade list.

## Methods
Service dependency graphing, library and package dependency audit, external API dependency review, critical path identification, single point of failure analysis, blast radius calculation, version and EOL risk flagging, circular dependency detection

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick map | Service graph + critical paths + top 3 failure risks |
| Tuna | Full map | Dependency map + blast radius + external risks + version risks |
| Salmon | Deep analysis | All above + EOL risks + circular dependency detection + cascade analysis |
| Willy | Complete risk model | All methods + full blast radius analysis + mitigation plan per risk |

---

## Execution Prompt

Read the project context: what system is being mapped, the service list, known dependencies, recent outage history, and any migration concerns. FISH classification determines depth.

---

### Step 1 — Service Dependency Graph (all FISH levels)

Map every service and what it depends on. Use directional notation: A → B means "A calls B."

```
Service graph (text notation — convert to diagram for presentation):

[service-a] → [service-b]     // synchronous dependency
[service-a] → [database-1]    // data dependency
[service-a] ⤳ [queue-1]       // asynchronous (produces events)
[service-c] ⬸ [queue-1]       // asynchronous (consumes events)
[service-b] → [external-api]  // external dependency

Legend: → sync call  ⤳ produces  ⬸ consumes
```

**For each service, document:**
| Service | Owner | Runtime | Sync dependencies | Async dependencies | External deps |
|---|---|---|---|---|---|
| [service-a] | [team] | [language/version] | service-b, db-primary | queue-1 | Stripe, SendGrid |

**Circular dependency detection** — trace if A → B → C → A. These create deploy ordering deadlocks and are architectural defects. Flag every cycle.

---

### Step 2 — Blast Radius Calculation (all FISH levels)

For each service, calculate what fails if it goes down.

**Blast radius score formula:**
```
Blast Radius = (downstream dependents) × (criticality weight) × (1 - fallback quality)

Criticality weights:
  Core user flow = 3
  Supporting feature = 2
  Internal/admin tool = 1

Fallback quality:
  Tested fallback = 0.1 (reduces blast radius by 90%)
  Untested fallback = 0.5
  No fallback = 1.0 (full blast)
```

| Service | Downstream dependents | Criticality | Fallback quality | Blast radius score | Risk |
|---|---|---|---|---|---|
| [auth-service] | 8 services | Core (3) | Partial, untested (0.5) | 12 | CRITICAL |
| [payment-service] | 3 services | Core (3) | None (1.0) | 9 | HIGH |
| [email-service] | 2 services | Supporting (2) | None (1.0) | 4 | MEDIUM |
| [analytics-service] | 0 services | Internal (1) | N/A | 0 | LOW |

**Score interpretation:**
- **> 9**: CRITICAL — requires dedicated reliability sprint before any new features
- **6–9**: HIGH — design fallback this quarter
- **3–5**: MEDIUM — document degraded mode behavior
- **0–2**: LOW — monitor, no immediate action needed

---

### Step 3 — Critical Path Analysis (all FISH levels)

The critical path is the chain of dependencies required for the most important user flows.

**For each critical user flow:**
```
Flow: User completes checkout

Path: Browser → CDN → API Gateway → Auth Service → Order Service → Payment Service → Payment Provider → Inventory Service → Notification Service → Email Provider

Hops: 9
Composite availability (each at 99.9%): 0.999^9 = 99.1%
SLO target: 99.5%
Gap: -0.4% — current architecture cannot meet SLO without redundancy
```

**Composite availability formula:**
For services in sequence: `P(all available) = P(A) × P(B) × P(C) × ...`

**Math implication**: each additional hop reduces theoretical maximum availability. 9 services at 99.9% = 99.1% — lower than a typical 99.5% SLO. This is not an opinion; it is arithmetic.

**For each flow below SLO target:** identify which hops to make redundant first (highest blast radius services on the path).

---

### Step 4 — External Dependency Risk Assessment (Tuna, Salmon, Willy)

External dependencies are outside your control. Rate each for risk.

| External Service | Function | SLA | Fallback | Business impact if down | Risk level |
|---|---|---|---|---|---|
| [Stripe] | Payments | 99.99% | None — payments fail | Revenue stop | HIGH |
| [SendGrid] | Transactional email | 99.95% | Queue + retry | Delayed notifications | MEDIUM |
| [Auth0] | Authentication | 99.99% | Cached token validation | Full auth failure | CRITICAL |
| [Twilio] | SMS 2FA | 99.95% | Bypass 2FA (security reduction) | Security degradation | MEDIUM |

**External dependency risk flags:**
- **No fallback** — your service hard-fails when the external service is unavailable
- **No SLA** — vendor doesn't guarantee uptime (common with free tiers)
- **Single provider for critical function** — no alternative if vendor changes terms
- **PII sent to third party** — data residency and compliance implications
- **Rate limits undocumented** — service may throttle during your peak

**For each CRITICAL external dependency:** design and test a fallback before shipping more features.

---

### Step 5 — Version and EOL Risk (Salmon, Willy)

Flag dependencies approaching or past end-of-life.

| Package/Runtime | Current version | Latest stable | EOL date | Known CVEs | Migration effort | Priority |
|---|---|---|---|---|---|---|
| Node.js 16 | 16.20 | 22.x | April 2024 (PAST) | Multiple unfixed | 2 weeks | P0 |
| Python 3.9 | 3.9.18 | 3.12 | Oct 2025 | None critical | 3 days | P2 |
| PostgreSQL 12 | 12.17 | 16 | Nov 2024 | None | 1 week | P1 |
| [Library with CVE] | 2.1.0 | 3.0.1 | Active | CVE-2024-XXXX (CRITICAL) | 1 day | P0 |

**EOL thresholds:**
- **P0**: Already past EOL — no security patches. Stop new work until resolved.
- **P1**: EOL within 6 months — plan migration now, sprint this quarter.
- **P2**: EOL within 12 months — roadmap item.

---

### Step 6 — Failure Cascade Analysis (Willy)

Simulate what happens when each CRITICAL or HIGH service fails and trace the full cascade.

```
Scenario: Auth Service becomes unavailable (simulated)

T+0 min: Auth Service stops responding
  → API Gateway health check fails auth validation → 401 errors for all users
  → Mobile apps display "session expired" to all users
  → Scheduled background jobs using service tokens fail

T+5 min: Retry storms begin
  → Mobile clients retry aggressively → 10× normal auth traffic
  → Circuit breaker (if configured) opens — protects auth service but...
  → Non-circuit-broken services overwhelm the now-degraded auth service

T+15 min: Cascading overload
  → Load balancer logs fill with 500 errors
  → Noisy neighbor effect — API Gateway CPU spikes, affecting order service
  → Error rate threshold triggers PagerDuty for on-call

Mitigations assessed:
  Option A: Short-TTL token cache in API Gateway — auth failure → serve cached tokens for 5 min
    Tradeoff: tokens up to 5 min stale; revoked tokens honored for up to 5 min
  Option B: Circuit breaker in API Gateway — auth down → allow requests with degraded mode
    Tradeoff: unauthenticated requests allowed in graceful degradation
  Option C: Secondary auth provider with warm failover
    Tradeoff: implementation complexity, cost
```

---

### Final Output

**Service dependency graph** — all services, dependencies, directionality
**Blast radius scores** — ranked CRITICAL/HIGH/MEDIUM/LOW with formula
**Critical path analysis** — per user flow, composite availability calculation, gaps vs. SLO
**External dependency risk table** — SLA, fallback status, business impact
**Version/EOL risk flags** — prioritized by urgency (Salmon+)
**Failure cascade simulations** — for top CRITICAL/HIGH services (Willy)
**Recommended next skill** — `/ds-devops-infrastructure-infrastructure-design` — use this map to design resilience into the target architecture
