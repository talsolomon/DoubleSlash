---
title: "What Does It Actually Mean for AI to 'Know Your Project'?"
slug: ai-know-your-project
description: "Everyone wants an AI that knows the project. But what does that actually require? The brief, the client history, the active decisions, the phase, the team member's role — unpacked layer by layer."
date: 2026-05-14
category: product
author: Tal Solomon
keywords: ["AI project context", "AI that knows your project", "AI context window design", "project-aware AI", "AI design assistant context layers"]
---

**"An AI that knows the project" is one of the most common things designers say they want. It's also one of the least precisely defined. What does it actually require? The answer has layers — and nobody has shipped all of them for design studios yet.**

---

Ask a designer what they want from AI and the answer is often a version of the same thing: "I want it to know my project." Know the client. Know the constraints. Know where we are. Not need to be explained every time.

This is a reasonable desire. It is also a product specification masquerading as a feature request. "Knows the project" is not one thing. It is at least six distinct things, each requiring different infrastructure to capture and maintain. Most tools today address, at best, one or two.

## What are the layers of AI project knowledge?

**Layer 1: The brief.** The foundational document — what is being built, for whom, why, with what constraints. This is the most commonly pasted piece of context in any AI session, and the easiest to provide because it is usually already written somewhere. The failure mode is that briefs go stale. The brief from month one often doesn't reflect constraints added in month two or directions revised in month three.

**Layer 2: The client history.** Who is the client, what have they approved before, what do they respond well to, what are their sensitivities, what failed with them in the past. This almost never lives in a document. It lives in the accumulated experience of the designer who has worked with them — in the memory of the person who was on the call when the client said that specific thing about that specific direction. It is genuinely hard to capture and harder to transfer.

**Layer 3: The active decisions.** What has been decided since the brief was written. Not the original intent — the decisions made in the current phase of work. The direction chosen in last Tuesday's review. The approach ruled out on Wednesday and why. The constraint added by the developer on Thursday. These decisions are the current state of the work, and they change continuously throughout a project.

**Layer 4: The phase.** Where in the design process the work currently sits. Discovery is different from definition, which is different from design exploration, which is different from production-ready delivery. The same information is useful or irrelevant depending on the phase. An AI that doesn't know the phase doesn't know which context is relevant right now — and often produces output calibrated to the wrong moment in the project lifecycle.

**Layer 5: The team member's role.** Who is asking and in what capacity. A creative director and a production designer need different context about the same project. A developer picking up a handoff needs different framing than the designer who created the work. A new joiner needs different depth than someone who has been on the project since month one. Role-appropriate context is not the same as comprehensive project context.

**Layer 6: The open questions.** What hasn't been decided yet. What the team is still working through. What will need a decision before the next phase can begin. These are the live edges of the work — the places where AI assistance is most valuable and where the absence of context is most costly.

## How much context can AI actually hold?

Simon Willison, who has written more carefully about the practical behavior of language models than almost anyone outside the major labs, draws an important distinction between what a model's context window can technically hold and what it can usefully reason about.¹²

Claude 3.5 and similar models have context windows of 200,000 tokens — enough to fit hundreds of pages of project documentation. In principle, you could paste the entire project history into every session.

In practice, this approach degrades. Very long contexts produce reasoning quality that attenuates for material in the middle sections. The model attends well to the beginning and end of its context window and less reliably to what's buried in the middle. Paste forty pages of project history and the model will respond competently to the immediate question — but it may miss the constraint on page seventeen.

This is why the right solution is not "give the AI more context." It is "give the AI the *right* context, structured correctly, at the right time." That is a retrieval and structuring problem, not a context-window problem. The raw capacity exists. The intelligent selection of what to surface when is what hasn't been built.

## Why hasn't anyone built this for design studios?

The components exist individually. Large context windows are real. Retrieval-augmented generation can surface relevant context from a larger knowledge base. Structured data formats can represent decision states and phase information in machine-readable ways.

What hasn't been assembled for design studios is the *capture layer* — the thing that takes the natural output of design work (sessions, reviews, briefs, decisions, handoffs) and converts it into structured context that can be retrieved and injected correctly at the start of each new session.

This is harder than it sounds. Design work is conversational, contextual, and highly variable across studios and projects. Building a capture layer that works without requiring designers to change how they work — without a documentation ritual, without a structured input form, without another tool to maintain — is a product challenge without a clean existing solution.

The unsolved problem is not context windows. It is not model capability. It is the automatic, lightweight, non-intrusive capture of project context from the natural flow of design work. Nobody has shipped that yet.

## Frequently asked questions

**What does it mean for AI to "know" a design project?**
It means having access to at least six layers: the current brief, the client history relevant to the current work, the decisions made in the current phase, the phase itself, the role of the person asking, and the open questions that still need resolution. Each layer requires different capture infrastructure. Most current tools provide none of these automatically and require manual re-pasting of context at the start of each session.

**Can you just paste the project brief into Claude at the start of every session?**
You can, and many designers do. The brief addresses Layer 1. It doesn't capture active decisions (Layer 3), phase state (Layer 4), or open questions (Layer 6) — which are often the most critical context for the current session. A brief from month one also doesn't reflect what was decided in month three. Pasting the brief is better than nothing; it is not the same as the AI knowing the project.

**How large is Claude's context window, and is it enough for a full project?**
Claude 3.5 Sonnet has a context window of 200,000 tokens — enough for hundreds of pages of text. In practice, very long contexts produce reasoning quality that degrades for material buried in the middle sections. The right approach is not to paste everything, but to surface the right subset of project context for the current session. That requires a retrieval layer, not just a larger window.

**Has any company built a tool that gives AI full project context for design teams?**
Not as of 2026. The closest approaches are manual: designers maintain context documents they paste into sessions, or use CLAUDE.md files that load basic project information. Automatic, cross-tool, cross-session project context capture — where the AI knows the current phase, active decisions, and open questions without requiring manual input — has not been shipped for design studios. That is the gap we are building to close.

---

*¹² Simon Willison writes at simonwillison.net and has published some of the most technically careful publicly available analysis of how language models behave in practice — including detailed work on context window behavior, retrieval-augmented generation, and the practical limits of what LLMs actually retain and reason about. His writing is a reliable primary source for understanding the gap between theoretical and practical model capabilities.*
