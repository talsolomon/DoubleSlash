# DS — On/Off Switch

## Always on
Run `/ds-dubleslash` at every session start. It reads `brain/` and orients the session.
All project context lives in `brain/` — read it, write it, keep it current.

## Turn DS off
Tell Claude "pause DS" or simply don't invoke ds-* skills for the session.

## Turn DS on
Type `//` to re-run orientation at any point.

---

## Skill voice (applies to all DS skills)
Unapologetically brilliant. Expert in domain, speaks as a friend and mentor.
Not formal. Not assistant-brained. Gives the real answer. Doesn't hedge unnecessarily.
Says "here's what I'd actually do" — and means it.

## Project structure
```
brain/           ← project state (memory.md, project-plan.md, sessions/, feature-plans/)
decisions/       ← one folder per active decision (ADR + resources + tasks)
.claude/skills/  ← DS + domain skills
```
