---
name: ds-fintech-product-compliance
description: Defines compliance requirements that must be built into the fintech product. Use when specifying a regulated financial product, preparing for audit, or asking "what compliance features must this product have". Also triggers on: Regulatory requirement translation, KYC/AML requirement specification, data privacy mapping, audit trail design, reporting requirement identification, consent and disclosure design.
tags: [fintech, define]
model: inherit
---

# Product Compliance
**Domain**: Fintech | **Phase**: Define | **Invocation**: `/ds-fintech-product-compliance`

## What this produces
A product compliance specification translating regulatory requirements into concrete product features, data handling rules, audit trail design, security controls, and compliance testing plan.

## Methods
Regulatory requirement translation, KYC/AML requirement specification, data privacy mapping, audit trail design, reporting requirement identification, consent and disclosure design, security control specification, compliance testing plan

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Core requirements | Top compliance requirements + KYC/AML needs + data rules |
| Tuna | Full spec | All above + audit trail design + consent/disclosure templates |
| Salmon | Production spec | All above + security controls + reporting requirements + testing plan |
| Willy | Audit-ready | All methods + compliance matrix + legal review checklist + examiner-ready documentation |

---

## Execution Prompt

Read the project context: the regulatory landscape assessment and product design context. FISH classification determines depth.

**Compliance is not a feature you add at the end — it changes the product architecture. Define it before the engineering sprint starts. Every week of delayed compliance definition = 2 weeks of rework.**

---

### Step 1 — Compliance Requirement Inventory (all FISH levels)

Translate each regulation into specific product features and constraints.

**Requirement mapping table:**
| Regulation | Requirement | Product implication | Engineering effort | Priority |
|---|---|---|---|---|
| BSA/AML | Customer Identification Program | Collect: full legal name, DOB, address, SSN/EIN | Identity verification flow, data storage | P0 — blocks launch |
| BSA/AML | Beneficial ownership (entities) | Collect: 25%+ owners' personal info | Entity onboarding flow | P0 — blocks business accounts |
| BSA/AML | Transaction monitoring | Alert on unusual patterns vs. customer profile | Rules engine + case management | P0 — ongoing |
| OFAC | Sanctions screening | Check every customer + counterparty + transaction | Integration with Ofac screening API | P0 — before first transaction |
| Reg E | Error resolution | Provide written acknowledgment within 10 days, resolve within 45 days | Support workflow + timeline tracking | P1 |
| TILA | Rate/fee disclosure | Disclose APR, fees, and terms BEFORE account opening | Disclosure flow, PDF generation, e-signature | P1 |
| GLBA | Privacy notice | Annual privacy notice to consumers | Email/in-app notice, opt-out mechanism | P1 |
| PCI DSS | Card data security | Never store raw card numbers; use tokenized representation | Card tokenization, no direct card data in DB | P0 — blocks card product |
| FCRA | Credit report dispute | Allow consumers to dispute reported information | Dispute workflow, furnisher obligations | P2 |
| GDPR (if EU) | Right to deletion | Delete all personal data within 30 days of request | Deletion pipeline, audit log of deletion | P1 |

---

### Step 2 — KYC/AML Specification (all FISH levels)

**KYC tiers — match verification depth to risk:**
```
Tier 1 — Low risk (anonymous or limited activity):
  Verify: Email + phone number
  Limits: < $500 cumulative transactions; no cash-equivalent transfers
  Use case: Read-only access, financial wellness tools, limited trial

Tier 2 — Standard (verified individual):
  Verify: Full legal name + DOB + address + last 4 SSN
  Methods: Document-free (database lookup) → ID document if no match
  Limits: Up to $5,000/day transaction volume
  Use case: Standard consumer or SMB account

Tier 3 — Enhanced (high-value or high-risk):
  Verify: Full name + DOB + SSN (full) + government ID photo + selfie
  Methods: Document upload + liveness check + database cross-reference
  Limits: Unlimited with ongoing monitoring
  Use case: High-volume, credit products, international transactions, PEPs

Tier 4 — Business (entity accounts):
  Verify: Business legal name + EIN + registered address + secretary of state filing
  Beneficial ownership: Collect info on all owners ≥ 25% + controlling person
  Methods: Document upload + manual review for high-risk industries
```

