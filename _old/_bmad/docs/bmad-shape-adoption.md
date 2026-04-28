---
name: BMAD shape adoption — what we adopt for Duble Slash operators + experts
description: Phase 2 (FISH-011) output. A structural teardown of how BMAD organizes agents and workflows on disk (workflow.md + steps/ + skill-manifest pattern), and the exact shape we adopt for the Duble Slash two-layer agent system (4 operators + 9 experts). Prescriptive — Phase 3a/3b build directly against this doc.
date: 2026-04-24
type: internal-spec
owner: Tal
supersedes: none
companion_to: ./bmad-teardown-for-our-agents.md
source_method: FLOW phase 2 — structural, not content — of the rebuild chain (FISH-010 → FISH-016)
---

# BMAD shape adoption

[`bmad-teardown-for-our-agents.md`](./bmad-teardown-for-our-agents.md) was Phase 0 — it critiqued BMAD's *content* (personas, capability codes, command proliferation). This doc is Phase 2 — it studies BMAD's *structural shape on disk* (file layout, workflow engine, manifest) and locks the shape we'll build in Phase 3a/3b.

Scope narrowing: this doc does **not** redesign capabilities, method codes, or the FLOW method. FLOW is settled in [`methodology/flow.md`](../../methodology/flow.md). This doc answers only one question — *"given FLOW and the two-layer agent model (operators + experts), what shape do the files take on disk?"*

---

## 1. TL;DR

1. **We adopt BMAD's "persona-agent + workflow-skill" split wholesale.** Every Layer-1 operator (Dora · Sol · Bran · May) and every Layer-2 expert is a `SKILL.md` with a persona + a **capabilities table that maps method codes to workflow-skill invocations**. Each workflow-skill lives in its own folder and carries its own `workflow.md`. An operator with 10 method codes owns 10 workflow-skill folders — not one 2,000-line agent file. This is the single most important structural decision, and BMAD validates it at scale (8 agents × 28 workflows).

