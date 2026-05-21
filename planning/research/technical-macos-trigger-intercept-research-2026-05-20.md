---
stepsCompleted: [1, 2]
inputDocuments: []
workflowType: 'research'
lastStep: 2
research_type: 'technical'
research_topic: '// skill picker trigger inside agentic tools'
research_goals: 'How does // open a skill picker menu inside Claude Code and other agentic tools (Cursor, ChatGPT, Copilot)? What extension points do these tools expose — slash commands, MCP, plugins — and how can // be wired to surface a skill chooser at the point of invocation?'
user_name: 'Talsolomon'
date: '2026-05-20'
web_research_enabled: true
source_verification: true
---

# Research Report: // Skill Picker Trigger Inside Agentic Tools

**Date:** 2026-05-20
**Author:** Talsolomon
**Research Type:** Technical

---

## Executive Summary

`//` is a text-prefix convention, not a native CLI command or OS intercept. Every major agentic tool has a "system instructions" layer that can be taught to respond to `//`. DS already uses this correctly in Claude Code via `CLAUDE.md`. The path to cross-tool `//` support is shipping per-tool adapter files — not building OS-level interception. Native UI skill picker is Phase 3.

---

## How `//` Works Today (Claude Code)

`//` is intercepted by `CLAUDE.md`. When a user types `//` in the Claude Code chat, the model reads the CLAUDE.md instruction, recognizes the trigger, and renders a phase-matched skill menu as a text response. The "skill picker" is Claude's text output — not a native UI widget.

The skills themselves live in `.claude/skills/<name>/SKILL.md`. Claude auto-discovers skills by scanning all `SKILL.md` frontmatter descriptions and matching them to user requests. A `disable-model-invocation: true` flag restricts a skill to manual-only invocation.

When the user types `/` (native slash), Claude Code shows a built-in picker of all commands, skills, and MCP prompts. `//` today is handled one layer above — by the model reading CLAUDE.md — not by the CLI's native command system.

**Verdict:** Current DS implementation is correct and idiomatic. No changes needed for Claude Code.

---

## Extension Points Across Agentic Tools

Each tool has a system instructions layer that teaches the model how to behave. All are plain-text files — conversion between them is straightforward.

| Tool | System Instructions File | Skill/Command Layer | MCP Support |
|---|---|---|---|
| Claude Code | `CLAUDE.md` | `.claude/skills/<name>/SKILL.md` | Yes — `/mcp__server__prompt` |
| Cursor | `.cursor/rules/*.mdc` + `AGENTS.md` | Cursor Plugins (Skills + MCP) | Yes — Cursor Marketplace |
| GitHub Copilot | `.github/copilot-instructions.md` + `AGENTS.md` | VS Code extensions | Partial |
| Windsurf | `.windsurf/rules/` | Plugin layer | Emerging |
| ChatGPT | System prompt / Custom GPT instructions | GPT Actions (OpenAPI) | No native MCP |

**`AGENTS.md` is becoming a universal standard.** Claude Code, Cursor, and Copilot all read it. A single `AGENTS.md` file at the repo root that includes the `//` instruction will propagate the trigger to all three tools without per-tool adapter files.

---

## Three Implementation Paths for `//` Cross-Tool

### Path 1: `AGENTS.md` Adapter (Near-term, highest reach)
Ship a single `AGENTS.md` file that teaches `//` to any tool that reads it. Claude Code, Cursor, and Copilot all honor it. One file, three tools covered.

- **Effort**: Low — write once, works in three tools immediately
- **Skill picker**: Text menu rendered by the model (same as today)
- **Limitation**: Each tool renders the menu in its own chat UI — no unified DS chrome

### Path 2: DS as MCP Server (Mid-term, dynamic registry)
DS ships as an MCP server that serves the skills registry as tools/prompts. Tools that connect to the DS MCP server get the full registry. `//` in the CLAUDE.md/AGENTS.md instruction routes to the MCP server for skill discovery.

- In Claude Code: skills appear as `/mcp__ds__<skill-name>`
- In Cursor: skills appear in the Cursor Marketplace plugin
- Registry is always current — no per-project skill files needed
- **Effort**: Medium — requires building and hosting the MCP server
- **Skill picker**: Native command picker in each tool (e.g. `/mcp__ds__` autocomplete in Claude Code)

### Path 3: DS Desktop App Overlay (Phase 3, native UX)
`//` typed anywhere opens a DS desktop app overlay — a native skill picker that appears over whatever tool the user is in. The user selects a skill; DS routes the invocation back to the underlying agentic tool via its API or CLI.

- This IS the OS-level intercept question (hotkey daemon, Accessibility API)
- Only needed for the desktop app — not for the Claude Code / agentic tool integration
- **Effort**: High — requires native macOS app with system permissions
- **Skill picker**: Full native UI — search, filter, recent skills, team activity

---

## Recommendation

**Ship Path 1 now. Build Path 2 next. Path 3 is the desktop app.**

Path 1 (`AGENTS.md`) works today with zero new infrastructure. It extends DS's `//` trigger to Cursor and Copilot users in one file. The skill picker is a text menu — good enough for early cohort.

Path 2 (DS as MCP server) is the scalable registry model. It decouples the skills catalog from individual project files and makes DS discoverable in Cursor's marketplace. This is the architecture behind "thousands of skills" — you don't embed them all in every project, you serve them from the registry.

Path 3 is the long-term desktop differentiator. It's not blocking the product — it's the thing that makes DS feel like a system tool rather than a project file.

---

## Open Architectural Question (Unresolved)

**How does DS know which skills are relevant to surface in the picker?** Today Allen picks 3-5 phase-matched skills based on reading `memory.md`. At scale (thousands of skills in the MCP registry), the picker needs a better signal: role, project phase, recent usage, team context. This is the personalization layer — not solved by any current research.

---

## Sources

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Slash Commands in the SDK - Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/slash-commands)
- [Connect Claude Code to tools via MCP - Claude Code Docs](https://code.claude.com/docs/en/mcp)
- [How Claude Code Automatically Triggers Skills vs Manual Invocation](https://docs.bswen.com/blog/2026-03-24-skill-triggering/)
- [Cursor Plugins Docs](https://cursor.com/docs/plugins)
- [Extend Cursor with plugins](https://cursor.com/blog/marketplace)
- [Cursor Rules vs CLAUDE.md vs Copilot Instructions](https://www.agentrulegen.com/guides/cursorrules-vs-claude-md)
- [GitHub Copilot Instructions Guide](https://skillsplayground.com/guides/copilot-instructions/)
- [Claude Code Skills tutorial](https://supalaunch.com/blog/claude-code-skills-tutorial-custom-slash-commands-and-automations-guide)
- [Claude Code 2026 Cheat Sheet](https://techbytes.app/posts/claude-code-2026-cheat-sheet-hooks-mcp-commands/)
