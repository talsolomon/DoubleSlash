---
name: ds-devops-infrastructure-infrastructure-design
description: Designs the target-state infrastructure architecture for reliability, scalability, and security. Use when building new systems, planning major migrations, or asking "what should this infrastructure look like". Also triggers on: Architecture pattern selection, cloud provider and service selection, network topology design, availability and resilience design, security architecture, scaling strategy (horizontal/vertical/auto).
tags: [devops-infrastructure, define]
model: inherit
---

# Infrastructure Design
**Domain**: DevOps/Infrastructure | **Phase**: Define | **Invocation**: `/ds-devops-infrastructure-infrastructure-design`

## What this produces
An infrastructure design document with architecture diagram, technology choices, scaling strategy, resilience design, security layers, and cost model.

## Methods
Architecture pattern selection, cloud provider and service selection, network topology design, availability and resilience design, security architecture, scaling strategy (horizontal/vertical/auto), disaster recovery design, cost modeling

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Architecture overview | Pattern decision + tech choices + scaling approach |
| Tuna | Full design | Design doc + resilience + security architecture + cost estimate |
| Salmon | Production design | All above + DR plan + network topology + compliance controls |
| Willy | Enterprise design | All methods + full cost model + DR runbook + migration plan |

---

## Execution Prompt

Read the project context: requirements (scale, availability, security), constraints (budget, team skills, compliance), existing environment, and the dependency map from the discover phase. FISH classification determines design depth.

---

### Step 1 — Architecture Pattern Selection (all FISH levels)

Choose the infrastructure pattern that matches the scale and team constraints.

| Pattern | Best for | Avoid when | Complexity |
|---|---|---|---|
| **Single-region, single-AZ** | PoC, internal tools, dev environments | User-facing with > 99% availability requirement | Low |
| **Single-region, multi-AZ** | Standard production — most products | Global user base with latency requirements | Medium |
| **Multi-region active-passive** | 99.95%+ availability, DR requirement | Cost is a hard constraint | High |
| **Multi-region active-active** | 99.99%+ availability, global latency SLAs | Small team, complex coordination overhead | Very High |
| **Edge/CDN-first** | Static content, global reads, low-latency | Write-heavy workloads, consistency requirements | Medium |

**Decision output:**
```
Architecture pattern: [selected pattern]
Rationale: [ties back to availability SLO, scale targets, and team size]
Accepted trade-offs:
  - [What this pattern costs — be specific]
Migration trigger: [what happens in the system that means it's time to evolve this pattern]
```

---

### Step 2 — Compute Design (all FISH levels)

**Compute selection matrix:**
| Workload type | Recommended | When to upgrade | When to downgrade |
|---|---|---|---|
| Long-running API/web | Container (ECS/GKE) or VM | Traffic needs independent scaling per service | Load is predictable, team prefers VMs |
| Scheduled/batch jobs | Serverless (Lambda/Cloud Functions) | Job duration > 15 min, memory > 10 GB | Stable schedule, high concurrency |
| ML inference | GPU instance or managed inference | Sustained inference at scale | Low volume, batch acceptable |
| Background workers | Container with queue | Scale workers independently | Monolith handles queue well enough |

**Compute specification:**
| Service | Compute type | Instance/container spec | Min instances | Max instances | Scaling trigger |
|---|---|---|---|---|---|
| [API server] | ECS Fargate | 2 vCPU / 4 GB | 2 (HA) | 20 | CPU > 70% for 3 min |
| [Background worker] | ECS Fargate | 1 vCPU / 2 GB | 1 | 10 | Queue depth > 100 |
| [Scheduled job] | Lambda | 512 MB / 15 min timeout | N/A | 1000 concurrent | Event trigger |

**Auto-scaling rule:** never scale to zero in production for user-facing services — cold start latency will affect the first request wave.

---

### Step 3 — Data Architecture (all FISH levels)

