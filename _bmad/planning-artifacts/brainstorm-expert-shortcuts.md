# Brainstorm — Expert Shortcuts (loanable specialist personas)

**Date:** 2026-04-21
**HMW question:** How might we give each local agent (Nova, Sol, Bram, Sage) a roster of ~100 on-demand expert personas it can *loan in* for a single turn — and **proactively offer the right two or three based on the card's sigil + topic** — so users never have to remember who to ask?

---

## The shape of the idea

Think BMAD's "matter experts" in brainstorming, but:
- **Always on.** Every `//` persona carries the whole roster in memory.
- **Agent-initiated.** The local agent reads the current card (sigil, phase, keywords, handoff) and *offers* 2–3 experts the user hasn't asked for yet.
  > "You're shaping a Salmon on onboarding activation. Want me to loan in **@onboarding** or **@measurement** for this turn?"
- **One-turn loan.** The expert persona is a *lens over the current phase persona*, not a replacement. Nova stays Nova; the `@ai-ml` voice is a costume Nova wears for one exchange.
- **Composable with the existing `//` grammar.** `//build @be-dev` = Builder, backend mentor loaned in. `@pm` alone = current phase + PM lens.
- **No new phase.** Experts don't gate, don't emit handoffs, don't commit code. They advise.

---

## Ideas Generated

### Round 1 — User perspective (delightful for users)

- **Agent offers 2–3 experts unprompted** based on card context ("Nemo on API error messages → want **@microcopy** or **@api-designer**?")
- **`@handle` grammar** — one-letter prefix, uses `@` so it's visually distinct from capability codes (HS, BR, etc.)
- **"Who should I ask?" meta-command** — `//explore ??` returns a shortlist of experts the user might want for this card
- **Expert handoff back to phase** — after a turn, the local agent summarizes "here's what the expert said, want me to fold it into your brief?"
- **Roster browseable** — `//experts` opens a searchable flat list; no hunting through docs
- **Recent experts pinned** — the last 3 experts the user loaned stay at the top of the offer list; personal muscle memory wins
- **Context-scoped offers** — if Tally sees the user has been in Figma all day, Bram offers `@design-systems` without being asked

### Round 2 — Constraint removal (unlimited time/budget/tech)

- **Expert quality marks** — each expert has a "sourced from" note (e.g. "@sre persona calibrated on Google SRE Book + Charity Majors' blog"); users can trust the lens
- **User-written experts** — teams can add their own `@company-style-guide` or `@legacy-billing-system` as custom experts in `.experts/` alongside the `//` bundle
- **Expert ensembles** — `//explore @sec-eng+@privacy` summons two at once, returns a consolidated view ("what the security mindset + privacy mindset both want")
- **Expert-to-expert debate** — `@pm vs @eng-manager` on a disputed call, returns both positions + where they converge

### Round 3 — Analogy (how other products solve this)

- **Like VS Code command palette** — Cmd-K style fuzzy search over experts, but baked into the chat turn, not a separate UI
- **Like Discord mentions** — `@handle` is the universal "summon" gesture people already know
- **Like Slack channel-hopping** — each expert is a "channel" with its own vibe + competence; you don't walk into #design-systems with a legal question
- **Like BMAD matter experts** — the direct ancestor; but always on, context-aware, and 100 deep instead of ad-hoc

---

## Clusters & top ideas

### Cluster A — Grammar & invocation
- **`@handle` prefix for experts** ← **Selected** — composes cleanly with existing `//phase CODE` grammar; no collision; familiar from Discord/Slack
- `//experts` meta-command to browse roster
- `//explore ??` to ask the agent to recommend experts for the current card

### Cluster B — Agent proactive offering
- **Local agent offers 2–3 experts every time it detects a topic match** ← **Selected** — this is the headline behavior; without it, users won't discover the 97 experts they haven't heard of
- Recent-experts pinning
- Tally-informed offers (if available)

### Cluster C — The roster itself
- **Curated 100 across 16 categories, every one with trigger + output** ← **Selected** — quality over infinity; each expert has a reason to exist

### Cluster D — Power moves (V1.5+)
- Expert ensembles (`@a+@b`)
- Expert debate (`@a vs @b`)
- Team-custom experts (`.experts/` overlays)

