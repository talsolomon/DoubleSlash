---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys-v2, step-05-domain, step-06-functional-v2, step-07-nonfunctional, step-08-architecture, step-09-uiux-v2, step-10-integrations, step-11-risks]
inputDocuments:
  - planning/pitch-decks/pitch-deck-duble-slash-v3.md
  - methodology/README.md
  - methodology/agents-overview.md
workflowType: 'prd'
outputFile: 'planning/prd.md'
classification:
  projectType: saas_b2b_desktop
  domain: ai_productivity_tooling
  complexity: medium-high
  projectContext: brownfield-clean-slate
lastEdited: '2026-05-09'
editHistory:
  - date: '2026-05-07'
    changes: 'Added User Journeys, Domain Requirements, Functional Requirements, Non-Functional Requirements, Technical Architecture, UI/UX Requirements, Integrations, Risks'
  - date: '2026-05-09'
    changes: 'Rewrote step-04 User Journeys and step-09 UI/UX Requirements to align with Kanban board, three-tier agent architecture (Apex/Guard/Echo/Prism/Dora/Sol/Bran/May), Dashboard-as-home navigation model, and Drill-down Drawer replacing Node Map right pane. Updated Web App functional requirements accordingly.'
---

# Product Requirements Document — DubleSlash

**Author:** Tal Solomon
**Date:** 2026-05-06

## Executive Summary

DubleSlash is a macOS desktop app that solves AI session continuity — the context that breaks every time a session ends, a tool switches, or a teammate picks up the work. When a user presses `//` inside any AI tool, DubleSlash injects the current project context automatically: the phase, the decisions made, where the session left off. No re-briefing. No cold starts.

The system operates at two levels. At the session level, `//` captures and injects context per-session. At the project level, DubleSlash surfaces the full arc of work as a node map — contexts flowing through Explore, Solidify, Build, and Deliver phases — visible to the whole team. Individual workers gain continuity; teams gain visibility into AI work that was previously invisible.

### What Makes This Special

DubleSlash isn't a memory tool — it's a methodology engine. Context is organized by project, phase, and design process, not stored as a flat log. Agents trained on a human-centered design framework know what's relevant for each session type: which decisions matter now, what the team already resolved, what the next phase needs. They pull only the right context, inject it at the right moment, and keep the whole team in sync without anyone manually maintaining a knowledge base.

The result: AI sessions that pick up mid-thought — not because they remembered everything, but because the right things were organized and ready. The node map makes this visible: a live project view that shows what's been explored, what's been decided, what's being built, and what each person is working on right now.

## Project Classification

- **Type:** B2B SaaS, Obsidian motion (individual ICP, company buyer)
- **Domain:** AI productivity — cross-tool context management layer
- **Complexity:** Medium-high (agentic orchestration, multi-tool integration, local-first sync)
- **Context:** Brownfield methodology and agent layer; clean-slate PRD for simplified product

## Success Criteria

### User Success

**Individual (designer / PM / dev):**
- Describes a project in the `//` onboarding flow and sees Ollama generate the first contexts + tasks locally — activation moment, zero auth required
- Connects Claude (or other AI tool) and executes their first task — depth-2 activation
- Sees nodes appear on the map after execution — the map growing is the proof the system is working
- Returns within 48h and picks up a session without re-briefing

**Manager / Studio lead:**
- Opens DubleSlash and sees the full process trail of a running project — decisions, artifacts, who worked on what — without asking the team
- Can walk a client or stakeholder through the project's decision history entirely from the node map

### Business Success

- 4 first-cohort studios complete the 8-week pilot
- 3 of 4 convert to a team license post-cohort
- 1,000 team seats by V1.5 (Nov 2026)
- $300k+ ARR by Q1 2027 (Series A trigger)

### Technical Success

- Ollama generates first project contexts + tasks locally with no external API required
- Context injection works across Claude, Cursor, and VS Code at V1 launch
- Node created within 10 seconds of task execution
- Local-first, GDPR-compliant — nothing leaves the device without explicit push consent
- Capture is non-blocking — `//` flow not delayed by write operations

### Measurable Outcomes

| Metric | Target | Timeline |
|---|---|---|
| Onboarding completion (first node via Ollama) | >70% of installs | V1 launch |
| Claude connection rate (depth-2 activation) | >50% of activated users | V1 launch |
| 7-day retention | >40% | V1 launch |
| Cohort license conversion | 3 of 4 studios | 8-week pilot |
| Seats at paid tier launch | 1,000 | Nov 2026 |
| ARR | $300k+ | Q1 2027 |

