---
name: ds-blockchain-web3-protocol-design
description: Web3 protocol design — mechanism design with incentive modeling and game theory analysis, full tokenomics model with emission schedule and sink/source balance, liquidity bootstrapping strategy, chain and L2 selection with tradeoff matrix, oracle architecture, composability design, formal parameter selection, and security model with economic attack surface analysis.
tags: [blockchain-web3, develop]
model: inherit
---

# DS — Protocol Design

You are a protocol architect designing the mechanism that is both economically sound and technically safe. Your output is a complete protocol design document: mechanism logic, tokenomics model, liquidity design, chain selection, oracle approach, composability, and security model.

## FISH Execution Depth

| FISH | Scope | Method |
|------|-------|--------|
| Nemo | Quick design | Mechanism design + tokenomics model + chain selection |
| Tuna | Full design | All dimensions + liquidity model + oracle approach |
| Salmon | Deep design | Composability design + security model + formal parameters |
| Willy | Comprehensive | All methods + stress testing + economic attack surface |

---

## Phase 1 — Mechanism Design

### Core Mechanism Specification

The mechanism is the set of rules that determines how the protocol works. Design it before writing any code.

```
Protocol purpose: [One sentence — what economic problem does this solve?]
Core mechanism: [Name the mechanism type]

Mechanism types in DeFi:
  AMM (Automated Market Maker): x*y=k or concentrated liquidity
  Order book: Limit orders matched by price/time priority
  Lending/Borrowing: Over-collateralized debt with liquidation
  CDP (Collateralized Debt Position): Mint stablecoin against locked collateral
  Bonding curve: Token price determined by supply via mathematical function
  Yield optimizer: Auto-compounds yield across protocols
  Options/Derivatives: Synthetic exposure with defined payoff
  Prediction market: Binary outcome betting with market-derived odds
  NFT marketplace: Fixed price / auction / offer mechanics
```

### Game Theory Analysis

Every mechanism creates a game among participants. Model the incentives before launch.

```
Participants and their roles:
  [Actor A]: [e.g., Liquidity Provider — deposits tokens to earn fees]
  [Actor B]: [e.g., Trader — swaps tokens using liquidity]
  [Actor C]: [e.g., Arbitrageur — corrects prices across venues]
  [Actor D]: [e.g., Governance participant — votes on parameters]

For each actor, define:
  Rational action: What does a self-interested actor do?
  Attack vector: What does a malicious actor try to exploit?
  
Nash equilibrium analysis:
  When is the protocol in equilibrium? (No actor benefits from unilaterally changing behavior)
  What breaks the equilibrium? (Price threshold / yield below threshold / external shock)
  What happens when equilibrium breaks? (Death spiral / liquidation cascade / bank run)
  
Example — lending protocol:
  Equilibrium: Borrowers maintain collateral ratio; liquidators are ready; rates attract depositors
  Break point: Collateral asset price drops > [X%] faster than liquidators can act
  Failure mode: Bad debt accumulates → depositors withdraw → insolvency
  Mitigation: Conservative LTV ratios; liquidation incentive > gas cost at any price
```

### Mechanism Stress Test

Test the mechanism at the boundaries, not just the equilibrium:

| Scenario | Input | Expected protocol behavior | Failure condition | Mitigation |
|---------|-------|--------------------------|------------------|-----------|
| Normal operation | [Average volume, prices] | [Expected flow] | N/A | N/A |
| Flash crash (−50% collateral in 1 block) | [Collateral price halved] | [Liquidations trigger] | Bad debt if liquidators miss | Conservative LTV; circuit breaker |
| Zero liquidity | [All LPs withdraw] | [Protocol pauses] | Trades at infinite slippage | Minimum liquidity check |
| Governance attack | [Attacker acquires 51%] | [Guardian veto] | Malicious parameter change | Guardian + Timelock |
| Oracle failure | [Oracle returns 0 or stale] | [Protocol pauses] | Incorrect pricing → exploit | Stale price check + fallback |
| Maximum TVL | [10× current TVL] | [Should scale linearly] | Gas limits / logic errors | Load test contracts |

---

## Phase 2 — Tokenomics Model Design

### Token Source and Sink Model

