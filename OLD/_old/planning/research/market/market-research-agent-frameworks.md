# Agent-Framework Competitive Landscape

**For:** Duble Slash internal strategy
**Date:** 2026-04-22
**Author:** Research sweep, written after BMAD teardown

---

## 1. Executive summary

- **The agent-framework market in April 2026 is a three-layer cake.** End-user products (Cursor 3, Claude Code, Devin 2.0, Copilot Workspaces) sit on top; orchestration libraries (LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, Claude Agent SDK) sit in the middle; methodology-driven frameworks (BMAD, Copilot Studio) sit on the side. **Duble Slash is in the side bucket but with a product moat the rest of that bucket lacks: cross-tool capture + redaction + handoff.** Nobody else in Category C has shipped that.
- **MCP (Model Context Protocol) is now universal.** All three major framework lineages adopted it in 2026. Our install bundle must speak MCP fluently, not invent a new transport.
- **Phase-shaped agents are converging independently.** Copilot Workspaces now ships a **plan agent, brainstorm agent, repair agent** — phase-scoped personas, same insight as our Explorer/Solidifier/Builder/Shipper. We were not wrong, but we are no longer unique on the persona-per-phase idea alone. **Our moat has to be the methodology + the cross-tool layer, not "we have multiple agents."**
- **`AGENTS.md` + `CLAUDE.md` instruction files are now standard.** Copilot, Cursor, and Claude Code all auto-load them. This is the install-bundle surface for FLOW — our `//explore` / `//solidify` / `//build` / `//ship` commands should be distributed as entries in these files, not as plugins.
- **Pricing has collapsed and commoditized.** Devin went from $500 → $20/month. Cursor Pro is $20, Ultra $200. The ceiling for "AI assistant" pricing is ~$200/month individual, ~$40/seat team. **Duble Slash cannot win on feature-per-dollar; it must win on category definition.**

---

## 2. The three categories

**A. End-user agent products.** What a designer or engineer opens and types into. Cursor, Claude Code, Devin, Copilot Workspaces, Replit Agent, Bolt, v0, Lovable, Aider, OpenHands, Warp, Zed. These are the closest competitors for attention and for "install footprint" on a user's machine.

**B. Frameworks / orchestration libraries.** Developer-facing SDKs for building multi-agent systems. LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, Anthropic Claude Agent SDK, LlamaIndex, Pydantic AI. These are not competitors in the consumer sense — they are toolkits we could build atop, or that our competitors build atop.

**C. Methodology-driven agent frameworks.** The closest conceptual cousins: opinionated, phase-based, persona-bearing agent methods. BMAD, Microsoft Copilot Studio, and the AutoGPT/BabyAGI lineage. This is where Duble Slash actually competes.

---

## 3. Category A — End-user agent products

### Claude Code (Anthropic) — sub-agents + skills

- **Pitch:** Terminal/IDE coding agent built on Claude, extended via sub-agents and skills.
- **Topology:** Parent agent spawns sub-agents; each sub-agent gets its own git worktree (shipped 2026 Q1). `@mention` references sub-agents by name.
- **Invocation:** CLI, VS Code extension, IDE integrations, slash commands, skills, hooks.
- **Persona vs. graph:** **Persona-oriented.** Skills are named (e.g. `/ultrareview`, `/less-permission-prompts`) and invoked by the user. Sub-agents have types and IDs.
- **Opinionated methodology?** **No.** Ships primitives. Community-built skill libraries (e.g. `wshobson/agents`) are the closest to opinionated bundles.
- **Local vs. hosted:** Runs locally, calls Anthropic API.
- **Pricing:** Uses a user's existing Anthropic API or Claude.ai subscription.
- **Where we differ:** We ship a **methodology** (FLOW) with opinionated phase gates, archetype classification, and a handoff contract. Claude Code gives you a toolbox; we give you a kitchen.
- **Where we're at risk:** The `skills` architecture is designed exactly for what we want to ship. If someone packages FLOW-like methodology as a Claude Code skill bundle before we do, we are distributing a subset of that ecosystem, not a category.

### Cursor 3 (Cursor) — Agents Window + Background Agents

