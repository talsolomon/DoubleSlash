# SKILL.md Complete Specification

## Contents
- Frontmatter fields (required + optional)
- Body section requirements
- Validation tiers (Standard / Enterprise)
- 100-point grading rubric
- File size limits and constraints

---

## Frontmatter fields

### Required (every skill must have these)

**`name`**
- Format: lowercase letters, numbers, hyphens only
- Length: 1–64 characters
- Must start and end with alphanumeric
- No consecutive hyphens
- Forbidden words: `anthropic`, `claude`
- Convention: gerund form preferred (`processing-pdfs` over `pdf-processor`)

**`description`**
- Length: 1–1024 characters (truncates at 1024 — critical content first)
- Must be non-empty
- Third-person voice only ("Processes Excel files" not "I process" or "You can use")
- Must include what the skill does AND when to trigger it
- Include multiple synonym trigger phrases — routing is semantic, not exact-match
- No XML tags in value

### Optional (include for Enterprise tier / marketplace)

**`version`** — semantic versioning string (e.g., `1.0.0`). Start at `1.0.0`, not `0.1.0` for production skills.

**`author`** — `Name <email>` format. Required for marketplace submission.

**`license`** — SPDX identifier. Common: `MIT`, `Apache-2.0`, `CC-BY-4.0`. Required for marketplace.

**`allowed-tools`** — CSV string OR YAML array. Controls which tools the skill can invoke.
- NEVER use bare `Bash` — always scope it
- Scoped Bash syntax: `Bash(npm:*)`, `Bash(python:*)`, `Bash(git:*)`, `Bash(ls:*)`, `Bash(find:*)`
- If no Bash needed: `Read, Write, Edit, Grep`
- Default (if omitted): agent has access to all tools

**`tags`** — YAML array of discovery keywords. Improves marketplace searchability.

**`model`** — Model constraint. Options:
- `inherit` (default — recommended for almost all skills)
- `sonnet` — force Sonnet specifically
- `haiku` — force Haiku (fast, low-cost tasks)
- Never specify `opus` — hard rule in DS environment

**`compatibility`** — Platform description string. Example: `claude-code >= 1.0, claude.ai`

**`context: fork`** — Run skill in isolated subagent context. Use for skills that modify global state or need clean context.

**`agent`** — Subagent type when `context: fork`. Options: `Explore`, `Plan`, `general-purpose`

**`argument-hint`** — Autocomplete suggestion shown in slash command picker. Example: `"<file-path>"`

**`user-invocable: false`** — Hides skill from `/` menu. Use for internal utility skills invoked by other skills.

**`hooks`** — Lifecycle hooks. Example: `PreToolUse: validate-inputs.sh`

---

## Body section requirements

### Marketplace-graded sections

The grading system scores these sections explicitly:

| Section | Min length | Format preference |
|---|---|---|
| Overview | > 50 chars | 1-2 sentences, imperative, third-person |
| Prerequisites | Any | Bulleted list |
| Instructions | Numbered | Step 1, Step 2, Step 3... |
| Output | Any | Concrete artifact name + format |
| Error Handling | Table preferred | Condition → Resolution |
| Examples | Input/output pairs | Show, don't tell |

### Content rules

- **Third-person throughout** — no "I" (would confuse model identity) and no "you" (injected into system prompt; breaks POV)
- **Consistent terminology** — pick one word per concept and never deviate
- **No time-sensitive content** — "before August 2025" will be wrong forever; use "old patterns" sections instead
- **No absolute paths** — use `${CLAUDE_SKILL_DIR}/` for internal references
- **Forward slashes only** — `scripts/helper.py` never `scripts\helper.py`
- **One level of reference depth** — SKILL.md can link to `references/guide.md` but `guide.md` should not link to `details.md`; Claude partial-reads nested chains

---

## Validation tiers

### Standard (minimum to ship)

- [ ] `name` and `description` present and valid
- [ ] Body < 500 lines
- [ ] No absolute file paths
- [ ] Third-person voice throughout
- [ ] References are one level deep

### Enterprise (required for DS marketplace + team sharing)

Everything in Standard, plus:

- [ ] `author`, `version`, `license` present
- [ ] `allowed-tools` scoped (never bare Bash)
- [ ] All referenced files exist
- [ ] Error handling section present
- [ ] At least 2 examples (input/output pairs)
- [ ] Evaluation suite with ≥ 10 test cases

---

## 100-point grading rubric

### Pillar breakdown

**Progressive Disclosure (30 points)**
- SKILL.md ≤ 500 lines: 10 pts
- Heavy content offloaded to references/: 10 pts
- References one level deep, table of contents on files > 100 lines: 10 pts

**Ease of Use (25 points)**
- Description triggers on ≥ 5 synonym phrases: 10 pts
- Prerequisites explicit and actionable: 8 pts
- Zero-friction invocation (no config required for basic use): 7 pts

**Utility (20 points)**
- Output is a concrete named artifact: 10 pts
- Output format documented (template or example): 10 pts

**Spec Compliance (15 points)**
- All required fields present and valid: 5 pts
- Optional enterprise fields present: 5 pts
- No spec violations (bare Bash, absolute paths, reserved words): 5 pts

**Writing Style (10 points)**
- Third-person, consistent terminology: 5 pts
- No time-sensitive information: 3 pts
- Imperative, action-oriented tone: 2 pts

### Grade modifiers (±5)
- +5: Evaluation suite with ≥ 10 test cases included
- +5: Security considerations documented
- -5: Nested reference chains found
- -5: Undertrigger risk not addressed (description too vague)
- -5: Model specified as `opus`

### Grade scale
| Score | Grade | Action |
|---|---|---|
| 90-100 | A | Production ready — ship it |
| 80-89 | B | Good — ship with minor note |
| 70-79 | C | Fix description + instructions before shipping |
| 60-69 | D | Significant rewrite needed |
| < 60 | F | Rebuild from intake |

---

## File size constraints

| File | Recommended max | Hard limit |
|---|---|---|
| SKILL.md | 500 lines | 10 MB |
| Individual reference file | 200 lines | None (but use TOC > 100 lines) |
| Script files | 300 lines | None |
| Templates | 100 lines | None |
| Zip upload (API) | — | 50 MB |
| Files per skill | — | 500 |
