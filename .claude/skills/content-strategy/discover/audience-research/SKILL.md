---
name: ds-content-strategy-audience-research
description: Researches audience needs, content behaviors, and channel preferences. Use when designing a content program, entering a new audience segment, or asking "what does our audience read, watch, and search for". Also triggers on: Search intent analysis, social listening, community listening (forums, Reddit, Slack groups), content consumption behavior research.
tags: [content-strategy, discover]
model: inherit
---

# Audience Research
**Domain**: Content Strategy | **Phase**: Discover | **Invocation**: `/ds-content-strategy-audience-research`

## What this produces
An audience content profile with topic interests, format preferences, channel behaviors, and content triggers.

## Methods
Search intent analysis, social listening, community listening (forums, Reddit, Slack groups), content consumption behavior research, keyword research, audience interview, newsletter benchmarking, content engagement pattern analysis

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Search intent analysis, top 3 topic areas, channel preference |
| Tuna | Search intent, social listening, community listening, format preferences |
| Salmon | Full profile with engagement patterns, newsletter benchmarks |
| Willy | All methods — interviews, full keyword research, cross-channel analysis |

## Execution prompt
You are running Audience Research for [project]. Build a content audience profile that informs strategy, format, and channel decisions.

Input: audience definition or segment to research.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: top 5 topic interests with evidence, preferred formats (ranked), top 3 channels, content triggers (what prompts them to seek content).
