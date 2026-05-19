-- =============================================================================
-- Rebuild reframe — 7-phase task plan for the Duble Slash agent stack rebuild.
-- ---------------------------------------------------------------------------
-- Tal's 2026-04-23 directive: go back to the drawing board on the entire
-- agent architecture. Six decisions locked (see task-board.md Update log
-- entry "2026-04-23 (rebuild reframe)"):
--
--   1. Context Cloud → Duble Slash Cloud  (repo-wide rename, Phase 4)
--   2. Expert skills nest under each expert agent as specializations
--      (Dev → be-dev/fe-dev; PM → growth-pm/tech-pm; etc.)
--   3. Operator names: Dora · Sol · Bran · May (rename sweep, Phase 4)
--   4. Full BMAD literalism — workflow.md + steps/ + frontmatter
--   5. Pricing: $3–5/mo individual, teams higher (deck revision, Phase 7)
--   6. Pitch-deck rebuild deferred to Phase 7
--
-- Phase 3 strategy: build 3 experts deep (Design/PM/Dev), investigate
-- together, then build the rest.
--
-- New tickets inserted:
--   FISH-010  Phase 1 · Methodology HAI deep-dive   [CLOSED same day]
--   FISH-011  Phase 2 · BMAD-shape study v2
--   FISH-012  Phase 3a · Build 3 deep experts (Design/PM/Dev)
--   FISH-013  Phase 3b · Build remaining 6 experts + 4 operators
--   FISH-014  Phase 4 · Directory reorg + rename sweep (atomic)
--   FISH-015  Phase 5 · Stretch test — dogfood one real fish
--   FISH-016  Phase 6 · Install polish — fold rebuilt agents into npx bundle
--   MKT-013   Phase 7 · Rebuild pitch deck
--   OPS-010   Rename sweep: Context Cloud → Duble Slash Cloud
--
-- Also updates FISH-009 status → blocked (subsumed by FISH-013).
--
-- Phase 1 deliverable already landed:
--   - methodology/fish/contracts.md        (NEW — 8 HAI primitives)
--   - methodology/fish/human-ai-collaboration.md  §8–10 appended
--
-- Safe to re-run: inserts use on conflict do nothing; the FISH-009 status
-- update is idempotent.
-- =============================================================================

-- ──────────────────────── Tasks ──────────────────────────────────────────────
insert into public.tasks
  (id, title, group_id, owner_id, status_id, priority_id, due, notes, github, sort_order)