**KYC flow specification:**
```
Step 1: Collect PII (name, DOB, address, SSN last 4 or full)
  → Store encrypted at rest (AES-256)
  → Never log PII in application logs

Step 2: Run identity verification
  → Primary: Instant database check (Persona, Alloy, Socure, Stripe Identity)
  → Result: PASS → continue | NEEDS_REVIEW → document upload | FAIL → decline

Step 3: OFAC/sanctions screening
  → Screen full name + address against SDN list and consolidated sanctions
  → MATCH → escalate to compliance team immediately (do NOT inform customer)
  → NO MATCH → continue

Step 4: Risk score customer
  → Low risk → Tier 2 limits apply automatically
  → Medium risk → Enhanced due diligence questions
  → High risk → Manual compliance review before account activation

Step 5: Store outcome
  → KYC result + provider response + timestamp + reviewer ID (if manual)
  → Retain for 5 years per BSA record retention requirements
```

---

### Step 3 — Transaction Monitoring Design (all FISH levels)

**Rule categories:**
```
Category 1 — Structuring detection (CTR evasion):
  Rule: Multiple transactions < $10K within 24h from same customer summing to > $9,000
  Action: Flag for SAR review

Category 2 — Unusual velocity:
  Rule: Transaction volume > 3× customer's 30-day average in a single day
  Action: Alert compliance team; freeze if > 10×

Category 3 — Geographic anomaly:
  Rule: Transaction in jurisdiction inconsistent with customer's stated profile
  Action: Flag for review; step-up authentication required

Category 4 — High-risk merchant/counterparty:
  Rule: Transaction to/from entity on FinCEN high-risk list or FATF grey/black list
  Action: Immediate review; hold funds pending compliance approval

Category 5 — Round-number patterns:
  Rule: Series of transactions in exact round numbers (e.g., 10 × $1,000 = $10,000)
  Action: Flag for structuring review
```

**Case management requirements:**
- Each flagged transaction creates a compliance case
- Case includes: customer profile, transaction detail, rule triggered, risk score, analyst notes
- SAR filing decision within 30 days of suspicion detection
- SAR filed with FinCEN within 30 days of decision (60 if more information needed)
- Do NOT inform the customer that a SAR has been filed (tipping-off prohibition)

---

### Step 4 — Audit Trail Design (Tuna, Salmon, Willy)

**Every regulated action must be immutably logged.**

**Events requiring audit log entry:**
| Event | Data to capture | Retention |
|---|---|---|
| Customer account created | User ID, timestamp, KYC result, IP, device | 5 years |
| KYC verification run | User ID, provider, result, timestamp, reviewer | 5 years |
| Transaction initiated | Amount, source, destination, timestamp, user ID, location | 5 years |
| Transaction approved/declined | Decision, rule triggered, reviewer ID, timestamp | 5 years |
| SAR filed | SAR ID, FinCEN ref, filing timestamp, customer ID (hashed) | 5 years + |
| Account closed | Reason, timestamp, closure type, data retention action | 5 years |
| PII accessed by employee | Employee ID, customer ID, reason, timestamp | 5 years |
| Privacy deletion request | Request ID, customer ID, completion timestamp | 7 years |

**Audit log technical requirements:**
```
Immutability: Audit logs must be append-only — no update or delete operations
Storage: Separate database/S3 bucket from operational data with restricted write access
Format: Structured JSON with consistent schema
Indexing: Searchable by customer ID, timestamp range, event type, reviewer ID
Access: Read-only for compliance team; write-only for automated systems; no direct DB access for engineers
Backup: Cross-region replication; 7-year retention minimum
```

---

