---
analyst: Mary
date: 2026-04-26
artifact_reviewed: planning/pitch-decks/pitch-deck-duble-slash-v2.md
upstream: _bmad/brainstorming/brainstorming-session-2026-04-26-1615-competitive-landscape.md
status: review-complete · handoff-pending → bmad-domain-research
---

# Analyst Review — Duble//Slash Seed Deck v2

*Treasure map filed. Three pinholes worth Tal's attention before this deck leaves the room.*

---

## §1 · Competitive matrix — slide 11

### Axes audit

Six of the eight dimensions are buyer-relevant and externally legible. **Two are self-flattering and a sharp partner will catch it:**

- **"Archetype-aware"** — this is a Duble//Slash invented vocabulary. Of course no one else has it. **Swap for "Reverse / loopback handoffs"** — a real workflow capability where Build can return to Solidify with a structured contract conflict. That dimension is genuinely differentiating *and* externally legible (BMAD, Copilot, Linear-AI all assume forward-only flow).
- **"Trust receipts"** — too narrow as a column header; reads like a feature name. **Reframe as "Audit trail / accountability surface"** — same content, but it scans as a buyer-evaluation criterion rather than a marketing artifact.

### Per-cell scoring corrections

| Cell | Current | Recommended | Why |
|---|---|---|---|
| BMAD · Method layer | ✓ | ✓ (keep) | Defensible — they have explicit phase agents |
| Copilot Workspaces · Trust receipts | ◐ | ✗ | Audit logs ≠ signed receipts. Downgrade. |
| Mem.ai · Cross-tool capture | ◐ | ✗ | Mem ingests from connectors, not from active AI sessions across Claude/Cursor. |
| **Duble//Slash · Method layer** | ✓ | ◐ at OSS launch · ✓ at V1 | At launch, FLOW lives in `CLAUDE.md` paste. Be honest about timeline — investors reward founders who don't overclaim. |

### Missing competitors a sharp VC will name

The single biggest gap: **Claude Skills / Anthropic's agent framework** (released late 2025, expanding through 2026). This is *architectural* competition — Anthropic is moving into the layer Duble//Slash claims. **Add a row.** Pre-empt with: tool-bound, no cross-tool surface, no method layer, single-vendor lock-in.

Also worth a mention (compress into row groupings):
- **Cline · Aider · Continue.dev** — group as "in-IDE coding agents." All ✗ on cross-tool, designer-shaped, multiplayer.
- **Devin · Replit Agent** — group as "autonomous engineers." Different category but VCs will name. Worth a one-line callout *outside* the matrix to acknowledge category orthogonality.

**Suggested matrix shape:** 9 competitors × 8 dimensions (drop one less-essential row if width hurts), with Claude Skills replacing or joining Mem.ai/Granola depending on Tal's preference.

---

## §2 · Pain → payoff numbers — slide 10

### What's anchored vs. plausible

| Pain row | Anchor strength | Source to cite |
|---|---|---|
| "Don't know where I am" — 5 hrs/wk | **Anchored** | Atlassian *State of Teams 2024*: knowledge workers spend ~25% of week locating information. 5h is conservative. |
| "Don't trust this is saved" — 2-4 hrs × 3/mo | Vibes | No direct study. Soften to "lost-session rework, frequency varies." |
| "AI doesn't guide me" — 3-day rework cycles | Vibes | DORA measures rework time but not AI-induced specifically. Reframe as "rework loops" without the "3-day" specificity. |
| "No UX instinct" — 3-week pivots | Vibes | Cite Marty Cagan / SVPG product-discovery rework data instead. |
| "Switching tools" — 40 min/day | Plausible, partial anchor | Stack Overflow 2025: 45% of devs say AI debugging takes longer. Adjacent. **Run a 5-person founder-network time study** — even N=5 is more anchored than the assertion. |
| "Can't see project" — 5 hrs/wk standups | **Anchored** | Microsoft *Work Trend Index 2024*: 59% of meeting time unproductive; ~2hrs/day in meetings. |
| "No history of who decided" | Qualitative — leave qualitative | Don't put a fake number on it. |

### Bottom line — $180k/yr for 10-person team

The *math* holds ($125/hr blended × 120 hrs/mo × 12 = $180k). The **inputs are partially anchored.** A sharp partner will ask "where does the 120 land?" — currently it's a sum of plausibles. Two fixes:

