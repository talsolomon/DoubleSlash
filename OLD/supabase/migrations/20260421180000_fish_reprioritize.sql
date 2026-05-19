-- =============================================================================
-- Duble Slash — FISH-first reprioritization
-- Date: 2026-04-21
-- Context: Tal reframed the MVP — FISH is the critical path; PRD rewrite demoted.
-- Safe to re-run (idempotent — all updates set explicit values, all inserts upsert).
-- =============================================================================

-- ── 1. Renumber old FISH-002 (flow.yaml spec) → FISH-004 ────────────────────
-- Only renames if old row still exists with the v2-milestone title.
update public.tasks
set id         = 'FISH-004',
    sort_order = 40,
    notes      = 'Required attributes per card; phase transitions. V2 milestone. Formerly FISH-002 — renumbered 2026-04-21.'
where id = 'FISH-002' and title like 'Map FISH stages%';

-- ── 2. Promote + retitle FISH-001 ───────────────────────────────────────────
update public.tasks
set title       = 'Write FISH methodology v2 spec',
    priority_id = 'p0',
    due         = date '2026-04-28',
    sort_order  = 10,
    notes       = 'Output: _bmad/planning-artifacts/methodology-fish-v2.md. Phases, axes (bigger↔smaller × known↔unknown), transitions, per-phase demands. Source: https://www.talsolomonux.com/p/0d2. Bottleneck — PRD rewrite, agent spec, capture design all depend on this.'
where id = 'FISH-001';

-- ── 3. Insert new FISH-002 (agent roster) ───────────────────────────────────
insert into public.tasks (id, title, group_id, owner_id, status_id, priority_id, due, notes, github, sort_order)
values ('FISH-002',
        'Define FISH agent roster — phase → agent mapping + handoff contract',
        'methodology', 'tal', 'todo', 'p0', date '2026-05-05',
        'One agent per FISH phase; each agent''s prompt, tools, and handoff I/O. This IS the OSS drop — the thing users install. Depends on FISH-001. Output: _bmad/planning-artifacts/fish-agent-roster.md.',
        '', 20)
on conflict (id) do update
  set title       = excluded.title,
      group_id    = excluded.group_id,
      owner_id    = excluded.owner_id,
      status_id   = excluded.status_id,
      priority_id = excluded.priority_id,
      due         = excluded.due,
      notes       = excluded.notes,
      sort_order  = excluded.sort_order;

-- ── 4. Insert new FISH-003 (install bundle) ─────────────────────────────────
insert into public.tasks (id, title, group_id, owner_id, status_id, priority_id, due, notes, github, sort_order)
values ('FISH-003',
        'Spec the // install bundle for Claude Desktop / Cursor / ChatGPT Desktop',
        'methodology', 'tal', 'todo', 'p0', date '2026-05-12',
        'Per-tool install plumbing — Claude (CLAUDE.md), Cursor (.cursorrules), ChatGPT Desktop (Custom Instructions). See technical-research-duble-slash-stack.md (capture invocation subsection). Depends on FISH-002.',
        '', 30)
on conflict (id) do update
  set title       = excluded.title,
      group_id    = excluded.group_id,
      owner_id    = excluded.owner_id,
      status_id   = excluded.status_id,
      priority_id = excluded.priority_id,
      due         = excluded.due,
      notes       = excluded.notes,
      sort_order  = excluded.sort_order;

-- ── 5. Demote PRD-001 P0 → P1, push due date ────────────────────────────────
update public.tasks
set priority_id = 'p1',
    due         = date '2026-05-19',
    notes       = 'Demoted from P0 to P1 on 2026-04-21. Blocked-adjacent on FISH-001 — can''t rewrite the PRD around Context Cloud until FISH is specified, because FISH is what the Context Cloud organizes. May supersede existing OSS-launch PRD.'
where id = 'PRD-001';
