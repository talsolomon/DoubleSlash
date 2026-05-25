---
name: ds-devops-infrastructure-deployment-automation
description: Plans and implements automated deployment processes for production systems. Use when eliminating manual deploys, reducing deployment risk, or asking "how do we make deployments boring and safe". Also triggers on: Manual deploy audit, automation tooling selection, health check and readiness probe design, canary and progressive rollout configuration, automated rollback trigger design, deployment notification setup.
tags: [devops-infrastructure, deliver]
model: inherit
---

# Deployment Automation
**Domain**: DevOps/Infrastructure | **Phase**: Deliver | **Invocation**: `/ds-devops-infrastructure-deployment-automation`

## What this produces
A deployment automation plan with manual-deploy audit, automation tooling selection, health check design, progressive rollout configuration, automated rollback triggers, and deployment runbook retirement plan.

## Methods
Manual deploy audit, automation tooling selection, health check and readiness probe design, canary and progressive rollout configuration, automated rollback trigger design, deployment notification setup, deployment frequency tracking, runbook-to-automation conversion

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Automation approach | Automation tooling + health check design + rollback triggers |
| Tuna | Automation plan | All above + progressive rollout config + notification design |
| Salmon | Full automation | All above + canary configuration + runbook conversion map |
| Willy | Complete system | All methods + deployment metrics + full automation spec + team guide |

---

## Execution Prompt

Read the project context: current deployment process (manual steps, tools used, how long deploys take), system description, risk tolerance, CI/CD pipeline from the develop phase, FISH classification.

**Goal**: every deployment is triggered by a merge, visible in a dashboard, and automatically rolled back if health checks fail. Manual deployment steps are evidence of toil — eliminate them.

---

### Step 1 — Manual Deploy Audit (all FISH levels)

Before automating, document every manual step in the current process.

**Audit format:**
| Step # | Description | Who runs it | Time taken | Risk if skipped | Automatable? |
|---|---|---|---|---|---|
| 1 | SSH into bastion host | DevOps | 3 min | Can't reach servers | Yes — via IAM + SSM |
| 2 | Pull Docker image manually | DevOps | 2 min | Runs old code | Yes — pipeline step |
| 3 | Run DB migration manually | DevOps | 5–30 min | Schema out of sync | Yes — automated migration runner |
| 4 | Restart services one by one | DevOps | 10 min | Split-brain during restart | Yes — rolling restart via orchestrator |
| 5 | Check logs manually for errors | DevOps | 15 min | Miss errors | Yes — automated health check |
| 6 | Update Slack with deploy status | DevOps | 2 min | Team not informed | Yes — pipeline notification |

**Toil score:**
```
Total manual deployment time: [X minutes]
Deploys per week: [N]
Weekly toil: [X × N] minutes = [Y hours/week]
Annualized cost (at $[Z]/hr fully loaded): $[W]/year
```

**Automation priority** — sort by: risk if step is skipped × time taken. High risk + high time = automate first.

---

### Step 2 — Health Check Design (all FISH levels)

Health checks are the automated decision-maker for deploy success or rollback. Poorly designed health checks cause false positives (rollbacks when things are fine) or false negatives (missed failures).

**Three types of health checks:**

**Startup probe** — is the application initialized and ready to receive traffic?
```yaml
# Kubernetes startup probe
startupProbe:
  httpGet:
    path: /health/startup
    port: 8080
  failureThreshold: 30     # 30 attempts × 10s = 5 min startup window
  periodSeconds: 10

# What /health/startup checks:
#   - DB connection pool initialized
#   - Cache connection established
#   - Config loaded and validated
#   - Returns 200 only when all ready
```

**Liveness probe** — is the application still running (not deadlocked)?
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 15
  failureThreshold: 3      # 3 failures → restart container

# /health/live: lightweight check — is the process responsive?
#   - Returns 200 if the process can handle HTTP
#   - No dependency checks (they can be slow/flaky — don't cause unnecessary restarts)
```

**Readiness probe** — is the application ready to serve traffic?
```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  periodSeconds: 10
  failureThreshold: 3      # 3 failures → remove from load balancer