1. **Forrester Total Economic Impact (TEI) format** — pick 3 anchored rows, show calc explicitly, give a *low / expected / high* range ($90k / $180k / $260k). Investors trust ranges over point estimates.
2. **Anchor sources to add to the deck appendix:** Atlassian *State of Teams 2024*, Microsoft *Work Trend Index 2024*, McKinsey *Global Institute · The Social Economy*, DORA *Accelerate State of DevOps 2024*, IDC *Worldwide AI Software Forecast 2025*, Faros AI *2025 Engineering Benchmarks*.

---

## §3 · Deck-level readout

### Top 3 strengths an investor will take seriously

1. **Insight legibility** — "AI is everywhere and nowhere" passes the Sequoia "what's the insight only you have" test. Few seed decks land this cleanly.
2. **Velocity proof** — 49 commits / 6 days / 2 founders / 43 skills / 24K lines of public spec. *Pre-fundraise execution at this pace is the rarest signal in the deck.*
3. **Strategic-position framing** — "Anthropic/Cursor each defend a tool, can't take the between-tool position" is a real wedge insight, not moat-LARP.

### Top 3 weaknesses a sharp partner will poke

1. **"Won't Anthropic build this?"** — every cross-tool play meets this. Pre-empt: (a) Anthropic's incentive is to deepen Claude lock-in, not graceful tool exit; (b) cross-tool requires integration with competitors Anthropic won't court; (c) historical analogy — Salesforce didn't build Snowflake.
2. **No design partners with logos** — "39 in conversations" is talking-stage. **Reframe:** OSS launch *is* the design-partner program. Set a target — *"10 engaged repos in the first 30 days = our pilot cohort."* Concrete is more credible than aspirational.
3. **TAM not sized for the runtime layer specifically** — 84% AI adoption ≠ addressable runtime market. Need a slide-12 calc: *teams running 3+ AI tools × seat count × $12/seat × team-mode adoption rate.* Even bottoms-up to ~$2-4B serviceable is fine; without it the market slide is throat-clearing.

### The single "but does this work?" question

**"What stops a customer from forking the OSS operators, capturing handoffs in their own scripts, and never paying you?"**

**Answer on the spot:** *"The operators emit text. Making that text move across tools requires Relay (sync + offline-tolerance + conflict resolution), Cipher (redaction enforced before exfil), Beacon (team-graph routing), Pack (ephemeral context bundling), and the desktop app (the legible team UI). Each is a real product. A team can roll their own — 99% won't, the 1% that do are proof of reach, not lost revenue. The methodology is the channel; the runtime is the product."*

---

## Handoff to `bmad-domain-research`

Two evidence-population workstreams, both for slide-11 and slide-10:

### A · Competitor evidence (as of 2026-04)
For each row in the matrix, pull current product-capability evidence and cite source:
- **Claude Projects** — feature page on anthropic.com, dev docs. Confirm: project context scope, multi-tool reach, audit surface.
- **Cursor Rules** — cursor.sh docs. Confirm: per-repo scope, tool boundary, team-graph absence.
- **ChatGPT Projects** — openai.com help pages. Confirm: GPT context scope, no cross-tool surface.
- **BMAD** — github.com/BMAD-METHOD repo state, latest release notes, agent count, IDE bindings.
- **Copilot Workspaces** — github.com/features/copilot-workspaces docs. Confirm phase model, audit log capability.
- **Mem.ai · Granola** — feature pages. Confirm capture sources (especially: do they capture *active AI session content* or only meetings/documents?).
- **Linear AI · Notion AI** — product changelogs 2025-2026. Confirm process-layer absence + multiplayer story.
- **Claude Skills** — Anthropic's skills/agents framework as of 2026-04. **Add this row.**

### B · Pain-payoff anchor data (priority order)
1. Atlassian *State of Teams 2024* — knowledge worker context-hunt time
2. Microsoft *Work Trend Index 2024* — meeting / async standup time
3. McKinsey *Global Institute · The Social Economy* — knowledge work breakdown
4. Faros AI *2025 Engineering Benchmarks* — AI-adoption review-time deltas
5. DORA *Accelerate 2024* — throughput / stability with AI
6. IDC *AI Productivity Forecast 2025* — enterprise AI ROI ranges
7. Stack Overflow *Developer Survey 2025* — adoption + frustration patterns

Output as `_bmad/research/domain-research-competitive-evidence-2026-04.md` so Tal can paste citations directly into the deck appendix and slide footers.

*— Mary*
