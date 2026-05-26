---
name: ds-fintech-fintech-product-design
description: Designs the fintech product spec including core flows, compliance features, and integration architecture. Use when building a financial product, designing a fintech MVP, or asking "what exactly does this product do and how does it work". Also triggers on: Core flow design, compliance feature integration, KYC/AML flow design, payment rail selection, API architecture design, banking partner integration design.
tags: [fintech, develop]
model: inherit
---

# Fintech Product Design
**Domain**: Fintech | **Phase**: Develop | **Invocation**: `/ds-fintech-fintech-product-design`

## What this produces
A fintech product specification with core user flows, compliance feature design, payment rail selection, API architecture, fraud and risk feature spec, and MVP scope with rationale.

## Methods
Core flow design, compliance feature integration, KYC/AML flow design, payment rail selection, API architecture design, banking partner integration design, fraud and risk feature specification, MVP scope definition

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core spec | Core flows + compliance features + MVP scope |
| Tuna | Full spec | All above + API design + payment rail selection + banking integration |
| Salmon | Production spec | All above + fraud feature design + compliance flow diagrams |
| Willy | Complete spec | All methods + full API spec + integration runbook + compliance flow diagrams |

---

## Execution Prompt

Read the project context: product compliance spec from the Define phase, financial model, target customer segment, payment infrastructure constraints. FISH classification determines depth.

**Design for trust: in fintech, the user's relationship with their money IS the product. Every friction point, every confusing state, every unclear error message erodes that relationship. Trust is earned in milliseconds.**

---

### Step 1 — Core User Flow Design (all FISH levels)

Map the end-to-end user journey for each core product flow. No step is too small to specify.

**Onboarding flow (all fintech products):**
```
Step 1: Download / Land on product
  → Capture: email or phone
  → Action: Send verification code (OTP)

Step 2: Identity verification (KYC)
  → Collect: Full name, DOB, address, SSN last 4 (or full for higher-risk)
  → Verify: Instant database check (Persona/Alloy/Socure)
  → Branch:
      PASS → continue
      REVIEW → request ID document upload + selfie
      FAIL → decline with generic message (never reveal why for fraud reasons)

Step 3: Account agreement
  → Display: Privacy policy, terms of service, fee schedule
  → Capture: E-signature with timestamp and IP

Step 4: Account activation
  → Provision: Account number, routing number (if checking), card (if applicable)
  → Action: Welcome flow, first feature prompt

Step 5: Funding (if required)
  → Method options: ACH link, debit card push, wire
  → Wait state: 1–5 business days for ACH (or instant if Plaid/MX)

Total target onboarding time: < 5 minutes (database KYC), < 15 minutes (with document)
```

**Payment flow specification (if applicable):**
```
Initiate payment:
  User action: Enter amount + recipient + note
  System action:
    1. Validate: Sufficient balance?
    2. Validate: Daily/weekly limit not exceeded?
    3. Screen: Recipient on OFAC list?
    4. Evaluate: Transaction monitoring rules
    5. Choose rail based on: amount, urgency, cost, recipient type

Execute payment:
  Rail selected → submit to payment provider API
  Status: pending → processing → completed / failed

User communication:
  Confirmation: In-app notification + email receipt
  Failure: Clear error message + recovery path ("Try again" or "Contact support")

Settlement:
  ACH: T+1 (same-day ACH) or T+2 (standard ACH)
  RTP: Immediate (real-time payment rail)
  Wire: Same-day if before 4pm, next-day if after
```

---

### Step 2 — Payment Rail Selection (all FISH levels)

Choose payment rails based on speed, cost, limit, and counterparty type.

| Rail | Speed | Cost | Limit | Reversible? | Best for |
|---|---|---|---|---|---|
| **ACH Standard** | T+2 | $0.05–0.50 | $25K/day typical | Yes (up to 60 days) | Payroll, subscriptions, large transfers |
| **Same-Day ACH** | Same business day | $0.50–1.00 | $1M per NACHA rules | Yes | Time-sensitive business payments |
| **RTP (Real-Time Payments)** | < 30 seconds, 24/7 | $0.04–0.45 | $1M per transaction | No | P2P, gig economy, urgent payments |
| **FedNow** | < 30 seconds, 24/7 | Varies by bank | $500K default | No | Business payments, government disbursements |
| **Card (Visa/MC)** | Immediate (auth) / T+2 (settlement) | 1.5–3.5% interchange | $2,500–50K/day | Via chargeback | Consumer purchases, expense management |
| **Wire (Fedwire)** | Same-day or next-day | $15–25 flat | No limit | No | Large B2B, international |
| **International (SWIFT)** | 1–5 business days | $20–50 + FX spread | Varies | Very limited | Cross-border payments |

