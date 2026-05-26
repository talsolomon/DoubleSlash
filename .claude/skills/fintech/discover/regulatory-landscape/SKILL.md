---
name: ds-fintech-regulatory-landscape
description: Maps the regulatory environment for a fintech product including licenses, compliance requirements, and jurisdictional risks. Use when entering a regulated financial market, planning expansion, or asking "what do we need to legally operate". Also triggers on: Regulatory body identification, applicable law and regulation mapping, license requirement analysis, jurisdictional comparison, enforcement action review, compliance timeline estimation.
tags: [fintech, discover]
model: inherit
---

# Regulatory Landscape
**Domain**: Fintech | **Phase**: Discover | **Invocation**: `/ds-fintech-regulatory-landscape`

## What this produces
A regulatory landscape map with applicable regulations, licensing requirements by jurisdiction, fastest path to legal operation, compliance timeline, and legal risk scorecard.

## Methods
Regulatory body identification, applicable law and regulation mapping, license requirement analysis, jurisdictional comparison, enforcement action review, compliance timeline estimation, BaaS and partnership model review, legal risk scoring

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Regulatory snapshot | Applicable regulations + license requirements + top 3 legal risks |
| Tuna | Full landscape | All above + jurisdictional comparison + compliance timeline |
| Salmon | Deep map | All above + enforcement action history + partnership model analysis |
| Willy | Complete compliance roadmap | All methods + full legal risk scoring + regulatory engagement plan |

---

## Execution Prompt

Read the project context: product description, financial services involved (payments, lending, deposits, investment, insurance), target markets/geographies, intended customer types (consumer, SMB, enterprise), FISH classification.

**Identify the fastest legal path to market. Sometimes a BaaS partnership or banking-as-a-service model avoids a 2-year licensing process entirely.**

---

### Step 1 — Product Type Classification (all FISH levels)

Regulatory requirements depend on which financial activities you actually perform. Be precise.

**Financial activity inventory:**
| Activity | Your product does this? | Primary regulator | License typically required |
|---|---|---|---|
| Holding customer deposits | Y/N | OCC, state banking regulators | Bank charter OR FDIC-insured partner |
| Extending credit/loans | Y/N | CFPB, state regulators | State lending license (×50 states) OR bank partner |
| Processing payments | Y/N | FinCEN, card networks, state | Money Transmitter License (MTL) per state |
| Issuing cards | Y/N | Card networks (Visa/MC), FDIC partner | Card program agreement + BaaS bank partner |
| Investment products | Y/N | SEC, FINRA | Broker-dealer OR investment adviser registration |
| Insurance products | Y/N | State insurance regulators | Insurance license per state |
| Crypto / digital assets | Y/N | FinCEN, SEC, CFTC (unclear) | BitLicense (NY) + state MTLs + federal unclear |
| Foreign exchange | Y/N | FinCEN, CFTC | MTL + FinCEN MSB registration |

**Rule**: performing any regulated financial activity without the appropriate license = regulatory violation. The regulator you missed will find you when you grow.

---

### Step 2 — Regulatory Body Map (all FISH levels)

**US federal regulators:**
| Regulator | Jurisdiction | Key regulations |
|---|---|---|
| **FinCEN** | Money services businesses, AML/BSA | Bank Secrecy Act, AML program requirements, SAR filing |
| **CFPB** | Consumer financial products | TILA, FCRA, ECOA, UDAAP, fair lending |
| **OCC** | National banks, federal charters | Banking activities, CRA, safety and soundness |
| **SEC** | Securities, investment advisers, broker-dealers | Securities Act, Investment Advisers Act, Reg BI |
| **FINRA** | Broker-dealers | Licensing, suitability, market conduct |
| **FDIC** | Deposit insurance, state banks | Deposit insurance, examination |
| **Federal Reserve** | Bank holding companies, payment systems | Reg E, Reg Z, Reg CC |

**State regulators:**
- Money Transmitter Licenses (MTL): required in ~49 states for payment processing; each state has its own application process, surety bond requirement ($25K–$2M+), and timeline (3–18 months)
- State banking licenses: for deposit-taking or lending activities in each state
- Insurance licenses: per state, per product type

**International — key jurisdictions:**
| Jurisdiction | Regulatory body | Key framework |
|---|---|---|
| EU | EBA, national regulators | PSD2, EMI license, AML6D |
| UK | FCA | FCA authorization, EMI/PI license |
| Singapore | MAS | Payment Services Act, MPI/SPI license |
| Australia | ASIC | AFSL license |

---

### Step 3 — Fastest Path to Legal Operation (all FISH levels)

**Three paths to market:**

**Path A — Build your own license (slowest, most control)**
```
Timeline: 12–36 months
Cost: $500K–$5M+ (legal, compliance staff, state application fees, bonds)
Best for: Large enough team to hire compliance officer and general counsel
Risk: Clock starts at day 0; all customer-facing activity blocked until licensed
```

**Path B — Banking-as-a-Service (BaaS) partnership (fastest, least control)**
```
Timeline: 3–9 months to launch
Cost: Revenue share (20–40% of interchange or loan economics) + monthly platform fee
Best for: Early-stage, capital-efficient, prove product before licensing
Risk: Depends on partner's license; partner bank takes regulatory risk; partner can terminate
Key BaaS providers: Synapse (defunct), Unit, Treasury Prime, Column, Thread Bank, Cross River Bank
```