## Product Scope

### MVP — V1 (Sep 2026)
`//` onboarding flow. Ollama generates first contexts + tasks locally. Claude, Cursor, VS Code adapters. Execute button opens AI tool with context injected. Node Map with phase-colored contexts (Explore / Solidify / Build / Ship). Right pane: artifact, brief, tasks (human + agent), reasoning, context `.md`. Snapshot view: Fish-model-bound board with signal strip, recipe panel, and drill-down drawer. GDPR-compliant, local-first.

### Growth — V1.5 (Nov 2026)
Team sync and handoffs. Artifacts gallery (Weevy-style). AI priority surface (next 2 items). Figma, GitHub, Jira connectors. ChatGPT Desktop adapter. Daily digest. Artifact hover previews. Paid tier launch.

### Vision — V2+
Node map replaces Jira as the primary project surface for AI-native teams. Foreign tools (Jira, Linear, Figma, Slack) sync from DubleSlash, not the other way around.

## Roadmap

| Milestone | What ships | Date |
|---|---|---|
| **M0 — PRD + Design** | This PRD + full UX design | May 2026 |
| **M1 — OSS** | `//` CLI + methodology agents + context capture | Jun 2026 |
| **M2 — V1** | Full app: node map, Ollama onboarding, Claude adapter, dashboard | Sep 2026 |
| **M3 — V1.5** | Team sync, artifacts gallery, paid tier launch | Nov 2026 |
| **M4 — Series A trigger** | $300k+ ARR, enterprise pilots | Q1 2027 |

## User Journeys

### Journey 1 — Individual Contributor: First Use → Habit

**Persona:** Designer, PM, or dev at a studio or startup. Works inside Claude, Cursor, or VS Code daily.

| Step | Surface | Action | System Response |
|---|---|---|---|
| 1 | **Desktop** | Downloads macOS app. Launches for the first time. | Menu bar icon appears. Onboarding prompt: "Describe your first project." |
| 2 | **Desktop** | Types project name + one-sentence goal. | Ollama generates 3–5 initial contexts + task list locally. No external API. No auth prompt. |
| 3 | **Web app — Node Map** | Opens web app to see what was created. | First dot appears in the Explore area of the canvas. Clicks it — right pane shows tasks, next prescribed method, empty brief. Activation: the map is no longer empty. |
| 4 | **Desktop** | Prompted to connect Claude. Installs adapter. | "Start with {operator}" button enabled on tasks in the desktop popup. |
| 5 | **Desktop → Claude** | Opens `//start`. Selects the first task. Clicks "Start with Claude." | Claude opens with full context pre-loaded: project phase, archetype, prior decisions, next prescribed Explore method. Dora is the active operator. |
| 6 | **Claude** | Works through the session — Dora guides the Explore method. | Dora records decisions, updates stream progress. User works naturally, session captured in the background. |
| 7 | **Background → Desktop** | Closes Claude when done. | Echo captures session. Guard scans for GDPR flags. Ollama summarizes. Node Map updates within 10 seconds — dot grows, brief auto-generated. Desktop popup badge updates. |
| 8 | **Web app — Node Map** | Opens web app to check what happened. | Dot is larger. Right pane shows updated stream progress (e.g., 2/4 Explore methods done), latest brief, decision trail populated. |
| 9 | **Desktop** | Next day. Opens `//start`. | Popup shows task list with stream progress. Next prescribed method shown. Picks up mid-thought — no re-briefing. |
| 10 | **Desktop → Claude** | Selects next task. All Explore methods done after this session. | Dora emits `<fish-handoff>` to Solidify. Guard validates. Apex queues Sol. |
| 11 | **Web app — Snapshot** | Opens Snapshot view after the session. | Context card now in Solidify column. Stream progress reset for Solidify phase. Sol's prescribed methods shown. Dot on Node Map shifts to purple (Solidify). |

**Key moments:** First dot on the Node Map (activation). Opening the web app after a session and seeing the dot grow (proof the system is working). `//start` picking up mid-thought the next day (retention). Card advancing to Solidify without a meeting (methodology running).

---

### Journey 2 — Manager / Studio Lead: Project Visibility

**Persona:** Studio director or design lead. Does not run sessions. Needs project visibility without interrupting the team.

