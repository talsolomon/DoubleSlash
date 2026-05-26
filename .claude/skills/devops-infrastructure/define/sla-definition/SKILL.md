---
name: ds-devops-infrastructure-sla-definition
description: Defines service level objectives, agreements, and error budgets for systems and APIs. Use when formalizing reliability targets, setting customer expectations, or asking "what uptime and latency are we actually committing to". Also triggers on: SLI identification (availability, latency, error rate, throughput), SLO target setting, SLA contractual framing.
tags: [devops-infrastructure, define]
model: inherit
---

# SLA Definition
**Domain**: DevOps/Infrastructure | **Phase**: Define | **Invocation**: `/ds-devops-infrastructure-sla-definition`

## What this produces
An SLA/SLO specification with availability targets, latency budgets, error budget policy, measurement methodology, burn rate alerting, and escalation definitions.

## Methods
SLI identification, SLO target setting, SLA contractual framing, error budget calculation, burn rate alerting design, measurement methodology, violation escalation design, incident classification, review cadence definition

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core SLOs | Core SLIs + SLO targets + error budget |
| Tuna | Full SLO spec | All above + measurement methodology + burn rate alerts |
| Salmon | SLA document | All above + contractual SLA + escalation paths + violation policy |
| Willy | Complete framework | All methods + incident classification + review cadence + dashboard spec |

---

## Execution Prompt

Read the project context: system description, business criticality, historical reliability data, customer commitments, architecture design from the previous phase. FISH classification determines depth.

---

### Step 1 — SLI Selection (all FISH levels)

A Service Level Indicator (SLI) is a quantitative measurement of service behavior. Choose SLIs that directly reflect the user's experience, not proxy metrics.

**Four SLI categories:**

**Availability SLI**
```
Definition: Percentage of requests that succeed (non-5xx response)
Formula: (successful_requests / total_requests) × 100
Measurement: HTTP response code monitoring at load balancer
Exclude: Health check requests, client errors (4xx), known maintenance windows
Window: 30-day rolling
```

**Latency SLI**
```
Definition: Percentage of requests completed within a time threshold
Formula: (requests_under_threshold / total_requests) × 100
Thresholds to track: p50, p95, p99 (the p99 is where tail latency hides)
Measurement: APM tool (Datadog, New Relic) or application instrumentation
Note: Track per endpoint — one slow endpoint inflates overall p99
```

**Error Rate SLI**
```
Definition: Percentage of requests resulting in application-level error
Formula: (error_responses / total_responses) × 100
Include: 5xx errors, application error codes, silent failures (202 that never complete)
Exclude: 4xx client errors (not your reliability problem)
```

**Throughput SLI**
```
Definition: Percentage of time the system handles requests at target capacity
Formula: (time_at_target_throughput / total_time) × 100
Use when: service has a defined capacity target to meet
```

**SLI selection per service:**
| Service | Primary SLI | Secondary SLI | Why |
|---|---|---|---|
| [API server] | Availability | p99 latency | Revenue-generating, both matter |
| [Background worker] | Throughput | Error rate | Async — availability less relevant than completing work |
| [Database] | Availability | p95 query latency | Downstream services blocked on DB |
| [Email service] | Error rate | — | Latency acceptable for async email |

---

### Step 2 — SLO Target Setting (all FISH levels)

A Service Level Objective (SLO) is the target value for an SLI. The SLO determines your error budget.

**SLO target framework:**

**Availability SLOs and what they mean in downtime:**
| SLO Target | Monthly downtime allowed | Weekly downtime | Daily downtime |
|---|---|---|---|
| 99.0% | 7h 18m | 1h 41m | 14m 24s |
| 99.5% | 3h 39m | 50m 45s | 7m 12s |
| 99.9% | 43m 49s | 10m 4s | 1m 26s |
| 99.95% | 21m 54s | 5m 2s | 43s |
| 99.99% | 4m 22s | 1m 0s | 8.6s |

**Latency SLO targets:**
```
Establish targets from actual p99 data:
  Current p99: [X ms]
  SLO target: [X ms] (typically: current p99 + 20% buffer as starting point)
  
Never set an SLO target the system doesn't currently meet — fix first, then formalize.

Example SLO: 99% of /api/v1/payments requests complete in < 500ms
```

**SLO specification table:**
| Service | SLI type | SLO target | Measurement window | Status |
|---|---|---|---|---|
| [API server] | Availability | 99.9% | 30-day rolling | Current: 99.93% ✅ |
| [API server] | p99 latency < 500ms | 99.0% of requests | 30-day rolling | Current: 98.7% ⚠️ |
| [Payment service] | Availability | 99.95% | 30-day rolling | Current: 99.97% ✅ |
| [Payment service] | p99 latency < 1000ms | 99.5% of requests | 30-day rolling | Current: 99.1% ⚠️ |

**SLO setting rule**: start with achievable targets. An SLO you regularly breach is worse than no SLO — it trains your team to ignore alerts. Set conservatively, tighten quarterly.

---

### Step 3 — Error Budget Calculation (all FISH levels)

The error budget is the amount of unreliability you're allowed before the SLO is breached.

**Error budget formula:**
```
Error budget = 1 - SLO target

Example: SLO = 99.9% availability
Error budget = 100% - 99.9% = 0.1%

In a 30-day month:
  Total minutes: 30 × 24 × 60 = 43,200 minutes
  Error budget:  43,200 × 0.001 = 43.2 minutes of downtime allowed
```

