---
name: Agent System — master reference
description: Single aggregated source of truth for the full Duble Slash agent fabric. All agents, all layers, infrastructure, orchestration, shipping order. Ready for PRD and system documentation. References detail files; does not duplicate them.
type: master-reference
---

# Duble Slash — Agent System

> **This is the single aggregated reference.** Detailed specs live in the files linked throughout. This document is the one you open when writing the PRD, briefing an engineer, or orienting a new collaborator. It holds the complete picture.

---

## 0. At a glance (PRD summary block)

Duble Slash ships **fifteen agents** organized into four layers:

| Layer | Count | What they are | When they run |
|---|---|---|---|
| **Local agents** | 4 | Phase-shaped personas (`//` invoked) inside the user's AI tool | Foreground; user-triggered |
| **Personal background** | 3 | On-device workers (capture, redaction, twin) | Always-on; no user invocation |
| **System background** | 6 | Context Cloud workers (sync, handoff, bundler, digest, gate, loom) | Event-triggered; team-scope |
| **Company agents** | 1 + 136 | Vera (CMO) + expert specialist roster | On-demand |

All fifteen share one vocabulary: `sigil`, `archetype`, `phase`, `<fish-handoff>`. Nothing moves without user consent. Every action is observable in the glass-kitchen UI.

---

## 1. Architecture — three layers

```
┌── LAYER 1 · LOCAL AGENTS · foreground · //-invoked · per-user ──────────────┐
│                                                                               │
│   Explorer · Nova          Solidifier · Sol          Builder · Bram           │
│   (head · Explore)         (left body · Solidify)    (right body · Build)     │
│                                                                               │
│                                Shipper · Sage                                 │
│                                (tail · Ship)                                  │
│                                                                               │
│   Each is a specialist persona with a deep method catalog.                    │
│   You type // → the tool adopts one persona.                                  │
│   Explicit <fish-handoff> between them. Runs in Claude Desktop / Cursor /     │
│   ChatGPT Desktop — no Duble Slash account required.                          │
└──────────────────────────────────────┬────────────────────────────────────────┘
                                       │ emits: handoffs · artifacts · commits
                                       ▼
┌── LAYER 2 · PERSONAL BACKGROUND · on device · event-triggered ─────────────┐
│                                                                               │
│   Capture · Tally           Redaction · Cipher         Personal Twin · Twin   │
│   tags every session        gates every outbound        answers async         │
│   (encrypted, local)        with a diff preview         in user's voice       │
│                                                                               │
│   All three run on YOUR device. Zero network traffic unless you push.         │
└──────────────────────────────────────┬────────────────────────────────────────┘
                                       │ approved pushes only (via Upstash relay)
                                       ▼
┌── LAYER 3 · SYSTEM BACKGROUND · Context Cloud (V1+) ───────────────────────┐
│                                                                               │
│   Sync · Relay              Handoff · Beacon            Context Bundler · Pack│
│   queues + uploads          routes pickups to the       assembles on-demand   │
│   (Upstash Redis)           next phase's owner          context packs         │
│                                                                               │
│   Digest · Echo             Flow Checker · Gate         Process · Loom        │
│   daily team narrative      flow.yaml attribute         flow.yaml transition   │
│   (replaces standups)       checks                      enforcement            │
│                                                                               │
│   Team-scope. Methodology orchestrators — they apply Fish Model at project    │
│   scale: classify archetype, assign lead agent, enforce flow.yaml.            │
└───────────────────────────────────────────────────────────────────────────────┘

  + COMPANY LAYER · Vera (CMO) · marketing operator · //marketing
  + EXPERT SHORTCUTS · 136 loanable specialists · @handle · per-turn lenses
```

**Read top-down:** you drive a local agent inside your AI tool → personal agents process each event → approved pushes cross into the team Context Cloud → system agents work the team graph. Nothing moves without transparency and user consent.

---

## 2. Full roster