| Step | Surface | Action | System Response |
|---|---|---|---|
| 1 | **Web app — Node Map** | Receives invite link. Opens web app. | Lands on Node Map — full project arc visible. Dots in various phases and sizes. Reads the shape of the work at a glance. |
| 2 | **Web app — Node Map** | Clicks a dot in the Solidify cluster. | Right pane opens: Brief (AI-generated summary of decisions), Tasks, Reasoning (full decision trail). Reads the decision log without calling anyone. |
| 3 | **Web app — Snapshot** | Switches to Snapshot view to read team signal. | Four-column board. Signal strip: "→ 3 at exit" (yellow), "✕ 1 blocked" (red). Immediately knows what needs attention. |
| 4 | **Web app — Snapshot** | Clicks blocked chip. Card highlights. Clicks the card. | Drill-down Drawer: blocker description, last handoff with locked decisions and open items, decision log, session history (who worked, when, which tool). No Slack required. |
| 5 | **Web app — Snapshot** | Clicks [Recipe ▸] toggle. | Recipe Panel: archetype × phase matrix. Sees which methods have been run across all contexts vs which are still pending. Answers "are we following the process?" without asking the team. |
| 6 | **Web app — Node Map** | Switches back to Node Map to prepare for a client call. | Map gives the full arc in one view — phases, consolidation, project shape. |
| 7 | **Web app — Node Map + Snapshot** | Shares screen. Walks client through the project. Clicks into nodes for depth. | Node Map gives the arc. Right pane shows decisions. Snapshot gives methodology signal. Full process trail visible without a report or meeting. |

**Key moments:** Node Map loading with live project state (trust moment). Signal strip showing blocked + at-exit without digging (urgency moment). Drill-down decision log for the client — no prep required (deal moment).

---

### Journey 3 — Onboarding a New Team Member

**Persona:** Junior designer joining a studio mid-project.

| Step | Surface | Action | System Response |
|---|---|---|---|
| 1 | **Desktop** | Downloads macOS app. Admin sends invite. | App installed. Team workspace joined. All contexts and tasks already populated from team sync — no setup. |
| 2 | **Web app — Node Map** | Opens web app to understand the project before touching anything. | Lands on Node Map. Sees which contexts exist, which phases they're in, how consolidated each is. Gets the picture in under a minute without a briefing meeting. |
| 3 | **Web app — Snapshot** | Switches to Snapshot to find their assigned work and understand what to do. | Sees context cards. Recipe panel shows what's prescribed for the project's archetype. Knows what the team is supposed to be doing and what methods are next. |
| 4 | **Desktop** | Opens `//start`. Sees tasks assigned to them. Selects one. | Task detail shows context name, phase, next prescribed method, "Start with {operator}" CTA. |
| 5 | **Desktop → Claude** | Clicks "Start with Claude." | Context injected: project phase, archetype, prior decisions, current prescribed method. Starts contributing immediately — no catch-up conversation, no re-briefing. |
| 6 | **Web app — Node Map** | After the session, opens web app to see what changed. | Their dot has grown. Right pane shows their session summarized in the brief. They can see exactly where they fit in the project. |

---

### Journey 4 — Running a Fish Phase with an Operator Agent

**Persona:** Senior designer running the Solidify phase for a Salmon context (unknown problem, small scope). Three of six Solidify methods done.

| Step | Surface | Action | System Response |
|---|---|---|---|
| 1 | **Web app — Node Map** | Opens web app. Clicks the Salmon context dot in the Solidify area. | Right pane: stream progress 3/6, next prescribed method "One Sketch," confidence chip 0.71 (yellow — below advance threshold). |
| 2 | **Web app — Snapshot** | Switches to Snapshot to see the full card before starting. | Card: Sol is active operator, 3/6 done, last handoff exists but confidence too low to advance. Decides to run the remaining methods. |
| 3 | **Desktop** | Opens `//start`. Selects the Salmon context. Task detail: "Run: One Sketch — Sol." | Context pre-loaded in popup: archetype, phase, prior 3 methods, locked HMW framing, problem statement, AC placeholders. |
| 4 | **Desktop → Claude** | Clicks "Start with Sol." | Claude opens. Sol context injected: full prior session history, locked decisions, stream state, prescribed next steps. |
| 5 | **Claude** | Sol surfaces 3 sketch directions from the framing. User picks one and refines it. | Sol records the decision with rationale. Stream: 4/6. |
| 6 | **Claude** | Sol moves to AC Writing. Drafts 3–5 ACs from the chosen direction. | User approves 4, edits 1. Sol locks the ACs. Stream: 5/6. |
| 7 | **Claude → Background** | Closes Claude. | Sol checks stream — all 6 done. Emits `<fish-handoff>` to Build: locked decisions, open items, confidence 0.89. Guard scans — no CRITICAL flags. Echo pushes session to cloud within 60 seconds. |
| 8 | **Web app — Snapshot** | Opens Snapshot view to confirm the advance. | Solidify card now in `at-exit` state (yellow border). Apex has queued Build dispatch. Bran is next active operator. Dot on Node Map has shifted to blue (Build). Manager sees the same update — no notification sent. |

