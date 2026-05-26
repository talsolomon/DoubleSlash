---
name: ds-engineering-system-audit
description: Audits an existing system for technical debt, gaps, dependencies, and risk. Use when assessing a legacy codebase, planning a refactor, onboarding to a new system, or asking "what's the state of the code". Also triggers on: codebase analysis, dependency mapping, test coverage assessment, DORA metrics, tech debt matrix, security vulnerability scan, observability audit.
tags: [engineering, discover, system-audit, tech-debt, dora, c4]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# System Audit
**Domain**: Engineering | **Phase**: Discover | **Invocation**: `/ds-engineering-system-audit`

## What this produces
A system health report with a 6-dimension scorecard, tech debt inventory, DORA metrics baseline, dependency risk map, and a prioritized remediation backlog with effort estimates.

## Methods
System health scorecard, C4 architecture mapping, tech debt matrix, DORA metrics baseline, dependency risk map, test coverage analysis, observability audit, security surface scan, API contract review, incident history analysis, documentation gap analysis, dead code identification

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick health check | Scorecard snapshot + top 3 risk areas + one remediation priority |
| Tuna | Full audit | Scorecard + debt matrix + DORA baseline + dependency risk map |
| Salmon | Deep audit | All above + observability audit + security surface + API contract review |
| Willy | Complete system review | All methods + incident history + full remediation backlog with effort |

---

## Execution Prompt

Read the project context: what system is being audited, known problem areas, recent incidents, team size, and any specific concerns. FISH classification determines audit depth.

---

### Step 1 — System Health Scorecard (all FISH levels)

Score each dimension on a 1–5 scale. Be honest — a 3 is not "fine."

| Dimension | Score (1–5) | Evidence | Top Risk |
|---|---|---|---|
| **Reliability** | | Uptime, p99 latency, error rate | |
| **Testability** | | Test coverage %, test quality, CI pass rate | |
| **Security** | | Auth model, dependency CVEs, secrets management | |
| **Observability** | | Logging, metrics, tracing, alerting coverage | |
| **Maintainability** | | Cyclomatic complexity, coupling, docs, onboarding time | |
| **Scalability** | | Current load headroom, scaling strategy, bottlenecks | |

**Scale:**
- **5** — Exemplary. Could teach this to others.
- **4** — Solid. Minor gaps only.
- **3** — Functional but fragile. Known issues tolerated.
- **2** — Concerning. Slowing the team down.
- **1** — Critical risk. Needs immediate attention.

**Overall health score**: average of 6 dimensions. Flag any dimension at 1 as a blocker before new feature work.

---

### Step 2 — C4 Architecture Map (Tuna, Salmon, Willy)

Map the system at four levels of abstraction. For each level, identify what exists vs. what should exist.

**Level 1 — System Context**
```
System: [name]
Users: [who interacts with it]
External systems: [what it integrates with]
Data flows: [what moves where]
```

**Level 2 — Container Diagram**
List each container (app, database, queue, cache, CDN):
| Container | Technology | Responsibility | Interfaces |
|---|---|---|---|
| [Web app] | [React/Next.js] | [User interface] | [REST → API] |
| [API] | [Node/Go/etc.] | [Business logic] | [DB, cache, queues] |
| [Database] | [Postgres/etc.] | [Persistence] | [Direct + replica] |

**Level 3 — Component Map** (Salmon/Willy)
For each container, list the key components and their coupling:
- Identify high-coupling components (changes ripple everywhere)
- Identify orphaned components (nothing depends on them — delete candidates)
- Identify missing components (logic that lives in the wrong place)

**Architecture gaps**: where does the current architecture diverge from what was intended? Name the delta.

---

### Step 3 — Tech Debt Matrix (all FISH levels)

Catalogue debt by type. Don't list everything — prioritize by impact.

| Debt Item | Type | Impact (H/M/L) | Effort (H/M/L) | Risk of Ignoring | Priority |
|---|---|---|---|---|---|
| [e.g., No integration tests] | Testing | H | M | Silent regressions | P1 |
| [e.g., Auth middleware bypassed] | Security | H | L | Auth bypass in prod | P1 |
| [e.g., N+1 queries in /users] | Performance | M | L | Latency at 10× load | P2 |
| [e.g., Hardcoded secrets in config] | Security | H | L | Credential leak | P1 |

**Debt types:**
- **Code quality** — complexity, duplication, poor naming
- **Testing** — missing coverage, flaky tests, no integration layer
- **Security** — unpatched CVEs, missing auth checks, exposed secrets
- **Performance** — N+1 queries, missing indexes, synchronous where async needed
- **Observability** — no metrics, silent failures, no tracing
- **Documentation** — missing ADRs, no runbooks, no onboarding guide