**Database selection:**
| Data type | Query pattern | Scale model | Recommended |
|---|---|---|---|
| Relational (structured, joins) | Complex queries, transactions | Vertical + read replicas | PostgreSQL / Aurora |
| Document (flexible schema) | Lookup by ID, nested objects | Horizontal sharding | MongoDB / DynamoDB |
| Key-value (sessions, cache) | Point lookups, TTL expiry | Horizontal | Redis / ElastiCache |
| Time-series (metrics, events) | Aggregations over time ranges | Horizontal | TimescaleDB / InfluxDB |
| Search (full-text, faceted) | Unstructured text, relevance ranking | Horizontal | Elasticsearch / OpenSearch |

**Data topology:**
```
Write path: Application → Primary DB (single writer)
Read path:  Application → Read replica (async replication, ~100ms lag)
Cache path: Application → Redis → Primary DB (on cache miss)

Connection pool (PgBouncer formula):
  Pool size = (2 × num_vCPUs) + num_disk_spindles
  Example: 8 vCPU server → pool size = 17

Replication lag alert: > 500ms triggers alert — replica not serving fresh data
```

**Backup strategy:**
| Data store | Backup type | Frequency | Retention | Recovery time target |
|---|---|---|---|---|
| PostgreSQL primary | Automated snapshot + WAL archiving | Continuous | 30 days | < 1 hour |
| Redis cache | RDB snapshot | Hourly | 7 days | < 15 min |
| S3 user data | Cross-region replication | Real-time | Indefinite | < 5 min |

---

### Step 4 — Network Topology (Tuna, Salmon, Willy)

**VPC architecture:**
```
VPC: 10.0.0.0/16

Public subnets (internet-accessible):
  10.0.1.0/24  — AZ-a (load balancers, NAT gateways, bastion)
  10.0.2.0/24  — AZ-b

Private subnets (application tier):
  10.0.10.0/24 — AZ-a (API servers, workers)
  10.0.11.0/24 — AZ-b

Isolated subnets (data tier):
  10.0.20.0/24 — AZ-a (databases, caches)
  10.0.21.0/24 — AZ-b

Traffic flow:
  Internet → ALB (public subnet) → API servers (private subnet) → DB (isolated subnet)
  
Rule: databases NEVER in public subnets. Application servers NEVER have public IPs.
```

**Security group design (least-privilege):**
| Security group | Inbound | Outbound |
|---|---|---|
| ALB | 0.0.0.0/0:443, 0.0.0.0/0:80 | API servers:8080 |
| API servers | ALB SG:8080 | DB SG:5432, Redis SG:6379, 0.0.0.0/0:443 (HTTPS out) |
| Database | API servers SG:5432 | None |
| Redis | API servers SG:6379 | None |

---

### Step 5 — Resilience Design (all FISH levels)

**Redundancy checklist:**
- [ ] All stateless services run ≥ 2 instances across ≥ 2 AZs
- [ ] Load balancer health check interval ≤ 30s, unhealthy threshold ≤ 2 checks
- [ ] Database has read replica in separate AZ with failover promotion time < 60s
- [ ] Cache is not a SPOF — cache miss returns data from DB with acceptable latency
- [ ] Queues have dead-letter queues configured for failed messages

**Circuit breaker configuration:**
```
State: CLOSED → OPEN → HALF-OPEN → CLOSED

Open condition: 5 failures in 30 seconds (any 5xx or timeout)
Open duration: 60 seconds
Half-open: send 1 test request
Close condition: 3 consecutive successes in HALF-OPEN

Services requiring circuit breaker: external APIs, downstream services, database pools
```

**Graceful degradation modes** — define what the system does when each dependency fails:
| Dependency fails | Graceful behavior | What users see |
|---|---|---|
| Redis cache | Fall back to DB reads | Slightly higher latency |
| Email service | Queue emails, retry in 1h | No immediate email (acceptable) |
| External auth provider | Serve cached tokens (5 min TTL) | Transparent for 5 min |
| Search service | Disable search, show message | "Search temporarily unavailable" |