### Step 5 — Consent and Disclosure Design (Tuna, Salmon, Willy)

**Required disclosures and when to show them:**
```
Pre-account opening:
  □ Privacy Policy (GLBA privacy notice) — must display before collecting any PII
  □ Terms of Service — must accept before creating account
  □ TILA disclosure (credit products) — APR, fees, and repayment terms
  □ Electronic consent (ESIGN Act) — consent to receive disclosures electronically

At account activation:
  □ Account agreement / cardholder agreement
  □ Fee schedule
  □ Funds availability policy (Reg CC)

Ongoing:
  □ Annual privacy notice (GLBA) — email/in-app, allow opt-out of data sharing
  □ Material change notices — 30 days advance notice for fee or term changes
  □ Monthly/periodic statements

E-signature requirements:
  □ Customer explicitly consents to electronic signatures
  □ IP address and timestamp recorded for each consent action
  □ PDF copy of signed document stored and retrievable
  □ Customer can withdraw e-consent (and must then receive paper)
```

**Disclosure quality bar:**
- Written at ≤ Grade 8 reading level (Flesch-Kincaid)
- Key fees in bold or highlighted (no fine print burying)
- APR displayed prominently for credit products
- Regulator test: would the CFPB's examiner find this "fair and transparent"?

---

### Step 6 — Security Controls Specification (Salmon, Willy)

**Required security controls for regulated financial products:**
| Control | Requirement | Implementation |
|---|---|---|
| Encryption at rest | All PII, financial data, SSNs encrypted | AES-256, key management via AWS KMS |
| Encryption in transit | All data in transit encrypted | TLS 1.2+ minimum, TLS 1.3 preferred |
| Access control | Least-privilege; MFA for all admin access | RBAC, MFA enforced via SSO |
| PII isolation | PII stored separately, access logged | Separate database schema, audit log on every access |
| Key management | Encryption keys managed via KMS | AWS KMS, quarterly key rotation |
| Vulnerability management | Regular patching; no critical CVEs unpatched | Automated dependency scanning, 30-day patch SLA |
| Penetration testing | Annual third-party pentest | Required by most BaaS banking partners |
| SOC 2 Type II | Audited security, availability, confidentiality | Required by banking partners, enterprise customers |
| PCI DSS Level 1 (if cards) | Card data never stored raw | Tokenization via Stripe, Braintree, Adyen |

---

### Step 7 — Compliance Testing Plan (Salmon, Willy)

**Pre-launch compliance testing:**
| Test | Who runs it | When | Pass criteria |
|---|---|---|---|
| KYC accuracy testing | Compliance team | Pre-launch | Known identity passes; synthetic fraud identity fails |
| OFAC screening test | Compliance team | Pre-launch | SDN-listed test case blocked; clean test case passes |
| Transaction monitoring rules | Compliance team | Pre-launch | 10 synthetic SAR scenarios all trigger correctly |
| Disclosure review | Legal counsel | Pre-launch | All required disclosures present, compliant, readable |
| Data privacy audit | Engineering + Legal | Pre-launch | PII encrypted, access logged, deletion pipeline works |
| Penetration test | External security firm | Pre-launch (or within 90 days) | No critical or high severity findings unresolved |
| BaaS partner compliance review | Banking partner's team | Pre-launch | Partner approves compliance program before launch |

---

### Final Output

**Compliance requirement inventory** — regulation to product feature mapping with priority
**KYC tier specification** — verification depth per customer risk level, flow design
**Transaction monitoring rules** — category, trigger, action, SAR filing process
**Audit trail design** — events, data, immutability requirements, retention policy (Tuna+)
**Consent and disclosure design** — what disclosures, when, quality requirements (Tuna+)
**Security controls specification** — required controls per regulatory requirement (Salmon+)
**Compliance testing plan** — test cases, owners, pass criteria (Salmon+)
**Recommended next skill** — `/ds-fintech-fintech-product-design` — design the product flows with these compliance requirements built in from the start


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
