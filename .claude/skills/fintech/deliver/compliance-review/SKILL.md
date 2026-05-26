---
name: ds-fintech-compliance-review
description: Reviews a fintech product or period for regulatory compliance gaps and remediation needs. Use at regulatory review cycles, before audits, or asking "are we still compliant and what needs to change". Also triggers on: Regulatory requirement re-mapping, KYC/AML effectiveness review, audit trail completeness check, reporting obligation review, data privacy compliance check, vendor compliance verification.
tags: [fintech, deliver]
model: inherit
---

# Compliance Review
**Domain**: Fintech | **Phase**: Deliver | **Invocation**: `/ds-fintech-compliance-review`

## What this produces
A compliance review report with regulatory adherence scorecard, KYC/AML effectiveness assessment, audit trail completeness check, data privacy compliance, vendor compliance verification, and remediation roadmap with owners.

## Methods
Regulatory requirement re-mapping, KYC/AML effectiveness review, audit trail completeness check, reporting obligation review, data privacy compliance check, vendor compliance verification, incident and breach review, remediation prioritization

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Compliance snapshot | Scorecard + top 3 gaps + priority remediations |
| Tuna | Full review | All above + audit trail check + reporting obligations |
| Salmon | Deep review | All above + vendor compliance + data privacy deep dive |
| Willy | Audit-ready report | All methods + examiner-ready documentation + full gap matrix + roadmap |

---

## Execution Prompt

Read the project context: current compliance documentation, product changes since last review, regulatory updates, any regulatory inquiries or examination notices, FISH classification.

**Compliance gaps compound. A gap discovered by a regulator costs 10–100× more than one discovered internally. Run this review quarterly (more frequently if regulatory change or product change warrants it).**

---

### Step 1 — Compliance Scorecard (all FISH levels)

Score each regulatory area on a 1–5 scale. Be honest — regulators are not lenient with "we thought we were compliant."

| Regulatory Area | Score (1–5) | Evidence | Priority Gap |
|---|---|---|---|
| **AML/BSA Program** | | Written AML policy, CAMS-certified officer, annual training | |
| **KYC/CIP** | | Pass rate, verification methodology, record retention | |
| **Transaction Monitoring** | | Rules deployed, SAR filing rate, false positive rate | |
| **OFAC Screening** | | Screening coverage, match review process, response time | |
| **Reg E Compliance** | | Error resolution SLA (10 days acknowledge, 45 days resolve) | |
| **Consumer Disclosures** | | All required disclosures present, compliant, timely | |
| **Data Privacy** | | Privacy policy current, CCPA/GDPR rights honored | |
| **Vendor Management** | | Third-party vendor compliance verified, agreements current | |
| **Recordkeeping** | | 5-year retention met, records searchable, backup tested | |
| **Licensing** | | All required licenses active, no pending expirations | |

**Scale:**
- **5** — Fully documented, tested, and examiner-ready
- **4** — Compliant with minor documentation gaps
- **3** — Functional but lacks documentation or testing evidence
- **2** — Known gaps; remediation in progress
- **1** — Non-compliant; immediate action required

**Score < 3 on any area** = P0 remediation before any new product features ship.

---

### Step 2 — AML/KYC Effectiveness Review (all FISH levels)

**AML program assessment:**
```
1. Written AML Policy
   □ Policy covers: CIP, CDD, EDD, SAR filing, OFAC, training, independent testing
   □ Policy was reviewed and approved by the board (or equivalent) in last 12 months
   □ Policy reflects current product (has the product changed without updating the policy?)
   
2. Designated BSA/AML Officer
   □ BSA officer is named and has dedicated responsibility (not a side role)
   □ BSA officer holds CAMS, ACAMS, or equivalent certification
   □ BSA officer has authority to report directly to the board
   
3. Independent Testing
   □ AML program tested by independent internal audit or external auditor annually
   □ Last independent test date: [date]
   □ Test findings remediated: [Y/N; list open items]
   
4. Employee Training
   □ All customer-facing and compliance staff trained at onboarding
   □ Annual refresher training completed: [Y/N; % completed]
   □ Specialized training for high-risk areas (PEPs, crypto, international)
```

