---
name: Brief — Studio v1
description: One-page thesis for Duble//Slash as a Creative AI Studio (web SaaS) for designers — beautifully designed surface, a Figma critic agent as the wedge, solo free, money from implementation services. Positioned against Claude Design (Anthropic, shipped 2026-04-17).
type: planning-artifact
---

# Brief — Studio v1

**Date:** 2026-04-27
**Owner:** Tal
**Status:** Draft v2 — for sign-off
**Relates to:** [brief-context-model.md](./brief-context-model.md), [pitch-deck-duble-slash-v2.md](../pitch-decks/pitch-deck-duble-slash-v2.md).

> **Rule of the brief:** Every line answers *who pays for what, why now, and why a designer would actually open it*. FLOW is the engine; the surface is a beautifully-designed studio.

---

## Thesis

**Duble//Slash is a Creative AI Studio — web SaaS — for designers. Run by agents. Synced through a Context Cloud. Free for solo, cheap for teams, monetized through implementation services.**

Five lines:

1. **Surface:** a web app that is itself top-notch design work — fish-flow board, team view, cloud-synced lineage, the polish a designer expects. The opposite of a chat box.
2. **Workforce:** four operator agents (Dora · Sol · Bran · May) + nine experts. Plus **the critic** — an agent that reads your live Figma file via MCP and tells you, specifically and with grounded references, what's actually wrong with it.
3. **Substrate:** Context Cloud — every brief, decision, asset, handoff, and trust receipt for the team's work, synced live across the team and the designer's other tools.
4. **Engine (under the hood):** FLOW. Users invoke it by typing `//` inside the product (and eventually in their personal Claude) when they need something.
5. **Wedge:** the critic. It's the demo every designer screenshots, the one thing nobody else ships, and the door we walk every designer through.

## The pain — restated

Designers are **not** harnessing AI productively. Most aren't using it for design work at all. The ones who try get one of two things:

- **Ugly chat** (Claude / ChatGPT) — powerful, but shaped like a terminal. Designers don't live in terminals.
- **One-shot screen generators** (v0, Lovable, Galileo) — produce 70%-finished output that breaks at the edges, then the dev asks the designer to explain why it's shit.

The 70% ceiling, the un-completable one-shots, the missing critique loop — we've seen every failure mode. Studio v1 is the answer: a designed surface, agents that finish the last 30%, and a critic that tells you what's actually wrong before the dev does.

## Competitive context — Claude Design (Anthropic)

Anthropic shipped **Claude Design** at claude.ai/design on **2026-04-17** — ten days before this brief. Mike Krieger left Figma's board three days earlier. It has a persistent canvas, org-scoped sharing, design-system awareness from your codebase, and a populated Skills marketplace. Treat it as the dominant adjacent product, not a future threat.

**Where they aim, and where we don't:**

| | Anthropic / Claude Design | Duble//Slash Studio |
|---|---|---|
| **ICP** | Non-designers — founders, PMs, marketers without Figma skills (their language). | Designers. Stated, not implied. |
| **Figma direction** | Read-only / dev-handoff (`/implement-design`, token extraction, Code-to-Canvas write). | The inverse — read the live file, **critique back to the designer**. |
| **Methodology** | Closed product, closed skills. | OSS methodology (FLOW), closed platform. |
| **Solo access** | Pro / Max / Team / Enterprise required to enter the preview. | **Free, forever, full-strength.** |
| **Headline surface** | The canvas. | The fish-flow board + the critic. |

**The 6-month risk.** Every piece needed to bundle "share a Claude Design project, assign skills to frames, sync to Figma" already ships at Anthropic — canvas, org sharing, Skills marketplace, Figma MCP, Code-to-Canvas. One bundling release within ~6 months eats most of our briefed surface for $20/mo across millions of installed Claude subscribers.

**What keeps us defensible:**

1. **The critic loop.** Read-the-file-and-tell-the-truth, with write-back to Figma. Nobody else ships this. Ship the demo before the bundling window closes.
2. **OSS FLOW + free solo.** Open methodology is a gravity well a closed competitor can't copy without changing identity. Free solo is a wedge across their paywall.
3. **Designer-first copy and ICP.** Don't drift to "anyone can design." That's their lane and we lose it.
4. **Speed beats scope.** v1 = the critic + the board. Cut everything else if it slows the critic.

## Who pays — and what for

**Adoption-first. Money comes later, from services, not seats.**

| Tier | Price | What you get | Who it's for |
|---|---|---|---|
| **Solo** | **Free, forever** | Full web app, all agents, personal Context Cloud, `//` invocation, Figma MCP critique. | Every designer. We're not helping you 1:1 — but the product is full-strength. |
| **Team** | **$10/seat/mo** | Shared Context Cloud, team board, lineage across projects, guard handoffs, role permissions. | 2+ person studios and in-house design teams. |
| **Implementation services** | Quoted | Onboarding, custom agents/experts, brand context loaded into Cloud, training, ongoing studio support. | Studios and teams that want us to set it up properly and keep it sharp. |

Revenue at v1 is **services, not subscriptions**. The product exists to win every designer; services convert the studios who want help running it.

**Not v1 ICP** — enterprise governance buyers, brand-team compliance, agencies above ~25 (different motion).

## What ships — Day One

**The web app, end-to-end:**

