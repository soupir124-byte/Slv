create table if not exists public.projects (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users on delete cascade, name text not null, description text, tree jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create index if not exists projects_user_idx on public.projects (user_id, updated_at desc);

alter table public.projects enable row level security;

drop policy if exists "projets lire" on public.projects;

create policy "projets lire" on public.projects for select using (auth.uid() = user_id);

drop policy if exists "projets creer" on public.projects;

create policy "projets creer" on public.projects for insert with check (auth.uid() = user_id);

drop policy if exists "projets modifier" on public.projects;

create policy "projets modifier" on public.projects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "projets supprimer" on public.projects;

create policy "projets supprimer" on public.projects for delete using (auth.uid() = user_id);