| # | Agent · call-sign | Layer | Scope | Ships | One-line job |
|---|---|---|---|---|---|
| L1 | **Explorer** · *Nova* | Local | Per-user | OSS | Open the aperture. Surface options, questions, premises. Refuse to commit. |
| L2 | **Solidifier** · *Sol* | Local | Per-user | OSS | Reduce unknowns. Shape the thing. Lock decisions that unblock Build. |
| L3 | **Builder** · *Bram* | Local | Per-user | OSS | Execute against the locked shape. Don't re-open settled questions. |
| L4 | **Shipper** · *Sage* | Local | Per-user | OSS | Narrate, release, document. Make past-work legible to future-you. |
| P1 | **Capture** · *Tally* | Personal | On device | OSS | Watch each tool; tag every session with source, model, timestamp, goal. |
| P2 | **Redaction** · *Cipher* | Personal | On device | OSS | Auto-detect PII / secrets. Diff preview before anything leaves the device. |
| P3 | **Personal Twin** · *Twin* | Personal | On device | V1.5+ | Represent the user on async questions while they're offline. |
| S1 | **Sync** · *Relay* | System | Hybrid | V1 | Queue + upload approved payloads to team graph via Upstash Redis. |
| S2 | **Handoff** · *Beacon* | System | Context Cloud | V1 | Route `<fish-handoff>` pickups to the next phase's owner. |
| S3 | **Context Bundler** · *Pack* | System | Context Cloud | V1 | Assemble on-demand context packs (pickup, onboarding, catch-up). |
| S4 | **Digest** · *Echo* | System | Context Cloud | V1.5+ | Delta-based team narrative ("today at a glance"). Replaces standups. |
| S5 | **Flow Checker** · *Gate* | System | Context Cloud | V2 | Verify cards carry required attributes per team's `flow.yaml`. |
| S6 | **Process** · *Loom* | System | Context Cloud | V2 | Enforce phase transitions and archetype classification per `flow.yaml`. |
| C1 | **Vera** | Company | Per-company | Live | CMO operator — Reddit drafts, articles, campaign plans. Tal publishes. |
| E* | **Expert Shortcuts** | Specialist | Per-turn | OSS | 136 loanable specialist lenses via `@handle`. Proactively offered per card. |

Legend: **L** = local, **P** = personal background, **S** = system background, **C** = company, **E** = expert. Call-signs are the UI/log handles; full names are canonical.

---

## 3. Layer 1 — Local agents

> Full specs: [`local-agents/explorer.md`](./local-agents/explorer.md) · [`solidifier.md`](./local-agents/solidifier.md) · [`builder.md`](./local-agents/builder.md) · [`shipper.md`](./local-agents/shipper.md) · roster: [`local-agents/README.md`](./local-agents/README.md)

### 3.1 The four personas

| Agent | Anatomy | Phase | Persona mantra | Key outputs |
|---|---|---|---|---|
| **Explorer · Nova** | Head | Explore | *"Surface before settling"* | Interview plans, nugget boards, journey maps, premortems, HMW sets |
| **Solidifier · Sol** | Left body | Solidify | *"One shape per session"* | Briefs, AC, measurement plans, ADRs, decision logs, wireframe specs |
| **Builder · Bram** | Right body | Build | *"Smallest change that satisfies the contract"* | Code, tests, PR drafts, instrumentation, slice plans |
| **Shipper · Sage** | Tail | Ship | *"The diff shows what. The Shipper shows why."* | Changelogs, release notes, trust receipts, measurement readouts, retrospectives |

### 3.2 Capability codes (invocable directly)

```
Explorer:   SA  HS  HMW  JM  CS  IP  NB  PM  SR  HO
Solidifier: SK  BR  SB   PT  CT  AC  MP  DL  TA  WF  AD  HB  HO
Builder:    CR  SL  GE   TE  UV  IN  PR  HB  HO
Shipper:    RE  CM  CH   RN  TG  PR  MS  MR  RP  TR  NL  HB  HO
```

**HO** (handoff) and **HB** (handback) appear in every agent — the universal forward/reverse phase-transition mechanism.

### 3.3 Invocation grammar

| User types | What happens |
|---|---|
| `//` | Inline palette — Explore / Solidify / Build / Ship |
| `//explore <text>` | Explorer picks default capability for the archetype |
| `//explore SA` | Explorer runs Sigil Assist — classifies the card |
| `//solidify BR` | Solidifier runs Brief |
| `//build @be-dev` | Builder with backend-dev expert lens for this turn |
| `@legal-ip` *(inline)* | Current agent loans in the IP-law expert for one turn |
| `//explore ??` | Agent recommends which experts fit this card |
| `//handoff` | Current agent runs HO → emits `<fish-handoff>` |
| `//handback` | Current agent runs HB → emits reverse `<fish-handoff>` |
| `//sigil bigger unknown` | Update sigil without switching agent |
| `//advance --force` | Override low-confidence advance (logged) |

