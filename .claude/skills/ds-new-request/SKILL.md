---
name: ds-new-request
description: Translates any new request — idea, task, feature, or project — into the right DS artifact. Classifies first, then scaffolds the correct level (project / feature / decision / task).
license: MIT
user-invokable: true
---

# DS New Request

Takes any request — a new idea, a task, a feature proposal, a question that needs a decision — and routes it into the right DS structure. Classifies before acting.

---

## Step 1 — Classify

Understand what the request actually is:

| Type | Signals | Action |
|---|---|---|
| **New project** | New domain, new product, new codebase, separate scope | Scaffold full project structure |
| **Feature** | Addition to existing product, new capability within scope | Add to `brain/feature-plans/` |
| **Decision** | Two real options, something that rules something out, needs to be written before acting | Scaffold `decisions/<slug>/` |
| **Task** | Concrete action, scoped work, assignable | Scaffold `decisions/<slug>/tasks/<slug>/` under the relevant decision |
| **Open question** | Unresolved, needs research or input before a decision can be made | Add to `brain/memory.md` open questions |

When unsure: ask one clarifying question. Not five.

---

## Step 2 — New project

If classification = new project:
1. Propose a slug (kebab-case, short)
2. Ask for parent directory if not obvious
3. Scaffold:
   ```
   <project-slug>/
     brain/
       memory.md       ← seed from conversation context
       project-plan.md ← forward-looking milestones + open questions
     decisions/
       README.md
     kanban.md         ← empty board: TODO / IN PROGRESS / DONE
     decisionlog.md    ← empty log with format instructions
     node-map.md       ← empty tree
   ```
4. Orient to the new project
5. Name the first recommended next move

---

## Step 3 — Feature

If classification = feature:
1. Write `brain/feature-plans/<feature-slug>.md` with:
   - What it is (1 sentence)
   - Why it matters (user problem + product fit)
   - Scope (what's in, what's out)
   - Dependencies
   - Open questions
2. Add a TODO card to `kanban.md`
3. Suggest `ds-requirements-definition` if scope needs formalizing

---

## Step 4 — Decision

If classification = decision:
1. Scaffold `decisions/<slug>/`:
   ```
   decisions/<slug>/
     decision-plan.md     ← ADR format (see below)
     resources/           ← empty, for artifacts
     memory/
       closets.md         ← stable facts + constraints
       drawers.md         ← things to revisit later
   ```
2. Write `decision-plan.md` with what you know so far:
   ```markdown
   # Decision: <title>
   **Status:** Open
   **Date opened:** YYYY-MM-DD
   **Options:** (list what's been considered so far)
   **Decision:** TBD
   **Rationale:** TBD
   **Consequences:** TBD
   ```
3. Add to `decisionlog.md` as `Open`
4. Name the next move to close it

---

## Step 5 — Task

If classification = task:
1. Identify the parent decision (or create one if needed)
2. Scaffold `decisions/<decision-slug>/tasks/<task-slug>/brief.md`:
   ```markdown
   # Task: <title>
   **Status:** TODO
   **Parent decision:** <slug>
   **Assigned to:** Human | AI | Both
   **What to do:** (concrete, actionable — 1-3 sentences)
   **Done when:** (definition of done)
   **Resources:** (links to relevant files, context)
   **Notes:** 
   ```
3. Add to `kanban.md` as a TODO card with `[YYYY-MM-DD]` tag
4. If AI-executable: say so and offer to start now

---

## Output rules

- Classify out loud in one line: "This is a decision — OQ-01 has two real options worth writing up."
- Act immediately after classifying — don't ask for permission to scaffold
- Write the first version of every new file with real content from the conversation, not just headers
- Voice: direct, expert, friend/mentor — "here's what this actually is, here's what I'd do with it"
