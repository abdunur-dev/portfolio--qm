-- Create public bucket for project cover images
insert into storage.buckets (id, name, public)
values ('project-covers', 'project-covers', true)
on conflict (id) do update set public = true;

-- Allow anyone to read covers (bucket is public)
drop policy if exists "Public read project covers" on storage.objects;
create policy "Public read project covers"
on storage.objects for select
using (bucket_id = 'project-covers');

-- Allow authenticated users to upload to a folder named after their user id
drop policy if exists "Owner upload project covers" on storage.objects;
create policy "Owner upload project covers"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'project-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow owners to update / delete their own files
drop policy if exists "Owner update project covers" on storage.objects;
create policy "Owner update project covers"
on storage.objects for update
to authenticated
using (
  bucket_id = 'project-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Owner delete project covers" on storage.objects;
create policy "Owner delete project covers"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'project-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);
