---
name: ds-fintech-integration-planning
description: Plans technical integrations with banks, payment processors, and financial data providers. Use when selecting fintech infrastructure partners, scoping integrations, or asking "which BaaS or payment rail do we use and how do we connect". Also triggers on: Partner evaluation (BaaS, payment processors, KYC providers, data aggregators), API capability assessment, integration architecture design.
tags: [fintech, develop]
model: inherit
---

# Integration Planning
**Domain**: Fintech | **Phase**: Develop | **Invocation**: `/ds-fintech-integration-planning`

## What this produces
An integration plan with partner evaluation matrix, selected partner stack, API integration specs, data flow design, fallback/redundancy planning, SLA and cost comparison, and implementation timeline.

## Methods
Partner evaluation (BaaS, payment processors, KYC providers, data aggregators), API capability assessment, integration architecture design, data flow and transformation design, fallback and redundancy planning, SLA and cost comparison, implementation sequencing

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Partner shortlist | Partner shortlist + integration approach + timeline |
| Tuna | Full integration plan | All above + API integration spec + data flow design |
| Salmon | Production plan | All above + fallback design + SLA comparison + cost model |
| Willy | Complete implementation | All methods + full partner evaluation + integration runbook + cost model |

---

## Execution Prompt

Read the project context: product spec, compliance requirements, budget constraints, technical team size, regulatory requirements. FISH classification determines depth.

**Partner choice in fintech is a multi-year commitment. Evaluate for current needs AND growth ceiling. The cheapest option at $1M ARR may be the most expensive at $10M ARR.**

---

### Step 1 — Integration Stack Overview (all FISH levels)

Map every integration category your product requires.

**Integration categories:**
| Category | What it does | Your need? | Options |
|---|---|---|---|
| **BaaS / Core banking** | FDIC-insured accounts, card issuance, ACH access | Required for deposit products | Unit, Column, Thread, Treasury Prime, Synapse (defunct) |
| **Payment processing** | Card payment acceptance, merchant acquiring | Required for card acceptance | Stripe, Adyen, Square, Braintree |
| **KYC / Identity verification** | Document verification, database KYC | Required | Persona, Alloy, Socure, Stripe Identity, Onfido |
| **AML / Transaction monitoring** | Rule-based + ML fraud detection | Required | Unit21, Hummingbird, Sardine, Hawk AI |
| **Account aggregation** | Link external bank accounts, read balances | Required for ACH pull | Plaid, MX, Finicity (Mastercard), Akoya |
| **Card network** | Visa/Mastercard card program | Required for card products | Via BaaS partner (not direct for most fintechs) |
| **OFAC / Sanctions screening** | Screen customers and transactions | Required | Dow Jones, LexisNexis, Acuant, Verafin |
| **Credit bureau** | Credit check, reporting | Required for credit products | Experian, Equifax, TransUnion |
| **Payroll data** | Income/employment verification | Optional (lending, BNPL) | Pinwheel, Atomic, Argyle, Plaid Income |

---

### Step 2 — BaaS Partner Evaluation (all FISH levels)

**BaaS partner comparison matrix:**
| Criterion | Weight | Unit | Column | Thread | Treasury Prime |
|---|---|---|---|---|---|
| Regulatory coverage (charter type, FDIC) | 25% | /10 | /10 | /10 | /10 |
| API quality (docs, sandbox, webhooks) | 20% | /10 | /10 | /10 | /10 |
| Compliance support (program review) | 20% | /10 | /10 | /10 | /10 |
| Pricing model | 15% | /10 | /10 | /10 | /10 |
| Time to launch (contracting + integration) | 10% | /10 | /10 | /10 | /10 |
| Growth ceiling (max partner volume) | 10% | /10 | /10 | /10 | /10 |
| **Weighted total** | 100% | | | | |

**Key BaaS partner facts (2026):**
| Provider | Sponsor bank | FDIC? | Card program? | ACH? | RTP? | Pricing |
|---|---|---|---|---|---|---|
| **Unit** | Multiple (Blue Ridge, etc.) | ✅ | ✅ Visa | ✅ | ✅ | Monthly platform + per-account + % revenue share |
| **Column** | Column N.A. (own charter) | ✅ | ✅ | ✅ | ✅ | Usage-based, no revenue share |
| **Thread** | Thread Bank (own charter) | ✅ | ✅ Visa | ✅ | ✅ | Flat monthly + usage |
| **Treasury Prime** | Multiple | ✅ | Limited | ✅ | Limited | Per-account + usage |

