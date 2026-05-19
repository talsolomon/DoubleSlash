---
title: "Claude Just Got Memory. Here's Why That's Not Enough for Your Studio"
slug: claude-memory-not-enough
description: "Anthropic shipped memory for Claude. It remembers your name and preferences. It doesn't remember your project, your team's decisions, or what happened in Figma yesterday. Those are different products."
date: 2026-05-14
category: individuals
author: Tal Solomon
keywords: ["Claude memory", "Anthropic memory feature", "AI project memory", "ChatGPT memory teams", "AI context for design studios"]
---

**Anthropic's memory feature for Claude is a real improvement for individual users. It is not a solution to the context problem design studios face. Personal memory and shared project context are fundamentally different products.**

---

In late 2024, Anthropic began rolling out a memory capability for Claude.ai.⁶ Claude would remember things about you across sessions — your name, your role, your preferences, facts you'd shared previously. The reception was warm. After years of blank-slate sessions, the idea of an AI that carried something forward felt like progress.

OpenAI had shipped a similar feature for ChatGPT earlier that year. The pattern was clear: the major AI labs had acknowledged the cold-start problem and were shipping partial answers to it.

They are partial answers. Here is why.

## What does Claude's memory feature actually do?

Claude's memory, as currently implemented, stores facts about *you as a user*. Your name. Your profession. Projects you've mentioned. Preferences you've expressed. Things you've explicitly asked it to remember.

This is useful. It removes the friction of re-introducing yourself at the start of each session. It means Claude knows you're a designer before you tell it, knows you prefer concise output, knows you work in a particular domain.

What it doesn't do is track the state of a project. It doesn't know which direction you chose on Tuesday. It doesn't remember the constraint the client added. It doesn't carry the open question from yesterday's session into today's. It doesn't know what's been locked and what's still being decided.

More significantly: it doesn't know what happened in the other tools. Not what Figma AI generated last week. Not what was decided in the Notion doc. Not what the developer asked about in Slack.

Claude's memory is personal and preferential. Project context is situational, evolving, and cross-tool. These are different problems with different shapes.

## Why isn't memory in one tool enough for a studio?

A studio doesn't run on one tool. It runs on five or eight, depending on how you count.

The brief lives somewhere. The research lives somewhere else. The decisions from last week's review are in a Loom recording, a Notion doc, or someone's handwritten notes. The AI conversations that shaped the current direction happened in Claude, or ChatGPT, or both, on different days.

Claude remembering that you prefer bullet points doesn't help when the real question is: what did we decide about the navigation pattern last Wednesday, and does the developer know about the constraint we added on Thursday?

That information isn't in Claude's memory. It isn't in any AI tool's memory. It lives in the email sent after the call, the recording nobody re-watched, and the head of the designer who was in the room.

When a colleague needs to pick up the work, they don't need Claude to remember your name. They need the project to be legible — the decisions documented, the open questions flagged, the phase state clear. That is not a memory feature. That is a shared context infrastructure, and it requires a substantially different architecture.

## What is the difference between personal memory and project context?

Personal memory is about the user. It answers: who is this person, what do they like, what should I know about them before we begin?

Project context is about the work. It answers: where does this project stand right now, what has been decided, what is still open, who did what, what did the last session produce, what does the next session need to know to continue?

Claude's memory addresses the first. No tool currently addresses the second in a way that works across sessions, across tools, and across multiple teammates.

The distinction matters because the two require different infrastructure. Personal memory can live in a user profile attached to a single tool. Project context needs to be captured from multiple tools, structured at the level of decisions and phases, shared across team members, and injected into whichever AI context window opens next.

Building personal memory is genuinely hard. Building shared project context is a different problem entirely — harder, more complex, and worth more to a studio operating at any real scale.

## Does any AI tool currently solve this for design studios?

Not yet. The closest existing approaches are manual: CLAUDE.md files maintained by hand, paste documents copied between sessions, shared Notion pages that someone is responsible for keeping current.

These workarounds share a common failure mode: they require human maintenance. The value of a project context layer is that it should be captured automatically, from the work itself, without requiring a separate documentation ritual. A context layer that requires you to write it is somewhat better than no context layer, but it adds a new task to every session.

Claude's memory feature is a step in a genuinely useful direction. So is ChatGPT's equivalent. They signal that the major labs understand the problem. They are not, as of today, solutions to it — particularly not for teams, where the context needs to be shared rather than individual.

## Frequently asked questions

**Does Claude remember conversations between sessions?**
Claude.ai has a memory feature that stores personal facts and preferences across sessions. It does not retain the content of previous conversations by default, nor does it track project-level state like decisions made, directions chosen, or open questions. Each new session starts without knowledge of previous sessions unless an explicitly stored memory happens to be relevant.

**Is there a version of Claude memory that works for teams?**
As of 2025, Claude's memory feature is individual — it stores facts about a specific user, not shared project state accessible by multiple teammates. Team-level context, where one person's session outputs are available to a colleague's session, is not a feature of Claude's current memory system.

**What is the difference between Claude's memory and a project context layer?**
Claude's memory stores user-level preferences and facts. A project context layer would capture evolving project state — decisions, phases, open questions, artifacts produced — from multiple tools simultaneously, structure it automatically without requiring manual input, and make it available to any AI tool any team member opens next. The latter is a substantially more complex problem and a different product category.

**Why did Anthropic ship memory if it doesn't fully solve the context problem?**
Personal memory addresses the most visible and tractable piece of the cold-start problem: the friction of re-introducing yourself. It's a genuine improvement for individual users. The project context problem — capturing state across multiple tools and making it shareable across a team — requires infrastructure that no single AI provider can own unilaterally, since it involves multiple products from multiple companies. It has to be solved by something that sits outside any one tool.

---

*⁶ Anthropic began rolling out memory for Claude.ai in late 2024. The feature stores user-shared facts and preferences across sessions within the Claude.ai product. It is distinct from the API product, which remains stateless by default.*
