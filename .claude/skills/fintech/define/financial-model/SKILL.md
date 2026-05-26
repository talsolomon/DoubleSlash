---
name: ds-fintech-financial-model
description: Builds the unit economics and financial model for a fintech product. Use when validating a business model, preparing investor materials, or asking "does the math work on this fintech product". Also triggers on: Unit economics modeling (CAC, LTV, payback), revenue model design, interchange and fee structure analysis, cost structure breakdown.
tags: [fintech, define]
model: inherit
---

# Financial Model
**Domain**: Fintech | **Phase**: Define | **Invocation**: `/ds-fintech-financial-model`

## What this produces
A fintech financial model with unit economics, revenue projections, cost structure (including compliance costs), break-even analysis, 3-scenario model, and investor metrics.

## Methods
Unit economics modeling (CAC, LTV, payback), revenue model design, interchange and fee structure analysis, cost structure breakdown, regulatory cost estimation, scenario modeling (base/bull/bear), break-even analysis, investor metrics (ARR, net revenue, take rate)

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Unit economics | CAC/LTV/payback + revenue model + break-even estimate |
| Tuna | Full model | All above + cost structure + scenario analysis |
| Salmon | Investor model | All above + regulatory cost modeling + investor metrics |
| Willy | Pitch-ready model | All methods + sensitivity analysis + 3-year projection + board-ready narrative |

---

## Execution Prompt

Read the project context: product description, pricing model, target customer segments, market size, and regulatory landscape from the discover phase. FISH classification determines depth.

**State every assumption explicitly. A fintech model with hidden assumptions is a liability — investors, regulators, and banking partners will find them.**

---

### Step 1 — Revenue Model Design (all FISH levels)

Define exactly how money flows to you. One product can have multiple revenue streams.

**Revenue stream specification:**
```
Revenue stream 1: [Interchange]
  Source: Card network passes % of transaction value to card issuer, who shares with you
  Formula: Transaction volume × gross interchange rate × your share
  Example: $10M GMV × 1.5% gross interchange × 70% your share = $105K/month
  Assumption: Gross interchange rate varies by card type (debit: ~0.5%, credit: ~1.5–2.5%)

Revenue stream 2: [Subscription]
  Source: Monthly/annual fee per active account
  Formula: Active accounts × monthly fee
  Example: 5,000 SMB accounts × $49/month = $245K/month
  Assumption: Only count accounts active in last 30 days

Revenue stream 3: [Lending spread]
  Source: Interest on loans originated; borrow at [X]%, lend at [Y]%
  Formula: Average outstanding loan balance × net interest spread
  Example: $20M portfolio × 8% net spread = $1.6M/year
  Assumption: Net spread after cost of capital, defaults, and servicing
```

**Take rate analysis:**
```
Gross revenue: all revenue before paying partner banks, networks, third parties
Net revenue (take rate): what you keep after economics splits

Take rate calculation:
  Gross revenue: $X
  Less: interchange pass-through to bank partner: ($X)
  Less: card network fees: ($X)
  Less: BaaS platform fee: ($X)
  Net revenue (take rate): $X = [X]% of GMV

Benchmark take rates by category:
  Payments (SMB): 0.1–0.5% net of GMV
  B2B spend management: 0.3–1.0% net of GMV
  Consumer debit card: 0.05–0.2% net of GMV
  Lending: 3–8% net interest margin
  Wealth management: 0.25–1.0% AUM
```

---

### Step 2 — Unit Economics (all FISH levels)

**CAC (Customer Acquisition Cost):**
```
CAC = Total sales and marketing spend / New customers acquired

Blended CAC:
  Paid acquisition: [N customers] at $[X]/customer via [channel]
  Organic/referral: [N customers] at $0 direct cost (amortize content/brand spend)
  Blended: (total S&M spend) / (total new customers)

CAC benchmarks:
  Consumer fintech: $50–300 per account (higher with required KYC)
  SMB fintech: $500–3,000 per account
  Enterprise fintech: $5,000–50,000 per account

CAC payback period:
  Payback = CAC / Monthly net revenue per customer
  Example: CAC = $150, monthly net revenue = $12/customer → Payback = 12.5 months
  Benchmark: < 12 months (consumer), < 24 months (SMB)
```

**LTV (Lifetime Value):**
```
LTV = (Monthly net revenue per customer) / (Monthly churn rate)

Example:
  Monthly net revenue per customer = $12
  Monthly churn rate = 3%
  LTV = $12 / 0.03 = $400

LTV/CAC ratio:
  Healthy: > 3×
  Good: 3–5×
  Excellent: > 5×
  Warning: < 2× — unit economics don't work at scale

LTV/CAC = $400 / $150 = 2.7× (borderline — improve retention or reduce CAC)
```

**Customer cohort analysis:**
```
Month 0: Acquired 100 customers, $X GMV/customer, $Y revenue/customer
Month 1: 80% retained (churn: 20%), GMV grows X% due to engagement
Month 3: 65% retained, GMV stabilizes
Month 6: 55% retained, high-value segment identified
Month 12: 45% retained (survivors LTV higher than churn model predicted)

Insight: [What does cohort performance tell you about retention drivers?]
Action: [What product or go-to-market change does this recommend?]
```

---

### Step 3 — Cost Structure (Tuna, Salmon, Willy)

