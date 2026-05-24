# DS Production Spec
**Version**: 1.0 · 2026-05-24  
**For**: Shenhav — Design & Engineering Handoff  
**Status**: In progress — use this as the source of truth for all design and engineering decisions

---

## 1. What DS Is

**One sentence**: DS is the onboarding layer for AI use — a system-wide `//` trigger that gives anyone access to expert-level skills without replacing their existing tools.

**What it does:**
1. **Skills** — executable expert workflows you invoke with `/`. Each skill produces a real output: a PRD, a competitor analysis, a GTM plan, a design brief. The skill picks the right method, runs it, and writes the output to shared memory.
2. **Loops** — tasks that run automatically on a schedule. Weekly digest, daily standup, post-deploy review — set it once, DS runs it.
3. **The `//` trigger** — press `//` from anywhere on your desktop. DS opens. Your project context is already loaded.

**What it is NOT**: another chat interface, another AI model, a replacement for Claude/Figma/Jira. DS sits on top of your existing tools and connects them.

**The three things that make DS different:**
- Leader-driven: DS names what to do next. You confirm. No prompting required.
- Reflectional: Every run is captured in Kanban + Node Map. Zero admin overhead.
- Methodology-first: DS knows the Double Diamond. It picks the right method for the right moment — automatically.

---

## 2. User Journey — Full Flow

### 2.1 Download & Website
**What the user sees**: Landing page. Hero: *"Eliminate the distance between 'I have an idea' and 'it's live.'"*  
**Sub-line**: *"DS gives your AI the workflow it was missing — not a better model, the structure that makes it behave like one."*  
**CTA**: "Download DS" (Mac first, Windows roadmap)  
**User emotion**: Curious → "This is what AI was missing"

---

### 2.2 Install Experience
**Trigger**: User runs the DS installer (`.dmg` or `install.sh`)

**What the installer does — in order:**

**Step 1 — Tool Detection**  
DS scans the system for installed AI tools:
- Claude Desktop (`~/Library/Application Support/Claude/`)
- VSCode + Claude Code extension
- Cursor
- ChatGPT Desktop (if present)

**Step 2 — Onboarding Wizard (UI)**  
The installer shows a wizard screen:
```
"DS found these AI tools on your computer:
  ✓ Claude Desktop
  ✓ VSCode + Claude Code
  ○ Cursor (not found)

DS will install itself into each one. This takes under 30 seconds."
[Continue →]
```

**Step 3 — Root File Drop (per tool)**  
For each detected tool, DS writes its root files:

| File | Purpose |
|---|---|
| `CLAUDE.md` | DS identity + session rules — auto-loaded by Claude Code |
| `.claude/settings.json` | Hooks that wire DS into every session |
| `.claude/skills/` | Full skill registry (21 domains, ~210 skills) |
| `memory.md` | Living project memory |
| `kanban.md` | Seeded empty Kanban |
| `node-map.md` | Seeded empty Node Map |
| `decisionlog.md` | Seeded empty decision log |

**Step 4 — MCP Install (see §5)**  
DS presents a one-click MCP installer. User selects which connectors to add. DS configures them automatically.

**Step 5 — System Registration**  
DS registers:
- The `//` keyboard shortcut at OS level (macOS: Accessibility API)
- The DS Pill in the menu bar
- The `/` slash commands in Claude Code

**Step 6 — Done Screen**  
```
"// is ready.

Your AI tools are connected. Open Claude to start your first project.
DS will greet you and ask what you're working on.

Press // anytime to return here."
[Open Claude →]
```
**User emotion**: Hopeful → "It's already in Claude. I didn't have to do anything."

---

### 2.3 First Open — The WOW Moment

**Context**: User opens Claude Desktop or Claude Code for the first time after install.

**What happens automatically (no user action required):**

1. `CLAUDE.md` is loaded by Claude → DS identity activates
2. DS Session Start hook fires → reads memory.md, kanban.md, node-map.md
3. DS recognizes this is the first session (empty project state)
4. DS runs Project Intake Protocol (§3.4)

**What the user sees:**

```
// is ON.

New project. I need 30 seconds of context to get started.
What are you working on — and what's the hardest part right now?
```

*This is the only time DS asks the user a question unprompted. After intake, DS leads.*

**After the user answers:**

