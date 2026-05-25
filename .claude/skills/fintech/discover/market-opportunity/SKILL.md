---
name: ds-fintech-market-opportunity
description: Sizes the fintech market opportunity and identifies underserved segments. Use when entering a new financial vertical, pitching investors, or asking "is this fintech opportunity worth pursuing". Also triggers on: Market sizing (TAM/SAM/SOM), segment identification and scoring, competitive landscape mapping, regulatory tailwind/headwind assessment, monetization model survey, unit economics benchmarking.
tags: [fintech, discover]
model: inherit
---

# Market Opportunity
**Domain**: Fintech | **Phase**: Discover | **Invocation**: `/ds-fintech-market-opportunity`

## What this produces
A fintech market opportunity brief with TAM/SAM/SOM, segment priority matrix, competitive white space map, monetization model landscape, and go-forward recommendation.

## Methods
Market sizing (TAM/SAM/SOM top-down + bottom-up), segment identification and scoring, competitive landscape mapping, regulatory tailwind/headwind assessment, monetization model survey, unit economics benchmarking, customer pain intensity scoring

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick brief | Market size + top 3 segments + competitive white space + go/no-go signal |
| Tuna | Full opportunity | All above + competitive landscape + unit economics benchmarks |
| Salmon | Deep analysis | All above + regulatory assessment + monetization model landscape |
| Willy | Investor-ready | All methods + investor-grade sizing + full competitive map + pitch narrative |

---

## Execution Prompt

Read the project context: target financial service vertical, any existing product context or hypothesis, geography, team background, FISH classification.

**Fintech opportunities must clear two mandatory filters before proceeding: customer pain intensity AND regulatory feasibility. Score both before recommending.**

---

### Step 1 — Market Sizing (all FISH levels)

Use both top-down and bottom-up to triangulate. They should agree within 2–3×. If they don't, your assumptions are off.

**Top-down sizing:**
```
TAM (Total Addressable Market): The total spending in this financial category globally or in target geography
SAM (Serviceable Addressable Market): The portion your product model can serve (geography × product type × customer segment)
SOM (Serviceable Obtainable Market): Realistic capture in 3–5 years based on go-to-market model

Example:
TAM: US small business lending market — $700B in annual originations
SAM: Online SMB loans < $500K with < 3 years in business — $85B (12% of TAM)
SOM: 3% market share in 5 years at current GTM model — $2.5B in annual originations → $25M ARR at 1% take rate
```

**Bottom-up sizing:**
```
Unit-level calculation:
  Target customers: [N] businesses / individuals in segment
  × Average transaction value: $[X]
  × Average transactions per year: [N]
  × Addressable %: [Y]% (product-market fit filter)
  = Bottom-up addressable market
```

**Sizing output:**
| Market | TAM | SAM | SOM | Revenue at 1% take | Revenue at 3% take |
|---|---|---|---|---|---|
| [Market name] | $[X]B | $[X]B | $[X]B | $[X]M/yr | $[X]M/yr |

**Sizing quality check:** if TAM and bottom-up differ by > 5×, the assumptions need scrutiny. Name the discrepancy.

---

### Step 2 — Segment Scoring (all FISH levels)

Not all segments are equal. Score each on dimensions that predict fintech success.

**Segment scoring matrix:**
| Segment | Pain intensity (1–5) | Regulatory feasibility (1–5) | Market size (1–5) | Existing competition (inverse, 1–5) | Monetization clarity (1–5) | Total /25 |
|---|---|---|---|---|---|---|
| [Segment A] | | | | | | |
| [Segment B] | | | | | | |
| [Segment C] | | | | | | |

**Scoring guide:**
- **Pain intensity (5 = severe)**: Is this financial problem genuinely painful or is it a minor friction? High-pain = high switching motivation. Evidence: consumer complaints, workarounds in use, willingness to pay signal.
- **Regulatory feasibility (5 = easy)**: Can you serve this segment without a banking license in < 12 months? Partnership/BaaS model scores higher than requiring a full license.
- **Market size (5 = large)**: > $10B SAM = 5; $1–10B = 4; $100M–1B = 3; < $100M = 2.
- **Competition (inverse, 5 = low competition)**: No funded competitor with product-market fit = 5; dominant player = 1.
- **Monetization clarity (5 = clear)**: Interchange, subscription, lending spread, and transaction fees are proven. Novel or unproven monetization = 2.

**Segments scoring < 15/25**: eliminate unless one dimension can be rapidly improved.

---

### Step 3 — Competitive Landscape (Tuna, Salmon, Willy)

