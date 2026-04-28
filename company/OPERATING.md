---
name: Duble//Slash — Operating Model
description: How the company runs. AI-native from day zero. Every important action produces an artifact.
type: company-charter
---

# Duble//Slash — Operating Model

**Last updated:** 2026-04-28 · **Founders:** Tal Solomon, Shenhav

We are building Duble//Slash as the kind of company Duble//Slash is for. The product is a queryable, agent-native operating layer for knowledge workers. The company runs on the same principles. We are the first customer.

---

## Principles

1. **AI is the OS, not a tool.** Every workflow flows through the agent layer in this repo. If a process can't be expressed as an artifact + an agent, we rebuild it until it can.
2. **Closed loops, not open ones.** Decisions, customer signal, methodology tests — each produces a written artifact, gets reviewed, and feeds back into what we change next.
3. **The company is queryable.** Anything that matters lives as a file Claude can read. No tribal knowledge. No tool-locked context.
4. **Token-max, not headcount-max.** Default move: try an agent first. Hire only when an agent attempt has failed for a real reason.
5. **Monetization is the only filter.** Beautiful operating ≠ progress. Every artifact and loop must connect to "who pays, for what, why."
6. **One DRI per outcome.** No co-ownership, no committees. See [`dris.md`](dris.md).

---

## Loops

Each loop has: an input, an artifact, a DRI, and a cadence.

| Loop | Input | Artifact | DRI | Cadence |
|---|---|---|---|---|
| **Decision** | Any non-trivial call (positioning, pricing, who-to-build-for, hire/no-hire, build/buy) | `decisions/YYYY-MM-DD-<slug>.md` | proposer | per decision |
| **Customer signal** | Outreach reply, studio call, designer convo, demo reaction | `signal/<source>-<YYYY-MM-DD>.md` or row in `signal/outreach.csv` | Tal | per touch |
| **Methodology evolution** | Real session that contradicts or confirms current framing | edit to `methodology/` + decision artifact | Tal | as triggered |
| **Product** | Feature spec → tests → agent build | repo PR + decision artifact for non-trivial scope | Shenhav (design), Tal (positioning) | per feature |

If a loop is firing without producing its artifact, the loop is broken — fix the loop, don't paper over it.

---

## What lives where

- `STORY.md` — current pitch narrative. Source of truth for positioning.
- `methodology/` — FISH + FLOW. The framework Duble//Slash teaches and embodies.
- `agents/` — operator + skill manifests. The fabric.
- `skills/` — reusable Claude skills.
- `website/` — landing + product surface.
- `company/` — how we run. Decisions, signal, DRIs, this file.
- `_old/` — archived. Read-only. Pre-2026-04-28 work.

---

## What we do NOT do

- No private decision-making in DMs. If it's worth deciding, it's worth a file.
- No task lists masquerading as strategy. Tasks belong in personal tools, not in the repo as company infra.
- No new top-level dirs without a decision artifact justifying them.
- No infra spam (env vars, OAuth, serverless, PATs) without a flagged tradeoff and a zero-setup alternative considered.