DS responds with:
1. FISH classification (out loud): *"This is a Salmon — new problem space, small team. We run the full Problem Diamond before building anything."*
2. Proposed process: which Diamond phases, which methods, what done looks like
3. Kanban seeded with phase tasks
4. Node Map seeded with intake node
5. First move named: *"Discover → Run 5 user interviews using JTBD framework. I'll write your interview guide now. Ready?"*

**User emotion**: Delighted → "The WOW moment — it just works, instantly, from the first open."

---

### 2.4 Desktop Mode — The // Shortcut

**Trigger**: User presses `//` keyboard shortcut from any app, any window.

**Flow:**

1. **DS Pill lights up** in the menu bar — visual confirmation the shortcut was intercepted
2. **Kanban opens** — all projects visible, sorted by last active
3. **Each project card shows**: project name · current phase · last activity date · active tasks count
4. **Node Map** is accessible per project (toggle or sidebar)

**Two states:**

**A — No projects yet:**
```
[+ New Project]
Name it, pick your AI tool (Claude by default), DS opens it and runs Intake.
```

**B — Projects exist:**
User selects a project → selects a task card → AI opens with full context injected (memory + decisions + current phase + task brief).

**User emotion**: In control → "One shortcut from anywhere. Full project context always one press away."

---

### 2.5 Agent Mode — In-Session

**Context**: User is in Claude (Desktop or Code). DS is always present — no invocation needed.

**Every session, DS does this automatically:**

1. **Loads context** — memory.md, kanban.md, node-map.md, decisionlog.md, project brief
2. **Runs Phase Gate** — confirms which Diamond phase this project is in and whether the prior phase is complete
3. **Names one next move** — not a menu, not options. One specific action:
   *"[Phase] → [What]. [Why now — one sentence]. Ready?"*
4. **User confirms** → skill runs, full project context injected
5. **Output is rendered inline** — formatted, cited, ready to act on
6. **Memory + Kanban + Node Map updated automatically** — zero admin

**The escape hatch (power user):**
User can type `/` at any point to see the full skills picker and choose a different direction. This is not the default — DS leads.

**User emotion**: Capable → "Expert-level output from a single command. No prompting required."

---

### 2.6 Daily Use Loop

**What the user experiences:**
- Every session starts with orientation: where we are, what's open, one next move
- Every task run is logged automatically — they never lose context
- Loops run in the background (weekly digest, scheduled runs)
- Kanban reflects real state — they can see what's happening across all projects
- Node Map shows the history — every decision, every artifact, every direction considered

**What runs without the user doing anything:**
- Weekly digest: every Monday 9am — "What changed / What's blocked / What needs a decision"
- On-change scans: when a key file changes, DS detects drift and surfaces it next session
- Post-session reflection: DS scores its own output, updates its model of the project

**User emotion**: In flow → "Zero admin overhead. The team always knows what's happening."

---

## 3. Session Methodology

### 3.1 Every Session: What DS Does

DS runs this loop every session, in order. It cannot be skipped.

```
1. Load context (memory, kanban, node-map, decisionlog, brief)
2. Run Phase Gate (which Diamond phase? prior phase complete?)
3. Retrieve episodic context (3 most similar past sessions — for context)
4. Scan for drift (stale files, missing artifacts, broken loops)
5. Compose orientation (current state in 1-3 sentences)
6. Name one next move ([Phase] → [What]. [Why]. Ready?)
7. Critique pass (is this actionable? cited? non-obvious?)
8. Deliver orientation + move + confirmation ask
9. On confirmation: execute (invoke skill, run method, produce output)
10. Write session state (node-map node, kanban update, memory update)
```

**Session open format (always):**
```
// is ON. Here's where things are:
[1-3 sentences on current state]

[Phase] → [What]. [Why now]. Ready?
```

**Footer on every response:**
```
→ /skill-name — one-line reason it applies now
```

---

### 3.2 FISH Classification

DS classifies every project at intake. Classification is stated out loud and never hidden.

| Fish | Familiarity | Scope | What DS does |
|---|---|---|---|
| **Nemo** | High | Small | Runs discovery autonomously. Short arc. Prototype → ship. |
| **Tuna** | High | Large | Deeper autonomous research. User stories required. Figma optional. |
| **Salmon** | Low | Small | Designs research process, directs user to talk to real people. Full Problem Diamond. |
| **Willy** | Low | Large | Multi-stakeholder engagement. Multiple people, multiple rounds. Full both diamonds. |

