-- ============================================================================
-- LUMORA — Supabase Schema
-- ============================================================================
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query
-- → paste all of this → Run.
--
-- Supabase already gives you `auth.users` (email, password, id) for free —
-- you never create that table yourself. Everything below is YOUR app data,
-- linked to auth.users via user_id / id = auth.uid().
-- ============================================================================

-- 1. PROFILES — extra fields auth.users doesn't have (name, premium, pin...)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_color text default '#B7A9E8',
  premium boolean default false,
  pin text,
  provider text default 'email',
  created_at timestamptz default now()
);

-- Auto-create a profile row the moment someone signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, provider)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''), coalesce(new.raw_app_meta_data->>'provider', 'email'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. JOURNAL ENTRIES
create table if not exists journal_entries (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null default 'daily',
  text text not null,
  created_at timestamptz default now()
);

-- 3. GRATITUDE ENTRIES
create table if not exists gratitude_entries (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  items jsonb not null default '[]',
  created_at timestamptz default now()
);

-- 4. MOOD ENTRIES — one row per user per weekday (0=Mon..6=Sun), upserted
create table if not exists mood_entries (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_index int not null check (day_index between 0 and 6),
  value int not null check (value between 0 and 5),
  updated_at timestamptz default now(),
  unique (user_id, day_index)
);

-- 5. NOTIFICATIONS
create table if not exists notifications (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  body text not null,
  type text default 'system',
  read boolean default false,
  created_at timestamptz default now()
);

-- 6. COUNSELOR BOOKINGS
create table if not exists counselor_bookings (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  counselor_id int not null,
  created_at timestamptz default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY — critical for a mental-health app. Without this,
-- ANY logged-in user could read/write ANY other user's private journal.
-- ============================================================================
alter table profiles enable row level security;
alter table journal_entries enable row level security;
alter table gratitude_entries enable row level security;
alter table mood_entries enable row level security;
alter table notifications enable row level security;
alter table counselor_bookings enable row level security;

-- Profiles: everyone can read their own; only owner can update.
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- Generic "own rows only" policy pattern for the rest:
create policy "journal_all_own" on journal_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "gratitude_all_own" on gratitude_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "mood_all_own" on mood_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications_all_own" on notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "bookings_all_own" on counselor_bookings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- OPTIONAL: seed a welcome notification whenever a new profile is created
-- ============================================================================
create or replace function public.seed_welcome_notification()
returns trigger as $$
begin
  insert into public.notifications (user_id, title, body, type)
  values (new.id, 'Welcome to Lumora', 'Your safe space is ready whenever you are.', 'system');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_profile_created on profiles;
create trigger on_profile_created
  after insert on profiles
  for each row execute procedure public.seed_welcome_notification();
