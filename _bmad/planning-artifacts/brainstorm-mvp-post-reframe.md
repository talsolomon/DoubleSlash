# Brainstorm — MVP after the OSS/Platform reframe

**Date:** 2026-04-21
**Facilitator:** John (PM agent)
**Status:** Paused mid-converge — awaiting user's 3–4 picks from A–P.

> Recovered from Claude session `dba432d7-0a97-4141-b8d0-f2e469974be9` (folder renamed from `collab` → `doubleslash`; the session transcript was preserved in `~/.claude/projects/`).

---

## 1. The reframe (from Tal)

The MVP story pivoted in the prior session. Naming it back cleanly:

- **OSS = FISH agents as free, downloadable, drop-into-any-AI-tool artifacts.** No beacon required. A random indie dev installs one package, types `//` in Claude Desktop / Cursor / ChatGPT Desktop, and gets the FISH-guided flow immediately. Zero platform, zero account. **Methodology-as-distribution.**
- **Platform (hosted) = the memory + coordination layer on top.** Beacon, context cloud, long-context management, GitHub-layer history, Linear-layer process view, multiplayer. **Free for solo, paid above 5 seats.** Solo is the foot-in-the-door; team sync is where the value compounds.
- **FISH is the product's soul**, not a feature. Replacing Agile is a *huge* positioning claim — but it earns narrative oxygen that "capture layer" never will. The agents are the vessel that carries FISH into the world.
- **FISH model reference:** https://www.talsolomonux.com/p/0d2 — bigger↔smaller × known↔unknown. Linear layer obeys this methodology; local (BMAD-based) agents follow the process it dictates.

### Tal's reactions to the prior draft flow (point-by-point)

1. **Step 6 "beacon syncing" was hand-wavy.** Even solo, you get organization + the methodology. Solo is free. Solo sessions sync to context cloud → long-context management, GitHub-layer history, Linear-layer flow. Team sync is the real win, but solo is the wedge.
2. **Step 8 "FISH model" is new.** Right — it's the methodology we'll present to the world as the first Agentic-Human way to work.
3. **Step 5's permission ask.** Not a "DMG install" problem — it gets its own popup during install, with strong explainer copy. OpenClaw / Accomplish set precedent for apps taking full ownership.
4. **Redaction.** Tal flagged it's not yet designed. "Need to think how to keep it super safe and easy to use."
5. **Multi-user flow.** Second-priority. Single-user install is flow #1.
6. **`//` gesture is locked.** It's the best idea from the previous round — consent-per-session, mirrors the brand, teachable in one sentence. During install, we update the local LLM's memory so it knows `//` is operating Double Slash.

---

## 2. Stashed note for `technical-research-double-slash-stack.md`

From the paused session (couldn't write due to folder rename) — now added to the doc:

> The `//` trigger requires tool-specific install plumbing — Claude Desktop uses `CLAUDE.md` / memory files, Cursor uses `.cursorrules`, ChatGPT Desktop uses Custom Instructions. Each target tool needs its own handler. No universal primitive exists; treat `//` onboarding as N separate integrations (one per supported AI tool), not one.

---

## 3. Round 1 — User lens (delight, no filter)

### Thread 1 — `//` without the beacon

- **A.** `//` in Claude → a ghost line appears *above* the prompt: *"FISH: Explore mode on. I'll ask the 3 questions that save you an hour."* No dialog, no modal — feels native to Claude.
- **B.** `//` alone (no text) → inline palette listing FISH phases (Explore / Solidify / Build / Ship). User arrows, picks one. The palette *teaches* FISH vocabulary by using it.

### Thread 2 — FISH in the Linear layer

- **C.** The Linear layer is literally a **fish swimming left-to-right**: head = Explore, body = Solidify/Build, tail = Ship. Active card glows inside the fish. Fish *size* = project size; fish *texture* (solid vs. dotted) = known vs. unknown. You say "I'm in the body" not "sprint 3."
- **D.** Cards carry a 2-axis sigil (bigger↔smaller × known↔unknown). The sigil tells agents which playbook to run — no config file, the visual *is* the config.

### Thread 3 — solo-hosted visceral moment

- **E.** **"Pick up from yesterday" moment.** Open the hosted surface: *"Yesterday you were working on the settings redesign in Claude. You left it at 'should toggles live in a modal?' — resume here?"* One click re-seeds Claude with full prior context. This is the hook.
- **F.** **Pattern spotter.** Beacon notices: *"You've asked this same question 4 times across 3 sessions."* Offers to bake a canonical answer into your context cloud so you stop re-asking.

### Thread 4 — redaction trust

- **G.** **Trust receipt.** Every push produces a signed, hashed receipt: *"18 lines, 2 redactions (1 secret auto-caught, 1 PII you chose). Stored locally."* Openable forever. Auditability as UI, not policy doc.
- **H.** **Teach once.** First time a secret gets flagged, one click = *"always redact anything like this."* Personal redaction vocabulary that gets smarter per user.

## 4. Round 2 — Constraints removed (wild)

- **J.** **Agents negotiate peer-to-peer.** My capture agent finds your planning agent in the same shared session and they coordinate *silently*: "you're on the bigger-known axis, I'll narrate, you decide." FISH as a multi-agent protocol, not a UI.
- **K.** **`//` auto-propagates to new tools.** Install a new AI app next week — Double Slash detects it, writes the `//` handler into its memory without user action. 1Password-style auto-everywhere.
- **L.** **Retroactive trust (sandbox mode).** Flip a switch: nothing leaves the laptop. Work a full day. *After*, see exactly what *would have* been pushed, approve or discard retroactively. Trust earned in reverse.
- **M.** **FISH as open standard.** Other AI tools adopt `//` + FISH phases because their users demand it. Double Slash owns the canonical spec the way Figma owns "Play" and Apple owns "swipe up."

## 5. Round 3 — Analogies

- **N. 1Password.** Silent background presence, pops on cue, auto-fills sensitive material, shows exactly what it did. → **Apply to redaction:** "the 1Password of AI outputs." Redaction is the autofill moment; the trust receipt is the vault log.
- **O. GitHub PR view.** Nobody loved `git diff` until GitHub wrapped it in a PR UI. → **Apply to FISH's GitHub layer:** session-diffs become *PRs for AI work* — titled, narrated, reviewable by future-you (or a teammate in V1).
- **P. Strava.** Passively captures your run, replays it afterward, makes you feel something about what just happened. → **Apply to the weekly replay:** past-you becomes legible to future-you. The week stops being a blur.

---

## 6. Paused here — next step

**User's move (Step 3, converge):** pick **3–4 favorites** from A–P. John will cluster, name the clusters, and rate Impact × Feasibility. Also open to flagging anything that's wrong or off-brand.

**Known-open loose ends to circle back on after converge:**
- Redaction UX (safe + easy — not yet designed)
- How the multi-user / team flow layers on top of the solo flow
- Update the brief to reflect the OSS/Platform split