### 3.4 Universal contract (binding on all four)

1. Read the sigil before responding. If missing, ask for it. Never proceed without one.
2. Match response intensity to archetype (Nemo → concise; Willy → thorough; flag mismatches).
3. Phase exits always emit a `<fish-handoff>` block. No exceptions.
4. Never commit, push, or publish without explicit per-action confirmation (Shipper only writes code/commits).
5. Transparent, narratable, overridable — narrate reads, narrate refusals, flag mismatches.
6. Tool restrictions: Explorer (no code edit) → Solidifier (no code edit) → Builder (full code edit, no commit) → Shipper (commit + tag, with confirmation only).

### 3.5 Axis modulation (per archetype)

| Archetype | Certainty × Size | Default lead agent | Posture across all phases |
|---|---|---|---|
| **Nemo** | Known × Smaller | Builder · Bram | Fast, heuristic, minimal output. Refuse to gold-plate. |
| **Tuna** | Known × Bigger | Solidifier · Sol | Convention-heavy, structured brief, multi-category AC. |
| **Salmon** | Unknown × Smaller | Explorer · Nova | Interview-heavy Explore; compact Solidify; instrumented Build. |
| **Willy** | Unknown × Bigger | Explorer · Nova | Multi-week, market scan + premortem; staged rollout; measurement baseline. |

---

## 4. Layer 2 — Personal background agents

> Full specs: [`system-agents/README.md`](./system-agents/README.md) §§3.1–3.3 (Capture, Redaction) and §3.7 (Twin).

These three run on the user's device. No network traffic unless the user explicitly pushes.

### 4.1 Capture · Tally

**Trigger:** any AI tool session opens.
**Output:** encrypted session record (local).

Watches Claude Desktop / Cursor / ChatGPT Desktop. Tags each session: tool, model, timestamp, inferred goal, Fish Model sigil + phase + agent (from `//` invocations and `<fish-handoff>` blocks). Stores encrypted locally. Makes Fish Model cards **resumable across restarts** — the handoff contract + Tally = "pick up from yesterday." Disable impact: lose session index; `//` agents still work.

**Session record schema:** `session_id · tool · model · started_at · ended_at · goal · card_id · sigil · phase · agent · handoffs[] · content_ref`

### 4.2 Redaction · Cipher

**Trigger:** any outbound payload (push, PR draft, trust receipt, announcement).
**Output:** diff preview + signed redaction receipt.

Auto-detects API keys, OAuth tokens, PEM blocks, email addresses, phone numbers, internal URLs, user-taught identifiers. Renders a diff-style preview; user approves, edits, or cancels. **Teach once** — first time a new pattern is flagged, Redaction learns it. Co-signs Shipper trust receipts. Disable impact: every push requires full manual review.

**Receipt schema:** `payload_id · redacted · matches[{pattern, location, severity}] · user_action · ts`

### 4.3 Personal Twin · Twin

**Trigger:** async question arrives while user is offline.
**Output:** short in-voice response OR explicit defer.

Learns from the user's accumulated handoff log. Answers simple async questions in the user's voice — "Does this match your convention?" / "Can I pick up your card?" — within its trained mandate. Defers if outside it. Every response is logged; user can correct, and corrections update the model. Disable impact: async questions wait for the human.

---

## 5. Layer 3 — System background agents (Context Cloud)

> Full specs: [`system-agents/README.md`](./system-agents/README.md) §§3.3–3.9 and §§4–7.

These run in the Duble Slash desktop client + hosted backend. Team-scope. Every action is visible in the glass-kitchen audit UI.

### 5.1 Sync · Relay

