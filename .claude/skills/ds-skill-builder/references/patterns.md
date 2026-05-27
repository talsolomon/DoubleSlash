# Design Patterns for Skill Authoring

## Contents
- Progressive disclosure pattern
- Description formula (routing-critical)
- Workflow + checklist pattern
- Feedback loop pattern
- Template pattern
- Examples pattern
- Conditional workflow pattern
- Domain-specific organization pattern

---

## Progressive disclosure pattern

The core architecture of every non-trivial skill. SKILL.md is a table of contents; reference files are the chapters.

**The three knowledge levels:**

| Level | Token cost | When loaded |
|---|---|---|
| L1: Frontmatter metadata | ~100 tokens | Always — loaded at startup for all skills |
| L2: SKILL.md body | Up to 5,000 tokens | Loaded when the skill becomes relevant |
| L3: Reference files | Variable | Loaded on-demand when Claude navigates to them |

**Implementation:**

```markdown
# Skill Name

Brief overview (2-3 sentences max).

## Quick start
[Core 80% use case — enough to get going]

## Advanced features
- Feature A: See [references/feature-a.md](references/feature-a.md)
- Feature B: See [references/feature-b.md](references/feature-b.md)
- API reference: See [references/api.md](references/api.md)
```

**Rule:** Claude only loads a reference file when the user's task requires it. Files not loaded cost zero context tokens.

---

## Description formula (routing-critical)

The description field is the only thing Claude reads when deciding whether to activate a skill. It must be:
- Third-person
- Action-verb-first
- Packed with synonyms (routing is semantic — coverage > precision)
- Include explicit "Use when..." trigger language

**Formula:**
```
[Verb phrase describing what the skill does]. Use when [trigger condition 1], [trigger condition 2], or [trigger condition 3]. Also triggers on: [synonym 1], [synonym 2], [synonym 3], [synonym 4].
```

**Good example:**
```yaml
description: Extracts text, tables, and form data from PDF files and generates structured outputs. Use when working with PDF files, processing documents, filling forms, or extracting data from scanned pages. Also triggers on: PDF processing, document extraction, form filling, PDF merge, convert PDF.
```

**Bad example:**
```yaml
description: Helps with documents
```
The bad example will never route correctly — it matches nothing specifically and competes with every other skill.

**Undertriggering fix:** Add more synonym phrases. The routing is LLM-based; it understands semantics but needs coverage.

**Overtriggering fix:** Add negative bounds:
```yaml
description: [...]. Does NOT handle Word documents, Excel files, or image-only files without OCR.
```

---

## Workflow + checklist pattern

For multi-step processes where consistency matters. The checklist creates a feedback mechanism Claude can track.

```markdown
## Processing workflow

Copy and track this checklist:

```
Progress:
- [ ] Step 1: Analyze input
- [ ] Step 2: Generate plan
- [ ] Step 3: Validate plan
- [ ] Step 4: Execute
- [ ] Step 5: Verify output
```

**Step 1: Analyze input**
[Specific instructions for this step]

**Step 2: Generate plan**
[Specific instructions — note what format the plan takes]

**Step 3: Validate plan**
Run: `python scripts/validate.py plan.json`
Fix any errors before continuing. Do NOT proceed if validation fails.

**Step 4: Execute**
[Specific instructions]

**Step 5: Verify output**
Run: `python scripts/verify.py output/`
If verification fails, return to Step 2.
```

This pattern is essential for batch operations, destructive changes, or high-stakes workflows where skipping a step causes failures.

---

## Feedback loop pattern

Forces validation before proceeding. Prevents Claude from skipping critical checks.

**Without code:**
```markdown
## Review process

1. Draft content per STYLE_GUIDE.md
2. Check against this list:
   - [ ] Terminology matches glossary
   - [ ] All required sections present
   - [ ] Examples follow the standard format
3. If issues found: revise, then re-check from step 2
4. Only finalize when all items checked
```

**With code:**
```markdown
## Validation loop

1. Make your changes
2. **Validate immediately:** `python scripts/validate.py output/`
3. If validation fails:
   - Read the error message carefully
   - Fix the specific issue flagged
   - Run validation again
4. **Only proceed when validation passes — never skip this**
5. Final step: `python scripts/pack.py output/ result.zip`
```

Key phrasing: "Do NOT proceed", "Only proceed when", "never skip" — these constraint-words reduce Claude skipping the loop.

---

## Template pattern

Provide output templates when format consistency is critical. Match strictness to the need.

**Strict (exact format required):**
```markdown
## Output format

ALWAYS use this exact structure:

```markdown
# [Title]

## Executive Summary
[One paragraph]

## Findings
- Finding 1: [data]
- Finding 2: [data]

## Recommendations
1. [Specific action]
2. [Specific action]
```

Do not add, remove, or rename sections.
```

**Flexible (guidance with adaptation):**
```markdown
## Output format

Default structure (adapt as needed):

```markdown
# [Title]
[Overview — adjust length to complexity]

## [Main finding]
[Adapt sections to what you find — don't force structure onto sparse data]
```

Use judgment about which sections to include.
```

Use strict when the output is consumed by another system or person expecting a fixed format.
Use flexible when the domain has high variance (research, discovery, creative work).

---

## Examples pattern

Input/output pairs are the most effective form of skill instruction for style-sensitive tasks.

```markdown
## Examples

**Example 1:**
Input: "Added user authentication with JWT tokens"
Output:
```
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware.
Tokens expire after 24h; refresh handled client-side.
```

**Example 2:**
Input: "Fixed bug where null user caused dashboard crash"
Output:
```
fix(dashboard): guard against null user on render

Check user exists before accessing profile properties.
Null case now shows empty state instead of crashing.
```

**Pattern:** [Describe the pattern the examples demonstrate — type/scope, brief description, then detail]
```

Always provide at least 2 examples. 3 is better for tasks with multiple valid formats. Never just describe the format — show it.

---

## Conditional workflow pattern

Guide Claude through decision forks without ambiguity.

```markdown
## Workflow

**Determine the operation type first:**

Creating new content? → Follow "Creation workflow" below
Editing existing content? → Follow "Editing workflow" below
Both? → Run Creation for new sections, Editing for existing ones

---

### Creation workflow
1. [Step A]
2. [Step B]

### Editing workflow
1. [Step X]
2. [Step Y]
```

Use when the skill handles multiple distinct modes that share a name but not a process.

---

## Domain-specific organization pattern

For skills that serve multiple sub-domains. Prevents loading all context when only one sub-domain is needed.

```
skill-name/
├── SKILL.md                    (overview + navigation by sub-domain)
└── reference/
    ├── finance.md              (revenue, billing metrics)
    ├── sales.md                (pipeline, opportunities)
    ├── product.md              (usage, adoption)
    └── marketing.md            (campaigns, attribution)
```

```markdown
## Available datasets

**Finance** — revenue, ARR, billing: See [reference/finance.md](reference/finance.md)
**Sales** — pipeline, accounts: See [reference/sales.md](reference/sales.md)
**Product** — API usage, features: See [reference/product.md](reference/product.md)
**Marketing** — campaigns, attribution: See [reference/marketing.md](reference/marketing.md)
```

Claude reads only the sub-domain file the user's task requires. All others cost zero tokens.