- **Pitch:** IDE + parallel AI agents running in the cloud. Major rewrite April 2026.
- **Topology:** Up to 8 parallel agents in cloud VMs; each gets a branch and delivers a PR.
- **Invocation:** Inline chat, Agents Window, background (cloud) mode.
- **Persona vs. graph:** **Graph/task-oriented.** Agents don't have personas — they have assigned tasks and models.
- **Opinionated methodology?** **No.** Raw orchestration.
- **Local vs. hosted:** Both; Background Agents in cloud VMs.
- **Pricing:** Pro $20, Pro+ $60, Ultra $200/mo. Credit-based billing since June 2025.
- **Where we differ:** Cursor treats multi-agent as parallelism; we treat it as specialization + handoff discipline. Our agents don't race; they pass state between phases.
- **Where we're at risk:** Cursor 3's "Design Mode" + cloud agents could absorb a lot of the designer workflow we target. If they add an AGENTS.md methodology layer, they eat us from above.

### GitHub Copilot Workspaces / Copilot Agents

- **Pitch:** Brainstorm → plan → code → fix, all inside GitHub.
- **Topology:** Named sub-agents: **plan agent, brainstorm agent, repair agent**, plus custom agents (generally available for JetBrains in 2026).
- **Invocation:** GitHub web, IDE extensions, custom-agent picker.
- **Persona vs. graph:** **Persona-oriented, phase-shaped.** This is the closest convergence to our model in the market.
- **Opinionated methodology?** **Partial.** Workspace enforces a brainstorm → plan → implement flow inside GitHub issues, but it's GitHub-shaped (issue → PR), not method-shaped.
- **Local vs. hosted:** Hosted.
- **Pricing:** Bundled with Copilot seats; enterprise pricing.
- **Auto-loads `AGENTS.md` and `CLAUDE.md`** — this is the emergent instruction-file standard.
- **Where we differ:** Copilot Workspaces is GitHub-native; we are tool-agnostic. Their "phases" are tied to issues/PRs; ours are tied to a methodology anyone can apply in any tool.
- **Where we're at risk:** They have a much larger install footprint and their phase agents almost exactly mirror ours. If GitHub adds methodology enforcement, they are FLOW-for-GitHub-only — which for many teams is enough.

### Devin 2.0 (Cognition)

- **Pitch:** Autonomous AI software engineer; spin up many in parallel.
- **Topology:** Single autonomous agent instances; multiple can run concurrently.
- **Invocation:** Slack, web IDE, API.
- **Persona vs. graph:** **Single-agent persona ("Devin").**
- **Opinionated methodology?** **No** — autonomous execution, not methodology.
- **Local vs. hosted:** Hosted.
- **Pricing:** Core $20/mo → Team $500/mo → Enterprise. 1 ACU ≈ 15 min of work; $2.25/ACU.
- **Where we differ:** Devin replaces the engineer; we augment the designer + engineer + PM with a shared method. Devin is a job title; FLOW is a collaboration grammar.
- **Where we're at risk:** Low direct risk. Devin is pure execution; we are pure coordination. They occupy different layers.

### Replit Agent

- **Pitch:** Build and deploy full apps from prompts.
- **Topology:** Single persistent agent per workspace.
- **Invocation:** Chat inside Replit.
- **Persona vs. graph:** Single agent.
- **Methodology?** No.
- **Local vs. hosted:** Hosted (Replit cloud).
- **Pricing:** Bundled in Replit Core/Teams.
- **Where we differ:** Replit Agent lives inside Replit's sandbox; our agents live inside the user's tool of choice. Different distribution strategy entirely.
- **Risk:** Low. Different segment (students + prototypers vs. product teams).

### Aider — open-source terminal coding agent

- **Pitch:** Diff-based terminal coding agent. 39K GitHub stars, ~4.1M installs, ~15B tokens/week.
- **Topology:** Single agent.
- **Invocation:** CLI.
- **Persona vs. graph:** Single agent.
- **Methodology?** No, but strong opinions on diff discipline + git hygiene.
- **Local vs. hosted:** Local; BYO LLM.
- **Pricing:** Free; user pays LLM costs.
- **Where we differ:** Aider is a single-file-edits agent; we are cross-tool, cross-role collaboration.
- **Risk:** Low. Adjacent, not overlapping.