**Key moments:** Clicking the dot on the Node Map and reading stream progress before starting (context injection working). Sol running prescribed methods in Claude (methodology embodiment). Opening Snapshot after the session and seeing the card advance phases — no meeting, no Slack message (async handoff proof).

---

## Domain Requirements

### Data Privacy & GDPR

- All context data stored locally by default; nothing leaves the device without explicit user-initiated push consent.
- Cloud sync requires one-time opt-in per device; consent is re-confirmable and revocable at any time.
- User data deletion requests completed within 30 days; full data export available on demand in `.zip` format.
- Team sync logs include actor, timestamp, and action type for audit trail; accessible to team admins.
- No session content sent to third-party analytics services; only anonymized usage telemetry (opt-out available).

### Local-First Architecture

- Desktop app operates fully offline; `//` flow, Ollama inference, and context access function without internet.
- Cloud sync is additive — app degrades gracefully to local-only mode when sync is unavailable.
- Ollama model downloaded once; subsequent inference requires no network calls.

### macOS Platform

- Minimum macOS 13 (Ventura). Notarized + signed by Apple Developer ID at V1 launch.
- Menu bar app pattern: no Dock icon by default; accessible via menu bar icon or global `//` hotkey.
- Ollama bundled or auto-installed as dependency during onboarding; user prompted if not present.
- No background processes that require MDM approval — capture is intent-triggered, not ambient.

### B2B Multi-Tenant

- Each team workspace is isolated; cross-workspace data access is not possible.
- Role-based access: Individual (personal contexts only), Admin (all team contexts + user management).
- Billing at team level; seat counts managed by Admin role.

---

## Functional Requirements

### Desktop App

| ID | Requirement |
|---|---|
| FR-D1 | `//` hotkey activates context popup within 500ms of keypress when Ollama is loaded. |
| FR-D2 | Onboarding flow: user describes project in natural language → Ollama generates 3–5 contexts + task list locally, no external API required. |
| FR-D3 | Task popup groups active tasks by project; each task shows context name, phase, and last-touched timestamp. |
| FR-D4 | "Start with Claude" button opens Claude Desktop with the task's context injected as the opening prompt. |
| FR-D5 | Background sync daemon pulls from cloud on app open and pushes updated nodes within 60 seconds of session completion; does not block `//` execution. |
| FR-D6 | After session ends, node on map updated within 10 seconds; brief auto-generated from session summary. |
| FR-D7 | Context `.md` file copyable to clipboard from task detail view in one action. |
| FR-D8 | App runs as macOS menu bar process; accessible system-wide without a dedicated window. |
| FR-D9 | Adapter installer: one-click setup for each supported host tool (Claude, Cursor, VS Code). |

### Web App

