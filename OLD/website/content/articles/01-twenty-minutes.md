---
title: "You Spend the First 20 Minutes of Every AI Session Explaining What You Already Know"
slug: twenty-minutes
description: "Designers lose 25+ hours a week to AI context re-briefing. The bottleneck isn't AI capability — it's session continuity. Here's what that costs, and what the fix actually looks like."
date: 2026-05-14
category: individuals
author: Tal Solomon
keywords: ["AI session context", "AI workflow for designers", "ChatGPT forgets context", "AI continuity", "designer AI tools"]
---

**The bottleneck in AI-assisted design work isn't the AI. It's context.** Every session starts cold — no memory of the project, the decisions, the direction you landed on yesterday. You are the continuity layer. You carry the thread. And you are tired of carrying it.

---

Open a new chat. Type the client name. Paste the brief. Explain what phase you're in. Remind it of the decision you made last Tuesday, the constraint the client added in last week's review, the direction you ruled out and why.

You've done this before. Yesterday, probably. You'll do it again tomorrow.

This is not a workflow. It is a tax.

---

## The scene, precisely

It's 9:14 AM. You're a senior designer at a five-person studio. You worked on this project for three hours yesterday — Claude helped you synthesize the research, you landed on a direction, the framing clicked. You closed the tab, went to a client call, lived a life.

This morning you open a new Claude session. The AI knows nothing. It's not even forgetful — forgetfulness implies there was something to forget. The session is simply blank.

So you start re-explaining. The client. The product. The user research you did. The two directions you explored. The one you chose and why. The constraint the client introduced that changed the calculus. Where you left off.

By the time you're done, you've spent 15 to 25 minutes reconstructing the context from your own memory into the AI's working window. Then — and only then — does the actual work begin.

This is the daily experience of most designers who use AI seriously. Not the idealized demo version, where a genius creative director prompts their way to a stunning concept in three exchanges. The real version, where you're a competent professional who has already done the hard thinking, and you're spending a meaningful portion of your morning typing that thinking back into a box that forgot it.

---

## Why does AI forget your project between sessions?

Andrej Karpathy — one of the architects of modern deep learning and a founding member of OpenAI — has made the point that we are living through a transition in the nature of software itself.¹ AI systems have become extraordinarily capable. The models available to a solo designer in 2026 would have required a research team and a nine-figure compute budget five years ago.

The capability isn't the issue. A single Claude session is genuinely impressive: brief synthesis in minutes, competitive analysis in an afternoon, design critique that sounds like a thoughtful senior colleague. The AI, inside a session, is extraordinary.

The problem is the boundary.

Every session is a cold start. Every new agent is a blank slate. Every tool switch — from Claude to ChatGPT, from ChatGPT to Gemini, from any of those to the AI that just shipped inside your design tool — resets the context to zero. The capability travels. The context doesn't.

This isn't a bug any given company is going to fix. It is the default architecture of every AI tool built so far. Sessions are stateless by design. The memory that persists is yours.

---

## How much time do designers lose to AI re-briefing each week?

Consider a modest estimate: a designer uses AI three times per working day. Each session requires 20 minutes of context-setting before any actual work begins. That is one hour of re-briefing per day per designer.

Across a five-person studio, with five working days a week:

**25 hours per week** spent re-explaining what everyone already knows.

At a blended billing rate of $100 per hour — conservative for a studio doing branded product or identity work — that is $2,500 per week. $130,000 per year. Not in output. In overhead.

These numbers are estimates, not a study. But ask any designer who uses AI daily whether 20 minutes per session is high or low, and the conversation gets interesting. For many, it's an undercount.

The r/UXDesign community has been discussing this fatigue specifically for the past eighteen months.² Threads titled things like "am I the only one who finds AI exhausting to maintain" or "anyone else spending more time prompting than designing." The complaints are consistent: it's not that AI doesn't help. It's that the helping starts over every single time. People have tried personal prompt libraries, dedicated "context documents" they paste manually, elaborate CLAUDE.md files. Workarounds for a problem that shouldn't exist.

