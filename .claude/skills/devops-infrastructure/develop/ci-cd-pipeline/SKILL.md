---
name: ds-devops-infrastructure-ci-cd-pipeline
description: Designs CI/CD pipelines for fast, safe software delivery. Use when setting up automated builds and deploys, improving release velocity, or asking "how do we ship code reliably and quickly". Also triggers on: Pipeline stage design (build/test/scan/deploy), quality gate definition, test strategy integration, deployment strategy selection (blue-green/canary/rolling), rollback mechanism design, secret management.
tags: [devops-infrastructure, develop]
model: inherit
---

# CI/CD Pipeline
**Domain**: DevOps/Infrastructure | **Phase**: Develop | **Invocation**: `/ds-devops-infrastructure-ci-cd-pipeline`

## What this produces
A CI/CD pipeline design with stage definitions, quality gates, deployment strategy, rollback mechanism, secret management, and pipeline metrics.

## Methods
Pipeline stage design, quality gate definition, test strategy integration, deployment strategy selection (blue-green/canary/rolling), rollback mechanism design, secret management, environment promotion model, pipeline-as-code specification, DORA metrics instrumentation

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Pipeline overview | Stage diagram + quality gates + deployment strategy |
| Tuna | Full pipeline design | All above + rollback mechanism + environment model + secret handling |
| Salmon | Pipeline spec | All above + pipeline-as-code spec + security scanning + metrics |
| Willy | Complete delivery system | All methods + DORA instrumentation + full security integration + team onboarding guide |

---

## Execution Prompt

Read the project context: tech stack, deployment target (cloud/container/serverless), quality requirements, current pain points (slow builds, flaky tests, risky deploys), FISH classification.

---

### Step 1 — Pipeline Stage Design (all FISH levels)

The pipeline is the product team's floor — every minute of build time and every false failure is friction. Design for speed AND safety.

**Standard pipeline stages:**
```
Commit → [1. Lint/Format] → [2. Unit Tests] → [3. Build] → [4. Integration Tests] 
→ [5. Security Scan] → [6. Push Artifact] → [7. Deploy to Staging] 
→ [8. Smoke Tests] → [9. Deploy to Production] → [10. Post-Deploy Validation]
```

**Stage specification:**
| Stage | Purpose | Failure behavior | Target time |
|---|---|---|---|
| **1. Lint/Format** | Code style, static analysis | Fail fast — block PR | < 1 min |
| **2. Unit Tests** | Logic correctness | Fail fast — block PR | < 5 min |
| **3. Build** | Compile, bundle, containerize | Fail fast — block PR | < 3 min |
| **4. Integration Tests** | Service integration correctness | Fail — block merge | < 10 min |
| **5. Security Scan** | SAST, dependency CVEs, secrets detection | CRITICAL = block; HIGH = warn | < 5 min |
| **6. Push Artifact** | Publish to registry with immutable tag | Fail — no deploy | < 2 min |
| **7. Deploy Staging** | Apply to staging environment | Fail — stop pipeline | < 5 min |
| **8. Smoke Tests** | Core flows work in staging | Fail — rollback staging | < 5 min |
| **9. Deploy Production** | Apply to production | Fail → trigger rollback | < 10 min |
| **10. Post-Deploy** | Verify metrics, run acceptance tests | Alert on failure | < 10 min |

**Total target pipeline time**: < 30 minutes from commit to production.

**Parallelization opportunities:**
- Stages 1, 2: run simultaneously (both fast, independent)
- Integration test suites: shard across multiple runners
- Security scans: run in parallel with integration tests

---

### Step 2 — Quality Gates (all FISH levels)

A quality gate is a mandatory check with a defined pass/fail threshold. Gates with no consequence are not gates.

| Gate | Metric | Pass threshold | Fail action |
|---|---|---|---|
| Test coverage | Line coverage % | ≥ 80% (never decrease) | Block merge |
| Unit test pass rate | Tests passing | 100% | Block merge |
| SAST findings | Critical/High vulnerabilities | 0 new critical; 0 new high | Block merge |
| Dependency CVEs | Known CVEs in lockfile | 0 critical unfixed | Block merge |
| Build size (if applicable) | Bundle size change | < +10% vs. main | Warn + require approval |
| Performance regression | p99 latency in smoke test | < +20% vs. baseline | Warn + require approval |

