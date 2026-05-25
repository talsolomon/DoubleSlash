---
name: ds-devops-infrastructure-incident-management
description: Designs or runs an incident management process from detection to post-mortem. Use when responding to an outage, building on-call culture, or asking "how do we handle incidents better". Also triggers on: Incident severity classification, response runbook design, on-call rotation design, communication template creation, escalation path definition, war room process.
tags: [devops-infrastructure, deliver]
model: inherit
---

# Incident Management
**Domain**: DevOps/Infrastructure | **Phase**: Deliver | **Invocation**: `/ds-devops-infrastructure-incident-management`

## What this produces
An incident management framework with severity tiers, response runbook, communication templates, escalation paths, blameless post-mortem process, and MTTD/MTTR metrics tracking.

## Methods
Incident severity classification, response runbook design, on-call rotation design, communication template creation, escalation path definition, war room process, blameless post-mortem design, MTTD/MTTR metric tracking

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core framework | Severity tiers + response steps + escalation path |
| Tuna | Full framework | All above + communication templates + post-mortem template |
| Salmon | Complete process | All above + on-call design + MTTD/MTTR tracking + runbook library |
| Willy | Incident culture | All methods + war room protocol + blameless culture guide + metrics dashboard |

---

## Execution Prompt

Read the project context: current incident history, team structure, available tooling (PagerDuty, Opsgenie, Slack, etc.), FISH classification. The best incident management is boring: clear severity, clear steps, clear owner, and learning that prevents recurrence.

---

### Step 1 — Severity Classification (all FISH levels)

Every incident needs a severity in the first 5 minutes. Severity drives the response process, escalation, and retrospective timeline.

| SEV | Name | Definition | Examples | Response SLA | Post-mortem timeline |
|---|---|---|---|---|---|
| **SEV 1** | Critical | Total service outage — all/most users unable to use core functionality | Site down, payments failing for all users, data loss, security breach | Page on-call immediately, war room within 15 min | Within 24 hours |
| **SEV 2** | Major | Significant degradation — core feature unavailable for substantial % of users | Checkout broken for 20%+ users, API error rate > 5%, SLA breach | Page on-call, response within 30 min | Within 48 hours |
| **SEV 3** | Minor | Partial degradation — some users impacted, workaround available | Slow performance, non-critical feature failing, elevated error rate < 5% | On-call aware, response within 2 hours | Within 1 week |
| **SEV 4** | Low | Edge case — minimal user impact, no SLA risk | Single user's issue, UI glitch in edge case, degraded dev environment | Business hours response | Within 2 weeks (optional) |

**Classification rules:**
- When in doubt, classify higher — it's cheaper to downgrade than to under-respond
- Data loss or security breach = SEV 1, always, regardless of user count
- SLA breach in progress = at least SEV 2
- The engineer paged classifies severity — don't wait for a manager to confirm

**Severity can change:** downgrade if impact is confirmed smaller; upgrade if impact expands.

---

### Step 2 — Incident Response Runbook (all FISH levels)

The response runbook is what an engineer follows at 3am without thinking. Write it for clarity, not elegance.

