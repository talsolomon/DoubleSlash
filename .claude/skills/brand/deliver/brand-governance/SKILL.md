---
name: ds-brand-brand-governance
description: Establishes brand governance with RACI approval workflow, brand guardian roles, exception process, brand health metrics, audit cadence, and violation reporting. Use after a brand launch, when consistency is drifting, or asking "how do we protect the brand over time". Also triggers on: Governance framework design, approval workflow, brand health measurement, training plan, audit cadence.
tags: [brand, deliver]
model: inherit
---

# Brand Governance
**Domain**: Brand | **Phase**: Deliver | **Invocation**: `/ds-brand-brand-governance`

## What this produces
A brand governance framework: RACI approval matrix, brand guardian role definitions, exception process, brand health metrics dashboard, audit cadence, training plan, and violation reporting system.

## Methods
Governance framework design, approval workflow mapping, brand guardian role definition, exception process design, brand health measurement, training and onboarding plan, brand audit cadence, feedback and violation reporting system

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Approval workflow, 2–3 brand health metrics, guardian roles |
| Tuna | Governance framework, approval workflow, training plan |
| Salmon | Full framework with exception process, audit cadence, health tracking |
| Willy | All methods — violation reporting system, full brand health dashboard |

## Execution prompt
You are running Brand Governance for [project]. Build the system that keeps the brand consistent after launch without creating a bottleneck.

**Input**: brand guidelines, team structure, known consistency challenges, brand guardian candidates.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Governance Philosophy

```
Brand governance goal: Enable consistency without creating a bureaucratic bottleneck.

The governance framework should:
  □ Be clear — anyone can determine if their work needs approval
  □ Be fast — approval SLAs must be short enough that people don't bypass the process
  □ Be proportional — high-risk work gets more scrutiny than low-risk work
  □ Be enabling — the default answer to "can I do this?" should be findable in guidelines

What governance is NOT:
  □ A veto right over business decisions
  □ A design review for personal taste preferences
  □ A process that adds weeks to routine marketing work
```

### Step 2 — Brand Guardian Roles

```
Role definitions:
────────────────────────────────────────────────────────────────────────
Role                    Owner       Responsibilities                    Time commitment
────────────────────────────────────────────────────────────────────────
Brand Lead              [Name]      Final approval authority; guidelines stewardship;  [X hrs/week]
                                    training; annual audit ownership
Brand Guardian (dept)   [Names]     First-line review for their team's work;           [X hrs/week]
                                    flag violations; trained by Brand Lead
Brand Ambassador        [Names]     Informal advocates in each team; not approvers;     [X hrs/week]
                                    answer basic brand questions; escalate to Guardian
────────────────────────────────────────────────────────────────────────

Brand Lead responsibilities:
  □ Owns and maintains brand guidelines (keep them current)
  □ Final approval on new categories of brand usage
  □ Runs the annual brand audit
  □ Trains brand guardians; hosts quarterly brand office hours
  □ Makes exception process decisions

Brand Guardian responsibilities (per department):
  □ Reviews all external-facing materials from their team
  □ Can approve routine work within guidelines
  □ Escalates edge cases to Brand Lead
  □ Reports repeated violations to Brand Lead
  □ Onboards new team members to brand basics

Brand Guardian departments:
  Marketing:  [Name] — reviews: all campaigns, ads, social, email, events
  Product:    [Name] — reviews: UI, onboarding, in-app copy, store listings
  Sales:      [Name] — reviews: sales decks, proposals, outreach templates
  Recruiting: [Name] — reviews: job postings, recruiting materials
  External:   [Name] — reviews: agency and partner brand usage
```

### Step 3 — Approval Workflow (RACI)

```
Brand approval RACI:
R = Responsible (does the work)
A = Accountable (final decision — only one person per row)
C = Consulted (input required before decision)
I = Informed (notified of outcome)

────────────────────────────────────────────────────────────────────────────────────────────
Brand activity                     Creator  Guardian  Brand Lead  Legal   CEO
────────────────────────────────────────────────────────────────────────────────────────────
Routine social posts (on template)  R        I         —           —       —
Campaign ads (on brief)             R        A         I           —       —
New ad format / channel (first use) R        C         A           —       —
New campaign or rebrand element     R        C         A           C       I
Press release / external statement  R        C         A           A       I
New product name / major feature    R        C         A           A       I
Partnership co-branding             R        C         A           C       I
Speaking/event materials            R        A         I           —       —
Website major redesign              R        C         A           —       I
Brand guidelines change             —        C         R/A         —       I
────────────────────────────────────────────────────────────────────────────────────────────

Approval SLAs:
  Routine (Guardian review):  48 business hours
  Standard (Brand Lead):      3 business days
  Strategic (+ Legal/CEO):    5 business days
  Emergency (breaking news):  [Specific emergency process — direct contact to Brand Lead]
```

### Step 4 — Exception Process

