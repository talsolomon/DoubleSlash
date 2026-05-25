---
name: ds-marketing-campaign-launch
description: Executes a campaign launch with go/no-go checklist, UTM audit, tracking verification, monitoring thresholds, and a first-48-hours response plan. Use when a campaign is ready to go live or asking "are we ready to launch and how do we watch it". Also triggers on: Go/no-go checklist, tracking verification, UTM parameter audit, landing page QA, budget pacing check, early performance monitoring.
tags: [marketing, deliver]
model: inherit
---

# Campaign Launch
**Domain**: Marketing | **Phase**: Deliver | **Invocation**: `/ds-marketing-campaign-launch`

## What this produces
A campaign launch package: go/no-go checklist signed off by owner, UTM parameter audit, tracking verification, monitoring dashboard with alert thresholds, first-48-hours response plan, and optimization trigger conditions.

## Methods
Go/no-go checklist, tracking verification, UTM parameter audit, landing page QA, ad creative review, email deliverability check, monitoring dashboard setup, real-time response plan, budget pacing check, early performance threshold definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Go/no-go checklist, tracking verification, top 3 monitoring metrics |
| Tuna | Full checklist, tracking audit, monitoring setup, first-48h response plan |
| Salmon | Complete launch package with budget pacing, optimization triggers |
| Willy | All methods — full QA checklist, deliverability audit, escalation plan |

## Execution prompt
You are running Campaign Launch for [project]. Ensure everything is ready and define how we monitor and respond on day one.

**Input**: campaign plan, all assets and channels going live, tracking setup documentation.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Go/No-Go Checklist

Complete every item before launch. Each line needs an owner and a sign-off:

```
GO/NO-GO CHECKLIST — Campaign: [Name] — Launch date: [Date]
════════════════════════════════════════════════════════════════════

TRACKING & MEASUREMENT                                Owner   Status
────────────────────────────────────────────────────────────────────
□ Conversion tracking pixel fires on thank-you page  [Name]  [ ]
□ GA4 events confirmed in DebugView                  [Name]  [ ]
□ UTM parameters present on all paid URLs            [Name]  [ ]
□ UTM parameters verified in analytics dashboard     [Name]  [ ]
□ CRM/CDP integration tested (lead fields mapping)   [Name]  [ ]
□ Attribution model set and agreed                   [Name]  [ ]

PAID MEDIA                                           Owner   Status
────────────────────────────────────────────────────────────────────
□ Ad campaigns set to correct status (paused → ready)[Name]  [ ]
□ Daily budget caps confirmed                        [Name]  [ ]
□ Ad creative approved (legal/brand sign-off)        [Name]  [ ]
□ Audience targeting reviewed and confirmed          [Name]  [ ]
□ Landing page URL correct in all ads                [Name]  [ ]
□ Bid strategy set correctly                         [Name]  [ ]
□ Ad scheduling (days/hours) confirmed               [Name]  [ ]

EMAIL                                                Owner   Status
────────────────────────────────────────────────────────────────────
□ Unsubscribe link functional                        [Name]  [ ]
□ Sender domain authenticated (SPF, DKIM, DMARC)    [Name]  [ ]
□ Test email sent and reviewed in 3 clients          [Name]  [ ]
□ Subject line and preview text confirmed            [Name]  [ ]
□ Segment/list confirmed (correct audience, no dups) [Name]  [ ]
□ Send time confirmed                                [Name]  [ ]

LANDING PAGES                                        Owner   Status
────────────────────────────────────────────────────────────────────
□ Page loads in < 3 seconds (mobile + desktop)       [Name]  [ ]
□ Form submits and routes correctly                  [Name]  [ ]
□ Thank-you page / confirmation email triggers       [Name]  [ ]
□ Mobile layout reviewed                             [Name]  [ ]
□ Legal copy / disclaimers present                   [Name]  [ ]
□ Page matches ad message (no bait-and-switch)       [Name]  [ ]

CONTENT / ORGANIC                                    Owner   Status
────────────────────────────────────────────────────────────────────
□ Blog posts / social posts scheduled and queued     [Name]  [ ]
□ Social profiles have correct bio / link            [Name]  [ ]
□ Community posts / outreach prepared                [Name]  [ ]

GO / NO-GO DECISION
────────────────────────────────────────────────────────────────────
All tracking items: GO / NO-GO
All paid media items: GO / NO-GO
All email items: GO / NO-GO
All landing page items: GO / NO-GO

Final decision: GO / NO-GO
Decision made by: [Name] at [Time]
Conditions (if conditional go): [Any items deferred and why]
```

### Step 2 — UTM Parameter Audit