**Rule**: DS does not let a Willy become a Nemo because the team wants to move fast. DS names the fish and holds the classification.

---

### 3.3 Phase Gate

Before producing any output, DS asks:
1. What Double Diamond phase is this in?
2. Has the prior phase met its completion criteria?

If no → DS does not advance. DS names the gap and closes it first.

**Completion criteria by phase:**

| Phase | Done when... |
|---|---|
| Discover | User research complete, key themes documented, problem space defined |
| Define | Problem statement + POV written, north star metric set, HMW framing done |
| Develop | Solution concepts generated and evaluated, prototype or spec agreed |
| Deliver | Shipped, tested, metrics baseline set |

---

### 3.4 Project Intake Protocol

Runs once per new project. Produces: FISH classification, Diamond process, seeded Kanban, seeded Node Map, first move named.

**Output format (spoken):**
```
This is a [Fish]. [Familiarity + scope in one sentence].

Here's the process:
  Discover → [method 1], [method 2] — done when [exit condition]
  Define → [method] — done when [exit condition]
  Develop → [method] — done when [exit condition]
  Deliver → [method] — done when [exit condition]

Node Map and Kanban are seeded. First move: [specific task].
I'll [what DS does]. You [what user does]. Ready?
```

---

### 3.5 Skill Invocation

**When DS invokes a skill:**
1. DS selects the skill from its registry (not the user)
2. DS injects full project context into the skill's execution
3. Skill runs, produces output
4. Output is written to shared memory
5. Kanban and Node Map are updated

**When the user invokes a skill (escape hatch):**
1. User types `/` → skills picker appears
2. User picks a skill → DS injects context and runs it
3. Same output + update flow as above

**Skill invocation convention:**
- Domain menus: `/ds-product`, `/ds-engineering`, `/ds-ux-design`
- Individual skills: `/ds-product-customer-discovery`, `/ds-engineering-code-review`
- In conversation (no picker): just type the skill name — DS fuzzy-matches

---

## 4. Skills Architecture

### 4.1 Structure

Every skill lives in a folder with two files:

```
skills/
  {domain}/
    SKILL.md            ← domain menu (lists all 8 skills in that domain)
    discover/
      {skill-name}/
        SKILL.md        ← skill definition (method + execution prompt)
        config.json     ← metadata (name, tags, model, FISH applicability)
    define/
    develop/
    deliver/
```

**Current state**: 21 domain folders, ~210 SKILL.md files in `.claude/skills/`.

---

### 4.2 Naming Convention (locked)

| Level | Format | Example |
|---|---|---|
| Domain | `ds-{domain}` | `ds-product` |
| Skill | `ds-{domain}-{skill}` | `ds-product-customer-discovery` |

The `ds-` prefix is always present. The `/` picker in Claude Code registers these names.

---

### 4.3 Skill File Format

**SKILL.md (individual skill):**
```markdown
---
name: ds-product-customer-discovery
description: Surface real user problems through interviews, JTBD, and empathy mapping
tags: [product, discover, research, jtbd]
model: inherit
fish: [salmon, willy, tuna]
phase: discover
---

# Customer Discovery

## When to use
[FISH classification that triggers this skill]

## Method
[The actual methodology — what this skill does, step by step]

## Execution Prompt
[The prompt that runs when this skill is invoked — written at mastermind level]

## Output Format
[What the user receives — format, sections, length]

## FISH Guide
| Fish | Depth | What changes |
|---|---|---|
| Nemo | ... | ... |
| Tuna | ... | ... |
| Salmon | ... | ... |
| Willy | ... | ... |
```

**config.json:**
```json
{
  "name": "ds-product-customer-discovery",
  "domain": "product",
  "phase": "discover",
  "description": "Surface real user problems through interviews, JTBD, and empathy mapping",
  "tags": ["product", "discover", "research", "jtbd"],
  "fish": ["salmon", "willy", "tuna"],
  "model": "inherit",
  "version": "1.0.0",
  "author": "ds-core"
}
```

---

### 4.4 OSS Contribution Model

**Repository**: `github.com/dubleslash/skills` (public)

**Structure:**
```
skills/                    ← all skills live here
  product/
  engineering/
  ux-design/
  ...
CONTRIBUTING.md            ← how to add/update a skill
REGISTRY.md                ← flat catalog (auto-generated from config.json files)
skill-template/            ← copy this to create a new skill
  SKILL.md
  config.json
```