**Rail selection logic:**
```
P2P under $2,500, speed matters → RTP
P2P over $2,500 or no RTP availability → ACH Standard (with hold period)
Business payroll → Same-Day ACH (predictable timing)
Consumer purchase → Card (Visa/MC)
Large B2B ($50K+) → Wire
International → SWIFT or Wise API
```

**Multi-rail fallback design:**
```
Primary: RTP (if receiving bank supports it, otherwise...)
Fallback: Same-Day ACH (if same-day window, otherwise...)
Default: Standard ACH (T+2)

Check rail availability at initiation: query your BaaS partner's API
Communicate rail and ETA to user before confirming payment
```

---

### Step 3 — API Architecture Design (Tuna, Salmon, Willy)

**Core API surface for a fintech product:**

```
Authentication:
  POST /auth/login
  POST /auth/refresh
  POST /auth/logout

Onboarding / Identity:
  POST /users                     — create user account
  POST /users/{id}/kyc            — submit identity verification
  GET  /users/{id}/kyc/status     — check verification status

Accounts:
  GET  /accounts                  — list user's accounts
  GET  /accounts/{id}             — account detail (balance, number, routing)
  GET  /accounts/{id}/transactions — transaction history (paginated, cursor-based)

Payments:
  POST /payments                  — initiate payment
  GET  /payments/{id}             — payment status
  POST /payments/{id}/cancel      — cancel pending payment (if rail allows)

Cards (if applicable):
  POST /cards                     — issue virtual or physical card
  GET  /cards/{id}                — card detail
  POST /cards/{id}/freeze         — freeze card
  POST /cards/{id}/unfreeze       — unfreeze card
  PATCH /cards/{id}/limits        — update spending limits

Webhooks:
  payment.completed               — payment settled successfully
  payment.failed                  — payment failed with error code
  kyc.approved                    — identity verification passed
  kyc.declined                    — identity verification failed
  card.transaction                — real-time card authorization
  card.dispute.opened             — cardholder filed dispute
```

**Financial API design rules (non-negotiables):**
```
Rule 1: All monetary values in smallest currency unit (cents for USD)
  ❌ "amount": 49.99      — float precision errors compound in financial systems
  ✅ "amount": 4999       — cents; unambiguous

Rule 2: Every mutation endpoint requires Idempotency-Key
  POST /payments must include: Idempotency-Key: {uuid}
  Prevents double-spend on retry

Rule 3: Payment status is a state machine, not a boolean
  pending → processing → completed
                       → failed
                       → canceled

Rule 4: Never expose internal database IDs in the API
  Use surrogate IDs (pay_abc123, acc_xyz789) — prevents enumeration attacks

Rule 5: Financial errors need machine-readable codes, not just messages
  {error: {code: "INSUFFICIENT_FUNDS", message: "...", available_balance: 4500}}
```

---

### Step 4 — Banking Partner Integration Design (Tuna, Salmon, Willy)

**BaaS integration architecture:**
```
Your product layer:
  → Manages user accounts, KYC, product logic
  → Does NOT touch card numbers, routing/account numbers directly

BaaS middleware layer (Unit, Thread, Column, Treasury Prime):
  → Provides: FDIC-insured accounts, card program, ACH access
  → Webhooks real-time transaction events back to your system
  → Maintains regulatory and bank partner relationships

FDIC-insured bank (sponsor bank):
  → Holds customer deposits
  → Issues card BIN
  → Chartered and regulated entity
  → Never touch this layer directly — BaaS abstracts it
```

**Webhook event handling:**
```
Your system receives BaaS webhook:
  1. Validate HMAC signature (prevent spoofed events)
  2. Record event in raw events table (idempotency)
  3. Process event (update account balance, notify user, trigger monitoring)
  4. Return 200 immediately — do heavy processing async
  5. If processing fails: retry queue (at-least-once guarantee)

Critical: Your account balance is a derived view from transaction events.
Never store balance as a mutable field — derive it from immutable transaction ledger.
```