| ID | Requirement |
|---|---|
| FR-W1 | Node Map renders all project contexts as dots on an interactive canvas; dot size maps to consolidation score (1–10); dot color maps to phase (Explore / Solidify / Build / Ship). Pan and zoom via trackpad gestures. |
| FR-W1b | Hovering a dot for 300ms shows a tooltip card: context name, phase badge, archetype pill, and a quick "Open detail →" link. |
| FR-W2 | Selecting a context dot opens the right pane with tabs: Artifact, Brief, Tasks (human + agent), Reasoning, Context `.md`; map remains navigable while pane is open. |
| FR-W3 | Snapshot view renders the Fish-model-bound board: four phase columns (Explore, Solidify, Build, Ship); each context appears as a card in its current phase column; card shows archetype pill, status icon, context name, sigil chip, stream progress bar, next prescribed method, handoff confidence chip, and footer (date, locked artifact count, open items count, and one-line session activity). |
| FR-W3b | Project switcher at top-left of Snapshot view renders one project's board at a time; "all projects" toggle shows compact multi-project summary row with phase counts and blocked indicators per project. |
| FR-W3c | Signal strip below the project switcher row renders chips for active board signals: `✕ N blocked` (red), `→ N at exit` (yellow), `⏸ N stuck` (grey); clicking a chip dims non-matching cards to 30% opacity; clicking again clears the filter. |
| FR-W3d | Clicking a card in Snapshot view opens the Drill-down Drawer with seven scrollable sections: (1) stream progress / recipe checklist, (2) handoff block, (3) artifacts, (4) decision log, (5) session history, (6) tasks with checkboxes, (7) sticky forward-action CTA bar. |
| FR-W3e | Hovering a card for 150ms expands it inline to reveal last session summary (one line, quoted) + quick actions: "→ Run next method", "Review handoff", "Resolve blocker", "Set as active". |
| FR-W4 | Connectors page displays live status (active / inactive) and settings for each integration; status updates within 60 seconds of connection state change. |
| FR-W5 | Team page supports user invite by email, role assignment (Individual / Admin), and seat removal. |
| FR-W6 | Artifacts gallery (V1.5) shows all deliverable outputs across all projects with hover preview; filterable by project and phase. |
| FR-W7 | Brief auto-generates from session data (objective, plan, key decisions); updates within 60 seconds of session sync; no user input required. |
| FR-W8 | Floating priority surface (V1.5) suggests the top 2 highest-priority items across active contexts; dismissible per item. |
| FR-W9 | Recipe Panel (collapsible right sidebar on Snapshot view): shows archetype × phase method matrix (4×4 grid) for the current project; methods run across the project shown at higher opacity; cell click expands to full method list with source/lineage; archetype badges filter the board to that archetype. |
| FR-W10 | Agents Panel shows the three-tier agent system (T0 — Orchestrators: Apex, Guard; T1 — Sync: Echo, Prism; T2 — Operators: Dora, Sol, Bran, May) plus the shared exit-gate utilities HO (handoff-compose) and HB (handback-compose); active phase highlighted in phase color; active operator banner shown when active context has a known phase. |

### Shared

| ID | Requirement |
|---|---|
| FR-S1 | New context created from natural-language description; AI generates initial brief and task list. |
| FR-S2 | Context phase (Explore → Solidify → Build → Deliver) updated by AI based on session activity; user can manually override. |
| FR-S3 | Node write: dedup check on contextId + sessionHash before creating entry; write is non-blocking (does not delay `//` execution). |
| FR-S4 | Per-host adapter interface: Claude Desktop, Cursor, and VS Code each inject context at session start via host-specific mechanism. |

---

## Non-Functional Requirements

### Performance

| ID | Requirement |
|---|---|
| NFR-P1 | `//` popup renders within 500ms on a loaded system (Ollama already running); measured from hotkey press to popup visible. |
| NFR-P2 | Node map loads within 2 seconds for projects with up to 200 context nodes; measured from page load to interactive. |
| NFR-P3 | Background sync completes within 60 seconds of session completion under normal network conditions (≥10 Mbps). |
| NFR-P4 | Context injection adds no more than 3 seconds to host tool startup time; measured from "Start with Claude" click to Claude window open with context loaded. |
| NFR-P5 | Ollama onboarding inference (first context generation) completes within 30 seconds on Apple Silicon (M1 or newer). |

### Security & Privacy

| ID | Requirement |
|---|---|
| NFR-SEC1 | No session content leaves the device without explicit user-initiated push consent; verified by local-only default config. |
| NFR-SEC2 | Cloud sync uses TLS 1.3 in transit; data at rest encrypted with AES-256 via Supabase storage defaults. |
| NFR-SEC3 | GDPR data deletion request fulfilled within 30 days; data export available in `.zip` format on demand via web app. |
| NFR-SEC4 | macOS app notarized and signed by Apple Developer ID; Gatekeeper compliant at V1 launch. |
| NFR-SEC5 | No ambient capture; all context capture is intent-triggered (`//` hotkey or explicit app open). |

### Reliability

