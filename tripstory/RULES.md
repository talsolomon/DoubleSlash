# TripStory — Project Rules

_This project is isolated. It lives under the DubleSlash workspace to inherit DS skills, but it has its own brain, memory, decisions, and context. Nothing here mixes with the Duble//Slash product._

## Identity
- **Project:** TripStory (working name) — a location-aware audio companion that narrates the road for families on drives.
- **Repo:** https://github.com/talsolomon/tripstoryapp
- **Owner:** Tal Solomon <talsolomon21@gmail.com>

## Isolation rules
- All TripStory work happens in `tripstory/`. Never write TripStory state into the DubleSlash `brain/`, `decisions/`, `decisionlog.md`, etc.
- All TripStory context lives in `tripstory/brain/`. Read it and write it every session.
- DS skills are available (via the shared `.claude/skills/`), but project *state* stays inside `tripstory/`.

## Hard rules (inherited from DS, owner-only)
- Git identity: `Tal Solomon <talsolomon21@gmail.com>` — no other identity ever.
- Never write em dashes in any output. Use commas, colons, or periods.
- Never spin up infrastructure without asking first.
- Do not build product code until the plan is locked and the owner says go.

## Working stance
- The company is the **content engine + memory graph**, not the app. Sequence accordingly: prove content quality first, build the app last.
- Everything grounded: no invented "facts" are ever narrated to a child. Generation stands on verified sources.

## Known environment issue
- The repo's git-commit hook is pinned to a macOS path (`/Users/talsolomon/...`) that does not exist in the cloud container, so `git commit` is blocked here until fixed. Writing files is unaffected. Fix before first push.