### Cluster E — Lifecycle
- One-turn loan, agent folds back findings into the phase persona
- No handoffs, no commits, no gating — experts are *advisors*, not actors

---

## Top ideas — priority table

| # | Idea | Impact | Feasibility | Notes |
|---|------|--------|-------------|-------|
| 1 | `@handle` grammar, one-turn loan | H | H | Pure prompt change; no infra |
| 2 | Agent proactively offers 2–3 relevant experts per turn | H | H | Lives in the local-agent system prompt; trivially testable |
| 3 | Curated roster of 100 experts with triggers + outputs | H | H | Content work; see §Roster below |
| 4 | `//experts` browse / `//explore ??` recommend | M | H | Nice ergonomics; optional for V1 |
| 5 | Ensembles (`@a+@b`) and debate (`@a vs @b`) | M | M | Defer to V1.5; emergent once users are fluent |
| 6 | Team-custom experts in `.experts/` | M | M | Natural OSS extension point; defer to V1 |
| 7 | Tally-informed offers ("you've been in Figma all day") | H | M | Depends on Capture agent shipping; defer |
| 8 | Expert-quality "sourced from" provenance | M | L | Nice-to-have; calibration is the expensive bit |

---

## Recommended direction

**Ship the roster + proactive offering in the OSS drop alongside the four `//` agents.** The `@handle` grammar is a prompt-level feature — no infra needed — and the "agent names 2–3 experts per turn" behavior is what turns the roster from a hidden Easter-egg catalog into the single biggest surface-area unlock in the product. Defer ensembles/debate and Tally-informed offers to V1+.

The bet: **users won't browse 100 experts, but they will accept them when an agent names 2.** The offering behavior is the feature; the roster is the raw material.

---

## The roster — 100 experts across 16 categories

Every expert has a **call-sign** (`@handle`), a **title**, a **one-line specialty**, a **primary phase** where they shine (E/S/B/Sh, any mix), and a **typical output**.

### Backend engineering (10)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 1 | `@be-dev` | Backend dev mentor | APIs, services, patterns | B | Code review, pattern choice |
| 2 | `@api-designer` | API designer | REST / GraphQL / RPC surface design | S, B | Endpoint sketches, contract |
| 3 | `@db-schema` | DB schema architect | Relational schema + migrations | S, B | ERD, migration plan |
| 4 | `@nosql-pro` | NoSQL specialist | Document / KV / graph modeling | S, B | Access patterns, keys |
| 5 | `@perf-eng` | Performance engineer | Latency, throughput, profiling | B | Profile read, bottleneck list |
| 6 | `@concurrency` | Concurrency pro | Threads, async, locking, races | B | Hazard list, primitive choice |
| 7 | `@distributed` | Distributed systems | CAP, consensus, replication, sharding | S, B | Trade-off matrix, failure modes |
| 8 | `@microservices` | Service boundaries | Splits, contracts, sagas | S, B | Boundary proposal, anti-patterns |
| 9 | `@event-driven` | Event-driven arch | Queues, streams, pub/sub, CDC | S, B | Topic design, ordering guarantees |
| 10 | `@caching-pro` | Caching strategist | Layers, invalidation, hit ratios | B | Cache plan, invalidation rules |

### Frontend engineering (10)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 11 | `@fe-dev` | Frontend dev mentor | Components, state, routing | B | Component plan, state sketch |
| 12 | `@react-pro` | React specialist | Hooks, server components, suspense | B | Pattern recs, perf pitfalls |
| 13 | `@css-wizard` | CSS wizard | Layout, animation, specificity | B | Selector plan, layout recipe |
| 14 | `@design-systems` | Design system engineer | Tokens, primitives, distribution | S, B | Token map, primitive list |
| 15 | `@a11y` | Accessibility specialist | WCAG, ARIA, keyboard, SR | S, B | A11y gap list, fixes |
| 16 | `@perf-web` | Web performance | CWV, bundle size, hydration | B | Budget + top offenders |
| 17 | `@animation` | Animation engineer | Motion, easing, timing | B | Motion spec, FPS plan |
| 18 | `@forms-pro` | Form state architect | Validation, errors, UX | S, B | Flow diagram, state shape |
| 19 | `@i18n` | Internationalization | Locales, RTL, plurals | S, B | i18n plan, edge-case catalog |
| 20 | `@browser-compat` | Browser compat | Polyfills, progressive enh. | B | Support matrix, fallback list |