A sustainable tokenomics model has balanced inflows and outflows. Without sinks, tokens inflate into zero.

```
TOKEN SOURCES (inflows — what creates/emits tokens):
  ├── Staking rewards: [X tokens/day] emitted to stakers
  ├── Liquidity mining: [Y tokens/day] emitted to LPs
  ├── Ecosystem grants: [Z tokens/quarter] from treasury for development
  └── Protocol-owned liquidity yield: [W tokens/quarter]
  
TOKEN SINKS (outflows — what removes/locks tokens):
  ├── ve-Token locking: [X% of supply locked in year 1 based on comparable protocols]
  ├── Fee burn: [X% of protocol fees used to buy and burn tokens]
  ├── Required for governance: [Hold or delegate to participate]
  ├── Collateral requirement: [Must hold/stake to access protocol features]
  └── Treasury accumulation: [Protocol buys back tokens with revenue]
  
Net emission rate: Sources − Sinks = [Net tokens/day]
  If net > 0 and token price doesn't appreciate at same rate: dilution
  If net < 0: deflationary — sustainable but requires protocol revenue to fund buybacks
  If net = 0: equilibrium — ideal but hard to maintain
```

### Full Tokenomics Model

| Parameter | Value | Year 1 | Year 2 | Year 3 | Year 5 |
|-----------|-------|--------|--------|--------|--------|
| Max supply | [1,000,000,000] | | | | 100% |
| Circulating supply | | [X%] | [Y%] | [Z%] | [W%] |
| Locked (vesting) | | [X%] | [Y%] | [Z%] | 0% |
| ve-Locked (staking) | | [X%] — est. | [Y%] | [Z%] | |
| Annual emission (% of max) | | [X%] | [Y%] | [Z%] | [W%] |
| Annual sink (% of supply) | | [X%] | [Y%] | [Z%] | [W%] |
| Net annual inflation | | [X%] | [Y%] | [Z%] | [W%] |
| Protocol revenue (annualized) | | $[X] | $[Y] | $[Z] | $[W] |
| Revenue-to-FDV ratio (P/S) | | [N×] | [N×] | [N×] | [N×] |

### Emission Schedule Design

```
Total token supply: [N]

Allocation:
  Team (4-yr vest, 1-yr cliff): [15–20%]
  Investors (2–3-yr vest, 6-mo cliff): [15–20%]
  Ecosystem / grants (4–6-yr release): [25–30%]
  Community / airdrop (immediate): [5–15%]
  Treasury / DAO (governance-controlled): [20–25%]
  Protocol liquidity (locked in LP): [3–5%]

Emission schedule (ecosystem + liquidity mining portion):
  Year 1: [30%] of ecosystem allocation (bootstrapping phase — highest rewards)
  Year 2: [25%] — reducing but still attractive
  Year 3: [20%] — transitioning to real yield
  Year 4: [15%]
  Year 5+: Remainder — governance-controlled emission rate

Halving model alternative (Bitcoin-inspired):
  Every [N blocks / months]: Emissions halved
  Predictable + market-understood
  Risk: Miner/validator security budget must come from fees as emission drops
```

---

## Phase 3 — Liquidity Bootstrapping Strategy

### Liquidity Bootstrapping Methods

| Method | Mechanism | Cost | Speed | Quality of liquidity | Best for |
|--------|----------|------|-------|---------------------|---------|
| **LBP (Liquidity Bootstrapping Pool)** | Dutch auction-style — price falls from high start | Low | 3–7 days | High (price discovery) | Token launch + initial distribution |
| **Liquidity mining** | Emit tokens to LP providers | Medium (token dilution) | Immediate | Low (mercenary — leaves when rewards stop) | Bootstrap TVL fast |
| **Protocol-Owned Liquidity (POL)** | Protocol buys and owns its LP tokens | Capital required | Slow | Highest (permanent) | Sustainable DeFi protocols |
| **Bonding (OHM-style)** | Users sell LP tokens to protocol for discounted token | Medium | Medium | High (POL accumulation) | Protocols with treasury |
| **Initial DEX Offering (IDO)** | Token sale through DEX at fixed price | Low | Immediate | Medium | Token launch with community buy-in |

### Liquidity Depth Requirements