```
UTM Parameter Standard — Campaign: [Name]
────────────────────────────────────────────────────────────────────
utm_campaign:  [campaign-name-YYYYMM]       — all lowercase, hyphens not spaces
utm_source:    [google / linkedin / meta / newsletter / partner]
utm_medium:    [cpc / paid-social / email / organic-social / referral]
utm_content:   [creative-variant — e.g., headline-a / image-lifestyle]
utm_term:      [keyword — paid search only]

Full URL examples:
  Google Search:  [landing-page-url]?utm_source=google&utm_medium=cpc&utm_campaign=[name]&utm_content=[variant]&utm_term=[keyword]
  LinkedIn:       [landing-page-url]?utm_source=linkedin&utm_medium=paid-social&utm_campaign=[name]&utm_content=[variant]
  Email:          [landing-page-url]?utm_source=newsletter&utm_medium=email&utm_campaign=[name]&utm_content=[email-1]

Audit check:
  □ All URLs use lowercase only
  □ No spaces (use hyphens)
  □ utm_campaign consistent across all channels
  □ Each creative variant has unique utm_content
  □ All URLs resolve and track in analytics
```

### Step 3 — Monitoring Dashboard

```
Dashboard: [Campaign Name] Live Monitor
────────────────────────────────────────────────────────────────────────────
Metric               Source        Check frequency   Alert threshold
────────────────────────────────────────────────────────────────────────────
Impressions          [Platform]    Hourly D1, daily  < [X]/day = underpacing
CTR                  [Platform]    Daily             < [benchmark%] = creative issue
CPC / CPM            [Platform]    Daily             > [target+30%] = bid issue
Conversion rate      GA4 / CRM     Daily             < [benchmark%] = landing pg issue
CPA                  [Platform]    Daily             > $[target×2] = pause trigger
Email open rate      [ESP]         After each send   < [20%] = deliverability issue
Email click rate     [ESP]         After each send   < [2%] = message/CTA issue
Budget pacing        [Platform]    Daily             > 110% of daily target = review
Form submission rate GA4           Daily             Drop > 20% = page issue
Revenue / pipeline   CRM           Weekly            < [%] of target = escalate
────────────────────────────────────────────────────────────────────────────
```

### Step 4 — First-48-Hours Response Plan

```
Hour 0–6 (Campaign goes live):
  □ Confirm all platforms show "Active" status
  □ Verify first impressions/sends registering in dashboards
  □ Check conversion tracking fires on test conversion
  □ Screenshot baseline metrics

Hour 6–24:
  □ Review CTR vs. benchmark — if < [X%], flag creative
  □ Review CPC/CPM vs. target — if > 20% over, adjust bid
  □ Check email open rate (if email sent) — if < [X%], check deliverability
  □ Review budget pacing — should be within 80–110% of daily target

Hour 24–48:
  □ First full-day performance review
  □ Identify top-performing ad/email variant
  □ Identify underperformer — apply pause rule if threshold breached
  □ Check landing page conversion rate — if drop > 20%, investigate
  □ Send Day 1 performance summary to stakeholders

Escalation triggers (when to alert stakeholders immediately):
  - CPA > [2×] target after [N] conversions
  - Zero conversions after [N] impressions (tracking failure suspected)
  - Budget depleted before 50% of day (bid misconfiguration)
  - Email bounce rate > 5% (deliverability issue)
  - Landing page returning errors
```

### Step 5 — Optimization Trigger Conditions

```
Optimization Decision Tree:
────────────────────────────────────────────────────────────────────
Condition                       Action
────────────────────────────────────────────────────────────────────
CTR < [benchmark] after [N] impressions
  → A/B test new headline / creative

CVR < [benchmark] after [N] clicks
  → Review landing page; test new CTA or layout

CPA > [target × 1.5] after [N] conversions
  → Narrow audience; pause lowest-performing ad set

One ad set driving 80%+ of conversions
  → Shift budget to winner; test new variant against it

Open rate < [X%] on email
  → Test new subject line; check send time; verify list health

Click rate < [X%] on email
  → Revise CTA; test different offer or content hook

Channel A outperforming Channel B by > 2×
  → Reallocate [X%] of Channel B budget to Channel A

Campaign on track at mid-point
  → No change; document what's working for post-campaign report
────────────────────────────────────────────────────────────────────
```

---

## Final Output
- Go/no-go checklist (all items with owners and status)
- UTM parameter audit with URL examples per channel
- Monitoring dashboard (metrics × sources × thresholds)
- First-48-hours response plan (hour-by-hour actions)
- Optimization decision tree (condition → action)

**Recommended next skill**: `/ds-marketing-performance-analysis` — after the campaign runs, analyze results and produce an optimization plan for the next cycle.
