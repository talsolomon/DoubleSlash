# Claude Code Skill Template (Full / Enterprise Grade)

Copy this template and fill every field. Delete the comments before shipping.

---

```markdown
---
name: verb-noun-here                          # kebab-case, 1-64 chars
description: [Verb phrase — what it does]. Use when [trigger 1], [trigger 2], or [trigger 3]. Also triggers on: [synonym 1], [synonym 2], [synonym 3], [synonym 4].
version: 1.0.0
author: Your Name <your@email.com>
license: MIT
allowed-tools: Bash(npm:*), Bash(python:*), Read, Write, Edit   # scope all Bash; never bare Bash
tags: [tag1, tag2, tag3]
model: inherit
---

# [Skill Display Name]

[One-line summary — imperative, third-person. What it does and what it produces.]

**Produces:**
- [Artifact 1 — concrete name]
- [Artifact 2 — concrete name]

---

## When to invoke

- **[Scenario 1].** [2-3 sentence description of this trigger case and what the skill does.]
- **[Scenario 2].** [2-3 sentence description.]
- **[Scenario 3].** [2-3 sentence description.]

---

## Prerequisites

- [Tool/package required] — install with: `[install command]`
- [API key required] — set as: `export [KEY_NAME]=your-key`
- [Other requirement]

---

## Instructions

### Step 1 — [Step name]
[Clear, specific instructions. What to do. What to check. What the expected output is.]

### Step 2 — [Step name]
[Instructions.]

Run: `[command if applicable]`

Expected output: `[what success looks like]`

### Step 3 — [Step name]
[Instructions.]

**If this step fails:** [What to do — never leave a failure state unaddressed]

---

## Output format

[Describe or show the exact artifact produced. Use a template or a concrete example.]

```markdown
# [Document title]

## [Section 1]
[Content format description]

## [Section 2]
[Content format description]
```

---

## Error handling

| Condition | Resolution |
|---|---|
| [Error condition 1] | [Specific fix — not "check the docs"] |
| [Error condition 2] | [Specific fix] |
| [Missing dependency] | Run: `[install command]` |
| [API rate limit] | Wait 60s, then retry. If persistent, check quota at [location] |

---

## Examples

**Example 1:**
Input: [Concrete user input or scenario]
Output:
```
[Concrete output — not a description of output, the actual output format]
```

**Example 2:**
Input: [Different scenario]
Output:
```
[Different output]
```

---

## References

- [Detailed guide](references/guide.md) — load when [specific condition]
- [API reference](references/api.md) — load when working with the API directly
- [Troubleshooting](references/troubleshooting.md) — load when errors occur

---

## Security notes

[Any security considerations — sensitive paths, API key handling, shell injection risks]
```

---

## A-grade checklist (90+ points)

Before shipping, verify:

**Spec compliance:**
- [ ] `name`: kebab-case, no reserved words, 1-64 chars
- [ ] `description`: third-person, ≤ 1024 chars, includes "Use when..." + 4+ synonyms
- [ ] `version`, `author`, `license` present
- [ ] `allowed-tools`: scoped Bash only, never bare
- [ ] `tags` included

**Progressive disclosure:**
- [ ] SKILL.md body < 500 lines
- [ ] Heavy content offloaded to references/
- [ ] All references one level deep from SKILL.md
- [ ] Reference files > 100 lines have table of contents

**Ease of use:**
- [ ] Description triggers on 5+ distinct phrasings
- [ ] Prerequisites are explicit and actionable
- [ ] No time-sensitive content

**Utility:**
- [ ] Output is a named concrete artifact
- [ ] Output format shown (template or example)
- [ ] Error handling covers all foreseeable failure modes

**Writing style:**
- [ ] Third-person throughout (no "I", no "you")
- [ ] Consistent terminology (one word per concept)
- [ ] No Windows paths
- [ ] Imperative tone in instructions

**Evaluation:**
- [ ] 10-15 test cases generated covering should-trigger, should-not-trigger, edge cases
