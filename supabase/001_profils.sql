-- Embr — Profils et abonnements
-- À coller dans Supabase : SQL Editor → New query → Run.

-- 1. Table des profils (un par utilisateur)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  pseudo text,
  plan text not null default 'none' check (plan in ('none', 'pro', 'ultimate')),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. Sécurité : chacun ne peut LIRE que son propre profil.
--    Personne ne peut modifier son plan ou son statut admin depuis le site :
--    seuls Stripe (côté serveur) et toi (dans Supabase) le peuvent.
alter table public.profiles enable row level security;

drop policy if exists "lire son profil" on public.profiles;
create policy "lire son profil" on public.profiles
  for select using (auth.uid() = id);

-- 3. Création automatique du profil à chaque inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, pseudo)
  values (new.id, new.raw_user_meta_data ->> 'pseudo')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Profils pour les comptes déjà créés
insert into public.profiles (id, pseudo)
select id, raw_user_meta_data ->> 'pseudo' from auth.users
on conflict (id) do nothing;

-- 5. Ton compte : administrateur, accès à tout, gratuitement
update public.profiles set is_admin = true, plan = 'ultimate'
where id = (select id from auth.users where email = 'soupir124@gmail.com');
