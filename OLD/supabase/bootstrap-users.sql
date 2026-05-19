-- =============================================================================
-- Double Slash — Bootstrap the two founder auth users.
-- Run in Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Safe to re-run: wipes and recreates both rows each time.
--
-- WHY: Supabase's default signup flow wants to send a confirmation email, which
-- hits the 3/hr rate limit. This script creates both users directly in
-- auth.users with pre-set passwords and email_confirmed_at = now(), so
-- password sign-in works immediately — no email round-trip, no rate limit.
--
-- Credentials baked in (2026-04-21):
--   Tal:     talsolomon21@gmail.com / q1w2e3r4t5!%
--   Shenhav: slev92@gmail.com        / q1w2e3r4t5!%
-- To change a password later, edit the two crypt() calls below and re-run.
-- =============================================================================

begin;

-- ── 1. Clean slate ───────────────────────────────────────────────────────────
delete from auth.identities
  where user_id in (
    select id from auth.users
    where email in ('talsolomon21@gmail.com', 'slev92@gmail.com')
  );
delete from auth.users
  where email in ('talsolomon21@gmail.com', 'slev92@gmail.com');

-- ── 2. Create Tal ────────────────────────────────────────────────────────────
do $$
declare uid uuid := gen_random_uuid();
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data,
    is_sso_user, is_anonymous,
    -- GoTrue expects these to be empty strings, not null, on some versions.
    confirmation_token, recovery_token,
    email_change, email_change_token_new, email_change_token_current,
    reauthentication_token, phone_change, phone_change_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    uid, 'authenticated', 'authenticated',
    'talsolomon21@gmail.com',
    crypt('q1w2e3r4t5!%', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false, false,
    '', '', '', '', '', '', '', ''
  );
  insert into auth.identities (
    id, provider_id, user_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(),
    'talsolomon21@gmail.com', uid,
    jsonb_build_object(
      'sub', uid::text,
      'email', 'talsolomon21@gmail.com',
      'email_verified', true,
      'phone_verified', false
    ),
    'email',
    now(), now(), now()
  );
end $$;

-- ── 3. Create Shenhav ────────────────────────────────────────────────────────
do $$
declare uid uuid := gen_random_uuid();
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data,
    is_sso_user, is_anonymous,
    confirmation_token, recovery_token,
    email_change, email_change_token_new, email_change_token_current,
    reauthentication_token, phone_change, phone_change_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    uid, 'authenticated', 'authenticated',
    'slev92@gmail.com',
    crypt('q1w2e3r4t5!%', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false, false,
    '', '', '', '', '', '', '', ''
  );
  insert into auth.identities (
    id, provider_id, user_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(),
    'slev92@gmail.com', uid,
    jsonb_build_object(
      'sub', uid::text,
      'email', 'slev92@gmail.com',
      'email_verified', true,
      'phone_verified', false
    ),
    'email',
    now(), now(), now()
  );
end $$;

-- ── 4. Sync the allowlist (public.allowed_emails) ────────────────────────────
insert into public.allowed_emails (email, name) values
  ('talsolomon21@gmail.com', 'Tal'),
  ('slev92@gmail.com',       'Shenhav')
on conflict (email) do nothing;

-- ── 5. Sanity check ──────────────────────────────────────────────────────────
select
  u.email,
  u.email_confirmed_at is not null as confirmed,
  (select count(*) from auth.identities i where i.user_id = u.id) as identity_rows,
  exists(select 1 from public.allowed_emails a where lower(a.email) = lower(u.email)) as in_allowlist
from auth.users u
where u.email in ('talsolomon21@gmail.com', 'slev92@gmail.com');

commit;
