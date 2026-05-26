---
name: ds-ai-ml-ai-deployment
description: Plans production deployment of an AI/ML system — serving architecture, latency/throughput planning, monitoring setup, drift detection, fallback design, safety guardrails, and phased rollout strategy.
tags: [ai-ml, deliver]
model: inherit
---

# AI Deployment
**Domain**: AI/ML | **Phase**: Deliver | **Invocation**: `/ds-ai-ml-ai-deployment`

## What this produces
An AI deployment plan with serving architecture, monitoring setup (metrics + alerts), fallback and circuit breaker design, drift detection, safety guardrails, phased rollout strategy, and go-live checklist.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Serving approach, monitoring plan, rollout sequence |
| Tuna | Deployment plan with fallback design, A/B strategy |
| Salmon | Full plan with drift detection, safety design, incident response |
| Willy | All methods — full monitoring setup, guardrail spec, runbook |

---

## Execution Prompt

You are planning AI Deployment for [project]. ML systems fail silently — build monitoring that catches drift, degradation, and edge case failures before users do.

**Input**: model design spec, infrastructure context, risk tolerance, rollout timeline.

---

### 1. Serving Architecture

```
Serving pattern: [Online inference / Batch inference / Streaming / Hybrid]

Online inference (real-time, user-facing):
  Endpoint: [REST API / gRPC / WebSocket]
  Latency target: [P50/P95/P99 — e.g., P95 < 200ms]
  Throughput: [Requests per second at peak]
  Concurrency: [Max parallel requests]
  
Infrastructure:
  Compute: [CPU / GPU / TPU — spec]
  Hosting: [SageMaker / Vertex AI / Kubernetes / Lambda / Dedicated server]
  Scaling: [Auto-scaling min/max instances + trigger metric]
  Load balancing: [Strategy + health check config]

Model serving framework:
  [TorchServe / TF Serving / FastAPI + uvicorn / vLLM / Triton]
  Reason: [Why this framework for this model type]

Latency optimization (if P95 target < 100ms):
  - Model quantization (INT8/FP16): [expected latency reduction vs. accuracy tradeoff]
  - Model pruning: [expected size reduction]
  - Response caching: [cache common inputs — TTL = X minutes]
  - Batching: [dynamic batching for GPU — batch size N, max wait Xms]
```

---

### 2. Monitoring Setup

ML systems have two failure modes: infrastructure failures (caught by standard SRE) and model failures (require ML-specific monitoring).

**Model performance monitoring:**
| Metric | Baseline | Alert threshold | Cadence |
|---|---|---|---|
| [Primary ML metric — e.g., accuracy] | [Baseline from test set] | [< baseline × 0.9] | Daily |
| [Latency P95] | [Expected from load test] | [> 200ms] | Real-time |
| [Error rate] | [0%] | [> 1%] | Real-time |
| [Null/invalid prediction rate] | [0%] | [> 2%] | Hourly |

**Data drift monitoring:**
| Signal | Method | Alert condition |
|---|---|---|
| Input feature distribution | PSI (Population Stability Index) | PSI > 0.2 for any feature |
| Prediction distribution | KS test vs. baseline | p-value < 0.05 |
| Label drift (if available) | Distribution comparison | > 10% shift |

**PSI interpretation**: < 0.1 = no drift. 0.1–0.2 = minor drift, monitor. > 0.2 = significant drift, investigate. > 0.25 = trigger retraining.

**Business metric monitoring** (the signal the model is supposed to move):
| Business metric | Expected impact | Monitoring lag | Alert |
|---|---|---|---|
| [e.g., Click-through rate] | [+X% from model deployment] | [7 days] | [Drop below pre-deployment baseline] |

---

### 3. Fallback and Circuit Breaker Design

```
Fallback strategy: [What happens when the model fails or is unavailable?]
  Option A: [Rule-based fallback — describe the rules]
  Option B: [Return default / most common prediction]
  Option C: [Queue request and serve when model recovers]
  Option D: [Degrade gracefully — show feature without AI enhancement]

Circuit breaker trigger conditions:
  - Error rate > [X%] over [N minutes] → open circuit, serve fallback
  - Latency P95 > [Xms] over [N minutes] → open circuit
  - Model accuracy drops below [X%] (if ground truth available real-time) → open circuit

Circuit breaker states:
  - Closed: model serving normally
  - Open: fallback active, model bypassed
  - Half-open: route [5-10%] of traffic to model to test recovery

Recovery:
  Automatic: after [N minutes], attempt half-open
  Manual: require operator approval before fully closing
```

---

### 4. Rollout Strategy

```
Phase 1 — Shadow mode (0% of users see model output):
  Duration: [1-2 weeks]
  What: model runs in parallel with production system, output logged but not shown
  Success criteria: prediction volume matches expectation, no errors, latency OK

Phase 2 — Canary (5% of traffic):
  Duration: [1 week]
  What: small % of users receive model-powered experience
  Success criteria: [ML metrics] + [business metrics] meet targets, no degradation

Phase 3 — Gradual rollout (25% → 50% → 100%):
  Cadence: [Expand every X days if metrics hold]
  Rollback trigger: [If [metric] drops > X% vs. control]
  Full rollout gate: [Approval required from [stakeholder]]

A/B test configuration:
  Control: [Current behavior]
  Treatment: [Model-powered behavior]
  Primary success metric: [Business metric — not ML metric]
  Minimum detectable effect: [X%]
  Required sample size: [N users per variant — calculate from MDE + power]
  Test duration: [N days — minimum 2 business cycles]
```

---

### 5. Safety Guardrails

For LLM and generative AI systems — required before production.

| Guardrail | What it prevents | Implementation |
|---|---|---|
| Input validation | Prompt injection, malicious inputs | [Input sanitization, content filter, length limits] |
| Output filtering | Harmful, biased, or off-topic content | [Content classifier, rule-based filter, human review queue] |
| Rate limiting | Abuse, cost overrun | [Per-user, per-IP rate limits] |
| PII detection | Exposing private data in outputs | [Presidio / regex patterns / LLM-based PII classifier] |
| Hallucination detection | Factually wrong outputs | [Retrieval grounding, confidence threshold, citation requirement] |

---

### 6. Go-Live Checklist

```
Infrastructure:
[ ] Load test completed — P95 latency meets target under 2× expected peak
[ ] Auto-scaling tested and verified
[ ] Fallback path tested and verified
[ ] Circuit breaker tested manually

Monitoring:
[ ] All alerts configured and tested
[ ] Dashboards set up and verified with real data
[ ] On-call runbook written and reviewed
[ ] PagerDuty/alerting integrated

Model:
[ ] Final model version registered and tagged for production
[ ] Model card documented (intended use, limitations, eval results)
[ ] Rollback plan documented — which version to roll back to and how

Compliance:
[ ] Privacy review completed
[ ] Legal review completed (if applicable)
[ ] Guardrails tested against adversarial inputs
[ ] Bias evaluation results documented
```


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