### OpenHands (formerly OpenDevin)

- **Pitch:** Open-source autonomous agent platform for software development.
- **Topology:** Autonomous agents; SDK for building custom agents.
- **Invocation:** Web UI, CLI, SDK.
- **Persona vs. graph:** Configurable.
- **Methodology?** No.
- **Local vs. hosted:** Both.
- **Pricing:** Open source; paid cloud product from the OpenHands company.
- **Stats:** 65K GitHub stars, $18.8M Series A (All Hands AI), solves 50%+ of real GitHub issues on benchmark.
- **Where we differ:** OpenHands is execution-heavy (SWE-bench–style autonomous work). We are specification-heavy (briefs, gates, trust receipts).
- **Risk:** Medium. An open-source methodology layer on top of OpenHands would be a direct competitor if built.

### Bolt.new / v0 / Lovable — AI app builders

- **Pitch:** Describe an app → get working code.
- **Topology:** Single generative agent.
- **Invocation:** Web chat.
- **Persona vs. graph:** Single.
- **Methodology?** No.
- **Local vs. hosted:** Hosted.
- **Pricing:** $20–40/mo tiers.
- **Where we differ:** They produce output artifacts (apps). We produce coordinated work (briefs, handoffs, receipts, retros). Different products, sometimes used together.
- **Risk:** Low direct. But: if Lovable's design mode + Figma-to-code + team layer adds phase agents, they could encroach.

### Warp / Zed AI — terminal & editor agents

- **Pitch:** Agents embedded in a terminal (Warp) or editor (Zed).
- **Topology:** Single agent, contextual.
- **Methodology?** No.
- **Where we differ:** Workflow surface, not coordination layer.
- **Risk:** Low.

---

## 4. Category B — Frameworks / orchestration libraries

### LangGraph (LangChain)

- **Topology:** Explicit state graph; nodes are agents; edges are transitions.
- **Persona vs. graph:** **Graph-first.** Agents are nameless nodes.
- **Production readiness:** Highest in category — LangSmith observability, checkpointing, streaming, rollback.
- **Opinionated methodology?** No. Graph primitive only.
- **Adoption:** Surpassed CrewAI in GitHub stars in early 2026; enterprise standard.
- **Where we differ:** We are a methodology; LangGraph is the graph engine you'd implement our methodology on. Our `<FLOW-handoff>` contract could be a LangGraph state-transition schema.
- **Risk:** Zero direct. Candidate dependency.

### CrewAI

- **Topology:** Role-based crews (named agents with roles).
- **Persona vs. graph:** **Persona-first.** Closest in spirit to our Nova/Sol/Bram/Sage design.
- **Learning curve:** Lowest — 20 lines to a working crew.
- **Opinionated methodology?** No, but the role metaphor is itself a soft methodology.
- **Where we differ:** CrewAI gives you the persona primitive; FLOW gives you the phase structure + axis modulation + handoff discipline *around* personas.
- **Risk:** Low direct; candidate implementation substrate.

### AutoGen (Microsoft / AG2)

- **Topology:** Conversational multi-agent (agents talk to each other to solve tasks).
- **Persona vs. graph:** Persona-like, but interaction-driven.
- **Cost profile:** 5–6x more expensive than LangGraph per task due to chattiness (~20 LLM calls/task).
- **Where we differ:** We enforce discrete handoffs instead of open conversation. FLOW explicitly rejects "let the agents talk it out."
- **Risk:** Zero direct.

### OpenAI Agents SDK

- **Topology:** Handoffs + guardrails. Agents transfer control between each other.
- **Persona vs. graph:** Handoff-first.
- **Built-in tools:** Hosted web search, file search, code interpreter, voice (Realtime API), vision (GPT-4o).
- **Where we differ:** OpenAI Agents SDK is a SaaS-attached toolkit. We are a methodology spec that is tool-agnostic.
- **Risk:** Low direct; could power a competitor.

### Anthropic Claude Agent SDK

