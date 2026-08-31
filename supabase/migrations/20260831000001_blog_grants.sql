-- Ensure the standard Supabase roles can use the public schema and the
-- blog_posts table. This is required when reusing a project whose public
-- schema grants were revoked (e.g. an app that moved its tables elsewhere).

grant usage on schema public to anon, authenticated, service_role;

grant select on public.blog_posts to anon, authenticated, service_role;
grant insert, update, delete on public.blog_posts to authenticated, service_role;
grant usage on sequence public.blog_posts_id_seq to authenticated, service_role;