**Quality gate configuration (GitHub Actions example):**
```yaml
- name: Coverage gate
  run: |
    COVERAGE=$(./coverage.sh --format=number)
    if [ "$COVERAGE" -lt "80" ]; then
      echo "Coverage $COVERAGE% is below threshold 80%"
      exit 1
    fi
```

**Anti-patterns to avoid:**
- Gates that only warn but never block (nobody reads warnings in CI)
- Gates that are regularly bypassed with `--skip-ci` or `[ci skip]`
- Flaky tests in the gate (produces false failures → team ignores failures)
- Overly strict gates on non-critical paths (stops all work for cosmetic issues)

---

### Step 3 — Deployment Strategy Selection (all FISH levels)

| Strategy | Rollback time | Risk level | DB schema changes | Use when |
|---|---|---|---|---|
| **Blue-Green** | Seconds | Low | Requires backward compatibility | Zero-downtime required, stateless services |
| **Canary** | Minutes | Medium | Same requirement | Need real-traffic validation before full rollout |
| **Rolling** | Minutes-hours | Medium | Forward-compatible only | Standard deploys, k8s native, cost-conscious |
| **Feature Flags** | Seconds | Very Low | Independent of deploy | Decouple code deploy from feature release |
| **Direct/In-place** | Manual redeploy | High | Must complete before restart | Low-traffic, dev, internal tools only |

**Decision matrix:**
```
Has breaking DB schema change?
  Yes → Blue-Green (never rolling with a breaking migration)
  No  → continue...

Needs instant rollback?
  Yes → Blue-Green or Feature Flags
  No  → continue...

Need real user signal before full rollout?
  Yes → Canary
  No  → Rolling (if k8s native) or Blue-Green
```

**Canary rollout schedule (standard):**
```
Stage 1:  1% traffic → observe 30 minutes → check metrics
Stage 2: 10% traffic → observe 60 minutes → check metrics
Stage 3: 25% traffic → observe 60 minutes → check metrics
Stage 4: 50% traffic → observe 60 minutes → check metrics
Stage 5: 100% traffic
Auto-rollback: if error rate > baseline + 0.5% for > 5 minutes at any stage
```

---

### Step 4 — Rollback Mechanism (Tuna, Salmon, Willy)

**Rollback is not optional — design it before the deploy, not during the incident.**

| Strategy | Rollback mechanism | Time | Prerequisite |
|---|---|---|---|
| Blue-Green | Switch LB target group back to blue | < 30 seconds | Blue environment still running |
| Canary | Route 100% traffic back to stable | < 60 seconds | Stable version still deployed |
| Rolling | `kubectl rollout undo deployment/app` | 3–5 minutes | Previous revision retained |
| Feature Flag | Set flag to off | < 10 seconds | Flag exists, code handles both paths |

**Automated rollback triggers (configure in deployment pipeline):**
```
Monitor for 15 minutes post-deploy:
  If: error_rate > (baseline_error_rate × 2) for > 3 minutes
  Or: p99_latency > (baseline_p99 × 1.5) for > 5 minutes
  Or: any smoke test fails post-deploy
  Then: auto-rollback to previous version
        page on-call
        create incident ticket
```

**Down migration for DB schema changes:**
```
Rule: every schema migration must have a tested down migration BEFORE the up migration runs.

Rollback with schema change:
  Step 1: Roll back application code (restores read on old column)
  Step 2: Run down migration (restores old schema)
  Step 3: Verify DB and app are consistent
  Step 4: Post-mortem why deploy required rollback
```

---

### Step 5 — Secret Management (Tuna, Salmon, Willy)

Secrets in code = critical security finding. Secrets in environment variables = slightly better but still exposed in process tables and logs.