### Infra / DevOps / Cloud (8)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 21 | `@devops` | DevOps mentor | CI/CD, pipelines, deploys | B, Sh | Pipeline sketch, gate list |
| 22 | `@kubernetes` | K8s specialist | Operators, helm, ingress | B | Manifest review, topology |
| 23 | `@cloud-arch` | Cloud architect | AWS / GCP / Azure | S, B | Arch diagram, cost shape |
| 24 | `@iac` | IaC engineer | Terraform / Pulumi / CDK | B | Module plan, drift risks |
| 25 | `@observability` | Observability pro | Metrics, logs, traces, SLOs | S, B | Signal plan, SLO draft |
| 26 | `@sre` | SRE | Incident response, runbooks | Sh | Runbook draft, postmortem |
| 27 | `@cost-opt` | Cloud FinOps | Rightsizing, reserved capacity | Sh | Spend hot-spots, levers |
| 28 | `@edge` | Edge engineer | CDN, edge compute, cache rules | B | Edge plan, cache-key design |

### Data (6)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 29 | `@data-eng` | Data engineer | Pipelines, ETL/ELT, orchestration | B | DAG sketch, SLA plan |
| 30 | `@data-warehouse` | Warehouse modeler | dbt, star/snowflake, marts | S, B | Model plan, grain choices |
| 31 | `@analytics-eng` | Analytics engineer | Event schemas, tracking plans | S, B | Tracking plan, schema review |
| 32 | `@ml-eng` | ML engineer | Training, serving, feature stores | B | System diagram, risks |
| 33 | `@data-viz` | Data visualization | Charting, dashboards, narrative | S, B | Chart choices, annotations |
| 34 | `@sql-wizard` | SQL wizard | Query optimization, windows | B | Rewrite, plan read |

### Mobile / Desktop (4)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 35 | `@ios-dev` | iOS dev | Swift, SwiftUI, Apple platforms | B | Pattern recs, pitfalls |
| 36 | `@android-dev` | Android dev | Kotlin, Jetpack Compose | B | Pattern recs, pitfalls |
| 37 | `@react-native` | React Native dev | Cross-platform RN | B | Native-bridge picks, perf |
| 38 | `@desktop-dev` | Desktop app dev | Tauri / Electron / native | B | Shell choice, IPC plan |

### AI / ML / Agents (10)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 39 | `@ai-ml` | AI/ML generalist | Models, training, eval | E, S, B | Approach shortlist, risks |
| 40 | `@llm-pro` | LLM specialist | Prompting, context, tools | S, B | Prompt plan, context budget |
| 41 | `@rag` | RAG architect | Retrieval-augmented generation | S, B | Index + retrieval plan |
| 42 | `@agent-arch` | Agent architect | Tool use, orchestration, memory | S, B | Agent topology, loop design |
| 43 | `@eval-ml` | Eval engineer | Benchmarks, A/B, offline/online | S, B | Eval plan, metric picks |
| 44 | `@nlp` | NLP specialist | Tokenization, embeddings, NER | B | Method shortlist |
| 45 | `@cv` | Computer vision | Detection, segmentation, OCR | B | Model/pipeline picks |
| 46 | `@rl` | Reinforcement learning | Reward, exploration, eval | B | Problem shape, pitfalls |
| 47 | `@mlops` | MLOps | Deployment, monitoring, drift | B, Sh | Serving plan, drift watch |
| 48 | `@prompt-eng` | Prompt engineer | Caching, latency, cost levers | B | Prompt diff, cache points |

