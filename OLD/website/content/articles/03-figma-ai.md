---
title: "Figma AI Is Not Going to Save Your Workflow"
slug: figma-ai-wont-save-workflow
description: "Figma AI is genuinely good at what it does inside Figma. The problem is what happens the moment you step outside it — and that's where most of the hard design work actually lives."
date: 2026-05-14
category: individuals
author: Tal Solomon
keywords: ["Figma AI", "Figma Make", "AI design workflow", "Figma AI limitations", "AI between design tools"]
---

**Figma AI is real, useful, and well-made. It is also a tool that works inside Figma. Most of what makes a design project difficult to run doesn't live inside Figma.**

---

At Config 2024, Dylan Field showed a version of design work where AI could generate UI from a prompt, rename layers intelligently, and draft interactive prototypes from rough descriptions.⁴ The demos were impressive. Figma Make — the natural-language interface to Figma's design surface — is a genuinely interesting product. It understands components, constraints, and the vocabulary of professional design in a way that earlier generative tools did not.

Designers who use it regularly say the same thing: it's excellent. It makes the within-Figma parts of their work meaningfully better.

And then they open Claude, paste the brief, and start explaining the project from scratch.

## What does Figma AI actually do?

The Figma AI suite, as of 2025, includes several distinct capabilities:

**Make** generates UI from a text prompt — layouts, components, flows. It works within design systems and understands Figma's component model.

**First Draft** produces initial wireframes or design concepts from a description. It's a starting point, not a finished screen, but it meaningfully collapses the blank-canvas phase.

**Rename Layers** applies intelligent naming conventions to messy layer hierarchies. A small thing that saves real time on inherited files.

**AI Search** lets you describe what you're looking for in a file rather than navigating manually.

These are genuine productivity gains. The AI understands the design surface it operates on. It knows what a component is, what a frame is, what auto-layout does. The limitation has nothing to do with how good these features are.

## Why doesn't Figma AI solve the design workflow problem?

Because the workflow doesn't live inside Figma.

The brief lives in Notion or Google Docs. The client feedback lives in an email thread or a recorded call. The strategic rationale lives in a slide deck from last month. The decisions about what not to build live in the notes from Tuesday's call — if those notes exist. The research lives in another tool entirely.

And the AI conversations that drive the hardest thinking — synthesis, tradeoff analysis, framing — happen in Claude or ChatGPT, not in Figma.

A designer described this pattern in a thread that circulated in design communities in early 2025:⁵ she uses Figma AI constantly. It's the best thing that has happened to her layer management and wireframing process. She also opens a new Claude session every single morning and pastes the full project brief, because Figma AI has no idea what Claude knows — and Claude has no idea what Figma AI did yesterday.

Two tools. Two contexts. Two cold starts.

Figma AI and Claude are not competing — they're addressing different surfaces of the same workflow. The problem isn't that either is incomplete. The problem is that *tool-level AI doesn't compound across tools*.

## Why doesn't AI compound across the design stack?

Each tool with AI features is optimizing for what happens inside that tool. This is rational product strategy: Figma should make Figma better, Notion AI should make Notion better, Claude should make Claude better.

But the experience of doing design work is not "using one tool." It is moving between six or eight tools in a day: Figma, Claude, Notion, Slack, Loom, Linear, Google Drive, email. The context of the project has to travel across all of them. Currently, it doesn't. You carry it.

When you're working in Figma AI and need to think through a strategic decision, you switch to Claude. But Claude doesn't know what file you were in, what component you were building, or what brief you started with. You explain. When you return to Figma AI, it doesn't know what you and Claude decided.

Every tool is an island. Your memory is the bridge.

This is the session-boundary problem scaled up by the number of tools in your stack. Each boundary costs time. Each boundary costs clarity. Each boundary is an opportunity for something important to get lost in transit.

## What would it look like for AI to actually work across a studio's workflow?

It would require something none of the individual tools — Figma, Claude, ChatGPT, Notion — have an incentive to build unilaterally: a context layer that sits outside all of them, captures what happens in each, and makes that context available to whichever tool you open next.

Not a Figma plugin. Not a Claude integration. Not a Notion AI add-on. A layer underneath all of them.

Figma AI will keep getting better at what it does inside Figma. So will the AI inside every other tool you use. None of that changes the cross-tool problem, because no tool has a structural incentive to route your context to a competitor's product.

The fix has to come from outside the tool stack.

## Frequently asked questions

**What can Figma AI actually do in 2025?**
Figma AI includes Make (UI generation from text prompts), First Draft (wireframe generation from descriptions), AI-powered layer renaming, AI search within files, and prototype generation features. These features work within Figma and understand Figma-specific concepts like components, frames, and auto-layout. They are well-regarded by designers who use them regularly.

**Does Figma AI know about my Claude conversations or project briefs?**
No. Figma AI operates exclusively within Figma and has no access to content from other tools — Claude, Notion, Slack, email, or any other application. Each tool's AI operates in isolation. Context developed in a Claude session is not available in Figma AI, and vice versa.

**Why don't AI tools share context across the design workflow?**
Because each AI tool is built to serve its host platform. Figma AI's job is to make Figma better. Claude's job is to make Claude better. Neither has a structural incentive to route your context to a different company's product. Bridging them requires a layer that operates outside any individual tool — one that captures context from across the workflow and makes it available wherever you work next.

**Is Figma AI worth using?**
Yes, for what it does. Designers who use Figma AI for layer management, wireframe drafts, and in-file iteration report genuine time savings. The caveat is that these gains are scoped to what happens inside Figma. The parts of design work that happen outside Figma — briefs, strategic conversations, cross-tool context, handoffs — are unchanged.

---

*⁴ Config is Figma's annual user conference. Figma AI features including Make were introduced and demonstrated at Config 2024. Dylan Field, Figma's CEO, delivered the keynote.*

*⁵ This pattern — designers who use Figma AI enthusiastically and still manually paste context into Claude — appears consistently in design community discussions on X, Threads, and Discord communities focused on AI-assisted design throughout 2024–2025.*
