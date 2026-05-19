---
title: "Why Designers Get Less From AI Than Developers Do — And What That Says About the Industry"
slug: designers-vs-developers-ai
description: "Developers adopt AI at twice the rate of designers. The gap isn't about capability — it's about data structure. Engineers have code, PRs, and diffs. Designers have Slack threads and PDFs."
date: 2026-05-14
category: individuals
author: Tal Solomon
keywords: ["AI for designers", "GitHub Copilot vs Figma AI", "designer AI adoption gap", "AI workflow design teams", "why designers don't use AI"]
---

**Developers adopt AI at roughly twice the rate of designers for core work tasks. The gap isn't closing. And it has almost nothing to do with capability — it has to do with data structure.**

---

The numbers are not subtle. According to research published in 2025, 59% of developers use AI regularly for core tasks. Among designers, the figure is 31%.¹ GitHub Copilot crossed a million paid users within months of launch and has continued accelerating. Figma AI, by contrast, is genuinely liked by the designers who use it — and consistently abandoned the moment they step outside Figma.

Something structural is different between these two groups. The question worth asking is what, exactly.

## Why do developers get more from AI than designers?

The answer is in the artifacts.

When a developer asks for help, they can give an AI something precise: a pull request diff, a ticket number, a stack trace, a specific function. The inputs are structured, typed, machine-readable. The AI has something to grip.

When a designer asks for help, the context lives in a Figma comment, a Slack thread, a PDF brief, a recorded client call that nobody has watched since it happened, verbal feedback from a Zoom that ended without notes. None of this is structured. Almost none of it is machine-readable in any useful sense.

This is not a small difference. It shapes everything that follows.

Andrej Karpathy wrote in 2017 that neural networks perform extraordinarily well on tasks where "there is a lot of data and the desired program is difficult to specify explicitly."² Code is explicit by nature. Design rationale, client feedback, creative direction — these are among the hardest things to specify explicitly. The AI gap between developers and designers is not a capability gap. It is a data structure gap.

## What does Cursor's growth say about the design tools gap?

Cursor — the AI-first code editor that launched in 2023 — was tracking roughly $100M ARR by early 2025, growing at a pace that surprised even its early investors.³ GitHub Copilot is embedded in IDEs used by tens of millions of developers. These are not tools people are trying on occasion. They are tools people depend on daily.

The equivalent does not exist for design.

Dylan Field, Figma's CEO, has spoken at Config about AI's role in the design process. Figma AI is real and the features are thoughtful — Make generates UI from prompts, First Draft collapses the blank-canvas phase, AI search makes navigating large files faster. These are genuine improvements to the within-Figma experience.

But here is what happens when you leave Figma.

You open Claude to write the brief that goes with the work. Figma knows nothing about that conversation. You open Notion to document the design rationale. Claude knows nothing about what you built in Figma. You open a new Claude session the next morning. The AI knows nothing about yesterday's session.

GitHub Copilot lives inside the tool where the artifact lives. Figma AI lives inside Figma. But design work doesn't only live in Figma. The problem for designers is not inside any single tool — it's the space between them.

## Is the AI tools gap really a data structure problem?

Yes, and the implication runs deeper than it might first appear.

Code is text. PRs have diffs. Tickets have statuses and assignees. The developer workflow naturally produces machine-readable records of what happened, what changed, and why.

Design work, as currently practiced, does not. The artifact is a Figma file. The rationale is a designer's memory. The feedback is a recording no one transcribed. The decision was something that happened in a room.

Until the design workflow produces structured, legible records — decisions documented, phases tracked, rationale captured — AI tools will continue to underperform for designers relative to what they do for engineers. Not because the models are insufficient. Because there is nothing structured for them to read.

This is fixable. But it requires a layer that doesn't yet exist: something that runs alongside the design process, captures what happens inside it, and makes it legible to the next AI session. Without that layer, the gap persists regardless of how good the models get.

## Frequently asked questions

**Why do developers use AI more than designers?**
The primary reason is data structure. Developer work produces machine-readable artifacts by default: code, PRs, diffs, tickets, stack traces. AI tools can grip and reason about these precisely. Designer work produces Figma files, PDFs, Slack threads, and verbal feedback — formats that are much harder for AI systems to work with. The adoption gap reflects this structural difference, not a difference in capability or effort.

**Does GitHub Copilot outperform Figma AI?**
They address different problems, but GitHub Copilot demonstrates substantially higher adoption and dependency rates. As of 2025, Copilot has tens of millions of active users embedded in daily development workflows. Figma AI is well-regarded within Figma but doesn't extend outside it. The key difference: code tools live inside the artifact itself, while design context spans multiple tools that don't share knowledge with each other.

**Can AI close the gap between developer and designer workflows?**
The model capability is there. What's missing is the infrastructure to feed designers' context into AI in a structured way. That requires a layer that captures project decisions, phase state, client history, and session outputs — and makes them available to whatever AI tool a designer uses next. That layer doesn't exist as a product today, though the technical substrate to build it has matured considerably in 2025–2026.

**What is Cursor and why is it growing so fast?**
Cursor is an AI-first code editor built on VS Code that embeds language model assistance directly into the editing experience — not as a bolt-on, but as the primary interface. It grew rapidly among developers in 2024–2025 because it made AI assistance feel native to the workflow rather than supplementary. Its growth, relative to the absence of an equivalent design-tool, illustrates how differently the two fields have absorbed AI.

---

*¹ Worklytics, "AI Adoption at Work," 2025. The developer/designer adoption ratio is described as approximately 2:1 for core task usage. Nielsen Norman Group's 2025 survey of UX practitioners found broadly consistent figures.*

*² Andrej Karpathy, "Software 2.0," Medium, November 2017.*

*³ Cursor's revenue trajectory was widely reported in developer community publications through late 2024 and early 2025. Exact ARR figures vary by source; the $100M range reflects consensus reporting from the period.*