### Security & Privacy (6)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 49 | `@sec-eng` | Security engineer | Threat modeling, OWASP | E, S, B | Threat model, fix list |
| 50 | `@authn` | Authentication | SSO, passkeys, OAuth flows | S, B | Flow diagram, edge cases |
| 51 | `@authz` | Authorization | RBAC / ABAC, multi-tenancy | S, B | Policy model, grants |
| 52 | `@crypto` | Cryptography | Primitives + key mgmt | B | Primitive pick, key lifecycle |
| 53 | `@privacy` | Privacy engineer | Minimization, redaction, GDPR | S, B, Sh | Data map, redaction plan |
| 54 | `@redteam` | Red team | Pentest mindset, abuse cases | E, S | Abuse scenarios, kill-chain |

### Visual / brand design (6)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 55 | `@brand` | Brand strategist | Identity, tone, positioning | E, S | Brand sketch, tone rules |
| 56 | `@visual` | Visual designer | Type, color, grid | S, B | Composition notes |
| 57 | `@illustration` | Illustration lead | Style, system, cadence | S | Style brief, asset list |
| 58 | `@motion` | Motion designer | Motion identity, prototypes | S, B | Motion spec, samples |
| 59 | `@prototyping` | Prototyping specialist | Fidelity choice, tool picks | E, S | Proto plan, fidelity pick |
| 60 | `@editorial` | Editorial designer | Long-form layout, rhythm | S, B | Grid + hierarchy plan |

### Interaction / UX design (8)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 61 | `@ux-mentor` | Interaction designer | Patterns, flows, states | E, S | Pattern picks, flow sketch |
| 62 | `@ia` | Information architect | Structure, taxonomy, labels | E, S | IA map, labeling notes |
| 63 | `@nav-pro` | Navigation design | Menus, routing UX, wayfinding | S | Nav model, trade-offs |
| 64 | `@forms-ux` | Forms UX | Flow, error recovery, density | S | Flow diagram, error catalog |
| 65 | `@onboarding` | Onboarding designer | First-run, activation moments | E, S | Activation plan, moments |
| 66 | `@empty-states` | Empty / error / loading | Boundary states, feedback | S, B | State matrix, copy cues |
| 67 | `@notifications` | Notification design | Priority, digest, cadence | S | Priority table, cadence plan |
| 68 | `@microcopy` | UI writer | Button verbs, tone, microcopy | S, B | Copy diff, tone notes |

### User research (4)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 69 | `@ux-research` | UX researcher | Methods, recruitment, synthesis | E | Method pick, plan |
| 70 | `@usability` | Usability specialist | SUS/UMUX, moderated testing | E, Sh | Test plan, severity list |
| 71 | `@interviews` | Interviewer | 1:1 scripts, probing | E | Interview guide, probes |
| 72 | `@a-b-test` | A/B test designer | Power analysis, MDE, stopping rules | S, Sh | Test plan, sample size |

### Product & strategy (10)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 73 | `@pm` | Product manager | Scope, priorities, sequencing | E, S | Slice plan, must/should/won't |
| 74 | `@roadmap` | Roadmap strategist | Bets, horizons, sequencing | E | Roadmap sketch |
| 75 | `@strategy` | Strategist | Positioning, Porter, moat | E | Strategy memo |
| 76 | `@pricing` | Pricing & packaging | Tiers, metering, psychology | E, S | Pricing model |
| 77 | `@estimation` | Estimation pro | T-shirt, ranges, risk-adjusted | S | Estimate with uncertainty |
| 78 | `@prd-writer` | PRD writer | Structure, crispness, scope | S | PRD draft / red-pen |
| 79 | `@ac-writer` | AC author | Gherkin, edge cases | S | AC list |
| 80 | `@measurement` | Measurement designer | Metric trees, NSM, KRs | S | Measurement plan |
| 81 | `@premortem` | Premortem facilitator | Failure modes, kill criteria | E | Risk register, kill gates |
| 82 | `@competitive` | Competitive analyst | Landscape, positioning gaps | E | Landscape map |

### Growth / marketing / GTM (8)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 83 | `@growth` | Growth strategist | Loops, AARRR, activation | E, S | Loop diagram, lever list |
| 84 | `@seo` | SEO specialist | Technical + content SEO | S, Sh | Keyword + tech checklist |
| 85 | `@paid-ads` | Paid acquisition | Channels, creative, ROAS | Sh | Channel pick, CAC model |
| 86 | `@email-mkt` | Lifecycle marketer | Email, triggers, journeys | S, Sh | Lifecycle map |
| 87 | `@gtm` | GTM strategist | Launch planning, positioning | E, Sh | Launch plan |
| 88 | `@devrel` | Developer relations | Docs, talks, dev comms | Sh | DevRel plan, talking points |
| 89 | `@community` | Community builder | Forums, moderation, rituals | E, Sh | Community plan |
| 90 | `@partnerships` | BD / partnerships | Deals, integrations, co-mktg | E, Sh | Partner shortlist |

