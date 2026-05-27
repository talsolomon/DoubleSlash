# DS-Internal Skill Format

Reference for building skills that go into the Duble//Slash skills registry at `skills/<domain>/<phase>/<skill-name>/`.

---

## Directory structure

```
skills/
└── <domain>/                    (e.g., product, engineering, ux-design)
    └── <phase>/                 (discover, define, develop, deliver)
        └── <skill-name>/
            ├── skill.md         (required — no frontmatter, markdown only)
            └── config.json      (required — structured metadata)
```

DS-internal skills do NOT use YAML frontmatter. The `skill.md` is pure markdown. Metadata lives in `config.json`.

---

## skill.md format

```markdown
# [Display Name]
**Domain**: [Domain] | **Phase**: [Phase] | **Invocation**: `//[skill-name]`

## What this produces
[One sentence — the specific artifact or outcome. Example: "Prioritized problem list with evidence, user segments, and recommended next phase."]

## Methods
[Comma-separated list of all applicable methods from the DS methods library]

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | [2-3 lightweight methods for small/fast projects] |
| Tuna | [4-6 methods for moderate depth] |
| Salmon | [6-8 methods including qualitative + quantitative] |
| Willy | Full methods list — [enumerate the complete suite] |

## Execution prompt
You are running the [Skill Name] skill for [project]. Your job is to [goal — verb-first].

FISH classification: [Nemo/Tuna/Salmon/Willy]
Run the methods listed for this FISH level.

For each method:
1. State what you're doing and why
2. Produce the output ([artifact type])
3. Summarize signal — what did you learn?

Final output: [specific deliverable — e.g., "prioritized list of 5 opportunities with RICE scores and recommended next phase"].
```

---

## config.json format

```json
{
  "id": "<domain>-<phase>-<skill-name>",
  "domain": "<domain>",
  "phase": "<phase>",
  "name": "<skill-name>",
  "display_name": "<Human Readable Name>",
  "invocation": "//<skill-name>",
  "output": "<One-line description of the artifact produced>"
}
```

**Field rules:**
- `id`: `<domain>-<phase>-<skill-name>` — no spaces, hyphens between segments
- `domain`: lowercase, one of the 21 DS domains
- `phase`: one of `discover`, `define`, `develop`, `deliver`
- `name`: kebab-case, matches directory name
- `display_name`: Title Case, for UI display
- `invocation`: `//` + kebab-case name
- `output`: concise — what the user GETS, not what the skill does

---

## DS domains (21 total — MVP scope)

| ID | Domain |
|---|---|
| product | Product management, PRD, roadmap |
| engineering | Software development, architecture, code review |
| ux-design | UX research, interaction design, prototyping |
| strategy | Business strategy, market analysis |
| marketing | GTM, content, campaigns |
| brand | Brand identity, tone, visual system |
| content-strategy | Editorial, SEO, content ops |
| operations | Process design, automation, efficiency |
| analytics | Data analysis, metrics, dashboards |
| devops-infrastructure | CI/CD, infra, reliability |
| ai-ml | ML modeling, evaluation, deployment |
| legal-compliance | Legal review, regulatory, privacy |
| pr-communications | Media, comms, reputation |
| creative-direction | Creative strategy, art direction |
| fintech | Financial products, payments, banking |
| government | Civic tech, policy, public sector |
| non-profit | Mission-driven, impact measurement |
| media | Publishing, broadcast, journalism |
| retail-ecommerce | Commerce, merchandising, CX |
| manufacturing | Supply chain, production, quality |
| blockchain-web3 | Decentralized systems, smart contracts |

**Post-MVP (deferred — do not add to v1):**
Finance, HR, Sales, CS, Security, Data Science, Research, Education, Healthcare, Real Estate

---

## Double Diamond phases

| Phase | When it runs | What it produces |
|---|---|---|
| discover | Before the problem is clear | Research, user signal, opportunity maps |
| define | Problem is clear, solution isn't | Problem statements, HMWs, requirements |
| develop | Exploring solutions | Concepts, prototypes, roadmaps |
| deliver | Building and shipping | Plans, launch strategy, retrospectives |

Each skill lives in exactly one phase. If a skill spans two phases, split it.

---

## FISH classification guide

FISH determines how deep Allen runs a skill. Classify at project intake, not per skill.

| Level | Project profile | Skill depth |
|---|---|---|
| Nemo | Small, fast, low-stakes | 2-3 lightweight methods |
| Tuna | Moderate scope, clear problem | 4-6 methods, some synthesis |
| Salmon | Complex, multi-stakeholder | 6-8 methods, qualitative + quantitative |
| Willy | Enterprise, high-stakes, long timeline | Full method suite, longitudinal |

---

## Existing DS product skills (reference for style parity)

Located at `skills/product/`:

| Skill | Phase | Output |
|---|---|---|
| customer-discovery | discover | Prioritized problem list with evidence |
| opportunity-landscape | discover | Ranked opportunity map with whitespace |
| problem-framing | define | HMW, POV, RICE score, north star metric |
| requirements-definition | define | PRD, user story map, acceptance criteria |
| solution-ideation | develop | Ranked concepts with trade-off analysis |
| roadmap-design | develop | NOW/NEXT/LATER roadmap with OKRs |
| launch-planning | deliver | GTM plan, rollout, success metrics |
| product-retrospective | deliver | OKR grades, lessons, kill/continue/pivot |

Use these as style references when building new domain skills — match the FISH Guide format, the execution prompt structure, and the "What this produces" phrasing.

---

## DS vs Claude Code skill: when to use which

| Situation | Format to use |
|---|---|
| Building a capability for DS users (the product registry) | DS-internal: `skill.md` + `config.json` |
| Building a reusable tool for Claude Code users globally | Claude Code: `SKILL.md` with frontmatter |
| Building something Allen will use proactively in sessions | Claude Code: `SKILL.md` in `~/.claude/skills/` |
| Building a project-specific workflow | Claude Code: `SKILL.md` in `.claude/skills/` |

When in doubt: if it goes in the DS skills registry catalog → DS format. If Claude Code should discover and run it → Claude Code format.
