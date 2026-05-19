# Project Memory
_Living document. Update when product state changes. Dated entries preferred._

---

## What we're building
**Duble//Slash** — the onboarding layer for AI use.

Claude Code (and other models) are already capable of doing everything. The problem is not capability — it's access. Most people don't know how to harness what's already there. DS solves that by giving them the `//` power: a simple, out-of-the-box way to call anything they want, without replacing their workspace.

DS does NOT replace Claude Code, ChatGPT, Figma, Jira, or any existing tool. It sits on top and connects them.

**Three things DS does:**
1. **Skills** — you choose what you want to be able to do (from a registry of thousands, sourced from MCP, n8n, LangChain, Pipedream, Zapier, etc.)
2. **Loops** — you set what should run automatically, and when
3. **`//` trigger** — you call any skill from any tool, any time

**In the background:** every run is logged to shared memory and surfaced in the team UI, so the whole team sees what's happened — with zero admin overhead.

## Positioning (locked 2026-05-19)
> "The onboarding layer for AI use — giving people the `//` power without replacing their workspace."

- We are NOT building another agent runtime
- We are NOT replacing Claude Code or any AI model
- We are NOT a workspace or a Jira replacement
- We ARE the easy button that makes Claude Code accessible to everyone
- We ARE the layer that connects skills to `//` to loops to shared memory

## Onboarding flow (locked)
```
Welcome to DS
  → Choose your skills
  → Set your loops
  → Start working — call anything with //
```
In the background: every action updates shared memory + the team UI automatically.

## Current state
- **Phase**: Product definition — positioning locked, building from here
- **Date reset**: 2026-05-19

## What we know from research (2026-05-19)

### Competitive landscape
- No product has a native desktop install — browser-only is universal
- Skills-as-onboarding: nobody does this
- Cross-tool `//` invocation: nobody has it
- BYOK: table stakes — Claude Code subscription covers it naturally

### Skills scale (live data, 2026-05-19)
The OSS skills ecosystem is enormous — we don't need to build skills, we need to surface them:
- **punkpeye/awesome-mcp-servers**: 2,628 lines, 50+ categories, thousands of servers
- **n8n**: 1,759 integrations across 14 categories
- **Pipedream**: 2,500 APIs, 8,000+ tools
- **Zapier/Rube (Composio)**: 8,000+ app connections
- **LangChain**: 100+ built-in tools
- **appcypher/awesome-mcp-servers**: deep categories — biology, aerospace, gaming, legal, real estate, IoT, robotics, and more

DS-native skills that don't exist in OSS yet:
- Approval gates, Human-in-the-Loop pause, Context handoff, Task decompose, Parallel fan-out, Idempotency guard

## Strategic bets
1. Desktop-native is the unlock — system-wide `//` trigger only works from the OS layer
2. The skills registry is an aggregation layer, not a hand-built list — we source from MCP/n8n/Pipedream/Zapier
3. DS-native skills (the human-AI coordination primitives) are the true IP
4. Memory + team UI as a zero-admin side effect of every run

## Open questions
- How does `//` technically intercept across different apps?
- How does the skill picker surface thousands of skills without overwhelming the user?
- Who can publish skills to the DS registry — OSS only, or user-created?
- Pricing: $12/mo platform + Claude Code subscription for tokens — still the model?
- What does loop configuration look like in the UI?