**Cost categories for fintech:**
| Category | Description | Monthly (Year 1) | Monthly (Year 3) |
|---|---|---|---|
| **COGS** | | | |
| BaaS platform fees | Per-account or revenue share to banking partner | $X | $X |
| Payment processing | Card network fees, ACH fees, wire fees | $X | $X |
| KYC/identity verification | Per-verification cost × new users | $X | $X |
| OFAC/compliance screening | Per-check cost (Persona, Socure, Alloy) | $X | $X |
| Fraud losses | Expected loss rate × GMV | $X | $X |
| **Gross margin** | Revenue minus COGS | $X ([X]%) | $X ([X]%) |
| **Operating Expenses** | | | |
| Engineering | Salaries + infrastructure + tooling | $X | $X |
| Compliance | Compliance officer, legal, audits, regulatory filings | $X | $X |
| G&A | Finance, HR, office, insurance, D&O | $X | $X |
| Sales & Marketing | CAC spend, content, partnerships | $X | $X |
| **Total Opex** | | $X | $X |
| **EBITDA** | Gross margin minus Opex | ($X) | $X |

**Compliance cost modeling (often underestimated):**
```
Year 1 compliance costs:
  Chief Compliance Officer: $150–250K fully loaded
  Legal counsel (external): $50–150K/year
  State MTL applications: $500K–$2M over 3 years (bonds, fees, legal)
  Annual audit (SOC 2, financial): $30–80K/year
  Regulatory reporting (SARs, CTRs): 0.5 FTE

Total Year 1 compliance: $300–600K
Total Year 2 compliance: $400–800K (as you expand states)
```

---

### Step 4 — Break-Even Analysis (all FISH levels)

```
Monthly fixed costs (Year 1): $[X]
Monthly gross margin per customer: $[Y]
Break-even customers: $X / $Y = [N] customers

Break-even GMV (for take-rate model):
  Monthly fixed costs: $X
  Net take rate: [Y]%
  Break-even GMV: $X / Y% = $[N]M/month GMV

Break-even timeline:
  Month 1: [N] customers at launch
  Month 6: [N] customers (projected at X% MoM growth)
  Month 12: [N] customers
  Break-even: Month [N] at [N] customers

Cash requirements to break-even:
  Cumulative losses before break-even: $[X]M
  Add working capital buffer (3–6 months costs): $[X]M
  Total cash needed: $[X]M
  This informs fundraise target.
```

---

### Step 5 — Scenario Modeling (Tuna, Salmon, Willy)

**Three-scenario model:**
| Metric | Bear | Base | Bull |
|---|---|---|---|
| **Key assumption** | Slower than expected growth + regulatory delay | Model assumptions hold | Faster growth + additional revenue stream unlocked |
| GMV growth (MoM) | 5% | 12% | 20% |
| CAC | $250 | $150 | $100 |
| Monthly churn | 6% | 3% | 1.5% |
| Net take rate | 0.15% | 0.25% | 0.40% |
| Time to break-even | 36 months | 22 months | 14 months |
| Cash needed | $8M | $5M | $3M |
| Year 3 ARR | $2M | $8M | $25M |

**Scenario trigger conditions:**
- **Bear**: User acquisition cost 2× higher than expected OR regulatory delay > 6 months
- **Base**: Model assumptions hold within ±20%
- **Bull**: Viral coefficient > 0.3 (organic growth compounds) AND additional revenue stream (e.g., lending on payment volume)

---

### Step 6 — Investor Metrics (Salmon, Willy)

**Key metrics investors track for fintech:**
| Metric | Your value | Benchmark |
|---|---|---|
| ARR (Annual Recurring Revenue) | $[X] | — |
| ARR growth rate (MoM) | [X]% | > 10% early stage |
| Net revenue (take rate) | $[X] ([X]% of GMV) | Varies by category |
| Gross margin | [X]% | > 50% at scale |
| LTV/CAC ratio | [X]× | > 3× |
| CAC payback | [X] months | < 18 months |
| Monthly churn | [X]% | < 3% (consumer), < 2% (SMB) |
| NDR (Net Dollar Retention) | [X]% | > 100% = expansion revenue |
| GMV / Revenue ratio | [X]× | Tells investors revenue quality |
| Regulatory capital adequacy | [X] | Varies by charter type |

**Fundraise narrative from model:**
```
"At [X]% monthly growth with [Y]% churn and $[Z] CAC, we break even at [N] customers in [M] months.
We are raising $[X]M to fund [N] months of operations to reach [milestone — e.g., break-even, Series A metrics].
Primary use: [X]% product, [X]% compliance/legal, [X]% growth."
```

---

### Step 7 — Sensitivity Analysis (Willy)

Test which assumptions most affect your outcome.

| Variable | -30% | -10% | Base | +10% | +30% |
|---|---|---|---|---|---|
| GMV growth rate | Break-even: Month X | Month X | Month 22 | Month X | Month X |
| Churn rate | Break-even: Month X | Month X | Month 22 | Month X | Month X |
| Take rate | Break-even: Month X | Month X | Month 22 | Month X | Month X |
| CAC | Break-even: Month X | Month X | Month 22 | Month X | Month X |

**Most sensitive variable**: [X] — a 10% change moves break-even by [Y] months. Focus operational excellence here.

---

### Final Output

**Revenue model** — per revenue stream with take rate calculation
**Unit economics** — CAC, LTV, payback period with benchmarks
**Cost structure** — COGS + Opex with compliance costs explicitly modeled (Tuna+)
**Break-even analysis** — customer count, GMV, timeline, cash required
**3-scenario model** — bear/base/bull with trigger conditions (Tuna+)
**Investor metrics** — ARR, gross margin, LTV/CAC, NDR (Salmon+)
**Sensitivity analysis** — most sensitive variables identified (Willy)
**Recommended next skill** — `/ds-fintech-product-compliance` — translate regulatory requirements into product architecture before building


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
