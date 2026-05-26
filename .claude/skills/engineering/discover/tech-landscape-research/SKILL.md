---
name: ds-engineering-tech-landscape-research
description: Surveys the technology landscape for a problem space — frameworks, libraries, tools, and trade-offs. Use when starting a new project, choosing a stack, evaluating options, or asking "what technology should we use". Also triggers on: framework comparison, build-vs-buy analysis, OSS ecosystem scan, TRL assessment, ADR for tech decisions, 3-year TCO comparison.
tags: [engineering, discover, tech-landscape, build-vs-buy, adr, tco]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: discover
---

# Tech Landscape Research
**Domain**: Engineering | **Phase**: Discover | **Invocation**: `/ds-engineering-tech-landscape-research`

## What this produces
A technology decision package: scored options matrix, build/buy/OSS recommendation, ecosystem health signals, TCO comparison, ADR ready to commit, and the top 3 risks with mitigations.

## Methods
Framework comparison, build-vs-buy analysis, OSS ecosystem scan, community health assessment, TRL (Technology Readiness Level) assessment, license review, 3-year TCO model, dependency risk assessment, vendor lock-in analysis, technology radar mapping, performance benchmarking, ADR authoring

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick comparison | Top 3 options scored + build/buy recommendation + ADR stub |
| Tuna | Full evaluation | Scoring matrix + ecosystem health + license + TCO sketch |
| Salmon | Deep landscape | All above + TRL + vendor lock-in + full ADR + risk register |
| Willy | Portfolio view | All methods + technology radar mapping + full TCO + committee-ready ADR |

---

## Execution Prompt

Read the project context: what problem requires a technology decision, current stack, team skills, scale requirements, budget constraints, timeline. FISH classification determines research depth.

---

### Step 1 — Scope the Decision (all FISH levels)

Before evaluating options, define the decision clearly.

```
Decision: [one sentence — what technology choice is being made]
Constraints:
  - Team skills: [what the team already knows]
  - Scale: [current users, expected 12-month, expected 3-year]
  - Timeline: [when this needs to be decided and shipped]
  - Budget: [licensing, infrastructure, implementation cost ceiling]
  - Compliance: [any regulatory or security requirements that gate options]
Non-negotiables: [requirements that eliminate options regardless of other factors]
```

List 3–6 candidate options. If there are > 6 plausible options, pre-filter to the strongest contenders before scoring. Explain the pre-filter criteria.

---

### Step 2 — Build / Buy / OSS Decision (all FISH levels)

Before scoring specific tools, answer the structural question: should we build, buy, or use OSS?

**Build when:**
- The problem is core to your competitive advantage
- Existing options require 50%+ customization to fit
- You need full data sovereignty or compliance control
- No viable option exists at your scale

**Buy (SaaS/vendor) when:**
- The problem is not differentiated (auth, payments, email)
- TCO of build > 2× the vendor cost over 3 years
- The vendor solves compliance requirements out of the box
- Speed to market is the primary constraint

**OSS when:**
- A mature project solves 80%+ of the need
- The team has capacity to own and maintain the dependency
- The license is compatible with your distribution model
- Community is active (commits in last 90 days, issues resolved)

**State the structural decision first.** Only if Buy or OSS is chosen do you proceed to tool scoring.

---

### Step 3 — Scoring Matrix (all FISH levels)

Score each option against weighted criteria. Weights must sum to 100.

| Criterion | Weight | [Option A] | [Option B] | [Option C] | [Option D] |
|---|---|---|---|---|---|
| Technical fit | 30% | /10 | /10 | /10 | /10 |
| Team skill match | 20% | /10 | /10 | /10 | /10 |
| Ecosystem maturity | 15% | /10 | /10 | /10 | /10 |
| License compatibility | 10% | /10 | /10 | /10 | /10 |
| Vendor/project risk | 15% | /10 | /10 | /10 | /10 |
| Total cost (3-year) | 10% | /10 | /10 | /10 | /10 |
| **Weighted total** | 100% | **X.X** | **X.X** | **X.X** | **X.X** |

**Scoring rules:**
- Score every option honestly — a table where one option wins 10/10 on everything is not an evaluation
- If a non-negotiable constraint eliminates an option, mark it "ELIMINATED" and explain
- Two options within 0.5 weighted score = too close to call on score alone — go deeper on the tiebreaker

---

### Step 4 — Ecosystem Health Assessment (Tuna, Salmon, Willy)

For each OSS candidate:

| Signal | [Option A] | [Option B] | Notes |
|---|---|---|---|
| GitHub stars | | | Relative, not absolute |
| Commits (last 90 days) | | | Activity proxy |
| Open issues / PRs | | | Responsiveness |
| Contributors (active) | | | Bus factor proxy |
| Last release | | | < 6 months = active |
| StackOverflow questions | | | Community size |
| Corporate backing | | | Sustainability signal |
| License | MIT/Apache/GPL/other | | |