```markdown
# Incident Response Runbook

## Step 0 — Acknowledge (< 5 min)
1. Acknowledge the PagerDuty/Opsgenie alert (stops escalation)
2. Post in #incidents: "👀 I'm looking at [alert name]. Will update in 10 min."
3. Classify severity (see classification table)

## Step 1 — Assess (< 15 min)
1. Is this a known issue? Check runbook index for this service
2. What is the user impact? Check monitoring dashboard
   - Error rate: [link to dashboard]
   - Latency: [link to dashboard]
   - Active users affected: [link to dashboard]
3. When did it start? Check deploy log
   - Recent deploy? Rollback first, investigate later
   - No recent deploy? Continue investigation

## Step 2 — Communicate (< 20 min)
1. Update #incidents with current understanding:
   "SEV [X] — [service] experiencing [issue]. Impact: [who/what]. Investigation underway."
2. For SEV 1/2: notify [engineering lead] via direct message
3. For SEV 1: update status page: "We are aware of an issue affecting [service] and are investigating."

## Step 3 — Contain (within 30 min for SEV 1/2)
1. Can we roll back the last deploy? → Roll back first if in doubt
   kubectl rollout undo deployment/[service-name]
   OR
   aws ecs update-service --desired-count [N] --task-definition [prev-version]
2. Can we disable the failing feature flag? → Disable it
3. Can we scale up to absorb load? → Scale
4. Can we route around the failing component? → Route around

## Step 4 — Resolve
1. Apply fix (rollback, config change, restart, or code fix)
2. Monitor for 15 minutes — confirm metrics return to baseline
3. Post in #incidents: "✅ [service] restored. Impact duration: [X min]. Monitoring."
4. Update status page: "This incident has been resolved."

## Step 5 — Document
1. Write incident summary in the incident ticket (see template below)
2. Assign post-mortem owner and due date based on SEV level
3. Leave the #incidents thread open until post-mortem is published
```

---

### Step 3 — Communication Templates (Tuna, Salmon, Willy)

**Internal #incidents Slack templates:**
```
INITIAL (T+0):
"🚨 [SEV X] INCIDENT — [service] | [time]
What: [one sentence description]
Impact: [who is affected, what they experience]
Status: Investigating
IC: @[incident-commander]"

UPDATE (every 30 min for SEV 1/2):
"📊 UPDATE — [time elapsed since start]
What we know: [current hypothesis or confirmed cause]
Actions taken: [what has been done]
Next: [what we're doing now]
ETA to resolution: [estimate or "unknown"]"

RESOLUTION:
"✅ RESOLVED — [service] — [time]
Duration: [X min]
Impact: [N users for Y min]
Root cause: [one sentence]
Post-mortem: [owner] to publish by [date]"
```

**External status page templates:**
```
INVESTIGATING:
"We are aware of an issue affecting [Product Feature] and are currently investigating.
We will provide an update within 30 minutes."

IDENTIFIED:
"We have identified the cause of the issue affecting [Product Feature] and are working on a fix.
We will provide an update within [X] minutes."

MONITORING:
"A fix has been applied and we are monitoring to confirm full resolution.
We apologize for the inconvenience."

RESOLVED:
"This incident has been resolved. [Product Feature] is fully operational.
We will publish a post-mortem within [24/48] hours."
```

**Customer-facing email (SEV 1, > 30 min duration):**
```
Subject: Service Disruption — [Product] [Date]

We experienced a service disruption affecting [feature] between [start time] and [end time] UTC.

Impact: [clear description of what users experienced]
Duration: [X minutes]

We sincerely apologize for this disruption. We have resolved the issue and [Product Feature] is fully operational.

We will publish a detailed post-mortem at [link] by [date].

— [Company] Engineering Team
```

---

### Step 4 — Escalation Paths (all FISH levels)

**Escalation matrix:**
| SEV | Primary responder | Escalate to | Escalate if | Executive notification |
|---|---|---|---|---|
| SEV 1 | On-call engineer | Engineering lead | > 30 min unresolved | > 60 min unresolved |
| SEV 2 | On-call engineer | Engineering lead | > 60 min unresolved | If SLA breach confirmed |
| SEV 3 | On-call engineer | — | Business hours | Never |
| SEV 4 | Engineer (business hours) | — | Never | Never |

**On-call rotation design:**
```
Primary on-call: 1 engineer, 1 week rotation
Secondary on-call: 1 engineer (backup if primary unreachable within 15 min)
Escalation contact: engineering lead (paged if escalation criteria met)

On-call tooling: PagerDuty / Opsgenie
Paging schedule: 24/7 for SEV 1/2; business hours only for SEV 3/4
Response SLA: acknowledge within 5 min (SEV 1), 15 min (SEV 2), 2h (SEV 3)

On-call readiness requirements:
  - Working laptop available during on-call week
  - VPN access configured and tested
  - Production access (read) provisioned
  - Runbook index bookmarked and readable
  - Escalation contacts saved in phone
```