values

  -- ─── Methodology — 7-phase rebuild ───────────────────────────────────────
  ('FISH-010',
   'Phase 1 · Methodology HAI deep-dive — 8 operable primitives',
   'methodology', 'tal', 'done', 'p0', date '2026-04-23',
   'Closed 2026-04-23. Added methodology/fish/contracts.md (8 primitives: PHASE-CHECK, INTENSITY-CAP, HANDOFF-EMIT, TRUST-RECEIPT, NARRATE-STATE, REQUEST-HANDBACK, OVERRIDE-LOG, REDACTION-GATE) + appended §8 agent state model / §9 primitives / §10 failure-mode matrix to methodology/fish/human-ai-collaboration.md. Every failure mode in §1 now has ≥1 named primitive. Unblocks FISH-011 (BMAD-shape study) → FISH-012 (build 3 deep experts). Co-authored with Claude.',
   '',
   100),

  ('FISH-011',
   'Phase 2 · BMAD shape teardown v2 — workflow.md + steps/ pattern',
   'methodology', 'tal', 'todo', 'p0', date '2026-04-26',
   'Added 2026-04-23. Drill into BMAD''s actual skill internals: workflow.md frontmatter, steps/step-NN-*.md micro-file architecture, CSV-loaded technique libraries, context-file pattern, append-only document state. Output: _bmad/docs/bmad-shape-adoption.md — "here''s what we adopt literally, here''s what we adapt for FISH, here''s what we reject." The existing _bmad/docs/bmad-teardown-for-our-agents.md is a good punch list but doesn''t cover the BMAD *structure* at skill-file level. Depends on FISH-010 (contracts locked). Blocks FISH-012.',
   '',
   110),

  ('FISH-012',
   'Phase 3a · Build 3 deep expert agents (Design/PM/Dev) BMAD-shaped',
   'methodology', 'tal', 'todo', 'p0', date '2026-05-03',
   'Added 2026-04-23. Build methodology/agents/experts/{design,pm,dev}/ each as a full BMAD-shaped skill: agent.md (persona + capability loadout), workflow.md (primitive call order from contracts.md), steps/ (micro-files per primitive), skills/ (specializations — Dev → be-dev/fe-dev/mobile-dev; PM → growth-pm/tech-pm; Design → product-designer/ux-researcher). Distribute the 136 personas from methodology/local-agents/experts.md into the appropriate parent. Each agent references contracts.md primitives by name. Success: dogfood a single fish through these 3 (Phase 5 stretch test). Depends on FISH-011. Blocks FISH-013.',
   '',
   120),

  ('FISH-013',
   'Phase 3b · Build remaining 6 experts + 4 operators (Dora/Sol/Bran/May)',
   'methodology', 'tal', 'todo', 'p0', date '2026-05-17',
   'Added 2026-04-23. Following the pattern validated in FISH-012: build DesignOps, TechPM, Architect, QA, Analyst, AssetCreator expert agents (same BMAD shape, distribute remaining 136 personas into their skills/), and rebuild the four operators (Dora=Explorer, Sol=Solidifier, Bran=Builder, May=Shipper) as BMAD-shaped skills under agents/operators/. Closes FISH-005 (punch list), FISH-006 (project-context ownership), FISH-009 (expert-shortcut grammar — lands natively). Depends on FISH-012.',
   '',
   130),

  ('FISH-014',
   'Phase 4 · Directory reorganization + rename sweep (single commit)',
   'methodology', 'tal', 'todo', 'p0', date '2026-05-19',
   'Added 2026-04-23. Atomic: methodology/local-agents/ → methodology/agents/operators/ + methodology/agents/experts/. Rename Nova→Dora, Bram→Bran, Sage→May across every file (pitch deck, PRD, briefs, methodology, website copy, system-agents README). Concurrent with OPS-010 (Context Cloud → Duble Slash Cloud). Pre-commit: grep for every cross-ref and resolve. Depends on FISH-013. Blocks FISH-015.',
   '',
   140),

  ('FISH-015',
   'Phase 5 · Stretch test — dogfood one real fish end-to-end',
   'methodology', 'tal', 'todo', 'p0', date '2026-05-24',
   'Added 2026-04-23. Pick a real card (candidates: landing-page hero refresh, task-board UI tweak, a microcopy Nemo). Run it through Dora → Sol → Bran → May with the rebuilt agents + handoffs only. Capture every friction point. Fix round 1. Second dogfood on a different archetype (Salmon or Willie) to stress different cells of the matrix. Output: friction log + fix list + "agents-ready-for-OSS" sign-off or scoped fix list. Depends on FISH-014.',
   '',
   150),

  ('FISH-016',
   'Phase 6 · Install polish — fold rebuilt agents into the npx install bundle',
   'methodology', 'tal', 'todo', 'p0', date '2026-06-02',
   'Added 2026-04-23. No scope change to FISH-003 (one-command install + macOS menu-bar); swap in rebuilt agents/ directory as the install payload. Update install-bundle content (FISH-008) to reference new operator names + new expert roster. Depends on FISH-015 (agents must pass stretch test) and install-track items (FISH-007 / OPS-003 / OPS-004 / FISH-008).',
   '',
   160),

  -- ─── Marketing — Phase 7 pitch deck rebuild ──────────────────────────────
  ('MKT-013',
   'Phase 7 · Rebuild pitch deck for the rebuilt architecture',
   'marketing', 'tal', 'todo', 'p0', null,
   'Added 2026-04-23 (rebuild reframe). After Phase 3b lands (FISH-013), spawn a parallel agent to rebuild _bmad/planning-artifacts/pitch-decks/pitch-deck-duble-slash.md to reflect: 2-layer agent model (operators + experts with skill specializations), Dora/Sol/Bran/May names, Duble Slash Cloud rename, individual $3–5/mo + teams pricing delta, BMAD-shaped install payload, Phase 5 dogfood evidence. Current 2026-04-23 deck captures pre-rebuild thinking — needs ground-up pass, not patch. Regenerate HTML via `npx @marp-team/marp-cli`. Depends on FISH-013.',
   '',
   170),

  -- ─── Ops — Cloud rename sweep ────────────────────────────────────────────
  ('OPS-010',
   'Rename sweep: Context Cloud → Duble Slash Cloud (repo-wide)',
   'ops', 'tal', 'todo', 'p0', date '2026-05-19',
   'Added 2026-04-23 (rebuild reframe). Tal''s rename decision. Atomic with FISH-014 directory reorg — single commit across pitch deck, PRDs, briefs, methodology docs, system-agents README, website copy, company docs. Pre-commit: grep the repo for "Context Cloud" and resolve every instance. Audit-heavy mechanical sweep, not a design change.',
   '',
   100)

on conflict (id) do nothing;

-- ──────────────────── Update FISH-009 → blocked (subsumed) ───────────────────
update public.tasks
set status_id = 'blocked',
    due = date '2026-05-17',
    notes = notes || E'\n\n[2026-04-23 rebuild reframe] Subsumed by FISH-013 (Phase 3b). The expert-shortcut grammar + per-agent wiring will land natively in the BMAD-shaped rebuild rather than as a patch on the pre-rebuild specs. Keep this task open as a traceability pointer; close when FISH-013 lands.'
where id = 'FISH-009'
  and status_id <> 'blocked';