**BaaS selection criteria:**
```
If you need card program + accounts + ACH from day 1: Unit or Thread
If you need maximum control and no revenue share: Column (own charter)
If you're building for enterprise with complex compliance: Treasury Prime
If you're a solo founder bootstrapping: Stripe (issuing + Treasury) as bridge

Red flags to reject immediately:
  - Bank partner with pending regulatory enforcement action
  - No sandbox environment for development
  - Revenue share > 30% (unsustainable unit economics)
  - No compliance team to review your AML program
  - Less than 3 years of fintech partner experience
```

---

### Step 3 — KYC/Identity Provider Evaluation (all FISH levels)

**KYC provider comparison:**
| Provider | Instant DB check | Document verify | Liveness | Selfie match | Pricing | Pass rate (typical) |
|---|---|---|---|---|---|---|
| **Persona** | ✅ | ✅ | ✅ | ✅ | $1–5/verification | 80–90% instant |
| **Alloy** | ✅ | ✅ | Via partner | ✅ | Per-rule + monthly | 75–85% instant |
| **Socure** | ✅ | Limited | ❌ | ❌ | Per-check | 85–95% instant (US synthetic fraud detection) |
| **Stripe Identity** | Limited | ✅ | ✅ | ✅ | $1.50/verification | 80–90% |
| **Onfido** | Limited | ✅ | ✅ | ✅ | Per-check + monthly | 85–95% (global coverage) |

**KYC waterfall design (use multiple providers to maximize pass rate):**
```
Step 1: Socure (fast, high instant pass rate for US) → PASS = done
Step 2 (if Step 1 REVIEW): Persona with document upload → PASS = done
Step 3 (if Step 2 REVIEW): Manual review queue → Compliance team decision

Total KYC cost per user: ~$3–8 (Step 1 always + Step 2 for ~15–20% of users)
Target instant pass rate: > 80% (below this = onboarding friction causing drop-off)
```

---

### Step 4 — Account Aggregation Integration (Tuna, Salmon, Willy)

Account aggregation lets users link external bank accounts to fund their fintech account via ACH.

**Provider comparison:**
| Provider | Coverage | Instant auth | OAuth banks | Pricing | Plaid alternative? |
|---|---|---|---|---|---|
| **Plaid** | 12,000+ institutions | ✅ | ✅ (top 1,000) | Per-link + per-check | Dominant but expensive |
| **MX** | 16,000+ institutions | ✅ | ✅ | Monthly platform + per-call | Strong bank coverage |
| **Finicity (Mastercard)** | 16,000+ institutions | ✅ | ✅ | Per-call | Strong for lending use cases |
| **Akoya** | Top US banks only | ✅ | ✅ | Per-call | Direct API to banks, best data quality |

**Plaid integration flow:**
```
1. Launch Plaid Link SDK in your app
2. User selects bank + authenticates (OAuth or credentials)
3. Plaid returns: access_token, item_id
4. Store access_token (encrypted) — never expose to frontend
5. Use access_token to:
   → Get account balances before initiating ACH
   → Get account details (routing/account number) for ACH initiation
   → (For lending) Get transaction history for income verification

Balance check before ACH debit:
  → Reduce NSF returns and associated fees ($2–5/returned ACH)
  → Only use balance check if balance visibility is user-expected (disclosed in terms)
```

---

### Step 5 — Integration Architecture and Data Flow (Tuna, Salmon, Willy)

**Integration architecture diagram:**
```
Your Application
│
├── User-facing (web/mobile)
│     └── KYC flow → Persona/Alloy (embedded SDK)
│     └── Bank link flow → Plaid Link (embedded SDK)
│
└── Backend API
      ├── Identity verification → Alloy/Socure (REST API)
      ├── KYC document upload → Persona (REST API)
      ├── OFAC screening → Dow Jones/LexisNexis (REST API)
      ├── Account + card → Unit/Column (REST API + webhooks)
      │     └── Webhooks → your webhook receiver → event queue → processor
      ├── Transaction monitoring → Unit21/Hummingbird (REST API + rules)
      ├── Account link → Plaid (REST API, user token)
      └── ACH initiation → via BaaS partner (REST API)
```

