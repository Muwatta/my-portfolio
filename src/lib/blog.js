import { supabase, isSupabaseConfigured } from "./supabase";

const TABLE = "blog_posts";

export const asPublicPost = (row = {}) => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  body: row.body,
  category: row.category,
  date: row.date,
  image: row.image,
  medium_link: row.medium_link,
  tags: row.tags || [],
  readTime: row.read_time || row.readTime,
  featured: Boolean(row.featured),
  published: row.published !== false,
});

export const filterPublicPosts = (posts = []) =>
  posts.filter((post) => post.published !== false);

const TO_PUBLIC = (row) => asPublicPost(row);

export async function fetchPosts({ includeDrafts = false } = {}) {
  if (!isSupabaseConfigured || !supabase) {
    const res = await fetch("/blog.json");
    if (!res.ok) throw new Error("Couldn't load posts.");
    const posts = await res.json();
    return includeDrafts ? posts : filterPublicPosts(posts);
  }

  let query = supabase
    .from(TABLE)
    .select("*")
    .order("date", { ascending: false });

  if (!includeDrafts) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data || [])
    .map(TO_PUBLIC)
    .filter((post) => (includeDrafts ? true : post.published));
}

export async function fetchPost(id) {
  if (!isSupabaseConfigured || !supabase) {
    const res = await fetch("/blog.json");
    const all = await res.json();
    const post = all.find((b) => String(b.id) === String(id));
    return post && post.published !== false ? post : null;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const publicPost = TO_PUBLIC(data);
  return publicPost.published ? publicPost : null;
}

const TO_ROW = (post) => ({
  title: post.title,
  excerpt: post.excerpt,
  body: post.body,
  category: post.category,
  date: post.date,
  image: post.image,
  medium_link: post.medium_link,
  tags: post.tags || [],
  read_time: post.readTime || post.read_time || "5 min read",
  featured: Boolean(post.featured),
  published: post.published !== false,
});

export async function createPost(post) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(TO_ROW(post))
    .select()
    .single();
  if (error) throw error;
  return TO_PUBLIC(data);
}

export async function updatePost(id, post) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(TO_ROW(post))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return TO_PUBLIC(data);
}

export async function deletePost(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