---

### Step 5 — Blameless Post-Mortem (Tuna, Salmon, Willy)

**Post-mortem template:**
```markdown
## Post-Mortem: [Incident title]

Date: [YYYY-MM-DD]
SEV: [1/2/3/4]
Duration: [X min]
Author: [name]
Reviewers: [names]

## Summary
[2–3 sentences: what failed, what users experienced, what resolved it]
Write for a non-engineer. No jargon.

## Impact
Users affected: [N or X%]
Duration of user-facing impact: [X min]
Revenue impact: [$X or "estimating"]
SLA status: [Not breached / Breached — X min over budget]

## Timeline (blameless format)
HH:MM — [event, stated as system behavior, not person behavior]
HH:MM — [alert fired / user reported]
HH:MM — [on-call acknowledged]
HH:MM — [hypothesis: ...]
HH:MM — [hypothesis tested: result]
HH:MM — [root cause identified: ...]
HH:MM — [fix applied: ...]
HH:MM — [metrics returned to baseline]

Notable gaps:
  HH:MM – HH:MM: [X min] — [what caused this delay?]

## Root Cause (5 Whys)
Symptom: [user-visible failure]
Why 1: [technical cause]
Why 2: [underlying cause]
Why 3: [design/process cause]
Why 4: [organizational cause]
Root cause: [systemic issue]

## Action Items
| # | Action | Category | Owner | Due | Done when |
|---|---|---|---|---|---|
| 1 | [specific action] | [Detection/Prevention/Runbook] | [name] | [date] | [testable outcome] |

## What went well
- [Something that worked — blameless includes credit, not just blame]

## Contributing factors
- [System design decisions that contributed to the failure]
- [Process gaps that slowed detection or resolution]
```

**Blameless framing rules:**
- Replace "X made a mistake" → "change X was deployed"
- Replace "Y didn't notice" → "no alert was configured for Y condition"
- Replace "Z forgot to" → "the process did not have a reminder for Z"
- The post-mortem author is responsible for blameless framing — edit any blame language before publishing

---

### Step 6 — MTTD/MTTR Tracking (Salmon, Willy)

**Metrics to track:**
```
MTTD (Mean Time To Detect):
  = time from incident start → alert fires (or first internal notice)
  Target: < 5 minutes for SEV 1/2

MTTR (Mean Time To Resolve):
  = time from incident start → full resolution
  Target: < 60 min (SEV 1), < 4h (SEV 2)

MTTF (Mean Time To Fail):
  = average time between incidents for a service
  Higher = more reliable
  
Change Failure Rate:
  = deploys that caused an incident / total deploys
  Target: < 5%
```

**Monthly incident review:**
| Month | SEV 1 count | SEV 2 count | Avg MTTD | Avg MTTR | Budget consumed | Top root cause category |
|---|---|---|---|---|---|---|
| [YYYY-MM] | [N] | [N] | [X min] | [X min] | [X% of SLO budget] | [category] |

**Trend analysis:**
- MTTD increasing → detection gap (missing alerts, wrong thresholds)
- MTTR increasing → response gap (missing runbooks, access issues, tooling friction)
- Change failure rate increasing → quality gate or deployment process gap
- Same root cause category repeating → action items from post-mortems not being completed

---

### Final Output

**Severity classification table** — SEV 1–4 with definitions, examples, and response SLAs
**Incident response runbook** — step-by-step, written for 3am use
**Communication templates** — internal Slack, status page, customer email (Tuna+)
**Escalation matrix** — primary/secondary/executive paths with conditions
**On-call rotation design** — tooling, schedule, readiness requirements (Salmon+)
**Blameless post-mortem template** — with 5 Whys format and framing rules (Tuna+)
**MTTD/MTTR tracking** — metrics, targets, monthly review format (Salmon+)
**Recommended next skill** — `/ds-devops-infrastructure-infrastructure-audit` — use incident data to reprioritize the infrastructure risk backlog