# /health/ready: full dependency check
#   - DB: can execute a simple query (SELECT 1)?
#   - Cache: can connect and ping?
#   - Critical downstream: can reach auth service?
#   - Returns 200 only if ALL dependencies healthy
```

**Health check endpoint implementation:**
```json
GET /health/ready → 200 OK
{
  "status": "healthy",
  "checks": {
    "database": { "status": "up", "latency_ms": 4 },
    "cache": { "status": "up", "latency_ms": 1 },
    "auth_service": { "status": "up", "latency_ms": 12 }
  },
  "version": "abc1234",
  "uptime_seconds": 3847
}

GET /health/ready → 503 Service Unavailable
{
  "status": "unhealthy",
  "checks": {
    "database": { "status": "down", "error": "connection timeout" },
    "cache": { "status": "up", "latency_ms": 1 }
  }
}
```

---

### Step 3 — Progressive Rollout Configuration (Tuna, Salmon, Willy)

**Rolling deployment (Kubernetes):**
```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0      # Never reduce capacity below 100%
      maxSurge: 25%          # Spin up 25% extra capacity during rollout

# For 10 replicas: adds 3 new pods, removes 3 old pods at a time
# Result: always at least 10 pods serving traffic during rollout
```

**Blue-Green deployment (ECS / ALB):**
```bash
# Step 1: Deploy new version to "green" target group
aws ecs update-service \
  --cluster prod-cluster \
  --service api-green \
  --task-definition api:v2

# Step 2: Wait for green to be healthy
aws ecs wait services-stable \
  --cluster prod-cluster \
  --services api-green

# Step 3: Switch ALB weights (can be gradual: 10% → 50% → 100%)
aws elbv2 modify-listener --listener-arn $LISTENER_ARN \
  --default-actions '[{
    "Type": "forward",
    "ForwardConfig": {
      "TargetGroups": [
        {"TargetGroupArn": "'"$BLUE_ARN"'", "Weight": 0},
        {"TargetGroupArn": "'"$GREEN_ARN"'", "Weight": 100}
      ]
    }
  }]'

# Step 4: Keep blue running for 15 minutes (instant rollback available)
# Step 5: Terminate blue if metrics are clean
```

**Canary analysis automation:**
```bash
# During canary: compare canary vs. baseline metrics
CANARY_ERROR_RATE=$(query_metrics "error_rate" "version=canary" 5m)
BASELINE_ERROR_RATE=$(query_metrics "error_rate" "version=baseline" 5m)
CANARY_P99=$(query_metrics "p99_latency" "version=canary" 5m)
BASELINE_P99=$(query_metrics "p99_latency" "version=baseline" 5m)

if (( $(echo "$CANARY_ERROR_RATE > $BASELINE_ERROR_RATE * 1.1" | bc -l) )); then
  echo "ROLLBACK: Canary error rate $CANARY_ERROR_RATE exceeds baseline $BASELINE_ERROR_RATE by >10%"
  trigger_rollback
fi
```

---

### Step 4 — Automated Rollback Triggers (all FISH levels)

**Rollback trigger conditions (monitor for 15 minutes post-deploy):**
```
Condition 1 — Error rate spike:
  If: 5xx_error_rate > baseline_error_rate × 2.0
  For: > 3 consecutive minutes
  Action: Immediate automated rollback + page on-call

Condition 2 — Latency degradation:
  If: p99_latency > baseline_p99 × 1.5
  For: > 5 consecutive minutes
  Action: Immediate automated rollback + page on-call

Condition 3 — Health check failure:
  If: readiness probe fails on > 50% of instances
  For: > 2 minutes
  Action: Pause rollout + alert on-call

Condition 4 — Business metric drop:
  If: conversion_rate < baseline_conversion_rate × 0.9
  For: > 10 minutes
  Action: Canary pause + alert team lead (not always auto-rollback — may be coincidence)

Condition 5 — Smoke test failure post-deploy:
  If: any smoke test fails immediately after deploy
  Action: Immediate rollback (no wait period)