**Contribution flow:**
1. Fork the repo
2. Copy `skill-template/` into the right domain/phase folder
3. Fill in SKILL.md and config.json
4. Submit a PR
5. DS team reviews (is this mastermind-level? is the execution prompt complete?)
6. Merged → auto-published to the DS registry

**Quality bar for skills (non-negotiable):**
- The execution prompt must produce expert-level output without additional prompting
- The method must be based on established practice (cite the source)
- The FISH guide must be filled in — skill depth must scale correctly
- Output format must be specified — what the user receives must be clear

**Registry sync:**
When DS installs or launches, it checks the OSS registry for updates and syncs new/updated skills automatically.

**User-created skills (local):**
Users can create skills in their local `.claude/skills/` that are not in the public registry. These are scoped to their install only.

---

### 4.5 Skills Picker Discoverability

**The problem**: The `/` picker in Claude Code is flat — `ds-product` and `ds-product-customer-discovery` appear at the same level with no visual grouping. Users don't know to invoke the domain menu first.

**Solution (two-part):**

**Part 1 — Onboarding teaches the two-step pattern:**
During first open, DS explains: *"Type `/ds-product` to see the Product skill menu, then pick a specific skill. Or type the full skill name directly if you know it."*

**Part 2 — DS Pill shows smart defaults:**
The Desktop Mode pill shows role-based skill suggestions based on:
- Which Diamond phase the active project is in
- The user's most-used skills (from memory)
- The project's domain

This gets the user to the right skill without navigating the flat list.

---

## 5. MCPs & Connectors

### 5.1 The Strategy

MCPs are **not a DS feature** — they're plumbing. DS's job is to make the plumbing invisible.

**DS's role with MCPs:**
1. Know which MCPs are useful for which use cases
2. Present them in the onboarding wizard by category, not by name
3. Guide the user through API key setup (no copy-pasting config files)
4. Write the config files automatically
5. Validate the connection works before closing the wizard

**What the user sees**: *"Do you use Figma? Connect it in one click."* — not *"Add the following JSON to your claude_desktop_config.json..."*

---

### 5.2 MCPs by Category (Out-of-Box)

**Design**
- `figma-mcp` — read + write Figma designs; code-to-design, design-to-code
- `excalidraw-mcp` — diagrams and whiteboarding
- `storybook-mcp` — component library integration

**Code**
- `github-mcp` — issues, PRs, code review, commit context
- `gitlab-mcp` — same, for GitLab shops
- `linear-mcp` — task tracking, sprint management

**Communication**
- `slack-mcp` — read/write Slack; post digests, surface decisions
- `notion-mcp` — read/write Notion; sync artifacts to wikis

**Data**
- `postgres-mcp` — query databases, generate reports
- `google-sheets-mcp` — read/write spreadsheets

**Research**
- `playwright-mcp` — web automation, competitive research
- `brave-search-mcp` — search without rate limits

---

### 5.3 User-Facing MCP Setup Flow

**During install wizard:**

```
"Connect your tools — DS will configure everything automatically."

[Design]    ☐ Figma   ☐ Storybook
[Code]      ☑ GitHub  ☐ Linear
[Comms]     ☑ Slack   ☐ Notion
[Data]      ☐ Postgres ☐ Google Sheets

[Connect Selected →]
```

**Per MCP (step-by-step flow):**

```
Connecting GitHub...

1. Open GitHub Settings → Developer Settings → Personal Access Tokens
   [Open GitHub →]  ← opens browser to the exact page

2. Create a token with these permissions:
   repo, read:org, read:user

3. Paste your token here:
   [________________________]

[Verify Connection]  →  ✓ GitHub connected.
```

DS writes the token to the MCP config file automatically. User never sees JSON.

**Config files DS writes:**
- Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`
- VSCode: `.vscode/settings.json` or `.claude/settings.json`
- Cursor: same pattern

**Post-install validation:**
DS verifies each MCP is responding before completing the wizard. Failed connections are shown with a retry option and a troubleshooting link.

---

### 5.4 MCP Updates

DS checks for MCP updates on each launch. If a newer version of a connected MCP is available, DS surfaces it as a notification in the Pill, not as an interrupt.

---

## 6. UI Requirements for Shenhav

### 6.1 The Pill (Menu Bar App)

**States:**
- **Idle**: small `//` icon, neutral color
- **Active session**: icon pulses or changes color
- **Task running**: spinner or progress indicator
- **Alert**: red dot (drift detected, loop failed, decision needed)