**Path C — White-label or acquisition**
```
Timeline: 6–18 months
Cost: Acquisition price or revenue share
Best for: Licensing requires scale you don't have (e.g., broker-dealer)
Risk: Integration complexity; inherited compliance liabilities
```

**Fastest path recommendation:**
```
For [product type] targeting [market]:
  Recommended: Path [A/B/C]
  Rationale: [why this path given the product, market, and team stage]
  Time to first customer: [X months]
  Time to licensed operation: [X months]
  Critical dependencies: [what must happen for this path to work]
```

---

### Step 4 — License Requirements by Jurisdiction (Tuna, Salmon, Willy)

**Money Transmitter License (MTL) state-by-state complexity:**
| State | Processing time | Surety bond | Net worth requirement | Notes |
|---|---|---|---|---|
| California | 12–18 months | $250K+ | $500K | Most complex; DFPI strict |
| New York | 12–24 months | $500K+ | Varies | BitLicense separate for crypto |
| Texas | 6–12 months | $300K+ | $500K | Relatively straightforward |
| Wyoming | 3–6 months | $25K | Low | Crypto-friendly |
| Florida | 6–9 months | $100K | $100K | Moderate |

**Multi-state strategy options:**
- **NMLS licensing**: Nationwide Multistate Licensing System allows coordinated multi-state applications for many license types
- **Passporting** (EU only): EMI license in one EU country grants access to all 27 EU member states
- **Priority state sequence**: Launch in 1–3 states first (fastest + highest customer density), expand quarterly

---

### Step 5 — Key Compliance Requirements (all FISH levels)

**Anti-Money Laundering (AML) / Bank Secrecy Act (BSA):**
```
Required regardless of license status for all money services businesses:
  1. AML Program: documented policies, procedures, designated compliance officer
  2. Customer Identification Program (CIP): verify customer identity at onboarding
  3. Customer Due Diligence (CDD): understand customer risk profile and expected activity
  4. Enhanced Due Diligence (EDD): for high-risk customers (PEPs, large transactions)
  5. Suspicious Activity Reports (SARs): file within 30 days of suspicious activity ≥ $5K
  6. Currency Transaction Reports (CTRs): file for cash transactions ≥ $10K
  7. OFAC screening: check customers and transactions against sanctions lists (daily)
  8. Transaction monitoring: automated rules + human review for anomalies
```

**Consumer protection (CFPB):**
```
TILA (Truth in Lending): Disclosure of APR, fees, and terms for credit products
FCRA (Fair Credit Reporting): Rules for using credit data, dispute rights
ECOA (Equal Credit Opportunity): No discrimination in credit decisions
UDAAP: No unfair, deceptive, or abusive acts or practices
Reg E: Electronic fund transfer rights, error resolution, dispute process
```

**Data privacy:**
| Regulation | Applies when | Key requirements |
|---|---|---|
| GLBA | Licensed financial institutions | Privacy notices, safeguards rule |
| CCPA/CPRA | California residents' data | Right to know, delete, opt-out of sale |
| GDPR | EU residents' data | Lawful basis for processing, DPA, 72h breach notification |

---

### Step 6 — Compliance Timeline Estimation (Tuna, Salmon, Willy)

**Compliance build timeline (Path B — BaaS partnership):**
```
Month 1–2:  Select and contract BaaS banking partner
Month 2–3:  Negotiate card program agreement (if applicable)
Month 3–4:  Design and document AML program
Month 3–4:  Build KYC/identity verification flow
Month 4–5:  Integrate OFAC/sanctions screening
Month 5–6:  Implement transaction monitoring
Month 6:    Internal compliance audit
Month 7:    Soft launch (limited beta, 100–500 customers)
Month 9–12: FinCEN MSB registration (required within 180 days of starting MSB activity)
Month 12+:  State MTL applications if needed

Total time to first customer: ~6–7 months
Total time to multi-state compliant: 18–24 months
```

**Legal risk scorecard:**
| Risk area | Risk level | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Operating without required license | CRITICAL | High if not addressed | License revocation, fines, criminal referral | Path B: use BaaS partner's license |
| AML program deficiency | HIGH | Medium | FinCEN enforcement, $1M+ fines | Hire compliance officer in month 1 |
| State MTL violation | HIGH | Medium | Cease-and-desist per state | Start MTL applications at $1M GMV/month |
| CFPB UDAAP action | MEDIUM | Low early stage | Reputational damage, consent order | User testing, clear disclosures |
| Data breach / GDPR | MEDIUM | Medium | €20M fine or 4% revenue | Encryption, breach response plan |

---

### Final Output

**Product activity inventory** — which regulated activities you perform and who regulates them
**Regulatory body map** — federal and state/international regulators that apply
**Fastest path to market** — Path A/B/C with timeline and cost
**License requirements by jurisdiction** — with timeline and bond amounts (Tuna+)
**Key compliance requirements** — AML/BSA, consumer protection, data privacy
**Compliance timeline** — month-by-month for chosen path (Tuna+)
**Legal risk scorecard** — severity, likelihood, mitigation per risk area (Salmon+)
**Recommended next skill** — `/ds-fintech-financial-model` — build the unit economics with compliance costs explicitly modeled


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