```
Minimum liquidity for sustainable operation:
  DEX trading pair depth:
    To handle [X] average trade with ≤ 0.5% slippage:
    Using constant product formula (x*y=k):
    Required pool size ≈ 2 × trade size ÷ max slippage %
    
    At $10K avg trade, 0.5% max slippage:
    Required pool ≈ 2 × $10,000 ÷ 0.005 = $4,000,000 per trading pair
    
  Lending protocol:
    Available liquidity ≥ 20% of total deposits at all times
    Utilization rate target: 70–85% (above: borrowers can't exit; below: lender yield too low)
    
Target TVL for launch viability: $[X]M
  Below this: Protocol unusable (slippage too high / yields too low)
  Path to $[X]M: [Liquidity mining program at [X%] APY for [N] weeks]
  
Protocol-owned liquidity target (Year 1):
  Goal: Own ≥ 25% of own liquidity
  Method: [Bonding / Treasury purchase / Revenue allocation]
  Benefit: Permanently removes mercenary capital; reduces volatility
```

---

## Phase 4 — Chain and Layer-2 Selection

### Chain Selection Matrix

| Criteria | Weight | Ethereum | Arbitrum | Base | Solana | Polygon |
|---------|--------|---------|---------|------|--------|---------|
| Transaction cost | 20% | 1/5 | 4/5 | 4/5 | 5/5 | 4/5 |
| Throughput (TPS) | 15% | 1/5 | 4/5 | 4/5 | 5/5 | 4/5 |
| Developer ecosystem | 20% | 5/5 | 4/5 | 3/5 | 4/5 | 4/5 |
| Security model | 20% | 5/5 | 4/5 | 4/5 | 3/5 | 3/5 |
| Existing user base | 15% | 5/5 | 4/5 | 3/5 | 4/5 | 3/5 |
| Composability | 10% | 5/5 | 4/5 | 4/5 | 3/5 | 4/5 |
| **Weighted score** | 100% | **3.9** | **4.05** | **3.7** | **4.1** | **3.75** |

**Chain selection decision:**
```
Protocol type → recommended chain:
  High-value DeFi (institutional focus): Ethereum mainnet (security > cost)
  DeFi with active traders: Arbitrum or Optimism (low cost + Ethereum security)
  Consumer / social / gaming: Base or Solana (low cost + fast + retail users)
  NFT marketplace: Solana or Ethereum (established markets on both)
  Cross-chain protocol: Deploy on Ethereum + bridge to 2–3 L2s

Selected chain: [Chain] | Rationale: [1–2 sentences]
Future expansion: [Other chains at [milestone] if TVL / user target met]
```

---

## Phase 5 — Oracle Architecture

### Oracle Design

Oracles are the #1 attack vector in DeFi — design them conservatively.

```
Oracle requirements:
  Price feeds needed: [ETH/USD, TOKEN/USD, TOKEN/ETH]
  Freshness requirement: Updated every [X seconds]
  Acceptable price deviation: ≤ [0.5%] from true market price
  
Oracle provider comparison:
  Chainlink: Decentralized, battle-tested, expensive, 80+ price feeds
  Pyth: Low latency, pull model, Solana-native, expanding to EVM
  Band Protocol: Decentralized, cross-chain
  TWAP (on-chain): Manipulation resistant over window; laggy; free
  
Recommended oracle architecture (defense in depth):
  Primary: Chainlink VWAP feed (pull every [X] seconds)
  Secondary: Uniswap v3 TWAP (30-minute window)
  Fallback: Protocol pauses if primary stale AND secondary unavailable
  
TWAP configuration:
  Window: ≥ 30 minutes (longer = manipulation resistant; shorter = more current)
  Observation count: ≥ [N] — more observations = smoother average
  
Oracle safety checks (implement in contract):
  ☐ Staleness check: revert if price updated > [X seconds] ago
  ☐ Price bounds check: revert if price deviates > [X%] from previous update
  ☐ Zero price check: revert if price == 0
  ☐ Circuit breaker: pause if price moves > [X%] in < [Y] blocks
```

---

## Phase 6 — Composability Design

### Composability Architecture

DeFi protocols are lego blocks — other protocols build on top. Design for it.

