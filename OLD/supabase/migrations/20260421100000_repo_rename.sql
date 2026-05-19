-- =============================================================================
-- Duble Slash — Repo rename + recent-commits catch-up
-- Date: 2026-04-21
-- Context: GitHub repo renamed from talsolomon/collab → talsolomon/DubleSlash.
-- Seeds the two missing commits so the Repo Activity widget reflects current state.
-- Idempotent (on conflict do nothing).
-- =============================================================================

insert into public.repo_commits (sha, msg, feeds) values
  ('ab0693f', 'Rename DoubleSlash to DubleSlash across the repo',                      null),
  ('5447b8a', 'Add FISH methodology, Supabase task board, finish Double Slash rename', 'FISH-001'),
  ('c34c4e4', 'Redesign website hero: larger stage, refined menubar icon, quicklook tail', 'DES-001')
on conflict (sha) do nothing;
