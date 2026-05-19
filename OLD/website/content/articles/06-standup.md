---
title: "The Standup Is a Symptom, Not a Solution"
slug: standup-symptom
description: "Daily standups exist because project context doesn't travel automatically. They're not a ritual or a culture choice — they're a workaround for missing infrastructure. Fix the infrastructure, and the standup becomes optional."
date: 2026-05-14
category: teams
author: Tal Solomon
keywords: ["daily standup meeting", "async work AI teams", "standup alternatives", "AI team workflow", "context delivery design teams"]
---

**The daily standup exists because project context doesn't flow automatically between team members. It is not a ritual. It is not a culture choice. It is a workaround for an infrastructure problem. Fix the infrastructure, and the standup becomes optional.**

---

The daily standup was invented as a forcing function. Get the team together every morning, and everyone has to state what they're working on, what they finished, and what's blocking them. Fifteen minutes. Move on.

The logic is sound: if people don't share context voluntarily, build a structure that makes them share it on a schedule. The standup is an acknowledgment that context, left to its own devices, doesn't travel. It stays with the person who has it. The standup redistributes it.

The question worth asking is whether the redistribution mechanism is the right intervention, or whether the problem it solves could simply be solved differently.

## Why do teams still do daily standups?

Jason Fried and David Heinemeier Hansson, who have spent two decades writing about how Basecamp runs without traditional meeting culture, make a point that is easy to dismiss and harder to refute: most of what gets said in a standup is information that already exists and could be read rather than spoken.⁸

The standup is synchronous because the information isn't written down. If it were written down — automatically, in a form that could be read at any time — the synchronous meeting becomes redundant. What was blocking me yesterday is visible in the system. What shipped is logged. What I'm working on is tracked.

GitLab, which operates as one of the largest fully remote companies in the world and has published extensively on its async-first culture, makes the same argument from operational experience: synchronous communication should be reserved for decisions that genuinely require it.⁹ Status sharing is not one of those things. It requires legibility, not synchrony.

The reason most teams can't adopt this approach is that their project context isn't legible. It lives in people's heads, in Slack threads, in AI sessions that have been closed. Making it legible would require someone to write it down, which takes time, which is why nobody does it, which is why the standup persists.

## How does AI change the standup calculus?

AI has made individual work faster and more productive. It has not, by default, made team context more visible. In some ways, it has made it less visible.

A designer who used to think through a problem with a colleague now thinks through it with Claude. The thinking is often better; the output is faster. But the colleague doesn't know it happened. The team doesn't know what direction was chosen or what was ruled out. The AI session is private by default.

This creates a new coordination gap. Teams are producing more work per person per day, but the visibility of that work — what it is, where it stands, what shaped it — hasn't increased proportionally. The standup was already struggling to convey meaningful context before AI became a daily collaborator. After AI, the gap between what's being done and what the team knows about it has widened.

The answer is not more standups. It is context that travels automatically — from the AI sessions where the work happened, to a shared layer that the whole team can read.

## What replaces the standup in an AI-native team?

A context layer that captures what each person is working on, what decisions were made yesterday, what's blocked, and what's ready to move. Not because anyone wrote it down, but because the sessions that produced it were logged automatically.

The standup question "what did you work on yesterday?" becomes answerable from the session record. "What's blocking you?" is surfaced by the context layer, not excavated in a meeting. "What are you working on today?" is visible from the open tasks and their current phase.

Teams that solve this problem will find that the fifteen-minute morning call becomes unnecessary for most of its stated purposes. It might survive as a social connection — people like seeing each other, and that's legitimate — but not as an information mechanism. The information work will be done by the context layer.

For AI-native teams, the standup will become a choice rather than a necessity. Most will make it optional. Many will drop it entirely.

## Frequently asked questions

**Why do teams still do daily standups in 2026?**
The daily standup persists because project context doesn't automatically flow between team members. Without a structured mechanism for sharing status, information stays siloed with the individual. The standup solves this by forcing synchronous sharing on a schedule. It is a workaround for the underlying problem — the absence of a system that makes team context legible without requiring a dedicated meeting.

**Can AI replace the daily standup?**
Not automatically, with current tools. AI could replace the information functions of a standup — what's being worked on, what's blocked, what shipped — if it had access to each person's session context. Current AI tools don't share that context across team members by default. A cross-tool context layer that captures and distributes session outputs would enable async status sharing that makes the standup redundant for its informational purpose.

**Is the daily standup a waste of time?**
That depends on whether the team has better alternatives for context sharing. For teams with no shared context layer, the standup provides genuine value as a forcing function. For teams with legible, up-to-date shared context, the standup is redundant overhead. The question isn't whether standups are good or bad — it's whether the information problem they solve has been solved a better way.

**What does an async-first AI workflow actually look like?**
Session outputs captured automatically. Decisions logged as they're made. Open questions flagged and visible to the team. A shared layer that anyone can read before starting work, without waiting for a morning call. GitLab's async-first model provides the cultural template; what's missing for most design teams is the technical layer that makes design and knowledge-worker context as legible as software commits.

---

*⁸ Jason Fried and David Heinemeier Hansson, "It Doesn't Have to Be Crazy at Work," HarperBusiness, 2018. The book argues that most synchronous meetings, including daily standups, exist to compensate for information that could and should be captured in written, asynchronous form.*

*⁹ GitLab's "The Remote Playbook" and annual DevSecOps survey have documented its async-first principles extensively. GitLab draws a consistent distinction between decisions that require synchrony and status updates that do not — the latter being something the system should surface automatically.*