**Data flow for payment initiation:**
```
1. User initiates payment (amount, recipient, note)
2. Your API validates: balance sufficient? limits OK?
3. Transaction monitoring: score the transaction
4. If score OK: submit to BaaS partner API (POST /payments)
5. BaaS partner routes to appropriate rail (ACH, RTP, etc.)
6. BaaS webhook: payment.status.updated → your webhook receiver
7. You update transaction record, notify user
8. Daily: reconciliation job compares your ledger vs. BaaS ledger
```

---

### Step 6 — SLA and Cost Model (Salmon, Willy)

**Partner SLA comparison:**
| Provider | Uptime SLA | Support tier | Incident notification | Status page |
|---|---|---|---|---|
| Plaid | 99.9% | Email (standard), Slack (enterprise) | Webhook | status.plaid.com |
| Unit | 99.9% | Dedicated partner manager | Webhook + email | status.unit.co |
| Persona | 99.9% | Email | Webhook | — |
| Stripe | 99.99% | Email + chat | Webhook | status.stripe.com |

**Cost model per transaction:**
```
Single consumer ACH payment of $500:

BaaS platform (Unit): $0.25/ACH + $5/month account fee
KYC (amortized over account life): ~$0.10/transaction (KYC cost / avg transactions per account)
OFAC screening: $0.01/transaction
Transaction monitoring: $0.05/transaction
Account aggregation (Plaid balance check): $0.35/check
Total variable cost per $500 ACH: ~$0.76

Your net revenue on $500 ACH (at 0.25% take rate of volume): $1.25
Contribution margin: $1.25 - $0.76 = $0.49 (39% CM)
```

---

### Step 7 — Fallback and Redundancy Planning (Salmon, Willy)

**Single points of failure in fintech integrations and mitigations:**
| Dependency | Failure mode | Business impact | Mitigation |
|---|---|---|---|
| BaaS partner (primary) | API down | Payments fail, no new accounts | None (single source of truth for accounts) → Architect for multi-bank eventually |
| KYC provider (primary) | API down | Onboarding blocked | KYC waterfall to secondary provider + queue for when primary recovers |
| Plaid | OAuth auth failures | Users can't link accounts | Secondary aggregator (MX) as fallback; allow manual micro-deposit |
| OFAC screening | API down | Must block all transactions until resolved | Cache previous results (TTL: 24h) for existing customers; queue new transactions |
| Card network | Down | Card declines fail open or closed | Per card network contract — typically 99.99% uptime |

**Fallback for Plaid outage:**
```
Primary: Plaid Instant Auth
Fallback 1: Plaid Micro-deposit (slower, 1–3 days, user verifies 2 small deposits)
Fallback 2: Manual routing/account entry with micro-deposit verification
Message to user: "Bank link is taking longer than usual. Let's verify your account manually."
```

---

### Step 8 — Implementation Timeline (all FISH levels)

**Integration sequence (recommended order):**
```
Month 1: BaaS partner
  - Week 1–2: Contracting and compliance program submission
  - Week 3–4: Sandbox integration, account creation API, webhook setup
  
Month 2: Identity and KYC
  - Week 1–2: KYC provider integration (Persona/Alloy sandbox)
  - Week 3: OFAC screening integration
  - Week 4: End-to-end onboarding flow in staging
  
Month 3: Payments
  - Week 1–2: ACH initiation via BaaS
  - Week 3: Account aggregation (Plaid) for funding
  - Week 4: Transaction monitoring rules
  
Month 4: Pre-launch
  - Week 1–2: Compliance review + BaaS partner compliance approval
  - Week 3: Security audit / penetration test
  - Week 4: Soft launch (100–500 users)
```

---

### Final Output

**Integration stack selection** — all categories, selected partners with rationale
**BaaS evaluation matrix** — weighted scoring with BaaS-specific due diligence
**KYC waterfall design** — primary + fallback + manual review queue (Tuna+)
**Integration architecture diagram** — all data flows from frontend to partners
**SLA and cost model** — per-transaction cost breakdown (Salmon+)
**Fallback/redundancy design** — per partner, failure mode, and mitigation (Salmon+)
**Implementation timeline** — month-by-month sequencing
**Recommended next skill** — `/ds-fintech-compliance-review` — run a compliance review before and after launch


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
