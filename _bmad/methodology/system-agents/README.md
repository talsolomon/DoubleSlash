---
name: System agents — Context Cloud workers
description: The nine background workers that observe, protect, and route Duble Slash sessions. Run in the desktop client + hosted backend. Coexist with local agents; enforce the same FISH vocabulary without user invocation.
type: agent-roster
---

# System agents — background workers in the Context Cloud

System agents are **not** the `//` agents a user invokes inside their AI tool. Those are [local agents](../local-agents/README.md). System agents are the **always-on workers** that make Duble Slash trustworthy, multiplayer-capable, and long-horizon — the parts of the product the user doesn't type into.

They share one design rule: **transparent, narratable, overridable.** Users see what each agent did (audit log), can veto any action, can disable any agent without breaking the rest. System agents are not black boxes — they are visible workers in a glass kitchen.

---

## 1. Where they live

| Agent scope | Runtime |
|---|---|
| **Personal** | The Duble Slash desktop client on the user's machine. Operates on the user's data only. Privacy-first, local-by-default. |
| **System** (team-scope) | The hosted backend / Context Cloud, available starting V1. Operates on the team graph. Subject to team policies. Audit-logged. |

The same agent can start as personal-scope (OSS launch, no multiplayer) and gain a system-scope tier at V1 — e.g., Capture runs on each user's device (personal) and also feeds the Context Cloud index (system).

---

## 2. The roster

| # | Agent | Scope | Milestone | One-line job |
|---|---|---|---|---|
| 1 | **Capture** | Personal | OSS launch | Watch each tool; tag every session with source, model, timestamp, and goal. |
| 2 | **Redaction** | Personal | OSS launch | Auto-detect PII, secrets, client identifiers. Diff-style preview before anything leaves the device. |
| 3 | **Sync** | Personal → System | V1 | Handle push from local store to team graph; honor per-session push controls. |
| 4 | **Handoff** | System | V1 | Detect when a session hits a natural pause; surface it as pickup-able ("Alice paused on this — want it?"). Powers the Sarah→Marcus demo. |
| 5 | **Context Bundler** | System | V1 | Assemble a context pack on demand for any teammate — powers live handoff + new-joiner onboarding. |
| 6 | **Digest** | System | V1.5+ | Narrate "today at a glance" for the team. Replaces async standups. |
| 7 | **Personal Twin** | Personal | V1.5+ | Represent the user on simple async questions while they're offline. |
| 8 | **Flow Checker** | System | V2 / `flow.yaml` | Verify each card carries its required attributes (brief, source, context, goal, repository) per the team's `flow.yaml`. |
| 9 | **Process** | System | V2 / `flow.yaml` | Enforce phase transitions per `flow.yaml` (e.g., "no card moves to Build without an approved brief"). |

Each agent gets a full section below.

---

## 3. Per-agent specs

### 3.1 Capture agent

**Scope:** Personal. **Ships:** OSS launch.

**Job:** Passively observe every AI tool the user works in, tag the resulting session with provenance metadata, and file it into the local session store.

**What it captures (OSS launch baseline):**
- Tool (Claude Desktop, Cursor, ChatGPT Desktop, Claude.ai, ChatGPT web, Perplexity, Claude via VS Code).
- Timestamp, session boundaries.
- Model (when available).
- Prompt + response content (always encrypted locally).
- Inferred goal (extracted from opening prompt).
- **FISH sigil + phase + agent** — extracted from `//` invocations and `<FISH-handoff>` blocks.

**Design rules:**
- **Local-first encrypted storage.** Data never leaves device by default. OSS-launch capture is entirely local.
- **Always-visible capture indicator** ("🟢 Capturing · 3 apps · encrypted locally · you control pushes") — the user can see what's being captured at all times.
- **Opt-in per-tool.** User can disable capture for any tool individually.
- **Transparent tagging.** When a `<FISH-handoff>` is detected, Capture indexes it as a first-class event in the card's timeline, not as raw text.