- **Kanban / fish-flow board** — Explore → Solidify → Build → Ship as the canonical project view. Cards carry operator + guard. This is the home screen.
- **Cloud sync + team view** — live-updating board, lineage queries, handoff log.
- **Figma MCP integration** — the critic and the operators read your Figma files. The user keeps working in Figma; the studio stays synced.
- **`//` invocation** — anywhere in the app. Eventually wired to the user's personal Claude so `//` works outside the app too.
- **A canvas surface** *(if it earns its place)* — spatial layout for contexts and cards. Optional at v1; cut if it slows the critic loop.

**Agents that ship at v1:**

| Phase | Operator | Day-one expert(s) |
|---|---|---|
| Explore | **Dora** | Analyst, UX |
| Solidify | **Sol** | PM, Architect |
| Build | **Bran** | Dev, Design |
| Ship | **May** | QA, Tech-writer |

**The critic — the demo wedge:**

The critic is the reason a designer opens the product. It reads the live Figma file via MCP and runs the **full stack of design lenses** a senior designer would. The lenses turn on/off per context and per loaded knowledge:

- Visual hierarchy, layout, spacing, typography, contrast
- Brand consistency (when brand context is loaded into the Cloud)
- Design-system compliance (when a system is loaded)
- Information architecture and flow coherence across screens
- Microcopy, tone, clarity
- Accessibility (WCAG)
- Pattern fit / dark patterns / anti-patterns
- Lineage — prior decisions on this surface from the Cloud
- Heuristic frameworks (Nielsen, Shneiderman, ISO 9241) — *one input among many, not the headline*
- Conversion / business-goal alignment when goals are loaded

**Output is grounded and specific.** Not *"consider improving clarity"* — *"the modal CTA contradicts the 'Get started' label two screens back; tone-of-voice in the empty state breaks your brand context; the disabled button fails contrast on the cream background."*

This is what gets us in the door. This is the demo designers screenshot.

## OSS vs. closed

| OSS (public repo) | Closed (the product) |
|---|---|
| FLOW methodology — [methodology/flow.md](../../methodology/flow.md) and supporting docs. | The web app: canvas, kanban, team view, billing, auth. |
| Operator + expert agent specs — [agents/](../../agents/). | Context Cloud (managed sync, server-side). |
| `//` install bundle for personal Claude / Cursor. | Figma MCP integration (the critic loop). |
| Skill workflows (.md). | All UI, all designed surfaces, all the polish that makes a designer open it. |

OSS = the methodology and the agents. The platform is not OSS.

## Context Cloud — what it is at v1

A studio-scoped store of contexts, cards, handoffs, assets, and trust receipts. Synced live to the team's web app. Designed for designers (visible, browseable, lineage-first), not a vector DB.

**Cloud shape — open question.** Two paths:

- **Managed Cloud (default web SaaS):** we run servers, OAuth, sync. Faster product, more infra to ship.
- **GitHub-repo-as-Cloud:** the studio's Cloud is a private GitHub repo they own — we sync to it, they keep the data. Zero-setup for us, no servers, but team features (live sync, permissions) get harder.

Per [feedback_no_infra_spam](../../../.claude/projects/-Users-talsolomon-Documents-dubleslash/memory/feedback_no_infra_spam.md), I'd normally push for the lighter path — but a top-notch designed web app probably needs managed sync to feel right. **Tal flagged this as "not sure, sounds nice"** — leaving open. Recommend we pick after the landing page draft, when the surface is concrete enough to test against the cloud shape.

## What stays the same

- FLOW methodology — unchanged.
- Context-as-unit, Small/Big surface, AI-internal fish classification (per [brief-context-model.md](./brief-context-model.md)).
- Operator + expert architecture (per [task-board.md](../task-board.md) FISH-013 / FISH-014).
- OSS launch (Milestone 1) ships methodology + agents + install. Studio v1 is **Milestone 2** and is closed-source product.

## What's explicitly NOT in v1

- Desktop app. Browser only.
- Native AI image / video generation. Agents call out to the user's tools.
- Client-facing portal.
- Marketplace, public templates.
- Mobile.
- Real-time multi-cursor collab. Async board sync only.
- Paid solo tier. Solo is free, full-strength, forever.

## Open decisions

1. **Cloud shape** — managed vs. github-repo-as-cloud. Tal: "sounds nice but not sure." *Default: defer until landing draft.*
2. **Team-tier seat minimum** — 1, 2, or 3 seats? *Default: 2 seats minimum (defines "team"). Solo stays free at 1 seat.*
3. **Services pricing model** — fixed-scope engagement, monthly retainer, or both? *Default: both — engagement to onboard, retainer to keep sharp.*
4. **Heuristic-eval agent home** — is the critic an expert (under May / Ship), a standalone agent, or invokable from any phase? *Default: invokable from any phase, owned by May for lineage write-back.*
5. **`//` in personal Claude** — when does the connector ship? V1, or post-launch? *Default: post-launch; v1 keeps `//` inside the web app.*

## Acceptance for this brief

Tal signs off → next deliverables, in this order:

1. **Landing concept** — one page that sells the critic above the fold. Headline is the demo, not the methodology.
2. **Pricing page draft** — solo free / team $10 / services-quoted.
3. **Task-board sweep** — add Studio v1 cards under MKT/PRD/OPS/DES, mark dependencies on FISH-013/014, and a P0 critic-MVP track that ships against the 6-month bundling window from Claude Design.

No code touched until landing + pricing read right. **The critic ships first** — every other v1 surface is cut before the critic is.
