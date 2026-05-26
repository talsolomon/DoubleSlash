---
name: ds-fintech-go-to-market
description: Plans the fintech product launch including regulatory readiness, acquisition channels, and compliance communications. Use when launching a financial product, planning a fintech GTM, or asking "how do we get our first customers while staying compliant". Also triggers on: Regulatory launch readiness checklist, acquisition channel selection and sequencing, compliance and disclosure communication design, partner and channel GTM design, trust-building strategy, pricing and offer design.
tags: [fintech, deliver]
model: inherit
---

# Go-to-Market
**Domain**: Fintech | **Phase**: Deliver | **Invocation**: `/ds-fintech-go-to-market`

## What this produces
A fintech GTM plan with regulatory launch checklist, trust-first acquisition strategy, compliance communication templates, soft-launch design, channel model, and launch KPIs.

## Methods
Regulatory launch readiness checklist, acquisition channel selection and sequencing, compliance and disclosure communication design, partner and channel GTM design, trust-building strategy, pricing and offer design, launch metrics definition, soft-launch and beta plan

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Launch checklist | Regulatory checklist + top 2 acquisition channels + trust strategy |
| Tuna | GTM plan | All above + compliance communications + launch metrics |
| Salmon | Full GTM | All above + channel sequencing + soft-launch design + pricing |
| Willy | Complete launch | All methods + full channel model + regulatory readiness audit + pitch materials |

---

## Execution Prompt

Read the project context: product spec, regulatory status (licensing, compliance review), target customer segments, competitive landscape, FISH classification.

**In fintech GTM, trust is the acquisition channel. Every touchpoint must convey safety, reliability, and legitimacy before feature value. The user is making a decision to trust you with their money — that decision happens in the first 30 seconds of exposure.**

---

### Step 1 — Regulatory Launch Readiness Checklist (all FISH levels)

This checklist is a gate. No marketing begins until every P0 item is complete.