- **Topology:** Tool-use-first; agents can invoke other agents as tools. Sub-agents + hooks are first-class.
- **Persona vs. graph:** Hooks + sub-agents — lifecycle-oriented.
- **Built-in tools:** File read/write, code execution, web search.
- **Where we differ:** Claude Agent SDK is the substrate we would likely build Nova/Sol/Bram/Sage on inside Claude Desktop / Claude Code. It does not ship methodology.
- **Risk:** Zero direct. Direct enabler.

### LlamaIndex agents, Pydantic AI

- Narrower (data-retrieval, typed-output) — not central to our competition.

---

## 5. Category C — Methodology-driven agent frameworks

**This is our real category, and it is small.**

### BMAD Method (bmad-code-org)

- **Pitch:** Breakthrough Method for Agile AI-Driven Development. Open-source.
- **Topology:** YAML-defined agents + agent teams, phase-shaped (analyst, PM, architect, UX, SM, dev, QA, tech writer).
- **Personas:** 8 named agents (John, Mary, Sally, Winston, Paige, Bob, Amelia, Quinn).
- **Multi-IDE:** Claude Code, Cursor, Roo, Windsurf, +others.
- **Methodology depth:** Full — ideation → planning → agentic implementation, with per-phase commands + workflow templates.
- **Status (April 2026):** v6 Alpha: Cross-Platform Agent Team, Sub Agent inclusion, Skills Architecture, BMAD Builder v1, Dev Loop Automation. MIT license. Strong community (120K+ views on V4 Masterclass).
- **Where we differ:**
  1. **FLOW is designer/PM-led; BMAD is engineer-led.** BMAD optimizes for "requirements → sprint → PR." FLOW optimizes for "idea → validated brief → trustable implementation" with the designer as the persistent voice.
  2. **FLOW ships a cross-tool capture + redaction + handoff layer (Tally, Cipher, Relay, Beacon, Pack, Echo, Twin, Gate, Loom).** BMAD lives inside the IDE. We live *between* tools.
  3. **FLOW has axis modulation (size × certainty) + archetypes (Nemo/Tuna/Salmon/Willie).** BMAD has workflow templates per task type but no unified axis system.
  4. **FLOW defines an explicit `<FLOW-handoff>` contract** with trust receipts and reverse-flow semantics. BMAD's handoffs are implicit in workflow file ordering.
- **Where we're at risk:**
  1. BMAD has a 6+ month head start in community, IDE support, and mindshare. They are "the" open-source multi-agent methodology as of April 2026.
  2. BMAD could add a capture/handoff layer in v7 if they see the gap.
  3. BMAD's Skills Architecture + cross-platform Agent Team directly overlap with our install-bundle strategy.

### Microsoft Copilot Studio

- **Pitch:** Low-code platform for building enterprise agents.
- **Topology:** Declarative agent definitions, workflow-driven.
- **Methodology?** Enterprise-oriented, process-automation shaped (not product/design shaped).
- **Where we differ:** Different audience (IT/ops vs. product teams).
- **Risk:** Low.

### AutoGPT / BabyAGI lineage

- **Status in 2026:** Largely superseded by LangGraph, CrewAI, OpenHands. Still historically referenced as the origin of autonomous-goal agents.
- **Methodology?** Goal-loop, not methodology.
- **Risk:** None.

---

## 6. Comparison matrix

