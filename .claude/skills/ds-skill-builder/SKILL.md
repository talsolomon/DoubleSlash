---
name: ds-skill-builder
description: Designs and generates production-ready Claude Code skills from requirements. Use when asked to "build a skill", "create a skill", "write a SKILL.md", "design a new skill", "package this as a skill", or when a domain capability needs to be reusable and shareable. Also handles DS-internal format (skill.md + config.json) when the target is the Duble//Slash skills registry. Triggers on: skill authoring, SKILL.md generation, skill audit, skill fix, skill grading.
version: 1.0.0
author: Tal Solomon <talsolomon21@gmail.com>
license: MIT
allowed-tools: Bash(find:*), Bash(ls:*), Bash(mkdir:*), Read, Write, Edit
tags: [meta, skill-authoring, skill-engineering, claude-code, ds-native, production]
model: inherit
---

# DS Skill Builder

Designs and ships production-grade Claude Code skills — from a single flat SKILL.md to full directory bundles with progressive disclosure, supporting scripts, evaluations, and a 100-point grade report. Operates at principal AI engineer level: specification-first, evaluation-driven, graded before delivery.

**Produces:**
- Complete skill directory or flat file (Claude Code standard OR DS-internal format)
- Supporting reference files, templates, and utility scripts as needed
- Evaluation test suite (10–15 cases covering should-trigger, should-not, and edge cases)
- 100-point grade report with pillar-level feedback

---

## When to invoke

- **Build from scratch.** User says "build me a skill that does X" — intake, classify, architect, write, grade.
- **Fix an existing skill.** User provides a SKILL.md that undertriggers, overtriggers, or produces poor output — diagnose the failure mode and rewrite.
- **Audit a skill.** User asks "score my skill" or "is this good?" — run the 100-point rubric and return specific fixes per pillar.
- **DS registry entry.** Target is the Duble//Slash skills registry (skill.md + config.json under a domain/phase path) — use DS-internal format; see [references/ds-integration.md](references/ds-integration.md).

---

## Execution workflow

### Step 1 — Intake

Gather (or infer from context) before writing anything:

1. **What it does** — one verb-first sentence ("Generates descriptive commit messages by analyzing git diffs")
2. **Trigger phrases** — exact user words that should fire this skill
3. **Output** — the specific artifact produced (not a description of help given)
4. **Constraints** — tools required, secrets, platform requirements
5. **Format target** — Claude Code global (`~/.claude/skills/`), project (`.claude/skills/`), or DS registry (`skills/<domain>/<phase>/<name>/`)

If any of these are ambiguous, ask before continuing. A wrong classification means a rewrite.

### Step 2 — Classify and size

**Purpose axis** (determines instruction depth):

| Type | Definition | Example |
|---|---|---|
| Capability Uplift | Enables something Claude cannot do natively | PDF extraction, browser automation, web scraping |
| Encoded Preference | Encodes a specific workflow Claude already handles | Brand guidelines, commit style, code review checklist |

Capability Uplift skills need more explicit instructions and usually require scripts.
Encoded Preference skills need precise description + examples but less scaffolding.

**FISH depth** (determines file count):

| Level | Profile | File structure |
|---|---|---|
| Nemo | Simple, single-capability | Flat file or SKILL.md only |
| Tuna | Moderate, needs context | SKILL.md + 1-2 references |
| Salmon | Complex workflow | SKILL.md + 3-5 references + templates |
| Willy | Full domain suite | SKILL.md + references + scripts + evals |

### Step 3 — Architecture

Design the file tree before writing a single line:

```
skill-name/
├── SKILL.md              (required — triggers, overview, core workflow)
├── references/           (optional — heavy content, API docs, domain data)
│   ├── domain-data.md
│   └── api-reference.md
├── templates/            (optional — reusable output format stubs)
│   └── output-format.md
└── scripts/              (optional — deterministic utility scripts)
    └── validate.py
```

**Hard rules:**
- SKILL.md body ≤ 500 lines — anything heavier goes in references/
- References are one level deep from SKILL.md — no chains (A → B → C fails)
- For reference files > 100 lines, add a table of contents at the top
- Use `${CLAUDE_SKILL_DIR}/` for internal paths, never absolute paths
- Forward slashes only — no Windows paths

### Step 4 — Write

#### Frontmatter (always produce all of these)