**Trigger:** user approves push OR opt-in auto-sync.
**Output:** sync event (queued → uploaded → ack'd) + conflict dialogs.
**Infrastructure:** Upstash Redis (serverless KV + Streams over HTTP REST API).

Handles push from local store to team graph. Routes: local capture → redacted preview → user approval → Relay → Context Cloud. Conflict resolution ("Alice edited the brief while you were writing — merge, override, or defer?"). Offline-tolerant: queue persists, sync resumes on reconnect. Default: user approves each push. Opt-in: auto-sync per card.

**Why Upstash Redis:** sub-5ms latency, HTTP REST API (no SDK required on device), free tier covers small teams (256MB, 500K ops/mo), Redis Streams enable ordered event log + pub/sub patterns. Zero ops — no VMs, no workers.

**Sync event schema:** `event_id · card_id · payload_type · payload_ref · redacted_by · state[queued|uploading|acked|failed|conflict] · conflict{remote_hash, local_hash, resolution} · ts`

### 5.2 Handoff · Beacon

**Trigger:** `<fish-handoff>` lands in team graph OR user closes tool with in-progress card.
**Output:** pickup notification routed to next phase's owner.

Routes handoffs to teammates based on Fish Model phase ownership. Quiet by default (one notification per handoff per relevant teammate). Powers the **Sarah→Marcus demo**: Sarah (designer, Claude Desktop) solidifies → pushes → Beacon notifies Marcus (developer, Cursor) → Marcus opens the card, gets context pack, continues in his tool.

**Pickup notification schema:** `handoff_id · card_id · sigil · archetype · from_agent · to_agent · from_user · to_users[] · confidence · urgency · link · ts`

### 5.3 Context Bundler · Pack

**Trigger:** explicit request (button, command, or agent-to-agent).
**Output:** ephemeral context pack (redacted, expires in 24h).

Assembles everything a teammate needs to pick up cold: full handoff log, all referenced artifacts (briefs, sketches, interview nuggets), capture metadata, sigil history. Redaction-first — passes through team redaction policy before delivery. Powers live handoff pickup, new-joiner onboarding, and "catch me up" for returning teammates.

**Context pack schema:** `pack_id · card_id · requested_by · expires_at · contents{handoff_log, artifacts[], capture_log, sigil_history} · total_bytes · ts`

### 5.4 Digest · Echo

**Trigger:** cron (daily, team-configurable) OR on-demand.
**Output:** delta narrative — what changed since last digest, blockers first.

Produces: *"This morning: 3 Salmons in Explore (Sarah), 2 Tunas in Build (Marcus), 1 Willy entering Solidify (Tal). Blockers: one reverse-handoff on billing Tuna — Builder wants AC #7 clarified."* Possible because every card carries `sigil + phase + handoffs`. Channels: Slack, email, in-app. Replaces async standups.

**Digest schema:** `digest_id · team_id · window{from, to} · sigil_counts · phase_counts · deltas{advanced[], reversed[], stalled[]} · blockers[] · narrative · channels[] · ts`

### 5.5 Flow Checker · Gate

**Trigger:** card state changes — phase transition attempted, artifact added, sigil changed.
**Output:** advisory warning OR hard block (if team opted in to enforcing mode).

Verifies each card carries the team's `flow.yaml`-required attributes before transition. Example: *"This Salmon is moving to Solidify without interview notes. Your flow.yaml requires them. Override, or add?"* Advisory by default; opt-in enforcing. Every check is logged.

**Flow check schema:** `check_id · card_id · flow_yaml_version · rule · status[pass|warn|fail] · expected · observed · severity[advisory|enforcing] · outcome[allowed|blocked|overridden] · override_by · override_reason · ts`

### 5.6 Process · Loom

**Trigger:** `<fish-handoff>` attempts a phase transition.
**Output:** transition decision (allow | block | request-review) + logged reason.

Enforces phase transitions per `flow.yaml`. Examples it enforces: "No card moves to Build without an approved brief." / "Willys require two reviewers on Solidify handoff." / "Salmons require a measurement plan before Build." Override always possible — with reason logged, override surfaced in tomorrow's Digest. Also classifies each card's archetype and assigns the lead local agent (the Gate+Loom pair is what makes Fish Model methodology instead of four prompts).

**Transition decision schema:** `decision_id · card_id · from_phase · to_phase · rule · decision[allow|block|request-review] · required_reviewers[] · override_by · override_reason · ts`

---

## 6. Expert shortcuts — 136 specialist lenses

> Full spec: [`local-agents/experts.md`](./local-agents/experts.md)

**What they are:** loanable one-turn specialist lenses the current local agent wears without switching persona. The local agent announces, the expert responds, the local agent folds the findings back into the card.

**Invocation:** `//build @be-dev` · `@legal-ip` *(inline)* · `//explore ??` *(ask for recommendations)*

**Proactive behavior:** each local agent **proactively offers 2–3 experts per turn** (turn 1 + topic shift) based on card sigil and topic. Users don't memorize handles.

**Roster — 18 categories, 136 experts:**

| Category | Key handles |
|---|---|
| Backend engineering | `@be-dev` `@api-designer` `@db-schema` `@distributed` `@perf-eng` |
| Frontend | `@fe-dev` `@react-pro` `@a11y` `@perf-web` |
| Infra / DevOps | `@devops` `@kubernetes` `@observability` `@sre` |
| Data & analytics | `@data-eng` `@data-analyst` `@bi-dev` `@sql-wizard` `@statistician` |
| Mobile / Desktop | `@ios-dev` `@android-dev` `@react-native` |
| AI / ML / Agents | `@ai-ml` `@llm-pro` `@rag` `@agent-arch` `@prompt-eng` |
| Security & privacy | `@sec-eng` `@authn` `@authz` `@privacy` `@security-compliance` `@incident-response` |
| Visual / brand design | `@brand` `@motion` `@prototyping` |
| Interaction / UX | `@ux-mentor` `@onboarding` `@forms-ux` `@design-systems` |
| User research | `@ux-research` `@usability` `@a-b-test` |
| Product & strategy | `@pm` `@strategy` `@pricing` `@b2b-product` `@b2c-product` `@plg` `@prd-writer` `@ac-writer` `@measurement` |
| Growth / GTM | `@growth` `@seo` `@gtm` `@product-marketing` `@content-marketing` `@press` |
| Content / copy | `@copywriter` `@tech-writer` `@storyteller` |
| Project / program | `@pm-delivery` `@program-mgr` `@scrum-master` |
| Legal | `@legal` `@legal-contracts` `@legal-ip` `@legal-regulatory` `@legal-compliance` `@legal-international` |
| Finance | `@finance` `@fp-a` `@accounting` `@treasury` |
| Ops & people | `@ops` `@hiring` |
| Industry verticals | `@banking` `@fintech` `@payments` `@healthcare` `@medtech-fda` `@retail-ecomm` `@edtech` `@govtech` `@insurance` `@media-pub` `@regulated-fin` |

**Team-custom experts:** drop a `.experts/@handle.md` file at project root. Any agent on the team can loan it in.

---

## 7. Company agents — Vera

> Full spec: [`company/marketing/agents/cmo/SKILL.md`](../company/marketing/agents/cmo/SKILL.md)

**Vera** is the CMO operator for Duble Slash's company-side marketing loops. She drafts, scores, and proposes — Tal publishes.

| Code | Capability |
|---|---|
| **RD** | Reddit Draft — post + subreddit fit score + timing recommendation |
| **AD** | Article Draft — angle, outline, first-draft body |
| **CP** | Campaign Plan — goal, channel mix, timeline, success metric |
| **SS** | Subreddit Scan — tone, top posts, anti-patterns |
| **SI** | Signal Read — interpret `company/signal/` artifact; recommend next move |

**Hard rules:** never auto-posts. Positioning flows from `STORY.md` — she executes, she does not redefine. Every published piece produces a signal artifact in `company/signal/` within 48h. One channel at a time. Campaigns connect to monetization (studio pilot conversion, Pro tier, methodology credibility) or don't happen.

**Invoke:** `//marketing` or any marketing task routed to the company OS.

---

## 8. Orchestration model

### 8.1 Card lifecycle — end to end

```
USER: "the export tooltip is confusing users"
         │
         ▼
  [Loom/Nova SA]    Classifies archetype (Salmon — unknown × smaller)
                    Assigns lead: Explorer · Nova
                    Flags: MP required before Build
         │
         ▼
  //explore          Nova runs IP, NB, PM
  (Tally records session; Cipher watches for sensitive content)
         │
         │  <fish-handoff> to: solidifier
         ▼
  //solidify         Sol runs BR, AC, MP, DL
  (If pushed: Cipher gates → Relay queues → Beacon routes pickup)
  (Gate checks: "Salmon requires MP before Build ✓")
         │
         │  <fish-handoff> to: builder
         ▼
  //build            Bram runs CR, SL, TE, UV, IN
  (Tally records; Gate checks flow.yaml)
         │
         │  <fish-handoff> to: shipper
         ▼
  //ship             Sage runs CM, CH, RN, TR, MR
  (Cipher co-signs trust receipt; Relay syndicates to team graph;
   Echo includes in tomorrow's Digest)
         │
         ▼
  next card or next loop — Pack assembles context for whoever picks up
```

### 8.2 Authority lines — what can act vs. what can only advise

| Authority | Who holds it |
|---|---|
| Write product code | Builder only |
| Write release plumbing (version bumps, changelogs, commit text) | Shipper only |
| Git commit, tag, publish | Shipper only — per-action user confirmation required |
| Block a phase transition | Loom only (V2, enforcing mode opted in) |
| Initiate data movement off device | No agent — user-only push |
| Gate outbound payload | Cipher (always) — shows diff, never acts silently |
| Classify archetype + assign lead agent | Loom (V2) / Nova's SA method (today) |

### 8.3 Two tracks, always parallel

The card lifecycle runs on two tracks simultaneously:

- **Methods track** — Nova, Sol, Bram, Sage each running the method codes the card requires (IP, AC, MP, CR, TR…).
- **Methodology track** — Loom classifies, Gate verifies, Beacon routes, Tally/Cipher/Relay/Echo handle capture, privacy, sync, narration.

Remove the methods track: you have a flow.yaml with nothing running inside it. Remove the methodology track: you have four competent toolboxes but no project-level continuity. Both tracks are load-bearing.

### 8.4 Cross-agent dependency map

| Local agent | Personal agents that support it | System agents that support it |
|---|---|---|
| Explorer | Tally (records session), Cipher (stages if pushed) | Pack (context for entering Explore with prior-loop context) |
| Solidifier | Tally, Cipher | Relay V1 (cross-tool continuity), Gate V2 (required artifacts check) |
| Builder | Tally | Relay V1, Gate V2, Loom V2 (gate against unqualified Ship) |
| Shipper | Cipher (co-signs trust receipt) | Relay V1 (publishes to team graph), Beacon V1 (notifies teammates), Echo V1.5 (surfaces in Digest) |

---

## 9. Infrastructure layer

### 9.1 Local (on device)

| Component | Tech | What it holds |
|---|---|---|
| Session store | Encrypted local DB (SQLite or equivalent) | Tally's session records — content refs, sigils, handoff index |
| Outbound queue | Local queue file | Relay's pending push queue (offline-tolerant) |
| Twin model | Local fine-tune or RAG over handoff log | Twin's in-voice response capability |
| Agent memory | Host tool's memory / `.cursorrules` / CLAUDE.md | The four local agent personas + universal contract |

### 9.2 Context Cloud (V1+)

| Component | Tech | What it holds |
|---|---|---|
| **Team sync layer** | **Upstash Redis** (serverless KV + Streams) | Card events, handoff events, sync queue ACKs — ordered event log across team |
| Team graph | Hosted DB (TBD: Postgres/Supabase) | Cards, handoffs, artifacts, sigil history, user mappings |
| Pack store | Object storage (S3-compatible) | Assembled context packs (ephemeral, 24h TTL) |
| Digest queue | Cron + queue | Echo's scheduled and on-demand narration jobs |
| flow.yaml store | Git-tracked file per team | Gate + Loom rules |

**Why Upstash for the sync layer:** HTTP REST API (accessible from any local script without SDK), sub-5ms latency, Redis Streams for ordered event log + pub/sub, free tier comfortably covers a small team (256MB, 500K ops/mo), zero ops burden. The local Relay agent `SET`s outbound events and `GET`s/`SUBSCRIBE`s to teammates' events via Streams.

### 9.3 Sync flow (detailed)

```
Device A (Sarah)                    Upstash Redis              Device B (Marcus)
─────────────────                   ─────────────              ─────────────────
Solidifier emits handoff
→ Tally indexes it locally
→ Sarah hits "push to team"
→ Cipher scans + shows diff
→ Sarah approves
→ Relay XADD to                 →  card:billing-2026-05       →  Relay XREAD polls
  stream:card:{card_id}             stream event:               →  Beacon sees to:=builder
                                    { type: handoff,            →  Routes pickup notification
                                      from: solidifier,         →  Marcus clicks "get pack"
                                      to: builder,              →  Pack assembles + delivers
                                      payload_ref: ... }        →  Marcus: //build <pack>
```

---

## 10. Shipping order

```
OSS Launch (today)
├── Local agents — Explorer, Solidifier, Builder, Shipper
├── Capture · Tally  (personal)
└── Redaction · Cipher  (personal)
        │
        ▼
V1 — Multiplayer
├── Sync · Relay  (personal → system · Upstash)
├── Handoff · Beacon  (system)
└── Context Bundler · Pack  (system)
        │
        ▼
V1.5+
├── Digest · Echo  (system)
└── Personal Twin · Twin  (personal)
        │
        ▼
V2 — Declarative methodology
├── Flow Checker · Gate  (system · flow.yaml)
└── Process · Loom  (system · flow.yaml)

Company OS (parallel track, live now)
└── Vera — CMO agent
```

**Ship order rationale:**
- OSS launches with just local agents + Capture + Redaction — the integrity substrate. You can't do multiplayer without proving capture and redaction work first.
- V1 adds the multiplayer surface — Relay, Beacon, Pack are the "Sarah→Marcus" demo.
- V1.5 adds async continuity and team narration — Echo and Twin require a populated handoff log to work from.
- V2 formalizes the methodology orchestration layer — Gate and Loom require teams to have lived in the system long enough to write a meaningful `flow.yaml`.

---

## 11. Six design principles (binding on all fifteen agents)

1. **Transparent, narratable, overridable.** Every agent explains what it did in plain English. Every action can be vetoed. No silent data movement, no silent decisions.
2. **One shared vocabulary.** All fifteen agents read and emit `sigil`, `archetype`, `phase`, `<fish-handoff>`. No agent invents its own terminology.
3. **Per-action confirmation for destructive or external work.** Commits, tags, pushes, announcements — every one requires explicit user confirmation, per action.
4. **Sigil-aware intensity.** Agents modulate depth by archetype. Mismatches are flagged, not silently executed.
5. **Handoff, never smuggle.** Phase exits always emit `<fish-handoff>`. Reverse transitions (handback) are normal. Smuggling across phase boundaries without a handoff is a bug.
6. **Local works without system; system never works without local.** OSS drop is local agents only. System pipeline is built on local-agent events and cannot function without them.

---

## 12. Cross-references

| Topic | File |
|---|---|
| Fish Model methodology (axes, archetypes, phases, matrix) | [`fish/README.md`](./fish/README.md) |
| Why this exists (the moat) | [`fish/human-ai-collaboration.md`](./fish/human-ai-collaboration.md) |
| Phases + method catalog | [`fish/phases-and-methods.md`](./fish/phases-and-methods.md) |
| Handoff block shape + transition gates | [`fish/transitions-and-handoffs.md`](./fish/transitions-and-handoffs.md) |
| Local agent roster + install mechanics | [`local-agents/README.md`](./local-agents/README.md) |
| Explorer spec | [`local-agents/explorer.md`](./local-agents/explorer.md) |
| Solidifier spec | [`local-agents/solidifier.md`](./local-agents/solidifier.md) |
| Builder spec | [`local-agents/builder.md`](./local-agents/builder.md) |
| Shipper spec | [`local-agents/shipper.md`](./local-agents/shipper.md) |
| Expert shortcuts (136 handles) | [`local-agents/experts.md`](./local-agents/experts.md) |
| System agents (detailed specs + schemas + walkthroughs) | [`system-agents/README.md`](./system-agents/README.md) |
| Vera — CMO agent | [`company/marketing/agents/cmo/SKILL.md`](../company/marketing/agents/cmo/SKILL.md) |
| PRD | [`planning/prd.md`](../planning/prd.md) |
| Product brief — capture layer | [`planning/briefs/brief-collab-capture-layer.md`](../planning/briefs/brief-collab-capture-layer.md) |