**Reconciliation design:**
```
Daily reconciliation (mandatory):
  1. Pull all transactions from BaaS for previous business day
  2. Compare against your transaction ledger
  3. Flag any discrepancies for compliance review
  4. Auto-resolve: amount mismatch ≤ $0.01 (rounding)
  5. Manual review: any discrepancy > $0.01

Reconciliation failure is a compliance event — escalate immediately.
```

---

### Step 5 — Fraud and Risk Feature Specification (Salmon, Willy)

**Fraud prevention layers:**

**Layer 1: Device and identity signals (at onboarding and each login)**
```
Collect at device level:
  - Device fingerprint (OS, browser, hardware identifiers)
  - IP address + geolocation
  - VPN/proxy/Tor detection
  - Device reputation (has this device been associated with fraud?)

Signals from providers: Sardine, Sift, Signifyd, or Kount
High-risk signals → step-up verification required
Very high-risk signals → manual review or deny
```

**Layer 2: Behavioral analytics (ongoing)**
```
Monitor:
  - Login velocity (multiple logins in short period)
  - Device change after high-risk action
  - Unusual typing speed (may indicate scripted attack)
  - Unusual transaction pattern vs. onboarding-stated purpose

Trigger step-up auth for suspicious behavior:
  - SMS/email OTP for new device logins
  - Biometric verification for large transactions from new location
```

**Layer 3: Transaction risk scoring (per transaction)**
```
Score = f(transaction_amount, merchant_category, geolocation, time_of_day, user_velocity, recipient_risk)

Score 0–40: Auto-approve
Score 41–70: Auto-approve with monitoring flag
Score 71–85: Step-up authentication required
Score 86–100: Block + manual review queue

Model: Rules-based initially (fast to deploy, interpretable for compliance)
Upgrade path: ML model after 6–12 months of labeled fraud data
```

**Chargeback and dispute workflow:**
```
User reports unauthorized transaction:
  1. Provisional credit within 5 business days (Reg E requirement for debit)
  2. Begin investigation (pull authorization data, device logs, IP)
  3. If fraud confirmed: permanent credit + block card + issue new card
  4. If user error: document investigation, reverse provisional credit with notice
  5. File chargeback with card network if merchant fraud confirmed
  SLA: Final resolution within 45 calendar days (Reg E)
```

---

### Step 6 — MVP Scope Definition (all FISH levels)

**MVP scope criteria:** What is the minimum product that delivers the core value proposition AND clears all regulatory requirements? Include what you will NOT build in v1.

**MVP scope table:**
| Feature | In MVP? | Rationale |
|---|---|---|
| Account creation + KYC | ✅ Yes | Core; regulatory requirement |
| ACH payments (outbound) | ✅ Yes | Core value; standard rail |
| Real-time balance | ✅ Yes | Core UX requirement |
| Card issuance | ⚠️ v2 | Adds card program complexity; validate demand first |
| International payments | ❌ No | Regulatory complexity; prove domestic first |
| Joint accounts | ❌ No | KYC complexity doubles; not needed at launch |
| Investment features | ❌ No | Requires broker-dealer registration |
| Bill pay | ⚠️ v2 | BaaS bill pay add-on; not core |
| Spend analytics | ⚠️ v2 | Nice-to-have; not blocking core value |

**MVP launch criteria (non-negotiable before launch):**
- [ ] KYC pass rate > 80% (if below, onboarding is too hard)
- [ ] AML program documented and approved by compliance officer
- [ ] OFAC screening integrated and tested
- [ ] Transaction monitoring rules deployed and tested
- [ ] All required disclosures reviewed by legal counsel
- [ ] BaaS banking partner approved your compliance program
- [ ] SOC 2 Type I (or equivalent) in progress (required by most BaaS partners)
- [ ] Fraud rules deployed with monitoring dashboard active

---

### Final Output

**Core user flows** — onboarding, payment, account management (step-by-step)
**Payment rail selection** — rail comparison, selection logic, fallback design
**API architecture** — full endpoint surface, financial API design rules (Tuna+)
**Banking partner integration** — BaaS architecture, webhook handling, reconciliation (Tuna+)
**Fraud and risk spec** — three-layer fraud prevention, dispute workflow (Salmon+)
**MVP scope** — what's in, what's out, launch criteria checklist
**Recommended next skill** — `/ds-fintech-integration-planning` — select and evaluate the specific technology partners for each integration layer


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
