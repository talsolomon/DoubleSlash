---
name: ds-engineering-deployment-planning
description: Plans a safe, rollback-ready deployment — strategy selection, expand/contract DB migrations, pre-flight checklist, runbook, monitoring thresholds, and rollback trigger criteria. Use when shipping to production, planning a release, or asking "how do we deploy this safely". Also triggers on: blue-green, canary, feature flags, zero-downtime deployment, database migration, rollback plan.
tags: [engineering, deliver, deployment, blue-green, canary, feature-flags, runbook, zero-downtime]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: deliver
---

# Deployment Planning
**Domain**: Engineering | **Phase**: Deliver | **Invocation**: `/ds-engineering-deployment-planning`

## What this produces
A complete deployment plan: strategy selection with rationale, database migration approach, pre-flight checklist with owners, runbook, monitoring thresholds, and a step-by-step rollback procedure.

## Methods
Deployment strategy selection (blue-green/canary/rolling/feature flags), expand/contract DB migration pattern, pre-deployment checklist, zero-downtime design, health check definition, runbook authoring, monitoring and alerting thresholds, smoke test suite, rollback procedure, post-deployment validation

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Lean deployment | Strategy + pre-flight checklist + rollback steps |
| Tuna | Full deployment | Strategy + DB migration plan + checklist + monitoring + rollback |
| Salmon | Zero-downtime | All above + runbook + smoke tests + comms plan |
| Willy | Enterprise deploy | All methods + canary analysis + full monitoring + post-deploy review |

---

## Execution Prompt

Read the project context: what is being deployed, the target environment, any database schema changes, known risks, feature flag state, FISH classification.

---

### Step 1 — Deployment Strategy Selection (all FISH levels)

Choose the strategy that matches the risk profile and rollback requirements.

| Strategy | How it works | Use when | Rollback |
|---|---|---|---|
| **Blue-Green** | Run two identical environments, switch traffic | Zero-downtime required, fast rollback needed, stateless services | Instant — switch traffic back to blue |
| **Canary** | Route small % of traffic to new version, expand gradually | High-risk changes, user-impact unknown, need real traffic signal | Fast — reroute 100% to stable |
| **Rolling** | Replace instances one at a time | Standard deploys, stateless, k8s native | Slow — roll forward or re-deploy old version |
| **Feature Flags** | Ship code dark, enable for % of users | Decouple deploy from release, A/B testing, kill switch needed | Instant — flag off |
| **Direct / In-place** | Replace running process | Development, low-risk patches, no users affected | Manual redeploy |

**Decision criteria:**
- **Has DB schema changes?** → Canary or Blue-Green (never rolling with breaking migration)
- **Zero downtime required?** → Blue-Green or Feature Flags
- **Need user-behavior signal before full rollout?** → Canary
- **Team needs kill switch post-launch?** → Feature Flags
- **Hotfix, low risk, no schema changes?** → Rolling is fine

**Decision output:**
```
Deployment strategy: [strategy]
Rationale: [why — reference the criteria above]
Rollback time: [estimated seconds/minutes to revert]
Rollback method: [exactly what to do]
```

---

### Step 2 — Database Migration Strategy (all FISH levels — if schema changes exist)

Database migrations are the highest-risk part of any deployment. The expand/contract pattern enables zero-downtime migrations.

**The expand/contract pattern — never change a column in place:**

**Phase 1 — Expand** (deploy before application changes):
```sql
-- Add the new column, nullable (backward compatible — old app ignores it)
ALTER TABLE users ADD COLUMN display_name VARCHAR(255);

-- Add new index (don't rename old one yet)
CREATE INDEX CONCURRENTLY idx_users_display_name ON users(display_name);
```

**Phase 2 — Migrate** (deploy application that writes to both old and new):
```sql
-- Backfill in batches (never UPDATE without WHERE — will lock the table)
UPDATE users SET display_name = username
WHERE display_name IS NULL
  AND id BETWEEN $start AND $end;  -- batch by PK range, pause between batches
```

**Phase 3 — Contract** (deploy after all reads migrated, old column unused):
```sql
-- Safe to drop now — app no longer reads username, writes to display_name
ALTER TABLE users DROP COLUMN username;
DROP INDEX idx_users_username;
```

**Rules for production migrations:**
- Never lock tables larger than 10,000 rows — use `CREATE INDEX CONCURRENTLY`, `pg_repack`
- Never `ALTER TABLE` with a default value on a large table (rewrites every row in Postgres < 11)
- Always test migration on a production clone with production data volume
- Always have a down migration (rollback script) written and tested before the up migration runs
- Time the migration on clone — multiply by 1.5 for production estimate

**Migration checklist:**
```
[ ] Down migration written and tested
[ ] Migration tested on production-size data clone
[ ] Estimated runtime: [X minutes]
[ ] Table locks: none (CONCURRENTLY used for index creation)
[ ] Backward compatible: old app can run against new schema (Phase 1 and 2 only)
[ ] Monitoring: replication lag checked before and after
```

---

### Step 3 — Pre-Deployment Checklist (all FISH levels)

Every item needs an owner and a "done by" time. A checklist with no owner is a wish list.

**Code + tests:**
- [ ] All tests passing in CI — [owner] by [T-24h]
- [ ] Code review approved — [owner] by [T-24h]
- [ ] OWASP checklist passed — [owner] by [T-24h]
- [ ] Feature flag configured (if applicable) — [owner] by [T-4h]

