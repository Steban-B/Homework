create table if not exists public.tareas (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  titulo text not null check (char_length(titulo) > 0),
  completada boolean not null default false,
  creada_en timestamptz not null default now()
);

alter table public.tareas enable row level security;

create policy "ver mis tareas" on public.tareas
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "crear mis tareas" on public.tareas
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "editar mis tareas" on public.tareas
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "borrar mis tareas" on public.tareas
  for delete to authenticated
  using ((select auth.uid()) = user_id);

alter publication supabase_realtime add table public.tareas;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "ver avatars" on storage.objects
  for select
  using (bucket_id = 'avatars');

create policy "subir mi avatar" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "cambiar mi avatar" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "borrar mi avatar" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