**KYC effectiveness metrics:**
| Metric | Current | Target | Status |
|---|---|---|---|
| Instant KYC pass rate | X% | > 80% | ✅/⚠️/❌ |
| Document verification pass rate | X% | > 85% | ✅/⚠️/❌ |
| Manual review queue wait time | X hours | < 24 hours | ✅/⚠️/❌ |
| False positive rate (ID rejected but legitimate) | X% | < 5% | ✅/⚠️/❌ |
| KYC record retention compliance | X% | 100% | ✅/⚠️/❌ |

**Transaction monitoring effectiveness:**
```
SAR Filing Review (last quarter):
  SARs filed: [N]
  SAR quality: [% with sufficient narrative for FinCEN]
  Time from suspicion detection to SAR filing: [average X days] (target: ≤ 30 days)
  
Rule effectiveness:
  True positive rate (rules that caught real suspicious activity): X%
  False positive rate (rules that fired on legitimate activity): X% (> 80% = alert fatigue)
  
If false positive rate > 80%:
  → Rules are too broad → tuning required
  → Analysts ignoring alerts (habituation) → examine dismissal rates
  
Untested rules (rules deployed but never triggered): list and evaluate if intentional
```

---

### Step 3 — Audit Trail Completeness (Tuna, Salmon, Willy)

**Audit trail coverage check:**
| Regulated event | Logged? | Searchable? | 5-year retention? | Immutable? | Status |
|---|---|---|---|---|---|
| Account creation | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| KYC verification (each attempt) | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| OFAC screening (each check) | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| Transaction initiation and completion | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| SAR filing | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| Account closure | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| PII access by employee | Y/N | Y/N | Y/N | Y/N | ✅/❌ |
| Compliance case creation and resolution | Y/N | Y/N | Y/N | Y/N | ✅/❌ |

**Audit trail retrieval test:**
```
Run the following scenario: "Can you produce, within 24 hours, a complete audit trail for:
  (a) A specific customer account from creation to present?
  (b) All OFAC screening checks for a specific customer?
  (c) All transactions for a specific customer in a date range?
  (d) The SAR decision process for a specific suspicious activity?"

If any of these cannot be produced within 24 hours: CRITICAL gap — examiners will ask these questions.
```

---

### Step 4 — Reporting Obligation Review (Tuna, Salmon, Willy)

**Regulatory reporting checklist:**
| Report | Regulator | Trigger | Deadline | Current status |
|---|---|---|---|---|
| Currency Transaction Report (CTR) | FinCEN | Cash transaction ≥ $10,000 | 15 days after transaction date | ✅/⚠️/❌ |
| Suspicious Activity Report (SAR) | FinCEN | Suspicious activity ≥ $5,000 | 30 days from suspicion detection (60 with extension) | ✅/⚠️/❌ |
| FinCEN MSB Registration | FinCEN | Within 180 days of starting MSB activity | Annual renewal | ✅/⚠️/❌ |
| GLBA Privacy Notice | FTC/State | Annual | Annual (calendar year) | ✅/⚠️/❌ |
| State MTL renewal | State regulators | Per license | Varies by state (most annual) | ✅/⚠️/❌ |
| 1099-INT / 1099-B | IRS | Interest/dividend payments | January 31 (recipient), March 31 (IRS) | ✅/⚠️/❌ |

**CTR filing audit:**
```
Last quarter CTRs filed: [N]
Late filings: [N] (any = compliance finding)
Structuring detected: [N SARs filed for structuring]

CTR process test: Pick 3 transactions > $10,000 from last quarter.
  Confirm CTR was filed for each within 15 days.
  Confirm CTR includes all required fields.
```

---

### Step 5 — Data Privacy Compliance (Salmon, Willy)

**CCPA/CPRA compliance (California residents):**
```
□ Privacy policy discloses: categories of PII collected, purposes, sharing with third parties
□ "Do Not Sell My Personal Information" link or process exists
□ Consumer rights request process operational: right to know, delete, correct, portability
□ Response time to consumer rights requests: ≤ 45 days (verified)
□ Data map is current: all PII data stores mapped with retention period
□ Third-party contracts include required CCPA provisions (service provider agreement)
```