**Interaction with local agents:**
- Every `<FISH-handoff>` the local agents emit is saved by Capture. The user doesn't have to copy-paste handoffs between sessions — Capture stores them; the next session retrieves.
- Capture makes FISH cards **resumable across tool restarts**. The handoff contract + Capture together = "pick up from yesterday."

**Failure modes to design against:**
- False negatives (missed sessions) — high cost, breaks the "yesterday" promise.
- Silent captures the user didn't expect — integrity-GTM-risk. Indicator must be truthful.

### 3.2 Redaction agent

**Scope:** Personal. **Ships:** OSS launch.

**Job:** Gate any captured content before it leaves the device. Auto-detect PII, secrets, client identifiers; render a diff-style preview the user approves or edits.

**What it detects (baseline):**
- API keys, OAuth tokens, PEM blocks, credentials in config files.
- Email addresses, phone numbers, SSNs, credit-card-shaped strings.
- Internal URLs, internal hostnames, internal code names.
- User-taught identifiers (see "Teach once" below).

**Design rules:**
- **Pre-push preview.** Any push (to V1 Context Cloud or any external service) shows a diff-style preview: original vs. redacted. User approves, edits, or cancels.
- **Teach once** (from [brainstorm item H](../../planning-artifacts/brainstorm-mvp-post-reframe.md#thread-4--redaction-trust)). First time the user flags a new pattern ("also redact our internal project codename"), Redaction learns it for future sessions.
- **Never silent.** No autonomous data movement. Every redact-and-send is an explicit action.
- **Co-signs trust receipts** (with the Shipper local agent). When the Shipper emits a trust receipt, Redaction appends a signed count of what was stripped.

**Interaction with local agents:**
- Handoffs and trust receipts emitted by local agents pass through Redaction before the Context Cloud (V1) picks them up.
- Redaction can flag the Explorer / Solidifier during Build when the user is about to emit an artifact containing likely-sensitive content.

**OSS-launch footprint:**
- Runs entirely on-device.
- Diff preview is the UX; no Duble Slash backend involved.

### 3.3 Sync agent

**Scope:** Personal → System. **Ships:** V1.

**Job:** Handle push from local store to the team graph in the Context Cloud. Honor per-session push controls. Resolve conflicts when two teammates touch the same card.

**What it does:**
- Uploads user-approved sessions (after Redaction) to the Context Cloud.
- Routes updates: local capture → redacted preview → user approval → sync → team graph.
- Detects and surfaces conflicts ("Alice edited the brief while you were writing — merge, override, or defer?").

**Design rules:**
- **User approval per push** (OSS default) or **auto-sync** (opt-in, per-card).
- **Sync is observable.** Pending pushes, sync failures, conflicts — all visible in the desktop client.
- **Offline-tolerant.** Pushes queue; sync resumes on reconnect.

**Interaction with FISH:**
- Sync is the mechanism by which a Solidifier's handoff in Claude Desktop reaches Marcus's Cursor.
- Card IDs are stable across tools because Sync maintains the canonical card state in the Context Cloud.

### 3.4 Handoff agent

**Scope:** System (team graph). **Ships:** V1.

**Job:** Detect when a session hits a natural pause and surface it as pickup-able to teammates. *"Alice paused on this card at phase X — want it?"*

**What it detects:**
- User emits a `<FISH-handoff>` with `to: <other phase>` → notify the next agent's "owner" on the team if one is assigned.
- User closes a tool with a card in mid-Explore and no handoff emitted → prompt the user: *"Emit a handoff for pickup, or keep private?"*

**Design rules:**
- **Routing honors FISH phase ownership.** If Sarah is the team's usual Explorer and Marcus the usual Builder, handoffs route accordingly — but any teammate can pick up any handoff.
- **Quiet by default.** Handoff agent doesn't spam. One notification per handoff per relevant teammate.
- **V1 handoff fields.** `requester`, `reviewer`, `sla` fields (see [transitions-and-handoffs.md §8](../fish/transitions-and-handoffs.md#8-multi-person-sessions-v1-multiplayer)) are populated automatically where possible.

**This is the Sarah→Marcus demo.** The Handoff agent is the glue; Sync is the transport.

### 3.5 Context Bundler agent

**Scope:** System. **Ships:** V1.

**Job:** Assemble a context pack on demand for any teammate. Powers:
- Live handoff pickup (Marcus opens the card; Context Bundler gives him everything he needs).
- New-joiner onboarding (a new hire gets a pack of recent Tuna + Willie handoffs, archetype-tagged).
- "Catch me up" for anyone returning from leave.

**What's in a pack:**
- The card's full handoff log (every phase transition, chronological).
- All artifacts referenced in handoffs (briefs, sketches, interview nuggets).
- The card's Capture history (with the user's sensitive content redacted per the team's policy).
- The card's sigil history (sigil changes over the card's life).

**Design rules:**
- **Redaction-first.** Packs pass through team-level Redaction policy before delivery.
- **Explicit request.** Packs are requested (button press, command, agent-to-agent request), never pushed.
- **Expiring by default.** Packs are ephemeral — downloadable for a short window. Long-term access reads the live card.

### 3.6 Digest agent

**Scope:** System. **Ships:** V1.5+.

**Job:** Narrate "today at a glance" for the team. Replaces async standups.

**What it produces:**
> *"This morning across your team: 3 Salmons in Explore (led by Sarah), 2 Tunas in Build (with Marcus), 1 Willie entering Solidify (Tal is owning the pitch). Blockers: one reverse-handoff on the billing Tuna — Builder wants Solidify to clarify AC #7."*

**Design rules:**
- **Sigil-aware.** Uses FISH vocabulary; teammates read phase + archetype, not "sprint 3 item."
- **Delta-based.** What changed since the last digest, not a full status dump.
- **Blocker-first.** Reverse handoffs and stalled cards surface prominently.
- **Optional channels.** Slack, email, in-app; team picks.

**Why FISH makes this possible:** because every card carries `sigil + phase + handoffs`, the Digest agent can write status from structured data instead of guessing from chat scroll.

### 3.7 Personal Twin agent

**Scope:** Personal. **Ships:** V1.5+.

**Job:** Represent the user on simple async questions while they're offline.

**Examples:**
- *"Does this match your team's convention?"* — Twin answers from the user's prior handoffs and decisions.
- *"Can I pick up your in-progress card?"* — Twin answers based on the user's stated policy.
- *"Is this redaction rule right?"* — Twin answers from the user's prior Redaction approvals.

**Design rules:**
- **Never speaks outside its mandate.** If the question is outside the user's prior patterns, Twin defers to the human.
- **Always narratable.** Every Twin response is logged in the user's activity so they see what was answered in their name.
- **Overridable.** The user can correct any Twin response; the correction updates the Twin's model.

**FISH tie-in:** Twins learn from the user's accumulated handoff log. A designer's Twin knows how they Solidify; a developer's Twin knows how they Build.

### 3.8 Flow Checker agent

**Scope:** System. **Ships:** V2 (`flow.yaml` milestone).

**Job:** Verify each card carries the required attributes per the team's `flow.yaml` spec.

**`flow.yaml` is a declarative methodology file** — a team-level config that says *"for Salmons and Willies, every card must have an interview-notes artifact before Solidify; for Tunas, a design-system-extension decision must be logged."*

**What Flow Checker does:**
- Reads `flow.yaml` at card entry.
- Checks each card's state against the spec.
- Surfaces missing attributes before transition: *"This Salmon is moving to Solidify without interview notes. Your `flow.yaml` requires them. Override, or add?"*

**Design rules:**
- **Advisory by default** (per brief: "opt-in, never a prerequisite").
- **Enforcing mode** — teams can opt into hard-gating. Then Flow Checker blocks non-compliant transitions.
- **Auditable.** Every check is logged.

### 3.9 Process agent

**Scope:** System. **Ships:** V2 (`flow.yaml` milestone).

**Job:** Enforce phase transitions per `flow.yaml`.

**Examples of per-team rules a Process agent enforces:**
- *"No card moves to Build without an approved brief."*
- *"Willies require two reviewers on the Solidify handoff."*
- *"Salmons require a measurement plan before Build."*

**Design rules:**
- **Rules are declarative.** `flow.yaml` is the source; Process agent interprets.
- **Overridable with reason.** Enforcement can be overridden by explicit user action; the override + reason is logged.
- **Team-specific.** Every team can have its own `flow.yaml`; Process agent honors the active team's rules.

**Distinction from Flow Checker:** Flow Checker verifies attributes are present; Process agent enforces the transition graph. They work together.

---

## 4. Cross-agent design rules

Rules that bind all nine agents:

### 4.1 Transparent, narratable, overridable

From the product brief:
- **Transparent.** Users see what each agent did (audit log).
- **Narratable.** Agents explain their actions in plain English when asked.
- **Overridable.** Users can veto any action; they can disable any agent without breaking the rest.

This is load-bearing. It is part of the integrity GTM pillar, not separate from it.

### 4.2 Same FISH vocabulary as local agents

All system agents read:
- `sigil` (size × certainty)
- `archetype` (Nemo / Tuna / Salmon / Willie)
- `phase` (Explore / Solidify / Build / Ship)
- `<FISH-handoff>` blocks

System agents do not invent new vocabulary. They operate on the same cards the local agents produce.

### 4.3 Observable in the glass kitchen

Every system-agent action is visible somewhere in the Duble Slash UI:
- Capture → capture indicator + session timeline.
- Redaction → pre-push preview.
- Sync → sync queue + conflict dialog.
- Handoff → "new handoff" notification.
- Context Bundler → pack-generation log.
- Digest → the digest itself.
- Personal Twin → the Twin activity log.
- Flow Checker / Process → gate warnings inline at the transition.

No action is invisible. An agent that acts without a visible trace is a bug.

### 4.4 Disable-able individually

Any system agent can be disabled without breaking the rest. Concretely:
- Disable Capture → the rest of the system keeps working; `//` local agents keep operating; you just lose the session index.
- Disable Redaction → pushes require full manual review (not recommended but possible).
- Disable Sync → you become single-player; local agents still work; the Context Cloud doesn't receive your cards.
- Disable Digest / Twin / Flow Checker / Process → entirely optional features, off by default for some teams.

---

## 5. Relationship to local agents

| Local agent (foreground) | System agent (background) that supports it |
|---|---|
| Explorer | Capture (records session) + Redaction (stages if pushed) + Context Bundler (for entering Explore with prior-loop context) |
| Solidifier | Capture + Sync (V1 — cross-tool continuity) + Flow Checker (V2 — checks required artifacts) |
| Builder | Capture + Sync + Flow Checker + Process (V2 — gate against moving to Ship without criteria) |
| Shipper | Redaction (co-signs trust receipt) + Sync (publishes to team graph) + Handoff (routes to teammates) + Digest (surfaces in tomorrow's team digest) |

Every local-agent action is eventually visible to the team through a system-agent pipeline.

---

## 6. Shipping order & dependencies

```
OSS Launch
├── Capture (personal)
└── Redaction (personal)
        │
        ▼
      V1
├── Sync (personal → system)
├── Handoff (system)
└── Context Bundler (system)
        │
        ▼
    V1.5+
├── Digest (system)
└── Personal Twin (personal)
        │
        ▼
   V2 / flow.yaml
├── Flow Checker (system)
└── Process (system)
```

OSS launch ships with **just Capture + Redaction** because those are the integrity substrate — you can't have multiplayer handoffs without first demonstrating that capture and redaction work. V1 adds the multiplayer surface. V2 adds declarative methodology enforcement.

---

## 7. Cross-references

- Local agents (`//` personas) → [`../local-agents/README.md`](../local-agents/README.md)
- FISH spec → [`../fish/README.md`](../fish/README.md)
- Transitions + handoff contract → [`../fish/transitions-and-handoffs.md`](../fish/transitions-and-handoffs.md)
- Product brief (source of agent list + milestones) → [`../../planning-artifacts/brief-collab-capture-layer.md`](../../planning-artifacts/brief-collab-capture-layer.md)
- Technical stack → [`../../docs/technical-research-duble-slash-stack.md`](../../docs/technical-research-duble-slash-stack.md)
