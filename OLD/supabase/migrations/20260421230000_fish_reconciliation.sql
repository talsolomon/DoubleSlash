-- =============================================================================
-- Duble Slash — FISH-001 / FISH-002 reconciliation
-- Date: 2026-04-21 (late)
-- Context: Board pointed at phantom file paths. Actual work landed under
-- _bmad/methodology/ as a multi-file spec and exceeds both tasks' demands.
-- Safe to re-run (all updates are explicit, idempotent).
-- =============================================================================

-- ── 1. FISH-001 → done; repoint notes to real paths ────────────────────────
update public.tasks
set status_id = 'done',
    notes     = 'Delivered as multi-file spec under _bmad/methodology/fish/ (README, phases-and-methods, transitions-and-handoffs, human-ai-collaboration, use-cases). Exceeds spec. Source: https://www.talsolomonux.com/p/0d2. Unblocks FISH-003 and PRD-001.'
where id = 'FISH-001';

-- ── 2. FISH-002 → done; repoint notes to real paths ────────────────────────
update public.tasks
set status_id = 'done',
    notes     = 'Delivered under _bmad/methodology/local-agents/ — README (roster + universal contract) + per-agent specs (explorer.md, solidifier.md, builder.md, shipper.md). Bonus: _bmad/methodology/system-agents/README.md specs 9 Context Cloud workers. This IS the OSS drop. FISH-003 now unblocked.'
where id = 'FISH-002';

-- ── 3. PRD-001 → unblock; FISH-001 is done ─────────────────────────────────
update public.tasks
set notes = 'Demoted P0→P1 on 2026-04-21. Unblocked 2026-04-21 (late) — FISH-001 is done, so Context Cloud framing can now proceed. May supersede existing OSS-launch PRD or layer on it (decide in Solidify).'
where id = 'PRD-001';