**P0 — Must be complete before first customer (no exceptions):**
- [ ] BaaS banking partner has approved your AML/compliance program in writing
- [ ] KYC system integrated and tested (verified identity passes, synthetic fraud fails)
- [ ] OFAC screening is live and tested
- [ ] Transaction monitoring rules deployed (not just planned)
- [ ] All required consumer disclosures reviewed by licensed legal counsel
- [ ] Terms of service and privacy policy live and accessible
- [ ] E-signature consent process implemented and auditable
- [ ] Reg E error resolution process documented and operational
- [ ] FDIC membership disclosed (if applicable): "Member FDIC" or "Deposits insured by..."
- [ ] Any required licenses active (or confirmed active via BaaS partner's charter)
- [ ] FinCEN MSB registration filed (or within 180-day window)

**P1 — Must be complete before public launch:**
- [ ] SOC 2 Type I completed (or Type II in progress)
- [ ] Penetration test completed with no critical findings unresolved
- [ ] Customer support process for compliance issues (Reg E disputes, identity questions)
- [ ] Incident response plan tested (what do you do if a data breach occurs?)
- [ ] State MTL applications filed for priority states (or confirmed under BaaS charter)
- [ ] FDIC insurance disclosure signage/text reviewed for accuracy
- [ ] Annual privacy notice process automated

**P2 — Complete within 90 days of launch:**
- [ ] Independent AML audit scheduled
- [ ] State MTL applications for secondary states in progress
- [ ] Ongoing transaction monitoring reporting cadence established

---

### Step 2 — Trust-First GTM Strategy (all FISH levels)

Trust signals that move the needle for fintech specifically:

**Tier 1 — Foundational trust signals (must have at launch):**
```
FDIC insurance badge: "Your deposits are FDIC insured up to $250,000"
  → Place on homepage, app onboarding, and any page discussing money
  → Do NOT use this if your BaaS arrangement doesn't pass-through FDIC coverage — verify this

Bank partner association: "[Product] is powered by [Bank Name], member FDIC"
  → Borrowing your bank partner's trust is legitimate and effective
  → Coordinate with bank partner on approved messaging

SSL/security signals: HTTPS, no mixed content, security badge in checkout

Privacy commitment: "We never sell your personal information"
  → Must be backed by actual GLBA-compliant privacy policy
```

**Tier 2 — Earned trust signals (build during soft launch):**
```
Press coverage: "As seen in..." from credible fintech/finance media
Social proof: Real customer testimonials with full name and context
Independent ratings: App Store 4.5+, Trustpilot or G2 reviews
Transparency reports: "We had X SARs filed last quarter" (if legally advisable)
Team credibility: Founding team's relevant fintech/banking/regulatory background
```

**Tier 3 — Long-term trust signals (build over time):**
```
Customer tenure: "X customers have trusted us for Y years"
Financial milestone: "We've processed $X in transactions"
Regulatory track record: "No regulatory enforcement actions"
Auditor endorsement: "Audited by [Big 4] annually"
```

---

### Step 3 — Acquisition Channel Selection (all FISH levels)

**Channel evaluation for fintech:**
| Channel | CAC estimate | Trust signal | Compliance risk | Timing |
|---|---|---|---|---|
| **Organic search (SEO)** | Low ($20–80) | Medium | Low | Slow (6–18 months) |
| **Content marketing (editorial)** | Low ($30–100) | High (education = trust) | Low | Medium (3–9 months) |
| **Employer / payroll partnerships** | Medium ($50–200) | High (employer vouches) | Low | Medium (6–12 months) |
| **Referral program** | Low–Medium ($30–150) | Very high (peer trust) | Low | Fast (if product loved) |
| **Performance / paid social** | High ($100–500) | Low | Medium (advertising rules) | Fast |
| **Affiliate / comparison sites** | High ($150–500) | Low–Medium | High (UDAAP in ads) | Fast |
| **B2B / API partnerships** | Very high ($500–5K) | High (embedded) | Medium | Slow (12–24 months) |
| **Banking partner co-marketing** | Variable | Very high | Low | Medium |

**Compliance rules for fintech advertising:**
```
UDAAP (Unfair, Deceptive, or Abusive Acts or Practices):
  ❌ "No fees" when there are fees in any scenario
  ❌ "Best rate" without substantiation
  ❌ Emphasizing only the best-case APR without disclosure of range
  ❌ "FDIC insured" without actually being FDIC insured
  ✅ "No monthly fees" (if this is true with no exceptions)
  ✅ "Rates from X% to Y% APR" (shows range)
  ✅ "FDIC insured up to $250,000" (accurate disclosure)

Reg Z / TILA (credit advertising):
  If you state any credit term: must state ALL material terms
  Triggering term: "5% down" requires: APR, loan term, payment amount
  
FCRA (credit score / report advertising):
  Cannot imply credit score improvement without substantiation
```

**Channel sequencing for a new fintech:**
```
Month 1–3 (soft launch, 100–500 users):
  → Founder network direct outreach (zero cost, high trust)
  → 1–2 targeted communities (Reddit, Slack groups, Discord)
  → Referral program seeded with first 50 users
  Goal: validate onboarding, product-market fit signal, KYC pass rate

Month 4–6 (controlled growth):
  → SEO content strategy launched (educational articles)
  → Employer partnership outreach (1–3 pilots)
  → PR outreach to fintech journalists
  Goal: 500–2,000 users; establish media presence

Month 7–12 (scale):
  → Paid acquisition (carefully — CAC must be below payback threshold)
  → Referral program fully operational
  → API/embedded partnership pilots
  Goal: 2,000–10,000 users; channel mix data to optimize
```

---

### Step 4 — Compliance Communication Templates (Tuna, Salmon, Willy)

**Welcome email (must include all required disclosures):**
```
Subject: Your [Product] account is ready

Hi [First Name],

Your account is open and ready to use.

[Product description — what you can do]

A few important things:
  • Your deposits are FDIC insured up to $250,000 through [Bank Name], member FDIC
  • [Fees disclosed plainly — no fine print]
  • Your privacy is important to us — read our Privacy Policy: [link]
  • For questions or to report an unauthorized transaction, contact us at [support] 
    or call [number]. We're required to resolve error claims within 45 days.

[Call to action — get started]

[Company Name]
[Address]
[Licenses: Licensed as a Money Services Business / registered with FinCEN]
```

**Error resolution / Reg E notice template:**
```
Subject: We received your dispute claim — here's what happens next

Dear [Customer Name],

We received your report of an unauthorized transaction on [date] for $[amount].

Timeline:
  Within 5 business days: We will provide provisional credit to your account
  Within 45 days: We will complete our investigation and send you a written determination

During our investigation, you'll have full access to the provisional credit.

[Case reference number]: [CASE-XXXXX]
Questions? Contact us at [support email] or [phone].

[Company Name]
```

**Material change notice (required 30 days before fee change):**
```
Subject: Important changes to your [Product] account — effective [date]

We're updating our fee structure, effective [date]:

[Old fee]: $[X]/month → [New fee]: $[X]/month
[Specific description of change]

Why: [Plain language explanation]

These changes apply to your account beginning [date]. If you close your account before [date], the new fees will not apply.

Questions? Contact [support]. You have the right to close your account at no cost before the change takes effect.
```

---

### Step 5 — Soft-Launch Design (Tuna, Salmon, Willy)

**Soft launch = controlled launch with monitoring before public availability.**

**Soft launch parameters:**
```
Users: 100–500 invited users (not public)
Access: Invitation code or waitlist approval
Duration: 4–8 weeks
Regulatory status: Fully licensed and compliant (not a regulatory exemption)
Goal: Validate compliance processes under real conditions, not just in sandbox

What you're testing:
  □ KYC pass rate (target: > 80%)
  □ AML rules firing correctly (test known-good vs. known-suspicious patterns)
  □ Reg E dispute process (can you actually resolve a dispute within 45 days?)
  □ Onboarding completion rate (target: > 60% of started applications)
  □ Transaction success rate (target: > 97%)
  □ Customer support ticket rate (target: < 5% of MAU monthly)
```

**Soft launch monitoring dashboard:**
| Metric | Target | Alert threshold | Current |
|---|---|---|---|
| KYC instant pass rate | > 80% | < 70% | [live] |
| Onboarding completion | > 60% | < 45% | [live] |
| Transaction success rate | > 97% | < 95% | [live] |
| Dispute / error report rate | < 1% of transactions | > 3% | [live] |
| Support ticket rate | < 5% of MAU/month | > 10% | [live] |
| OFAC false match rate | < 0.1% | > 0.5% | [live] |

**Go/no-go criteria for public launch:**
```
All P0 metrics above threshold for 2 consecutive weeks
No unresolved compliance findings from soft launch
BaaS partner reviewed soft launch data and confirmed no compliance concerns
Customer support queue < 48h response time
Zero data incidents or unauthorized access events
```

---

### Step 6 — Launch KPIs (all FISH levels)

**Metrics to define before launch (prevents moving the goalposts):**
| KPI | Definition | Target (30 days) | Target (90 days) |
|---|---|---|---|
| Accounts opened | KYC-verified accounts created | [N] | [N] |
| Onboarding completion rate | Accounts opened / applications started | > 60% | > 70% |
| Funded accounts | Accounts with ≥ $1 deposited within 7 days | > 50% of opened | > 55% of opened |
| Activation rate | Accounts completing first transaction | > 40% in 30 days | > 50% in 30 days |
| GMV | Total transaction volume | $[X] | $[X] |
| CAC | Total S&M spend / new accounts | < $[X] | < $[X] |
| Monthly churn | Accounts closed or inactive / total accounts | < 5% | < 4% |
| Compliance ticket rate | Reg E / KYC / fraud complaints / MAU | < 1% | < 0.5% |
| NPS | Net Promoter Score (survey at 30 days) | > 30 | > 40 |

---

### Final Output

**Regulatory launch readiness checklist** — P0/P1/P2 gating with sign-off required
**Trust signal framework** — Tier 1/2/3 signals with implementation notes
**Acquisition channel plan** — channel evaluation, compliance rules, sequencing (Tuna+)
**Compliance communication templates** — welcome, Reg E notice, material change notice (Tuna+)
**Soft-launch design** — parameters, monitoring dashboard, go/no-go criteria (Salmon+)
**Launch KPIs** — 30-day and 90-day targets defined pre-launch
**Recommended next skill** — `/ds-fintech-compliance-review` — run quarterly compliance reviews to stay ahead of regulatory risk


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