```

**Rollback execution script:**
```bash
#!/bin/bash
# rollback.sh — triggered by automation on health check failure

PREVIOUS_VERSION=$(get_previous_version)
CURRENT_ENV=$1

echo "ROLLBACK initiated: reverting $CURRENT_ENV to $PREVIOUS_VERSION"

# 1. Switch traffic immediately
switch_traffic_to_version $PREVIOUS_VERSION

# 2. Page on-call
notify_pagerduty "Auto-rollback executed" "$(describe_failure)"

# 3. Create incident
create_incident_ticket "Auto-rollback: $CURRENT_ENV reverted from $CURRENT_VERSION to $PREVIOUS_VERSION"

# 4. Post to #incidents Slack
notify_slack "#incidents" "🚨 Auto-rollback executed in $CURRENT_ENV. On-call paged. See incident ticket."

echo "ROLLBACK complete. Monitor error rate for recovery."
```

---

### Step 5 — Deployment Notifications (Tuna, Salmon, Willy)

**Notification events and channels:**
| Event | Who to notify | Channel | Message format |
|---|---|---|---|
| Deploy started | Engineering | #deploys | "🚀 [service] v[version] deploying to [env] by [triggeredBy]" |
| Deploy succeeded | Engineering | #deploys | "✅ [service] v[version] live in [env] — took [X min]" |
| Deploy failed | Engineering + on-call | #deploys + PagerDuty | "❌ [service] deploy failed in [env] — [error summary]" |
| Auto-rollback triggered | Engineering + on-call + leadership | #incidents + PagerDuty | "🚨 Auto-rollback in [env]: [reason]" |
| Canary analysis: advance | Engineering | #deploys | "📊 Canary at [X]%: metrics clean — advancing to [next stage]" |
| Canary analysis: abort | Engineering + on-call | #deploys + PagerDuty | "⚠️ Canary aborted: [metric] exceeded threshold" |

**Deployment dashboard (visible to all engineers):**
- Live deploy status (in progress, success, failed)
- Last 10 deploys per service (version, duration, who triggered)
- Current canary stage if active
- Error rate before/after last deploy

---

### Step 6 — Runbook-to-Automation Conversion (Salmon, Willy)

Map every manual runbook step to its automated equivalent.

| Runbook step | Current: manual | Target: automated | Tool | Effort |
|---|---|---|---|---|
| SSH to server | Bastion SSH | AWS SSM Session Manager (no SSH keys) | SSM | 2h |
| Pull new image | `docker pull` | ECS task definition update | CI/CD pipeline | Done |
| Run migrations | `psql -f migration.sql` | Automated migration runner on deploy | Flyway/Liquibase | 1 day |
| Restart services | `sudo systemctl restart app` | ECS rolling update / k8s rollout | Orchestrator | Done |
| Check logs for errors | `tail -f /var/log/app.log` | CloudWatch Logs Insights query | Automated post-deploy check | 4h |
| Update JIRA ticket | Manual | Deployment webhook updates ticket | CI/CD webhook | 2h |
| Notify stakeholders | Slack DM | Automated Slack notification | CI/CD notification | Done |

**Runbook retirement criteria:** a runbook step is retired only when:
1. The automated equivalent has been running in production for 30+ days
2. Zero incidents caused by the automation during that period
3. On-call team has been briefed that the manual step no longer applies

---

### Final Output

**Manual deploy audit** — every step, time, risk, and automation status
**Health check spec** — startup/liveness/readiness probes with endpoint contracts
**Progressive rollout config** — rolling/blue-green/canary with exact parameters (Tuna+)
**Automated rollback triggers** — conditions, thresholds, rollback execution script
**Notification design** — events, channels, message formats (Tuna+)
**Runbook conversion map** — manual steps → automated equivalents with effort estimates (Salmon+)
**Deployment metrics** — frequency, lead time, rollback rate tracking
**Recommended next skill** — `/ds-devops-infrastructure-incident-management` — build the incident process that handles what automation can't prevent
