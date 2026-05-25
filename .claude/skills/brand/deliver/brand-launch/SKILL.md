---
name: ds-brand-brand-launch
description: Plans a brand launch or rebrand rollout with sequencing, asset migration checklist, internal activation, external announcement, and risk mitigation. Use when going live with a new or refreshed brand, or asking "how do we launch this brand without breaking everything". Also triggers on: Rollout sequencing, asset migration, internal brand launch, external announcement strategy, digital property update checklist.
tags: [brand, deliver]
model: inherit
---

# Brand Launch
**Domain**: Brand | **Phase**: Deliver | **Invocation**: `/ds-brand-brand-launch`

## What this produces
A brand launch plan: phased rollout sequence (internal → external), full asset migration checklist, internal activation plan, external announcement strategy, agency/partner briefing plan, risk mitigation, and launch metrics.

## Methods
Rollout sequencing, asset migration planning, internal brand launch, external announcement strategy, partner and agency briefing plan, digital property update checklist, crisis and confusion mitigation, press and media plan, launch metrics definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Rollout sequence, asset checklist, internal announcement |
| Tuna | Full launch plan with external announcement, partner briefing |
| Salmon | Complete plan with crisis mitigation, press strategy, metrics |
| Willy | All methods — phased global rollout, media plan, full metrics framework |

## Execution prompt
You are running Brand Launch for [project]. Plan a brand rollout that is coordinated, consistent, and doesn't break existing trust.