| Product / framework | Category | Topology | Persona or graph | Methodology bundled | Local / hosted | OSS | Pricing |
|---|---|---|---|---|---|---|---|
| Claude Code | A | Parent + sub-agents | Persona (skills) | No | Local + API | Partly | API-metered |
| Cursor 3 | A | Parallel agents | Graph / task | No | Both | No | $20–$200/mo |
| Copilot Workspaces | A | Phase sub-agents | Persona (plan/brainstorm/repair) | Partial (GH flow) | Hosted | No | Copilot seats |
| Devin 2.0 | A | Autonomous single | Persona (Devin) | No | Hosted | No | $20–$500/mo |
| Replit Agent | A | Single | Single | No | Hosted | No | Bundled |
| Aider | A | Single | Single | No | Local | Yes | Free |
| OpenHands | A | Autonomous | Configurable | No | Both | Yes | Free + cloud tier |
| Bolt / v0 / Lovable | A | Single generative | Single | No | Hosted | Partial | $20–$40/mo |
| LangGraph | B | State graph | Graph | No | Both | Yes | Free + LangSmith |
| CrewAI | B | Role crews | Persona | No (soft) | Both | Yes | Free + cloud |
| AutoGen / AG2 | B | Conversational | Persona-ish | No | Both | Yes | Free |
| OpenAI Agents SDK | B | Handoffs | Persona | No | Hosted-leaning | Yes | API-metered |
| Claude Agent SDK | B | Tool-use + subagents | Persona | No | Both | Yes | API-metered |
| **BMAD Method** | **C** | **YAML agents + teams** | **Persona (8)** | **Yes (full)** | **IDE-local** | **Yes (MIT)** | **Free** |
| Copilot Studio | C | Low-code agents | Workflow | Yes (process) | Hosted | No | Enterprise |
| **Duble Slash (FLOW)** | **C** | **4 local + 9 system** | **Persona (13)** | **Yes (full + axes + archetypes + handoffs)** | **Local + desktop client** | **Yes (planned)** | **TBD (freemium)** |

---

## 7. Positioning gaps (where Duble Slash can own territory)

1. **Cross-tool capture + redaction + handoff.** No one in Category C has this. BMAD is in-IDE; Copilot Studio is enterprise automation. The Tally + Cipher + Relay + Beacon + Pack stack is a genuinely unclaimed moat — *if* we ship it before BMAD v7 adds something similar.
2. **Designer-led, not engineer-led.** BMAD, Devin, Cursor, Claude Code are all engineer-centric. Copilot Workspaces is GitHub-centric. **The designer / PM / founder who uses Claude Desktop + Figma + a notes tool has no dedicated methodology.** FLOW is that.
3. **Axis modulation as first-class.** The `size × certainty` dial controlling persona behavior is unique. Nobody else modulates agent *posture* by card archetype. This is the FLOW article's most novel contribution.
4. **Reverse-flow + trust receipts.** Handoffs that carry evidence, can be rejected, and route *backwards* (Builder → Solidifier `HB`) are absent from every framework we reviewed. This is our discipline layer.
5. **Persona-bearing methodology for non-code work.** FLOW works for research, brand, strategy, design — not just code. BMAD is code-first. Devin is code-only. **The "design sprint methodology, but with AI agents" space is unclaimed.**
6. **AGENTS.md as the install surface.** The industry standardized on `AGENTS.md` + `CLAUDE.md`. Our `//explore` / `//solidify` / `//build` / `//ship` shipping as entries in those files is a low-friction install path every tool already reads.

---

## 8. Threats — "they could eat us"

1. **BMAD v7 adds a capture/redaction/handoff layer.** They have the community and the IDE coverage. If they ship Tally+Cipher equivalents, we lose the most defensible part of the moat.
2. **GitHub Copilot Workspaces adds cross-repo / cross-tool methodology enforcement.** Their phase agents already look like ours. If they add AGENTS.md methodology packs, their distribution advantage is brutal.
3. **Someone packages FLOW-like methodology as a Claude Code skill bundle.** The `skills` architecture + community skill libraries (e.g. `wshobson/agents`) are exactly the right surface. A single well-written MIT-licensed skill bundle could preempt the OSS drop.
4. **Cursor 3 adds AGENTS.md methodology layer + team-scope.** Their cloud agents + Agents Window already handle parallelism. A methodology skin is a small next step.
5. **Anthropic ships first-party "phase agents" in Claude Desktop.** They own the tool we depend on most heavily. If they define the category officially, we become a sub-brand or third-party.

---

## 9. Recommendations