**GLBA Safeguards Rule (financial institutions):**
```
□ Written information security program (WISP) in place
□ Board/leadership approval of WISP obtained
□ Risk assessment conducted within last 12 months
□ Access controls: MFA for all users with access to customer PII
□ Encryption: all customer PII encrypted at rest and in transit
□ Incident response plan documented and tested
□ Employee training on data security completed annually
□ Service provider oversight: contracts include security requirements
□ Designated qualified individual (QI) responsible for security program
□ Annual report to board on WISP effectiveness
```

**PII data map:**
| Data element | Where stored | Encrypted? | Retention | Deletion process |
|---|---|---|---|---|
| SSN | users_pii table | ✅ AES-256 | Account life + 7 years | Anonymize on deletion request |
| Government ID image | S3 (encrypted) | ✅ | 5 years | Delete S3 object |
| Bank account numbers | Stored at Plaid | Plaid controls | Per Plaid policy | Plaid Item deletion |

---

### Step 6 — Vendor Compliance Verification (Salmon, Willy)

**Vendor compliance review:**
| Vendor | Service | Their license/certification | Contract current? | Last audit? | Status |
|---|---|---|---|---|---|
| [BaaS Partner] | Banking services | FDIC-insured bank | ✅ | [date] | ✅/⚠️/❌ |
| [KYC Provider] | Identity verification | SOC 2 Type II | ✅ | [date] | ✅/⚠️/❌ |
| [OFAC Vendor] | Sanctions screening | — | ✅ | [date] | ✅/⚠️/❌ |
| [Transaction Monitoring] | AML monitoring | SOC 2 Type II | ✅ | [date] | ✅/⚠️/❌ |

**Vendor due diligence checklist:**
- [ ] Vendor SOC 2 Type II report reviewed (not just received) — within last 12 months
- [ ] Vendor financial stability assessed (particularly for early-stage BaaS/fintech vendors)
- [ ] Business continuity plan reviewed — what happens if vendor ceases operations?
- [ ] Sub-processors identified — your vendor's vendors who touch your customer data
- [ ] Data processing agreement (DPA) in place for GDPR/CCPA compliance
- [ ] Exit/transition plan documented — can you migrate to alternative within 90 days?

---

### Step 7 — Remediation Roadmap (all FISH levels)

| # | Gap | Severity | Regulatory risk | Effort | Owner | Due date |
|---|---|---|---|---|---|---|
| 1 | [e.g., AML independent testing overdue] | CRITICAL | Regulatory finding | 2 weeks (hire external auditor) | CCO | [date] |
| 2 | [e.g., False positive rate 87%] | HIGH | Alert fatigue → missed SARs | 3 weeks (rule tuning) | Compliance Analyst | [date] |
| 3 | [e.g., 2 state MTL renewals due] | HIGH | Unlicensed activity | 4 weeks | Legal Counsel | [date] |
| 4 | [e.g., WISP not board-approved] | MEDIUM | GLBA gap | 1 week | CCO + Board | [date] |
| 5 | [e.g., Annual privacy notice not sent] | MEDIUM | GLBA gap | 1 day | Engineering + Legal | [date] |

**Remediation priority rule**: any gap that could result in an enforcement action or examiner finding = resolve before next quarter. Any gap that a regulator would consider "systemic" = resolve this month.

---

### Final Output

**Compliance scorecard** — 10 regulatory areas, 1–5 scale, overall grade
**AML/KYC effectiveness** — program assessment, SAR filing quality, monitoring rule analysis
**Audit trail completeness** — coverage check + retrieval test results (Tuna+)
**Reporting obligation status** — CTR/SAR/registration currency check (Tuna+)
**Data privacy compliance** — CCPA, GLBA Safeguards Rule checklist (Salmon+)
**Vendor compliance verification** — SOC 2, DPA, exit plan per vendor (Salmon+)
**Remediation roadmap** — severity-ranked gaps with owners and due dates
**Recommended next skill** — `/ds-fintech-go-to-market` — ensure regulatory readiness is confirmed before launch planning


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
