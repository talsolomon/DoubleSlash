---
name: ds-content-strategy-content-audit
description: Audits existing content for performance, gaps, and alignment to goals. Use when refreshing a content program, planning a site migration, or asking "what content do we have and is any of it working". Also triggers on: Content inventory, performance data analysis, SEO audit, content quality scoring, audience alignment assessment, duplication and cannibalization check.
tags: [content-strategy, discover]
model: inherit
---

# Content Audit
**Domain**: Content Strategy | **Phase**: Discover | **Invocation**: `/ds-content-strategy-content-audit`

## What this produces
A content audit report with inventory, performance data, gap analysis, and a keep/update/archive/delete recommendation per content item.

## Methods
Content inventory, performance data analysis, SEO audit, content quality scoring, audience alignment assessment, duplication and cannibalization check, content gap analysis, format effectiveness review, dead link and outdated content scan

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top-level inventory, performance overview, 3 biggest gaps |
| Tuna | Inventory, SEO audit, gap analysis, quality scoring |
| Salmon | Full audit with KUDA recommendations, duplication check |
| Willy | All methods — full format review, alignment scoring, migration plan |

## Execution prompt
You are running a Content Audit for [project]. Assess the existing content library and produce actionable recommendations.

Input: content inventory or site structure and any performance data available.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: content inventory summary, performance highlights, top 5 gaps, KUDA (Keep/Update/Delete/Archive) recommendation list.
