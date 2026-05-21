# Duble//Slash — Roadmap
_Generated: 2026-05-20 | FISH: Salmon | Method: Theme-based + OKRs + Dependency sequencing + Capacity planning_

---

## Themes

| Theme | What it unlocks |
|---|---|
| **Foundation** | // trigger working end-to-end, skills executable |
| **Content** | Skills registry populated across priority domains |
| **Visibility** | Shared memory + Reflectional UI (Kanban + Node Map) |
| **Growth** | Distribution, pricing validation, community |

---

## NOW (0–8 weeks)

| Item | Theme | Why now |
|---|---|---|
| **Technical spike: // intercept** — CGEventTap vs. Accessibility API vs. hotkey. Write DECISION-016 before desktop code. | Foundation | Blocks all desktop architecture. Week 1. |
| **Desktop app shell** — Electron or Tauri, // trigger works system-wide on macOS | Foundation | Nothing ships without this. Follows spike. |
| **5 Product skills live end-to-end** — customer-discovery, problem-framing, requirements-definition, solution-ideation, roadmap-design | Content | Dogfood-first. DS runs on DS. Proves the skills model. |
| **First-cohort: 10 beta users** — Tal's network, AI-adjacent, run 1 skill each | Growth | Pricing validation and skill picker UX both need human signal. |
| **Pricing validation** — close DECISION-003: does $12/mo BYOK convert? | Growth | Open decision blocking monetization. First-cohort provides signal. |

---

## NEXT (8–18 weeks)

| Item | Theme | Why next |
|---|---|---|
| **Skill picker UI** — role-based smart defaults, progressive disclosure | Foundation | Unblocked after beta reveals how users think about skills |
| **Engineering + Design domain skills** — 16 skills (8 per domain) | Content | Parallel to skill picker. DS-native IP skills first. |
| **Shared memory layer** — kanban.md + node-map.md persist across sessions, team-readable | Visibility | Depends on // trigger working. Enables Reflectional UI. |
| **Loop scheduler** — set-and-forget cron for skills, non-technical UX | Foundation | Core product promise after // trigger. Needs skill picker. |
| **Reflectional UI MVP** — web companion: Kanban + Node Map from shared memory | Visibility | Non-blocking for core; blocking for team-sale pitch. Shenhav drives design. |

---

## LATER (18+ weeks)

| Item | Theme | Trigger condition |
|---|---|---|
| **Community skill publishing** | Content | Marketplace model decided (open Q #3) |
| **Skills registry aggregation** — auto-surface from MCP/n8n/Pipedream/Zapier | Content | Engineering capacity post-beta |
| **Enterprise tier** — team permissions, compliance mode, shared workspace | Growth | 10+ enterprise pilots (Yonatan signal validates wedge) |
| **DS-native IP in production** — Approval gate, Human-in-the-Loop, Parallel fan-out hardened | Foundation | Enterprise tier unlocks |
| **Windows + Linux** | Foundation | macOS validated first |

---

## OKRs

**O1: Ship a working `//` to beta users**
- KR1: // intercept spike complete + ADR written by week 2
- KR2: Desktop shell running on macOS, 5 skills callable, by week 5
- KR3: 10 beta users have run at least 1 skill by week 8

**O2: Validate the monetization model**
- KR1: 5 of 10 beta users say yes to $12/mo BYOK (closes DECISION-003)
- KR2: Average beta user runs 3+ skills/week
- KR3: One beta user upgrades to team account

**O3: Establish skills registry as the product core**
- KR1: 3 domains fully populated — Product (done) + Engineering + Design
- KR2: All 24 skills across those domains executable end-to-end
- KR3: DS dogfoods 5 skills on its own roadmap

**O4: Make team AI usage legible**
- KR1: Reflectional UI renders Kanban + Node Map from live shared memory
- KR2: Zero manual user update required (zero-admin promise holds)
- KR3: One beta team cites the UI as reason they stayed

---

## Top 3 Dependencies

### DEP-1: // technical intercept — blocks all desktop architecture
- Risk: HIGH. CGEventTap + Apple sandboxing restrictions. Hotkey approach simpler but less seamless.
- Resolution: week 1 spike — 3 prototypes (one per approach), pick what works on macOS Sequoia without App Store restrictions. Write DECISION-016 before app code.
- Owner: Tal (or contracted engineer)

### DEP-2: Skill picker UX — blocks beta onboarding at scale
- Risk: MEDIUM. 2,600+ OSS skills overwhelms users. Raw catalog = bounce.
- Resolution: 5 first-cohort qualitative sessions (30 min each). Shenhav owns design, Tal provides JTBD frame. Role-based smart defaults + progressive reveal.
- Owner: Shenhav (design) + Tal (research)

### DEP-3: First-cohort acquisition — blocks all validation
- Risk: HIGH. Zero beta users = zero signal on pricing, skill picker, loop UX.
- Resolution: 10 contacts this week — criteria: use AI daily, real job, not AI tool founders. Personal outreach, not a landing page. 10 installs by week 4.
- Owner: Tal

---

## Capacity Reality Check

| Resource | Role | Throughput | Gap |
|---|---|---|---|
| Tal | Product, strategy, research, content | Full-time | No engineering |
| Shenhav | Expert design (UI, skill picker, Reflectional UI) | Part-time | Availability risk in NEXT phase |
| Claude Code | Execution: skills, memory, agent runs | Unlimited | Not a substitute for OS-level engineering |
| **Engineering** | Desktop shell, // intercept, loop scheduler | **ZERO** | **Critical gap — blocks NOW** |

**Critical gap:** No one owns the desktop shell. Three resolution paths:
1. Contract macOS engineer for 4–6 weeks (fastest)
2. Find a technical co-founder (slowest, highest upside)
3. Validate hotkey model first — drops engineering bar significantly

**Recommendation:** resolve DEP-1 this week. If hotkey works → short contract gets to beta. If CGEventTap required → technical co-founder is not optional. Name as DECISION-016.