**Competitor audit:**
| Competitor | Segment | Business model | Funding | Strengths | Weaknesses | Pricing |
|---|---|---|---|---|---|---|
| [Competitor A] | [segment] | [model] | $[X]M | [2–3 strengths] | [2–3 gaps] | [pricing] |

**Competitive positioning dimensions:**
- Speed/UX: how fast/easy to onboard and transact?
- Coverage: which customer segments and geographies served?
- Pricing: transaction fees, spreads, subscription?
- Compliance depth: which regulations and jurisdictions covered?
- Tech stack: proprietary rails vs. reselling others' infrastructure

**Competitive white space map:**
```
X-axis: [dimension most important to customers, e.g., speed]
Y-axis: [dimension that creates defensibility, e.g., compliance coverage]

Plot competitors. White space = territory with no well-funded incumbent.
```

**White space opportunities:** Name the 3 biggest gaps in the market that a new entrant could own.

---

### Step 4 — Regulatory Tailwind/Headwind Assessment (Tuna, Salmon, Willy)

| Regulatory factor | Status | Impact |
|---|---|---|
| Open banking mandate (PSD2/Section 1033) | Active in EU, pending in US | Tailwind — enables data aggregation without building banking relationships |
| Stablecoin regulation | Pending US legislation | Headwind/uncertainty — pause crypto-dependent models |
| CFPB small business lending rules | Active | Headwind — increased reporting burden for SMB lenders |
| BaaS regulatory scrutiny | Increasing | Headwind — Banking partners requiring more KYC from fintech partners |
| BNPL regulation | Emerging | Risk — regulatory change may require lending license |

**Regulatory trend score:** net tailwinds minus headwinds. Negative score = approach with caution.

---

### Step 5 — Monetization Model Survey (Salmon, Willy)

Document all monetization models used in this segment. The right model is determined by the business, not convention.

| Model | How it works | Take rate / fee | Used by | Best for |
|---|---|---|---|---|
| **Interchange** | % of transaction value from card network | 0.5–2.0% | Chime, Brex, Mercury | High-volume card spending |
| **Lending spread** | Borrow at low rate, lend at higher rate | 2–8% net spread | Lending Club, Kabbage | Credit products |
| **Subscription** | Monthly/annual fee for access | $10–500/mo | Copilot, YNAB, Ramp | Software-first fintech |
| **Transaction fee** | Flat or % per transaction | $0.25–$5 or 0.5–2% | Stripe, Square, PayPal | Payment facilitation |
| **AUM fee** | % of assets under management | 0.25–1.0%/yr | Betterment, Wealthfront | Wealth management |
| **Referral/lead gen** | Fee per qualified lead to financial institution | $50–500/lead | Credit Karma, NerdWallet | Lead generation |
| **Float income** | Interest on cash held in accounts | Fed funds rate - spread | Robinhood, Chime | Deposit-holding products |

**Fintech take rate benchmarks by category:**
- Payments: 0.5–2.5% gross; 0.1–0.5% net (after interchange fees)
- Lending: 3–12% APR spread
- Wealth: 0.25–1.0% AUM
- B2B SaaS: $50–500/mo per seat

---

### Step 6 — Unit Economics Benchmarking (Tuna, Salmon, Willy)

Compare your projected unit economics against industry benchmarks.

| Metric | Your estimate | Industry benchmark | Notes |
|---|---|---|---|
| CAC (Customer Acquisition Cost) | $[X] | $50–500 (consumer), $500–5K (SMB), $5–50K (enterprise) | |
| LTV (Lifetime Value) | $[X] | LTV/CAC ratio target: > 3× | |
| Payback period | [X months] | < 12 months (consumer), < 24 months (SMB) | |
| Gross margin | [X]% | 40–80% (SaaS), 20–50% (payments), 10–30% (lending) | |
| Monthly churn | [X]% | < 2% (SaaS), < 5% (consumer fintech) | |
| NPS (if available) | [X] | > 50 is strong for fintech | |

---

### Final Output

**TAM/SAM/SOM** — both top-down and bottom-up with reconciliation
**Segment priority matrix** — scored /25, segments ranked by opportunity
**Competitive landscape** — competitor audit + white space map (Tuna+)
**Regulatory assessment** — tailwinds, headwinds, net score (Tuna+)
**Monetization model landscape** — models used in category with take rate benchmarks (Salmon+)
**Unit economics benchmarks** — your model vs. category benchmarks (Tuna+)
**Recommendation** — go/no-go per segment with one-paragraph rationale
**Recommended next skill** — `/ds-fintech-regulatory-landscape` — map the regulatory requirements before making any product or build commitments