### Content / copy / comms (6)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 91 | `@copywriter` | Copywriter | Web & marketing copy | S, Sh | Copy draft / red-pen |
| 92 | `@tech-writer` | Technical writer | Developer docs, reference | Sh | Doc skeleton, examples |
| 93 | `@editor` | Line editor | Clarity, concision, flow | S, Sh | Edited draft |
| 94 | `@storyteller` | Narrative craft | Arc, stakes, structure | E, Sh | Story beats |
| 95 | `@press` | PR specialist | Releases, briefings, pitch | Sh | Release draft, target list |
| 96 | `@social` | Social writer | Threads, posts, hooks | Sh | Post drafts, hooks |

### Legal / finance / ops / people (4)
| # | Handle | Title | Specialty | Phase | Output |
|---|---|---|---|---|---|
| 97 | `@legal` | Startup legal | Contracts, ToS, IP, licensing | E, S, Sh | Issue spots, non-legal-advice note |
| 98 | `@finance` | Startup finance | Runway, unit economics, models | E | Cash model, unit-econ sketch |
| 99 | `@ops` | Operations | Vendors, tooling, ops rituals | S, Sh | Ops plan, vendor notes |
| 100 | `@hiring` | Hiring mentor | JDs, loops, calibration | Sh | JD draft, loop design |

---

## Invocation grammar summary

| User types | Meaning |
|---|---|
| `//build` | Enter Builder persona (no expert) |
| `//build @be-dev` | Builder + Backend dev lens for this turn |
| `//explore @ai-ml @competitive` | Explorer + two lenses (ensemble) — V1.5+ |
| `@be-dev` (inline, mid-session) | Current phase agent loans in the expert for one turn |
| `//experts` | Open the roster |
| `//explore ??` | Ask the agent which experts it would recommend for this card |

## Proactive-offer behavior (the headline feature)

At the end of every phase-agent turn on a fresh card, the agent appends:

> **Want a specialist on this?** I'd suggest **@onboarding** (for the activation angle) or **@measurement** (to firm up the success signal). Reply with one and I'll channel them for the next turn.

Rules the agent follows when picking the 2–3 offers:
1. Match on card **sigil** (Salmon → analysts + measurement; Willie → strategy + premortem; Nemo → microcopy + specific craft experts; Tuna → craft or domain experts).
2. Match on card **keywords** (regex over title + last user message).
3. Never offer the same expert twice in one session unless the user returns from a handback.
4. Prefer experts the user has loaned before in the same phase (recency bias).
5. Never offer more than 3. One is better than three when the match is obvious.

---

## Open questions (for next session)

- Do expert turns get captured in the `<FISH-handoff>` trail? (Probably yes — as provenance, not as a phase transition.)
- Does the proactive offer fire on every turn, or only turn 1 of a fresh card? (Lean: turn 1 + on obvious topic shift.)
- Team-custom experts (`.experts/`) — V1 or V1.5?
- How are experts versioned? (Tie to the `//` bundle version is simplest.)

---

## Next steps

- [ ] Create product brief → `/bmad-create-product-brief` (name: **Expert Shortcuts — loanable personas for local agents**)
- [ ] Draft the four local-agent spec-file additions (`§ Expert shortcuts` section in each of [explorer.md](../methodology/local-agents/explorer.md), [solidifier.md](../methodology/local-agents/solidifier.md), [builder.md](../methodology/local-agents/builder.md), [shipper.md](../methodology/local-agents/shipper.md))
- [ ] Prototype the proactive-offer prompt pattern on one agent (suggest Sol — highest offer-density, most natural surface) and smoke-test
- [ ] Decide on V1 vs V1.5 cut: headline feature in OSS, ensembles/debate/custom-experts in V1.5
