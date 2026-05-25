---
name: ds-pr-communications-pr-execution
description: Executes a PR campaign with hour-by-hour launch runbook, monitoring dashboard, journalist inquiry SLAs, rapid response protocols, and escalation triggers. Use when running a live campaign, managing an announcement day, or asking "what do we do in the 24 hours around launch". Also triggers on: Day-of schedule, monitoring setup, social listening activation, inquiry response protocol, rapid response, escalation triggers.
tags: [pr-communications, deliver]
model: inherit
---

# PR Execution
**Domain**: PR/Communications | **Phase**: Deliver | **Invocation**: `/ds-pr-communications-pr-execution`

## What this produces
A PR execution runbook: hour-by-hour launch schedule, monitoring dashboard configuration, journalist inquiry response protocols with SLAs, social listening activation, rapid response decision tree, escalation triggers, and a 48-hour coverage log.

## Methods
Execution timeline with owners, monitoring dashboard setup, social listening activation, journalist inquiry response protocol, rapid response process, escalation trigger definition, spokesperson availability plan, real-time coverage tracking

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Day-of schedule, monitoring setup, response protocol |
| Tuna | Full runbook with escalation triggers, coverage tracking |
| Salmon | Full runbook with rapid response process, spokesperson plan |
| Willy | All methods — full monitoring dashboard, crisis fallback, 48-hour window plan |

## Execution prompt
You are running PR Execution for [project]. Execute the campaign and manage what happens in real time.

**Input**: PR campaign design, media outreach plan, message architecture, all approved assets.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Hour-by-Hour Execution Schedule

```
Launch day schedule — [Campaign name] — Embargo lifts: [Date] at [HH:MM] [Timezone]
════════════════════════════════════════════════════════════════════════════════════

PRE-LAUNCH (D-1)
────────────────────────────────────────────────────────────────────────
[HH:MM]  Internal team briefed via [Slack/All-hands/Email]               Owner: [Name]
[HH:MM]  All assets live-checked: press page, download links, images     Owner: [Name]
[HH:MM]  Spokesperson confirmed available and on-message                 Owner: [Name]
[HH:MM]  Monitoring dashboard activated (see Step 2)                     Owner: [Name]
[HH:MM]  Embargoed contacts final check — all received assets?           Owner: [Name]
[HH:MM]  Social posts drafted and scheduled (fire at embargo lift)       Owner: [Name]
[HH:MM]  Crisis fallback contacts confirmed and available                Owner: [Name]

LAUNCH DAY — EMBARGO LIFT
────────────────────────────────────────────────────────────────────────
[HH:MM]  EMBARGO LIFTS — confirm all embargoed contacts aware            Owner: [Name]
[HH:MM]  Press release distributed via wire (if using one)               Owner: [Name]
[HH:MM]  Blog post / newsroom page goes live                             Owner: [Name]
[HH:MM]  Social posts fire: LinkedIn, Twitter/X, owned channels          Owner: [Name]
[HH:MM]  Email to subscribers/customers goes out                         Owner: [Name]
[HH:MM]  Begin monitoring: first coverage check                          Owner: [Name]
[HH:MM]  First journalist inquiry response SLA clock starts              Owner: [Name]

LAUNCH DAY — ONGOING (every 2 hours)
────────────────────────────────────────────────────────────────────────
[HH:MM]  Coverage log updated (see Step 5)                               Owner: [Name]
[HH:MM]  Social listening check — sentiment, mentions, questions          Owner: [Name]
[HH:MM]  Tier D outreach (niche/podcast) begins                          Owner: [Name]
[HH:MM]  End-of-day coverage summary to [stakeholder]                    Owner: [Name]

D+1
────────────────────────────────────────────────────────────────────────
[HH:MM]  Follow-up to non-responding Tier B contacts                     Owner: [Name]
[HH:MM]  Newsletter/podcast outreach begins                              Owner: [Name]
[HH:MM]  Coverage log compiled; 24-hour report sent to leadership        Owner: [Name]
```

### Step 2 — Monitoring Dashboard Setup

```
Monitoring stack (configure before launch):
────────────────────────────────────────────────────────────────────────
Tool                  What to monitor              Alert threshold
────────────────────────────────────────────────────────────────────────
Google Alerts         Brand name / CEO name / product name — new results: instant
[Mention / Brand24]   All web mentions — real-time feed
[Twitter/X search]    Brand mentions + product name — real-time
LinkedIn              Brand tags + executive posts — notify on comment
[News aggregator]     Category keywords — hourly digest
────────────────────────────────────────────────────────────────────────

Keyword monitoring list:
  Brand:        [Company name], [CEO name], [Product name]
  Campaign:     [Announcement hook phrase], [Campaign hashtag]
  Competitors:  [Competitor names — track if they respond to coverage]
  Negative:     [Potential controversy terms — monitor proactively]
  Journalists:  [Top 10 journalist Twitter handles — track their posts]

Alert escalation:
  Green:  Expected positive coverage — log and share
  Yellow: Negative mention in Tier 2+ outlet — notify comms lead within 30 min
  Red:    Tier 1 negative story / crisis signal — notify comms lead + CEO within 15 min
```