**Ecosystem health red flags:**
- Last commit > 12 months
- No response to issues > 30 days
- Single maintainer, no corporate backer
- License changed to non-OSS (e.g., BSL, SSPL)
- < 5 contributors in last 12 months

For any red flag: state whether this is a disqualifier or a risk to accept.

---

### Step 5 — TRL Assessment (Salmon, Willy)

Technology Readiness Level (TRL 1–9) for any novel or emerging technology in consideration.

| TRL | Level | Meaning |
|---|---|---|
| 1–2 | Research | Basic principles observed, concept formulated |
| 3–4 | Proof of Concept | PoC demonstrated in lab / experimental environment |
| 5–6 | Pilot | Technology validated in relevant environment |
| 7 | Pre-production | Prototype demonstrated in operational environment |
| 8 | Production-ready | System complete and qualified |
| 9 | Proven | Mission-proven in operational environment |

**Rule**: production systems should not depend on technology below TRL 7 unless the risk is explicitly accepted and a fallback is documented.

For any TRL < 7 option:
- What is the fallback if it doesn't mature?
- What is the team's plan to move it up the TRL ladder?
- What is the acceptable risk window?

---

### Step 6 — 3-Year TCO Comparison (Tuna, Salmon, Willy)

Total Cost of Ownership. Include all cost categories — most teams undercount implementation and maintenance.

| Cost Category | [Option A] | [Option B] | Notes |
|---|---|---|---|
| **Implementation** | $X | $X | Engineering time to integrate |
| **Licensing / SaaS fees** | $X/yr | $X/yr | At current scale |
| **Infrastructure** | $X/yr | $X/yr | Hosting, compute, storage |
| **Maintenance** | $X/yr | $X/yr | Upgrades, support, oncall |
| **Training** | $X | $X | Team skill ramp |
| **Migration exit cost** | $X | $X | Cost to switch away in 3 years |
| **3-year total** | **$X** | **$X** | |

**TCO interpretation:**
- If Build TCO < Buy × 0.5: strong case for build
- If Build TCO > Buy × 1.5: strong case for buy
- Between: weight competitive differentiation

---

### Step 7 — Vendor Lock-in Analysis (Salmon, Willy)

For each vendor or cloud-native option:

| Lock-in Factor | [Option A] | [Option B] |
|---|---|---|
| Proprietary API (hard to replace) | Y/N | Y/N |
| Data portability (export to standard formats) | Y/N | Y/N |
| Migration effort if switching (days) | X | X |
| Alternatives if vendor shuts down | [list] | [list] |
| Contract exit terms | [terms] | [terms] |

**Lock-in levels:**
- **Low** — standard APIs, data exportable, alternatives exist, migration < 1 week
- **Medium** — some proprietary integration, migration 1–4 weeks
- **High** — deep integration, data format proprietary, migration > 1 month

High lock-in requires explicit stakeholder sign-off. Name the person who accepts this risk.

---

### Step 8 — ADR (Architecture Decision Record) (all FISH levels)

Produce a commit-ready ADR regardless of FISH level. The ADR is the artifact that prevents this decision from being relitigated.

```markdown
# ADR-[NNN]: [Title — the decision in one line]

## Status
Proposed / Accepted / Superseded

## Date
[YYYY-MM-DD]

## Context
[The problem or question that required a decision. What constraints were in play.]

## Decision
[What was decided, stated as an action: "We will use X for Y."]

## Options Considered
1. [Option A] — [why not chosen]
2. [Option B] — [why not chosen]
3. [Selected option] — [why chosen]

## Consequences
Positive:
- [Benefit 1]
- [Benefit 2]

Negative:
- [Trade-off 1 accepted]
- [Risk 1 and how it's mitigated]

## Review Date
[Date to revisit this decision — typically 6–12 months]
```

---

### Final Output

**Decision scope** — constraints, non-negotiables, candidate options
**Build/Buy/OSS recommendation** — structural decision with rationale
**Scoring matrix** — weighted criteria, all options scored, winner identified
**Ecosystem health assessment** — signals, red flags, disqualifiers (Tuna+)
**TRL assessment** — for any emerging technology (Salmon+)
**3-year TCO comparison** — full cost breakdown per option (Tuna+)
**Vendor lock-in analysis** — with migration cost and exit terms (Salmon+)
**ADR** — commit-ready, status Proposed, review date set
**Recommended next skill** — `/ds-engineering-technical-spec` or `/ds-engineering-architecture-design` with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
