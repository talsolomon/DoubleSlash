---
name: Run the company on the product
description: Adopt YC's AI-native operating principles and dogfood Duble//Slash as our company OS.
type: decision
date: 2026-04-28
dri: Tal
---

# Run the company on the product

## Decision

Duble//Slash will operate as an AI-native company from day zero, using its own product (the artifact-first, agent-fabric model) as the company OS. Concretely:

- `company/` becomes the home of decisions, customer signal, DRIs, and the operating model.
- `planning/task-board.md` is removed. Personal task tracking is not company infra.
- Every non-trivial decision produces a file in `company/decisions/`.
- Every customer touch produces a file or row in `company/signal/`.
- Every outcome has exactly one DRI listed in `company/dris.md`.

## Why

YC's "build a company with AI from the ground up" framing maps onto what Duble//Slash is *for*: making a company legible to AI by default. If we don't operate that way ourselves, the product is a hypothesis we haven't tested. If we do, every operational artifact doubles as product evidence — the company becomes the first reference customer.

This is also the only honest way to apply the YC principles right now. No team to retrain, no legacy systems, no live product to protect. The window where we can design the operating model from scratch is open and won't be open later.

## Alternatives considered

- **Keep `planning/task-board.md` as the spine.** Rejected: it's a personal task list, not company infrastructure. Conflating the two added overhead and made the repo look like project management instead of a company OS.
- **Build a CRM / metrics / decision log only when we have customers.** Rejected: the cost of starting now (one folder, one file format) is near zero, and the artifacts are useful before there's revenue — they shape positioning and the methodology.
- **Use external tools (Notion, Linear, Airtable) for company ops.** Rejected: the whole bet is that work belongs where Claude can read it. External SaaS would force us to bridge our own moat.

## What changes

- Outreach rows from the old task-board exported to `company/signal/outreach.csv`.
- `planning/` directory removed.
- `company/OPERATING.md` is the new entry point for "how we run."
- Memory entries about the daily task-board audit and "document tasks as found" need updating — task-board.md no longer exists.

## Outcome to watch

By 2026-05-12: at least one real decision and three customer signal artifacts have been written through this loop without prompting. If that hasn't happened, the loop is broken — revisit.
