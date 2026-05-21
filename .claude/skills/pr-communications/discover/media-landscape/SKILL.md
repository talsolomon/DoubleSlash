---
name: ds-pr-communications-media-landscape
description: Maps the media landscape relevant to an organization or announcement including journalists, outlets, and coverage trends. Use when planning a launch, building a media list, or asking "who covers our space and what do they care about". Also triggers on: Outlet identification and ranking, journalist beat mapping, recent coverage analysis, competitor coverage research, editorial calendar research, podcast and newsletter landscape.
tags: [pr-communications, discover]
model: inherit
---

# Media Landscape
**Domain**: PR/Communications | **Phase**: Discover | **Invocation**: `/ds-pr-communications-media-landscape`

## What this produces
A media landscape brief with outlet inventory, journalist profiles, coverage trend analysis, and media relationship opportunity map.

## Methods
Outlet identification and ranking, journalist beat mapping, recent coverage analysis, competitor coverage research, editorial calendar research, podcast and newsletter landscape, social media influence mapping, relationship gap identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 20 outlets, key journalists, coverage trends |
| Tuna | Landscape with beat mapping, competitor coverage |
| Salmon | Full landscape with editorial calendars, podcast/newsletter layer |
| Willy | All methods — full media database, influence map, relationship strategy |

## Execution prompt
You are running Media Landscape for [project]. Map who covers this space and how to reach them.

Input: industry, company/product type, and announcement context.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Know what each journalist has covered recently — pitching a reporter their own recent story is a relationship-builder; pitching off-beat is a delete.

Final output: outlet inventory by tier, journalist profiles with recent coverage, coverage trend summary, top 20 target media contacts.
