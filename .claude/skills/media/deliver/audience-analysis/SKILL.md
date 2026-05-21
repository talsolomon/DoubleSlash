---
name: ds-media-audience-analysis
description: Analyzes audience performance data to guide editorial and distribution strategy. Use at regular review cycles, when engagement drops, or asking "is our content working and what does the audience data tell us". Also triggers on: Engagement metric analysis, content performance ranking, audience retention analysis, platform analytics review, topic performance comparison, audience growth and churn analysis.
tags: [media, deliver]
model: inherit
---

# Audience Analysis
**Domain**: Media | **Phase**: Deliver | **Invocation**: `/ds-media-audience-analysis`

## What this produces
An audience analysis report with engagement metrics, content performance, growth trends, and editorial recommendations.

## Methods
Engagement metric analysis, content performance ranking, audience retention analysis, platform analytics review, topic performance comparison, audience growth and churn analysis, demographic shift detection, editorial recommendation derivation

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top/bottom content, engagement snapshot, 3 recommendations |
| Tuna | Analysis with platform breakdown, topic performance |
| Salmon | Full analysis with retention, growth/churn trends |
| Willy | All methods — demographic shifts, full content audit, editorial strategy update |

## Execution prompt
You are running Audience Analysis for [project]. Let the data tell you what's working and what to change.

Input: analytics data, content inventory, and editorial goals.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: content performance ranking, engagement trends, audience growth summary, top 3 editorial insights, content strategy recommendations.
