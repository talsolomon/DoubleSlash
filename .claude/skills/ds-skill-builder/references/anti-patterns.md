# Anti-Patterns: What Breaks Skills

Every item below is a documented failure mode from production skill usage. Check each before shipping.

---

## Spec violations (instant fail)

### Bare Bash in allowed-tools
```yaml
# WRONG — allows any shell command; security risk + spec violation
allowed-tools: Bash, Read, Write

# RIGHT — scoped to specific commands
allowed-tools: Bash(npm:*), Bash(python:*), Bash(git:*), Read, Write
```
Bare `Bash` passes any shell command through — Claude can `rm -rf` with it. Always scope.

### Absolute paths
```markdown
# WRONG
See /Users/john/.claude/skills/my-skill/reference/guide.md

# RIGHT
See [reference/guide.md](reference/guide.md)
or use ${CLAUDE_SKILL_DIR}/reference/guide.md
```
Absolute paths break portability. The skill works only on one machine.

### Windows-style paths
```markdown
# WRONG
Run: scripts\validate.py

# RIGHT
Run: python scripts/validate.py
```
Backslashes fail on macOS and Linux. Always use forward slashes.

### Reserved words in name
```yaml
# WRONG
name: claude-helper
name: anthropic-tools

# RIGHT
name: commit-helper
name: dev-tools
```

### First/second person in description
```yaml
# WRONG
description: I can help you process Excel files and generate reports

# RIGHT
description: Processes Excel files and generates formatted reports
```
The description is injected into the system prompt. First/second person breaks the model's voice.

---

## Routing failures (undertriggering / overtriggering)

### Vague description
```yaml
# WRONG — matches nothing specifically; will never trigger
description: Helps with documents

# WRONG — too narrow; misses half the use cases
description: Processes PDF files

# RIGHT — specific + synonyms
description: Extracts text, tables, and form data from PDF files. Use when processing PDFs, extracting document content, filling PDF forms, or working with scanned pages. Also triggers on: document extraction, PDF merge, convert PDF, form filling.
```

### Missing negative bounds (overtriggering)
When a skill triggers on tasks it can't handle, add explicit exclusions:
```yaml
description: [...] Does NOT handle Word documents (.docx), Excel files, or image-only PDFs without embedded text.
```

### No synonym coverage
LLM routing is semantic but imprecise. A user asking "parse this PDF" might not trigger a skill named "pdf-processing" without "parse" in the description. Include at least 4-6 synonyms covering how users actually phrase the request.

---

## Context bloat (progressive disclosure failures)

### SKILL.md over 500 lines
Everything in one massive file means the entire skill loads whether needed or not. Split:
- Domain-specific data → `references/domain-data.md`
- API reference → `references/api.md`
- Extended examples → `references/examples.md`
- Troubleshooting → `references/troubleshooting.md`

### Nested reference chains
```markdown
# SKILL.md links to:
See advanced.md for details

# advanced.md links to:
See details.md for the actual config

# details.md has the real content
```
Claude partial-reads nested files using `head -100`. Content past the first 100 lines of `details.md` may never be seen. **All references must link directly from SKILL.md.**

### No table of contents on long reference files
For reference files > 100 lines, Claude may partial-read them and miss later sections. Add:
```markdown
## Contents
- Section 1: Overview
- Section 2: Configuration options
- Section 3: Error codes
- Section 4: Examples
```

---

## Instruction failures (poor output quality)

### Too many options presented
```markdown
# WRONG — Claude doesn't know which to pick; output will be inconsistent
You can use pypdf, pdfplumber, PyMuPDF, pdf2image, or pdfminer for this.

# RIGHT — one default, one escape hatch
Use pdfplumber for text extraction:
```python
import pdfplumber
```
For scanned PDFs requiring OCR, use pdf2image + pytesseract instead.
```

### Punting errors to Claude instead of handling them
```python
# WRONG — if this fails, Claude has no path forward
def process(path):
    return open(path).read()

# RIGHT — explicit handling
def process(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        print(f"File {path} not found. Check the path and try again.")
        return None
```

### Magic constants in scripts
```python
# WRONG — Claude (and humans) don't know why
TIMEOUT = 47
RETRIES = 5

# RIGHT — self-documenting
# Typical HTTP requests complete in < 30s; extra buffer for slow connections
REQUEST_TIMEOUT = 30
# Second retry resolves most transient failures; third is rare but worth it
MAX_RETRIES = 3
```

### Time-sensitive information
```markdown
# WRONG — will be wrong after August 2025; confusing for anyone later
If you're running this before August 2025, use the old API.
After August 2025, use the new API.

# RIGHT — version the content, not the date
## Current method
Use the v2 API endpoint: `api.example.com/v2/messages`

## Old patterns (deprecated)
<details>
<summary>Legacy v1 API</summary>
The v1 endpoint (api.example.com/v1/messages) was deprecated in 2025-08.
Not supported. Use v2.
</details>
```

### Assuming packages are installed
```markdown
# WRONG
Use the pypdf library to read the PDF.

# RIGHT
Install required package: `pip install pypdf`

Then:
```python
from pypdf import PdfReader
reader = PdfReader("file.pdf")
```
```

### MCP tools without server prefix
```markdown
# WRONG — Claude can't locate the tool when multiple MCP servers are active
Use the bigquery_schema tool to get the schema.

# RIGHT — fully qualified
Use the BigQuery:bigquery_schema tool to retrieve table schemas.
```

---

## Security violations

### Hardcoded secrets
```markdown
# WRONG — never do this
API_KEY=sk-abc123...

# RIGHT — reference from environment
API_KEY from environment: `echo $MY_SERVICE_API_KEY`
Or: stored in ~/.env and loaded with `source ~/.env`
```

### Write access to sensitive paths
Skills that write to `~/.ssh/`, git credential stores, system config, or CI secrets must:
1. Flag this explicitly in the security section
2. Require explicit user confirmation before executing
3. Never automate the write without user review of the exact change

### Assuming trusted input
User-provided content passed to scripts must be sanitized. Shell injection is real:
```python
# WRONG — shell injection if filename contains ;rm -rf ~
os.system(f"python process.py {filename}")

# RIGHT
subprocess.run(["python", "process.py", filename], check=True)
```