**Input**: brand guidelines, asset inventory (what's ready), launch timeline, stakeholder map.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Rollout Sequencing

```
Core principle: Internal before external. Employees who learn about a rebrand from the press are a brand problem waiting to happen.

Launch phases:
────────────────────────────────────────────────────────────────────────
Phase           Timing      Audience                    Goal
────────────────────────────────────────────────────────────────────────
Phase 0: Prep   D-30 → D-7  Internal stakeholders only  Assets ready, team briefed
Phase 1: Internal D-7 → D-0 All employees               Employees understand and can speak to brand
Phase 2: Soft launch D-0    Partners, agencies, key accounts Controlled introduction
Phase 3: Public launch D+1  Press, social, website live   Full public reveal
Phase 4: Full rollout D+7+  All remaining touchpoints     Complete migration
────────────────────────────────────────────────────────────────────────
```

### Step 2 — Asset Migration Checklist

```
Digital properties (highest priority — most visible):
────────────────────────────────────────────────────────────────────────
Asset                          Owner    Due date   Status    Notes
────────────────────────────────────────────────────────────────────────
Website (full rebrand)         [Name]   [Date]     [Status]  [Needs design + dev]
Website favicon                [Name]   [Date]     [Status]
Social profile images (all)    [Name]   [Date]     [Status]  [LinkedIn, Twitter, Facebook, Instagram]
Social cover images (all)      [Name]   [Date]     [Status]
Email signature template       [Name]   [Date]     [Status]  [Deploy to all employees]
Email header template          [Name]   [Date]     [Status]
App icon (if applicable)       [Name]   [Date]     [Status]
App store listing images       [Name]   [Date]     [Status]
────────────────────────────────────────────────────────────────────────

Documents and templates:
────────────────────────────────────────────────────────────────────────
Presentation template          [Name]   [Date]     [Status]
Proposal template              [Name]   [Date]     [Status]
Contract / letterhead          [Name]   [Date]     [Status]
Business cards (order)         [Name]   [Date]     [Status]
One-pager / sales sheet        [Name]   [Date]     [Status]
────────────────────────────────────────────────────────────────────────

Marketing assets:
────────────────────────────────────────────────────────────────────────
Ad creatives (all formats)     [Name]   [Date]     [Status]
Trade show materials           [Name]   [Date]     [Status]
Merchandise / swag             [Name]   [Date]     [Status]  [Longer lead time]
────────────────────────────────────────────────────────────────────────

Internal / operational:
────────────────────────────────────────────────────────────────────────
Employee onboarding materials  [Name]   [Date]     [Status]
Internal wiki / Notion         [Name]   [Date]     [Status]
Job postings                   [Name]   [Date]     [Status]
Recruiting materials           [Name]   [Date]     [Status]
────────────────────────────────────────────────────────────────────────

Domain and technical:
────────────────────────────────────────────────────────────────────────
New domain purchased (if any)  [Name]   [Date]     [Status]
Old domain 301 redirect set    [Name]   [Date]     [Status]
Google Analytics updated       [Name]   [Date]     [Status]
Email domain configured        [Name]   [Date]     [Status]
────────────────────────────────────────────────────────────────────────
```

### Step 3 — Internal Activation Plan

```
Internal launch goal: Every employee understands the new brand, can explain it, and knows where to find the assets.

Internal activation plan:
────────────────────────────────────────────────────────────────────────
Milestone           Timing    Channel              Owner    Content
────────────────────────────────────────────────────────────────────────
CEO/founder note    D-7       Email                CEO      Why we're changing, what it means
Leadership briefing D-5       Meeting/Loom          Comms    Talking points, Q&A prep
All-hands reveal    D-2       Video call + recording Comms   Full reveal + brand story
Slack announcement  D-0       #company channel      Comms    Launch day celebration + links
Brand guidelines live D-0     Intranet/Notion       Brand    All assets + guidelines accessible
Department briefings D+1-7    Per-team meetings     Brand    Role-specific guidance
────────────────────────────────────────────────────────────────────────

Employee activation kit (provide to all staff on launch day):
  □ Brand guidelines link (bookmark this)
  □ Asset library link (use these files — not old ones)
  □ Updated email signature template (instructions to install)
  □ "How to talk about our brand" one-pager (3 key messages)
  □ FAQ: "What to say if someone asks about the change"

Manager talking points:
  Q: "Why are we changing the brand?"    A: "[Approved response]"
  Q: "Does this mean the product changed?" A: "[Approved response]"
  Q: "Where do I get the new logo?"      A: "[Asset library link]"
```

### Step 4 — External Announcement Strategy

```
Public announcement plan:

Announcement day sequence:
  [HH:MM] Website goes live with new brand
  [HH:MM] Social profiles updated (all platforms simultaneously)
  [HH:MM] Social announcement post goes live
  [HH:MM] Press release distributed (if media strategy is part of launch)
  [HH:MM] Email to customers/subscribers (existing audience first)
  [HH:MM] Paid amplification activates (if budgeted)

Social announcement posts:
  LinkedIn (company page):
    "[Brand launch message — what changed and why. Story-driven, 300-500 words.
    Include: the reason for the change / what's staying the same / what's new]"
    Visuals: [Before/after if rebranding / launch visual if new]

  Twitter/X:
    "Today we're unveiling [brand name]'s new look. [Hook sentence.]
    Here's what changed and why: [thread format]"

  Instagram (if applicable):
    [Visual-first — show the new brand in action / brand video / hero image]

Customer / subscriber email:
  Subject: "[Brand name] has a new look — here's what changed"
  Key messages:
    1. [What changed — visual and/or name]
    2. [What stayed the same — your product/service, your team, your commitment]
    3. [Where to learn more]
  Tone: Warm, direct — this is news, not a marketing email
```

### Step 5 — Partner and Agency Briefing

```
Partner briefing sequence:
  [D-14]: Agency / design partner — full brand guidelines + asset access
  [D-7]:  Strategic partners — preview and co-marketing update
  [D-3]:  Key accounts / top customers (if relevant relationship level)
  [D-0]:  All other partners and vendors — announcement + updated asset links

Partner brand kit:
  □ Co-branding guidelines (how to use our new logo with theirs)
  □ Approved asset pack (logo files, color codes)
  □ "How to refer to us" guide (name, description, how NOT to describe us)
  □ Contact for brand questions: [Name / email]
```

### Step 6 — Risk Mitigation

```
Launch risks:
────────────────────────────────────────────────────────────────────────
Risk                                Likelihood  Impact  Mitigation
────────────────────────────────────────────────────────────────────────
Employee confusion / negative reaction  [H/M/L] [H/M/L] All-hands + FAQ in advance
Press/media picks up negative angle     [H/M/L] [H/M/L] Prepare spokesperson response
Customer confusion (thinks product changed) [H/M/L] [H/M/L] Customer email + clear FAQ
Old assets still in use by external parties [H/M/L] [M]   30-day migration window + partner outreach
Domain/SEO traffic drop                 [M]     [H]     301 redirects + SEO monitoring
Technical failure (website not live on time) [L] [H]   Staged rollout; fallback timeline
────────────────────────────────────────────────────────────────────────

SEO protection plan:
  □ 301 redirects from old URLs to new domain (if domain changes)
  □ Update Google Search Console with new domain
  □ Update sitemap and resubmit
  □ Monitor organic traffic for 30 days post-launch (alert if > 20% drop)
  □ Keep old domain active for minimum 12 months
```

### Step 7 — Launch Metrics

```
Brand launch success metrics:
────────────────────────────────────────────────────────────────────────
Metric                 Target           Measure by    Tool
────────────────────────────────────────────────────────────────────────
Asset migration complete  100% by D+30  Asset audit   Manual checklist
Employee adoption         > 90% using new email sig  D+7  Email sample
Social engagement         [X]+ reactions on launch posts  D+3  Social analytics
Website traffic           No drop > [X]%  D+7, D+30   GA4
Media coverage            [N] mentions (if PR strategy)  D+7  Media monitoring
Brand consistency score   Improve from audit baseline  D+90  Repeat audit
────────────────────────────────────────────────────────────────────────
30-day review: pull all metrics above; identify any asset or adoption gaps still open.
```

---

## Final Output
- Phased rollout sequence (Phase 0–4 with timing and audience)
- Full asset migration checklist (all touchpoints with owners and due dates)
- Internal activation plan (milestones, employee kit, manager talking points)
- External announcement strategy (social posts, customer email)
- Partner/agency briefing sequence
- Risk mitigation plan with SEO protection
- Launch metrics with 30-day review plan

**Recommended next skill**: `/ds-brand-brand-governance` — build the governance system that keeps the brand consistent after launch.