---

## What is the real problem with AI workflow for designers?

There is a clean way to state this: AI capability is not the constraint. Continuity is.

The output you can get from a session — a brief, a competitive analysis, a set of design principles, a spec — has never been better or cheaper. The tools are astonishing. The teams shipping them are some of the best engineers on the planet.

But the *thread* — the accumulated project context, the decisions made, the directions ruled out, the phase you're in, the client personality, the open questions — that lives only in your head. Every time you begin a session with AI, you are the one doing the integration work. You are the continuity layer. You are the memory.

That arrangement was tolerable when AI was a novelty you used occasionally. It is not tolerable when AI is woven into daily work. When you use it three, five, eight times per day, the integration tax compounds into something that genuinely bends your relationship with the tool.

You start front-loading sessions less. You stay inside one long context longer than you should, because starting over is expensive. You develop anxiety about closing the tab. You've all felt this. It has a specific texture.

---

## What would it look like if AI remembered your project?

The fix isn't more capability. It isn't a better model or a faster inference API or a new feature inside a tool you already use.

The fix is a layer that carries the thread for you. Across sessions. Across tools. Across team members. A layer that means the next session starts where the last one ended — not because you re-typed it, but because it was already there.

You open the tool. The project is already loaded. The decisions from last Tuesday are there. The direction you ruled out is flagged as ruled out, with the reason. The open question from yesterday's review is still open, waiting.

You don't re-brief. You just continue.

Nobody has built this yet. Not in a way that works across tools, for non-technical workers, without a setup tax that eats the savings.

That's what we're building.

---

## Frequently asked questions

**Why do I have to re-explain my project to AI at the start of every session?**
AI tools — Claude, ChatGPT, Gemini, and others — do not retain memory between separate sessions by default. Each conversation starts with a blank context window. Any project knowledge, decisions, or direction from a previous session exists only in your head or in text you manually re-paste. This is a structural characteristic of how current AI systems are built, not a fixable setting.

**Does Claude or ChatGPT maintain context between sessions?**
No — not without explicit workarounds. Anthropic shipped a memory feature for Claude.ai in 2025, and OpenAI has a similar capability for ChatGPT. Both work for personal facts and preferences inside a single tool. Neither persists project-level context across tools, teams, or the full lifecycle of a design engagement. Memory inside one tool is a local fix for what is fundamentally a cross-tool problem.

**How much time does AI context re-briefing actually cost a design studio?**
At a conservative estimate of three AI sessions per day at 20 minutes of context-setting each, a single designer loses roughly one hour per day to re-briefing. Across a five-person studio, that is approximately 25 hours per week — or $130,000 per year at a $100/hr blended rate. The actual number depends on session frequency and project complexity; for studios running multiple active clients, it tends to be higher.

**Is there a tool that preserves AI context across sessions and tools?**
Not yet — not in a way that works system-wide, for non-technical workers, across multiple AI tools simultaneously. Existing workarounds (pasted context documents, prompt libraries, CLAUDE.md files) require manual maintenance and break at every tool boundary. The gap between "memory inside one tool" and "context that travels with the work" is the problem we are building to close.

---

*¹ Andrej Karpathy, "Software 2.0," Medium, November 2017. Karpathy describes the emergence of neural networks as a new form of programmable substrate — one that performs better than human-written code on a growing range of tasks. His subsequent writing and public appearances have consistently framed AI capability growth as the easier problem, with coordination and context as the harder remaining surface.*

*² The r/UXDesign subreddit (~500k members as of 2026) has accumulated hundreds of threads since 2024 on AI fatigue in design workflows. A recurring pattern: designers who use AI regularly report high satisfaction with within-session results and high friction at session boundaries. The phrase "maintaining the AI" appears frequently as a description of the cognitive overhead.*
