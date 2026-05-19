# Brief — The Context Model

**Date:** 2026-04-26
**Owner:** Tal
**Status:** Draft v1
**Supersedes:** the two-axis (size × certainty) user-facing fish picker in [`methodology/flow.md`](../../methodology/flow.md) §§2–4. Methodology underneath is preserved.

> **Rule of the brief:** Any detail below that adds a choice the user has to make, or a vocabulary word the user has to learn before anything works, is wrong and should be deleted.

---

## Problem

The current methodology asks the user to classify their work on two axes — *size* (smaller / bigger) and *certainty* (known / unknown) — into a 2×2 of four fish (Nemo / Tuna / Salmon / Willy). Two problems with that in the AI era:

1. **Two-axis pickers are ceremony.** Asking a designer "is this known or unknown?" before any work begins is exactly the kind of process-shaped friction that bounces users back to "let me just open Claude and start typing." The 2×2 is a methodology artifact, not a product surface.
2. **The user-facing noun is wrong.** "Project" implies a PM/Jira-shaped container. Duble Slash is a **context management system** — the unit is a **context**. The product story and the methodology should agree on the noun.

The methodology under the picker still works. The intensity matrix (16 cells of named methods per archetype × phase) still drives genuine differences in how Explore / Solidify / Build / Ship run. We're keeping all of that. We're hiding it from the user.

## The model

**The unit is a *context*.** It replaces "project" everywhere in product-facing copy. (Subordinate units inside a context — what we currently call "cards" — stay called cards for now.)

**The user picks one thing, and it isn't a fish.** They describe the work in their own words. The AI sizes it on **screens × flows** and surfaces one of two labels:

- **Small** — fits in roughly one session; one-to-three screens; one acceptance category. Tooltip fix. Copy change. Single-screen polish.
- **Big** — multi-session; multi-screen or system-level; multiple acceptance categories. Billing redesign. New feature flow. Platform-shape work.

**The four fish stay, as the AI's classification.** They drive which Explore / Solidify / Build / Ship the operator agents run — exactly as today's matrix specifies. The AI infers the fish from: the task description, prior contexts in the same context-tree, optionally one clarifying question on research-recency ("have we interviewed users on this surface in the last quarter?"). It does **not** ask the user to pick.

**Naming on the context card** — visible, overridable, auditable:

| Card label | What it means | Fish underneath |
|---|---|---|
| `… · Small` | one session, one user-facing thing | **Nemo** (small × known)<br>or **Salmon / "Problem-focused"** (small × unknown — research-led) |
| `… · Big · Solution-focused` | bigger surface, the team has shipped this kind of thing before | **Tuna** |
| `… · Big · Large` | bigger surface, the team has not shipped this kind of thing before | **Willy** |

Concrete card render: `Billing redesign · Big · Solution-focused`.

Fish names (Nemo / Tuna / Salmon / Willy) live as the lineage / brand layer — surfaced on the context detail view, not on the card label. The semantic words (Small / Big / Solution-focused / Problem-focused / Large) are what the user reads in the flow.

## What the user sees

1. User types `//` in any AI tool. Duble Slash activates.
2. DS asks discovery questions — only enough to describe the work in plain language.
3. DS classifies the context, picks size + fish, opens the desktop app.
4. The desktop app shows the **fish flow** as the canonical project view: head (Explore) → left body (Solidify) → right body (Build) → tail (Ship), laid out left-to-right. Cards inside each phase column. (Reference sketch from the 2026-04-26 session — kanban-shaped layout with phase columns.)
5. Each card auto-assigns an **operator agent** (Dora / Sol / Bran / May for the phase) and a **guard** (the human accountable for the agent's output). Guard defaults to the creator; in team mode the creator can reassign.
6. The local AI session works the active card; the desktop app live-updates from each handoff.
7. In team mode, the board syncs across the team. Each card carries its operator + its guard.

## What stays the same (methodology-internal)

- The four fish, their Hebrew names, and the archetype × phase intensity matrix in [`methodology/flow.md`](../../methodology/flow.md) §§4–6.
- The four phases (Explore / Solidify / Build / Ship) and the fish-anatomy mapping in §3.
- The `<FLOW-handoff>` block, gates, reverse transitions, trust receipts.
- Operator + expert agent specs in [`agents/`](../../agents/).

## What changes (and the sweep this implies)

The rename + axis collapse + label change is one atomic sweep, same shape as the 2026-04-24 Willy → Willy rename (40 files, ~248 occurrences). Touch list:

- [`methodology/flow.md`](../../methodology/flow.md) — §§2–4 (axes + sigil), §5 (matrix headers if relabeled), §9 (handoff field contract — `certainty` field becomes AI-internal, not user-supplied), §13 (HAI-collaboration), §14 (worked examples — relabel cards), §15 (lineage note for the rename).
- All four operator agent specs in [`methodology/local-agents/`](../../methodology/local-agents/) — sigil-assist behavior (now AI-driven, not user-prompted), card label format.
- [`agents/operators/dora/skills/sa-sigil-assist/workflow.md`](../../agents/operators/dora/skills/sa-sigil-assist/workflow.md) — now AI-classifies; user only confirms the size if asked.
- Handoff helpers in [`agents/helpers/`](../../agents/helpers/) — handoff `certainty` becomes optional / AI-supplied.
- All four launch articles in [`planning/articles/`](../articles/) — replace "project" with "context" in product-facing copy; relabel sigil examples; refresh worked examples.
- PRD in [`planning/prd/`](../prd/) — context model, guard role, fish flow visualization as the canonical project view.
- Pitch decks in [`planning/pitch-decks/`](../pitch-decks/).
- System-agents docs in [`methodology/system-agents/`](../../methodology/system-agents/).
- Agent + skill manifests in [`agents/`](../../agents/).

The `methodology/fish/*` folder is already flagged "SUPERSEDED, pending Phase 4 deletion" — leave alone.

## Open decisions

- **What replaces "card" inside a context?** "Card" is a UI noun, not a methodology one. The brief proposes keeping it. Tal can override.
- **Hebrew labels.** The four Hebrew names in flow.md §4 (e.g. *ווילי*) — keep as the lineage layer alongside Nemo/Tuna/Salmon/Willy, or retire. Default: keep.
- **Discovery question count.** "Only enough to describe the work in plain language" — needs a concrete cap. Default proposal: max 3 questions (what's the work, who's it for, is it part of an existing flow). Tal to confirm or override.
- **What happens when the AI classifies wrong.** The card label is overridable, but the *override path* needs a UI — one click to recategorize, or a context detail screen. Defer to design pass.
- **Fish flow visualization** — is the dektop-app rendering Tal sketched the V1 default view? Or is there a flatter list view alongside it for team-board use? Default: fish flow is the only view at V1.

## Acceptance for this brief

Tal signs off → next deliverable is the atomic sweep across the touch list above, in one commit, same shape as the Willy rename. No partial migrations.