---

### Step 6 — Security Architecture (Tuna, Salmon, Willy)

**Security layers (defense in depth):**
```
Layer 1 — Edge:     WAF (OWASP Top 10 rules), DDoS protection (Shield/Cloudflare)
Layer 2 — Network:  VPC, security groups, private subnets, NACLs
Layer 3 — Identity: IAM least-privilege, MFA, no shared credentials
Layer 4 — App:      Auth middleware, input validation, CORS policy
Layer 5 — Data:     Encryption at rest (AES-256), TLS 1.2+ in transit, PII tagging
Layer 6 — Audit:    CloudTrail, access logs, VPC flow logs, SIEM ingestion
```

**Secrets management:**
- Secrets live in AWS Secrets Manager / HashiCorp Vault — never in environment variables, code, or config files
- Secret rotation policy: credentials rotated every 90 days or on any suspected compromise
- IAM role-based access to secrets — applications authenticate via role, not stored keys

---

### Step 7 — Disaster Recovery Design (Salmon, Willy)

**DR tiers:**
| Tier | RTO | RPO | Strategy | Cost |
|---|---|---|---|---|
| Warm standby | < 1 hour | < 15 min | Scaled-down replica, promote on failure | Medium |
| Pilot light | < 4 hours | < 1 hour | Core services running, scale out on failure | Low |
| Backup/restore | < 24 hours | < 24 hours | Restore from snapshot | Lowest |
| Multi-region active-active | < 1 min | < 1 min | Traffic switches automatically | Highest |

**DR runbook outline (Willy):**
```
Scenario: Primary region (us-east-1) becomes unavailable

Detection: Synthetic monitor fails for 3 consecutive checks (15 min)
Decision: Engineering lead declares DR event

Steps:
1. Promote DB read replica in DR region to primary (estimated: 5 min)
2. Update DNS record to DR region load balancer (TTL: 60s → propagation: ~60s)
3. Verify DR region auto-scaling capacity available (estimated: 3 min)
4. Smoke test core user flows in DR region
5. Notify stakeholders of failover
6. Begin incident timeline documentation

Total RTO target: < 30 minutes
```

---

### Step 8 — Cost Model (Tuna, Salmon, Willy)

| Component | Current cost | Target state cost | Delta | Notes |
|---|---|---|---|---|
| Compute (EC2/Fargate) | $X/mo | $X/mo | +/-$X | Auto-scaling reduces waste |
| Database (RDS + replica) | $X/mo | $X/mo | +/-$X | Adds HA read replica |
| Network egress | $X/mo | $X/mo | +/-$X | CDN reduces origin egress |
| Storage (S3, EBS) | $X/mo | $X/mo | +/-$X | Lifecycle policies added |
| Security/tooling | $X/mo | $X/mo | +/-$X | WAF, monitoring, secrets |
| **Total** | **$X/mo** | **$X/mo** | **+/-$X** | |

**Reserved instance opportunity:** for stable baseline workload, 1-year reserved pricing saves 30–40% vs. on-demand. Flag any instance type running > 720 hours/month.

---

### Final Output

**Architecture pattern decision** — with rationale and migration trigger
**Compute specification** — per service, with scaling rules
**Data architecture** — store selection, connection strategy, backup policy
**Network topology** — VPC design, subnet tiers, security groups (Tuna+)
**Resilience design** — redundancy checklist, circuit breaker config, degradation modes
**Security architecture** — defense-in-depth layers, secrets management (Tuna+)
**DR design** — tier selection, RTO/RPO, runbook outline (Salmon+)
**Cost model** — current vs. target, with reserved instance opportunities (Tuna+)
**Recommended next skill** — `/ds-devops-infrastructure-sla-definition` — formalize availability commitments now that the architecture is defined


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