**Infrastructure:**
- [ ] DB migration tested on clone — [owner] by [T-48h]
- [ ] DB migration timed — estimate: [X min] — [owner] by [T-24h]
- [ ] Infrastructure provisioned (new instances, queues, buckets) — [owner] by [T-24h]
- [ ] Secrets/env vars updated in target environment — [owner] by [T-4h]
- [ ] Load test completed at expected peak traffic — [owner] by [T-48h]

**Observability:**
- [ ] New metrics and dashboards live in monitoring — [owner] by [T-24h]
- [ ] New alerts configured with correct thresholds — [owner] by [T-24h]
- [ ] Error budget / SLO window checked — [owner] by [T-4h]

**Rollback:**
- [ ] Rollback procedure written — [owner] by [T-48h]
- [ ] Rollback procedure tested on staging — [owner] by [T-24h]
- [ ] Down migration ready (if schema change) — [owner] by [T-48h]
- [ ] On-call team briefed on rollback triggers — [owner] by [T-2h]

**Communication:**
- [ ] Change window communicated (internal) — [owner] by [T-24h]
- [ ] Customer-facing status page updated (if user-visible impact) — [owner] by T-1h]
- [ ] Support team briefed on expected behavior — [owner] by [T-2h]

---

### Step 4 — Runbook (Salmon, Willy)

A runbook is the step-by-step guide an on-call engineer follows during the deployment. Write it so a teammate who knows nothing about this feature can execute it.

```markdown
# Deployment Runbook: [Feature Name]
Date: [YYYY-MM-DD]
Author: [name]
On-call: [who to call if something goes wrong]
Escalation: [manager/team lead name + contact]

## Pre-flight (T-1h)
1. Confirm all checklist items above are complete
2. Check monitoring dashboards — baseline error rate: [X]%, p99: [X]ms
3. Confirm on-call is monitoring
4. Announce deploy in #engineering: "[Feature] deployment starting at [time]"

## Deployment Steps
1. [Step — e.g., "Run DB migration: `make migrate-up`"]
   Expected: [what success looks like]
   If fails: [exact steps to take]

2. [Step — e.g., "Deploy app: `kubectl set image deployment/api api=image:v2`"]
   Expected: all pods Running within 3 minutes
   If fails: see Rollback section

3. [Step — e.g., "Enable feature flag: `flag set payments-v2 on`"]
   Expected: [X]% of users see new payments flow
   If fails: `flag set payments-v2 off` immediately

## Monitoring Thresholds (watch for 30 min post-deploy)
| Metric | Current baseline | Alert threshold |
|---|---|---|
| Error rate | [X]% | > [X × 2]% |
| p99 latency | [X]ms | > [X × 1.5]ms |
| [Business metric] | [baseline] | < [X]% of baseline |

## Rollback Triggers (act immediately, no approval needed)
- Error rate exceeds [threshold] for > 3 minutes
- p99 latency exceeds [threshold] for > 5 minutes
- [Critical business metric] drops below [threshold]
- Any data integrity issue detected

## Rollback Procedure
1. [Step — e.g., "Disable feature flag: `flag set payments-v2 off`"]
2. [Step — e.g., "Roll back app: `kubectl rollout undo deployment/api`"]
3. [Step — e.g., "Run down migration: `make migrate-down VERSION=20260524`"]
4. Confirm error rate returns to baseline
5. Announce rollback in #engineering and notify [stakeholder]

## Post-Deploy Validation (all clear criteria)
- Error rate back to baseline for 30 minutes
- [Business metric] at or above pre-deploy baseline
- Zero P1/P2 support tickets from this feature
- All monitoring alerts in OK state
```

---

### Step 5 — Canary Analysis Plan (Willy)

For canary deployments, define the analysis window and metrics explicitly.

**Canary rollout schedule:**
```
Stage 1: 1% traffic → wait 30 minutes → analyze
Stage 2: 10% traffic → wait 1 hour → analyze
Stage 3: 25% traffic → wait 2 hours → analyze
Stage 4: 50% traffic → wait 4 hours → analyze
Stage 5: 100% traffic
```

**Canary metrics to compare (canary vs. control):**
| Metric | Control | Canary | Acceptable delta |
|---|---|---|---|
| Error rate | [baseline] | [canary] | < +0.1% |
| p99 latency | [baseline] | [canary] | < +20ms |
| Conversion rate | [baseline] | [canary] | within ±2% |
| Session duration | [baseline] | [canary] | within ±5% |

**Automatic promotion criteria**: all metrics within acceptable delta for the full observation window.
**Automatic rollback criteria**: any metric exceeds delta for > 5 minutes.

---

### Final Output

**Deployment strategy** — chosen strategy with rationale and rollback time estimate
**Database migration plan** — expand/contract phases, timing, down migration ready (if schema change)
**Pre-flight checklist** — all items with owners and deadlines
**Runbook** — step-by-step, including rollback procedure with exact commands (Salmon+)
**Monitoring thresholds** — baseline + alert threshold per key metric
**Rollback triggers** — explicit conditions, no approval needed
**Canary analysis plan** — rollout stages, metrics, auto-promote/rollback criteria (Willy)
**Recommended next skill** — `/ds-engineering-incident-retrospective` (run after any incident) or `/ds-product-product-retrospective` (run 30 days post-launch) with one-sentence reason