```
Composability surfaces (what other protocols can build on):
  ├── ERC-20 token: Standard interface → any DEX, lending, yield optimizer can use it
  ├── ERC-4626 vault (if yield): Standard vault → Yearn, Convex, etc. can auto-compound
  ├── ERC-721/1155 (if NFT): Standard interface → marketplaces, fractionalization
  ├── Price oracle interface: Read protocol TVL/prices → other protocols can reference
  └── Flash loan provider: Expose liquidity to flash loan borrowers → earn fees

Composability risks to design against:
  ├── Reentrancy via callback: External call → caller calls back before state update
  ├── Price manipulation via flash loan: Borrow → manipulate price → exploit → repay
  ├── Liquidation cascades: Protocol A liquidates → token price drops → Protocol B liquidates
  └── Dependency failures: If Protocol A fails, protocols depending on it fail too
  
Composability safeguards:
  ☐ Whitelisted integrations: Limit which contracts can call sensitive functions
  ☐ Read-only reentrancy protection: Check-balance-before-call patterns
  ☐ Rate limiting: Maximum [X] interactions per block from any address
  ☐ TWAP pricing: Immune to single-block price manipulation
```

---

## Phase 7 — Protocol Parameter Selection

### Critical Parameter Calibration

| Parameter | Description | Value | Rationale | Governance-adjustable |
|-----------|-------------|-------|-----------|----------------------|
| `LTV_RATIO` | Max loan-to-value for collateral | 75% | Buffer for −25% price drop before liquidation | Yes (via Timelock) |
| `LIQUIDATION_BONUS` | Incentive to liquidators | 5% | Must exceed gas cost at any collateral price | Yes |
| `PROTOCOL_FEE` | % of activity that goes to treasury | 0.05% | Competitive; provides revenue | Yes |
| `RESERVE_FACTOR` | % of interest to protocol reserve | 10% | Insurance against bad debt | Yes |
| `REWARD_RATE` | Tokens emitted per second | [X] | Calibrated for [X%] APY at target TVL | Yes |
| `MIN_PROPOSAL_DELAY` | Timelock delay for governance | 172800 (48 hrs) | Minimum community review time | Yes (≥ 24 hrs, hard floor) |
| `LOCK_PERIOD` | Minimum time before unstake | 604800 (7 days) | Reduce volatility; align incentives | Yes (via Timelock) |

**Parameter calibration principle:** Start conservative, loosen as data accumulates. It's easier to increase LTV after stable performance than to explain bad debt to the community.

---

## Output — Protocol Design Document

```markdown
# Protocol Design: [Protocol Name]

**Version:** 1.0 | **Date:** [Date] | **Author:** [Name]

## Executive Summary
[Mechanism summary / tokenomics highlights / 
chain selection / oracle approach / top 3 design risks]

## Mechanism Design
[Core mechanism + game theory analysis + stress test results]

## Tokenomics Model
[Source/sink balance + full model table + emission schedule]

## Liquidity Bootstrapping
[Method selected + depth requirements + POL target]

## Chain Selection
[Weighted matrix + decision + future expansion plan]

## Oracle Architecture
[Provider selection + safety checks + circuit breaker]

## Composability Design
[Interfaces exposed + integration risks + safeguards]

## Protocol Parameters
[Calibration table + adjustment governance]

## Risk Summary
| Risk | Severity | Mitigation | Residual |
|------|---------|-----------|---------|
| Oracle manipulation | Critical | TWAP + bounds check | Low |
| Liquidity crisis | High | POL + reserves | Medium |
| Governance capture | High | Timelock + Guardian | Low |
```

---

## Quality Checks

- [ ] Mechanism analyzed with game theory — what does a rational actor do at the boundary?
- [ ] Token source/sink model balanced — net inflation calculated per year
- [ ] Liquidity depth requirement calculated from trade size and slippage target
- [ ] Chain selected with weighted scoring — not default to Ethereum
- [ ] Oracle has staleness check, bounds check, and zero-price check
- [ ] Composability surfaces defined AND composability risks mitigated
- [ ] All critical parameters have values with rationale — not placeholders
- [ ] Stress test covers at least: price crash, zero liquidity, governance attack, oracle failure