```yaml
---
name: kebab-case-name           # 1-64 chars, no "anthropic" or "claude"
description: <see formula>      # ≤1024 chars, third-person, action-oriented
version: 1.0.0                  # semantic versioning
author: Name <email>
license: MIT                    # SPDX identifier
allowed-tools: Bash(npm:*), Read, Write   # NEVER bare Bash
tags: [tag1, tag2, tag3]        # discovery keywords
model: inherit                  # inherit / sonnet / haiku — never opus
---
```

**Description formula — this drives routing; get it right:**

```
[Verb phrase — what it does]. Use when [trigger condition 1], [trigger condition 2], or [trigger condition 3]. Also triggers on: [synonym 1], [synonym 2], [synonym 3].
```

Include multiple synonyms. LLM routing is semantic, not exact-match — coverage beats precision.

#### Body sections (in order)

1. **Title + one-line summary** (imperative, third-person, no "I" or "you")
2. **Produces** (bullet list — exact artifacts, not vague descriptions)
3. **When to invoke** (2-4 prose scenarios as bullets — copy from description, expand)
4. **Prerequisites** (tools to install, APIs to configure, credentials needed)
5. **Instructions** (numbered steps — this IS the execution engine; be explicit)
6. **Output format** (template or example of what the final artifact looks like)
7. **Error handling** (table: condition → resolution)
8. **References** (links to supporting files Claude should load on demand)

Read [references/spec.md](references/spec.md) for full field spec and validation tiers.
Read [references/patterns.md](references/patterns.md) for progressive disclosure, workflow, feedback loop, and example patterns.

### Step 5 — Grade (100-point rubric)

Self-score before delivery. Do not ship below 80.

| Pillar | Weight | Passing criteria |
|---|---|---|
| Progressive Disclosure | 30 | SKILL.md < 500 lines; heavy content in references/; one level deep |
| Ease of Use | 25 | Description triggers correctly on 5+ synonyms; no setup friction; prerequisites explicit |
| Utility | 20 | Output is a concrete artifact, not vague guidance |
| Spec Compliance | 15 | All required frontmatter fields valid; no bare Bash; no absolute paths |
| Writing Style | 10 | Third-person; consistent terminology; no time-sensitive info |

Grade scale: A 90-100 (ship it), B 80-89 (acceptable), C 70-79 (rewrite description + instructions), D/F (< 70, rebuild).

### Step 6 — Evaluate

Generate 10-15 test cases. This is non-optional for Salmon/Willy skills.

```json
{
  "skill": "skill-name",
  "query": "natural language prompt the user might type",
  "should_trigger": true,
  "expected_behavior": [
    "Specific behavior 1",
    "Specific behavior 2"
  ]
}
```

Coverage matrix:
- 5 should-trigger (core use cases)
- 3 should-NOT-trigger (skills that might interfere)
- 2 edge cases (ambiguous input)
- 2 undertrigger-risk cases (valid use cases with unusual phrasing)
- 1 injection-risk case (malicious input pattern)

### Step 7 — Deliver

Format:
1. **File tree** — annotated directory listing
2. **All files** — complete content, ready to paste
3. **Grade report** — score + one specific fix per failing pillar
4. **Evaluation suite** — JSON test cases
5. **Install command** — exact shell command to activate

---

## Anti-patterns — check before delivery

Read [references/anti-patterns.md](references/anti-patterns.md) for the full list. Critical ones:

- **Bare Bash** in allowed-tools → scope it: `Bash(npm:*)` not `Bash`
- **Vague description** ("helps with documents") → routing will fail
- **Too verbose** in SKILL.md → split to references/
- **Nested references** (A links to B links to C) → Claude partial-reads and misses content
- **Windows paths** → use forward slashes everywhere
- **Too many options** presented → pick one default, add escape hatch for the alternative
- **Time-sensitive info** ("before August 2025...") → use "old patterns" section instead
- **Absolute paths** → use `${CLAUDE_SKILL_DIR}/` or relative

---

## DS-internal format

When the target is the DS domain skills registry, switch formats entirely.
Read [references/ds-integration.md](references/ds-integration.md) for exact spec.

Quick summary: `skill.md` (no frontmatter, markdown only) + `config.json` (structured metadata).
Directory path: `skills/<domain>/<phase>/<skill-name>/`

---

## Security rules

- Never include API keys, tokens, or passwords in skill files — flag if asked to
- Scope `allowed-tools` to the minimum required — principle of least privilege
- Treat executable scripts as privileged — review before including
- Flag any skill requiring write access to sensitive paths (SSH, git credentials, system config)
- Skills inject into context — prompt injection is a real risk; note it in error handling if relevant