### Step 3 — Journalist Inquiry Response SLAs

```
Inquiry response protocol:
────────────────────────────────────────────────────────────────────────
Inquiry type              SLA         Who responds    Escalate to
────────────────────────────────────────────────────────────────────────
Tier 1 interview request  30 min      PR lead         Comms lead if > 30 min
Tier 1 data/fact check    1 hour      PR lead + data  Legal if claim-sensitive
Tier 2 interview request  2 hours     PR lead         —
Tier 2 data/fact check    4 hours     PR lead         —
Tier 3 any request        24 hours    PR coordinator  —
Hostile / negative angle  2 hours     PR lead + legal Comms lead immediately
No-comment request        Immediate   PR lead         Never say "no comment"
────────────────────────────────────────────────────────────────────────

Response triage script:
  "Thank you for reaching out. [If interview:] I'll confirm spokesperson availability within [SLA].
   [If fact-check:] Can you share the specific claim you're verifying? I'll get you accurate information by [time].
   [If hostile:] I want to make sure we give you accurate information. Can you share the specific concerns you're exploring?"

Forbidden responses:
  □ "No comment" — always offer to help or redirect
  □ "That's off the record" — assume everything is on the record
  □ Forward-looking financial statements without legal sign-off
  □ Commenting on rumors or unconfirmed competitor claims
```

### Step 4 — Rapid Response Decision Tree

```
Rapid response protocol:

Trigger: A story is published with inaccurate information.
──────────────────────────────────────────────────────────────────
Is the inaccuracy material (changes meaning / damages reputation)?
  YES → Contact journalist within 1 hour with specific correction and source
  NO  → Monitor; decide if correction is worth a response (if not: let it go)

Trigger: A negative story is published (accurate but unfavorable).
──────────────────────────────────────────────────────────────────
Is a response in our interest?
  Often not — responses amplify coverage and give a second news cycle
  Response is warranted when:
    → Safety or legal matters are involved
    → The story has Tier 1 reach and material misrepresentation
    → Silence would be interpreted as confirmation
  If responding: respond to the journalist (not via social), stay on message, don't add new information

Trigger: A competitor responds to our announcement.
──────────────────────────────────────────────────────────────────
Monitor the coverage. Do not engage publicly.
If journalists ask for comment on competitor response:
  Bridge to our SOCO and core messages — do not get drawn into competitor framing.
  Approved response: "[Bridging phrase] — [Core message 1/2/3]"

Trigger: Story goes viral (positive or negative).
──────────────────────────────────────────────────────────────────
Positive: Amplify via owned channels; thank coverage; activate community sharing
Negative: Invoke crisis fallback (see Step 5 escalation); do NOT pile on
```

### Step 5 — Escalation Triggers and Contacts

```
Escalation tiers:
────────────────────────────────────────────────────────────────────────
Level   Trigger                                    Action               Contact
────────────────────────────────────────────────────────────────────────
L1      Negative Tier 3 mention                    Monitor; log         PR lead
L2      Negative Tier 2 story / fact-check         Rapid response       PR lead + comms lead
L3      Negative Tier 1 story / inaccuracy         Rapid response + legal review  Comms lead + legal
L4      Crisis signal (safety / legal / exec)      Activate crisis comms CEO + legal + comms lead
────────────────────────────────────────────────────────────────────────

Emergency contacts (available day of launch):
  PR lead:        [Name] — [Phone] — [Signal/WhatsApp]
  Comms lead:     [Name] — [Phone]
  Legal review:   [Name] — [Phone]
  CEO / Exec:     [Name] — [Phone] — [only L4 escalation]
  Agency (if any):[Name] — [Phone]
```

### Step 6 — Coverage Log Template

```
Coverage log — Campaign: [Name]
────────────────────────────────────────────────────────────────────────────────────────────
Date    Journalist    Outlet    Tier  URL    Headline    Sentiment  Messages used  Notes
────────────────────────────────────────────────────────────────────────────────────────────
[Date]  [Name]        [Outlet]  T1    [URL]  [Headline]  Pos/Neu/Neg [M1/M2/M3]   [Notes]
────────────────────────────────────────────────────────────────────────────────────────────

Coverage summary (update every 24 hours):
  Total pieces: [N]
  Tier 1: [N] | Tier 2: [N] | Tier 3: [N]
  Net sentiment: [%] positive / [%] neutral / [%] negative
  Core message pull-through:
    Message 1 mentioned in [%] of coverage
    Message 2 mentioned in [%] of coverage
    Message 3 mentioned in [%] of coverage
  Best performing piece: [URL] — why: [Reason]
  Problem piece (if any): [URL] — action taken: [Response / monitoring]
```

---

## Final Output
- Hour-by-hour execution schedule (D-1 through D+1)
- Monitoring dashboard setup (tools, keywords, alert thresholds)
- Journalist inquiry SLAs with response scripts
- Rapid response decision tree (inaccuracy / negative story / competitor / viral)
- Escalation tiers with emergency contacts
- Coverage log template with 24-hour summary format

**Recommended next skill**: `/ds-pr-communications-communications-retrospective` — after the campaign window closes, analyze coverage performance and refine the communications strategy.