**Error budget policy:**
| Budget consumed | Status | Action |
|---|---|---|
| 0–25% | 🟢 Healthy | Normal feature development pace |
| 25–75% | 🟡 Caution | Review reliability work backlog; ensure no high-risk deploys |
| 75–100% | 🔴 Warning | Pause non-essential deploys; reliability sprint |
| > 100% (exhausted) | 🚨 Breached | Feature freeze; all engineering on reliability until SLO restored |

**Monthly error budget tracker:**
```
Month: [YYYY-MM]
SLO: 99.9% availability
Error budget (minutes): 43.2

Incidents this month:
  [Date]: [X min] downtime — [incident description]
  [Date]: [X min] downtime — [incident description]

Total consumed: [X min] ([Y]% of budget)
Remaining: [Z min] ([W]% of budget)
Status: 🟢/🟡/🔴/🚨
```

---

### Step 4 — Burn Rate Alerting (Tuna, Salmon, Willy)

Burn rate = how fast you're consuming your error budget relative to normal pace.

**Two-window burn rate alerting** (Google SRE-recommended):
```
Burn rate 1 (critical, fast burn):
  Alert condition: error rate consuming budget at 14× normal pace for 1 hour
  14× burn rate = SLO breached in ~2 days at this rate
  Severity: PAGE immediately (SEV 1 response)
  
Burn rate 2 (warning, slow burn):
  Alert condition: error rate consuming budget at 6× normal pace for 6 hours
  6× burn rate = SLO breached in ~5 days at this rate
  Severity: TICKET (SEV 2/3, investigate in business hours)

Burn rate calculation:
  1x burn rate = (error_budget%) / (window_hours)
  At 99.9% SLO: 1x burn = 0.1% / 720h = 0.000139% per hour

Alert formula:
  Current error rate / (1 - SLO) > burn_rate_threshold
```

**Burn rate alert configuration:**
| Alert name | Burn rate | Short window | Long window | Action |
|---|---|---|---|---|
| [Service] Critical | 14× | 5 min | 60 min | Page on-call immediately |
| [Service] Warning | 6× | 30 min | 360 min | Create P2 ticket |
| [Service] Notice | 3× | 60 min | 720 min | Log + monitor |

---

### Step 5 — SLA (Customer-Facing Agreement) (Salmon, Willy)

The SLA is the contractual version of the SLO with financial implications.

**SLA document template:**
```markdown
## Service Level Agreement: [Product Name]

### Availability Commitment
[Vendor] commits to [X]% availability for the [Service] during any given calendar month,
excluding Scheduled Maintenance Windows and events outside [Vendor]'s reasonable control.

### Definitions
"Downtime": Period when [Service] is unavailable or error rate exceeds [X]% for > 5 consecutive minutes.
"Scheduled Maintenance": Planned downtime notified at least 72 hours in advance.
"Availability": (Total minutes - Downtime minutes) / Total minutes × 100%

### Service Credits
| Monthly Availability | Credit |
|---|---|
| < [99.9]% and ≥ [99.5]% | 10% of monthly fee |
| < [99.5]% and ≥ [99.0]% | 25% of monthly fee |
| < [99.0]% | 50% of monthly fee |

### Claim Process
Customer must submit credit claim within 30 days of incident, referencing incident ticket.
Credits are applied to next billing cycle; no cash refunds.

### Exclusions
This SLA does not apply to: free tier, beta features, customer-caused outages,
force majeure events, or scheduled maintenance windows.
```

---

### Step 6 — Measurement Methodology (Tuna, Salmon, Willy)

An SLO without a measurement method is a wish. Define how every SLI is collected.

| SLI | Collection method | Tooling | Alert sink | Dashboard |
|---|---|---|---|---|
| Availability | HTTP status codes at ALB access logs | CloudWatch / Datadog | PagerDuty | Grafana |
| p99 latency | Application-level timing (middleware) | Datadog APM | PagerDuty | Grafana |
| Error rate | Application error log parsing | Datadog Log Management | PagerDuty | Grafana |

**Measurement rules:**
- SLI data must be captured at the edge, not inside the service (edge = what customers experience)
- Measurement must be independent of the service being measured (don't let the service report its own health)
- Define "good request" explicitly — include/exclude rules for health checks, 4xx, retries

**Review cadence:**
| Review | Frequency | Audience | Agenda |
|---|---|---|---|
| SLO dashboard review | Weekly | Engineering team | Current burn rate, incidents, error budget status |
| SLO quarterly review | Quarterly | Eng + Product + Leadership | Budget trends, SLO adjustment decisions, reliability roadmap |
| SLA compliance report | Monthly | Legal + Finance | Compliance rate, credit eligibility |

---

### Final Output

**SLI selection** — per service, with formula and measurement method
**SLO targets** — per SLI, with error budget in minutes
**Error budget policy** — traffic light system with action thresholds
**Burn rate alerts** — two-window configuration per service (Tuna+)
**SLA document** — contractual template with service credit schedule (Salmon+)
**Measurement methodology** — collection method, tooling, dashboard (Tuna+)
**Review cadence** — weekly/quarterly/monthly schedule with agenda
**Recommended next skill** — `/ds-devops-infrastructure-ci-cd-pipeline` — build the delivery pipeline that will protect these SLOs on every deploy


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