**Click behavior:**
- Single click → Kanban opens (full project view)
- Right-click → quick menu: active project, recent tasks, settings

**Kanban is the primary view from the Pill.**

---

### 6.2 Kanban View

**Layout**: Column-based (TODO / IN PROGRESS / DONE) or phase-based (Discover / Define / Develop / Deliver)

**Each card shows:**
- Task name
- Which skill ran (or is running)
- Phase tag
- Session date (last updated)
- Project name (if viewing across projects)

**Card interactions:**
- Click → opens the session in the AI tool that ran it
- Hover → shows output summary (first paragraph of the skill output)
- Drag → move between columns (manual override)

**Empty state**: *"No active tasks. Open Claude to start a session."*

---

### 6.3 Node Map View

**Layout**: Hierarchical tree (session → decisions → artifacts)

**Each node shows:**
- Session date
- What was decided or produced
- Node type (session / decision / artifact / direction-discarded)

**Node types:**
| Type | Visual | Meaning |
|---|---|---|
| Session | Circle | A session happened |
| Decision | Diamond | A closed decision was made |
| Artifact | Document icon | Something was produced (PRD, brief, etc.) |
| Discarded | Faded | Direction considered but not pursued |

**Interactions:**
- Click any node → jumps to that session in the AI tool (if available) or shows artifact preview
- Hover → shows what happened in that node (summary)
- Filter by: decision / artifact / session type

**Empty state**: *"No sessions yet. Start a project in Claude."*

---

### 6.4 Skills Picker (In-Agent `/` Picker)

**Current state**: Flat list in Claude Code. No grouping. No context awareness.

**Target state (DS Desktop App):**
- Skills grouped by domain (collapsible)
- Current phase highlighted — skills in the active Diamond phase shown first
- Most-used skills surfaced at top
- Search by name or keyword
- Each skill shows: name, one-line description, FISH applicability

**Design note**: This lives in the DS Desktop App UI, not in the Claude Code CLI picker. The CLI picker stays flat — the Desktop App is where discoverability lives.

---

### 6.5 Onboarding Wizard

**Screens (in order):**

1. **Welcome** — hero line, what DS does in 3 bullets, "Get started"
2. **Tool detection** — show detected tools, confirm
3. **MCP selection** — connect tools (§5.3)
4. **First project** — "What are you working on?" or "Start from a template"
5. **Done** — "// is ready. Open Claude."

**Design principles:**
- Never show config files or JSON to the user
- Never ask for a decision the user doesn't care about
- Every step should feel like 1 click or less
- Progress indicator throughout

---

## 7. Open Questions Blocking Design

These are unresolved. Design cannot finalize these screens until they're answered.

| # | Question | Blocks |
|---|---|---|
| OQ-01 | How does `//` technically intercept at OS level? CGEventTap vs Accessibility API vs global hotkey? | Pill behavior, Desktop Mode |
| OQ-02 | Install strategy for cloud-only AI tools (ChatGPT web, Gemini)? No local root folder. | Install wizard scope |
| OQ-03 | Product name: "Duble//Slash" with `//` as the trigger, but in-agent trigger is `/`. Does the name still hold? | All copy and branding |
| OQ-04 | Loop configuration UX for non-technical users. Natural language ("run this every Monday")? Visual scheduler? | Loops section of Desktop App |
| OQ-05 | Skills picker in Desktop App — role-based onboarding filter? How do we avoid overwhelming with 210+ skills? | Skills Picker design |

---

## 8. What's Not in This Spec

These are deferred or out of scope for v1:

- **Windows support** — roadmap, not v1
- **Team/shared memory** — v1 is single-user; team sharing is v2
- **Marketplace** — skill monetization deferred (DECISION on OSS-first first)
- **Cloud-only AI tool install** — OQ-02 above, deferred
- **AAAK memory methodology** — open, undefined. Memory write conventions exist; the AAAK naming/structure is TBD.
- **Post-MVP domains**: Finance, HR, Sales, CS, Security, Data Science, Research, Education, Healthcare, Real Estate

---

*Source of truth for all DS design and engineering decisions. Update before acting on anything not in this spec.*