**Priority formula**: `Priority = Impact × Probability of materializing`. High Impact + High Probability = P1, fix before new feature work starts.

---

### Step 4 — DORA Metrics Baseline (Tuna, Salmon, Willy)

DORA (DevOps Research and Assessment) measures engineering delivery health. Establish the current baseline before any improvement work.

| Metric | Current | Elite | High | Medium | Low |
|---|---|---|---|---|---|
| **Deployment Frequency** | [X/day or /week] | On-demand (multiple/day) | Daily–weekly | Weekly–monthly | < Monthly |
| **Lead Time for Changes** | [X hours/days] | < 1 hour | 1 day – 1 week | 1 week – 1 month | > 1 month |
| **Mean Time to Restore (MTTR)** | [X mins/hours] | < 1 hour | < 1 day | < 1 week | > 1 week |
| **Change Failure Rate** | [X%] | 0–15% | 16–30% | 16–30% | 46–60% |

**For each metric below Elite:**
- What is causing the gap? (e.g., manual deploy process, no feature flags, flaky CI)
- What is the one change that would move it one level up?

**Interpretation**: Teams in the Elite tier ship 973× more frequently with 3× lower change failure rate than Low performers (2023 State of DevOps Report). Metric gaps are engineering strategy gaps.

---

### Step 5 — Dependency Risk Map (all FISH levels)

| Dependency | Type | Version | Last Updated | CVEs | Maintainers | Risk |
|---|---|---|---|---|---|---|
| [package-name] | Runtime | [v2.x] | [date] | [0 / N known] | [active/abandoned] | H/M/L |

**Risk signals:**
- **Abandoned** — last commit > 12 months, no response to issues
- **Single-maintainer** — bus factor = 1
- **Known CVEs** — unpatched critical or high severity
- **Version lag** — > 2 major versions behind
- **Transitive risk** — dependency of a dependency with high risk

For any High risk dependency: name the migration path and effort estimate.

---

### Step 6 — Observability Audit (Salmon, Willy)

**Logging:**
- Are errors being logged with enough context to reproduce? (Y/N)
- Are logs structured (JSON) or unstructured (strings)? (Structured = searchable)
- Are request IDs propagated across service boundaries? (Y/N)
- Are sensitive fields (PII, secrets) excluded from logs? (Y/N)

**Metrics:**
| Signal | Instrumented? | Tool | Alert configured? |
|---|---|---|---|
| Error rate | Y/N | | Y/N |
| p50 / p95 / p99 latency | Y/N | | Y/N |
| Throughput (req/s) | Y/N | | Y/N |
| Business metric (DAU, conversions) | Y/N | | Y/N |

**Tracing:**
- Are distributed traces available across services? (Y/N)
- Can you reconstruct a full request path from entry to DB? (Y/N)

**Alerting gaps**: list every failure mode that would require a user to report before the team knows. Each gap = a missing alert.

---

### Step 7 — Remediation Backlog (Salmon, Willy)

Translate findings into a prioritized backlog. Format for direct import to a ticket system.

| # | Item | Category | Severity | Effort (days) | Owner | Blocks |
|---|---|---|---|---|---|---|
| 1 | [e.g., Patch CVE-2024-1234 in lodash] | Security | Critical | 0.5 | [Eng lead] | Nothing |
| 2 | [e.g., Add request ID propagation] | Observability | High | 1 | [Backend eng] | Incident response |
| 3 | [e.g., Add integration test suite] | Testing | High | 5 | [Team] | Safe deploys |

**Rule**: remediation items that block safe feature delivery must be resolved before the next sprint starts. Surface these explicitly to engineering leadership.

---

### Final Output

**Health scorecard** — 6 dimensions, 1–5 scale, overall score
**C4 architecture map** — system context + container diagram + gaps (Tuna+)
**Tech debt matrix** — prioritized by impact and effort, P1/P2/P3 labels
**DORA baseline** — 4 metrics with current level vs. Elite tier gap (Tuna+)
**Dependency risk map** — with CVEs, maintenance status, migration paths
**Observability audit** — logging, metrics, tracing, alerting gaps (Salmon+)
**Remediation backlog** — ordered, with effort and owner slots (Salmon+)
**Recommended next skill** — `/ds-engineering-technical-spec` (if proceeding to build) or `/ds-engineering-architecture-design` (if major refactor needed) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
