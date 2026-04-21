-- =============================================================================
-- Duble Slash — Rollback the bootstrap-users.sql attempt.
-- Run this in Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Wipes the malformed auth rows so you can recreate via the Dashboard UI.
-- =============================================================================

begin;

delete from auth.identities
  where user_id in (
    select id from auth.users
    where email in ('talsolomon21@gmail.com', 'slev92@gmail.com')
  );

delete from auth.users
  where email in ('talsolomon21@gmail.com', 'slev92@gmail.com');

-- allowed_emails stays — it's public and correct.
select email, email_confirmed_at is not null as confirmed
from auth.users
where email in ('talsolomon21@gmail.com', 'slev92@gmail.com');
-- ↑ should return 0 rows.

commit;
