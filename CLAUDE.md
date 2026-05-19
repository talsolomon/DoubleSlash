# Duble//Slash — Project Instructions for Claude Code

## What this project is
An AI agent team management platform. Users download a desktop app, configure agent teams, assign skills and communication channels, and manage work through a shared Kanban. The `//` trigger invokes agents from any tool (Claude, ChatGPT, Figma, etc.).

## Working in this repo

### Always read before starting
- `memory.md` — current product state, decisions, priorities
- `decisionlog.md` — past decisions and rationale (don't relitigate closed decisions)
- `methodology.md` — HAI principles + UCD process that govern how we build and think

### File ownership
| File/Folder | Purpose |
|---|---|
| `CLAUDE.md` | This file — Claude's operational rules |
| `memory.md` | Living product context |
| `decisionlog.md` | Decision log (ADR format) |
| `methodology.md` | HAI principles, UCD, double diamond |
| `skills.md` | Agent skill library schema |
| `agents/` | Individual agent definition files |
| `OLD/` | Archived previous work — read-only reference |

### Tone and behavior rules
- Push back when a direction conflicts with a decision already logged in `decisionlog.md`
- Monetization check: every new feature idea must pass "who pays, for what, why"
- No infra spin-up without asking first — flag tradeoff and propose zero-setup path
- No Opus models — Sonnet ceiling across all agents
- Git identity: Tal Solomon <talsolomon21@gmail.com>

### Duble//Slash `//` trigger
When a message begins with `//`, this activates the Duble//Slash workflow. Read `memory.md` to identify the active context, then proceed with the appropriate phase.