```
When to use exceptions:
  An exception is needed when work is urgent or necessary but cannot fully comply with guidelines.
  Examples: partner co-branding requirements / acquisition where acquired brand must stay / third-party constraints

Exception request format:
────────────────────────────────────────────────────────────────────────
Field                  Content
────────────────────────────────────────────────────────────────────────
Requestor:             [Name / team]
Asset/context:         [What this is for]
Guideline conflict:    [Which specific guideline cannot be followed]
Reason:                [Why compliance is not possible]
Proposed alternative:  [How you'll maintain brand intent while bending the rule]
Expiry:                [When this exception expires — date or event]
Approval needed from:  [Brand Lead]
────────────────────────────────────────────────────────────────────────

Exception decision criteria:
  APPROVE if: Business need is real; alternative maintains brand integrity; exception is time-limited
  DENY if: Alternative exists that meets guidelines; exception would set a precedent that erodes standards
  ESCALATE if: Legal, regulatory, or major partnership implications

Exception log (maintained by Brand Lead):
  Log all approved exceptions with expiry dates
  Review quarterly — remove expired exceptions; update guidelines if pattern emerges
```

### Step 5 — Brand Health Metrics

```
Brand health dashboard — measured [quarterly / bi-annually / annually]:
────────────────────────────────────────────────────────────────────────
Metric                    Baseline    Target      Measurement method
────────────────────────────────────────────────────────────────────────
Brand consistency score   [X/20]      [X/20]      Touchpoint audit (per brand audit skill)
Unaided brand awareness   [%]         [%]         Customer/prospect survey
Brand NPS (promoters)     [score]     [score]     NPS survey "How likely to recommend?"
Message pull-through       [%]         [%]         Media monitoring — message in coverage
Asset adoption rate        [%]         100%        Spot-check: teams using correct assets
Guideline satisfaction    [%]         > 80%       Internal survey: "Can you find what you need?"
Violations logged          [N]         Trending ↓  Violation log count
────────────────────────────────────────────────────────────────────────

Leading indicators (catch problems early):
  □ Spike in exception requests → guidelines may need updating
  □ Violations concentrated in one team → targeted training needed
  □ Asset downloads of old files → migration incomplete

Reporting cadence:
  Monthly:   Violation count; exception log review
  Quarterly: Asset adoption spot-check; guideline satisfaction survey
  Annually:  Full brand audit; awareness + NPS measurement; guidelines review
```

### Step 6 — Training Plan

```
Brand training program:
────────────────────────────────────────────────────────────────────────
Audience          Training type         Frequency       Owner
────────────────────────────────────────────────────────────────────────
All new employees  Brand onboarding (30 min video + guidelines link)   Day 1   HR + Brand
All employees      Brand office hours (Q&A format)                     Quarterly Brand Lead
Brand Guardians    Guardian training (2 hrs — approval workflow, edge cases) At appointment Brand Lead
Agencies/partners  Agency brand briefing (1 hr + guidelines)           At engagement Brand Lead
────────────────────────────────────────────────────────────────────────

New employee brand onboarding content:
  □ Brand story (why we look and sound the way we do — not just rules)
  □ How to access assets (link + walkthrough)
  □ The 5 things you must never do with the brand
  □ Who to ask when you're not sure (Guardian contact)
  □ How to request approval (the workflow)
```

### Step 7 — Violation Reporting System

```
Violation definition: Any brand usage that does not comply with guidelines and has not been approved as an exception.

Violation severity levels:
  Critical: Public-facing; could damage brand or create legal risk
    Action: Immediate takedown + Brand Lead notification within 2 hours
  High: Public-facing; visible inconsistency but no legal risk
    Action: Fix within 24 hours; Guardian notified; log the violation
  Medium: Internal or limited reach; inconsistency detected
    Action: Fix within 1 week; log the violation
  Low: Minor; low visibility; unlikely to impact perception
    Action: Fix at next update; note in audit

Violation log format:
────────────────────────────────────────────────────────────────────────
Date    Reported by  Asset/context    Violation      Severity  Fixed by  Status
────────────────────────────────────────────────────────────────────────
[Date]  [Name]       [What asset]     [What's wrong] [C/H/M/L] [Date]    [Fixed/Open]
────────────────────────────────────────────────────────────────────────

Reporting channel: [Slack #brand-violations / email / Notion form]
Response commitment: Brand Guardian acknowledges within [X] business hours

Repeat violation pattern: If same team or same person violates [3+ times], Brand Lead schedules 1:1 training session.
```

---

## Final Output
- Governance philosophy (enabling, not blocking)
- Brand guardian role definitions (Lead, Guardian, Ambassador)
- Approval workflow RACI (by activity type, with SLAs)
- Exception process (request format, approval criteria, log)
- Brand health metrics dashboard (7 metrics with baselines and measurement method)
- Training plan (onboarding, office hours, guardian training)
- Violation reporting system (severity levels, log format, escalation)

**Recommended next skill**: `/ds-brand-brand-audit` — run the first post-launch audit to establish a new consistency baseline under the new brand system.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