**Secret management architecture:**
```
Source of truth: AWS Secrets Manager / HashiCorp Vault / GCP Secret Manager

In CI pipeline:
  - Secrets injected at runtime via OIDC (no long-lived credentials)
  - GitHub Actions: use aws-actions/configure-aws-credentials with OIDC role assumption
  - Never stored in environment variables in the pipeline config file
  - Never printed in logs (mask all secret values in CI output)

In application at runtime:
  - Secrets fetched from Secrets Manager on startup (not hardcoded)
  - Rotated every 90 days automatically via Secrets Manager rotation
  - Access granted via IAM role to application service account (not API key)

Secrets scanning in pipeline:
  - Run truffleHog or gitleaks on every commit
  - Block merge if any secret pattern matched
  - Pre-commit hook to catch before push (defense in depth)
```

**Secret rotation policy:**
| Secret type | Rotation frequency | Rotation method |
|---|---|---|
| DB passwords | 90 days | Secrets Manager automatic rotation |
| API keys (external) | 90 days | Manual with zero-downtime swap |
| TLS certificates | Before expiry (auto via ACM/Let's Encrypt) | Automated |
| SSH keys | 180 days | Periodic + on any team change |

---

### Step 6 — Pipeline-as-Code Specification (Salmon, Willy)

**Tooling selection:**
| Tool | Best for | Avoid when |
|---|---|---|
| GitHub Actions | GitHub-native, OSS projects | Self-hosted security requirements |
| GitLab CI/CD | GitLab native, self-hosted option | GitHub primary |
| Jenkins | Complex pipelines, on-premise required | Modern cloud-native teams |
| CircleCI | Docker-native, fast setup | Cost sensitive at scale |
| Tekton / Argo CD | k8s-native, GitOps | Non-k8s environments |

**Pipeline-as-code structure (GitHub Actions):**
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Lint
        run: make lint
      - name: Unit tests + coverage
        run: make test coverage
      - name: Coverage gate
        run: ./scripts/coverage-gate.sh 80

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SAST scan
        uses: github/super-linter@v5
      - name: Dependency CVE check
        run: make audit
      - name: Secrets scan
        run: trufflehog git file://. --fail

  build:
    needs: [quality-gates, security-scan]
    runs-on: ubuntu-latest
    steps:
      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          tags: ${{ env.REGISTRY }}/app:${{ github.sha }}

  deploy-staging:
    needs: build
    environment: staging
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: ./deploy.sh staging ${{ github.sha }}
      - name: Smoke tests
        run: make smoke-test ENVIRONMENT=staging

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    environment: production
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: ./deploy.sh production ${{ github.sha }}
      - name: Post-deploy validation
        run: make smoke-test ENVIRONMENT=production
```

---

### Step 7 — DORA Metrics Instrumentation (Willy)

Instrument the pipeline to track DORA metrics from day one.

| DORA Metric | How to measure | Where to collect |
|---|---|---|
| **Deployment Frequency** | Count deploys to production per day/week | CD pipeline deploy event |
| **Lead Time for Changes** | Time from commit merge to production deploy | Git commit timestamp → deploy timestamp |
| **Change Failure Rate** | Deploys that trigger rollback or hotfix | Deploy event + rollback event |
| **MTTR** | Time from incident open to resolution | Incident tracking system (PagerDuty) |

**Pipeline events to emit:**
```json
{
  "event": "deploy.completed",
  "timestamp": "2026-05-25T10:00:00Z",
  "service": "api",
  "version": "abc1234",
  "environment": "production",
  "duration_seconds": 847,
  "status": "success",
  "triggered_by": "merge",
  "commit_timestamp": "2026-05-25T08:30:00Z"
}
```

---

### Final Output

**Pipeline stage diagram** — stages, order, parallelism, target times
**Quality gates** — metric, threshold, failure action per gate
**Deployment strategy** — chosen approach with rollback time and mechanism
**Rollback design** — automated triggers, step-by-step procedure, DB rollback plan (Tuna+)
**Secret management** — storage, injection, rotation policy (Tuna+)
**Pipeline-as-code spec** — tooling selection, YAML structure (Salmon+)
**DORA instrumentation** — events to emit, metrics to track (Willy)
**Recommended next skill** — `/ds-devops-infrastructure-infrastructure-as-code` — codify the infrastructure this pipeline deploys to