2. **We adopt the inline-XML workflow style as the default, not the step-file style.** BMAD ships both. Step-file (`workflow.md` + `steps/step-XX-*.md`) is overhead for short, linear methods — the directory explodes and every HALT gate gets a 150-line file. Inline-XML (`<workflow><step n="N">...<action>...<check>...</workflow>` inside a single `workflow.md`) is readable, greppable, and diffable. Use step-file **only** when a workflow has ≥10 interactive menu gates with user HALTs between them (BMAD's `create-prd` is the canonical case). Our FLOW methods — BR, AC, MP, HS, PM, JM, CR, SL, UV, TR, RP — are almost all ≤6 steps; inline-XML fits.

3. **We replace BMAD's `stepsCompleted` frontmatter array with our existing `<FLOW-handoff>` block as the continuation mechanism.** BMAD's `stepsCompleted: [1, 2, 3]` is a workflow-local resume token. Our `<FLOW-handoff>` is richer (sigil, phase, artifacts, decisions, open questions) and already the universal interface across every phase transition. Workflow steps internally use `stepsCompleted` for per-skill resume; `<FLOW-handoff>` is emitted at operator-level boundaries. Don't blur them.

4. **The `_bmad/_config/agent-manifest.csv` + `skill-manifest.csv` pattern is load-bearing and we copy it.** Every operator and expert must register in a manifest that maps canonical name → displayName → role → module → path. This is how BMAD's party-mode skill can spawn agents as subagents; our Phase 5 dogfood run needs the same capability for multi-expert card runs.

5. **We depart from BMAD in one structural place: the two-layer split.** BMAD is flat — 8 personas, 35 skills, no hierarchy. We have a real hierarchy: operators own phases (head/left/right/tail), experts own domains (design/PM/dev/…). An operator's capabilities table lists method codes; an expert's capabilities table lists domain-specific workflows. The operator **loans in** an expert for a turn via `@handle` (already in agents-overview §6.2). The expert is a standalone skill that can also be invoked directly. This ambiguity — operator-loaned vs. directly-invoked — is real, and §5 of this doc spells out the file-level contract that keeps it coherent.

---

## 2. What we're adopting vs. what we're leaving behind

| From BMAD | Adopt | Leave | Rationale |
|---|---|---|---|
| Persona-agent SKILL.md with identity + communication style + capabilities table + on-activation routine | ✅ Verbatim shape | — | Clean separation of "who is the agent" from "what does it do" |
| Workflow skill = SKILL.md (one-liner) + workflow.md + optional steps/ + templates/ + data/ | ✅ Verbatim shape | — | Enables skill reuse across operators (e.g., `bmad-advanced-elicitation` is called from `bmad-create-prd` step-02 menu) |
| Step-file architecture with `stepsCompleted` frontmatter + HALT menus | ✅ For complex workflows only (≥10 HALT gates) | Use inline-XML for everything else | Step-file is overkill for a 4-step method |
| Inline-XML workflow (`<step n="N">`, `<action>`, `<check>`, `<goto>`, `<critical>`, `<ask>`) | ✅ Default | — | Readable, greppable, one file per method |
| `_bmad/bmm/config.yaml` project-level config | ✅ Keep as-is | — | Already in repo; FLOW skills read it today |
| `_bmad/_config/agent-manifest.csv` + `skill-manifest.csv` | ✅ Verbatim shape, new content | — | Required for party-mode / multi-agent card runs (Phase 5) |
| BMAD's `/` slash-command prefix | ❌ | ✅ We keep `//` (already established) | `/` is BMAD's signature; `//` is FLOW's. Independent tool namespaces |
| BMAD's method codes (CP, VP, EP, CE, IR inside John; BP, MR, DR, TR, CB inside Mary) | ❌ | ✅ We keep FLOW codes (HS, HMW, PM, BR, AC, MP, CR, SL, TR, RP…) | Our codes are more rigorous (see Phase-0 teardown P1–P5) |
| BMAD's party-mode multi-agent orchestration | ✅ Shape | — | Needed for Phase 5 dogfood — FLOW Tuna/Willy cards routinely touch 3+ experts |
| BMAD's `project-context.md` auto-load pattern | ✅ Already agreed in Phase 0 teardown P1 | — | Every operator + expert SKILL.md activation routine reads it |
| BMAD's A/P/C menu convention ("Advanced Elicitation / Party Mode / Continue") | 🟡 Partial | — | We keep Continue; replace Advanced Elicitation and Party Mode with FLOW-native hooks (`HB` handback, expert loan-in) — see §7 |
| BMAD's per-step `<facilitation-guidelines>` block | ✅ When present | — | Good for methodology-style workflows (retrospective, brainstorming) |
| BMAD's `stepsCompleted: [1, 2, 3]` frontmatter for continuation | ✅ Per-workflow only | Never cross-workflow | Cross-workflow continuation is `<FLOW-handoff>`'s job |

---

## 3. BMAD's three skill kinds → our mapping

BMAD has no written taxonomy, but the 35+ skills in [`_bmad/_config/skill-manifest.csv`](../_config/skill-manifest.csv) cluster into three kinds. Each maps cleanly to a slot in our two-layer architecture.

### 3.1 Persona-agent skills

**BMAD examples:** `bmad-agent-pm` (John), `bmad-agent-analyst` (Mary), `bmad-agent-ux-designer` (Sally), `bmad-agent-architect` (Winston), `bmad-agent-dev` (Amelia), `bmad-agent-tech-writer` (Paige).

**Shape on disk** (2 files):
```
bmad-agent-pm/
├── SKILL.md                    # frontmatter (name, description) + persona body
└── bmad-skill-manifest.yaml    # type=agent, displayName, role, identity, communicationStyle, module
```

**SKILL.md body contains:** Overview · Identity · Communication Style · Principles · Capabilities table (Code → Description → Skill) · On-Activation routine (config load, greet, present capabilities, wait for input).

**No workflow.md inside the persona folder.** The persona's job is to route to workflow-skill folders listed in its capabilities table.

**Our mapping:** Every Layer-1 operator (Dora, Sol, Bran, May) and every Layer-2 expert SKILL.md follows this exact shape. The persona file never contains the work — only the routing.

### 3.2 Workflow skills

**BMAD examples:** `bmad-create-prd`, `bmad-brainstorming`, `bmad-dev-story`, `bmad-retrospective`, `bmad-code-review`.

**Shape on disk** (3–6 files/folders depending on complexity):
```
bmad-create-prd/
├── SKILL.md                    # one-liner: "Follow the instructions in ./workflow.md."
├── workflow.md                 # the actual workflow (step-file or inline-XML)
├── steps-c/                    # only if step-file style: step-01-init.md, step-02-discovery.md, …
├── templates/                  # output document templates (e.g., prd-template.md)
└── data/                       # reference CSVs (project-types.csv, domain-complexity.csv)
```

**SKILL.md is trivial** — just frontmatter plus `Follow the instructions in ./workflow.md.` The heavy lifting is in `workflow.md`.

**Our mapping:** Every FLOW method code (HS, HMW, PM, BR, AC, MP, CR, SL, TR, RP, …) becomes a workflow-skill folder inside its owning operator's `skills/` directory. Directly-invocable via the method code; also loanable from the operator's capabilities table.

### 3.3 Helper skills

**BMAD examples:** `bmad-advanced-elicitation`, `bmad-help`, `bmad-shard-doc`, `bmad-index-docs`, `bmad-party-mode`, `bmad-distillator`, `bmad-editorial-review-prose`.

**Shape on disk** (2–3 files):
```
bmad-advanced-elicitation/
├── SKILL.md                    # frontmatter + brief workflow inline
└── (optional) workflow.md, data/
```

**Called from other skills' steps** — e.g., `bmad-create-prd/steps-c/step-02-discovery.md` has a menu option "[A] Advanced Elicitation" that invokes `bmad-advanced-elicitation`.

**Our mapping:** Cross-cutting helpers stay in `agents/helpers/` at the top level — not nested under any operator or expert. Examples: `ds-advanced-elicitation` (FLOW-aware equivalent), `ds-party-mode` (multi-agent card runs), `ds-handoff-compose` (emit `<FLOW-handoff>` with validation).

---

## 4. Two workflow styles — when to use which

BMAD uses both. We settle on one default + one escape hatch.

### 4.1 Inline-XML style (DEFAULT for Duble Slash)

**BMAD examples:** `bmad-dev-story` (450 lines), `bmad-retrospective` (1,479 lines), `bmad-create-story` (380 lines), `bmad-correct-course` (267 lines), `bmad-sprint-planning` (263 lines).

**Structure:**
```markdown
# <Method Name> Workflow

**Goal:** <one line>
**Your Role:** <one line>

## INITIALIZATION

### Configuration Loading
Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:
- project_name, user_name, communication_language, …

### Paths
- output_file = `{planning_artifacts}/<artifact-name>.md`

### Context
- project_context = `**/project-context.md` (load if exists)

## EXECUTION

<workflow>

<step n="1" goal="<what this step accomplishes>">
  <critical>non-negotiable rule</critical>
  <action>do thing 1</action>
  <action>do thing 2</action>
  <check if="condition">
    <action>branch</action>
    <goto step="3">Skip ahead</goto>
  </check>
  <ask>question to user</ask>
  <output>
User-facing text with {{variables}}
  </output>
</step>

<step n="2" goal="…">
  …
</step>

</workflow>

<facilitation-guidelines>
  <guideline>rule that applies across all steps</guideline>
</facilitation-guidelines>
```

**When to use inline-XML:**
- ≤6 steps, **or** steps are mostly linear (<3 HALT gates for user input)
- No complex menu state (A/P/C style)
- Workflow fits comfortably in 100–400 lines

**Why it's the default:** one file per method, greppable, diff-friendly, no step-file proliferation. Our FLOW methods are mostly short (BR has 5 steps; HS has 4; PM has 6). Even `retrospective` — the longest BMAD workflow at 1,479 lines — is still one file, which is easier to navigate than 12 step files.

### 4.2 Step-file style (ESCAPE HATCH, rare)

**BMAD examples:** `bmad-create-prd` (61-line workflow.md + 12 step files in `steps-c/`), `bmad-brainstorming` (53-line workflow.md + 8 step files in `steps/`).

**Structure:**
```
<skill>/
├── SKILL.md
├── workflow.md               # short — declares step-file architecture + paths + routes to step-01
├── steps/ or steps-c/        # one file per step, 100–250 lines each
│   ├── step-01-init.md
│   ├── step-02-discovery.md
│   └── step-NN-complete.md
├── templates/
└── data/
```

**Each step file carries:**
- MANDATORY EXECUTION RULES (header with 🛑 / ✅ / 📋 pictographs)
- STEP GOAL
- Role Reinforcement
- Step-Specific Rules
- Sequence of Instructions
- MENU OPTIONS block (A/P/C, with handling logic)
- SUCCESS / FAILURE metrics
- `./step-NN-next.md` route

**When to use step-file:**
- ≥10 interactive HALT gates with distinct menu state at each
- Long linear workflow where each step has its own complex decision tree
- Continuation across sessions is a primary concern (the user pauses mid-workflow for days)

**In practice, we will probably never need this for FLOW.** Most FLOW methods are one-shot or 2–3-turn conversations. If a candidate workflow starts to feel like it needs step-file, first ask: "is this actually multiple methods chained?" (Usually yes — decompose and emit `<FLOW-handoff>` between them.)

### 4.3 Side-by-side comparison

| Aspect | Inline-XML | Step-file |
|---|---|---|
| Files per skill | 1 (+ optional template) | 12–15 |
| Typical total lines | 100–450 | 60 + (150 × N steps) = 1,500–2,000 |
| Continuation across sessions | Via `<FLOW-handoff>` | Via `stepsCompleted` frontmatter |
| Branch logic | `<check if="…"><goto>` | MENU OPTIONS + next-step routing |
| Readability | High (one file) | Low (flip between files) |
| Diff-ability in PRs | High | Low (changes scatter) |
| BMAD usage ratio | ~70% of workflows | ~30% of workflows |
| Our target ratio | ~95% | ~5% (retrospective, course-correct maybe) |

---

## 5. Directory layout — what Phase 3a/3b builds

Locked layout. Phase 3a creates the first three expert folders + one operator folder as reference; Phase 3b clones and fills the remaining six experts and three operators; Phase 4 does the rename sweep (Nova→Dora, Bram→Bran, Sage→May, `local-agents/` → `agents/operators/`).

```
agents/
├── manifest.yaml                          # version, modules, loader config
├── operator-manifest.csv                  # one row per operator (and per expert when authored)
├── skill-manifest.csv                     # every workflow-skill registers here, helpers included
├── config.yaml                            # {user_name}, {communication_language}, paths
│
├── operators/                             # Layer 1 · 4 operators
│   ├── dora/                              # Explorer · head
│   │   ├── SKILL.md                       # persona + capabilities table (SA, HS, HMW, JM, CS, IP, NB, PM, SR, HO, HB)
│   │   ├── skill-manifest.yaml            # type=operator; displayName=Dora; role=Explorer; module=operators
│   │   └── skills/                        # one folder per method code Dora OWNS
│   │       ├── sa-sigil-assist/
│   │       ├── hs-heuristic-scan/
│   │       │   ├── SKILL.md               # one-liner → workflow.md
│   │       │   ├── workflow.md            # inline-XML
│   │       │   └── templates/             # optional
│   │       ├── hmw-how-might-we/
│   │       ├── jm-journey-map/
│   │       ├── cs-competitor-scan/
│   │       ├── ip-interview-plan/
│   │       ├── nb-nugget-board/
│   │       ├── pm-premortem/
│   │       ├── sr-stream-recap/
│   │       └── (HO and HB live once in agents/helpers/ — see §7.3 and Open Q 11.5)
│   ├── sol/                               # Solidifier · left body
│   │   ├── SKILL.md                       # capabilities: BR, AC, MP, DL, TA, WF, AD, SK, SB, PT, CT, HB, HO, IR, CC
│   │   ├── skill-manifest.yaml
│   │   └── skills/
│   │       ├── br-brief/
│   │       ├── ac-acceptance-criteria/
│   │       ├── mp-measurement-plan/
│   │       ├── …
│   │       ├── ir-implementation-readiness/    # added per Phase-0 teardown P3
│   │       └── cc-course-correction/            # added per Phase-0 teardown P4
│   ├── bran/                              # Builder · right body
│   │   └── …
│   └── may/                               # Shipper · tail
│       └── …
│
├── experts/                               # Layer 2 · 9 experts with domain skills
│   ├── design/                            # UX Designer (ex-Sally)
│   │   ├── SKILL.md                       # persona + capabilities: UX research, wireframes, design systems, …
│   │   ├── skill-manifest.yaml            # type=expert; displayName=<TBD>; role=Design; module=experts
│   │   └── skills/
│   │       ├── ux-design-spec/            # port + FLOW-shape of bmad-create-ux-design
│   │       ├── wireframe-pass/
│   │       ├── design-system-audit/
│   │       ├── a11y-review/
│   │       └── visual-qa/
│   ├── pm/                                # Product Manager (ex-John) — Phase 3a includes this
│   │   ├── SKILL.md                       # capabilities table with method codes for PRD work
│   │   └── skills/
│   │       ├── prd-draft/                 # port + FLOW-shape of bmad-create-prd
│   │       ├── prd-edit/                  # port of bmad-edit-prd
│   │       ├── prd-validate/              # port of bmad-validate-prd
│   │       ├── epics-and-stories/         # port of bmad-create-epics-and-stories
│   │       └── prfaq/                     # port of bmad-prfaq
│   ├── dev/                               # Developer (ex-Amelia) — Phase 3a includes this
│   │   └── skills/
│   │       ├── story-dev/                 # port of bmad-dev-story
│   │       ├── code-review/               # port of bmad-code-review
│   │       ├── quick-dev/                 # port of bmad-quick-dev
│   │       └── test-e2e/                  # port of bmad-qa-generate-e2e-tests
│   ├── architect/                         # System Architect — Phase 3b
│   ├── qa/                                # QA — Phase 3b
│   ├── analyst/                           # Business Analyst / Research — Phase 3b
│   ├── tech-pm/                           # Technical Program Manager — Phase 3b
│   ├── design-ops/                        # Design operations — Phase 3b
│   └── asset-creator/                     # Visuals / HyperFrames / media — Phase 3b
│
└── helpers/                               # cross-cutting, invoked from other skills' steps
    ├── advanced-elicitation/              # FLOW-aware version of bmad-advanced-elicitation
    ├── party-mode/                        # multi-agent card runs (Phase 5 dogfood dependency)
    ├── handoff-compose/                   # emit <FLOW-handoff> with schema validation
    ├── project-context/                   # init + read project-context.md
    └── help/                              # "which agent do I reach for?" navigator
```

**Operator skills vs. expert skills — the line:**

- **Operator skills** (`operators/<name>/skills/*`) are **phase-bound**: they are FLOW method codes (HS, BR, CR, TR…) that belong to one of the four phases. Every method code has exactly one operator owner. Directly invocable via `//explore HS`, `//solidify BR`, etc.
- **Expert skills** (`experts/<domain>/skills/*`) are **domain-bound**: they are deep domain workflows that don't belong to any single phase. Directly invocable via `@pm prd-draft`, `@design ux-design-spec`. Also loanable from an operator turn via `@pm` in-context (see `agents-overview.md` §6.2).
- When an operator capability *would* overlap with an expert skill (e.g., Sol's `BR` brief vs. pm expert's `prd-draft`), **decide by depth**: BR is a lightweight Tuna-sized brief; `prd-draft` is the 11-step BMAD-grade PRD workflow for Willy-scale work. Different methods, different owners. Don't overlap; cross-reference in both SKILL.md files.

---

## 6. Universal conventions adopted verbatim

Every operator SKILL.md, expert SKILL.md, and workflow.md must do these things. Copy-paste verbatim from BMAD — no edits.

### 6.1 Frontmatter (SKILL.md)

```yaml
---
name: <canonical-id>
description: <one-line hook for the skill router>
---
```

### 6.2 Persona-agent SKILL.md structure

```markdown
# <Display Name>

## Overview
This skill provides a <role> who drives <primary outcome> through <primary method>.
Act as <name> — a <one-phrase personality>.

## Identity
<2–3 sentences of backstory + expertise grounding>

## Communication Style
<one paragraph>

## Principles
- <principle 1 with methodology grounding>
- <principle 2>
- <principle 3>

You must fully embody this persona so the user gets the best experience and help they need,
therefore its important to remember you must not break character until the users dismisses
this persona.

## Capabilities

| Code | Description | Skill |
|------|-------------|-------|
| XX | <what this does> | ds-<workflow-skill-canonical-id> |
| YY | <what this does> | ds-<workflow-skill-canonical-id> |

## On Activation

1. Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Continue with steps below:**
   - **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference. If not found, continue without it.
   - **Greet and present capabilities** — Greet `{user_name}` warmly, always speaking in `{communication_language}`.

3. Remind the user they can invoke the `ds-help` skill at any time, then present the capabilities table above.

   **STOP and WAIT for user input** — Do NOT execute menu items automatically.

**CRITICAL Handling:** When user responds with a code or skill name, invoke the corresponding skill by its exact registered name from the Capabilities table. DO NOT invent capabilities on the fly.
```

### 6.3 Workflow.md structure (inline-XML, default)

See §4.1 above. One file per method. Begin with `## INITIALIZATION` (config, paths, context), then `<workflow>` wrapping all `<step n="N">` blocks, optionally followed by `<facilitation-guidelines>` for methodology-heavy workflows.

### 6.4 Manifest entries

Every new folder gets two rows:

`agents/operator-manifest.csv`:
```csv
name,displayName,title,icon,capabilities,role,identity,communicationStyle,principles,module,path,canonicalId
"ds-operator-dora","Dora","Explorer","🔭","…","…","…","…","…","operators","agents/operators/dora",""
```

`agents/skill-manifest.csv`:
```csv
canonicalId,name,description,module,path
"ds-hs-heuristic-scan","ds-hs-heuristic-scan","Heuristic scan for a Nemo/Tuna card","operators.dora","agents/operators/dora/skills/hs-heuristic-scan/SKILL.md"
"ds-pm-prd-draft","ds-pm-prd-draft","PRD draft via the PM expert — Willy-scale PRDs","experts.pm","agents/experts/pm/skills/prd-draft/SKILL.md"
```

Canonical ID convention: `ds-<layer>-<short-code>-<short-name>`. Layer prefix optional for operators (since method codes are already unique per phase).

---

## 7. Deltas from BMAD — FLOW-native substitutions

### 7.1 Continuation: `<FLOW-handoff>` replaces cross-workflow `stepsCompleted`

BMAD uses `stepsCompleted: [1, 2, 3]` in the output document's frontmatter to let a workflow resume mid-way. This is fine **inside** a workflow — keep it.

But BMAD also uses the output document's presence as an implicit cross-workflow handoff ("create-prd saves prd.md; create-epics-and-stories reads prd.md; good luck if either schema drifts"). This is the fragile spot Phase-0 teardown §A2 called out.

**Substitution:** every workflow that exits a phase MUST end with a step that invokes `ds-handoff-compose` (helper) to emit a `<FLOW-handoff>` block. The handoff carries: sigil, archetype, phase-transition, artifacts (path + hash), decisions, open questions, method codes used, next-phase recommended. See [`methodology/flow.md §9`](../../methodology/flow.md#9-the-flow-handoff-block).

**Consequence:** the final `<step>` of every operator-level workflow.md calls `ds-handoff-compose` and displays the handoff to the user. Inside-workflow step completion is still tracked with `stepsCompleted`.

### 7.2 Menu convention: A/P/C becomes H/E/C

BMAD's menu format is `[A] Advanced Elicitation [P] Party Mode [C] Continue`. We substitute:

- **[A] → [H]** — **Handback** (FLOW's `HB`). When the user signals "this isn't right, go back" mid-workflow, HB emits a reverse handoff instead of a forward one. Methodology-wired; more load-bearing than BMAD's Advanced Elicitation.
- **[P] → [E]** — **Expert loan-in**. When the user needs domain depth mid-turn, E invokes the relevant Layer-2 expert for a one-turn loan. Replaces BMAD's Party Mode (which we keep separately as `ds-party-mode` helper for multi-agent card runs, but demote out of the default menu).
- **[C] → [C]** — **Continue**. Same meaning.

Every operator workflow step that currently displays `[A] [P] [C]` in the BMAD port becomes `[H] [E] [C]` in our version.

### 7.3 The shared HO (handoff) shape across all four operators

Every operator has an `HO` method code and an `HB` method code. The logic is identical across operators — only the `to:`/`from:` phase pair differs.

**Decision (resolves Open Q 11.5):** HO and HB live **once** in `agents/helpers/` (`helpers/handoff-compose/` + `helpers/handback-compose/`), not replicated inside each operator's `skills/` folder. Each operator's capabilities table points the `HO` / `HB` rows directly at the helper canonical ID.

Consequences for the Phase 3a file tree:
- `operators/dora/skills/` has 8 folders (SA, HS, HMW, JM, CS, IP, NB, PM, SR) — not 11.
- Same for sol (drop HO/HB → 13 skill folders), bran (→ 7), may (→ 11).
- The helper does its own sigil-aware templating based on the calling operator's phase.
- Saves 8 otherwise-empty folders; keeps schema validation in one place where Phase 3a tests can pin it.

### 7.4 Config layering

BMAD reads `_bmad/bmm/config.yaml` (project) and `_bmad/core/config.yaml` (framework). We add a third layer — the team's `flow.yaml` (see [`agents-overview.md §4`](../../methodology/agents-overview.md)) — read-only at skill activation, consulted for sigil-aware intensity modulation.

Activation routine order: `_bmad/bmm/config.yaml` → `_bmad/core/config.yaml` → `.flow/flow.yaml` (if present) → `project-context.md` (if present). Later files override earlier ones for non-conflicting keys; conflicts are resolved by operator-specific rules (documented per skill).

### 7.5 Language defaulting

BMAD's `{communication_language}` is user-configured at install. We keep the variable but change the default: `English` for all repo-level docs, **user's local language for per-user conversational output**. This matches Tal's preference (Hebrew-inflected quotes in flow.md) without polluting shared artifacts. Codified in `config.yaml` — `document_output_language: English` · `communication_language: <user-choice>`.

---

## 8. Template skeletons — copy-paste into Phase 3a

### 8.1 Operator SKILL.md (skeleton)

```markdown
---
name: ds-operator-dora
description: Explorer operator for FLOW's head phase. Use when the user types //explore or starts a new card.
---

# Dora

## Overview
This skill provides the Explorer — the first FLOW operator a card meets. Dora opens the aperture: she runs discovery methods (HS, HMW, JM, PM, IP, NB) and refuses to commit to a shape until the card has been adequately explored.

## Identity
Senior UX researcher with 10+ years across B2B SaaS, fintech, and regulated industries. Deep in JTBD, contextual inquiry, and the original 2024 Fish Model. Reads rooms fast; respects silence; pushes back when premature convergence smells like laziness.

## Communication Style
Curious over certain. Asks "what haven't we seen?" before "what should we do?" Never promises a shape — only a well-framed question.

## Principles
- Open the aperture before narrowing it. Convergence is Sol's job, not Dora's.
- Intensity matches the sigil. A Nemo deserves a 4-method scan. A Willy deserves full discovery.
- Handbacks are not failures. If Sol sends work back, Dora extends Explore rather than rubber-stamping.
- No method is wasted. Every HS, HMW, JM, PM, IP, NB adds to the `<FLOW-handoff>`.

You must fully embody this persona so the user gets the best experience and help they need, therefore its important to remember you must not break character until the users dismisses this persona.

## Capabilities

| Code | Description | Skill |
|------|-------------|-------|
| SA | Sigil Assist — pick the right archetype for this card | ds-sa-sigil-assist |
| HS | Heuristic Scan — a quick expert read | ds-hs-heuristic-scan |
| HMW | How-Might-We reframing | ds-hmw-how-might-we |
| JM | Journey Map (end-to-end or slice) | ds-jm-journey-map |
| CS | Competitor / pattern scan | ds-cs-competitor-scan |
| IP | Interview Plan | ds-ip-interview-plan |
| NB | Nugget Board — synthesize research | ds-nb-nugget-board |
| PM | Premortem — what could go wrong, pre-commit | ds-pm-premortem |
| SR | Stream Recap — summarize what happened | ds-sr-stream-recap |
| HO | Handoff to the next operator | ds-handoff-compose |
| HB | Handback to the previous operator | ds-handback-compose |

## On Activation

1. Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location

2. **Continue with steps below:**
   - **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference. If not found, continue without it.
   - **Check for active `<FLOW-handoff>`** — if the user pasted one, read it and skip greeting.
   - **Greet and present capabilities** — Greet `{user_name}` warmly in `{communication_language}`.

3. Present the capabilities table above and invite a method code.

   **STOP and WAIT for user input.** Accept number, method code, or a freeform description of the card.

**CRITICAL Handling:** If freeform, propose a sigil + lead method + loanable expert (one of each). Do NOT execute multiple methods in one turn. One method per turn; every method exit is a handoff (internal to Explore) or a `<FLOW-handoff>` block (out of Explore).
```

### 8.2 Workflow-skill SKILL.md (skeleton — one-liner)

```markdown
---
name: ds-hs-heuristic-scan
description: Heuristic scan — a quick expert read on a Nemo or Tuna card. Use when Dora needs to name conventions, risks, and gaps in 4 passes.
---

Follow the instructions in ./workflow.md.
```

### 8.3 Workflow.md (skeleton — inline-XML)

```markdown
# Heuristic Scan Workflow

**Goal:** Do a 4-pass expert scan of the card's surface area and surface conventions, risks, and gaps.
**Your Role:** You are Dora running the HS method. Keep Dora's persona voice.

## INITIALIZATION

### Configuration Loading
Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:
- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{planning_artifacts}`

### Paths
- `output_file` = `{planning_artifacts}/scans/hs-{{card_id}}-{date}.md`

### Context
- `project_context` = `**/project-context.md` (load if exists)
- `flow_yaml` = `.flow/flow.yaml` (load if exists)

---

## EXECUTION

<workflow>

<step n="1" goal="Confirm card and sigil">
  <critical>Never run HS without a confirmed sigil. If missing, invoke ds-sa-sigil-assist first.</critical>
  <action>Read the current <FLOW-handoff> from context if present; else ask {user_name} for the card description</action>
  <action>Confirm sigil — ask: "what fish is this?" if not locked</action>
  <check if="sigil is Willy">
    <output>
Dora: "This is a Willy — HS alone isn't enough. Want to run HS first and then IP + PM, or skip HS and go deeper?"
    </output>
    <ask>Your call, {user_name}?</ask>
  </check>
</step>

<step n="2" goal="Pass 1 — conventions">
  <action>Name established conventions in this problem space (domain, patterns, platforms)</action>
  <action>List 3–7 conventions with one-line justifications</action>
</step>

<step n="3" goal="Pass 2 — risks">
  <action>Name specific risks this card inherits (compliance, performance, adoption, social)</action>
  <action>List 3–7 risks with severity (low/med/high)</action>
</step>

<step n="4" goal="Pass 3 — gaps">
  <action>Name what isn't known yet (user, behavior, technical, market)</action>
  <action>Frame each gap as a question Sol would answer in Solidify</action>
</step>

<step n="5" goal="Pass 4 — recommendation">
  <action>Recommend next method — usually HMW, JM, or handoff to Sol</action>
  <check if="recommendation is handoff">
    <goto step="6">Emit handoff</goto>
  </check>
  <check if="recommendation is another Explore method">
    <output>
Dora: "HS surfaced enough for me to want {{next_method}} before we leave Explore. Want me to run it, or are you good to ship this HS as-is to Sol?"
    </output>
    <ask>{user_name}?</ask>
  </check>
</step>

<step n="6" goal="Emit the handoff">
  <action>Invoke ds-handoff-compose with: phase=explore, to=solidifier (or next explore method), artifacts=[output_file], decisions=[...], open_questions=[...]</action>
  <action>Display the resulting <FLOW-handoff> block to {user_name}</action>
</step>

</workflow>

<facilitation-guidelines>
  <guideline>Keep Dora's voice. Do not switch to Sol's language ("let's lock this") — that's a phase violation.</guideline>
  <guideline>HS is 4 passes. Do not skip any pass because the card "seems simple." Nemos still get all 4.</guideline>
  <guideline>If the user pushes to skip — quote the Sigil-aware intensity rule from methodology/flow.md §4.</guideline>
</facilitation-guidelines>
```

---

## 9. Phase 3a — exact buildable spec

Phase 3a (due 2026-05-03 per task-board) builds **three experts** (Design, PM, Dev) **and one operator end-to-end** (Dora) as the reference implementation. The remaining three operators + six experts fall out in Phase 3b.

### 9.1 Dora (reference operator — builds out full operator pattern)

Files to create:

```
agents/operators/dora/
├── SKILL.md                              # use §8.1 template
├── skill-manifest.yaml                   # type=operator
└── skills/                               # 9 folders (HO + HB live in helpers/, not here)
    ├── sa-sigil-assist/
    ├── hs-heuristic-scan/                # use §8.3 workflow template
    ├── hmw-how-might-we/
    ├── jm-journey-map/
    ├── cs-competitor-scan/
    ├── ip-interview-plan/
    ├── nb-nugget-board/
    ├── pm-premortem/
    └── sr-stream-recap/
```

Shared helpers to create alongside (HO/HB live here, not in any operator):

```
agents/helpers/
├── handoff-compose/                      # schema validation + <FLOW-handoff> block emit (Dora's HO, Sol's HO, Bran's HO, May's HO all call this)
├── handback-compose/                     # reverse variant (all four operators' HB)
├── project-context/                      # activation-time reader
└── advanced-elicitation/                 # FLOW-aware port of bmad-advanced-elicitation
```

### 9.2 PM expert (reference expert — porting BMAD PM work)

```
agents/experts/pm/
├── SKILL.md                              # use §8.1 template, adapted for expert
├── skill-manifest.yaml                   # type=expert
└── skills/
    ├── prd-draft/                        # port bmad-create-prd, inline-XML, ≤300 lines
    ├── prd-edit/                         # port bmad-edit-prd
    ├── prd-validate/                     # port bmad-validate-prd
    ├── epics-and-stories/                # port bmad-create-epics-and-stories
    └── prfaq/                            # port bmad-prfaq
```

**Port rule:** BMAD PM skills are step-file style. Our ports convert to inline-XML unless the workflow has ≥10 HALT gates (most don't). Replace A/P/C menus with H/E/C. Replace final "save to `{outputFile}`" step with handoff emission via `ds-handoff-compose`. Keep BMAD's data files (project-types.csv, domain-complexity.csv) as-is in `data/`.

### 9.3 Design expert

```
agents/experts/design/
├── SKILL.md
├── skill-manifest.yaml
└── skills/
    ├── ux-design-spec/                   # port bmad-create-ux-design
    ├── wireframe-pass/                   # new — no BMAD equivalent
    ├── design-system-audit/              # new
    ├── a11y-review/                      # new
    └── visual-qa/                        # new
```

### 9.4 Dev expert

```
agents/experts/dev/
├── SKILL.md
├── skill-manifest.yaml
└── skills/
    ├── story-dev/                        # port bmad-dev-story (inline-XML already, easy port)
    ├── code-review/                      # port bmad-code-review
    ├── quick-dev/                        # port bmad-quick-dev
    └── test-e2e/                         # port bmad-qa-generate-e2e-tests
```

### 9.5 Manifest updates

Append rows to `agents/operator-manifest.csv` (4 new: Dora + Design + PM + Dev) and `agents/skill-manifest.csv` (25+ new rows — every skill folder above gets one row).

### 9.6 Phase 3a acceptance criteria

1. All paths above exist with non-empty files matching the §8 templates.
2. Every workflow.md lints clean (inline-XML tags balanced; `<step n="N" goal="...">` cover 100% of the workflow).
3. Running `//explore HS` (manually, in Claude Code) activates Dora, confirms sigil, runs 4 passes, and emits a valid `<FLOW-handoff>`.
4. Running `@pm prd-draft` on a test card writes a `prd.md` that matches BMAD's prd-template schema (so we retain backward compatibility with already-saved PRDs).
5. Every new skill appears in `skill-manifest.csv` and is loadable.
6. A dry-run Party Mode (just Dora + @pm) produces coherent dialogue without either agent stepping on the other's phase.

---

## 10. Phase 3b — ripple plan

Phase 3b (due 2026-05-17) clones the Phase 3a pattern across the remaining three operators and six experts:

| Layer | Folder | Method-codes / skills | Source |
|---|---|---|---|
| Operator | `operators/sol/` | BR, AC, MP, DL, TA, WF, AD, SK, SB, PT, CT, IR, CC, HO, HB | Solidifier spec + Phase-0 teardown additions |
| Operator | `operators/bran/` | CR, SL, GE, TE, UV, IN, PR, HB, HO | Builder spec |
| Operator | `operators/may/` | RE, CM, CH, RN, TG, PR, MS, MR, RP, TR, NL, HB, HO | Shipper spec |
| Expert | `experts/architect/` | ADR authoring, system-diagram, tech-selection, interface-design, migration-plan | port bmad-create-architecture, bmad-agent-architect |
| Expert | `experts/qa/` | test-strategy, e2e-gen, design-qa, regression-plan | port bmad-qa-generate-e2e-tests + new skills |
| Expert | `experts/analyst/` | market-research, domain-research, technical-research, competitive-scan, interview-synthesis | port bmad-market-research, bmad-domain-research, bmad-technical-research |
| Expert | `experts/tech-pm/` | sprint-planning, sprint-status, correct-course, checkpoint-preview | port bmad-sprint-planning, bmad-sprint-status, bmad-correct-course, bmad-checkpoint-preview |
| Expert | `experts/design-ops/` | design-system-governance, asset-pipeline, component-lifecycle, tokens | new |
| Expert | `experts/asset-creator/` | hyperframes-compose, narration-tts, illustration-brief, slide-deck | port from existing `website/video/` + new |

No structural surprises — Phase 3b is pure execution once Phase 3a's pattern is solid.

---

## 11. Open questions for Tal

1. **Canonical IDs — `ds-` prefix or none?** BMAD uses `bmad-` consistently (`bmad-agent-pm`, `bmad-create-prd`). Mirror with `ds-` (`ds-operator-dora`, `ds-pm-prd-draft`), or drop the prefix since we control the whole namespace? Recommendation: **use `ds-`** — matches BMAD's pattern, avoids collisions if a user installs both frameworks side-by-side, and mirrors our `//` / `@` grammar (both prefixes are load-bearing).

2. **Where do method-code aliases live?** A user typing `//explore HS` should route to `ds-hs-heuristic-scan`. The resolver table (`HS` → `ds-hs-heuristic-scan`, `//explore` → `ds-operator-dora`) has to live somewhere. Options: (a) generate from `skill-manifest.csv` at install time; (b) separate `agents/aliases.yaml`; (c) inline in each operator's SKILL.md capabilities table. Recommendation: **(a) generate at install time** — single source of truth, aligns with how BMAD does it via `_bmad/_config/manifest.yaml`.

3. **Expert display names — invent personas or use role titles?** BMAD's PM is "John," UX is "Sally," etc. We've only locked the 4 operator names (Dora/Sol/Bran/May). For the 9 experts, do we invent 9 more human names (Emma the Designer, Jonah the PM, Vera the QA…) or stick with role titles ("the Design expert")? Recommendation: **stick with role titles for now** — saves inventing 9 personalities that might change when Phase 5 dogfood surfaces the real needs. Revisit after Phase 5.

4. **Does `bmad-help` port directly, or does FLOW need a different kind of navigator?** BMAD's help skill is essentially a decision tree over the PRD → UX → architecture → sprints workflow. FLOW is more graph-shaped (any phase can go to any other; handbacks are first-class). Our `agents/helpers/help/` probably needs to be rewritten from scratch, not ported. Flag for Phase 3b.

5. **RESOLVED (2026-04-24):** HO and HB live once in `helpers/` — not replicated per operator. Capability rows point directly at the helper canonical ID. §5, §7.3, and §9.1 all reflect this. Leaving the question visible here so the decision history survives the next re-read.

---

## 12. What this doc is not

- Not a rewrite of flow.md. [`methodology/flow.md`](../../methodology/flow.md) is settled; this doc only determines how flow.md becomes code on disk.
- Not a Phase 0 re-read. [`bmad-teardown-for-our-agents.md`](./bmad-teardown-for-our-agents.md) stands as the content critique; this doc is its structural sibling.
- Not a naming sweep. Phase 4 (FISH-014) handles Nova→Dora, Bram→Bran, Sage→May, `local-agents/` → `agents/operators/`, Context Cloud → Duble Slash Cloud. This doc uses the target names so Phase 3a can build directly.
- Not an install bundle design. FISH-008 (`AGENTS.md` / `CLAUDE.md` / `fish.mdc`) + FISH-003 (one-command install) stay on their own track.
- Not a methodology claim. Nothing in this doc changes FLOW's semantics — it only prescribes file layout.