| ID | Requirement |
|---|---|
| NFR-R1 | Desktop app operates fully offline; `//` flow, Ollama inference, and local context access function without internet connection. |
| NFR-R2 | Web app achieves 99.5% uptime during business hours (Mon–Fri, 08:00–22:00 user's local time) as measured by cloud provider SLA. |
| NFR-R3 | Background sync failure does not block `//` execution; local state remains usable and sync retries automatically. |

### Scalability

| ID | Requirement |
|---|---|
| NFR-SC1 | Web app supports up to 100 concurrent users per team workspace at V1 launch. |
| NFR-SC2 | Web app scales to 1,000 concurrent users per team via horizontal scaling at V1.5 launch. |
| NFR-SC3 | Node map renders projects with up to 500 context nodes without pagination; beyond 500, virtual rendering applied. |

---

## Technical Architecture

### Two-Runtime Model

**Runtime 1 — Desktop (local):**
- macOS app (Electron or Tauri TBD by M1 tech spike).
- Ollama runs on-device; handles onboarding context generation and task generation. Not used for live AI sessions.
- Local state: SQLite database stores contexts, tasks, session summaries, and sync state.
- `//` hotkey registered system-wide; activates context popup UI.
- Background sync daemon: pulls from Supabase cloud on app open; pushes node updates within 60 seconds of session completion; operates off the main thread.
- Per-host adapter interface: each adapter (Claude, Cursor, VS Code) implements a common `inject(context: string)` interface via host-specific mechanism (clipboard, `.cursorrules`, VS Code extension API).

**Runtime 2 — Web App (cloud):**
- Next.js frontend, deployed on Vercel.
- Supabase backend: Postgres (contexts, nodes, artifacts, sessions, team), Supabase Auth (email + magic link), Supabase Storage (artifacts, context `.md` files), Supabase Realtime (live node map updates).
- Source of truth for all project state; desktop app syncs to/from this.
- No install required; managers and stakeholders access via browser.

### Data Flow

```
User types //start
  → Desktop popup reads local SQLite
  → User selects task
  → Adapter injects context into host tool
  → AI session runs (Claude / Cursor / VS Code)
  → Session ends
  → Background daemon: Ollama summarizes session
  → Dedup check (contextId + sessionHash) against local SQLite
  → Write to local SQLite (non-blocking)
  → Push to Supabase cloud (async, within 60s)
  → Node map updates via Supabase Realtime
```

### Auth Model

- Desktop: optional auth. Local-only mode requires no account. Team sync requires Supabase auth.
- Web: required. Supabase Auth — email + magic link at V1; SSO (Google, GitHub) at V1.5.
- Sessions: JWT stored securely in macOS Keychain (desktop) and HTTP-only cookie (web).

### Adapter Interface

Each host adapter implements:
```
interface ContextAdapter {
  name: string           // e.g. "claude", "cursor", "vscode"
  inject(context: string): Promise<void>
  isAvailable(): boolean
}
```
Adapters are loaded at runtime; new adapters can be added without app update (plugin architecture at V1.5).

---

## UI/UX Requirements

### Node Map (Primary View)

The Node Map is the primary surface for everyone — individual contributors, managers, and new team members. It is the landing view when the web app opens.

- **Canvas:** Interactive graph. Pan and zoom with trackpad gestures. No fixed layout — nodes position organically based on phase and recency.
- **Dot encoding:** Each context = one dot. Dot size: consolidation score 1–10 (derived from session count + brief completeness). Dot color: Explore = warm orange, Solidify = purple, Build = blue, Ship = teal.
- **Selection:** Clicking a dot selects it and opens the right pane. Map remains navigable while the pane is open.
- **Hover tooltip (300ms dwell):** Context name, phase badge, archetype pill, and "Open detail →" quick link. Dismisses on mouse-out.
- **Empty state:** Ghost/faded map overlay with "Start your first context" CTA centered on canvas.
- **Floating priority surface (V1.5):** Two most-important items float mid-canvas as dismissible cards, surfaced by Apex.

### Right Pane (Context Detail)

Opens when a dot is selected on the Node Map. The map stays interactive behind it.

- **Tab layout:** **Artifact** | **Brief** | **Tasks** | **Reasoning** | **Context**
- **Artifact tab:** The one deliverable output for this context. Editable. Version history in V1.5.
- **Brief tab:** AI-generated summary — objective, current plan, key decisions. Read-only. Refresh button triggers re-generation from latest session data.
- **Tasks tab:** Two sub-sections — Human tasks (checkbox list) and Agent tasks (checkbox list + "Start with {operator}" button). Shows stream progress bar and next prescribed method.
- **Reasoning tab:** Decision trail — timestamped entries of decisions made and why, auto-populated from session summaries.
- **Context tab:** The `.md` file the AI loads at session start. Copyable to clipboard in one click. Read-only in-pane (editable via desktop app).

### Snapshot View (Team Visibility Surface)

The Snapshot view surfaces what is running now — primarily for managers, but accessible to all. It is the Fish-model-bound board from the methodology, made live. Full component spec: `planning/ux/kanban-prd.md`.

- **Layout:** Four equal-width columns: Explore | Solidify | Build | Ship. Each column scrolls independently. Column headers are sticky.
- **Project switcher:** Compact dropdown at top-left. Renders one project's board at a time. "All projects" toggle collapses to a compact multi-project summary row (one row per project with phase counts and blocked indicators).
- **Signal strip:** Below the project switcher. Only rendered when signals are active. Chips: `✕ N blocked` (red), `→ N at exit` (yellow), `⏸ N stuck` (grey). Clicking a chip dims non-matching cards to 30% opacity. Click again to clear.
- **Column header:** Sticky. Phase icon + label + card count. Blocked badge (`✕N`, red) and at-exit badge (`→N`, yellow) if any cards in the column carry those states.
- **Card anatomy (always visible):** Archetype pill (N/T/S/W), status icon (pulsing dot = active, `✕` = blocked, `→` = at-exit), context name, sigil chip (certainty · size), stream progress bar (phase-colored, N/M), next prescribed method (`→ {method name}`), handoff confidence chip (`conf: 0.X`, color-coded), footer (date + locked artifact count + open items count + one-line session summary).
- **Card hover (150ms):** Expands ~48px. Reveals last session summary (quoted) + quick actions: "→ Run next method", "Review handoff", "Resolve blocker", "Set as active".
- **Card click:** Opens Drill-down Drawer.
- **Empty state:** Ghost columns with "Start a session with // in any tool" CTA.

### Drill-down Drawer (Snapshot View)

Right-side drawer triggered by clicking a card in the Snapshot view. Seven scrollable sections:

1. **Recipe** — Stream checklist for the context's archetype × phase: done (✓), in-progress (●), pending (○), deferred (— + reason). Budget estimate (time range for this archetype × phase).
2. **Handoff** — Locked decisions (bordered chips), open items (yellow, checkbox-resolvable), confidence score (color-coded), artifact paths, emitter/receiver. If no handoff: "No handoff yet."
3. **Artifacts** — Two-column grid grouped by phase bucket (research / framing / strategy / brief / design / validation / measurement / learning / handoff). Status badges: ✓ locked / ● draft / ○ not started.
4. **Decision log** — Timestamped list: date, decision text, author. Empty state: "No decisions logged."
5. **Session history** — Compact list: date · tool · model, one-line session summary. Most recent first.
6. **Tasks** — Full task list with checkboxes. Agent chip row below (agents that have worked on this context).
7. **Forward action (sticky bottom bar):** "→ Continue in {tool}" / "→ Advance to {next phase}" / "Resolve blocker" / "→ Emit handoff" — CTA changes based on context state.

### Recipe Panel (Snapshot View)

Collapsible right sidebar on the Snapshot view. Collapsed by default. Toggled via `[Recipe ▸]` in the view header.

- **Archetype summary row:** N/T/S/W badges showing count of contexts per archetype in the current project. Clicking filters the board to that archetype.
- **Matrix:** 4×4 grid — Phase × Archetype. Each cell shows prescribed methods (truncated, expandable on click). Methods run across any context in this project appear brighter; unrun methods dim.
- **Cell click:** Expands inline — full method list with source/lineage and archetype applicability.
- **Read-only.** The recipe is canonical — derived from `fish-model.md §6`.

### Agents Panel

Accessible via left sidebar icon.

- **Phase strip:** Four-phase pipeline (Explore → Solidify → Build → Ship) at top. Active phase highlighted.
- **Active operator banner:** When an active context has a known phase, shows the phase-matched Tier-2 operator (name, icon, invocation code) with a pulsing accent dot.
- **Tier rows:**
  - **T0 — Orchestrators:** Apex (`//apex`), Guard (`//guard`)
  - **T1 — Sync:** Echo (`//echo`), Prism (`//prism`)
  - **T2 — Operators:** Dora — Explore (`//explore`), Sol — Solidify (`//solidify`), Bran — Build (`//build`), May — Ship (`//ship`)
- **Agent card:** Name, icon, tagline, model badge (haiku / sonnet), capability codes (full label on hover), invocation.
- **Exit gates:** `HO (handoff-compose)` + `HB (handback-compose)` — Haiku-run, schema-enforced utilities that operators call at every forward/reverse phase transition. Not directly invocable; run through the calling operator's voice. HO enforces method coverage and writes the `<FLOW-handoff>` block to disk. HB enforces a named gap + preservation list before any reverse transition.
- **Coordination note:** "Apex routes every HO through Guard before emit. Echo captures sessions. Prism surfaces cross-context patterns. Opus is forbidden — Sonnet is the ceiling."

### Menu-Bar Popup (Desktop)

- Three states:
  1. **Task list:** Tasks grouped by project, sorted by priority. Each row: task name, context name, phase badge, archetype pill.
  2. **Task detail:** Full task card — objective, context name, next prescribed method from stream, "Start with {operator}" CTA, "Copy context" secondary action.
  3. **Inline context preview:** Expandable `.md` preview below task detail.
- Keyboard-navigable (arrow keys + Enter to select; Escape to close).
- Always-on-top floating window; closes on click-outside.

### Connectors Page

- One row per integration. Columns: name, status indicator (green active / red inactive / grey not configured), last-synced timestamp, settings icon.
- Settings drawer (slides in from right): connection credentials, sync frequency, test connection button.

### General UI Principles

- Dark mode by default; light mode toggle in profile settings.
- Monospace font for: context `.md` previews, Reasoning entries, method names, capability codes, invocation codes, all `text-[8px]–text-[10px]` labels.
- Phase colors: Explore (`ds-explore` — warm orange), Solidify (`ds-solidify` — purple), Build (`ds-build` — blue), Ship (`ds-ship` — teal).
- Archetype colors derived from phase colors: Nemo = Ship/teal, Tuna = Solidify/purple, Salmon = Explore/orange, Willy = Build/blue.
- Motion: card hover expansion 150ms, drawer slide-in 200ms, signal strip filter 150ms. No other animation.
- All destructive actions (delete context, remove team member) require explicit confirmation dialog.

---

## Integrations

### V1 — Sep 2026

| Integration | Mechanism | What syncs |
|---|---|---|
| **Claude Desktop** | Clipboard injection + AppleScript keyboard automation | Context `.md` injected as opening prompt |
| **Cursor** | `.cursorrules` file write + workspace reload | Context `.md` written to project root before session |
| **VS Code** | Extension API — `vscode.workspace.openTextDocument` + `vscode.window.showTextDocument` | Context `.md` opened as active editor context |

All three adapters implement the common `ContextAdapter` interface. Adapter state (connected / disconnected) surfaces on Connectors page.

### V1.5 — Nov 2026

| Integration | Mechanism | What syncs |
|---|---|---|
| **Figma** | Figma Plugin API | Artifact outputs (frames, specs) synced to context Artifact tab |
| **GitHub** | GitHub REST API + webhooks | Commit and PR activity synced to context session timeline |
| **Jira / Linear** | REST API | Task status bidirectional sync — DubleSlash tasks ↔ Jira/Linear tickets |
| **ChatGPT Desktop** | Clipboard injection (same as Claude) | Context `.md` injected as opening prompt |
| **Daily digest** | Supabase scheduled function + email (Resend) | Daily summary: activity since yesterday, top 3 next tasks, open decisions |

### Out of Scope (V1 + V1.5)

- Slack: read-only message search for decision capture — V2 consideration.
- Notion / Confluence: export of briefs + artifacts — V2 consideration.
- Microsoft Teams / Office: enterprise connector — post-Series A.

---

## Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Enterprise MDM blocks unsigned macOS app — studios on managed devices can't install. | Medium | High | Notarized + Apple Developer ID signed at V1 launch. Web-only fallback path for restricted environments. |
| R2 | Ollama model quality insufficient for context generation — generated contexts are vague or wrong. | Medium | High | Pre-launch test with Llama 3.1 8B + Mistral 7B. Claude API fallback for onboarding if Ollama quality score < threshold. Quality gate: user rates first-generated contexts in onboarding; <3/5 triggers fallback. |
| R3 | Users don't form `//` habit — app installed but not used daily. | Medium | High | 7-day onboarding sequence with daily nudge notifications. In-app streak tracker visible in menu bar popup. "Last session" reminder at `//` open if >48h since last use. |
| R4 | Context injection breaks when host tool updates (Claude Desktop, Cursor, VS Code release new versions). | High | Medium | Per-host adapter abstraction isolates breakage. Adapter integration test suite runs on each host tool release. Out-of-band adapter update channel (no app store review required). |
| R5 | GDPR consent friction reduces team sync adoption — users opt out of sync to avoid consent flow. | Low | Medium | One-time bulk consent at team onboarding covers all sync actions. Explicit data preview screen before first sync shows exactly what will be uploaded. Admin can set workspace-level sync policy. |
| R6 | Supabase Realtime latency causes node map to feel stale — managers see outdated project state. | Low | Low | Optimistic local update on write; Realtime subscription for live corrections. Manual refresh button always available. |