1. **Reframe the positioning: "the methodology layer for AI-assisted product work."** Not "capture layer," not "collab layer" — **methodology layer**. That is the empty slot. The capture/redaction/handoff plumbing is *what enables* the methodology to be cross-tool; it is not the primary pitch.
2. **Ship the OSS drop as an `AGENTS.md` + `CLAUDE.md` bundle** — not a plugin. Adopt the emerging standard rather than fighting it. Installation should be: paste this into your tool's instruction file, done. This matches how Copilot, Cursor, and Claude Code all auto-load conventions.
3. **Treat BMAD as the incumbent to differentiate *against*.** Our tagline, our docs, our install experience should all answer: "Why FLOW instead of BMAD?" Three reasons to memorize: (a) designer-led not engineer-led, (b) cross-tool not IDE-locked, (c) axis modulation + archetypes + reverse-flow handoffs. Ship a comparison page at launch.
4. **Build Nova/Sol/Bram/Sage on the Claude Agent SDK (local) and consider LangGraph (system agents).** Do not invent a new orchestration primitive. The former gives us native sub-agent + hook lifecycle; the latter gives us production-grade state for the Gate/Loom flow enforcement.
5. **Adopt MCP from day one.** Every framework converged on it in 2026. Our capture layer should speak MCP to the tools we live inside; our system agents should expose MCP endpoints for third-party integration.
6. **Push hard on the capture + redaction layer as Day-1 OSS.** This is the part nobody else in Category C has and that is hard to copy quickly (local-first, encryption, diff preview). Ship it before BMAD v7.
7. **Define a `project-context.md` template modeled on BMAD's `generate-project-context` — but with FLOW axis defaults (size × certainty defaults per team) + active archetypes.** This is the single highest-leverage pattern from the BMAD teardown. Land it in [methodology/local-agents/README.md](../../methodology/local-agents/README.md) as a universal activation step.
8. **Pricing: freemium, individual $20/mo, team $40/seat.** Match the settled market band. Win on category, not on price.

---

## Sources

- [Claude Code Changelog](https://code.claude.com/docs/en/changelog) · [Claude Code Q1 2026 Update Roundup](https://www.mindstudio.ai/blog/claude-code-q1-2026-update-roundup) · [Agent Skills cheat codes](https://medium.com/jonathans-musings/agent-skills-the-cheat-codes-for-claude-code-b8679f0c3c4d) · [Understanding Claude Code's Full Stack](https://alexop.dev/posts/understanding-claude-code-full-stack/)
- [Cursor 3 launch blog](https://cursor.com/blog/cursor-3) · [Cursor Background Agents Complete Guide](https://www.morphllm.com/cursor-background-agents) · [Cursor Pricing 2026](https://flexprice.io/blog/cursor-pricing-guide)
- [Devin 2.0 / pricing cut to $20](https://venturebeat.com/programming-development/devin-2-0-is-here-cognition-slashes-price-of-ai-software-engineer-to-20-per-month-from-500) · [Devin pricing page](https://devin.ai/pricing) · [Cognition Devin 2.0 blog](https://cognition.ai/blog/devin-2)
- [GitHub Copilot Workspace / Agents](https://github.com/features/copilot/agents) · [GitHub Copilot JetBrains March 2026 update](https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides/) · [Copilot Workspace project](https://githubnext.com/projects/copilot-workspace)
- [BMAD-METHOD GitHub](https://github.com/bmad-code-org/BMAD-METHOD) · [BMAD Method docs](https://docs.bmad-method.org/) · [BMad Code](https://bmadcodes.com/)
- [LangGraph vs CrewAI vs AutoGen (DataCamp)](https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen) · [Best Multi-Agent Frameworks 2026](https://gurusup.com/blog/best-multi-agent-frameworks-2026) · [OpenAgents comparison](https://openagents.org/blog/posts/2026-02-23-open-source-ai-agent-frameworks-compared)
- [Claude Agent SDK vs OpenAI Agents SDK (Composio)](https://composio.dev/content/claude-agents-sdk-vs-openai-agents-sdk-vs-google-adk) · [Claude Agent SDK on npm](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk)
- [Open Source AI Coding Agents 2026](https://www.opensourceaireview.com/blog/best-open-source-ai-coding-agents-in-2026-ranked-by-developers) · [OpenHands platform](https://openhands.dev/) · [Aider alternatives / stats](https://replit.com/discover/aider-alternative)
- [v0 vs Bolt vs Lovable 2026](https://www.nxcode.io/resources/news/v0-vs-bolt-vs-lovable-ai-app-builder-comparison-2025) · [Best AI App Builders 2026](https://lovable.dev/guides/best-ai-app-builders)
