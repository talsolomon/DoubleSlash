#!/usr/bin/env python3
"""
Batch-patches all 168 DS registry SKILL.md files:
- Appends method-derived synonyms to description ("Also triggers on: ...")
- Adds tags: [domain, phase] to frontmatter
- Adds model: inherit to frontmatter
"""

import os
import re

SKILLS_DIR = "/Users/talsolomon/Documents/dubleslash/.claude/skills"


def extract_methods(body: str) -> list[str]:
    match = re.search(r'## Methods\n(.+?)(?=\n##|\Z)', body, re.DOTALL)
    if not match:
        return []
    methods_line = match.group(1).strip()
    methods = [m.strip() for m in methods_line.split(",")]
    return [m for m in methods if m][:6]


def patch_skill(path: str, domain: str, phase: str) -> bool:
    with open(path, 'r') as f:
        content = f.read()

    if not content.startswith("---"):
        return False

    split = content.split("---", 2)
    if len(split) < 3:
        return False

    frontmatter = split[1]
    body = split[2]

    changed = False

    # Add synonyms from methods if not already present
    if "Also triggers on:" not in frontmatter:
        methods = extract_methods(body)
        if methods:
            synonym_str = ", ".join(methods)
            # Append to description line (handles single-line descriptions)
            frontmatter = re.sub(
                r'(description: .+?)(\n)',
                lambda m: m.group(1).rstrip('.') + f'. Also triggers on: {synonym_str}.' + m.group(2),
                frontmatter,
                count=1
            )
            changed = True

    # Add tags if not present
    if "tags:" not in frontmatter:
        frontmatter = frontmatter.rstrip('\n') + f"\ntags: [{domain}, {phase}]\n"
        changed = True

    # Add model if not present
    if "model:" not in frontmatter:
        frontmatter = frontmatter.rstrip('\n') + "\nmodel: inherit\n"
        changed = True

    if changed:
        with open(path, 'w') as f:
            f.write(f"---{frontmatter}---{body}")

    return changed


def main():
    updated = 0
    skipped = 0

    for root, dirs, files in os.walk(SKILLS_DIR):
        dirs.sort()
        for file in sorted(files):
            if file != "SKILL.md":
                continue

            path = os.path.join(root, file)
            rel = os.path.relpath(root, SKILLS_DIR)
            parts = rel.split(os.sep)

            domain = parts[0] if len(parts) > 0 else "general"
            phase = parts[1] if len(parts) > 1 else "general"

            if patch_skill(path, domain, phase):
                print(f"  patched  {rel}")
                updated += 1
            else:
                print(f"  skipped  {rel}")
                skipped += 1

    print(f"\n{updated} patched, {skipped} skipped.")


if __name__ == "__main__":
    main()
